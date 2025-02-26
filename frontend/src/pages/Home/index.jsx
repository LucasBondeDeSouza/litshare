import React from "react";
import Header from "../../components/Header";
import Timeline from "../Timeline";

export default () => {

    return (
        <>
            <Header />
            <div className="bg-light min-vh-100">
                <div className="container">
                    <Timeline />
                </div>
            </div>
        </>
    );
};