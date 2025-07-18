// app/api/api.js
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Initialize the users array here
const users = []; // This line was missing and is crucial for storing user data.

app.get("/", (req, res) => {
  res.send("API da Ford está rodando 🚗✅");
});

app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname)));

app.post('/register', (req, res) => {
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


app.post('/login', (req, res) => {
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


app.get("/vehicles", (req, res) => {
  try {
    const vehicles = [
      {
        id: 1,
        vehicle: "Ranger",
        volumetotal: 145760,
        connected: 70000,
        softwareUpdates: 27550,
        img: "http://localhost:3001/img/ranger.png",
      },
      {
        id: 2,
        vehicle: "Mustang",
        volumetotal: 1500,
        connected: 500,
        softwareUpdates: 750,
        img: "http://localhost:3001/img/mustang.png",
      },
      {
        id: 3,
        vehicle: "Territory",
        volumetotal: 4560,
        connected: 4000,
        softwareUpdates: 3050,
        img: "http://localhost:3001/img/territory.png",
      },
      {
        id: 4,
        vehicle: "Bronco Sport",
        volumetotal: 7560,
        connected: 4060,
        softwareUpdates: 2050,
        img: "http://localhost:3001/img/broncoSport.png",
      },
    ];

    return res.status(200).json({ vehicles });
  } catch (error) {
    return res.status(500).json({
      message: "Falha na comunicação com o servidor!",
    });
  }
});

app.post("/vehicleData", (req, res) => {
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

app.listen(3001, () => {
  console.log("API running on http://localhost:3001/");
});