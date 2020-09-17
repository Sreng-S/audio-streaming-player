import * as Firebase from 'firebase';

import FirebaseConfig from 'config/firebase';

Firebase.initializeApp(FirebaseConfig);

export const Firestore = Firebase.firestore();
export const Auth = Firebase.auth();
export const Storage = Firebase.storage();
