import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import session from "express-session"
import clientRoutes from "./routes/clientRoute.js"

const app = express()
const port = 3000
dotenv.config()

app.use(cors())
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Alterar para 'true' se usar HTTPS
}));

app.use('/api', clientRoutes)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})