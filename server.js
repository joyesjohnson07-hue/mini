const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend files
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>My Application</title>
        </head>
        <body>
            <h1>Welcome to My Application!</h1>
            <p>Node.js server is running successfully.</p>
        </body>
        </html>
    `);
});

// Test API route
app.get('/api/status', (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running successfully'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
