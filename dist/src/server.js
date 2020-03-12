"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GenericDao_1 = require("./repository/Daos/GenericDao");
const ConnectionProvider_1 = require("./repository/ConnectionProvider");
const cors_1 = __importDefault(require("cors"));
const bodyParser = require("body-parser");
const scheduler_1 = require("./scheduler");
const client_types_1 = require("./repository/client-types");
const app = express_1.default();
const port = 3200;
app.use(bodyParser.json());
app.use(cors_1.default());
app.post('/find', async (req, res) => {
    const data = await GenericDao_1.genericDao.find(req.body.table);
    console.log(data);
    res.send(data);
});
app.post('/clientTypes', async (req, res) => {
    const data = await client_types_1.getClientTypes(req.body.table);
    res.send(data);
});
app.post('/update', async (req, res) => {
    try {
        await GenericDao_1.genericDao.update(req.body.table, req.body.where, req.body.update);
        res.send({ success: true });
    }
    catch (e) {
        res.send({ success: false });
    }
});
app.post('/insert', async (req, res) => {
    try {
        await GenericDao_1.genericDao.insert(req.body.table, req.body.entities);
        res.send({ success: true });
    }
    catch (e) {
        console.log(e);
        res.send({ success: false });
    }
});
app.post('/delete', async (req, res) => {
    try {
        await GenericDao_1.genericDao.delete(req.body.table, req.body.entities);
        res.send({ success: true });
    }
    catch {
        res.send({ success: false });
    }
});
app.post('/modify', async (req, res) => {
    GenericDao_1.genericDao.modify(req.body.table, req.body.modification).then(r => {
        res.send({ success: true });
    }).catch(e => {
        console.log(e);
        res.send({ success: false });
        ``;
    });
});
app.post('/schedule', async (req, res) => {
    res.send(await scheduler_1.schedule());
});
let server;
const start = async () => {
    ConnectionProvider_1.initializeConnection();
    await new Promise((resolve, reject) => {
        server = app.listen(port, async () => {
            console.log(`App listening on port ${port}!`);
            resolve();
        });
    });
};
exports.start = start;
const stop = async () => {
    await new Promise((resolve, reject) => server.close(() => {
        console.log('App closed successfully');
        resolve();
    }));
};
exports.stop = stop;
//# sourceMappingURL=server.js.map