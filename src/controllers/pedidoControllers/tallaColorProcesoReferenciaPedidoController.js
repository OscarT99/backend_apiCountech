const { response } = require('express');
const TallaEnColorEnProcesoEnReferenciaEnPedido = require('../../models/pedidoModel/tallaColorProcesoReferenciaPedidoModel');

const getTallasEnColorEnProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const listTallaEnColorEnProcesoEnReferenciaEnPedido = await TallaEnColorEnProcesoEnReferenciaEnPedido.findAll();
        res.json({ listTallaEnColorEnProcesoEnReferenciaEnPedido });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener las tallas en color en proceso en referencia en pedido',
        });
    }
}

const getTallaEnColorEnProcesoEnReferenciaEnPedido = async(req, res = response) => {
    try {
        const {id} = req.params;
        const talla = await TallaEnColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (talla) {
            res.json({ talla });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una talla con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la talla en color en proceso en referencia en pedido',
        });
    }
}

const postTallaEnColorEnProcesoEnReferenciaEnPedido = async(req, res = response) => {
    try {
        const {body} = req;

        if (!body.color) {
            return res.status(400).json({ success: false, error: 'El campo color es obligatorio.' });
        } else if (isNaN(body.color) || body.color < 1 || !/^\d+$/.test(body.color)) {
            return res.status(400).json({ success: false, error: 'Color no válido. Solo se permiten números.' });
        }

        if (!body.talla) {
            return res.status(400).json({ success: false, error: 'El campo talla es obligatorio.' });
        } else if (!/^(S|M|L|XL)$/.test(body.talla)) {
            return res.status(400).json({ success: false, error: 'Talla no válida. Debe ser S, M, L o XL.' });
        }

        if (!body.cantidad) {
            return res.status(400).json({ success: false, error: 'El campo cantidad es obligatorio.' });
        } else if (isNaN(body.cantidad) || body.cantidad <= 0 || !/^\d+$/.test(body.cantidad)) {
            return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números mayores que 0.' });
        }

        await TallaEnColorEnProcesoEnReferenciaEnPedido.create(body);
        res.status(201).json({
            success: true,
            message: 'La talla fue creada exitosamente.',
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al agregar la talla en color en proceso en referencia en pedido',
        });
    }
}

const putTallaEnColorEnProcesoEnReferenciaEnPedido = async(req, res = response) => {
    try {
        const {id} = req.params;
        const {body} = req;
        const talla = await TallaEnColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (talla) {
            if (!body.color) {
                return res.status(400).json({ success: false, error: 'El campo color es obligatorio.' });
            } else if (isNaN(body.color) || body.color < 1 || !/^\d+$/.test(body.color)) {
                return res.status(400).json({ success: false, error: 'Color no válido. Solo se permiten números.' });
            }

            if (!body.talla) {
                return res.status(400).json({ success: false, error: 'El campo talla es obligatorio.' });
            } else if (!/^(S|M|L|XL)$/.test(body.talla)) {
                return res.status(400).json({ success: false, error: 'Talla no válida. Debe ser S, M, L o XL.' });
            }

            if (!body.cantidad) {
                return res.status(400).json({ success: false, error: 'El campo cantidad es obligatorio.' });
            } else if (isNaN(body.cantidad) || body.cantidad <= 0 || !/^\d+$/.test(body.cantidad)) {
                return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números mayores que 0.' });
            }

            await talla.update(body);
            res.json({
                success: true,
                message: 'La talla fue actualizada exitosamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una talla con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar la talla en color en proceso en referencia en pedido',
        });
    }
}

const deleteTallaEnColorEnProcesoEnReferenciaEnPedido = async(req, res = response) => {
    try {
        const {id} = req.params;
        const talla = await TallaEnColorEnProcesoEnReferenciaEnPedido.findByPk(id);

        if (talla) {
            await talla.destroy();
            res.json({
                success: true,
                message: 'La talla fue eliminada exitosamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una talla con el id ${id}`,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar la talla en color en proceso en referencia en pedido',
        });
    }
}

module.exports = {
    getTallaEnColorEnProcesoEnReferenciaEnPedido,
    getTallasEnColorEnProcesoEnReferenciaEnPedido,
    postTallaEnColorEnProcesoEnReferenciaEnPedido,
    putTallaEnColorEnProcesoEnReferenciaEnPedido,
    deleteTallaEnColorEnProcesoEnReferenciaEnPedido
};
