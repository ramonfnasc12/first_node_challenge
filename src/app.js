const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const  {title,url,techs } = request.body;

    const rep = {
      title,
      url,
      techs,
      id:uuid(),
      likes:0
    }

    repositories.push(rep);

    response.json(rep);
});

app.put("/repositories/:id", (request, response) => {
  const  {title,url,techs } = request.body;
  const {id} = request.params;

  const repIndex = repositories.findIndex(rep=>rep.id===id);
  if(repIndex < 0){
    return response.status(400).json({error:"Repository not found"});
  }

  repositories[repIndex]={
    ...repositories[repIndex],
    title,
    url,
    techs
  };

  return response.json(repositories[repIndex])
});

app.delete("/repositories/:id", (req, res) => {
  const {id} = req.params;

  const repIndex = repositories.findIndex(rep=>rep.id===id);
  if(repIndex < 0){
    return res.status(400).json({error:"Repository not found"});
  }

  repositories.splice(repIndex,1);

  return res.status(204).json();

});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repIndex = repositories.findIndex(rep=>rep.id===id);
  if(repIndex < 0){
    return response.status(400).json({error:"Repository not found"});
  }

  repositories[repIndex].likes ++;

  return response.json(repositories[repIndex])

});

module.exports = app;
