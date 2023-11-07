const { Router } = require('express')
const route = Router()

const { getInsumos, getInsumo, postInsumo, putInsumo, deleteInsumo } = require('../../controllers/insumoController/insumoController')

route.get('/insumo',getInsumos)
route.get('/insumo/:id',getInsumo)
route.post('/insumo',postInsumo)
route.put('/insumo/:id',putInsumo)
route.delete('/insumo/:id',deleteInsumo)

module.exports = route