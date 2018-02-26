# egg-ts-service基本使用

service是用来做什么的，我在这里就不多说了，官方文档在这里：
[service官方文档](https://eggjs.org/zh-cn/basics/service.html)


与正常的js中的service一样，我们得把service放在service目录下

```bash
├── src
│   ├── controller
│   │   └── home.ts
│   ├── router.ts
│   └── service #service文件夹
│       └── home.ts
```

# 编写一个service.home
```ts
//service/home.ts

import { Service } from 'egg';

export default class HomeService extends Service {
    async addnumber(a: number, b: number) {
        return a + b;
    }
}

declare module 'egg' {
    export interface IService {
        home: HomeService;
    }
}
```
喜闻乐见的是，这里又双出现了```declare module 'egg'```，拓展的主角变成了```IService```

# 在controller中使用

```ts
//controller/home.ts

import { Controller } from 'egg';

export default class HomeController extends Controller {

    async index() {
        const service = this.ctx.service;
        this.ctx.body = `hi, egg , this is ${service.home.addnumber(3, 5)}`;
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}

```

当我们拓展IService后，我们就可以轻松的在ctx对象上拿到service，无需import任何东西。

至于这个怎么做的，其实也很简单，写一段伪代码来讲一讲：

```ts
const app = new egg();
app.router = new KoaRouter();//egg其实用的就是koaRouter...
app.controller = 扫描到的controller();

Object.defineProperty(app.context,'service',{
    get(){
        .....
    }

})
require('app/router.js')(app);
```

不要被```Object.defineProperty```这种api吓到，其实这么做的原因是为了能够重写service属性的get方法，其目的是为了对大量的service做缓存。

不必每次初始化context对象的时候，都会去加载一次所有的service，内部怎么做的，可以看我之前的教程：

[如何实现eggjs中的service](https://github.com/floveluy/Burnjs/blob/master/burnjs/example/books/6.service%E7%9A%84%E5%AE%9E%E7%8E%B0.md)



