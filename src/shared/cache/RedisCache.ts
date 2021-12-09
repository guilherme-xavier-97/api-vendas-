import Redis, { Redis as RedisClient } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCache {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  //JSON.stringify  converts an Object in to a string
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }
    //JSON.parse converts a String in an Object
    const parseData = JSON.parse(data) as T;
    return parseData;
  }

  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
