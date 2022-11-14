import type { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: 'secret_TkybqXkHV2hKQ4itrDT3kNAvYXlKKwY406M0ZNR9r9u',
});

const databaseId = 'b81d6bf5f63e476f83d048b866a16a63';

async function getItems() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      sorts: [
        {
          property: 'price',
          direction: 'ascending',
        },
      ],
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  items?: any;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const response = await getItems();
    res.status(200).json({ items: response?.results, message: 'Success' });
  } catch (error) {
    res.status(400).json({ message: 'Failed' });
  }
}
