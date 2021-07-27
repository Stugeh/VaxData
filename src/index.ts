import http from 'http';

import { PORT } from './config';
import app from './app';

const server = http.createServer(app.callback()).listen(PORT);

server.on('listening', () => {
    console.info(`Server listening to port ${PORT}`);
});