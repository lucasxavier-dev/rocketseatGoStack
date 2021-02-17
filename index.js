 const { response } = require('express');
const express = require('express');
const { uuid, isUuid } = require('uuidv4'); //id único universal

const app = express();

app.use(express.json()); // serve p/ o express fazer a leitura de arquivos json



//-----
//Middleware - funciona como o jogo do telefone sem fío. Onde tem uma pessoa que pode mudar completamente o rumo da brincadeira passando uma informação diferente da inicial.
    //para que algum trecho de código seja disparado automaticamente em uma requisição de código 

    //Middleware = request, response
     
const projects = []; //armazenando informações dentro da variável projects

     //mostra quais rotas e métodos estão sendo aplicados em uma requisição.
function logRequests(req, res, next) {
    const { method, url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next(); //Próximo middleware

    console.timeEnd(logLabel);
}
        //validate
function validateProjectId(req, res, next) {
    const { id } = req.params;//vem através                            

    if (!isUuid(id)) {
        return res.status(400).json({ error: 'Invalid project ID.'});
    }

    return next();
}

app.use(logRequests);

app.use('/projects/:id', validateProjectId);




    //filter --------------------------------

app.get('/projects', (req, res) => {
    const { title } = req.query; //destruturação em duas variáveis.
    // console.log(title);
    // console.log(owner);
    
    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return res.json(results);
});




//-----

app.post('/projects', (req, res) => {
    const {title, owner} = req.body;

    const project = { id: uuid(), title, owner };
    
    projects.push(project);
 
     return res.json(project);
    // console.log(title);
    // console.log(owner);

    // return res.json([
    //     'Project for',
    //     'Project two',
    // ]);
});


//----- rota de updates, onde é possível fazer alterações.


//http://localhost:3333/projects/
app.put('/projects/:id',  validateProjectId, (req, res) => {
    const { id } = req.params;
    const {title, owner} = req.body;
    
    const projectIndex = projects.findIndex(project => project.id == id);

        if (projectIndex < 0) {
            return res.status(400).json({ error: 'Project not found.'})
        }
        
    const project = {
    id,
    title, 
    owner, 
    }

    projects[projectIndex] = project;

    return res.json(project);

});
//----- Delete routes --------------------------------


app.delete('/projects/:id', validateProjectId, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if (projectIndex < 0) {
        return res.status(400).json({ error: 'Project not found'})
    }
   
    projects.splice(projectIndex, 1);
    
    return res.status(204).send();
});

app.listen(3333, () => {
    console.log('Back-end started!')
});