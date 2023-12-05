const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getProcesosEnReferenciaEnPedido, getProcesoEnReferenciaEnPedido, postProcesoEnReferenciaEnPedido, putProcesoEnReferenciaEnPedido, deleteProcesoEnReferenciaEnPedido } = require('../../controllers/pedidoControllers/procesoReferenciaPedidoController')

route.get('/proceso', [
    validarJWT
],getProcesosEnReferenciaEnPedido)
route.get('/proceso/:id', [
    validarJWT
],getProcesoEnReferenciaEnPedido)
route.post('/proceso', [
    validarJWT
],postProcesoEnReferenciaEnPedido)
route.put('/proceso/:id', [
    validarJWT
],putProcesoEnReferenciaEnPedido)
route.delete('/proceso/:id', [
    validarJWT
],deleteProcesoEnReferenciaEnPedido)

module.exports = route