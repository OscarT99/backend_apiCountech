const { Router } = require("express")

const route = Router()

const{ getProveedores, getProveedor, postProveedor, putProveedor, deleteProveedor } = require('../../controllers/proveedorController/proveedorController')

route.get('/proveedor',getProveedores)
route.get('/proveedor/:id',getProveedor)
route.post('/proveedor',postProveedor)
route.put('/proveedor/:id',putProveedor)
route.delete('/proveedor/:id',deleteProveedor)

module.exports = route

