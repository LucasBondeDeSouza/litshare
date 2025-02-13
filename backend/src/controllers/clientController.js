import * as clientService from "../services/clientServices.js"

export const createClient = async (req, res) => {
    try {
        const clientData = req.body
        const newClient = await clientService.createClient(clientData)
        res.status(200).json(newClient)
    } catch (err) {
        console.log('Error adding client: ', err)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}