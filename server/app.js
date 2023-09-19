const express = require('express');

const morgan = require('morgan');
const app = express();
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');
const port = 3001;
const cors = require('cors');
require('./dal/dal');

app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
require('./utils/initializeProject');

app.listen(port, () => console.log(`Listening to port ${port}`));
