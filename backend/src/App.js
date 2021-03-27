const app = require('express')();
const SimpleRoutes = require('./routes/routes');
app.use('/', SimpleRoutes);

module.exports = app