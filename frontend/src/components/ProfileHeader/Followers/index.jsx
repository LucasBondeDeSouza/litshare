import React, { useState } from "react";
import axios from "axios"
import UserListModal from "../../UserListModal";

export default ({ followers_count, userId, profileId }) => {
    const [followers, setFollowers] = useState([])
    const [showModal, setShowModal] = useState(false);

    const handleShowFollowers = async () => {
        try {
            const response = await axios.get(`https://litshare-server.vercel.app/api/clients/${profileId}/followers?userId=${userId}`);
            setFollowers(response.data);
            setShowModal(true)
        } catch (err) {
            console.error("Error fetching following:", err);
        }
    };

    return (
        <>
            <div className="text-center" role="button" onClick={handleShowFollowers}>
                <span className="fw-bold">{followers_count}</span>
                <div className="text-muted">Followers</div>
            </div>

            <UserListModal show={showModal} onHide={() => setShowModal(false)} titleModal={"Followers"} datas={followers} userId={userId} />
        </>
    )
}