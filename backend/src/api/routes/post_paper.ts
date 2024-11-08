import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper } from "../../db/schemas/paper";

/**
 * Route for adding a paper to the database
 * 
 * Route: POST /api/v1/paper
 * 
 * Response:
 * - 200: Paper added successfully
 * - 400: Invalid request
 * - 500: Internal server error
 * @implements ApiRoute
 */
export default class PostPaper implements ApiRoute {
    
    register(app: Express): void {
        app.post("/api/v1/paper", (req, res) => {
            
            // Validation
            const paper = new Paper(req.body);
            let error = paper.validateSync();
            if (error) {
                res.status(400).json({ errors: error.errors });
                return;
            }
            
            // Body is valid, save the paper
            paper.save().then((doc) => {
                res.json({ message: "Paper added successfully", id: doc._id });
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            });

        });
    }

}