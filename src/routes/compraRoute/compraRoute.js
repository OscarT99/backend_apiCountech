const {Router} = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getCompras, getCompra, postCompra, putCompra, deleteCompra } = require('../../controllers/compraController/compraController')

route.get('/compra', [
    validarJWT
],getCompras)
route.get('/compra/:id', [
    validarJWT
],getCompra)
route.post('/compra', [
    validarJWT
],postCompra)
route.put('/compra/:id', [
    validarJWT
],putCompra)
route.delete('/compra/:id', [
    validarJWT
],deleteCompra)



module.exports = route