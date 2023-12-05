const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getCategoriasInsumo, getCategoriaInsumo, postCategoriaInsumo, putCategoriaInsumo, deleteCategoriaInsumo } = require('../../controllers/insumoController/categoriaInsumoController')

route.get('/categoriaInsumo', [
    validarJWT
],getCategoriasInsumo)
route.get('/categoriaInsumo/:id', [
    validarJWT
],getCategoriaInsumo)
route.post('/categoriaInsumo', [
    validarJWT
],postCategoriaInsumo)
route.put('/categoriaInsumo/:id', [
    validarJWT
],putCategoriaInsumo)
route.delete('/categoriaInsumo/:id', [
    validarJWT
],deleteCategoriaInsumo)

module.exports = route