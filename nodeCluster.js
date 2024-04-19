const axios = require('axios');

const numNodes = parseInt(process.argv[2]) || 1;
const basePort = parseInt(process.argv[3]) || 8081;

for (let i = 0; i < numNodes; i++) {
    const port = basePort + i;
    startNode(port);
}

function startNode(port) {
    const express = require('express');
    const app = express();

    app.get('/api/health', (req, res) => {
        res.send(`Node running on port ${port} is healthy`);
    });

    const serviceDiscoveryUrl = 'http://localhost:3000/api/register';

    const server = app.listen(port, () => {
        console.log(`Node listening on port ${port}`);
        registerNode(port);
    });

    server.on('error', err => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use`);
            process.exit(1);
        }
    });

    function registerNode(port) {
        const nodeInfo = {
            host: 'localhost',
            port: port
        };
        axios.post(serviceDiscoveryUrl, nodeInfo)
            .then(response => {
                console.log(`Node running on port ${port} registered successfully`);
            })
            .catch(error => {
                console.error(`Error registering Node running on port ${port}:`, error.message);
            });
    }
}
