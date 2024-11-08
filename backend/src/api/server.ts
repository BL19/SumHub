import express from 'express';
import { ApiRoute } from './apiRoute';
import GetPaper from './routes/get_paper';
import PostPaper from './routes/post_paper';

export class ApiServer {
    private app: express.Express;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        
        this.register(new GetPaper());
        this.register(new PostPaper());
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