const {Router} = require('express')

const route = Router()

const { getCompras, getCompra, postCompra, putCompra, deleteCompra } = require('../../controllers/compraController/compraController')

route.get('/compra',getCompras)
route.get('/compra/:id',getCompra)
route.post('/compra',postCompra)
route.put('/compra/:id',putCompra)
route.delete('/compra/:id',deleteCompra)



module.exports = route