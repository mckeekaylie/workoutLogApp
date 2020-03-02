require('dotenv').config();

//express
const express = require('express');
const app = express();
const router = express.Router();

//controller imports
const api = require('./controllers/apicontroller');
const user = require('./controllers/usercontroller');

//db import & sync
const sequelize = require('./db');
sequelize.sync();
app.use(express.json());

//middleware
app.use(require('./middleware/headers'));

//routes
app.use('/user', user);
app.use(require('./middleware/validate-session'));
app.use('/api', api);

app.listen(process.env.PORT, () => console.log(`app is listening ${process.env.PORT}`)); 

module.exports = router;
