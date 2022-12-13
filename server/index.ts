import config from "config";
import { httpServer } from "./app";
import logger from "./utilities/loggers/winston";

const PORT = process.env.PORT || config.get("app.http_port");
httpServer.listen(PORT, () => {
  logger.info(`${config.get("name")} Running on port ${PORT}`);
});
