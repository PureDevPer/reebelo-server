// import { initializeApp, cert } from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
// import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";
import dotenv from "dotenv";

dotenv.config();

// const firebaseConfig = {
//     type: process.env.FIREBASE_TYPE,
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY,
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
// };
interface IFirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

const firebaseConfig: IFirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY as string,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: process.env.FIREBASE_APP_ID as string,
};
//   initializeApp({
//       credential: cert(firebaseConfig),
//       storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   });

initializeApp(firebaseConfig);

export const dbService: Firestore = getFirestore();
export const storageService: FirebaseStorage = getStorage();
