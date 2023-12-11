const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getCategoriasInsumo, getCategoriaInsumo, postCategoriaInsumo, putCategoriaInsumo, deleteCategoriaInsumo, buscarCategoriasInsumo, actualizarEstadoCategoria } = require('../../controllers/insumoController/categoriaInsumoController')

route.get('/categoriaInsumo',getCategoriasInsumo)
route.get('/categoriaInsumo/:id',getCategoriaInsumo)
route.post('/categoriaInsumo',postCategoriaInsumo)
route.put('/categoriaInsumo/:id',putCategoriaInsumo)
route.delete('/categoriaInsumo/:id',deleteCategoriaInsumo)
route.get('/categoriaInsumo/buscar',buscarCategoriasInsumo)
route.put('/categoriaInsumo/actualizarEstado/:id',actualizarEstadoCategoria);



/*
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
*/
module.exports = route