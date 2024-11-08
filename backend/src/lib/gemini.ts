import { ContentEmbedding, GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

/**
 * GeminiAPI is a wrapper around the GoogleGenerativeAI library
 * that provides a simplified interface for generating embeddings
 * from text.
 * 
 * This class handles authentication and model selection for the
 * GoogleGenerativeAI library.
 * 
 * @class GeminiAPI
 * @external GoogleGenerativeAI
 */
export class GeminiAPI {

    genAI: GoogleGenerativeAI;
    model: GenerativeModel;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set');
        }
        this.genAI = new GoogleGenerativeAI(apiKey);

        this.model = this.genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || 'text-embedding-004',
        })
    }

    async generateEmbedding(text: string): Promise<ContentEmbedding> {
        let response = await this.model.embedContent(text);
        return response.embedding;
    }

}