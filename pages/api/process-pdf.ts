import { run } from '@/scripts/ingest-data';
import formidable from 'formidable';
import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
const path = require('path');

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.files);
    return res.status(201).send('');
  });
};

const saveFile = async (file: any) => {
  const data = fs.readFileSync(file.path);
  const newFilePath = path.join('/tmp', file.name);
  fs.writeFileSync(newFilePath, data);
  await fs.unlinkSync(file.path);
  await run(newFilePath);
  console.log('ingestion completed');
};

export default post;
