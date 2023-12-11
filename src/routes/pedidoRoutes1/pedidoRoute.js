const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getPedido, getPedidos, postPedido, putPedido, deletePedido} = require('../../controllers/pedidoControllers/pedidoController')

// route.get('/pedidos',getPedidos1)
route.get('/pedido', [
    validarJWT
],getPedidos)
route.get('/pedido/:id', [
    validarJWT
],getPedido)
route.post('/pedido', [
    validarJWT
],postPedido)
route.put('/pedido/:id', [
    validarJWT
],putPedido)
route.delete('/pedido/:id', [
    validarJWT
],deletePedido)

module.exports = route