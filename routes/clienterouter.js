import { Router } from 'express';
import { obtenerClientes, crearCliente, actualizarCliente, eliminarCliente, asignarEstado } from '../controller/clientecontroller.js';

const routerCliente = Router();

routerCliente.get('/', obtenerClientes);
routerCliente.post('/', crearCliente);
routerCliente.patch('/asignar', asignarEstado);
routerCliente.put('/:id', actualizarCliente);
routerCliente.delete('/:id', eliminarCliente);

export default routerCliente;