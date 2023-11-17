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
    return res.status(204).json({ message: 'deleted' });
    // Proceed to create a new index
  } catch (deleteError: any) {
    // Handle errors during index deletion
    console.error(`Failed to delete index: ${deleteError.message}`);
    return res.status(400).json({ message: deleteError.message });
  }
};

export default post;
