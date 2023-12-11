const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getReferenciasEnPedido, getReferenciaEnPedido, postRerenciaEnPedido, putRefereciaEnPedido, deleteRerenciaEnPedido } = require('../../controllers/pedidoControllers/referenciaPedidoController')

route.get('/referencia', [
    validarJWT
],getReferenciasEnPedido)
route.get('/referencia/:id', [
    validarJWT
],getReferenciaEnPedido)
route.post('/referencia', [
    validarJWT
],postRerenciaEnPedido)
route.put('/referencia/:id', [
    validarJWT
],putRefereciaEnPedido)
route.delete('/referencia/:id', [
    validarJWT
],deleteRerenciaEnPedido)

module.exports = route