const { response } = require('express');
const ProcesoEnReferenciaEnPedido = require('../../models/pedidoModel/procesoReferenciaPedidoModel');

const getProcesosEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const listProcesoEnReferenciaEnPedido = await ProcesoEnReferenciaEnPedido.findAll();
        res.json({ listProcesoEnReferenciaEnPedido });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los procesos en referencia en pedido',
        });
    }
}

const getProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const proceso = await ProcesoEnReferenciaEnPedido.findByPk(id);

        if (proceso) {
            res.json({ proceso });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el proceso en referencia en pedido',
        });
    }
}

const postProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { body } = req;

        if (!body.referencia) {
            return res.status(400).json({ error: 'El campo referencia es obligatorio.' });
        } else if (!/^\d+$/.test(body.referencia)) {
            return res.status(400).json({ error: 'Referencia no válida. Solo se permiten números.' });
        }

        if (!body.proceso) {
            return res.status(400).json({ error: 'El campo proceso es obligatorio.' });
        }

        if (!body.tipoDeMaquina) {
            return res.status(400).json({ error: 'El campo tipoDeMaquina es obligatorio.' });
        } else if (!['Fileteadora', 'Plana', 'Presilladora', 'Recubridora', 'Manual'].includes(body.tipoDeMaquina)) {
            return res.status(400).json({ error: 'Tipo de máquina no válido. Debe ser uno de los siguientes valores: Fileteadora, Plana, Presilladora, Recubridora, Manual.' });
        }

        if (!body.cantidadTotal) {
            return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
        } else if (!/^\d+$/.test(body.cantidadTotal)) {
            return res.status(400).json({ error: 'Cantidad total no válida. Solo se permiten números enteros.' });
        } else if (parseInt(body.cantidadTotal) <= 0) {
            return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
        }

        await ProcesoEnReferenciaEnPedido.create(body);
        res.status(201).json({
            success: true,
            message: 'El proceso en referencia en pedido fue agregado con éxito.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el proceso en referencia en pedido',
        });
    }
}

const putProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const proceso = await ProcesoEnReferenciaEnPedido.findByPk(id);

        if (proceso) {
            if (!body.referencia) {
                return res.status(400).json({ error: 'El campo referencia es obligatorio.' });
            } else if (!/^\d+$/.test(body.referencia)) {
                return res.status(400).json({ error: 'Referencia no válida. Solo se permiten números.' });
            }

            if (!body.proceso) {
                return res.status(400).json({ error: 'El campo proceso es obligatorio.' });
            }

            if (!body.tipoDeMaquina) {
                return res.status(400).json({ error: 'El campo tipoDeMaquina es obligatorio.' });
            } else if (!['Fileteadora', 'Plana', 'Presilladora', 'Recubridora', 'Manual'].includes(body.tipoDeMaquina)) {
                return res.status(400).json({ error: 'Tipo de máquina no válido. Debe ser uno de los siguientes valores: Fileteadora, Plana, Presilladora, Recubridora, Manual.' });
            }

            if (!body.cantidadTotal) {
                return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
            } else if (!/^\d+$/.test(body.cantidadTotal)) {
                return res.status(400).json({ error: 'Cantidad total no válida. Solo se permiten números enteros.' });
            } else if (parseInt(body.cantidadTotal) <= 0) {
                return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
            }

            await proceso.update(body);
            res.json({
                success: true,
                message: 'El proceso en referencia en pedido fue actualizado correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al actualizar el proceso en referencia en pedido',
        });
    }
}

const deleteProcesoEnReferenciaEnPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const proceso = await ProcesoEnReferenciaEnPedido.findByPk(id);

        if (proceso) {
            await proceso.destroy();
            res.json({
                success: true,
                message: 'El proceso en referencia en pedido fue eliminado con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un proceso en referencia en pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un problema al eliminar el proceso en referencia en pedido',
        });
    }
}

module.exports = {
    getProcesoEnReferenciaEnPedido,
    getProcesosEnReferenciaEnPedido,
    postProcesoEnReferenciaEnPedido,
    putProcesoEnReferenciaEnPedido,
    deleteProcesoEnReferenciaEnPedido
};
