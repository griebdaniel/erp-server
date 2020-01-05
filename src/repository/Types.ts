export class TableModification {
  type: 'insert' | 'update' | 'delete';
  modification: any;
}