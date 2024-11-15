import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper } from "../../db/schemas/paper";
import { GeminiAPI } from "../../lib/gemini";
import { PineconeAPI } from "../../lib/pinecone";
import { Embedder } from "../../lib/embedder";

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
    
    embedder: Embedder;

    constructor(embedder: Embedder) {
        this.embedder = embedder;
    }

    register(app: Express): void {
        app.post("/api/v1/paper", async (req, res) => {
            
            // Validation
            const paper = new Paper(req.body);
            let error = paper.validateSync();
            if (error) {
                res.status(400).json({ errors: error.errors });
                return;
            }

            if (await Paper.exists({ url: paper.url })) {
                res.status(409).json({ error: "A paper with that URL already exists" });
                return;
            }
            
            // Body is valid, save the paper
            await paper.save().then(async (doc) => {
                try {
                    await this.embedder.saveEmbeddingsForPaper(doc);
                } catch (err) {
                    console.error(err);
                    res.status(500).json({ error: "Internal server error" });
                    doc.deleteOne();
                    return;
                }

                console.log(`Paper added: ${doc._id} - ${doc.title}`);

                res.json({ message: "Paper added successfully", id: doc._id });
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            });

        });
    }

}