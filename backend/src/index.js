import cors from "cors"
import express from "express"
import dotenv from "dotenv"
import session from "express-session"
import Redis from "redis"
import connectRedis from "connect-redis"
import clientRoutes from "./routes/clientRoute.js"

const app = express()
const port = 3000
dotenv.config()

const RedisStore = connectRedis(session)

// Criar cliente Redis
const redisClient = Redis.createClient({
  host: process.env.REDIS_HOST || "localhost", // Adicione o host do Redis se estiver usando um serviço externo
  port: process.env.REDIS_PORT || 6379,       // Adicione a porta do Redis, se necessário
  password: process.env.REDIS_PASSWORD || "", // Adicione a senha, se houver
})

app.use(cors())
app.use(express.json())

// Configuração de sessão com Redis
app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Alterar para 'true' se usar HTTPS
}));

app.use('/api', clientRoutes)

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})