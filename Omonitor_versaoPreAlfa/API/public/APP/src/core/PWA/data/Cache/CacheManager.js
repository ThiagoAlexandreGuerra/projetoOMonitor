export default class CacheManager {

    constructor(cacheName = "default") {
        this.cacheName = cacheName;
    }

    async #cache() {
        return await caches.open(this.cacheName);
    }

    async set(key, value) {

        const cache = await this.#cache();

        const response = new Response(
            JSON.stringify(value),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        await cache.put(key, response);
    }

    async get(key) {

        const cache = await this.#cache();

        const response = await cache.match(key);

        if (!response)
            return null;

        return await response.json();
    }

    async has(key) {

        const cache = await this.#cache();

        return (await cache.match(key)) !== undefined;
    }

    async remove(key) {

        const cache = await this.#cache();

        return await cache.delete(key);
    }

    async keys() {

        const cache = await this.#cache();

        const requests = await cache.keys();

        return requests.map(request => request.url);
    }

    async clear() {

        return await caches.delete(this.cacheName);
    }

    async size() {

        return (await this.keys()).length;
    }

}