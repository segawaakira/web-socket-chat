import app from './app';
import appWs from './app-ws';

require('dotenv').config();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

appWs(server);


export default server;