# SumHub

A search engine for research papers, _built by students for students_

## What SumHub solves
SumHub addresses the challenge students face in conducting efficient literature reviews by providing an AI-powered platform for sharing and discovering research papers. 
Often, students waste valuable time sifting through irrelevant resources. SumHub streamlines this process, allowing users to quickly access relevant, high-quality materials curated by others. This not only speeds up research but also improves the quality of students’ academic work.

## How SumHub works

SumHub uses a [MongoDB](https://www.mongodb.com/products/platform/atlas-database) database for storing all papers and other data. All papers are indexed in the vector database [Pinecone](https://www.pinecone.io/product/), Pinecone was selected over MongoDB since we were afraid that all vectors would not fit in the 512MB of the MongoDB Atlas M0 Free Tier. Since pinecone provides 2GB of free vector storage in their free tier, we decided to go with that to split out the data usage.

To convert the papers into a form that we can feed into pinecone, Google Gemini Embeddings are used to create a 768-dimensional vector.

## How is SumHub built?

SumHub is a web-based application built on a modern tech stack to ensure efficiency, performance, and scalability. The core technologies include **JavaScript** and **TypeScript** for dynamic functionality, **React.js** and **Next.js** for a responsive and optimized user interface, and **Docker** for consistent deployment across environments. Data is managed with **AtlasDB** and **Pinecone** to enable vector search for AI-driven features, enhanced by **Google Gemini** Embeddings for semantic search and natural language processing. **Tailwind CSS** and **ShadCN UI** components for fast, consistent styling and pre-built UI elements to create a seamless, good-looking and smooth user experience.

### Modules
SumHub is built in 2 modules, the [backend](https://github.com/BL19/SumHub/tree/main/backend) and the [frontend](https://github.com/BL19/SumHub/tree/main/frontend/sumhub).

The backend is a express.js application running in bun, this module is published from github actions to the main tag of [`bl19dev/sumhub-backend:main` on Docker Hub](https://hub.docker.com/repository/docker/bl19dev/sumhub-backend).

The frontend is a next.js application with server side rendering to enable fast loading times and good SEO, similar to the backend a docker image is built from github actions to the main tag of [`bl19dev/sumhub-frontend:main` on Docker Hub](https://hub.docker.com/repository/docker/bl19dev/sumhub-frontend/general).

Both of these publish the builds on push to the main branch and publishes onto docker hub with the main tag. This allows for easy deployment of the application using Docker Compose or Kubernetes.
