const { Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getTallaEnColorEnProcesoEnReferenciaEnPedido, getTallasEnColorEnProcesoEnReferenciaEnPedido, postTallaEnColorEnProcesoEnReferenciaEnPedido, putTallaEnColorEnProcesoEnReferenciaEnPedido, deleteTallaEnColorEnProcesoEnReferenciaEnPedido } = require('../../controllers/pedidoControllers/tallaColorProcesoReferenciaPedidoController')

route.get('/talla', [
    validarJWT
],getTallasEnColorEnProcesoEnReferenciaEnPedido)
route.get('/talla/:id', [
    validarJWT
],getTallaEnColorEnProcesoEnReferenciaEnPedido)
route.post('/talla', [
    validarJWT
],postTallaEnColorEnProcesoEnReferenciaEnPedido)
route.put('/talla/:id', [
    validarJWT
],putTallaEnColorEnProcesoEnReferenciaEnPedido)
route.delete('/talla/:id', [
    validarJWT
],deleteTallaEnColorEnProcesoEnReferenciaEnPedido)

module.exports = route
