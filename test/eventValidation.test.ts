import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validateRequest";
import Joi from "joi";

describe("validateRequest Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            locals: {},
        };
        mockNext = jest.fn();
    });

    it("should pass for valid body input", () => {
    // Arrange
    const testSchemas = {
       body: Joi.object({
              name: Joi.string().required(),
              date: Joi.date().greater('now').required(),
              capacity: Joi.number().min(5).integer().required()
       }),
    };

    mockReq.body = { name: "Testing Conference", date: "2026-11-11T09:00:00.000Z", capacity: 200 };
    const middleware = validateRequest(testSchemas);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
  });
  it("should fail for invalid body input", () => {
    // Arrange
    const testSchemas = {
       body: Joi.object({
              name: Joi.string().min(3).required(),
              date: Joi.date().greater('now').required(),
              capacity: Joi.number().min(5).integer().required()
       }),
    };

    // Age is out of range
    mockReq.body = { name: "Testing Conference", date: "2026-11-11T09:00:00.000Z" };
    const middleware = validateRequest(testSchemas);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
        error: expect.stringContaining("Validation error"),
    });
    expect(mockNext).not.toHaveBeenCalled();
});
    it("should validate for optional body param", () => {
    // Arrange
    const testSchemas = {
       body: Joi.object({
              name: Joi.string().min(3).required(),
              date: Joi.date().greater('now').required(),
              capacity: Joi.number().min(5).integer().required(),
              registrationCount: Joi.number().max(Joi.ref('capacity')).optional()
       }),
    };

    // Age is out of range
    mockReq.body = { name: "Testing Conference", date: "2026-11-11T09:00:00.000Z", capacity: 200, registrationCount: 199 };
    const middleware = validateRequest(testSchemas);

    // Act
    middleware(mockReq as Request, mockRes as Response, mockNext);

    // Assert
    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
    expect(mockRes.json).not.toHaveBeenCalled();
});
});