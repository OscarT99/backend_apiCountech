const { response } = require('express');
const Compra = require('../../models/compraModel/compraModel');
const Proveedor = require('../../models/proveedorModel/proveedorModel');

const getCompras = async (req, res = response) => {
    try {
        const listCompras = await Compra.findAll({
            include: Proveedor,            
        });
        res.json({ listCompras });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener las compras',
        });
    }
}

const getCompra = async (req, res = response) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findByPk(id, {
            include: Proveedor,
        });

        if (compra) {
            res.json(compra);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una compra con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la compra',
        });
    }
}

const postCompra = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.proveedor) {
            return res.status(400).json({ error: 'El campo proveedor es obligatorio.' });
        }

        if (!body.fechaCompra) {
            return res.status(400).json({ error: 'El campo fechaCompra es obligatorio.' });
        }

        if (!body.numeroFactura) {
            return res.status(400).json({ error: 'El campo numeroFactura es obligatorio.' });
        } else {
            const existingCompra = await Compra.findOne({ where: { numeroFactura: body.numeroFactura } });
            if (existingCompra) {
                return res.status(400).json({ error: 'La compra con ese número de factura ya existe.' });
            }
        }

        if (isNaN(body.totalBruto) || body.totalBruto < 1) {
            return res.status(400).json({ error: 'El campo totalBruto debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.iva) || body.iva < 1) {
            return res.status(400).json({ error: 'El campo iva debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.totalNeto) || body.totalNeto < 1) {
            return res.status(400).json({ error: 'El campo totalNeto debe ser un número mayor o igual a 1.' });
        }

        if (!body.formaPago) {
            return res.status(400).json({ error: 'El campo formaPago es obligatorio.' });
        } else if (!['Contado', 'Crédito'].includes(body.formaPago)) {
            return res.status(400).json({ error: 'La forma de pago debe ser "Contado" o "Crédito".' });
        }

        // Crear la compra
        await Compra.create(body);

        res.status(201).json({
            success: true,
            message: 'La compra fue agregada con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar la compra',
        });
    }
}

const putCompra = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const compra = await Compra.findByPk(id);

        if (!compra) {
            return res.status(404).json({ success: false, error: `No existe una compra con el id ${id}` });
        }

        // Validaciones para cada atributo con mensajes de error personalizados
        if (!body.proveedor) {
            return res.status(400).json({ error: 'El campo proveedor es obligatorio.' });
        }

        if (!body.fechaCompra) {
            return res.status(400).json({ error: 'El campo fechaCompra es obligatorio.' });
        }

        if (!body.numeroFactura) {
            return res.status(400).json({ error: 'El campo numeroFactura es obligatorio.' });
        } else if (body.numeroFactura !== compra.numeroFactura) {
            const existingCompra = await Compra.findOne({ where: { numeroFactura: body.numeroFactura } });
            if (existingCompra) {
                return res.status(400).json({ error: 'La compra con ese número de factura ya existe.' });
            }
        }

        if (isNaN(body.totalBruto) || body.totalBruto < 1) {
            return res.status(400).json({ error: 'El campo totalBruto debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.iva) || body.iva < 1) {
            return res.status(400).json({ error: 'El campo iva debe ser un número mayor o igual a 1.' });
        }

        if (isNaN(body.totalNeto) || body.totalNeto < 1) {
            return res.status(400).json({ error: 'El campo totalNeto debe ser un número mayor o igual a 1.' });
        }

        if (!body.formaPago) {
            return res.status(400).json({ error: 'El campo formaPago es obligatorio.' });
        } else if (!['Contado', 'Crédito'].includes(body.formaPago)) {
            return res.status(400).json({ error: 'La forma de pago debe ser "Contado" o "Crédito".' });
        }

        // Actualizar la compra
        await compra.update(body);

        res.status(200).json({
            success: true,
            message: 'La compra fue actualizada con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al actualizar la compra',
        });
    }
}

const deleteCompra = async (req, res = response) => {
    try {
        const { id } = req.params;
        const compra = await Compra.findByPk(id);

        if (!compra) {
            return res.status(404).json({ success: false, error: `No existe una compra con el id ${id}` });
        } else {
            await compra.destroy();
            res.json({
                success: true,
                message: 'La compra fue eliminada con éxito',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al eliminar la compra',
        });
    }
}

module.exports = {
    getCompras,
    getCompra,
    postCompra,
    deleteCompra,
    putCompra
}
