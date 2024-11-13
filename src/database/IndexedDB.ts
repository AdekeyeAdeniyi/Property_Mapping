// import { openDB } from 'idb';

// const DB_NAME = 'RealEstateDB';
// const STORE_NAME = 'Properties';

// export const initializeDB = async () => {
//   return openDB(DB_NAME, 1, {
//     upgrade(db) {
//       if (!db.objectStoreNames.contains(STORE_NAME)) {
//         db.createObjectStore(STORE_NAME, { keyPath: 'key' });
//       }
//     },
//   });
// };

// export const saveToDB = async (key: string, value: any) => {
//   const db = await initializeDB();
//   const tx = db.transaction(STORE_NAME, 'readwrite');
//   const timestamp = new Date().getTime();
//   await tx.store.clear();
//   await tx.store.put({ key, value, timestamp });
//   await tx.done;
// };

// export const getFromDB = async (key: string) => {
//   const db = await initializeDB();
//   const tx = db.transaction(STORE_NAME, 'readonly');
//   return await tx.store.get(key);
// };

// export const isDataStale = (timestamp: number, days: number = 7) => {
//   const now = new Date().getTime();
//   const diffInMs = now - timestamp;
//   const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
//   return diffInDays > days;
// };
