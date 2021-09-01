import swaggerUi from 'swagger-ui-express';
import express from 'express';
import YAML from 'yamljs';

const app = express();
const PORT = 4000;

app.use('/docs', swaggerUi.serve, swaggerUi.setup(YAML.load('./swagger.yaml')));

app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`);
  });