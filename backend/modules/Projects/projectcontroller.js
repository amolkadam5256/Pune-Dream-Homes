const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// ==================== PUBLIC ROUTES ====================

// @desc    Get all featured/premium projects
// @route   GET /api/projects/featured
// @access  Public
const getFeaturedProjects = async (req, res) => {
  try {
    const { limit = 6, cityId } = req.query;

    const whereClause = {
      isActive: true,
      OR: [{ isFeatured: true }, { isPremium: true }],
    };

    // Filter by city if provided
    if (cityId) {
      whereClause.cityId = cityId;
    }

    const projects = await prisma.project.findMany({
      where: whereClause,
      take: parseInt(limit),
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
          },
        },
        locality: {
          select: {
            id: true,
            name: true,
            pincode: true,
          },
        },
        images: {
          where: { isPrimary: true },
          take: 1,
          select: {
            url: true,
            caption: true,
          },
        },
        amenities: {
          include: {
            amenity: {
              select: {
                name: true,
                icon: true,
                category: true,
              },
            },
          },
          take: 10,
        },
        _count: {
          select: {
            properties: true,
            reviews: true,
          },
        },
      },
      orderBy: [
        { isPremium: "desc" },
        { isFeatured: "desc" },
        { viewCount: "desc" },
        { createdAt: "desc" },
      ],
    });

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured projects",
      error: error.message,
    });
  }
};

// @desc    Get all projects (with advanced filters)
// @route   GET /api/projects
// @access  Public
const getAllProjects = async (req, res) => {
  try {
    const {
      cityId,
      localityId,
      projectStatus,
      minPrice,
      maxPrice,
      configurations,
      isFeatured,
      isPremium,
      isActive,
      isVerified,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build where clause dynamically
    const whereClause = {};

    // Filter by status flags
    if (isActive !== undefined) {
      whereClause.isActive = isActive === "true";
    } else {
      whereClause.isActive = true; // Default to active only
    }

    if (isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured === "true";
    }

    if (isPremium !== undefined) {
      whereClause.isPremium = isPremium === "true";
    }

    if (isVerified !== undefined) {
      whereClause.isVerified = isVerified === "true";
    }

    // Filter by location
    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (localityId) {
      whereClause.localityId = localityId;
    }

    // Filter by project status
    if (projectStatus) {
      whereClause.projectStatus = projectStatus;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      whereClause.AND = whereClause.AND || [];
      if (minPrice) {
        whereClause.AND.push({
          minPrice: {
            gte: parseFloat(minPrice),
          },
        });
      }
      if (maxPrice) {
        whereClause.AND.push({
          maxPrice: {
            lte: parseFloat(maxPrice),
          },
        });
      }
    }

    // Filter by configurations (e.g., "1 BHK", "2 BHK")
    if (configurations) {
      const configArray = Array.isArray(configurations)
        ? configurations
        : [configurations];

      whereClause.configurations = {
        hasSome: configArray,
      };
    }

    // Search functionality
    if (search) {
      whereClause.OR = [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          builderName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: search,
            mode: "insensitive",
          },
        },
      ];
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Sorting
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Execute query with includes
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        include: {
          city: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
          locality: {
            select: {
              id: true,
              name: true,
              pincode: true,
              averagePrice: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
            select: {
              url: true,
              caption: true,
            },
          },
          _count: {
            select: {
              properties: true,
              reviews: true,
              amenities: true,
            },
          },
        },
        orderBy,
        skip,
        take,
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);
    const hasNextPage = parseInt(page) < totalPages;
    const hasPrevPage = parseInt(page) > 1;

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
      pagination: {
        total: totalCount,
        page: parseInt(page),
        limit: take,
        totalPages,
        hasNextPage,
        hasPrevPage,
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
      error: error.message,
    });
  }
};

// @desc    Get all projects in a specific city
// @route   GET /api/projects/city/:cityId
// @access  Public
const getProjectsByCity = async (req, res) => {
  try {
    const { cityId } = req.params;
    const {
      localityId,
      projectStatus,
      minPrice,
      maxPrice,
      configurations,
      isFeatured,
      isPremium,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Verify city exists
    const city = await prisma.city.findUnique({
      where: { id: cityId },
      select: {
        id: true,
        name: true,
        state: true,
        country: true,
        propertyCount: true,
      },
    });

    if (!city) {
      return res.status(404).json({
        success: false,
        message: `City not found with id: ${cityId}`,
      });
    }

    // Build where clause
    const whereClause = {
      cityId,
      isActive: true,
    };

    // Additional filters
    if (localityId) {
      whereClause.localityId = localityId;
    }

    if (projectStatus) {
      whereClause.projectStatus = projectStatus;
    }

    if (isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured === "true";
    }

    if (isPremium !== undefined) {
      whereClause.isPremium = isPremium === "true";
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.AND = [];
      if (minPrice) {
        whereClause.AND.push({
          minPrice: { gte: parseFloat(minPrice) },
        });
      }
      if (maxPrice) {
        whereClause.AND.push({
          maxPrice: { lte: parseFloat(maxPrice) },
        });
      }
    }

    // Configuration filter
    if (configurations) {
      const configArray = Array.isArray(configurations)
        ? configurations
        : [configurations];
      whereClause.configurations = {
        hasSome: configArray,
      };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Sorting
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Execute query
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        skip,
        take,
        orderBy,
        include: {
          locality: {
            select: {
              id: true,
              name: true,
              pincode: true,
              averagePrice: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
            select: {
              url: true,
              caption: true,
            },
          },
          amenities: {
            include: {
              amenity: {
                select: {
                  name: true,
                  icon: true,
                  category: true,
                },
              },
            },
            take: 8,
          },
          _count: {
            select: {
              properties: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      success: true,
      city,
      count: projects.length,
      total: totalCount,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects by city:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects by city",
      error: error.message,
    });
  }
};

// @desc    Get all projects in a specific locality
// @route   GET /api/projects/locality/:localityId
// @access  Public
const getProjectsByLocality = async (req, res) => {
  try {
    const { localityId } = req.params;
    const {
      projectStatus,
      minPrice,
      maxPrice,
      configurations,
      isFeatured,
      isPremium,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Verify locality exists and get details
    const locality = await prisma.locality.findUnique({
      where: { id: localityId },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
            country: true,
          },
        },
      },
    });

    if (!locality) {
      return res.status(404).json({
        success: false,
        message: `Locality not found with id: ${localityId}`,
      });
    }

    // Build where clause
    const whereClause = {
      localityId,
      isActive: true,
    };

    // Additional filters
    if (projectStatus) {
      whereClause.projectStatus = projectStatus;
    }

    if (isFeatured !== undefined) {
      whereClause.isFeatured = isFeatured === "true";
    }

    if (isPremium !== undefined) {
      whereClause.isPremium = isPremium === "true";
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.AND = [];
      if (minPrice) {
        whereClause.AND.push({
          minPrice: { gte: parseFloat(minPrice) },
        });
      }
      if (maxPrice) {
        whereClause.AND.push({
          maxPrice: { lte: parseFloat(maxPrice) },
        });
      }
    }

    // Configuration filter
    if (configurations) {
      const configArray = Array.isArray(configurations)
        ? configurations
        : [configurations];
      whereClause.configurations = {
        hasSome: configArray,
      };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Sorting
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Execute query
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        skip,
        take,
        orderBy,
        include: {
          images: {
            where: { isPrimary: true },
            take: 1,
            select: {
              url: true,
              caption: true,
            },
          },
          amenities: {
            include: {
              amenity: {
                select: {
                  name: true,
                  icon: true,
                  category: true,
                },
              },
            },
            take: 8,
          },
          floorPlans: {
            select: {
              id: true,
              configuration: true,
              price: true,
              carpetArea: true,
              bedrooms: true,
              bathrooms: true,
            },
            take: 5,
          },
          _count: {
            select: {
              properties: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      success: true,
      locality: {
        ...locality,
        projectCount: totalCount,
      },
      count: projects.length,
      total: totalCount,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects by locality:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects by locality",
      error: error.message,
    });
  }
};

// @desc    Get projects by builder name
// @route   GET /api/projects/builder/:builderName
// @access  Public
const getProjectsByBuilder = async (req, res) => {
  try {
    const { builderName } = req.params;
    const {
      cityId,
      projectStatus,
      page = 1,
      limit = 12,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;

    // Build where clause
    const whereClause = {
      builderName: {
        contains: builderName,
        mode: "insensitive",
      },
      isActive: true,
    };

    // Additional filters
    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (projectStatus) {
      whereClause.projectStatus = projectStatus;
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Sorting
    const orderBy = {};
    orderBy[sortBy] = sortOrder;

    // Execute query
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        skip,
        take,
        orderBy,
        include: {
          city: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
          locality: {
            select: {
              id: true,
              name: true,
              pincode: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
          _count: {
            select: {
              properties: true,
              reviews: true,
            },
          },
        },
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      success: true,
      builder: builderName,
      count: projects.length,
      total: totalCount,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      data: projects,
    });
  } catch (error) {
    console.error("Error fetching projects by builder:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch projects by builder",
      error: error.message,
    });
  }
};

// @desc    Search projects
// @route   GET /api/projects/search
// @access  Public
const searchProjects = async (req, res) => {
  try {
    const {
      query,
      cityId,
      localityId,
      projectStatus,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    // Build where clause
    const whereClause = {
      isActive: true,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          builderName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    };

    // Additional filters
    if (cityId) {
      whereClause.cityId = cityId;
    }

    if (localityId) {
      whereClause.localityId = localityId;
    }

    if (projectStatus) {
      whereClause.projectStatus = projectStatus;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      whereClause.AND = [];
      if (minPrice) {
        whereClause.AND.push({
          minPrice: { gte: parseFloat(minPrice) },
        });
      }
      if (maxPrice) {
        whereClause.AND.push({
          maxPrice: { lte: parseFloat(maxPrice) },
        });
      }
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Execute query
    const [projects, totalCount] = await Promise.all([
      prisma.project.findMany({
        where: whereClause,
        skip,
        take,
        orderBy: {
          viewCount: "desc", // Most viewed first
        },
        include: {
          city: {
            select: {
              id: true,
              name: true,
              state: true,
            },
          },
          locality: {
            select: {
              id: true,
              name: true,
            },
          },
          images: {
            where: { isPrimary: true },
            take: 1,
          },
        },
      }),
      prisma.project.count({ where: whereClause }),
    ]);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({
      success: true,
      query,
      count: projects.length,
      total: totalCount,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1,
      },
      data: projects,
    });
  } catch (error) {
    console.error("Error searching projects:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search projects",
      error: error.message,
    });
  }
};

// @desc    Get single project by ID or slug
// @route   GET /api/projects/:identifier
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const { identifier } = req.params;

    // Check if identifier is UUID or slug
    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        identifier
      );

    const project = await prisma.project.findUnique({
      where: isUUID ? { id: identifier } : { slug: identifier },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
            country: true,
          },
        },
        locality: {
          select: {
            id: true,
            name: true,
            pincode: true,
            averagePrice: true,
            pricePerSqft: true,
            connectivity: true,
            aboutLocality: true,
          },
        },
        images: {
          orderBy: {
            orderIndex: "asc",
          },
        },
        amenities: {
          include: {
            amenity: {
              select: {
                id: true,
                name: true,
                icon: true,
                category: true,
                description: true,
              },
            },
          },
        },
        floorPlans: {
          orderBy: {
            carpetArea: "asc",
          },
        },
        properties: {
          where: {
            approvalStatus: "APPROVED",
            availabilityStatus: "AVAILABLE",
          },
          take: 5,
          select: {
            id: true,
            title: true,
            price: true,
            propertyType: true,
            bedrooms: true,
            bathrooms: true,
            carpetArea: true,
          },
        },
        reviews: {
          where: {
            isApproved: true,
          },
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                profileImage: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
        _count: {
          select: {
            properties: true,
            reviews: true,
          },
        },
      },
    });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: `Project not found with identifier: ${identifier}`,
      });
    }

    // Increment view count
    await prisma.project.update({
      where: { id: project.id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    // Calculate average rating from reviews
    const avgRating =
      project.reviews.length > 0
        ? project.reviews.reduce((acc, review) => acc + review.rating, 0) /
          project.reviews.length
        : 0;

    res.status(200).json({
      success: true,
      data: {
        ...project,
        averageRating: avgRating.toFixed(1),
        totalReviews: project._count.reviews,
      },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
};

// ==================== PROTECTED ROUTES ====================

// @desc    Create new project
// @route   POST /api/projects
// @access  Private (Admin/Agent)
const createProject = async (req, res) => {
  try {
    const {
      // Basic Info
      name,
      slug,
      description,
      builderName,
      builderContact,
      builderEmail,
      builderWebsite,
      projectStatus,
      totalUnits,
      availableUnits,
      soldUnits,
      totalTowers,
      totalAcres,
      totalFloors,

      // Location
      cityId,
      localityId,
      address,
      landmark,
      latitude,
      longitude,
      googleMapUrl,

      // Pricing
      priceRange,
      minPrice,
      maxPrice,

      // Dates
      launchDate,
      possessionDate,
      completionDate,

      // Legal
      reraNumber,
      reraWebsite,
      reraApprovalDate,
      approvalAuthority,
      landArea,
      openArea,

      // Media
      logo,
      brochureUrl,
      masterPlanUrl,
      videoUrl,
      virtualTourUrl,

      // Features
      configurations,
      highlights,
      specifications,
      bankApprovals,

      // SEO
      metaTitle,
      metaDescription,
      keywords,

      // Status flags
      isActive,
      isFeatured,
      isPremium,
      isVerified,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !description ||
      !builderName ||
      !cityId ||
      !localityId ||
      !address
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, description, builderName, cityId, localityId, address",
      });
    }

    // Check if city exists
    const cityExists = await prisma.city.findUnique({
      where: { id: cityId },
    });

    if (!cityExists) {
      return res.status(404).json({
        success: false,
        message: "City not found",
      });
    }

    // Check if locality exists
    const localityExists = await prisma.locality.findUnique({
      where: { id: localityId },
    });

    if (!localityExists) {
      return res.status(404).json({
        success: false,
        message: "Locality not found",
      });
    }

    // Generate slug if not provided
    const projectSlug = slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    // Check if slug already exists
    const slugExists = await prisma.project.findUnique({
      where: { slug: projectSlug },
    });

    if (slugExists) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists. Please use a different project name.",
      });
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        // Basic Info
        name,
        slug: projectSlug,
        description,
        builderName,
        builderContact,
        builderEmail,
        builderWebsite,
        projectStatus: projectStatus || "UPCOMING",
        totalUnits,
        availableUnits,
        soldUnits,
        totalTowers,
        totalAcres,
        totalFloors,

        // Location
        cityId,
        localityId,
        address,
        landmark,
        latitude,
        longitude,
        googleMapUrl,

        // Pricing
        priceRange,
        minPrice,
        maxPrice,

        // Dates
        launchDate: launchDate ? new Date(launchDate) : null,
        possessionDate: possessionDate ? new Date(possessionDate) : null,
        completionDate: completionDate ? new Date(completionDate) : null,

        // Legal
        reraNumber,
        reraWebsite,
        reraApprovalDate: reraApprovalDate ? new Date(reraApprovalDate) : null,
        approvalAuthority,
        landArea,
        openArea,

        // Media
        logo,
        brochureUrl,
        masterPlanUrl,
        videoUrl,
        virtualTourUrl,

        // Features
        configurations: configurations || [],
        highlights: highlights || [],
        specifications: specifications || {},
        bankApprovals: bankApprovals || [],

        // SEO
        metaTitle: metaTitle || name,
        metaDescription: metaDescription || description.substring(0, 160),
        keywords: keywords || [],

        // Status flags
        isActive: isActive !== undefined ? isActive : true,
        isFeatured: isFeatured !== undefined ? isFeatured : false,
        isPremium: isPremium !== undefined ? isPremium : false,
        isVerified: isVerified !== undefined ? isVerified : false,
        publishedAt: new Date(),
      },
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
          },
        },
        locality: {
          select: {
            id: true,
            name: true,
            pincode: true,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create project",
      error: error.message,
    });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (Admin/Agent)
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: `Project not found with id: ${id}`,
      });
    }

    // If slug is being updated, check if it's unique
    if (updates.slug && updates.slug !== projectExists.slug) {
      const slugExists = await prisma.project.findUnique({
        where: { slug: updates.slug },
      });

      if (slugExists) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }
    }

    // If cityId is being updated, verify it exists
    if (updates.cityId) {
      const cityExists = await prisma.city.findUnique({
        where: { id: updates.cityId },
      });

      if (!cityExists) {
        return res.status(404).json({
          success: false,
          message: "City not found",
        });
      }
    }

    // If localityId is being updated, verify it exists
    if (updates.localityId) {
      const localityExists = await prisma.locality.findUnique({
        where: { id: updates.localityId },
      });

      if (!localityExists) {
        return res.status(404).json({
          success: false,
          message: "Locality not found",
        });
      }
    }

    // Convert date strings to Date objects if present
    if (updates.launchDate) {
      updates.launchDate = new Date(updates.launchDate);
    }
    if (updates.possessionDate) {
      updates.possessionDate = new Date(updates.possessionDate);
    }
    if (updates.completionDate) {
      updates.completionDate = new Date(updates.completionDate);
    }
    if (updates.reraApprovalDate) {
      updates.reraApprovalDate = new Date(updates.reraApprovalDate);
    }

    // Update project
    const project = await prisma.project.update({
      where: { id },
      data: updates,
      include: {
        city: {
          select: {
            id: true,
            name: true,
            state: true,
          },
        },
        locality: {
          select: {
            id: true,
            name: true,
            pincode: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: project,
    });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
};

// @desc    Delete project (soft delete by setting isActive to false)
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { permanent } = req.query; // ?permanent=true for hard delete

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            properties: true,
            images: true,
            amenities: true,
            floorPlans: true,
            reviews: true,
          },
        },
      },
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: `Project not found with id: ${id}`,
      });
    }

    if (permanent === "true") {
      // Hard delete (permanent)
      await prisma.project.delete({
        where: { id },
      });

      res.status(200).json({
        success: true,
        message: "Project permanently deleted",
        data: {
          deletedProjectId: id,
          deletedRelations: projectExists._count,
        },
      });
    } else {
      // Soft delete (set isActive to false)
      await prisma.project.update({
        where: { id },
        data: {
          isActive: false,
        },
      });

      res.status(200).json({
        success: true,
        message: "Project deactivated successfully (soft delete)",
      });
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
};

// ==================== PROJECT RESOURCES ====================

// @desc    Add images to project
// @route   POST /api/projects/:id/images
// @access  Private
const addProjectImages = async (req, res) => {
  try {
    const { id } = req.params;
    const { images } = req.body; // Array of {url, caption, category, orderIndex, isPrimary}

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide images array",
      });
    }

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // If any image is marked as primary, unset existing primary images
    const hasPrimary = images.some((img) => img.isPrimary);
    if (hasPrimary) {
      await prisma.projectImage.updateMany({
        where: {
          projectId: id,
          isPrimary: true,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    // Create images
    const createdImages = await Promise.all(
      images.map((image, index) =>
        prisma.projectImage.create({
          data: {
            projectId: id,
            url: image.url,
            caption: image.caption,
            category: image.category,
            orderIndex:
              image.orderIndex !== undefined ? image.orderIndex : index,
            isPrimary: image.isPrimary || false,
          },
        })
      )
    );

    res.status(201).json({
      success: true,
      message: "Images added successfully",
      data: createdImages,
    });
  } catch (error) {
    console.error("Error adding project images:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add images",
      error: error.message,
    });
  }
};

// @desc    Add amenities to project
// @route   POST /api/projects/:id/amenities
// @access  Private
const addProjectAmenities = async (req, res) => {
  try {
    const { id } = req.params;
    const { amenityIds } = req.body; // Array of amenity IDs

    if (!amenityIds || !Array.isArray(amenityIds) || amenityIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide amenityIds array",
      });
    }

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create project amenities (ignore duplicates using upsert)
    const createdAmenities = await Promise.all(
      amenityIds.map((amenityId) =>
        prisma.projectAmenity.upsert({
          where: {
            projectId_amenityId: {
              projectId: id,
              amenityId,
            },
          },
          create: {
            projectId: id,
            amenityId,
          },
          update: {},
        })
      )
    );

    res.status(201).json({
      success: true,
      message: "Amenities added successfully",
      data: createdAmenities,
    });
  } catch (error) {
    console.error("Error adding project amenities:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add amenities",
      error: error.message,
    });
  }
};

// @desc    Add floor plans to project
// @route   POST /api/projects/:id/floor-plans
// @access  Private
const addFloorPlans = async (req, res) => {
  try {
    const { id } = req.params;
    const { floorPlans } = req.body; // Array of floor plan objects

    if (!floorPlans || !Array.isArray(floorPlans) || floorPlans.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide floorPlans array",
      });
    }

    // Check if project exists
    const projectExists = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectExists) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Create floor plans
    const createdFloorPlans = await Promise.all(
      floorPlans.map((plan) =>
        prisma.floorPlan.create({
          data: {
            projectId: id,
            name: plan.name,
            configuration: plan.configuration,
            carpetArea: plan.carpetArea,
            builtUpArea: plan.builtUpArea,
            superBuiltUpArea: plan.superBuiltUpArea,
            bedrooms: plan.bedrooms,
            bathrooms: plan.bathrooms,
            balconies: plan.balconies,
            imageUrl: plan.imageUrl,
            pdfUrl: plan.pdfUrl,
            price: plan.price,
            availableUnits: plan.availableUnits,
            description: plan.description,
          },
        })
      )
    );

    res.status(201).json({
      success: true,
      message: "Floor plans added successfully",
      data: createdFloorPlans,
    });
  } catch (error) {
    console.error("Error adding floor plans:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add floor plans",
      error: error.message,
    });
  }
};

// @desc    Increment project statistics
// @route   PATCH /api/projects/:id/stats
// @access  Public
const updateProjectStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { stat } = req.body; // viewCount, inquiryCount, favoriteCount, shareCount

    if (
      !stat ||
      !["viewCount", "inquiryCount", "favoriteCount", "shareCount"].includes(
        stat
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid stat field. Must be: viewCount, inquiryCount, favoriteCount, or shareCount",
      });
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        [stat]: {
          increment: 1,
        },
      },
      select: {
        id: true,
        viewCount: true,
        inquiryCount: true,
        favoriteCount: true,
        shareCount: true,
      },
    });

    res.status(200).json({
      success: true,
      message: `${stat} updated successfully`,
      data: project,
    });
  } catch (error) {
    console.error("Error updating project stats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update stats",
      error: error.message,
    });
  }
};

// ==================== EXPORTS ====================

module.exports = {
  // Public Routes
  getFeaturedProjects,
  getAllProjects,
  getProjectsByCity,
  getProjectsByLocality,
  getProjectsByBuilder,
  searchProjects,
  getProjectById,

  // Protected Routes
  createProject,
  updateProject,
  deleteProject,

  // Project Resources
  addProjectImages,
  addProjectAmenities,
  addFloorPlans,
  updateProjectStats,
};
