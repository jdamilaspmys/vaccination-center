// require and configure dotenv, will load vars in .env in PROCESS.ENV
import dotenv from 'dotenv'
dotenv.config()

const config = {
  port: process.env.PORT || 4000,
  env: process.env.NODE_ENV || 'development',
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }
}

export default config;