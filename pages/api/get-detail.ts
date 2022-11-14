import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_TkybqXkHV2hKQ4itrDT3kNAvYXlKKwY406M0ZNR9r9u',
});

const databaseId = 'b81d6bf5f63e476f83d048b866a16a63';

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({ page_id: pageId, property_id: propertyId });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  detail?: any;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const { pageId, propertyId } = req.query;
    const response = await getDetail(String(pageId), String(propertyId));
    res.status(200).json({ detail: response, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
