const Router = require('express')

const route = Router()

const { getAllComprasConRelaciones, getCompraConRelacionesPorId, postCompraCompleta, putCompraCompleta } = require('../../controllers/compraController/compraCompletoController')

route.get('/compras',getAllComprasConRelaciones)
route.get('/compras/:id',getCompraConRelacionesPorId)
route.post('/compras',postCompraCompleta)
route.put('/compras/:id',putCompraCompleta)

module.exports = route