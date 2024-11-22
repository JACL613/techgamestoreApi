require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const routesProductos = require('./routes/route_productos.js')
const routesCategorias = require('./routes/route_categorias.js')
const routesDespachos = require('./routes/route_despachos.js')
const routesPedidos = require('./routes/route_pedidos.js')
const routesUsuario = require('./routes/route_usuario.js')
const path = require('path');

require('./databases/connectionDb.js')

const app = express();
const PORT = 3000;



// Middleware para analizar el cuerpo de las solicitudes 
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body :headers'));
app.use(cors()) 

// Rutas
// app.use('/api/productos' , routesProductos )
// app.use('/api/categorias', routesCategorias)
// app.use('/api/despachos', routesDespachos)
// app.use('/api/pedidos', routesPedidos)
app.use('/api/usuario' , routesUsuario )
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });
app.get('/CrearPeli', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'formulario.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

let visitCount = 0;

app.get('/', (req, res) => {
    visitCount++;
    res.sendFile(path.join(__dirname, 'views', 'index.html'), {
        headers: {
            'X-Visit-Count': visitCount // Enviar el contador como header
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
