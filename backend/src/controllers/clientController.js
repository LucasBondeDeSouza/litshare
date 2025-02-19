import * as clientService from "../services/clientServices.js"

export const createClient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await clientService.createClient(name, email, password);
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