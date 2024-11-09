import express from 'express';
import { ApiRoute } from './apiRoute';
import GetPaper from './routes/get_paper';
import PostPaper from './routes/post_paper';
import { GeminiAPI } from '../lib/gemini';
import { PineconeAPI } from '../lib/pinecone';
import SearchPaper from './routes/search_paper';
import { Embedder } from '../lib/embedder';
import cors from 'cors';

export class ApiServer {
    private app: express.Express;
    private gemini: GeminiAPI;
    private pinecone: PineconeAPI;
    private embedder: Embedder;

    constructor() {
        this.app = express();
        this.app.use(cors({
            origin: process.env.CORS_ORIGIN || '*',
            methods: ['GET', 'POST', 'DELETE', 'PUT'],
            optionsSuccessStatus: 200
        }));

        this.app.use(express.json());

        this.gemini = new GeminiAPI();
        this.pinecone = new PineconeAPI();
        this.embedder = new Embedder(this.gemini, this.pinecone);
        
        this.register(new GetPaper());
        this.register(new PostPaper(this.embedder));
        this.register(new SearchPaper(this.gemini, this.pinecone));
    }

    private register(route: ApiRoute): void {
        route.register(this.app);
    }

    listen(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server listening on http://0.0.0.0:${port}`);
        });
    }

}