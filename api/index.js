// api/index.js (anteriormente src/app/api/api.js)
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Initialize the users array here (this will be reset on serverless function cold starts)
const users = [];

app.get("/", (req, res) => {
  res.send("API da Ford está rodando 🚗✅");
});

app.use(cors());
app.use(express.json());

// Serve static files from the 'img' directory relative to this api/index.js file
app.use(express.static(path.join(__dirname, 'img'))); // CORRIGIDO: Aponta para a pasta 'img' dentro de 'api/'

// NEW ENDPOINT: /carousel
app.get('/api/carousel', (req, res) => {
  try {
    const carouselData = [
      {
        imagem: '/img/imagem_1.jpg', // Caminho relativo à raiz do servidor da API (agora api/)
        texto: 'Esta é a nova Ranger Ford 2022. Verifique novidades.',
        link: '/lancamento',
      },
      {
        imagem: '/img/imagem_2.jpg', // Caminho relativo à raiz do servidor da API
        texto: 'Ford: a nossa história.',
        link: '#',
      },
      {
        imagem: '/img/imagem_3.jpg', // Caminho relativo à raiz do servidor da API
        texto: 'Nova Ford Bronco Sport 2022',
        link: '/lancamento',
      },
    ];
    return res.status(200).json(carouselData);
  } catch (error) {
    return res.status(500).json({
      message: 'Falha ao buscar dados do carrossel!',
      error: String(error),
    });
  }
});


app.post('/api/register', (req, res) => {
  const { nome, senha, email } = req.body;

  if (!nome || !senha || !email) {
    return res.status(400).json({ message: 'Preencha todos os campos!' });
  }

  const userExists = users.some((u) => u.nome === nome || u.email === email);

  if (userExists) {
    return res.status(409).json({ message: 'Usuário ou e-mail já cadastrado!' });
  }

  const newUser = {
    id: users.length + 1,
    nome,
    senha,
    email,
  };

  users.push(newUser);

  return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: newUser });
});


app.post('/api/login', (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({
        message: 'O campo de usuário ou senha não foi preenchido!',
      });
    }

    const foundUser = users.find((u) => u.nome === nome && u.senha === senha);

    if (!foundUser) {
      return res.status(401).json({
        message: 'Usuário ou senha incorretos ou não registrados!',
      });
    }

    return res.status(200).json({
      id: foundUser.id,
      nome: foundUser.nome,
      email: foundUser.email,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Falha na comunicação com o servidor!',
      error: String(error),
    });
  }
});


app.get("/api/vehicles", (req, res) => {
  try {
    const vehicles = [
      {
        id: 1,
        vehicle: "Ranger",
        volumetotal: 145760,
        connected: 70000,
        softwareUpdates: 27550,
        img: "/img/ranger.png", // Caminho relativo à raiz do servidor da API
      },
      {
        id: 2,
        vehicle: "Mustang",
        volumetotal: 1500,
        connected: 500,
        softwareUpdates: 750,
        img: "/img/mustang.png", // Caminho relativo à raiz do servidor da API
      },
      {
        id: 3,
        vehicle: "Territory",
        volumetotal: 4560,
        connected: 4000,
        softwareUpdates: 3050,
        img: "/img/territory.png", // Caminho relativo à raiz do servidor da API
      },
      {
        id: 4,
        vehicle: "Bronco Sport",
        volumetotal: 7560,
        connected: 4060,
        softwareUpdates: 2050,
        img: "/img/broncoSport.png", // Caminho relativo à raiz do servidor da API
      },
    ];

    return res.status(200).json({ vehicles });
  } catch (error) {
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
});

app.post("/api/vehicleData", (req, res) => {
  try {
    const { vin } = req.body;

    switch (vin) {
      case "2FRHDUYS2Y63NHD22454":
        return res.status(200).json({
          id: 1,
          odometro: 23344,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2RFAASDY54E4HDU34874":
        return res.status(200).json({
          id: 2,
          odometro: 130000,
          nivelCombustivel: 19,
          status: "off",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22455":
        return res.status(200).json({
          id: 3,
          odometro: 50000,
          nivelCombustivel: 90,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2RFAASDY54E4HDU34875":
        return res.status(200).json({
          id: 4,
          odometro: 10000,
          nivelCombustivel: 25,
          status: "off",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22654":
        return res.status(200).json({
          id: 5,
          odometro: 23544,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      case "2FRHDUYS2Y63NHD22854":
        return res.status(200).json({
          id: 6,
          odometro: 23574,
          nivelCombustivel: 76,
          status: "on",
          lat: -12.2322,
          long: -35.2314,
        });

      default:
        return res.status(400).json({
          message: "Código VIN utilizado não foi encontrado!",
        });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
});

// app.listen(3001, () => { // REMOVIDO: Vercel gerencia a porta
//   console.log("API running on http://localhost:3001/");
// });

module.exports = app; // ADICIONADO: Exporta o app para Vercel Serverless Functions
