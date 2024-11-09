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
        let parts = [];
        let responses = await this.gemini.generateEmbeddings(chunks);
        for (let i = 0; i < responses.length; i++) {
            const embedding = responses[i];
            parts.push({
                id: paperId + "-" + i,
                values: embedding.values
            });
        }
        console.log(`Saving ${chunks.length} embeddings for ${paperId}`);
        await this.pinecone.paperIndex.upsert(parts);
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