import { connection } from '../ConnectionProvider'
import { TableModification } from '../Types';
import Lodash from 'lodash';

const modify = async (table: string, tableModification: TableModification) => {
  console.log(table, tableModification);

  const modification = tableModification.modification;

  Lodash.forOwn(modification.row, (value, key) => {
    if (!isNaN(Date.parse(value)) && Lodash.isNumber(value) === false) {
      modification.row[key] = new Date(value);
    }
  });

  switch (tableModification.type) {
    case 'insert':
      return genericDao.insert(table, modification);
    case 'update':
      return genericDao.update(table, modification.row, { [modification.column]: modification.value });
    case 'delete':
      return genericDao.delete(table, modification);
    default:
      throw ('modification type not supported');
  }
}

class GenericDAO {
  async find(table: string) {
    const repository = connection.getRepository(table);
    return await repository.find();
  }

  async insert(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    return await repository.insert(entities);
  }

  async delete(table: string, entities: object | object[]) {
    const repository = connection.getRepository(table);
    return await repository.delete(entities);
  }

  async update(table: string, where: object, update: object) {
    const repository = connection.getRepository(table);
    return await repository.update(where, update);
  }

  async modify(table: string, tableModification: any): Promise<any> {
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
          this.modify(relation.inverseEntityMetadata.tableName, modification.value);
        }

        return;
      }
    }

    modify(table, tableModification);
  }

}

let genericDao = new GenericDAO();

export { genericDao };

