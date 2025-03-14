import React from "react";

export default ({ selectedTab, setSelectedTab }) => {
    return (
        <div className="d-flex justify-content-center pt-4">
            <ul className="nav nav-tabs w-100 justify-content-center border-bottom" style={{ borderColor: "#e0e0e0" }}>
                <li className="nav-item">
                    <a
                        className={`nav-link text-dark ${selectedTab === 'forYou' ? 'active' : ''} px-4 py-2`}
                        onClick={() => setSelectedTab('forYou')}
                        style={{ cursor: "pointer" }}
                    >
                        For You
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link text-dark ${selectedTab === 'following' ? 'active' : ''} px-4 py-2`}
                        onClick={() => setSelectedTab('following')}
                        style={{ cursor: "pointer" }}
                    >
                        Following
                    </a>
                </li>
            </ul>
        </div>
    );
};
