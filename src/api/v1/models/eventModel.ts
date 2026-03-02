export interface Event {
       id: string; // Unique identifier for the event
       name: string; // Event name/title
       date: string; // ISO date/time string for when the event occurs
       capacity: number; // Maximum number of registrants/attendees allowed
       registrationCount: number; // Current number of registrations 
       status: string; // Event status
       category: string; // Event category/type
       createdAt: string; // ISO date/time string for when the event record was created
       updatedAt: string; // ISO date/time string for the most recent update to the event record
}