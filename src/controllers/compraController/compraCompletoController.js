const {response} = require('express')
const Proveedor = require('../../models/proveedorModel/proveedorModel')
const Compra = require('../../models/compraModel/compraModel')
const DetalleEnCompra = require('../../models/compraModel/detalleCompraModel')
const Insumo = require('../../models/insumoModel/insumoModel')

const { validarCompra } = require('./validacionesCompraCompleto/validacionesCompra')

const getAllComprasConRelaciones = async (req, res = response) => {
    try{
        const listaCompras = await Compra.findAll({
            include: [
                {
                    model: Proveedor,
                },
                {
                    model:DetalleEnCompra,
                    include: [
                        {
                            model: Insumo
                        }
                    ]
                }
            ]
        })

        res.json({listaCompras})

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de compras con sus respectivas relaciones',
        });
    }
}

const getCompraConRelacionesPorId = async (req, res = response) => {
    const { id } = req.params;
    
    try{
        const compra = await Compra.findByPk(id,{
            include:[
                {
                    model:Proveedor,
                },
                {
                    model:DetalleEnCompra,
                    include:[
                        {
                            model:Insumo
                        }
                    ]
                }
            ]
        });

        if(!compra){
            return res.status(404).json({ success: false, error: 'Compra no encontrada.' });
        }

        res.json({ compra })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la compra con sus respectivas relaciones',
        });
    }
}

const postCompraCompleta = async (req, res = response,next) => {
    try{
        const compraData = req.body

        const validationResponse = await validarCompra(compraData,res)

        if(!validationResponse.success){
            return next(res.status(400).json({success:false, error:validationResponse.error }))
        }

        const compra = await Compra.create({
            proveedor: compraData.proveedor,
            fechaCompra: compraData.fechaCompra,
            numeroFactura: compraData.numeroFactura,
            totalBruto: compraData.totalBruto,
            iva: compraData.iva,
            totalNeto: compraData.totalNeto,
            formaPago : compraData.formaPago

        })

        for(const detalleCompraData of compraData.detalleEnCompras){
             await DetalleEnCompra.create({
                compra: compra.id,
                insumo: detalleCompraData.insumo,
                cantidad: detalleCompraData.cantidad,
                valorUnitario: detalleCompraData.valorUnitario,
                impuestoIva: detalleCompraData.impuestoIva,
                valorTotal: detalleCompraData.valorTotal
            })
        }

        res.status(201).json({
            success: true,
            message: 'Compra completa creada exitosamente.',
        });
    }catch(error){
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al crear el pedido completo' });
    }
}

const putCompraCompleta = async (req, res = response, next) => {
    try {
        const { id } = req.params; // Asumiendo que el ID de la compra se encuentra en los parámetros de la ruta
        const compraData = req.body;

        const validationResponse = await validarCompra(compraData, res);

        if (!validationResponse.success) {
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }

        // Actualizar la compra existente
        const existingCompra = await Compra.findByPk(id);

        if (!existingCompra) {
            return next(res.status(404).json({ success: false, error: 'Compra no encontrada.' }));
        }

        await existingCompra.update({
            proveedor: compraData.proveedor,
            fechaCompra: compraData.fechaCompra,
            numeroFactura: compraData.numeroFactura,
            totalBruto: compraData.totalBruto,
            iva: compraData.iva,
            totalNeto: compraData.totalNeto,
            formaPago: compraData.formaPago
        });

        // Actualizar detalles de compra existentes o agregar nuevos detalles
        for (const detalleCompraData of compraData.detalleEnCompras) {
            const existingDetalle = await DetalleEnCompra.findOne({
                where: {
                    compra: existingCompra.id,
                    insumo: detalleCompraData.insumo
                }
            });

            if (existingDetalle) {
                // Si el detalle ya existe, actualizarlo
                await existingDetalle.update({
                    cantidad: detalleCompraData.cantidad,
                    valorUnitario: detalleCompraData.valorUnitario,
                    impuestoIva: detalleCompraData.impuestoIva,
                    valorTotal: detalleCompraData.valorTotal
                });
            } else {
                // Si el detalle no existe, crear uno nuevo
                await DetalleEnCompra.create({
                    compra: existingCompra.id,
                    insumo: detalleCompraData.insumo,
                    cantidad: detalleCompraData.cantidad,
                    valorUnitario: detalleCompraData.valorUnitario,
                    impuestoIva: detalleCompraData.impuestoIva,
                    valorTotal: detalleCompraData.valorTotal
                });
            }
        }

        res.status(200).json({
            success: true,
            message: 'Compra actualizada exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al actualizar la compra completa' });
    }
};


module.exports = {
    getAllComprasConRelaciones,
    getCompraConRelacionesPorId,
    postCompraCompleta,
    putCompraCompleta
}