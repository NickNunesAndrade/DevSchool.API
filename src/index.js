import db from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/matricula', async (req, resp) => {
    try {
        let ler = await db.tb_matricula.findAll();
        resp.send(ler);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.post('/matricula', async (req, resp) => {
    try {
        let aluno = {
            nm_aluno: req.body.nome,
            nr_chamada: req.body.chamada,
            nm_curso: req.body.curso,
            nm_turma: req.body.turma
        }
        let criar = await db.tb_matricula.create(aluno);
         resp.send(criar);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.put('/matricula/:id', async (req, resp) => {
    let id = req.params.id;
    let info = {
        id_matricula: id,
        nm_aluno: req.body.nome,
        nr_chamada: req.body.chamada,
        nm_curso: req.body.curso,
        nm_turma: req.body.turma
    }
    let editar = await db.tb_matricula.update({info});
    resp.sendStatus(200);
});

app.delete('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let remover = await db.tb_matricula.destroy({where: {id_matricula: id}});
        resp.sendStatus(200);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.listen(process.env.PORT, 
    x => console.log(`Subiiuu!! ${process.env.PORT}`));
