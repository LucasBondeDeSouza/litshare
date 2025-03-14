import React, { useState } from "react";
import axios from "axios"
import UserListModal from "../../UserListModal";

export default ({ following_count, userId, profileId }) => {
    const [following, setFollowing] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleShowFollowing = async () => {
        try {
            const response = await axios.get(`https://litshare-server.vercel.app/api/clients/${profileId}/following?userId=${userId}`);
            setFollowing(response.data);
            setShowModal(true)
        } catch (err) {
            console.error("Error fetching following:", err);
        }
    };

    return (
        <>
            <div className="text-center" role="button" onClick={handleShowFollowing}>
                <span className="fw-bold">{following_count}</span>
                <div className="text-muted">Following</div>
            </div>

            <UserListModal show={showModal} onHide={() => setShowModal(false)} titleModal={"Following"} datas={following} userId={userId} />
        </>
    )
}