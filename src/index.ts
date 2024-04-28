import { optionalConfig } from './config';
import { getLogger } from './common/logger';
import { app } from './app';

const port = optionalConfig.PORT;
const logger = getLogger(__filename);

app.listen(port, () => {
  logger.info(`[server]: Server is running at http://localhost:${port}`);
});
