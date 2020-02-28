
import { getClientTypes } from './repository/client-types';
import { initializeConnection } from './repository/ConnectionProvider';


const test = async () => {
  await initializeConnection();
  const types = getClientTypes('phase');
  console.log(types)
}

test()



