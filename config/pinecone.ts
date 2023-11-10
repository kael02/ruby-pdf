/**
 * Change the namespace to the namespace on Pinecone you'd like to store your embeddings.
 */

if (!process.env.PINECONE_INDEX_NAME) {
  throw new Error('Missing Pinecone index name in .env file');
}

const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME ?? '';

//namespace is optional for your vectors
// ignore if the plan is Starter

const PINECONE_NAME_SPACE = 'pdf-test';

export { PINECONE_INDEX_NAME, PINECONE_NAME_SPACE };
