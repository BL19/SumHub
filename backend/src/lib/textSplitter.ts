export class TextSplitter {
    separator: string;
    chunkSize: number;
    chunkOverlap: number;
  
    constructor(separator: string, chunkSize: number, chunkOverlap: number) {
      this.separator = separator;
      this.chunkSize = chunkSize;
      this.chunkOverlap = chunkOverlap;
    }
  
    createDocuments(text: string): string[] {
      const chunks: string[] = [];
      const sentences = text.split(this.separator);
  
      let currentChunk = "";
  
      for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i].trim();
        
        // Check if adding this sentence exceeds the chunk size
        if (currentChunk.length + sentence.length + 1 > this.chunkSize) {
          chunks.push(currentChunk.trim());
          // Create a new chunk, considering overlap
          const overlapStart = Math.max(0, currentChunk.length - this.chunkOverlap);
          currentChunk = currentChunk.slice(overlapStart);
        }
        
        currentChunk += (currentChunk ? this.separator : "") + sentence;
      }
  
      // Push the final chunk if it has content
      if (currentChunk.trim()) {
        chunks.push(currentChunk.trim());
      }
  
      return chunks;
    }
  }