import { DataTypes } from 'sequelize';
import { sequelize } from '../database/config.js';

const Cliente = sequelize.define(
    'Cliente',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellido: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        tipo_documento: {
            type: DataTypes.ENUM('cc', 'tarjeta_identidad', 'pasaporte'),
            defaultValue: 'cc',
        },
        documento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 11],
            },
        },
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10],
            },
        },
        direccion: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fecha_registro: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW, 
        }, 
        id_estado: {
            type: DataTypes.ENUM('Activo', 'Inactivo'),
            defaultValue: 'Activo',
        },
        contraseña: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        observacion: {
            type: DataTypes.TEXT,
        },
    },
    {
        tableName: 'clientes', // Forzar el nombre exacto de la tabla
        timestamps: true,
        underscored: true, // Convierte camelCase a snake_case en BD
    }
); 

// Sincronizar modelo con la base de datos (opcional para desarrollo)
(async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log(' Tabla Cliente sincronizada con éxito');
    } catch (error) {
        console.error(' Error al sincronizar la tabla Cliente:', error);
    }
})();

export default Cliente;
