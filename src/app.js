import express from 'express';
import { router as productsRouter} from './routes/products.router.js';

const PORT=8080;

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/products',productsRouter);

app.get('/',(req,res)=>{
    res.setHeader('Content-Type','text/plain');
    res.status(200).send('Bienvenido POP');
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});