const express  = require('express');

const app = express();

app.use(express.json());

app.post('/churras', (request, response) => {
  const params = request.body;

  console.log(params);

  return response.json({
    nome: "Teste",
    data: "20/09/2020"
  });
});

app.listen(3333);