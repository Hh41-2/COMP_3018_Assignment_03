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
              category: event.category ?? "active",
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
