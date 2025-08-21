interface CacheData<T> {
  data: T;
  timestamp: number;
}

class SimpleCache {
  private static CACHE_PREFIX = 'rac_';
  private static CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

  /**
   * Get data from cache if it exists and is still fresh (within 10 minutes)
   */
  static get<T>(key: string): T | null {
    if (typeof window === 'undefined' || true) return null;

    try {
      const cacheKey = this.CACHE_PREFIX + key;
      const cachedItem = localStorage.getItem(cacheKey);

      if (!cachedItem) return null;

      const parsed: CacheData<T> = JSON.parse(cachedItem);
      const isExpired = Date.now() - parsed.timestamp > this.CACHE_DURATION;

      if (isExpired) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('Error reading from cache:', error);
      return null;
    }
  }

  /**
   * Save data to cache with current timestamp
   */
  static set<T>(key: string, data: T): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheKey = this.CACHE_PREFIX + key;
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now()
      };

      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Error saving to cache:', error);
    }
  }

  /**
   * Clear specific cache entry
   */
  static remove(key: string): void {
    if (typeof window === 'undefined') return;

    try {
      const cacheKey = this.CACHE_PREFIX + key;
      localStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn('Error removing from cache:', error);
    }
  }

  /**
   * Clear all cache entries
   */
  static clearAll(): void {
    if (typeof window === 'undefined') return;

    try {
      Object.keys(localStorage)
        .filter(key => key.startsWith(this.CACHE_PREFIX))
        .forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.warn('Error clearing cache:', error);
    }
  }

  /**
   * Check if data is cached and fresh
   */
  static has(key: string): boolean {
    return this.get(key) !== null;
  }
}

export default SimpleCache;
