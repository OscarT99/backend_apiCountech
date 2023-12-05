const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router();

const { getAsignarProcedimiento, getAsignarProcedimientos, postAsignarProcedimiento, putAsignarProcedimiento, deleteAsignarProcedimiento } = require('../../controllers/produccionController/asignarProcedimientoController');

route.get('/asignarprocedimiento', [
    validarJWT
], getAsignarProcedimientos);
route.get('/asignarprocedimiento/:id', [
    validarJWT
], getAsignarProcedimiento);
route.post('/asignarprocedimiento', [
    validarJWT
], postAsignarProcedimiento);
route.put('/asignarprocedimiento/:id', [
    validarJWT
], putAsignarProcedimiento);
route.delete('/asignarprocedimiento/:id', [
    validarJWT
], deleteAsignarProcedimiento);

module.exports = route;
