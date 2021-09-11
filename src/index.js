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
        resp.send(e.toString());
    }
});

app.post('/matricula', async (req, resp) => {
    try {
        let nome = req.body.nome;
        let chamada = Number(req.body.chamada);
        let curso = req.body.curso;
        let turma = req.body.turma;
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
        let nome = req.body.nome;
        let chamada = Number(req.body.chamada);
        let curso = req.body.curso;
        let turma = req.body.turma;
        let editar = await db.tb_matricula.update({
            nm_aluno: nome,
            nr_chamada: chamada,
            nm_curso: curso,
            nm_turma: turma
        },
        {
            where: {id_matricula: id}
        });
        if(nome == "" || nome == null) {
            resp.send("Campo nome e obrigatorio para fazer sua alteracao!!");
        } else if (chamada == "" || chamada == null) {
            resp.send("Campo chamada e obrigatorio para fazer sua alteracao!!");
        } else if (curso == "" ||curso == null) {
            resp.send("Campo curso e obrigatorio para fazer sua alteracao!!");
        } else if (turma == "" || turma == null) {
            resp.send("Campo turma e obrigatorio para fazer sua alteracao!!")
        } else {
            resp.sendStatus(200);
        }
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
