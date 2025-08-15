import axiosInstance from './axios';

const inMemoryCache = new Map();

// Get the cache TTL from environment variables, defaulting to 15 minutes (in milliseconds)
const DEFAULT_TTL = 15 * 60 * 1000;
const CACHE_TTL = process.env.NEXT_PUBLIC_API_CACHE_TTL
    ? parseInt(process.env.NEXT_PUBLIC_API_CACHE_TTL, 10)
    : DEFAULT_TTL;

// Set the cleanup interval from environment variables, defaulting to 5 minutes (in milliseconds)
const DEFAULT_CLEANUP_INTERVAL = 5 * 60 * 1000;
const CACHE_CLEANUP_INTERVAL = process.env.NEXT_PUBLIC_CACHE_CLEANUP_INTERVAL
    ? parseInt(process.env.NEXT_PUBLIC_CACHE_CLEANUP_INTERVAL, 10)
    : DEFAULT_CLEANUP_INTERVAL;

/**
 * A private function to clean up expired entries from the cache.
 */
const cleanupCache = () => {
    const now = Date.now();
    inMemoryCache.forEach((value, key) => {
        if (now - value.timestamp > CACHE_TTL) {
            console.log(`Clearing expired cache for ${key}`);
            inMemoryCache.delete(key);
        }
    });
};

// Set up a cleanup interval to run at the specified interval
if (CACHE_CLEANUP_INTERVAL > 0) {
    setInterval(cleanupCache, CACHE_CLEANUP_INTERVAL);
}

/**
 * A generic function to fetch data from an API with caching.
 * @param url The API endpoint URL.
 * @returns A Promise that resolves with the fetched or cached data.
 */
export const fetchWithCache = async <T>(url: string): Promise<T> => {
    const cachedData = inMemoryCache.get(url);

    if (cachedData && (Date.now() - cachedData.timestamp) < CACHE_TTL) {
        console.log(`Using cached data for ${url}`);
        return cachedData.data;
    }

    try {
        const response = await axiosInstance.get<T>(url);
        const dataToCache = response.data;

        inMemoryCache.set(url, {
            data: dataToCache,
            timestamp: Date.now(),
        });

        return dataToCache;
    } catch (error) {
        console.error(`Error fetching data for ${url}:`, error);
        throw error;
    }
};