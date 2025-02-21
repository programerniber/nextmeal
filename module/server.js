import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from '../database/config.js';
import routercliente from '../routes/clienterouter.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Agregamos un valor por defecto
        this.middlewares();
        this.routes();
        this.connectDatabase();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/clientes', routercliente);
    }

    async connectDatabase() {
        await connectDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(` Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;

