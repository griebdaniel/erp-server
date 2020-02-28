import { connection } from './ConnectionProvider';
import { genericDao } from './Daos/GenericDao';
import lodash from 'lodash';
import { AdvancedConsoleLogger } from 'typeorm';

class ClientType {
  name: string;
  type: string;
  options?: any;
}

export const getClientTypes = async (table: string) => {
  const repository = connection.getRepository(table);

  const metadata = repository.metadata;
  const types: ClientType[] = [];

  for (const column of metadata.columns) {
    const type: string = column.type['name'] ? column.type['name'] : column.type;

    let options: any, map: any, remap: any;

    if (column.referencedColumn) {
      options = await genericDao.find(column.referencedColumn.entityMetadata.tableName);
      options = options.map(options => options[column.referencedColumn.entityMetadata.primaryColumns[0].propertyName]);
    }

    types.push({ name: column.propertyName, type: type.toLowerCase(), options: { options } });
  }

  for (const oneToMany of metadata.oneToManyRelations) {
    const columnTypes = await getClientTypes(oneToMany.inverseEntityMetadata.tableName);
    lodash.remove(columnTypes, (columnType) => columnType.name === oneToMany.inverseSidePropertyPath);
    types.push({ name: oneToMany.propertyName, type: 'table', options: { columnTypes: columnTypes } })
  }

  return types;
}

