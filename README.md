# SumHub

A search engine for research papers, built by students for students

## What it solves
SumHub addresses the challenge students face in conducting efficient literature reviews by providing an AI-powered platform for sharing and discovering research papers. 
Often, students waste valuable time sifting through irrelevant resources. SumHub streamlines this process, allowing users to quickly access relevant, high-quality materials curated by others. This not only speeds up research but also improves the quality of students’ academic work.

## How it works

SumHub uses a MongoDB database for storing all papers and other data. All papers are indexed in the vector database pinecone, pinecone was selected over MongoDB due to the generous free tier on pinecone in contrast to the 500MiB we get from MongoDB Atlas.

To convert the papers into a form that we can feed into pinecone, Google Gemini Embeddings are used to create a 768-dimensional vector.
