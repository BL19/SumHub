import { Index, Pinecone, RecordMetadata } from "@pinecone-database/pinecone";


/**
 * Wrapper for the Pinecone API
 * 
 * This class handles authentication and index selection for the
 * Pinecone library.
 * 
 * @class PineconeAPI
 */
export class PineconeAPI {

    private pinecone: Pinecone;
    public paperIndex: Index<RecordMetadata>;

    constructor() {
        const apiKey = process.env.PINECONE_API_KEY;
        if (!apiKey) {
            throw new Error('PINECONE_API_KEY is not set');
        }
        this.pinecone = new Pinecone({
            apiKey: apiKey
        });

        let paperIndexName = process.env.PINECONE_PAPER_INDEX || 'sumhub-papers';
        this.paperIndex = this.pinecone.index(paperIndexName);
    }

}

