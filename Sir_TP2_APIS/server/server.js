const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users')
const showRoutes = require('./routes/shows')
//const proxy = require('http-proxy-middleware');

const app = express();

app.use(express.json());

//app.use('/api/**', proxy({ target: "http://localhost:8080" }));

app.use('/api/tp2', userRoutes);
app.use('/api/tp2', showRoutes);
app.use(cors())

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || 3000}`)
})