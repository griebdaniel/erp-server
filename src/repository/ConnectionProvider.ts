import { createConnection, Connection, getConnectionManager } from 'typeorm';

let connection: Connection;

const initializeConnection = async () => {

  // const connectionManager = getConnectionManager();
  // const connection2 = connectionManager.create({
  //   type: "postgres",
  //   port: 5432,
  //   username: "daniel",
  //   password: "root",
  //   database: "mpg",
  //   // synchronize: true,
  //       // entities: 
  //       // entities: "src/entity/**/*.ts"
  // });
  // console.log(`why connection is not being created?`)
  // connection = await connection2.connect();
  // console.log(connection);


  if (!connection) {
    try {
      connection = await createConnection();
    } catch (e) {
      console.log(e)
    }
  }
}

export { initializeConnection, connection }