const Router = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getAllComprasConRelaciones, getCompraConRelacionesPorId, postCompraCompleta, putCompraCompleta, anularCompra } = require('../../controllers/compraController/compraCompletoController')

route.get('/compra',getAllComprasConRelaciones)
route.get('/compra/:id',getCompraConRelacionesPorId)
route.post('/compra',postCompraCompleta)
route.put('/compra/:id',putCompraCompleta),
route.put('/compra/anularCompra/:id',anularCompra)

module.exports = route


/*
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
*/