const { response } = require('express');
const DetalleCompraModel = require('../../models/compraModel/detalleCompraModel');
const Compra = require('../../models/compraModel/compraModel');
const Insumo = require('../../models/insumoModel/insumoModel');

const getDetallesCompra = async (req, res = response) => {
    try {
        const listDetallesCompra = await DetalleCompraModel.findAll({
            include: [Compra, Insumo],
        });
        res.json({ listDetallesCompra });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los detalles de compra',
        });
    }
}

const getDetalleCompra = async (req, res = response) => {
    try {
        const { id } = req.params;
        const detalleCompra = await DetalleCompraModel.findByPk(id, {
            include: [Compra, Insumo],
        });

        if (detalleCompra) {
            res.json(detalleCompra);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un detalle de compra con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el detalle de compra',
        });
    }
}

const postDetalleCompra = async (req, res = response) => {
    try {
        const { body } = req;

        // Validar si la compra existe y no es null
        if (!body.compra) {
            return res.status(400).json({ error: 'El campo compra es obligatorio.' });
        }
        const compra = await Compra.findByPk(body.compra);
        if (!compra) {
            return res.status(400).json({ error: 'La compra especificada no existe.' });
        }

        // Validar si el insumo existe y no es null
        if (!body.insumo) {
            return res.status(400).json({ error: 'El campo insumo es obligatorio.' });
        }
        const insumo = await Insumo.findByPk(body.insumo);
        if (!insumo) {
            return res.status(400).json({ error: 'El insumo especificado no existe.' });
        }

        // Resto de las validaciones
        if (isNaN(body.cantidad) || body.cantidad < 1) {
            return res.status(400).json({ error: 'El campo cantidad debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.valorUnitario) || body.valorUnitario < 1) {
            return res.status(400).json({ error: 'El campo valorUnitario debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.impuestoIva) || body.impuestoIva < 1) {
            return res.status(400).json({ error: 'El campo impuestoIva debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.valorTotal) || body.valorTotal < 1) {
            return res.status(400).json({ error: 'El campo valorTotal debe ser un número mayor o igual a 1.' });
        }

        // Crear el detalle de compra
        await DetalleCompraModel.create(body);

        res.status(201).json({
            success: true,
            message: 'El detalle de compra fue agregado con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el detalle de compra',
        });
    }
}


const putDetalleCompra = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const detalleCompra = await DetalleCompraModel.findByPk(id);

        if (!detalleCompra) {
            return res.status(404).json({ success: false, error: `No existe un detalle de compra con el id ${id}` });
        }

        // Validaciones para cada atributo con mensajes de error personalizados
        if (!body.compra) {
            return res.status(400).json({ error: 'El campo compra es obligatorio.' });
        }

        if (!body.insumo) {
            return res.status(400).json({ error: 'El campo insumo es obligatorio.' });
        }

        if (isNaN(body.cantidad) || body.cantidad < 1) {
            return res.status(400).json({ error: 'El campo cantidad debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.valorUnitario) || body.valorUnitario < 1) {
            return res.status(400).json({ error: 'El campo valorUnitario debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.impuestoIva) || body.impuestoIva < 1) {
            return res.status(400).json({ error: 'El campo impuestoIva debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.valorTotal) || body.valorTotal < 1) {
            return res.status(400).json({ error: 'El campo valorTotal debe ser un número mayor o igual a 1.' });
        }

        // Actualizar el detalle de compra
        await detalleCompra.update(body);

        res.status(200).json({
            success: true,
            message: 'El detalle de compra fue actualizado con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al actualizar el detalle de compra',
        });
    }
}

const deleteDetalleCompra = async (req, res = response) => {
    try {
        const { id } = req.params;
        const detalleCompra = await DetalleCompraModel.findByPk(id);

        if (!detalleCompra) {
            return res.status(404).json({ success: false, error: `No existe un detalle de compra con el id ${id}` });
        } else {
            await detalleCompra.destroy();
            res.json({
                success: true,
                message: 'El detalle de compra fue eliminado con éxito',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al eliminar el detalle de compra',
        });
    }
}

module.exports = {
    getDetallesCompra,
    getDetalleCompra,
    postDetalleCompra,
    deleteDetalleCompra,
    putDetalleCompra
}
