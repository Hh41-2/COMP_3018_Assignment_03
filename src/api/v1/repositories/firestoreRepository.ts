import { db } from "../../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import { QuerySnapshot } from "firebase-admin/firestore";
import { Event } from "../models/eventModel";


const addDocument = async <T>(collectionName: string, event: Event): Promise<Event> => {
    try{
       // Create a reference to a document in the 'users' collection with ID 'user1'
       // If the document doesn't exist, it will be created
       const docRef: DocumentReference = db.collection(collectionName).doc();

       // Use the `set` method to add or overwrite data in the document
       // The data is passed as an object with fields and their values
       const newEvent: Event = {
              id: docRef.id,
              name: event.name,
              date: event.date,
              capacity: event.capacity,
              registrationCount: event.registrationCount ?? 0,
              status: event.status ?? "active",              category: event.category ?? "general",
              createdAt: new Date(),
              updatedAt: new Date(),
       };
       await docRef.set(newEvent);
       console.log("Document added");
       return newEvent;

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
export const updateDocument = async <T>(collectionName: string, id: string, event: Partial<T>): Promise<Event> => {
    try {
       const docRef: DocumentReference = db.collection(collectionName).doc(id);
       await docRef.update(event);

       const updatedEvent = await docRef.get();
       if(!updatedEvent.exists){
              throw new Error("Event not found");
       }
       return updatedEvent.data() as Event;
       
    } catch (error: unknown) {
       const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
       throw new Error(
              `Failed to update document in ${collectionName}: ${errorMessage}`
       );
    }
};

const getAllDocument = async (collectionName: string): Promise<Event[]> => {
    try{
       // Retrieve all documents from the 'users' collection
       // `get()` returns a QuerySnapshot containing all documents in the collection
       const snapshot: QuerySnapshot = await db.collection(collectionName).get();

       const eventList: Event[] = snapshot.docs.map((doc) => {
              return {
              id: doc.id,
              ...doc.data()
              } as Event;
       });
       return eventList;

    } catch (error: unknown) {
       const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
       throw new Error(
              `Failed to retrieve all document in ${collectionName}: ${errorMessage}`
       );
    }
};

const getDocumentById = async (collectionName: string, id: string): Promise<Event> => {
    try{
       // Create a reference to a specific document in the 'users' collection
       const docRef: DocumentReference = db.collection(collectionName).doc(id);

       // Use the `get()` method to retrieve the document
       const doc = await docRef.get();
       
       // Check if the document exists
       if (!doc.exists){
              throw new Error("Event not found");
       }
       const eventById = {id: doc.id, ...doc.data()} as Event;

       return eventById;

    } catch (error: unknown) {
       const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
       throw new Error(
              `Failed to retrieve document with id: ${id} in ${collectionName}: ${errorMessage}`
       );
    }
};

const deleteDocument = async (collectionName: string, id: string): Promise<void> => {
    try{
       // Create a reference to a specific document in the 'users' collection
       const docRef: DocumentReference = db.collection(collectionName).doc(id);

       // Use the `delete()` method to remove the document from Firestore
       await docRef.delete();

    } catch (error: unknown) {
       const errorMessage =
              error instanceof Error ? error.message : "Unknown error";
       throw new Error(
              `Failed to delete document in ${collectionName}: ${errorMessage}`
       );
    }
       
};