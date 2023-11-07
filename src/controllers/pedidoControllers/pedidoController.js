const { response } = require('express');
const Pedido = require('../../models/pedidoModel/pedidoModel');
const Cliente = require('../../models/clienteModel/clienteModel');

const getPedidos = async (req, res = response) => {
    try {
        const listPedidos = await Pedido.findAll();
        res.json({ listPedidos });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener los pedidos',
        });
    }
}

const getPedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);

        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al obtener el pedido',
        });
    }
}

const postPedido = async (req, res = response) => {
    try {
        const { body } = req;

        // Validaciones para cada atributo con mensajes de error personalizados
        if (!body.cliente) {
            return res.status(400).json({ error: 'El campo cliente es obligatorio.' });
        } else {
            const cliente = await Cliente.findByPk(body.cliente);
            if (!cliente) {
                return res.status(400).json({ error: 'El cliente especificado no existe.' });
            }
        }

        if (!body.contacto) {
            return res.status(400).json({ error: 'El campo contacto es obligatorio.' });
        } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.contacto)) {
            return res.status(400).json({ error: 'Contacto no válido. Solo se permiten letras, tildes y puntos.' });
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

        if (body.estado === null) {
            return res.status(400).json({ error: 'El campo estado no puede ser nulo. Debe ser uno de los siguientes valores: "Registrado", "En proceso" o "Terminado".' });
          }
          
          if (!['Registrado', 'En proceso', 'Terminado'].includes(body.estado)) {
            return res.status(400).json({ error: 'Valor no válido para el campo estado. Debe ser "Registrado", "En proceso" o "Terminado".' });
          }
          

        await Pedido.create(body);

        res.status(201).json({
            success: true,
            message: 'El pedido fue agregado con éxito',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al agregar el pedido',
        });
    }
}

const putPedido = async (req, res = response) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);

        if (pedido) {
            // Validaciones para cada atributo con mensajes de error personalizados
            if (!body.cliente) {
                return res.status(400).json({ error: 'El campo cliente es obligatorio.' });
            } else {
                const cliente = await Cliente.findByPk(body.cliente);
                if (!cliente) {
                    return res.status(400).json({ error: 'El cliente especificado no existe.' });
                }
            }
    
            if (!body.contacto) {
                return res.status(400).json({ error: 'El campo contacto es obligatorio.' });
            } else if (!/^[A-Za-záéíóúüÜÁÉÍÓÑñ. ]+$/.test(body.contacto)) {
                return res.status(400).json({ error: 'Contacto no válido. Solo se permiten letras, tildes y puntos.' });
            }
    
            if (!body.ordenTrabajo) {
                return res.status(400).json({ error: 'El campo ordenTrabajo es obligatorio.' });
            } else {                
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
    
            if (body.estado === null) {
                return res.status(400).json({ error: 'El campo estado no puede ser nulo. Debe ser uno de los siguientes valores: "Registrado", "En proceso" o "Terminado".' });
              }
              
              if (!['Registrado', 'En proceso', 'Terminado'].includes(body.estado)) {
                return res.status(400).json({ error: 'Valor no válido para el campo estado. Debe ser "Registrado", "En proceso" o "Terminado".' });
              }
              

            await pedido.update(body);
            res.json({
                success: true,
                message: 'El pedido fue actualizado correctamente.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al actualizar el pedido',
        });
    }
}

const deletePedido = async (req, res = response) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);

        if (pedido) {
            await pedido.destroy();
            res.json({
                success: true,
                message: 'El pedido fue eliminado con éxito.',
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No existe un pedido con el id ${id}`,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Ocurrió un error al eliminar el pedido',
        });
    }
}

module.exports = {
    getPedido,
    getPedidos,
    postPedido,
    putPedido,
    deletePedido,
};
