import { connection } from './ConnectionProvider';
import { genericDao } from './Daos/GenericDao';
import lodash from 'lodash';
import { AdvancedConsoleLogger, Repository } from 'typeorm';

class ClientType {
  name: string;
  type: string;
  options?: any;
}

export const getClientTypes = async (table: string) => {
  let repository: Repository<unknown>;
  
  try {
    repository = connection.getRepository(table);
  } catch(e) {
    return undefined;
  }

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

// const scheduleType = [
//   {
//     name: 'date',
//     type: 'date'
//   },
//   {
//     name: 'schedule',
//     type: 'table',
//     options: {
//       columnTypes: [
//         {
//           name: 'shift',
//           type: 'string',
//         }
//       ]
//     }
//   }
// ]

export class ScheduleForDay {
  date: Date;
  schedule: ScheduleForShift[];
}

export class ScheduleForShift {
  shift: string;
  schedule: ScheduleForEmployee[]
}

export class ScheduleForEmployee {
  employee: string;
  schedule: Schedule[];
}

export class Schedule {
  phase: string;
  start: string;
  end: string;
}


