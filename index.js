const { response } = require('express');
const express = require('express');
const { uuid } = require('uuidv4'); //id único universal

const app = express();

app.use(express.json()); // serve p/ o express fazer a leitura de arquivos json
//-----

 
const projects = []; //armazenando informações dentro da variável projects




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
app.put('/projects/:id', (req, res) => {
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


app.delete('/projects/:id', (req, res) => {
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