import Cliente from '../module/cliente.js';

export async function obtenerClientes(req, res) {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json('Problemas al obtener los clientes');
    }
}
 
export async function crearCliente(req, res) {
    try {
        const { nombre, apellido, email, tipo_documento, documento, telefono, direccion, id_estado, contraseña, observacion } = req.body;
        
        // Asegúrate de que `Cliente` está importado correctamente
        const nuevoCliente = await Cliente.create({
            nombre,
            apellido,
            email,
            tipo_documento,
            documento,
            telefono,
            direccion,
            id_estado,
            contraseña,
            observacion,
        });

        res.json({ mensaje: 'Cliente creado', cliente: nuevoCliente });
    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({ error: error.message });
    }
}

export async function actualizarCliente(req, res) {
    try {
        const id = req.params.id;
        const { nombre, apellido, email, tipo_documento, documento, telefono, direccion, id_estado, contraseña, observacion } = req.body;
        const [actualizado] = await Cliente.update({
            nombre,
            apellido,
            email,
            tipo_documento,
            documento,
            telefono,
            direccion,
            id_estado,
            contraseña,
            observacion,
        }, {
            where: { id },
        });
        if (actualizado) {
            res.json('Actualización exitosa');
        } else {
            res.status(404).json('Cliente no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Problemas con la actualización');
    }
}

export async function eliminarCliente(req, res) {
    try {
        const id = req.params.id;
        const eliminado = await Cliente.destroy({
            where: { id },
        });
        if (eliminado) {
            res.json('Cliente eliminado');
        } else {
            res.status(404).json('Cliente no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Problemas al eliminar');
    }
}

export async function asignarEstado(req, res) {
    try {
        const { id_cliente, id_estado } = req.body;
        const cliente = await Cliente.findByPk(id_cliente);
        if (cliente) {
            cliente.id_estado = id_estado;
            await cliente.save();
            res.json({ message: 'Estado asignado', cliente });
        } else {
            res.status(404).json('Cliente no encontrado');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Problema al asignar estado');
    }
}  