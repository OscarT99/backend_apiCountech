const { Router } = require('express')
const route = Router()

const { getReferenciasEnPedido, getReferenciaEnPedido, postRerenciaEnPedido, putRefereciaEnPedido, deleteRerenciaEnPedido } = require('../../controllers/pedidoControllers/referenciaPedidoController')

route.get('/referencia',getReferenciasEnPedido)
route.get('/referencia/:id',getReferenciaEnPedido)
route.post('/referencia',postRerenciaEnPedido)
route.put('/referencia/:id',putRefereciaEnPedido)
route.delete('/referencia/:id',deleteRerenciaEnPedido)

module.exports = route