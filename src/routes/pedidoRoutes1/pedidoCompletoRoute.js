const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllPedidosConRelaciones,postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto, deletePedidoCompleto } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedidos',getAllPedidosConRelaciones)
route.get('/pedidos/:id',getPedidoConRelacionesPorId) 
route.post('/pedidos',postPedidoCompleto),
route.put('/pedidos/:id',putPedidoCompleto) 
route.delete('/pedidos/:id',deletePedidoCompleto); 


/*
route.get('/pedidos', [
    validarJWT
],getAllPedidosConRelaciones)
route.get('/pedidos/:id', [
    validarJWT
],getPedidoConRelacionesPorId) 
route.post('/pedidos', [
    validarJWT
],postPedidoCompleto),
route.put('/pedidos/:id', [
    validarJWT
],putPedidoCompleto) 
route.delete('/pedidos/:id', [
    validarJWT
],deletePedidoCompleto); 
*/


module.exports = route