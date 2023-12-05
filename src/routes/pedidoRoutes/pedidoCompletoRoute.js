const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllPedidosConRelaciones,postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto } = require('../../controllers/pedidoControllers/pedidoCompletoController')


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


module.exports = route