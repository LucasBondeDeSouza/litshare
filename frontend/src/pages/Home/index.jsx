import React, { useState } from "react";
import Header from "../../components/Header";
import Timeline from "../Timeline";
import Navigation from "../../components/Navigation";
import Tabs from "../../components/Tabs";

export default () => {
    const [selectedTab, setSelectedTab] = useState('forYou');

    return (
        <>
            <Header />

            <div className="bg-light min-vh-100 pb-5">
                <div className="container">
                    <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                    
                    <Timeline selectedTab={selectedTab} />
                </div>
            </div>

            <Navigation />
        </>
    );
};