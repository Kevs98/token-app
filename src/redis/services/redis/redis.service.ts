import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    // create and configure the redis connection
    this.redisClient = new Redis();
  }

  async addToBlacklist(token: string): Promise<void> {
    await this.redisClient.set(token, 'BLACKLISTED');
  }

  async isInBlacklist(token: string): Promise<boolean> {
    const result = await this.redisClient.exists(token);
    return result === 1;
  }
}
