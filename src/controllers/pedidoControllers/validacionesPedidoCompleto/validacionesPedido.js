const { response } = require('express')
const Cliente = require('../../../models/clienteModel/clienteModel')
const Pedido = require('../../../models/pedidoModel/pedidoModel')

const validarPedido = async (body, res = response) => {

    try {
        if (!body.cliente) {
            return res.status(400).json({ error: 'El campo cliente es obligatorio.' });
        } else {
            const cliente = await Cliente.findByPk(body.cliente);
            if (!cliente) {
                return res.status(400).json({ error: 'El cliente especificado no existe.' });
            }
        }

        if (!body.ordenTrabajo) {
            return res.status(400).json({ error: 'El campo ordenTrabajo es obligatorio.' });
        } else {
            const existingPedido = await Pedido.findOne({ where: { ordenTrabajo: body.ordenTrabajo } });
            if (existingPedido) {
                return res.status(400).json({ error: 'La orden de trabajo ya existe.' });
            }

            if (!/^\d{1,10}$/.test(body.ordenTrabajo)) {
                return res.status(400).json({ error: 'Orden de trabajo no válido. Solo se permiten números, máximo 10 dígitos.' });
            }

            const ordenTrabajoNumber = parseInt(body.ordenTrabajo, 10);
            if (isNaN(ordenTrabajoNumber) || ordenTrabajoNumber <= 0) {
                return res.status(400).json({ error: 'Orden de trabajo no válido. Debe ser un número mayor a 0.' });
            }
        }


        if (!body.fechaOrdenTrabajo) {
            return res.status(400).json({ error: 'El campo fechaOrdenTrabajo es obligatorio.' });
        } else if (isNaN(Date.parse(body.fechaOrdenTrabajo))) {
            return res.status(400).json({ error: 'Fecha de orden de trabajo no válida. Formato de fecha incorrecto.' });
        }
        if (body.fechaOrdenTrabajo > body.fechaEntregaOrden || body.fechaOrdenTrabajo > body.fechaRegistro) {
            return res.status(400).json({ error: 'La fecha de orden de trabajo no puede ser mayor que la fecha de entrega o la fecha de registro.' });
        }

        if (!body.fechaEntregaOrden) {
            return res.status(400).json({ error: 'El campo fechaEntregaOrden es obligatorio.' });
        } else if (isNaN(Date.parse(body.fechaEntregaOrden))) {
            return res.status(400).json({ error: 'Fecha de entrega de orden no válida. Formato de fecha incorrecto.' });
        }
        if (body.fechaEntregaOrden < body.fechaOrdenTrabajo || body.fechaEntregaOrden < body.fechaRegistro) {
            return res.status(400).json({ error: 'La fecha de entrega de orden no puede ser menor que la fecha de orden de trabajo o la fecha de registro.' });
        }

        if (!body.formaPago) {
            return res.status(400).json({ error: 'El campo formaPago es obligatorio.' });
        } else if (!['Contado', 'Crédito'].includes(body.formaPago)) {
            return res.status(400).json({ error: 'Forma de pago no válida. Solo se permite "Contado" o "Crédito".' });
        }

        if (!body.valorTotal) {
            return res.status(400).json({ error: 'El campo valorTotal es obligatorio.' });
        } else if (isNaN(body.valorTotal) || body.valorTotal <= 0) {
            return res.status(400).json({ error: 'Valor total no válido. Debe ser un número mayor a 0.' });
        }

        if (!body.referenciaEnPedido || body.referenciaEnPedido.length === 0) {
            return res.status(400).json({ error: 'Debe ingresar al menos una referencia en el pedido.' });
        }

        const nombresReferenciasUtilizados = new Set();

        for (const referenciaData of body.referenciaEnPedido || []) {

            const nombreReferencia = referenciaData.referencia;

            if (nombresReferenciasUtilizados.has(nombreReferencia)) {
                return res.status(400).json({ error: `No se puede agregar la referencia "${nombreReferencia}" más de una vez en el mismo pedido.` });
            }

            nombresReferenciasUtilizados.add(nombreReferencia);
                    

            if (!referenciaData.referencia) {
                return res.status(400).json({ error: 'El campo referencia es obligatorio.' });
            } else if (!/^\d{1,10}$/.test(referenciaData.referencia)) {
                return res.status(400).json({ error: 'Referencia no válida. Solo se permiten números, mínimo 1 y máximo 10 dígitos.' });
            } else {
                const referenciaNumber = parseInt(referenciaData.referencia, 10);
                if (isNaN(referenciaNumber) || referenciaNumber <= 0) {
                    return res.status(400).json({ error: 'Referencia no válida. Debe ser un número mayor a 0.' });
                }
            }

            if (!referenciaData.descripcion) {
                return res.status(400).json({ error: 'El campo descripcion es obligatorio.' });
            }

            if (!referenciaData.valorUnitario) {
                return res.status(400).json({ error: 'El campo valorUnitario es obligatorio.' });
            } else if (isNaN(referenciaData.valorUnitario) || referenciaData.valorUnitario <= 0) {
                return res.status(400).json({ error: 'Valor unitario no válido. Debe ser un número mayor a 0.' });
            }

            if (!referenciaData.cantidadTotal) {
                return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
            } else if (isNaN(referenciaData.cantidadTotal) || referenciaData.cantidadTotal <= 0) {
                return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
            }

            if (!referenciaData.procesoEnReferencia || referenciaData.procesoEnReferencia.length === 0) {
                return res.status(400).json({ error: `Debe ingresar al menos un proceso en la referencia "${nombreReferencia}".` });
            }

            const nombresProcesosUtilizados = new Set();

            for (const procesoData of referenciaData.procesoEnReferencia || []) {

                const nombreProceso = procesoData.proceso;

                if (nombresProcesosUtilizados.has(nombreProceso)) {
                    return res.status(400).json({ error: `No se puede agregar el proceso"${nombreProceso}" más de una vez en la misma referencia.` });
                }

                nombresProcesosUtilizados.add(nombreProceso);

                if (!procesoData.proceso) {
                    return res.status(400).json({ error: 'El campo proceso es obligatorio.' });
                }

                if (!procesoData.tipoDeMaquina) {
                    return res.status(400).json({ error: 'El campo tipoDeMaquina es obligatorio.' });
                } else if (!['Fileteadora', 'Plana', 'Presilladora', 'Recubridora', 'Manual'].includes(procesoData.tipoDeMaquina)) {
                    return res.status(400).json({ error: 'Tipo de máquina no válido. Debe ser uno de los siguientes valores: Fileteadora, Plana, Presilladora, Recubridora, Manual.' });
                }

                if (!procesoData.cantidadTotal) {
                    return res.status(400).json({ error: 'El campo cantidadTotal es obligatorio.' });
                } else if (parseInt(procesoData.cantidadTotal) <= 0) {
                    return res.status(400).json({ error: 'Cantidad total no válida. Debe ser un número mayor a 0.' });
                }

                if (!procesoData.colorEnProceso || procesoData.colorEnProceso.length === 0) {
                    return res.status(400).json({ error: `Debe ingresar al menos un color en el proceso "${nombreProceso}".` });
                }

                const nombresColoresUtilizados = new Set();

                for (const colorData of procesoData.colorEnProceso || []) {

                    const nombreColor = colorData.color;

                    if (nombresColoresUtilizados.has(nombreColor)) {
                        return res.status(400).json({ error: `No se puede agregar el color"${nombreColor}" más de una vez en el mismo proceso.` });
                    }

                    nombresColoresUtilizados.add(nombreColor);


                    if (!colorData.color) {
                        return res.status(400).json({ error: 'El campo color es obligatorio.' });
                    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+/.test(colorData.color)) {
                        return res.status(400).json({ error: 'Color no válido. Solo se permiten letras y tildes.' });
                    }

                    // Agregar validación para el campo "cantidad"
                    if (!colorData.cantidad) {
                        return res.status(400).json({ error: 'El campo cantidad es obligatorio.' });
                    } else if (isNaN(colorData.cantidad) || colorData.cantidad < 1 || !/^\d+$/.test(colorData.cantidad)) {
                        return res.status(400).json({ error: 'Cantidad no válida. Solo se permiten números.' });
                    }

                    if (!colorData.tallaEnColorEnProceso || colorData.tallaEnColorEnProceso.length === 0) {
                        return res.status(400).json({ error: `Debe ingresar al menos una talla en el color "${nombreColor}".` });
                    }

                    const nombresTallasUtilizados = new Set();                    

                    for (const tallaData of colorData.tallaEnColorEnProceso || []) {

                        const nombreTalla = tallaData.talla;

                        if (nombresTallasUtilizados.has(nombreTalla)) {
                            return res.status(400).json({ error: `No se puede agregar la talla"${nombreTalla}" más de una vez en el mismo color.` });
                        }

                        nombresTallasUtilizados.add(nombreTalla);

                        if (!tallaData.talla) {
                            return res.status(400).json({ success: false, error: 'El campo talla es obligatorio.' });
                        } else if (!/^(S|M|L|XL)$/.test(tallaData.talla)) {
                            return res.status(400).json({ success: false, error: 'Talla no válida. Debe ser S, M, L o XL.' });
                        }

                        if (!tallaData.cantidad) {
                            return res.status(400).json({ success: false, error: 'El campo cantidad es obligatorio.' });
                        } else if (isNaN(tallaData.cantidad) || tallaData.cantidad <= 0 || !/^\d+$/.test(tallaData.cantidad)) {
                            return res.status(400).json({ success: false, error: 'Cantidad no válida. Solo se permiten números mayores que 0.' });
                        }
                    }
                }
            }
        }
        return {success:true, error:null};

    } catch (error) {
        console.error(error);
        // Si hay un error, devuelve un objeto con el mensaje de error
        return { success: false, error: 'Ocurrió un error en la validación del pedido' };        
    }

}

module.exports = {
    validarPedido,
} 
