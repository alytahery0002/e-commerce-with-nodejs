const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require("express");
const bodyParser = require("body-parser")

const authRouter=require('./routes/authenticationRoutes')
const StoreRouter=require('./routes/StoreRouter')
const BarberRouter=require('./routes/BarberRoutes')
const ProductRoutes=require('./routes/ProductRoutes')


//dotenv
dotenv.config({ path: './config/config.env' });

//DB
mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: true,
  })
  .then(() => console.log('DB connection successful!'));

const app = express();
app.use(bodyParser.json());


// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use('/',authRouter)
app.use('/barber',BarberRouter)
// app.use('/api/v1/tours', tourRouter);
app.use('/store', StoreRouter);
// app.use('/product', ProductRoutes);
// app.use('/Barber/:id', BarberRouter);


const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });