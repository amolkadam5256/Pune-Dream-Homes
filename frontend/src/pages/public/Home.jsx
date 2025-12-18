import React from "react";
import HomeBanner from '../../components/PublicComp/HomePages/HomeBanner'
import LastSearched from "../../components/PublicComp/HomePages/LastSearched";
import SponsoredCard from "../../components/PublicComp/HomePages/SponsoredCard";
import FeaturedProjects from "../../components/PublicComp/HomePages/FeaturedProjects";
import OwnerPropertyCard from "../../components/PublicComp/HomePages/OwnerPropertyCard";
import TopProjects from "../../components/PublicComp/HomePages/TopProjects";
import AgentCard from "../../components/PublicComp/HomePages/AgentCard";
import NewLaunch from "../../components/PublicComp/HomePages/NewLaunch";
import SiteVisitBanner from "../../components/PublicComp/HomePages/SiteVisitBanner";
import PropWorth from "../../components/PublicComp/HomePages/PropWorth";

const Home = () => {
    return (
        <>
            <div className="w-full min-h-screen m-0 p-0">
                <HomeBanner />
                <LastSearched />
                <SponsoredCard />
                <FeaturedProjects />
                <OwnerPropertyCard />
                <AgentCard />
                <NewLaunch />
                <SiteVisitBanner />
                <PropWorth />
                <TopProjects />


            </div>
        </>
    );
};



export default Home;
