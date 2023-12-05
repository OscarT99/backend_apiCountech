const { Router } = require('express')
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const { getInsumos, getInsumo, postInsumo, putInsumo, deleteInsumo } = require('../../controllers/insumoController/insumoController')

route.get('/insumo', [
    validarJWT
],getInsumos)
route.get('/insumo/:id', [
    validarJWT
],getInsumo)
route.post('/insumo', [
    validarJWT
],postInsumo)
route.put('/insumo/:id', [
    validarJWT
],putInsumo)
route.delete('/insumo/:id', [
    validarJWT
],deleteInsumo)

module.exports = route