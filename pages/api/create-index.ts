import { PINECONE_INDEX_NAME } from '@/config/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { NextApiRequest, NextApiResponse } from 'next';
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
const post = async (req: NextApiRequest, res: NextApiResponse) => {
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
    return res.status(400).json({ message: createError.message });
  }
  return res.status(201);
};

export default post;
