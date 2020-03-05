const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

routes.get('/devs', DevController.index); 
routes.post('/devs', DevController.store);
routes.get('/search', DevController.find)
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

module.exports = routes;