// ponto de declaração das API´s

const express = require('express');
const cors    = require('cors');
const helmet  = require('helmet');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// fazemos uma entrada para ver se o servidor está no AR
app.get('/health', (req, res) => { 
    res.json(
        { 
            status: 'ok',
            timestamp: new Date().toISOString()
        }
    );
});

// Criar a api para realizar o calculo
// POST /api/calcular
app.post('/api/calcular', (req, res) => {
    try {
      const { calcularArea } = require('./funcao');
      const dados = req.body;

      if (!dados || typeof dados !== 'object'){
        return res.status(400).json({error: 'Corpo da requisicao errado'});
      }

      const {altura = 0, largura = 0,} = dados;
      const resultado = calcularArea(altura, largura);
      return res.status(200).json({ success: true, data: resultado });
    } catch(err){
        return res.status(400).json({ success: false, error: err.message });
    }
});


module.exports = app;
