const express = require('express');
const app = express();
const userRouter = require('./routers/users');
const cardRouter = require('./routers/cards');
const port = 3000;
const cors = require('cors');
require('./dal/dal');

app.use(express.json());
app.use(cors());

app.use('/api/users', userRouter);
app.use('/api/cards', cardRouter);
require('./utils/initializeProject');

app.listen(port, () => console.log(`Listening to port ${port}`));
