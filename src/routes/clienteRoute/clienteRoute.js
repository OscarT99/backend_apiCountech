const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getCliente, getClientes, deleteCliente, postCliente, putCliente } = require('../../controllers/clienteController/clienteController')

route.get('/cliente', [
    validarJWT
],getClientes)
route.get('/cliente/:id', [
    validarJWT
],getCliente)
route.post('/cliente', [
    validarJWT
],postCliente)
route.put('/cliente/:id', [
    validarJWT
],putCliente)
route.delete('/cliente/:id', [
    validarJWT
],deleteCliente)

module.exports = route

