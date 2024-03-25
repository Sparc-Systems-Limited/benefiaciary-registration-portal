import {Redis} from "ioredis"

const getRedisUrl = () => {
    if (process.env.REDIS_URL) {
        return process.env.REDIS_URL
    }

    throw new Error("REDIS_URL must be set")
}

export const redisurl = new Redis(getRedisUrl())