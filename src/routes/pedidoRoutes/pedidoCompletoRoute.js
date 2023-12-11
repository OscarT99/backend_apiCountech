const {Router} = require('express')

const route = Router()

const { getAllPedidosConRelaciones,postPedidoCompleto, getPedidoConRelacionesPorId, putPedidoCompleto, deletePedidoCompleto } = require('../../controllers/pedidoControllers/pedidoCompletoController')


route.get('/pedidos',getAllPedidosConRelaciones);
route.get('/pedidos/:id',getPedidoConRelacionesPorId); 
route.post('/pedidos',postPedidoCompleto);
route.put('/pedidos/:id',putPedidoCompleto); 
route.delete('/pedidos/:id',deletePedidoCompleto); 

module.exports = route