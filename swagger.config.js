export const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Classical Works API',
            version: '1.0.0',
            description: 'API documentation for Classical Works API',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Classics API',
            },
        ],
    },
    // Path to your API routes - adjust based on your structure
    apis: ['./src/routes/*.js', './src/server.js'],
};