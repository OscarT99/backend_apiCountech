const clienteRoutes = require('./clienteRoute/clienteRoute');
const proveedorRoutes = require('./proveedorRoute/proveedorRoute')
const categoriaInsumoRoute = require('../routes/insumoRoute/insumoCategoriaRoute') 
const insumoRoute = require('./insumoRoute/insumoRoute')
const compraRoute = require('./compraRoute/compraRoute')
const detalleCompraRoute = require('./compraRoute/detalleCompraRoute')
const usuarioRoute = require('./usuarioRoute/usuarioRoute')
const ventaRoute = require('../routes/ventaRoute/ventaRoute')
const abonoVentaRoute = require('./abonoVentaRoute/abonoVentaRoute')
const abonoCompraRoute = require('./abonoCompraRoute/abonoCompraRoute')
const empleadoRoutes = require('./empleadoRoute/empleadoRoute');
const asignarProcedimientoRoute = require('./produccionRoute/asignarProcedimientoRoute');
const reporteProduccionRoute = require('./produccionRoute/reporteProduccionRoute');
const pedidoCompletoRoute = require('./pedidoRoutes/pedidoCompletoRoute')
const compraCompletoRoute = require('./compraRoute/compraCompletoRoute')
const authRoute = require('./authRoute/authRoute');

function configureRoutes(app, path) {
    app.use(path, clienteRoutes);
    app.use(path,proveedorRoutes);
    app.use(path,categoriaInsumoRoute),
    app.use(path,insumoRoute),
    app.use(path,compraRoute),
    app.use(path,detalleCompraRoute)   
    app.use(path, usuarioRoute);
    app.use(path, ventaRoute);
    app.use(path, abonoVentaRoute);
    app.use(path, abonoCompraRoute);
    app.use(path, empleadoRoutes);
    app.use(path, asignarProcedimientoRoute);
    app.use(path, reporteProduccionRoute);
    app.use(path, pedidoCompletoRoute);
    app.use(path, compraCompletoRoute);
    app.use(path, authRoute); 
    }

module.exports = configureRoutes;
