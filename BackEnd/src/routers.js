const express = require("express");
const clienteController = require('../Controllers/controller');
const routers = express.Router();

routers.get('/', clienteController.getRoot); //Route root
routers.get('/api/read', clienteController.getAllUsers); //Route to list all users
routers.get('/api/read/:id', clienteController.getByID); //Route to get a user by ID
routers.post('/api/register', clienteController.createNewUser); //Route to create a new user
routers.delete('/api/delete/:id', clienteController.deleteUser); //Route to delete a user by id
routers.put('/api/update/:id', clienteController.updateUser); //Route to update a user by ID

module.exports = routers;
