import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION = "events";

/**
 * Creates an event in the database
 * @param event - event object with various fields
 * @returns returns a created event
 */
export const createEvent = async (event: Event): Promise<Event> => {
       const newEvent = await firestoreRepository.addDocument(EVENTS_COLLECTION ,event);
       return newEvent;
}

/**
 * Updates an event in the database
 * @param id - Unique identifier for the event
 * @param event - event object with various fields
 * @returns returns an updated event
 */
export const updateEvent = async (id: string, event: Event): Promise<Event> => {
       const updatedEvent = await firestoreRepository.updateDocument(EVENTS_COLLECTION, id, event);

       const orderedEvent: Event = {
              id: updatedEvent.id,
              name: updatedEvent.name,
              date: updatedEvent.date,
              capacity: updatedEvent.capacity,
              registrationCount: updatedEvent.registrationCount,
              status: updatedEvent.status,
              category: updatedEvent.category,
              createdAt: updatedEvent.createdAt,
              updatedAt: updatedEvent.updatedAt
       };
       
       return orderedEvent;
};

/**
 * Retrieves all the event in the database
 * @returns returns a list of event
 */
export const getAllEvent = async (): Promise<Event[]> => {
       const allEvent = await firestoreRepository.getAllDocument(EVENTS_COLLECTION);
       return allEvent;
}

/**
 * Retrieves an event in the database by id
 * @param id - Unique identifier for the event
 * @returns returns an event with a specified id
 */
export const getEventById = async (id: string): Promise<Event> => {
       const eventById = await firestoreRepository.getDocumentById(EVENTS_COLLECTION,id);
       return eventById;
}

/**
 * Deletes an event in the database by id
 * @param id - Unique identifier for the event
 */
export const deleteEvent = async (id: string): Promise<void> => {
       await firestoreRepository.deleteDocument(EVENTS_COLLECTION,id);
}

