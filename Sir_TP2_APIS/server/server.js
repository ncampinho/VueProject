const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users')
const showRoutes = require('./routes/shows')
const zipcodeRoutes = require('./routes/zipcode')
const purchaseRoutes = require('./routes/purchase')
//const proxy = require('http-proxy-middleware');

const app = express();

app.use(cors())
app.use(express.json());

//app.use('/api/**', proxy({ target: "http://localhost:8080" }));

app.use('/api/tp2', userRoutes);
app.use('/api/tp2', showRoutes);
app.use('/api/tp2', zipcodeRoutes);
app.use('/api/tp2', purchaseRoutes)

app.listen(process.env.PORT || '3000', () => {
    console.log(`Server is running on port: ${process.env.PORT || 3000}`)
})