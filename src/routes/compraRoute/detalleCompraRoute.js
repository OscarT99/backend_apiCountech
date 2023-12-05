const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getDetallesCompra, getDetalleCompra, postDetalleCompra, putDetalleCompra, deleteDetalleCompra } = require('../../controllers/compraController/detalleCompraController')

route.get('/detalleCompra', [
    validarJWT
],getDetallesCompra)
route.get('/detalleCompra/:id', [
    validarJWT
],getDetalleCompra)
route.post('/detalleCompra', [
    validarJWT
],postDetalleCompra)
route.put('/detalleCompra/:id', [
    validarJWT
],putDetalleCompra)
route.delete('/detalleCompra/:id', [
    validarJWT
],deleteDetalleCompra)

module.exports = route