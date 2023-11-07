const { response } = require('express');
const ReferenciaEnPedido = require('../../models/pedidoModel/referenciaPedidoModel');

const getReferenciasEnPedido = async (req, res = response) => {
    try {
        const listReferenciaEnPedido = await ReferenciaEnPedido.findAll();
        res.json({ listReferenciaEnPedido });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener las referencias en pedido',
        });
    }
}

const getReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const referencia = await ReferenciaEnPedido.findByPk(id);

        if (referencia) {
            res.json(referencia);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la referencia en pedido',
        });
    }
}

const postRerenciaEnPedido = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.pedido) {
            return res.status(400).json({ error: 'El campo pedido es obligatorio.' });
        } else if (!/^\d+$/.test(body.pedido)) {
            return res.status(400).json({ error: 'Pedido no válido. Solo se permiten números.' });
        }

        if (!body.referencia) {
            return res.status(400).json({ error: 'El campo referencia es obligatorio.' });
        } else if (!/^\d{1,10}$/.test(body.referencia)) {
            return res.status(400).json({ error: 'Referencia no válida. Solo se permiten números, mínimo 1 y máximo 10 dígitos.' });
        } else {
            const referenciaNumber = parseInt(body.referencia, 10);
            if (isNaN(referenciaNumber) || referenciaNumber <= 0) {
                return res.status(400).json({ error: 'Referencia no válida. Debe ser un número mayor a 0.' });
            }
        }

        if (!body.descripcion) {
            return res.status(400).json({ error: 'El campo descripcion es obligatorio.' });
        }

        if (!body.valorUnitario) {
            return res.status(400).json({ error: 'El campo valorUnitario es obligatorio.' });
        } else if (isNaN(body.valorUnitario) || body.valorUnitario <= 0) {
            return res.status(400).json({ error: 'Valor unitario no válido. Debe ser un número mayor a 0.' });
        }

        if (!body.cantidadTotal) {
            return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
        } else if (isNaN(body.cantidadTotal) || body.cantidadTotal <= 0) {
            return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
        }

        await ReferenciaEnPedido.create(body);
        res.status(201).json({
            success: true,
            message: 'La referencia en pedido fue agregada con éxito.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar la referencia en pedido',
        });
    }
}

const putRefereciaEnPedido = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const referencia = await ReferenciaEnPedido.findByPk(id);

        if (referencia) {
            if (!body.pedido) {
                return res.status(400).json({ error: 'El campo pedido es obligatorio.' });
            } else if (!/^\d+$/.test(body.pedido)) {
                return res.status(400).json({ error: 'Pedido no válido. Solo se permiten números.' });
            }

            if (!body.referencia) {
                return res.status(400).json({ error: 'El campo referencia es obligatorio.' });
            } else if (!/^\d{1,10}$/.test(body.referencia)) {
                return res.status(400).json({ error: 'Referencia no válida. Solo se permiten números, mínimo 1 y máximo 10 dígitos.' });
            } else {
                const referenciaNumber = parseInt(body.referencia, 10);
                if (isNaN(referenciaNumber) || referenciaNumber <= 0) {
                    return res.status(400).json({ error: 'Referencia no válida. Debe ser un número mayor a 0.' });
                }
            }

            if (!body.descripcion) {
                return res.status(400).json({ error: 'El campo descripcion es obligatorio.' });
            }

            if (!body.valorUnitario) {
                return res.status(400).json({ error: 'El campo valorUnitario es obligatorio.' });
            } else if (isNaN(body.valorUnitario) || body.valorUnitario <= 0) {
                return res.status(400).json({ error: 'Valor unitario no válido. Debe ser un número mayor a 0.' });
            }

            if (!body.cantidadTotal) {
                return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
            } else if (isNaN(body.cantidadTotal) || body.cantidadTotal <= 0) {
                return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
            }

            await referencia.update(body);
            res.json({
                success: true,
                message: 'La referencia en pedido fue actualizada correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar la referencia en pedido',
        });
    }
}

const deleteRerenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const referencia = await ReferenciaEnPedido.findByPk(id);

        if (referencia) {
            await referencia.destroy();
            res.json({
                success: true,
                message: 'La referencia en pedido fue eliminada con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe una referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar la referencia en pedido',
        });
    }
}

module.exports = {
    getReferenciasEnPedido,
    getReferenciaEnPedido,
    postRerenciaEnPedido,
    putRefereciaEnPedido,
    deleteRerenciaEnPedido,
};
