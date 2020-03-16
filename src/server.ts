import express from 'express';
import cors from 'cors';
import bodyParser = require('body-parser');
import { Server } from 'http';
import session from 'express-session';
import path from 'path';

import { genericDao } from './repository/Daos/GenericDao';
import { initializeConnection } from './repository/ConnectionProvider';
import { schedule } from './scheduler';
import { getClientTypes } from './repository/client-types';

const app = express();
const port = 3200;

app.use(bodyParser.json());


const conObject = {
  user: 'daniel',
  password: 'daniel',
  host: 'localhost',
  port: 5432,
  database: 'daniel'
};

app.use(session({
  store: new (require('connect-pg-simple')(session))({ conObject }),
  secret: 'secret',
}));

app.use(cors({
  origin: ['http://localhost:4200'],
  credentials: true
}));

app.post('/login', (req, res) => {
  const user = genericDao.getUser(req.body.username, req.body.password);
  user.then(u => {
    res.send(u != undefined);
    req.session.user = u;
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(res2 => res.send(true));
});

app.get('/isLoggedIn', (req, res) => {
  res.send(req.session.user !== undefined);
});

app.post('/find', async (req, res) => {
  const data = await genericDao.find(req.body.table);
  res.send(data);
});

app.post('/clientTypes', async (req, res) => {
  const data = await getClientTypes(req.body.table);
  res.send(data);
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
  genericDao.modify(req.body.table, req.body.modification).then(r => {
    res.send({ success: true });
  }).catch(e => {
    res.send({ success: false }); ``
  });
});

app.post('/schedule', async (req, res) => {
  res.send(await schedule());
});

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
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