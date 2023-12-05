const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');
const Cliente = require('../../models/clienteModel/clienteModel');
const ReferenciaEnPedido = require('../../models/pedidoModel/referenciaPedidoModel');
const ProcesoReferenciaPedido = require('../../models/pedidoModel/procesoReferenciaPedidoModel');
const ColorProcesoReferenciaPedido = require('../../models/pedidoModel/colorProcesoReferenciaPedidoModel');
const TallaColorProcesoReferenciaPedido = require('../../models/pedidoModel/tallaColorProcesoReferenciaPedidoModel');

const { validarPedido } = require('./validacionesPedidoCompleto/validacionesPedido')

const getAllPedidosConRelaciones = async (req, res = response) => {
    try {
        const listaPedidos = await Pedido.findAll({
            include: [
                {
                    model: Cliente,                    
                },
                {
                    model: ReferenciaEnPedido,
                    include: [
                        {
                            model: ProcesoReferenciaPedido,
                            include: [
                                {
                                    model: ColorProcesoReferenciaPedido,
                                    include: [
                                        {
                                            model: TallaColorProcesoReferenciaPedido,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        res.json({ listaPedidos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener la lista de pedidos con sus respectivas relaciones',
        });
    }
};

const getPedidoConRelacionesPorId = async (req, res = response) => {
    const { id } = req.params;

    try {
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: Cliente,
                },
                {
                    model: ReferenciaEnPedido,
                    include: [
                        {
                            model: ProcesoReferenciaPedido,
                            include: [
                                {
                                    model: ColorProcesoReferenciaPedido,
                                    include: [
                                        {
                                            model: TallaColorProcesoReferenciaPedido,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!pedido) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado.' });
        }

        res.json(pedido);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el pedido con sus respectivas relaciones',
        });
    }
};

const postPedidoCompleto = async (req, res = response,next) => {
    try {
        const pedidoData = req.body;

        const validationResponse = await validarPedido(pedidoData, res);

        if (!validationResponse.success) {
            // Si las validaciones fallan, envía un error al cliente
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }

        let totalValorReferencia = 0;
        for (const referenciaData of pedidoData.ReferenciaEnPedidos) {
        const valorReferencia = referenciaData.cantidadTotal * referenciaData.valorUnitario;
            totalValorReferencia += valorReferencia;
        }

        const pedido = await Pedido.create({
            cliente: pedidoData.cliente,
            ordenTrabajo: pedidoData.ordenTrabajo,
            fechaOrdenTrabajo: pedidoData.fechaOrdenTrabajo,
            fechaEntregaOrden: pedidoData.fechaEntregaOrden,
            formaPago: pedidoData.formaPago,
            observaciones: pedidoData.observaciones,
            valorTotal:totalValorReferencia
        });
        
        // Crea las referencias en pedido
        for (const referenciaData of pedidoData.ReferenciaEnPedidos) {            
            const referenciaEnPedido = await ReferenciaEnPedido.create({
                pedido: pedido.id,
                referencia: referenciaData.referencia,
                descripcion: referenciaData.descripcion,
                valorUnitario: referenciaData.valorUnitario,
                cantidadTotal: referenciaData.cantidadTotal,
                valorTotalReferencia: referenciaData.cantidadTotal * referenciaData.valorUnitario
            });


            // Crea los procesos en referencia
            if (referenciaData.ProcesoEnReferenciaEnPedidos) {
                for (const procesoData of referenciaData.ProcesoEnReferenciaEnPedidos) {
                    const procesoEnReferencia = await ProcesoReferenciaPedido.create({
                        referencia: referenciaEnPedido.id,
                        proceso: procesoData.proceso,
                        tipoDeMaquina: procesoData.tipoDeMaquina,
                        cantidadTotal: procesoData.cantidadTotal
                        // ... otras propiedades de ProcesoReferenciaPedido
                    });

                    // Crea los colores en proceso
                    if (procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                        for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                            const colorEnProceso = await ColorProcesoReferenciaPedido.create({
                                proceso: procesoEnReferencia.id,
                                color: colorData.color,
                                cantidad: colorData.cantidad,
                                // ... otras propiedades de ColorProcesoReferenciaPedido
                            });

                            // Crea las tallas en color en proceso
                            if (colorData.tallaEnColorEnProceso) {
                                for (const tallaData of colorData.TallaEnColorEnProcesoEnReferenciaEnPedidos
                                    ) {
                                    await TallaColorProcesoReferenciaPedido.create({
                                        color: colorEnProceso.id,
                                        talla: tallaData.talla,
                                        cantidad: tallaData.cantidad,
                                        // ... otras propiedades de TallaColorProcesoReferenciaPedido
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }

        // Devuelve una respuesta si todo fue exitoso
        res.status(201).json({
            success: true,
            message: 'Pedido completo creado exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al crear el pedido completo' });
    }
};

const putPedidoCompleto = async (req, res = response, next) => {
    const { id } = req.params;
    const pedidoData = req.body;

    try {
        const validationResponse = await validarPedido(pedidoData, res);

        if (!validationResponse.success) {
            return next(res.status(400).json({ success: false, error: validationResponse.error }));
        }
        const existingPedido = await Pedido.findByPk(id);

        if (!existingPedido) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado.' });
        }

        let totalValorReferencia = 0;
        for (const referenciaData of pedidoData.ReferenciaEnPedidos) {
        const valorReferencia = referenciaData.cantidadTotal * referenciaData.valorUnitario;
            totalValorReferencia += valorReferencia;
        }

        await existingPedido.update({
            cliente: pedidoData.cliente,
            ordenTrabajo: pedidoData.ordenTrabajo,
            fechaOrdenTrabajo: pedidoData.fechaOrdenTrabajo,
            fechaEntregaOrden: pedidoData.fechaEntregaOrden,
            formaPago: pedidoData.formaPago,
            valorTotal: pedidoData.valorTotal,
            observaciones: pedidoData.observaciones,
            valorTotal:totalValorReferencia
        });

        // Actualizar o crear las referencias en pedido
        for (const referenciaData of pedidoData.ReferenciaEnPedidos) {
            if (referenciaData.id) {
                // Si tiene un ID, actualiza la referencia existente
                const existingReferencia = await ReferenciaEnPedido.findByPk(referenciaData.id);
                if (existingReferencia) {
                    await existingReferencia.update({
                        referencia: referenciaData.referencia,
                        descripcion: referenciaData.descripcion,
                        valorUnitario: referenciaData.valorUnitario,
                        cantidadTotal: referenciaData.cantidadTotal,
                        valorTotalReferencia: referenciaData.cantidadTotal * referenciaData.valorUnitario
                    });

                    // Actualizar o crear los procesos en referencia
                    for (const procesoData of referenciaData.ProcesoEnReferenciaEnPedidos) {
                        if (procesoData.id) {
                            // Actualizar proceso existente
                            const existingProceso = await ProcesoReferenciaPedido.findByPk(procesoData.id);
                            if (existingProceso) {
                                await existingProceso.update({
                                    proceso: procesoData.proceso,
                                    tipoDeMaquina: procesoData.tipoDeMaquina,
                                    cantidadTotal: procesoData.cantidadTotal,
                                    // ... otras propiedades de ProcesoReferenciaPedido
                                });

                                // Actualizar o crear los colores en proceso
                                for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                                    if (colorData.id) {
                                        // Actualizar color existente
                                        const existingColor = await ColorProcesoReferenciaPedido.findByPk(colorData.id);
                                        if (existingColor) {
                                            await existingColor.update({
                                                color: colorData.color,
                                                cantidad: colorData.cantidad,
                                                // ... otras propiedades de ColorProcesoReferenciaPedido
                                            });

                                            // Actualizar o crear las tallas en color en proceso
                                            for (const tallaData of colorData.TallaEnColorEnProcesoEnReferenciaEnPedidos
                                                ) {
                                                if (tallaData.id) {
                                                    // Actualizar talla existente
                                                    const existingTalla = await TallaColorProcesoReferenciaPedido.findByPk(tallaData.id);
                                                    if (existingTalla) {
                                                        await existingTalla.update({
                                                            talla: tallaData.talla,
                                                            cantidad: tallaData.cantidad,
                                                            // ... otras propiedades de TallaColorProcesoReferenciaPedido
                                                        });
                                                    }
                                                } else {
                                                    // Crear nueva talla
                                                    await TallaColorProcesoReferenciaPedido.create({
                                                        color: existingColor.id,
                                                        talla: tallaData.talla,
                                                        cantidad: tallaData.cantidad,
                                                        // ... otras propiedades de TallaColorProcesoReferenciaPedido
                                                    });
                                                }
                                            }
                                        }
                                    } else {
                                        // Crear nuevo color
                                        const nuevoColor = await ColorProcesoReferenciaPedido.create({
                                            proceso: existingProceso.id,
                                            color: colorData.color,
                                            cantidad: colorData.cantidad,
                                            // ... otras propiedades de ColorProcesoReferenciaPedido
                                        });

                                        // Crear las tallas en color en proceso
                                        for (const tallaData of colorData.TallaEnColorEnProcesoEnReferenciaEnPedidos
                                            ) {
                                            await TallaColorProcesoReferenciaPedido.create({
                                                color: nuevoColor.id,
                                                talla: tallaData.talla,
                                                cantidad: tallaData.cantidad,
                                                // ... otras propiedades de TallaColorProcesoReferenciaPedido
                                            });
                                        }
                                    }
                                }
                            }
                        } else {
                            // Crear nuevo proceso
                            const nuevoProceso = await ProcesoReferenciaPedido.create({
                                referencia: existingReferencia.id,
                                proceso: procesoData.proceso,
                                tipoDeMaquina: procesoData.tipoDeMaquina,
                                cantidadTotal: procesoData.cantidadTotal,
                                // ... otras propiedades de ProcesoReferenciaPedido
                            });

                            // Crear los colores en proceso
                            for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                                // Crear nuevo color
                                const nuevoColor = await ColorProcesoReferenciaPedido.create({
                                    proceso: nuevoProceso.id,
                                    color: colorData.color,
                                    cantidad: colorData.cantidad,
                                    // ... otras propiedades de ColorProcesoReferenciaPedido
                                });

                                // Crear las tallas en color en proceso
                                for (const tallaData of colorData.TallaEnColorEnProcesoEnReferenciaEnPedidos
                                    ) {
                                    await TallaColorProcesoReferenciaPedido.create({
                                        color: nuevoColor.id,
                                        talla: tallaData.talla,
                                        cantidad: tallaData.cantidad,
                                        // ... otras propiedades de TallaColorProcesoReferenciaPedido
                                    });
                                }
                            }
                        }
                    }
                }
            } else {
                // Si no tiene un ID, crea una nueva referencia
                const nuevaReferencia = await ReferenciaEnPedido.create({
                    pedido: id,
                    referencia: referenciaData.referencia,
                    descripcion: referenciaData.descripcion,
                    valorUnitario: referenciaData.valorUnitario,
                    cantidadTotal: referenciaData.cantidadTotal,
                    valorTotalReferencia: referenciaData.cantidadTotal * referenciaData.valorUnitario
                });

                // Crear los procesos en referencia
                for (const procesoData of referenciaData.ProcesoEnReferenciaEnPedidos) {
                    // Crear nuevo proceso
                    const nuevoProceso = await ProcesoReferenciaPedido.create({
                        referencia: nuevaReferencia.id,
                        proceso: procesoData.proceso,
                        tipoDeMaquina: procesoData.tipoDeMaquina,
                        cantidadTotal: procesoData.cantidadTotal,
                        // ... otras propiedades de ProcesoReferenciaPedido
                    });

                    // Crear los colores en proceso
                    for (const colorData of procesoData.ColorEnProcesoEnReferenciaEnPedidos) {
                        // Crear nuevo color
                        const nuevoColor = await ColorProcesoReferenciaPedido.create({
                            proceso: nuevoProceso.id,
                            color: colorData.color,
                            cantidad: colorData.cantidad,
                            // ... otras propiedades de ColorProcesoReferenciaPedido
                        });

                        // Crear las tallas en color en proceso
                        for (const tallaData of colorData.TallaEnColorEnProcesoEnReferenciaEnPedidos
                            ) {
                            await TallaColorProcesoReferenciaPedido.create({
                                color: nuevoColor.id,
                                talla: tallaData.talla,
                                cantidad: tallaData.cantidad,
                                // ... otras propiedades de TallaColorProcesoReferenciaPedido
                            });
                        }
                    }
                }
            }
        }

        // Devolver una respuesta si todo fue exitoso
        res.json({
            success: true,
            message: 'Pedido completo actualizado exitosamente.',
        });
    } catch (error) {
        console.error(error);
        next({ success: false, error: 'Ocurrió un error al actualizar el pedido completo' });
    }
};

const deletePedidoCompleto = async (req, res = response) => {
    const { id } = req.params;

    try {
        // Buscar el pedido por su ID con todas las relaciones
        const pedido = await Pedido.findByPk(id, {
            include: [
                {
                    model: ReferenciaEnPedido,
                    include: [
                        {
                            model: ProcesoReferenciaPedido,
                            include: [
                                {
                                    model: ColorProcesoReferenciaPedido,
                                    include: [
                                        {
                                            model: TallaColorProcesoReferenciaPedido,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        });

        if (!pedido) {
            return res.status(404).json({ success: false, error: 'Pedido no encontrado.' });
        }

        // Eliminar todas las tallas relacionadas
        for (const referencia of pedido.ReferenciaEnPedidos) {
            for (const proceso of referencia.ProcesoEnReferenciaEnPedidos) {
                for (const color of proceso.ColorEnProcesoEnReferenciaEnPedidos) {
                    await TallaColorProcesoReferenciaPedido.destroy({
                        where: { id: color.id },
                    });
                }
            }
        }

        // Eliminar todas las relaciones
        await ReferenciaEnPedido.destroy({
            where: { id: pedido.id },
        });

        // Eliminar el pedido
        await Pedido.destroy({
            where: { id: pedido.id },
        });

        res.json({
            success: true,
            message: 'Pedido y sus relaciones eliminados exitosamente.',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al eliminar el pedido y sus relaciones.',
        });
    }
};

module.exports = {
    getAllPedidosConRelaciones,
    getPedidoConRelacionesPorId,
    postPedidoCompleto,
    putPedidoCompleto,
    deletePedidoCompleto
}
