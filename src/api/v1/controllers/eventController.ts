import { Request, Response, NextFunction } from "express";
import { Event } from "../models/eventModelModel";
import { HTTP_STATUS } from "../../../constants/httpConstants"
import * as eventService from "../services/eventService";
import { successResponse } from "../models/responseModel";

export const healthCheck = (req: Request, res: Response) => {
       res.status(200).json({
              status: "OK",
              uptime: process.uptime(),
              timestamp: new Date().toISOString(),
              version: "1.0.0",
       });
}

/**
 * Handles updating an event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await eventService.updateEvent(req.params.id as string, req.body);
        res.status(HTTP_STATUS.OK).json(successResponse({}));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles creating an event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newEvent = await eventService.createEvent(req.body);
        res.status(HTTP_STATUS.CREATED).json(successResponse({newEvent}, "Event created"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles retrieving all event.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allEvent = await eventService.getAllEvent();
        res.status(HTTP_STATUS.OK).json(successResponse({allEvent}, "Event retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles retrieving an event by id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allEvent = await eventService.getEventById(req.params.id);
        res.status(HTTP_STATUS.OK).json(successResponse({allEvent}, "Event retrieved"));
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Handles deleting an event by id.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const allEvent = await eventService.deleteEvent(req.params.id);
        res.status(HTTP_STATUS.OK).json(successResponse({allEvent}, "Event deleted"));
    } catch (error: unknown) {
        next(error);
    }
};