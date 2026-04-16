import { db, auth } from './firebase';
import { collection, addDoc, getDoc, doc, updateDoc, arrayUnion, query, where, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

/**
 * Auth: Register user
 */
export const registerUser = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Auth: Login user
 */
export const loginUser = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

/**
 * Auth: Logout user
 */
export const logoutUser = () => {
  return signOut(auth);
};

/**
 * Saves a new wedding event to Firestore
 * @param {Object} eventData - The data from CreatorForm
 * @param {string} userId - The ID of the owner
 * @returns {Promise<string>} - The ID of the created event
 */
export const saveEvent = async (eventData, userId) => {
  try {
    const docRef = await addDoc(collection(db, "events"), {
      ...eventData,
      userId: userId, // Link to the user
      createdAt: new Date().toISOString(),
    });
    console.log("Event saved with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

/**
 * Gets all events for a specific user
 */
export const getUserEvents = async (userId) => {
  try {
    const q = query(collection(db, "events"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (e) {
    console.error("Error getting user events: ", e);
    throw e;
  }
};

/**
 * Submits an RSVP for a specific event
 */
export const submitRSVP = async (eventId, rsvpData) => {
  try {
    // We can either have a subcollection or just an array in the event doc
    // Let's use a subcollection for better scalability
    await addDoc(collection(db, "events", eventId, "rsvps"), {
      ...rsvpData,
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Error submitting RSVP: ", e);
    throw e;
  }
};
