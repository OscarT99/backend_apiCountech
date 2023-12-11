const { Router } = require('express')
const route = Router()

const { getProcesosEnReferenciaEnPedido, getProcesoEnReferenciaEnPedido, postProcesoEnReferenciaEnPedido, putProcesoEnReferenciaEnPedido, deleteProcesoEnReferenciaEnPedido } = require('../../controllers/pedidoControllers/procesoReferenciaPedidoController')

route.get('/proceso',getProcesosEnReferenciaEnPedido)
route.get('/proceso/:id',getProcesoEnReferenciaEnPedido)
route.post('/proceso',postProcesoEnReferenciaEnPedido)
route.put('/proceso/:id',putProcesoEnReferenciaEnPedido)
route.delete('/proceso/:id',deleteProcesoEnReferenciaEnPedido)

module.exports = route