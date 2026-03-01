import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { Event } from "../models/eventModel";


const addDocument = async <T>(collectionName: string, event: Event): Promise<void> => {
    try{
       // Create a reference to a document in the 'users' collection with ID 'user1'
       // If the document doesn't exist, it will be created
       const docRef: DocumentReference = db.collection(collectionName).doc();

       // Use the `set` method to add or overwrite data in the document
       // The data is passed as an object with fields and their values
       await docRef.set({
              id: docRef.id,
              name: event.name,
              date: event.date,
              capacity: event.capacity,
              registrationCount: event.registrationCount ?? 0,
              status: event.status ?? "active",              category: event.category ?? "general",
              createdAt: Date,
              updatedAt: Date,
       });
       console.log("Document added");

    } catch (error: unknown) {
        const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
        throw new Error(
            `Failed to create document in ${collectionName}: ${errorMessage}`
        );
    }
};

/**
 * Updates an existing document in a specified Firestore collection.
 * @param {string} collectionName - The name of the collection.
 * @param {string} id - The ID of the document to update.
 * @param {Partial<T>} data - The updated document data.
 * @returns {Promise<void>}
 * @throws {Error} - If an error occurs during document update.
 */
export const updateDocument = async <T>(collectionName: string, id: string, event: Partial<T>): Promise<void> => {
    try {
       await db.collection(collectionName).doc(id).update(event);

    } catch (error: unknown) {
       const errorMessage =
       error instanceof Error ? error.message : "Unknown error";
       throw new Error(
       `Failed to create document in ${collectionName}: ${errorMessage}`
       );
    }
};