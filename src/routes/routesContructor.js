const clienteRoutes = require('./clienteRoute/clienteRoute');
const proveedorRoutes = require('./proveedorRoute/proveedorRoute')
const pedidoRoutes = require('./pedidoRoutes/pedidoRoute')
const referenciaPedidoRoutes = require('./pedidoRoutes/referenciaPedidoRoute')
const procesoReferenciaPedidoRoutes = require('./pedidoRoutes/procesoReferenciaPedidoController')
const colorProcesoReferenciaPedidoRoutes = require('./pedidoRoutes/colorProcesoReferenciaPedidoRoute')
const tallaColorProcesoReferenciaPedidoRoutes = require('./pedidoRoutes/tallaColorProcesoReferenciaPedidoController')
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

function configureRoutes(app, path) {
    app.use(path, clienteRoutes);
    app.use(path,proveedorRoutes);
    app.use(path, pedidoRoutes);
    app.use(path, referenciaPedidoRoutes);
    app.use(path, procesoReferenciaPedidoRoutes);
    app.use(path, colorProcesoReferenciaPedidoRoutes);
    app.use(path, tallaColorProcesoReferenciaPedidoRoutes);
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
    }

module.exports = configureRoutes;
