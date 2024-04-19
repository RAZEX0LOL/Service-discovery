const express = require('express');
const axios = require('axios');
const fs = require('fs');

const app = express();
app.use(express.json());

let nodes = [];

app.get('/api/health', (req, res) => {
    res.sendStatus(200);
});

app.post('/api/register', (req, res) => {
    const { host, port } = req.body;
    nodes.push({ host, port });
    res.send('Узел успешно зарегистрирован');
});

app.get('/api/list', (req, res) => {
    res.json(nodes);
});

function checkNodeHealth(node) {
    const { host, port } = node;
    axios.get(`http://${host}:${port}/api/health`)
        .then(response => {
            console.log(`Узел ${host}:${port} здоров`);
            updateNodeStatus(host, port, true);
        })
        .catch(error => {
            console.log(`Узел ${host}:${port} нездоров, удаляется из списка`);
            removeNode(node);
            updateNodeStatus(host, port, false);
        });
}

function removeNode(nodeToRemove) {
    nodes = nodes.filter(node => node !== nodeToRemove);
}

function updateNodeStatus(host, port, isHealthy) {
    const existingNodeIndex = nodes.findIndex(node => node.host === host && node.port === port);
    if (existingNodeIndex !== -1) {
        nodes[existingNodeIndex].isHealthy = isHealthy;
        saveDataToFile();
    }
}

function saveDataToFile() {
    fs.writeFile('data.json', JSON.stringify(nodes), err => {
        if (err) {
            console.error('Ошибка при сохранении данных в файл:', err.message);
        } else {
            console.log('Данные успешно сохранены в файл');
        }
    });
}

const healthCheckInterval = 2000;
setInterval(() => {
    console.log('Выполняются проверки состояния...');
    nodes.forEach(checkNodeHealth);
}, healthCheckInterval);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервис обнаружения служб слушает порт ${PORT}`);
});
