import React from "react";
import HomeBanner from "../../components/PublicComp/HomePages/HomeBanner";
import LastSearched from "../../components/PublicComp/HomePages/LastSearched";
import SponsoredCard from "../../components/PublicComp/HomePages/SponsoredCard";
import FeaturedProjects from "../../components/PublicComp/HomePages/FeaturedProjects";
import OwnerPropertyCard from "../../components/PublicComp/HomePages/OwnerPropertyCard";
import TopProjects from "../../components/PublicComp/HomePages/TopProjects";
import NewLaunch from "../../components/PublicComp/HomePages/NewLaunch";
import SiteVisitBanner from "../../components/PublicComp/HomePages/SiteVisitBanner";
import PropWorth from "../../components/PublicComp/HomePages/PropWorth";
import InteriorDesigners from "../../components/PublicComp/HomePages/InteriorDesigners";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-screen m-0 p-0">
        <HomeBanner />
        <LastSearched />
        <SponsoredCard />
        <FeaturedProjects />
        <OwnerPropertyCard />
        <NewLaunch />
        <SiteVisitBanner />
        <PropWorth />
        <TopProjects />
        <InteriorDesigners />
      </div>
    </>
  );
};

export default Home;
