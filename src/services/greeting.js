// addGreeting.js
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, query, orderBy, getDocs } from "firebase/firestore";

export const sendGreeting = async (text) => {
  try {
    await addDoc(collection(db, "greetings"), {
      text,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
  }
};

export const getGreetings = async () => {
  const q = query(collection(db, "greetings"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};