import express, {Router} from "express";
import { getAllEvent, healthCheck } from "../controllers/eventController";
import { validateRequest } from "../middleware/validateRequest";
import * as productController from "../controllers/eventController";
import { eventSchemas } from "../validation/eventValidation";
const router: Router = express.Router();



router.get("/health", healthCheck); 
router.get("/events", getAllEvent);
router.get(
       "/events/:id",
       validateRequest(eventSchemas.getById),
       productController.getEventById
);

router.post(
       "/events",
       validateRequest(eventSchemas.create),
       productController.createEvent
);

router.put(
       "/events/:id",
       validateRequest(eventSchemas.update),
       productController.updateEvent
); 
router.delete(
       "/events/:id",
       validateRequest(eventSchemas.delete),
       productController.deleteEvent
); 

export default router;



