const { response } = require('express');
const ColorEnProcesoEnReferenciaEnPedido = require('../../models/pedidoModel/colorProcesoReferenciaPedidoModel');

const getColoresEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const listColorEnProcesoEnReferenciaEnPedido = await ColorEnProcesoEnReferenciaEnPedido.findAll();
        res.json({ listColorEnProcesoEnReferenciaEnPedido });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los colores en proceso en referencia en pedido',
        });
    }
};

const getColorEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const color = await ColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (color) {
            res.json({ color });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un color en proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el color en proceso en referencia en pedido',
        });
    }
};

const postColorEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { body } = req;

        // Agregar validación para el campo "proceso"
        if (!body.proceso) {
            return res.status(400).json({ error: 'El campo proceso es obligatorio.' });
        } else if (!/^\d+$/.test(body.proceso)) {
            return res.status(400).json({ error: 'Proceso no válido. Solo se permiten números.' });
        }

        // Agregar validación para el campo "color"
        if (!body.color) {
            return res.status(400).json({ error: 'El campo color es obligatorio.' });
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+/.test(body.color)) {
            return res.status(400).json({ error: 'Color no válido. Solo se permiten letras y tildes.' });
        }

        // Agregar validación para el campo "cantidad"
        if (!body.cantidad) {
            return res.status(400).json({ error: 'El campo cantidad es obligatorio.' });
        } else if (isNaN(body.cantidad) || body.cantidad < 1 || !/^\d+$/.test(body.cantidad)) {
            return res.status(400).json({ error: 'Cantidad no válida. Solo se permiten números.' });
        }

        await ColorEnProcesoEnReferenciaEnPedido.create(body);
        res.status(201).json({
            success: true,
            message: 'El color en proceso en referencia en pedido fue agregado con éxito.',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el color en proceso en referencia en pedido',
        });
    }
};

const putColorEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { body } = req;

        const color = await ColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (color) {
            // Agregar validación para el campo "proceso"
            if (!body.proceso) {
                return res.status(400).json({ error: 'El campo proceso es obligatorio.' });
            } else if (!/^\d+$/.test(body.proceso)) {
                return res.status(400).json({ error: 'Proceso no válido. Solo se permiten números.' });
            }

            // Agregar validación para el campo "color"
            if (!body.color) {
                return res.status(400).json({ error: 'El campo color es obligatorio.' });
            } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+/.test(body.color)) {
                return res.status(400).json({ error: 'Color no válido. Solo se permiten letras y tildes.' });
            }

            // Agregar validación para el campo "cantidad"
            if (!body.cantidad) {
                return res.status(400).json({ error: 'El campo cantidad es obligatorio.' });
            } else if (isNaN(body.cantidad) || body.cantidad < 1) {
                return res.status(400).json({ error: 'Cantidad no válida. Debe ser un número mayor o igual a 1.' });
            }

            await color.update(body);
            res.json({
                success: true,
                message: 'El color en proceso en referencia en pedido fue actualizado correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un color en proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar el color en proceso en referencia en pedido',
        });
    }
};

const deleteColorEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const color = await ColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (color) {
            await color.destroy();
            res.json({
                success: true,
                message: 'El color en proceso en referencia en pedido fue eliminado con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un color en proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar el color en proceso en referencia en pedido',
        });
    }
};

module.exports = {
    getColorEnProcesoEnReferenciaEnPedido,
    getColoresEnProcesoEnReferenciaEnPedido,
    postColorEnProcesoEnReferenciaEnPedido,
    putColorEnProcesoEnReferenciaEnPedido,
    deleteColorEnProcesoEnReferenciaEnPedido,
};
