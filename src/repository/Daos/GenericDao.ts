import { connection } from '../ConnectionProvider'
import { TableModification } from '../Types';
import Lodash from 'lodash';

import { schedule } from '../../scheduler';

const modify = (table: string, tableModification: TableModification) => {
  const modification = tableModification.modification;

  Lodash.forOwn(modification.row, (value, key) => {
    if (!isNaN(Date.parse(value)) && Lodash.isNumber(value) === false) {
      modification.row[key] = new Date(value);
    }
  });

  let res: any;

  switch (tableModification.type) {
    case 'insert':
      res = genericDao.insert(table, modification);
      break;
    case 'update':
      res = genericDao.update(table, modification.row, { [modification.column]: modification.value });
      break;
    case 'delete':
      res = genericDao.delete(table, modification);
      break;
    default:
      throw ('modification type not supported');
  }

  return res;
}

class GenericDAO {
  find(table: string) {
    if (table === 'schedule') {
      return schedule();
    }
    const repository = connection.getRepository(table);
    return repository.find() as any;
  }

  insert(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    return repository.insert(entities);
  }

  delete(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    return repository.delete(entities);
  }

  update(table: string, where: object, update: object) {
    const repository = connection.getRepository(table);
    return repository.update(where, update);
  }

  modify(table: string, tableModification: any): Promise<any> {
    const modification = tableModification.modification;
    const repository = connection.getRepository(table);

    for (const relation of repository.metadata.oneToManyRelations) {
      if (relation.propertyName === modification.column) {
        switch (modification.value.type) {
          case 'insert':
            modification.value.modification[relation.inverseSidePropertyPath] = modification.row;
            break;
          case 'update':
            modification.value.modification.row[relation.inverseSidePropertyPath] = modification.row;
            break;
          case 'delete':
            for (const deletedRow of modification.value.modification) {
              deletedRow[relation.inverseSidePropertyPath] = modification.row;
            }
            break;
          default:
            break;
        }

        if (modification.value.type !== undefined) {
          return this.modify(relation.inverseEntityMetadata.tableName, modification.value);
        }
      }
    }

    return modify(table, tableModification);
  }

  async getUser(username: string, password: string) {
    const repository = connection.getRepository('user2');
    const user = await repository.find({ where: { username, password } });
    return user[0];
  }

}

let genericDao = new GenericDAO();

export { genericDao };

