import React, { useState, useEffect } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import FollowButton from "../FollowButton";

export default ({ social_handle, userId, setProfileId }) => {
    const [data, setData] = useState({})

    useEffect(() => {
        if (userId) {
            getUserProfile();
        } else {
            console.error('No user ID found in localStorage');
        }
    }, [social_handle, userId])

    const getUserProfile = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/clients/${social_handle}`, {
                params: { userId }
            });
            setData(response.data);
        } catch (err) {
            console.error('Error fetching user data:', err);
        }
    };

    setProfileId(data.id)

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
                <div className="card shadow-sm border-0">
                    <div className="card-body d-flex flex-wrap align-items-center justify-content-between p-4">
                        <div className="d-flex align-items-center gap-3">
                            {data.picture ? (
                                <img src={data.picture} alt="" className="profile-header-picture" />
                            ) : (
                                <FontAwesomeIcon icon={faUserCircle} size="3x" />
                            )}

                            <div className="d-flex flex-column">
                                <h5 className="card-title m-0">{data.username}</h5>
                                <span className="text-muted"><small>{data.social_handle}</small></span>
                            </div>
                        </div>

                        {data.id != userId && (
                            <FollowButton 
                                initialIsFollowing={data.is_following} 
                                followedId={data.id} 
                                userId={userId}
                            />
                        )}
                    </div>

                    <div className="card-footer bg-white d-flex justify-content-around p-3">
                        <div className="text-center">
                            <span className="fw-bold">{data.book_count}</span>
                            <div className="text-muted">Books</div>
                        </div>

                        <div className="text-center">
                            <span className="fw-bold">{data.followers_count}</span>
                            <div className="text-muted">Followers</div>
                        </div>

                        <div className="text-center">
                            <span className="fw-bold">{data.following_count}</span>
                            <div className="text-muted">Following</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}