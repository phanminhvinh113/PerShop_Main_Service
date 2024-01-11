import Redis from 'ioredis'
import dotenv from 'dotenv'
dotenv.config()
//
//const port: number = process.env?.PORT_REDIS_CLOUD ? +process.env.PORT_REDIS_CLOUD : 11579

// const redis = new Redis({
//    host: process.env.HOST_REDIS_CLOUD,
//    port,
//    password: process.env.PASSWORD_REDIS_CLOUD,
// })
const redis = new Redis({ host: 'localhost', port: 6379 })
//
export const ConnectRedis = async () => {
   //
   redis.on('ready', () => {
      console.log('Redis Ready!')
   })
   //
   redis.on('error', (error) => {
      console.log('Connect Redis Filed, ERROR:::', error)
   })
}
//
export default redis
//
// import { createClient } from 'redis'
// import dotenv from 'dotenv'

// dotenv.config()
// //
// const port: number = process.env?.PORT_REDIS_CLOUD ? +process.env.PORT_REDIS_CLOUD : 11579
// //
// const redisClient = createClient({
//    password: process.env.PASSWORD_REDIS_CLOUD,
//    socket: {
//       host: process.env.HOST_REDIS_CLOUD,
//       port,
//    },
// })

// redisClient.on('error', (err) => console.log('Redis Client Error', err))
// //
// export const ConnectRedis = async () => {
//    await redisClient.connect()
// }
// redisClient.on('connect', () => {
//    console.log('Redis already!')
// })
// //

// export default redisClient
