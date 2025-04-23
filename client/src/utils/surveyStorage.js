import { openDB } from 'idb';

const DB_NAME = 'SurveyAppDB';
const STORE_NAME = 'Surveys';

const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    }
  });
};

export const saveSurveyToDB = async (surveyID, data) => {
  const db = await initDB();
  await db.put(STORE_NAME, { id: surveyID, data });
};

export const getSurveyFromDB = async (surveyID) => {
  const db = await initDB();
  return await db.get(STORE_NAME, surveyID);
};

export const deleteSurveyFromDB = async (surveyID) => {
  const db = await initDB();
  await db.delete(STORE_NAME, surveyID);
};
