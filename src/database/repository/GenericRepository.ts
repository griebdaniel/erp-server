import { connection } from '../ConnectionProvider'
import Lodash from 'lodash';
import { Supply } from '../../entity/Supply';

class TableChange {
  type: 'insert' | 'delete' | 'update';
  position: { row: object, column: string };
  change: any;
}

class GenericRepository {
  async find(table: string) {
    return await connection.manager.find(table);
  }

  async insert(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    const result = await repository.insert(entities);
  }

  async delete(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    const result = await repository.remove(entities);
  }

  async update(table: string, where: object, update: object) {
    const repository = connection.getRepository(table);
    await repository.update(where, update);
  }
}

let genericRepository = new GenericRepository();

export { genericRepository }; 