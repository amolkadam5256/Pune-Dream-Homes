import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Home,
  Layout,
  Landmark,
  Store,
  Building,
  MapPin,
  Users,
  Paintbrush,
  ArrowRight,
  ShieldCheck,
  Zap,
  Map,
  Briefcase,
} from "lucide-react";
import { popularChoices, propertyTypes } from "../../../constants/propertyData";

const iconMap = {
  Building2: Building2,
  Home: Home,
  Layout: Layout,
  Landmark: Landmark,
  Store: Store,
  Building: Building,
  MapPin: MapPin,
  Users: Users,
  Paintbrush: Paintbrush,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Map: Map,
  Briefcase: Briefcase,
};

const PropertyChoices = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Popular Choices Section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Popular Choices
              </h2>
              <p className="text-gray-600">
                Handpicked categories for your dream home search
              </p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {popularChoices.map((choice) => (
              <motion.a
                key={choice.id}
                href={choice.link}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src={choice.image}
                    alt={choice.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{choice.title}</h3>
                  <p className="text-sm text-gray-300 mb-3">
                    {choice.count} Properties
                  </p>
                  <div className="flex items-center text-xs font-semibold uppercase tracking-wider text-(--color-primary)">
                    Explore Now{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Property Types Section */}
        <div className="mb-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Property Types
            </h2>
            <p className="text-gray-600">
              Find the perfect space that fits your lifestyle
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {propertyTypes.map((type) => {
              const Icon = iconMap[type.icon] || Home;
              return (
                <motion.a
                  key={type.id}
                  href={type.link}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-(--color-primary) hover:shadow-md transition-all group"
                >
                  <div className="mb-4 p-4 rounded-full bg-gray-50 text-gray-600 group-hover:bg-(--color-primary-lightest) group-hover:text-(--color-primary) transition-colors">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-sm font-bold text-center text-gray-800">
                    {type.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{type.count}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyChoices;
