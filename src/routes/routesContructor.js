const clienteRoutes = require('./clienteRoute/clienteRoute');
const proveedorRoutes = require('./proveedorRoute/proveedorRoute')
const pedidoRoutes = require('./pedidoRoutes/pedidoRoute')
const referenciaPedidoRoutes = require('./pedidoRoutes/referenciaPedidoRoute')
const procesoReferenciaPedidoRoutes = require('./pedidoRoutes/procesoReferenciaPedidoController')
const colorProcesoReferenciaPedidoRoutes = require('./pedidoRoutes/colorProcesoReferenciaPedidoRoute')
const tallaColorProcesoReferenciaPedidoRoutes = require('./pedidoRoutes/tallaColorProcesoReferenciaPedidoController')
const categoriaInsumoRoute = require('../routes/insumoRoute/insumoCategoriaRoute') 
const insumoRoute = require('./insumoRoute/insumoRoute')

function configureRoutes(app, path) {
    app.use(path, clienteRoutes);
    app.use(path,proveedorRoutes);
    app.use(path, pedidoRoutes);
    app.use(path, referenciaPedidoRoutes);
    app.use(path, procesoReferenciaPedidoRoutes);
    app.use(path, colorProcesoReferenciaPedidoRoutes);
    app.use(path, tallaColorProcesoReferenciaPedidoRoutes);
    app.use(path,categoriaInsumoRoute),
    app.use(path,insumoRoute)    
    }

module.exports = configureRoutes;
