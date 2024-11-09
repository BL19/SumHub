import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper, paperToJson } from "../../db/schemas/paper";
import { GeminiAPI } from "../../lib/gemini";
import { PineconeAPI } from "../../lib/pinecone";

/**
 * Route for searching for papers
 * 
 * Route: POST /api/v1/paper/search
 * 
 * Response:
 * - 200: Returns the papers
 * - 400: Invalid request
 * - 500: Internal server error
 * @implements ApiRoute
 */
export default class SearchPaper implements ApiRoute {
    
    gemini: GeminiAPI;
    pinecone: PineconeAPI;

    constructor(gemini: GeminiAPI, pinecone: PineconeAPI) {
        this.gemini = gemini;
        this.pinecone = pinecone;
    }

    register(app: Express): void {
        app.post("/api/v1/paper/search", async (req, res) => {
            const term = req.body.term;
            const topK = req.body.topK || 10;
            if (!term) {
                res.status(400).json({ error: "Invalid request" });
                return;
            }
            if (topK < 1 || topK > 100) {
                res.status(400).json({ error: "Invalid request, topK must be between 1 and 100" });
                return;
            }

            const embedding = await this.gemini.generateEmbedding(term);
            const results = await this.pinecone.paperIndex.query({
                topK: topK,
                vector: embedding.values
            })
            
            const paperIds = results.matches.map((match) => this.findId(match.id));
            console.log(paperIds);
            const papers = await Paper.find({ _id: { $in: paperIds } });

            const response = papers.map((paper) => {
                const score = results.matches.find((match) => match.id === paper._id.toString())?.score;
                return {
                    data: paperToJson(paper),
                    score: score
                }
            });

            // Sort by score
            response.sort((a, b) => {
                if (a.score && b.score) {
                    return b.score - a.score;
                } else if (a.score) {
                    return -1;
                } else if (b.score) {
                    return 1;
                } else {
                    return 0;
                }
            });

            res.json(response);
        });
    }

    findId(pineconeId: string): string {
        let lastIndex = pineconeId.lastIndexOf("-");
        return pineconeId.substring(0, lastIndex);
    }

}