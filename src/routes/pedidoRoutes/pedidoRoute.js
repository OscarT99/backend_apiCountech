const {Router} = require('express')

const route = Router()

const { getPedido, getPedidos, postPedido, putPedido, deletePedido } = require('../../controllers/pedidoControllers/pedidoController')

route.get('/pedido',getPedidos)
route.get('/pedido/:id',getPedido)
route.post('/pedido',postPedido)
route.put('/pedido/:id',putPedido)
route.delete('/pedido/:id',deletePedido)



module.exports = route