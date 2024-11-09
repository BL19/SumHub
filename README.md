# SumHub

A search engine for research papers, _built by students for students_

## What SumHub solves
SumHub addresses the challenge students face in conducting efficient literature reviews by providing an AI-powered platform for sharing and discovering research papers. 
Often, students waste valuable time sifting through irrelevant resources. SumHub streamlines this process, allowing users to quickly access relevant, high-quality materials curated by others. This not only speeds up research but also improves the quality of students’ academic work.

## How SumHub works

SumHub uses a [MongoDB](https://www.mongodb.com/products/platform/atlas-database) database for storing all papers and other data. All papers are indexed in the vector database [Pinecone](https://www.pinecone.io/product/), Pinecone was selected over MongoDB due to the generous free tier on pinecone in contrast to the 500MiB we get from MongoDB Atlas.

To convert the papers into a form that we can feed into pinecone, Google Gemini Embeddings are used to create a 768-dimensional vector.

## How is SumHub built?

SumHub is a web-based application built on a modern tech stack to ensure efficiency, performance, and scalability. The core technologies include **JavaScript** and **TypeScript** for dynamic functionality, **React.js** and **Next.js** for a responsive and optimized user interface, and **Docker** for consistent deployment across environments. Data is managed with **AtlasDB** and **Pinecone** enables vector search for AI-driven features, enhanced by **Google Gemini** Embeddings for semantic search and natural language processing. **Tailwind CSS** and **ShadCN UI** components for fast, consistent styling and pre-built UI elements to create a seamless, good-looking and smooth user experience.
