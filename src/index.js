import server  from './modules/server/server';
import configuration  from './modules/configuration';

server.listen(configuration.port, configuration.host);