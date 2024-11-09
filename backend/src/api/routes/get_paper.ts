import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper, paperToJson } from "../../db/schemas/paper";
import { ObjectId } from "mongodb";

/**
 * Route for getting a paper by its ID
 * 
 * Route: GET /api/v1/paper/:id
 * 
 * Response:
 * - 200: Returns the paper
 * - 404: Paper not found
 * - 500: Internal server error
 * @implements ApiRoute
 */
export default class GetPaper implements ApiRoute {
    
    register(app: Express): void {
        app.get("/api/v1/paper/:id", (req, res) => {
            const id = req.params.id;
            if (!ObjectId.isValid(id)) {
                res.status(404).json({ error: "Paper not found" });
                return;
            }
            
            const paperId = new ObjectId(id);
            Paper.findById(paperId).then((paper) => {
                if (paper) {
                    res.json(paperToJson(paper));
                } else {
                    res.status(404).json({ error: "Paper not found" });
                }
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            });
        });
    }

}