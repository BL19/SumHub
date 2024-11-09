import { Document, ObjectId } from "mongoose";
import { Paper } from "../db/schemas/paper";
import { GeminiAPI } from "./gemini";
import { PineconeAPI } from "./pinecone";
import { TextSplitter } from "./textSplitter";

export class Embedder {

    gemini: GeminiAPI;
    pinecone: PineconeAPI;

    constructor(gemini: GeminiAPI, pinecone: PineconeAPI) {
        this.gemini = gemini;
        this.pinecone = pinecone;
    }

    async saveEmbeddingsForPaper(paper: Document<unknown, {}, Paper>): Promise<number> {
        let id = paper._id as ObjectId;
        let groups = this.saveEmbeddings(id.toString(), this.createEmbeddingText(paper.toObject()));
        paper.set('embeddingCount', groups);
        return groups;
    }

    async saveEmbeddings(paperId: string, text: string): Promise<number> {
        let splitter = new TextSplitter(".", 512, 256);
        let chunks = splitter.createDocuments(text);
        for (let i = 0; i < chunks.length; i++) {
            const embedding = await this.gemini.generateEmbedding(chunks[i]);
            await this.pinecone.paperIndex.upsert([{
                id: paperId + "-" + i,
                values: embedding.values
            }]);
        }
        return chunks.length;
    }

    createEmbeddingText(paper: Paper): string {
        return `Title: ${paper.title} 
        Abstract: 
        ${paper.abstract}

        Subjects: ${paper.subjects.join(', ')}
        
        Authors: ${paper.authors.join(', ')}`;
    }

}