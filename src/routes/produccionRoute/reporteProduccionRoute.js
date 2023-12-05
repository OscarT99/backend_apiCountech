const { Router } = require('express');
const { validarJWT } = require('../../middlewares/validar-jwt')

const route = Router();

const { getReporteProduccion, getReporteProducciones, postReporteProduccion, putReporteProduccion, deleteReporteProduccion } = require('../../controllers/produccionController/reporteProduccionController');

route.get('/reporteproduccion', [
    validarJWT
], getReporteProducciones);
route.get('/reporteproduccion/:id',[
    validarJWT
], getReporteProduccion);
route.post('/reporteproduccion',[
    validarJWT
], postReporteProduccion);
route.put('/reporteproduccion/:id',[
    validarJWT
], putReporteProduccion);
route.delete('/reporteproduccion/:id',[
    validarJWT
], deleteReporteProduccion);

module.exports = route;
