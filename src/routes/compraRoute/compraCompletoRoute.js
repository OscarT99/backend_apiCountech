const Router = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllComprasConRelaciones, getCompraConRelacionesPorId, postCompraCompleta, putCompraCompleta } = require('../../controllers/compraController/compraCompletoController')

route.get('/compras', [
    validarJWT
],getAllComprasConRelaciones)
route.get('/compras/:id', [
    validarJWT
],getCompraConRelacionesPorId)
route.post('/compras', [
    validarJWT
],postCompraCompleta)
route.put('/compras/:id', [
    validarJWT
],putCompraCompleta)

module.exports = route