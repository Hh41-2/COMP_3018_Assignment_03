import express, { Express } from "express";
import morgan from "morgan";
//import eventRoutes from "./api/v1/routes/eventRoutes";


// Initialize Express application
const app: Express = express();

app.use(express.json());
app.use(morgan("combined"));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1/events", );

export default app;