const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getCliente, getClientes, deleteCliente, postCliente, putCliente, buscarClientes } = require('../../controllers/clienteController/clienteController')

route.get('/cliente',getClientes)
route.get('/cliente/:id',getCliente)
route.post('/cliente',postCliente)
route.put('/cliente/:id',putCliente)
route.delete('/cliente/:id',deleteCliente)





/*
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
*/
route.get('/cliente/buscar',buscarClientes)

module.exports = route

