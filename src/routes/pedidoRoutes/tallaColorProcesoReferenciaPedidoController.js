const {Router} = require('express')
const route = Router()

const { getTallaEnColorEnProcesoEnReferenciaEnPedido, getTallasEnColorEnProcesoEnReferenciaEnPedido, postTallaEnColorEnProcesoEnReferenciaEnPedido, putTallaEnColorEnProcesoEnReferenciaEnPedido, deleteTallaEnColorEnProcesoEnReferenciaEnPedido } = require('../../controllers/pedidoControllers/tallaColorProcesoReferenciaPedidoController')

route.get('/talla',getTallasEnColorEnProcesoEnReferenciaEnPedido)
route.get('/talla/:id',getTallaEnColorEnProcesoEnReferenciaEnPedido)
route.post('/talla',postTallaEnColorEnProcesoEnReferenciaEnPedido)
route.put('/talla/:id',putTallaEnColorEnProcesoEnReferenciaEnPedido)
route.delete('/talla/:id',deleteTallaEnColorEnProcesoEnReferenciaEnPedido)

module.exports = route
