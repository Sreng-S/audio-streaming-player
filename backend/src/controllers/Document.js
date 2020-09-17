import {Firestore} from '../lib/firebase';
import uuid from 'uuid/v4';

let date = new Date();
let codeCollection = Firestore.collection('files');

export const addDocument = async payload => {
  try {
    const id = uuid();
    let snapshot = await codeCollection.get();

    let proDoc = Firestore.collection('files').doc(id);
    await proDoc.set({
      id: id,
      active: 1,
      name: payload.name,
      url: payload.url,
      order: snapshot.docs.length,
      created: date.getTime(),
    });
  } catch (error) {
    throw error;
  }
};

export const updateDocument = async payload => {
  try {
    let proDoc = Firestore.collection('files').doc(payload.id);
    await proDoc.update({
      id: payload.id,
      active: 1,
      name: payload.name,
      url: payload.url,
      order: payload.order
    });
  } catch (error) {
    throw error;
  }
};

export const deactivateDocument = async id => {
  try {
    await codeCollection.doc(id).update({
      active: 0,
    });
  } catch (error) {
    throw error;
  }
};

export const activateDocument = async id => {

  try {
    await codeCollection.doc(id).update({
      active: 1,
    });
  } catch (error) {
    throw error;
  }
};

export const getDocumentById = id =>
  new Promise((resolve) => {
    let proDoc = Firestore.collection('files').doc(id);
    proDoc.onSnapshot(async snapshot => {
      if (snapshot.data()) {
        let codeData = {
          id: snapshot.data().id,
          active: snapshot.data().active,
          url: snapshot.data().url,
          order:snapshot.data().order,
          name: snapshot.data().name,
        };
  
        resolve(codeData);
      }
    });
  });

// search codes with the criteria
export const getDocuments = async () => {
  try {
    let snapshot = await codeCollection.get();

    let tasks = snapshot.docs.map(proDoc => getDocumentById(proDoc.id));
    return Promise.all(tasks);
  } catch (error) {
    throw error;
  }
};

export const sortOrder = async () => {
  try {
    let playerRef = await codeCollection.orderBy('order', 'asc');
    playerRef.get().then(async (snapshot) => {
      let files = snapshot.docs;
      for(let i = 0; i < files.length; i ++) {
        await codeCollection.doc(files[i].data().id).set({
          order: i,
        }, {merge: true});
      }
    });
  } catch (error) {
    throw error;
  }
};
