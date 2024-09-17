import express, { Request, Response } from "express";
import 'express-async-errors';
import cors from 'cors';
import path from 'path';

import { router } from './routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

// Tratativa de erro simples, 400 ou 500
app.use((err: Error, req: Request, res: Response) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
    })
});

app.listen(process.env.PORT || 3333, () => console.log("Servidor online na porta!", process.env.PORT || 3333))
