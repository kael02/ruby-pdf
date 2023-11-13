import { PINECONE_INDEX_NAME } from '@/config/pinecone';
import { pinecone } from '@/utils/pinecone-client';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { PineconeStore } from 'langchain/vectorstores/pinecone';

/* Name of directory to retrieve your files from 
   Make sure to add your PDF files inside the 'docs' folder
*/
// const filePath = 'docs';

const SPLIT_CHUNK_SIZE = 1000;
const SPLIT_CHUNK_OVERLAP = 200;

export const run = async (filePath: string) => {
  try {
    // use this if you want to load all pdf files in a directory

    // const directoryLoader = new DirectoryLoader(filePath, {
    //   '.pdf': (path) => new PDFLoader(path),
    // });

    // const loader = new PDFLoader(filePath);
    // const rawDocs = await directoryLoader.load();

    const pdfLoader = new PDFLoader(filePath);

    const rawDocs = await pdfLoader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: SPLIT_CHUNK_SIZE,
      chunkOverlap: SPLIT_CHUNK_OVERLAP,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('spliting docs...', docs);

    console.log('creating vector store...');
    /*create and store the embeddings in the vectorStore*/
    const embeddings = new OpenAIEmbeddings();
    const index = pinecone.Index(PINECONE_INDEX_NAME); //change to your own index name

    //embed the PDF documents
    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      // namespace: PINECONE_NAME_SPACE,
      textKey: 'text',
    });
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
