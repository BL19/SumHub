import { Express } from "express";
import { ApiRoute } from "../apiRoute";
import { Paper, paperToJson } from "../../db/schemas/paper";
import { GeminiAPI } from "../../lib/gemini";
import { PineconeAPI } from "../../lib/pinecone";
import { RecordMetadata, ScoredPineconeRecord } from "@pinecone-database/pinecone";

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
            if (!term || typeof term !== "string" || term.length === 0 || term.length > 100) {
                res.status(400).json({ error: "Invalid request" });
                return;
            }

            const topK = (req.body.topK || 10) * 10;
            if (topK < 10 || topK > 1000) {
                res.status(400).json({ error: "Invalid request, topK must be between 1 and 100" });
                return;
            }

            // Search
            const embedding = await this.gemini.generateEmbedding(term);
            const results = await this.pinecone.paperIndex.query({
                topK: topK,
                vector: embedding.values
            })

            
            
            // Group by paper ID
            let groups: { [key: string]: ScoredPineconeRecord<RecordMetadata>[] } = {};
            let bestScore: { [key: string]: number } = {};

            results.matches.forEach((match) => {
                let id = this.findId(match.id);
                if (!groups[id]) {
                    groups[id] = [];
                }
                groups[id].push(match);

                if (match.score && (!bestScore[id] || match.score > bestScore[id])) {
                    bestScore[id] = match.score;
                }
            });

            let paperIds = Object.keys(groups);
            // Remove duplicates
            paperIds = [...new Set(paperIds)];

            // order by best score
            paperIds.sort((a, b) => {
                if (bestScore[a] && bestScore[b]) {
                    return bestScore[b] - bestScore[a];
                } else if (bestScore[a]) {
                    return -1;
                } else if (bestScore[b]) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Keep only topK
            paperIds = paperIds.slice(0, topK / 10);



            // Fetch from database
            const papers = await Paper.find({ _id: { $in: paperIds } });
            const response = papers.map((paper) => {
                return {
                    data: paperToJson(paper),
                    score: bestScore[paper._id.toString()]
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