import request from 'request';

import { start, stop } from '../src/server';
import { initializeConnection } from '../src/repository/ConnectionProvider';
import { genericDao } from '../src/repository/Daos/GenericDao';
import Lodash from 'lodash';

describe('repository test', () => {
  beforeAll(async () => {
    await initializeConnection();
    console.log('connection initialized')
  });

  it('find', async () => {
    const supplies = await genericDao.find('supply');
  });

  it('delete', async () => {
    await genericDao.delete('supply', { name: 'supply2' });
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
    await genericDao.insert('product', { name: 'product2', necessary: [{ supply: 'supply1', product: 'product2', quantity: 10 }] })
  });

  fit('update', async () => {
    await genericDao.update('supply_order', { name: 'so1', deadLine: Date.now() }, { name: 'so2' });
  });


})

describe('server test', function () {

  beforeAll(async () => {
    await start();
  });

  afterAll(async () => {
    await stop();
  });

  it('find', async () => {
    const response = await new Promise<any>((resolve, reject) => {
      request.post({
        url: 'http://localhost:3200/find',
        json: { table: 'product' }
      }, (error, response, body) => {
        if (error) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });

    console.log(JSON.stringify(response, null, 2));
    expect(Lodash.isArray(response)).toBe(true);
  });

  it('update', async () => {
    const response = await new Promise<string>((resolve, reject) => {
      request.post({
        url: 'http://localhost:3200/update',
        json: { table: 'supply', where: { name: 'supply2' }, update: { quantity: 2 } }
      }, (error, response, body) => {
        if (error) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });

    expect(response).toBe('updated successfully');
  });


  it('insert', async () => {
    const response = await new Promise<string>((resolve, reject) => {
      request.post({
        url: 'http://localhost:3200/insert',
        json: { table: 'supply', entities: { name: 'supply4', quantity: 4 } }
      }, (error, response, body) => {
        if (error) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });

    expect(response).toBe('inserted successfully');
  });

  it('delete', async () => {
    const response = await new Promise<any>((resolve, reject) => {
      request.post({
        url: 'http://localhost:3200/delete',
        json: { table: 'supply', entities: { name: 'supply4' } }
      }, (error, response, body) => {
        if (error) {
          reject(body);
        } else {
          resolve(body);
        }
      });
    });

    expect(response.success).toBe(true);
  });
});
