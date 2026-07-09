const DB_NAME = 'SystemDataBase';
const DB_VERSION = 1; 
const DB_STORE_NAME = 'publications';

let DATA_BASE = null;
let DATA_BASE_PROMISE = null;

export default function openSystemDataBase() {
    
    const indexedDB =
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB ||
                    window.shimIndexedDB;

    if (!indexedDB) {throw new Error("IndexedDB is not supported by this browser.");}

    
    function open() {

        return new Promise((resolve, reject) => {

            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {

                reject(event.target.error);

            };

            request.onsuccess = (event) => {

                DATA_BASE = event.target.result;

                resolve(DATA_BASE);

            };

            request.onupgradeneeded = (event) => {

                const db = event.target.result;

                if (!db.objectStoreNames.contains(DB_STORE_NAME)) {

                    const store = db.createObjectStore(
                        DB_STORE_NAME,
                        {
                            keyPath: "id",
                            autoIncrement: true
                        }
                    );

                    store.createIndex(
                        "component",
                        "component",
                        {
                            unique: false
                        }
                    );
                }

            };

        });

    }

    return open();
}

function openDatabase() {

    if (DATA_BASE_PROMISE)
        return DATA_BASE_PROMISE;

    DATA_BASE_PROMISE = new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onsuccess = (event) => {

            DATA_BASE = event.target.result;

            resolve(DATA_BASE);

        };

        request.onerror = () => {

            reject(request.error);

        };

    });

    return DATA_BASE_PROMISE;

}

export async function getDataBase(awaitTime = 1000){
   
    if (DATA_BASE)
        return DATA_BASE;

    return openDatabase();

}
