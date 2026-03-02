import { createEvent, updateEvent, getAllEvent, getEventById, deleteEvent } from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

jest.mock("../src/api/v1/repositories/firestoreRepository");

// Arrange test event data
const mockEvent = {
  id: "123abc",
  name: "Test Event",
  date: "2026-11-11T09:00:00.000Z",
  capacity: 50,
  registrationCount: 0,
  status: "active",
  category: "conference",
  createdAt: "2026-02-29T10:00:00.000Z",
  updatedAt: "2026-02-29T10:00:00.000Z"
};

  describe("createEvent", () => {
  it("should create an event with necessary fields", async () => {
    // Arrange
    (firestoreRepository.addDocument as jest.Mock).mockResolvedValue(mockEvent);

    // Act
    const result = await createEvent(mockEvent);

    // Assert
    expect(firestoreRepository.addDocument).toHaveBeenCalledWith("events", mockEvent);
    expect(result).toEqual(mockEvent);
  });
  describe("updateEvent", () => {
  it("should update an event and return the updated event", async () => {
    (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(mockEvent);

    const result = await updateEvent("123abc", mockEvent);

    expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("events", "123abc", mockEvent);
    expect(result).toEqual(mockEvent);
  });
});

  describe("getAllEvent", () => {
  it("should return all events", async () => {
    (firestoreRepository.getAllDocument as jest.Mock).mockResolvedValue([mockEvent]);

    const result = await getAllEvent();

    expect(firestoreRepository.getAllDocument).toHaveBeenCalledWith("events");
    expect(result).toEqual([mockEvent]);
  });
});
  
  describe("getEventById", () => {
  it("should return an event by id", async () => {
    (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockEvent);

    const result = await getEventById("123abc");

    expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("events", "123abc");
    expect(result).toEqual(mockEvent);
  });
});
  describe("deleteEvent", () => {
  it("should delete an event", async () => {
    (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

    const result = await deleteEvent("123abc");

    expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("events", "123abc");
    expect(result).toBeUndefined(); // or use .toEqual(undefined)
  });

});
});