const {Router} = require('express')

const route = Router()

const { getAllPedidosConRelaciones,postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto, deletePedidoCompleto } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedido',getAllPedidosConRelaciones);
route.get('/pedido/:id',getPedidoConRelacionesPorId); 
route.post('/pedido',postPedidoCompleto);
route.put('/pedido/:id',putPedidoCompleto); 
route.delete('/pedido/:id',deletePedidoCompleto); 

module.exports = route