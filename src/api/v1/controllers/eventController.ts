import { NextFunction, Request, Response } from "express";
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