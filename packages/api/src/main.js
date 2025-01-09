import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import expressWs from 'express-ws';
import cors from 'cors';
import routes from './routes';
import response from './middleware/response';
const app = express();

app.use(morgan('tiny'));
app.use(cors());
// app.use(express.static('public'))
// app.use(multer().fields([{ name: 'files[]' }]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(response);
// expressWs(app);
const port = 3000;

routes(app);

app.get('/', (req, res) => {
  res.response.success({
    message: 'Hello World!'
  });
})


function start() {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  return app;
}

export default start;