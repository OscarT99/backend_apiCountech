const { Router } = require('express')
const route = Router()

const{ getColoresEnProcesoEnReferenciaEnPedido, getColorEnProcesoEnReferenciaEnPedido, postColorEnProcesoEnReferenciaEnPedido, putColorEnProcesoEnReferenciaEnPedido, deleteColorEnProcesoEnReferenciaEnPedido }=require('../../controllers/pedidoControllers/colorProcesoReferenciaPedidoController')

route.get('/color',getColoresEnProcesoEnReferenciaEnPedido)
route.get('/color/:id',getColorEnProcesoEnReferenciaEnPedido)
route.post('/color',postColorEnProcesoEnReferenciaEnPedido)
route.put('/color/:id',putColorEnProcesoEnReferenciaEnPedido)
route.delete('/color/:id',deleteColorEnProcesoEnReferenciaEnPedido)

module.exports = route