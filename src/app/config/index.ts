import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.join((process.cwd(), ".env"))})

export default{
    port :process.env.PORT,
    databaseUrl: process.env.DATABASE_URL,
    node_env: process.env.NODE_ENV,
    payment_secret: process.env.PAYMENT_SECRET,
}