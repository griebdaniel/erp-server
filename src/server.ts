import express from 'express';
import { genericDao } from './repository/Daos/GenericDao';
import { initializeConnection } from './repository/ConnectionProvider';
import cors from 'cors';

import bodyParser = require('body-parser');
import { Server } from 'http';

const app = express();
const port = 3200;

app.use(bodyParser.json());
app.use(cors());

app.post('/find', async (req, res) => {
  const table = await genericDao.find(req.body.table);
  res.send(table);
});

app.post('/update', async (req, res) => {
  try {
    await genericDao.update(req.body.table, req.body.where, req.body.update);
    res.send({ success: true });
  } catch (e) {
    res.send({ success: false });
  }
});

app.post('/insert', async (req, res) => {
  try {
    await genericDao.insert(req.body.table, req.body.entities);
    res.send({ success: true });
  } catch (e) {
    console.log(e);
    res.send({ success: false })
  }
});

app.post('/delete', async (req, res) => {
  try {
    await genericDao.delete(req.body.table, req.body.entities);
    res.send({ success: true });
  } catch {
    res.send({ success: false });
  }
});

app.post('/modify', async (req, res) => {
  try {
    await genericDao.modify(req.body.table, req.body.modification);
    res.send({ success: true });
  } catch {
    res.send({ success: false });
  }
});

let server: Server;

const start = async (): Promise<void> => {
  initializeConnection();

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