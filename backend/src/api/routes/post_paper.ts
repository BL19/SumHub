import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper } from "../../db/schemas/paper";
import { GeminiAPI } from "../../lib/gemini";
import { PineconeAPI } from "../../lib/pinecone";

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
    
    gemini: GeminiAPI;
    pinecone: PineconeAPI;

    constructor(gemini: GeminiAPI, pinecone: PineconeAPI) {
        this.gemini = gemini;
        this.pinecone = pinecone;
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
            
            // Body is valid, save the paper
            await paper.save().then(async (doc) => {
                // Create the embedding for the paper
                const embedding = await this.gemini.generateEmbedding(this.createEmbeddingText(paper));

                // Save the embedding
                await this.pinecone.paperIndex.upsert([{
                    id: doc._id.toString(),
                    values: embedding.values
                }])

                res.json({ message: "Paper added successfully", id: doc._id });
            }).catch((err) => {
                console.error(err);
                res.status(500).json({ error: "Internal server error" });
            });

        });
    }

    createEmbeddingText(paper: Paper): string {
        return `Title: ${paper.title} 
        Abstract: 
        ${paper.abstract}

        Subjects: ${paper.subjects.join(', ')}
        
        Authors: ${paper.authors.join(', ')}`;
    }

}