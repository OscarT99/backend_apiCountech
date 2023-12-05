const { Router } = require("express")
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router()

const{ getEmpleados, getEmpleado, postEmpleado, putEmpleado} = require('../../controllers/empleadoController/empleadoController')

route.get('/Empleado', [
    validarJWT
],getEmpleados)
route.get('/Empleado/:id', [
    validarJWT
],getEmpleado)
route.post('/Empleado', [
    validarJWT
],postEmpleado)
route.put('/Empleado/:id', [
    validarJWT
],putEmpleado)

module.exports = route
