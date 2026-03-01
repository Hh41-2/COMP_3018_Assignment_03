import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const EVENTS_COLLECTION = "events";

export const createEvent = async (event: Event): Promise<Event> => {
       const newEvent = await firestoreRepository.addDocument(EVENTS_COLLECTION ,event);
       return newEvent;
}

export const updateEvent = async (id: string, event: Event): Promise<Event> => {
       const updatedEvent = await firestoreRepository.updateDocument(EVENTS_COLLECTION, id, event);
       return updatedEvent;
}

export const getAllEvent = async (): Promise<Event[]> => {
       const allEvent = await firestoreRepository.getAllDocument(EVENTS_COLLECTION);
       return allEvent;
}

export const getEventById = async (id: string): Promise<Event> => {
       const eventById = await firestoreRepository.getDocumentById(EVENTS_COLLECTION,id);
       return eventById;
}

export const deleteEvent = async (id: string): Promise<void> => {
       await firestoreRepository.deleteDocument(EVENTS_COLLECTION,id);
}

