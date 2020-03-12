
import { getClientTypes } from './repository/client-types';
import { initializeConnection } from './repository/ConnectionProvider';

import { schedule } from './scheduler';

const test = async () => {
  await initializeConnection();
  
  const s = await schedule();
}

test()



