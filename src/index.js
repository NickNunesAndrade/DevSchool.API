import db from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/matricula', async (req, resp) => {
    try {
        let ler = await db.tb_matricula.findAll({order: [["id_matricula", "desc"]]});
        resp.send(ler);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
});

app.post('/matricula', async (req, resp) => {
    try {
        let {nome, chamada, curso, turma} = req.body;

        let criar = await db.tb_matricula.create({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        });

        resp.send(criar);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.put('/matricula/:id', async (req, resp) => {
    try {
        let id = req.params.id;
        let {nome, chamada, curso, turma} = req.body;
        
        let editar = await db.tb_matricula.update({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        },
        {
            where: {id_matricula: id}
        });
        resp.sendStatus(200);
        
    } catch (e) {
        resp.send({erro: e.toString()});
    }
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
