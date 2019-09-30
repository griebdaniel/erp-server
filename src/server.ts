import express from 'express';
import { genericRepository } from './database/repository/GenericRepository';
import { initializeConnection } from './database/ConnectionProvider';
import cors from 'cors';

import bodyParser = require('body-parser');
import { Server } from 'http';


const app = express();
const port = 3200;

app.use(bodyParser.json());
app.use(cors());

app.post('/find', async (req, res) => {
  const table = await genericRepository.find(req.body.table);
  res.send(table);
});

app.post('/update', async (req, res) => {
  try {
    await genericRepository.update(req.body.table, req.body.where, req.body.update);
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
});

app.post('/insert', async (req, res) => {
  try {
    await genericRepository.insert(req.body.table, req.body.entities);
    res.send({ success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false })
  }
});

app.post('/delete', async (req, res) => {
  try {
    await genericRepository.delete(req.body.table, req.body.entities);
    res.send({ success: true });
  } catch {
    res.send({ success: false });
  }
});

let server: Server;

const start = async (): Promise<void> => {
  await initializeConnection();

  await new Promise((resolve, reject) => {
    server = app.listen(port, async () => {
      console.log(`App listening on port ${port}!`);
      resolve();
    });
  });
}

const stop = async (): Promise<void> => {
  await new Promise((resolve, reject) => server.close(() => {
    console.log('App closed successfully');
    resolve();
  }));
}

export { start, stop };