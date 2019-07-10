import request from 'request';

import { start, stop } from '../src/server';
import { initializeConnection } from '../src/database/ConnectionProvider';
import { genericRepository } from '../src/database/repository/GenericRepository';
import Lodash from 'lodash';

describe('repository test', () => {
  beforeAll(async() => {
    await initializeConnection();
    console.log('connection initialized')
  });

  it('find', async () => {
    const supplies = await genericRepository.find('supply');
  });
  
  it('delete', async () => {
    await genericRepository.delete('supply', { name: 'supply2' });
  })

  it('insert', async () => {
    await genericRepository.insert('supply', { name: 'supply2', quantity: 4 });
  });

  it('update', async () => {
    await genericRepository.update('supply', { name: 'supply3' }, { quantity: 3 });
  });
})

describe('server test', function () {

  beforeAll(async () => {
    await start();
  });

  afterAll(async () => {
    await stop();
  });

  fit('find', async () => {
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
    
    console.log(response[0].necessary);
    
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
        json: { table: 'supply', entities: { name: 'supply4',  quantity: 4 } }
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
