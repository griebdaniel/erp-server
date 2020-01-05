import { createConnection, Connection } from 'typeorm';

let connection: Connection;

const initializeConnection = async () => {
  if (!connection) {
    connection = await createConnection();
  }
}

export { initializeConnection, connection }