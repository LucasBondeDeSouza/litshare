import * as clientService from "../services/clientServices.js"

export const createClient = async (req, res) => {
    try {
        const { name, social_handle, email, password } = req.body;
        const user = await clientService.createClient(name, social_handle, email, password);
        res.status(201).json(user);
    } catch (err) {
        console.log('Error adding client:', err.message);
        
        if (err.message === "Email already exists") {
            return res.status(409).json({ message: "Email já cadastrado" });
        }

        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await clientService.loginClient(email, password);
        res.status(200).json({ message: "Login realizado com sucesso", user });
    } catch (err) {
        console.log("Error during login:", err.message);
        if (err.message === "Invalid email or password") {
            return res.status(401).json({ message: "E-mail ou senha inválidos" });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logoutClient = (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
            res.status(200).json({ message: "Logout realizado com sucesso" });
        });
    } catch (err) {
        console.error("Error during logout:", err.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getClient = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await clientService.getClient(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const searchClients = async (req, res) => {
    try {
        const search = req.query.q;
        const clients = await clientService.searchClients(search);
        res.status(200).json(clients);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const { social_handle } = req.params
        const { userId } = req.query;
        const userProfile = await clientService.getUserProfile(social_handle, userId)
        res.status(200).json(userProfile)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const followUser = async (req, res) => {
    try {
        const { followerId, followedId } = req.body;
        if (followerId === followedId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const response = await clientService.followUser(followerId, followedId);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const unfollowUser = async (req, res) => {
    try {
        const { followerId, followedId } = req.body;
        const response = await clientService.unfollowUser(followerId, followedId);
        res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const getFollowers = async (req, res) => {
    try {
        const { userId } = req.query
        const { profileId } = req.params
        const followers = await clientService.getFollowers(userId, profileId)
        res.status(200).json(followers)
    } catch (err) {
        console.error("Error retrieving followers:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getFollowing = async (req, res) => {
    try {
        const { userId } = req.query
        const { profileId } = req.params
        const following = await clientService.getFollowing(userId, profileId)
        res.status(200).json(following)
    } catch (err) {
        console.error("Error retrieving followers:", err);
        res.status(500).json({ error: "Internal server error" });
    }
}