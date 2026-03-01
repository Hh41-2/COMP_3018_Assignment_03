import { Event } from "../models/eventModel";
import * as firestoreRepository from "../repositories/firestoreRepository";



const EVENTS_COLLECTION = "events";

export const createEvent = async (event: Event): Promise<Event> => {
       const newEvent = await firestoreRepository.addDocument(EVENTS_COLLECTION ,event);
       return newEvent;
}