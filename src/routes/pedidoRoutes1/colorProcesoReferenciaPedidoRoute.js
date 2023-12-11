const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getColoresEnProcesoEnReferenciaEnPedido, getColorEnProcesoEnReferenciaEnPedido, postColorEnProcesoEnReferenciaEnPedido, putColorEnProcesoEnReferenciaEnPedido, deleteColorEnProcesoEnReferenciaEnPedido }=require('../../controllers/pedidoControllers/colorProcesoReferenciaPedidoController')

route.get('/color', [
    validarJWT
],getColoresEnProcesoEnReferenciaEnPedido)
route.get('/color/:id', [
    validarJWT
],getColorEnProcesoEnReferenciaEnPedido)
route.post('/color', [
    validarJWT
],postColorEnProcesoEnReferenciaEnPedido)
route.put('/color/:id', [
    validarJWT
],putColorEnProcesoEnReferenciaEnPedido)
route.delete('/color/:id', [
    validarJWT
],deleteColorEnProcesoEnReferenciaEnPedido)

module.exports = route