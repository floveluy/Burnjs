//app.js
import * as Koa from 'koa';
import { loader } from './loader';

const app = new Koa;



app.use(loader());

app.listen(3000, '127.0.0.1', () => {
    console.log('服务器在运行');
})
