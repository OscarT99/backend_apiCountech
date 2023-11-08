const {Router} = require('express')

const route = Router()

const { getDetallesCompra, getDetalleCompra, postDetalleCompra, putDetalleCompra, deleteDetalleCompra } = require('../../controllers/compraController/detalleCompraController')

route.get('/detalleCompra',getDetallesCompra)
route.get('/detalleCompra/:id',getDetalleCompra)
route.post('/detalleCompra',postDetalleCompra)
route.put('/detalleCompra/:id',putDetalleCompra)
route.delete('/detalleCompra/:id',deleteDetalleCompra)

module.exports = route