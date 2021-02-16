const express = require('express');

const app = express();

app.use(express.json()); // serve p/ o express fazer a leitura de arquivos json
//-----

 
app.get('/', (req, res) => {
    return res.json([
        'Project one',
        'Project two'
    ]);
});

//-----


app.get('/projects', (req, res) => {
    const { title, owner } = req.query; //destruturação em duas variáveis.

    console.log(title);
    console.log(owner);
    
    return res.json([
        'Project one',
        'Project two',
    ]);
});

//-----

//http://localhost:3333/projects/
app.put('/projects/:id', (req, res) => {
    const { id } = req.params;

    console.log(id);

    return res.json([
        'Project for',
        'Project two',
    ]);
})
//-----

app.post('/projects', (req, res) => {
    const {title, owner} = req.body;

    console.log(title);
    console.log(owner);

    return res.json([
        'Project for',
        'Project two',
    ]);
});

app.delete('/projects/:id', (req, res) => {
    return res.json([
        'Project two',
        'Project three'
    ]);
})

app.listen(3333, () => {
    console.log('Back-end started!');
}); 