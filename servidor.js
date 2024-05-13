//const express = require('express');
//const bodyParser = require ('body-parser');
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import mysql from 'mysql'
const app = express();
app.use(bodyParser.json());
app.use(cors());

const puerto = 3000;

// Configuración para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'phpmyadmin'
});

conexion.connect(error => {
    if (error) {
    console.error('Error al conectar a la base de datos:', error);
    } else {
    console.log('Conexión exitosa a la base de datos');
    }
    });

    app.get('/crear-tabla', (req, res) => {
        const createTableQuery = `
        CREATE TABLE productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL,
        descripcion TEXT
        )
        `;
        
        connection.query(createTableQuery, (err, results) => {
        if (err) {
        console.error('Error al crear la tabla:', err);
        res.status(500).send('Error al crear la tabla');
        } else {
        console.log('Tabla creada exitosamente');
        res.send('Tabla creada exitosamente');
        }
        });
        });

        app.get('/productos', (req, res) => {
            const selectQuery = 'SELECT * FROM productos';
            connection.query(selectQuery, (err, results) => {
            if (err) {
            console.error('Error al seleccionar productos:', err);
            res.status(500).send('Error al seleccionar productos');
            } else {
            console.log('Productos seleccionados exitosamente');
            res.json(results);
            }
            });
            });

            app.delete('/productos/:id', (req, res) => {
                const productId = req.params.id;
                
                const deleteQuery = 'DELETE FROM productos WHERE id = ?';
                
                connection.query(deleteQuery, [productId], (err, results) => {
                if (err) {
                console.error('Error al eliminar producto:', err);
                res.status(500).send('Error al eliminar producto');
                } else {
                console.log('Producto eliminado exitosamente');
                res.send('Producto eliminado exitosamente');
                }
                });
                });


//Variable global que almacena los objetos
let datos = [
{ id:1, nombre: 'Ejemplo 1'},
{ id:2, nombre: 'Ejemplo 2'},
{ id:3, nombre: 'Ejemplo 3'},
];
//Ruta para tener todos los datos
app.get('/datos', (req, res) => {
res.json(datos);
});

app.post ('/datos', (req, res) => {
    const nuevoDato = req.body;
    nuevoDato.id = datos.length + 1;
    datos.push(nuevoDato);
    res.json(nuevoDato);
    });

app.delete('/datos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    datos = datos.filter((item) => item.id !== id);
    res.json ({ mensaje: 'Dato eliminado exitosamente' });
    });

app.listen (puerto, () => {
console.log(`Servidor Express escuchando en el puerto ${puerto}`);
});