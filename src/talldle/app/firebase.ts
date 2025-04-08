'use client';

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, logEvent, Analytics, AnalyticsCallOptions } from 'firebase/analytics';
import { getFirestore, doc, getDoc, Firestore } from 'firebase/firestore';
import { Guess, Celeb } from "./useGameState";


const allowLogs: boolean = true;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? ''
};


let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;
let db: Firestore | undefined;

// initialize Firebase
if (typeof window !== 'undefined') {
  app = initializeApp(firebaseConfig);

  analytics = getAnalytics(app);
  db = getFirestore(app);
}

// functions for helping logs
const log = function(eventName: string, eventParams?: {[key: string]: string | number | boolean;}, options?: AnalyticsCallOptions) {
  // make sure we were able to connect to the firebase project
  if (allowLogs && analytics !== undefined) {
    logEvent(analytics, eventName, {...eventParams, is_prod: process.env.NODE_ENV === 'production'}, options);
  }
};

// functions for specific logs
const logScore = function(guesses: Array<Array<Guess>>) {
  log("game_over", {guesses: JSON.stringify(guesses)});
};

const logShare = function(gameOver: boolean) {
  log("share", {is_game_over: gameOver});
};

const getDailyCelebs = async function(dayIndex: number) {
  const todaysCelebIds: string[] = (await getDoc(doc(db!, 'order', dayIndex.toString()))).data()!['data'] as string[];

  const todaysCelebs: Celeb[] = await Promise.all(
    todaysCelebIds.map(async (celebId) => {
      const docSnap = await getDoc(doc(db!, 'data', celebId));
      return docSnap.data() as Celeb;
    })
  );

  return todaysCelebs;
};

export { logScore, logShare, getDailyCelebs }
