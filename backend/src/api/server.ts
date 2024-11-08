import express from 'express';
import { ApiRoute } from './apiRoute';
import GetPaper from './routes/get_paper';
import PostPaper from './routes/post_paper';
import { GeminiAPI } from '../lib/gemini';
import { PineconeAPI } from '../lib/pinecone';
import SearchPaper from './routes/search_paper';

export class ApiServer {
    private app: express.Express;
    private gemini: GeminiAPI;
    private pinecone: PineconeAPI;

    constructor() {
        this.app = express();
        this.app.use(express.json());

        this.gemini = new GeminiAPI();
        this.pinecone = new PineconeAPI();
        
        this.register(new GetPaper());
        this.register(new PostPaper(this.gemini, this.pinecone));
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