"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const server_1 = require("../src/server");
const ConnectionProvider_1 = require("../src/repository/ConnectionProvider");
const GenericDao_1 = require("../src/repository/Daos/GenericDao");
const lodash_1 = __importDefault(require("lodash"));
describe('repository test', () => {
    beforeAll(async () => {
        await ConnectionProvider_1.initializeConnection();
        console.log('connection initialized');
    });
    it('find', async () => {
        const supplies = await GenericDao_1.genericDao.find('supply');
    });
    it('delete', async () => {
        await GenericDao_1.genericDao.delete('supply', { name: 'supply2' });
        // const products = await genericRepository.find('product');
        // console.log(products);
        // await genericRepository.delete('product',
        //   {
        //     name: 'product4',
        //     necessary: [{ supply: 'supply1', quantity: 6 }]
        //   });
        // await genericRepository.delete('product', products);
    });
    it('insert', async () => {
        // await genericRepository.insert('supply', { name: 'supply2', quantity: 4 });
        await GenericDao_1.genericDao.insert('product', { name: 'product2', necessary: [{ supply: 'supply1', product: 'product2', quantity: 10 }] });
    });
    fit('update', async () => {
        await GenericDao_1.genericDao.update('supply_order', { name: 'so1', deadLine: Date.now() }, { name: 'so2' });
    });
});
describe('server test', function () {
    beforeAll(async () => {
        await server_1.start();
    });
    afterAll(async () => {
        await server_1.stop();
    });
    it('find', async () => {
        const response = await new Promise((resolve, reject) => {
            request_1.default.post({
                url: 'http://localhost:3200/find',
                json: { table: 'product' }
            }, (error, response, body) => {
                if (error) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        });
        console.log(JSON.stringify(response, null, 2));
        expect(lodash_1.default.isArray(response)).toBe(true);
    });
    it('update', async () => {
        const response = await new Promise((resolve, reject) => {
            request_1.default.post({
                url: 'http://localhost:3200/update',
                json: { table: 'supply', where: { name: 'supply2' }, update: { quantity: 2 } }
            }, (error, response, body) => {
                if (error) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        });
        expect(response).toBe('updated successfully');
    });
    it('insert', async () => {
        const response = await new Promise((resolve, reject) => {
            request_1.default.post({
                url: 'http://localhost:3200/insert',
                json: { table: 'supply', entities: { name: 'supply4', quantity: 4 } }
            }, (error, response, body) => {
                if (error) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        });
        expect(response).toBe('inserted successfully');
    });
    it('delete', async () => {
        const response = await new Promise((resolve, reject) => {
            request_1.default.post({
                url: 'http://localhost:3200/delete',
                json: { table: 'supply', entities: { name: 'supply4' } }
            }, (error, response, body) => {
                if (error) {
                    reject(body);
                }
                else {
                    resolve(body);
                }
            });
        });
        expect(response.success).toBe(true);
    });
});
//# sourceMappingURL=repsitory.spec.js.map