import React from "react";
import Header from "../../components/Header";
import Timeline from "../Timeline";
import Footer from "../../components/Footer";

export default () => {

    return (
        <>
            <Header />
            <div className="bg-light min-vh-100 pb-5">
                <div className="container">
                    <Timeline />
                </div>
            </div>
            <Footer />
        </>
    );
};