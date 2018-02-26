# typescript的一些配置

要在eggjs中写ts，我们需要写一下typescript的配置


## 第一步:tsconfig.json

在根目录下，创建一个叫tsconfig.json的文件

``` json
{
  "compilerOptions": {
    "module": "commonjs", //指定生成哪个模块系统代码
    "target": "es2017", //目标代码类型
    "noImplicitAny": true, //在表达式和声明上有隐含的'any'类型时报错。
    "sourceMap": false, //用于debug   
    // "rootDir": "./build", //仅用来控制输出的目录结构--outDir。
    "outDir": "./app", //重定向输出目录。   
    "watch": false, //在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
    "noUnusedLocals": true,
    "strict": true,
    "experimentalDecorators": true //使用装饰器
  },
  "include": [
    "src/**/*", //监听的目录
  ]
}
```

## 第二步:创建一个src目录

按照egg的需要，我们创建一个controller和router

``` bash
├── src
│   ├── controller  #controller目录
│   │   └── home.ts 
│   └── router.ts #路由器

```

## 第三步：写入ts代码

```ts
//home.ts

import { Controller } from 'egg';

export default class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}
```

```ts
//router.ts
import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
};
```

## 第四步：编译typescript代码，跑起来

```
$ tsc
$ npm run dev
```
到这里，最简单的一个egg-typescript应用就此完毕


# 小范围深入理解eggjs中的加载机制

如果你对egg的加载机制想要较深入的理解，可以观看这一章节。如果没有，请跳过。

上面代码中，从上往下看，大家看到```declare module```的时候肯定会有点点懵逼：这特么是什么？IController又是什么？

## 这段代码的必要性？

我们尝试注视掉这一段代码
```ts
// declare module 'egg' {
//     export interface IController {
//         home: HomeController;
//     }
// }

```
再次进行编译，ts编译器就会报错

``` bash
src/router.ts(6,32): error TS2339: Property 'home' does not exist on type 'IController'.
```

回忆一下我们之前的router.ts

```ts
//router.ts
import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
}
```

当我们删掉上面的```declare module```后，```controller.home.index``就会在vscode中变红了，说明的是**在controller中没有home这个玩意**

因此，这段代码绝对不是废话。

## 神秘的IController

连接这一切的秘密就是IController这个类，要深入理解这个类怎么来的，我们必须要理解eggjs的加载机制。

我们刚刚开始使用eggjs的时候觉得非常的神奇，写一个controller，随便绑定一下，就能使用了，无需我们做过多的import来import去的操作。

这一点对于刚刚学会koa和router的同学来说，极其微妙，这种滋味就好像初恋时的羞涩，摸不到，看不着，但是觉得很舒服，到底是什么回事呢？

首先，我们每一个应用都有一个app实例，无论是egg还是koa，全局都只有一个。

类似的代码如下：
```ts
const app = new egg();
```

然后eggjs，拿到这个app，做一堆**初始化事情**，其中重要的一步就是**扫描我们的文件目录**

- 自动调用require()函数，获得我们定义的controller，绑定挂载到```app.controller```上
- 挂载完毕之后，又自动调用require()函数，加载router.ts中的模块，然后将app实例，传递到router中

上述两个步骤的伪代码：
```ts
const app = new egg();
app.router = new KoaRouter();//egg其实用的就是koaRouter...
app.controller = 扫描到的controller();
require('app/router.js')(app);
```

所以我们的router.js中的代码一切就明了了:
```ts
//router.ts
import { Application } from 'egg';

export default (app: Application) => {
    const { controller, router } = app;
    router.get('/', controller.home.index);
}
```

所以app.controller其实并不是我们真正的controller，而是app实例对象上的一个**属性**，也就是我们的IController类的实例。

**这个对象里拥有我们controller的一切信息**。


## declare module 'egg' 做了什么？

当我们知道了app.controller其实就是IController之后，我能更好的解释了：
```ts
declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}
```
**这段代码其实就是对app.controller这个属性进行属性拓展。**，告诉tsc编译器，app.controller对象上，拥有home: HomeController这个类对象。



