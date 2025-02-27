import React, { useState, useEffect } from "react";
import axios from "axios";

export default ({ initialIsFollowing, followedId, userId }) => {
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

    useEffect(() => {
        setIsFollowing(initialIsFollowing);
    }, [initialIsFollowing]);

    const handleFollowToggle = async () => {
        try {
            const endpoint = isFollowing
                ? "http://localhost:3000/api/clients/unfollow"
                : "http://localhost:3000/api/clients/follow";

            const response = await axios.post(endpoint, {
                followerId: userId,
                followedId: followedId
            });

            if (response.status === 200) {
                setIsFollowing(!isFollowing); // Alterna o estado
            }
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    return (
        <button
            className={`btn btn-${isFollowing ? "outline-primary" : "primary"} btn-sm button-follow`}
            onClick={handleFollowToggle}
        >
            {isFollowing ? "Following" : "Follow"}
        </button>
    );
};