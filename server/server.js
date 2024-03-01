const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database.js');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 9000;

app.use(cors());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Blockchain backend API',
            version: '1.0.0',
            description: 'Blockchain API Information',
            contact: {
                name: 'Eduard'
            },
            servers: [`http://localhost:${PORT}`]
        }
    },
    apis: [
        './routes/users.routes.js',
        './routes/friendsRequests.routes.js',
        './routes/friends.routes.js',
        './routes/nft.routes.js',
        './routes/posts.routes.js'
    ]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test route
app.get('/', (_, res) => {
    res.status(200).json({ message: 'Pong', timestamp: new Date().toISOString() });
});

app.use('/users', require('./routes/users.routes'));
app.use('/friends-requests', require('./routes/friendsRequests.routes'));
app.use('/friends', require('./routes/friends.routes'));
app.use('/nft', require('./routes/nft.routes.js'));
app.use('/posts', require('./routes/posts.routes.js'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});