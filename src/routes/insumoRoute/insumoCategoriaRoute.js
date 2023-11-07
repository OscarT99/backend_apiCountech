const { Router } = require('express')
const route = Router()

const { getCategoriasInsumo, getCategoriaInsumo, postCategoriaInsumo, putCategoriaInsumo, deleteCategoriaInsumo } = require('../../controllers/insumoController/categoriaInsumoController')

route.get('/categoriaInsumo',getCategoriasInsumo)
route.get('/categoriaInsumo/:id',getCategoriaInsumo)
route.post('/categoriaInsumo',postCategoriaInsumo)
route.put('/categoriaInsumo/:id',putCategoriaInsumo)
route.delete('/categoriaInsumo/:id',deleteCategoriaInsumo)

module.exports = route