import { getDataBase } from "./IDBS.js";
import removeFunctionReferences from "../../../virtualDOM/functionHandlers/removeFunctionReferences.js";

export default class IDB{

    async addComponent(component , DB_STORE_NAME = `publications`) {
        
        let db = await getDataBase();
      
        return new Promise((resolve, reject) => {

            const tx =db.transaction(DB_STORE_NAME, "readwrite");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.add(removeFunctionReferences(component));

            request.onsuccess = () => {

                resolve(request.result);

            };

            request.onerror = () => {

                reject(request.error);

            };

        });

    }

    async updateComponent(component) {

        let db = await getDataBase();

        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readwrite");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.put(component);

            request.onsuccess = () => {

                resolve();

            };

            request.onerror = () => {

                reject(request.error);

            };
        });

    }

    async getComponent(id) {

        let db = await getDataBase();

        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readonly");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.get(id);

            request.onsuccess = () => {

                resolve(request.result);

            };

            request.onerror = () => {

                reject(request.error);

            };

        });

    }

    async getAllComponents() {

        let db = await getDataBase();

        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readonly");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.getAll();

            request.onsuccess = () => {

                resolve(request.result);

            };

            request.onerror = () => {

                reject(request.error);

            };

        });

    }

    async deleteComponent(id) {

        let db = await getDataBase();

        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readwrite");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.delete(id);

            request.onsuccess = () => {

                resolve();

            };

            request.onerror = () => {

                reject(request.error);

            };

        });
    }

    async clearComponents() {

        let db = await getDataBase();
        
        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readwrite");

            const store = tx.objectStore(DB_STORE_NAME);

            const request = store.clear();

            request.onsuccess = () => {

                resolve();

            };

            request.onerror = () => {

                reject(request.error);

            };

        });

    }

    async getComponentsByLayout(layout) {
        
        let db = await getDataBase();

        return new Promise((resolve, reject) => {

            const tx = db.transaction(DB_STORE_NAME, "readonly");

            const store = tx.objectStore(DB_STORE_NAME);

            const index = store.index("layout");

            const request = index.getAll(layout);

            request.onsuccess = () => {

                resolve(request.result);

            };

            request.onerror = () => {

                reject(request.error);

            };

        });

    }
}