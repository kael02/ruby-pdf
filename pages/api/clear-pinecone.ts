import { PINECONE_INDEX_NAME } from '@/config/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { NextApiRequest, NextApiResponse } from 'next';
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const post = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Attempt to delete the existing index
    await pinecone.deleteIndex({ indexName: PINECONE_INDEX_NAME });
    console.log(`Index ${PINECONE_INDEX_NAME} successfully deleted.`);
    await sleep(10000);
    // Proceed to create a new index
    try {
      await pinecone.createIndex({
        createRequest: {
          name: PINECONE_INDEX_NAME,
          dimension: 1536,
          metric: 'euclidean',
        },
      });
      console.log(`Index ${PINECONE_INDEX_NAME} successfully created.`);
    } catch (createError: any) {
      // Handle errors during index creation
      console.error(`Failed to create index: ${createError.message}`);
    }
  } catch (deleteError: any) {
    // Handle errors during index deletion
    console.error(`Failed to delete index: ${deleteError.message}`);
  }

  return res.status(204).json('deleted');
};

export default post;
