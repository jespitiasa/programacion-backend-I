import express from 'express';
import { engine } from 'express-handlebars';
import { router as vistasRouter } from './routes/viewsRouter.router.js';
import { router as productsRouter} from './routes/products.router.js';
import { router as cartsRouter } from './routes/carts.router.js';

const PORT=8080;

const app=express();

app.use(express.static('./src/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.engine('handlebars', engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', vistasRouter);

app.get('/',(req,res)=>{

    res.render('index', {});
})

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});