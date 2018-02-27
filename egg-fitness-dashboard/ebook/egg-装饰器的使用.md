# typescript装饰器

装饰器是一个非常棒的语法糖，有了装饰器我们可以轻松的实现以前比较难实现，或者改进比较丑的实现。

在这里我直接拿egg+ts进行讲解，以便于我们能够运用装饰器的同时，不至于脱离实际。



# 实现一个日志打印机

我现在有一个需求:

1. A控制器里的index函数，被用户访问时会在系统里打下一行日志：“有人访问了index“
2. 除此之外，以后还可能有很多函数，需要我们去这么做。

基于这样的需求，我们快速写下代码：

```ts
//home.ts

import { Controller } from 'egg';

export default class HomeController extends Controller {

    async index() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了index()');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}
```

非常简单，我们再来多写几个函数。


```ts
//home.ts

import { Controller } from 'egg';

export default class HomeController extends Controller {

    async index() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了index()');
    }

    async book() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了book()');
    }

    async apple() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了apple()');
    }

    async pink() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了pink()');
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}

```

太简单了，产品的需求，我几秒钟，通过复制，粘贴，改吧改吧，就能上线了。


# 改变需求：要求打印时间

这下你就麻烦了，你现在得一个一个的改：

```ts
 async pink() {
        this.ctx.body = `hi, egg `;
        console.log('有人访问了pink()',Date.now());
    }
```

或许有朋友说，那我抽象成一个基类，提供一个log()方法，然后所有的controller去继承这个基类。

这么做不是不可以，维护起来也还挺方便，这是面向对象的做法，今天我们就可以使用装饰器去实现，这么做，有点**面向切面**的编程方式。


# 装饰漆版本的日志打印机

我们写一个装饰器函数

```ts
function log() {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        const originFunction: Function = descriptor.value;//被装饰的函数被保存在value中.
        descriptor.value = function () { //重写被装饰的函数
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);//执行原函数
        }
    }
}
export default class HomeController extends Controller {

    @log()
    async index() {
        this.ctx.body = `hi, egg `;
    }
}

declare module 'egg' {
    export interface IController {
        home: HomeController;
    }
}


```
分别解释一下这个函数中的一些参数：
- 首先这个函数是返回了一个函数，这个函数和返回的函数，会在运行时立刻执行
- target参数,对于静态成员来说是类的构造函数，对于实例成员是类的原型对象。
- key成员的名字，其实就是函数名字
- descriptor，成员的属性描述符

我们通过重写被装饰函数，使得**被装饰函数**延后执行，先执行我们的打印函数。

值得注意的是，当我们重写被装饰函数时，也就是这行代码：

```ts
        descriptor.value = function () { //重写被装饰的函数
            console.log(`函数${key}()被访问了`);
            originFunction.apply(this, arguments);//执行原函数
        }
```
函数内部的this就是被装饰函数的类的实例。


这个关系很绕，其实说白了就是
```ts
const home = new HomeController;
//装饰器里的this，就是这个home，也就是HomeController的实例。
```

现在需求怎么变，都可以，我们只需要做两件事情：
1. 加入一个@log()
2. 改需求的时候修改@log()

# 拓展知识，面向切面编程

使用了装饰器以后

- 最大的好处我们目前看到的就是，我们不需要去抽象出一个基类，去专门写一个log函数。
- 其次，我们的函数内部结构完全没有被改变，逻辑依旧干净整洁。

**这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。**

面向切面编程（AOP是Aspect Oriented Program的首字母缩写） ，

我们知道，面向对象的特点是继承、多态和封装。而封装就要求将功能分散到不同的对象中去，这在软件设计中往往称为职责分配。

实际上也就是说，让不同的类设计不同的方法。这样代码就分散到一个个的类中去了。这样做的好处是降低了代码的复杂程度，使类可重用。      

但是人们也发现，在分散代码的同时，也增加了代码的重复性。

什么意思呢？

比如说，我们在两个类中，可能都需要在每个方法中做日志。

按面向对象的设计方法，我们就必须在两个类的方法中都加入日志的内容。

也许他们是完全相同的，但就是因为面向对象的设计让类与类之间无法联系，而不能将这些重复的代码统一起来。  

也许有人会说，那好办啊，我们可以将这段代码写在一个独立的类独立的方法里，然后再在这两个类中调用。

但是，这样一来，这两个类跟我们上面提到的独立的类就有耦合了，它的改变会影响这两个类。

那么，有没有什么办法，能让我们在需要的时候，随意地加入代码呢？这种在运行时，动态地将代码切入到类的指定方法、指定位置上的编程思想就是面向切面的编程。

一般而言，我们管切入到指定类指定方法的代码片段称为切面，而切入到哪些类、哪些方法则叫切入点。

有了AOP，我们就可以把几个类共有的代码，抽取到一个切片中，等到需要时再切入对象中去，从而改变其原有的行为。这样看来，AOP其实只是OOP的补充而已。

OOP从横向上区分出一个个的类来，而AOP则从纵向上向对象中加入特定的代码。

有了AOP，OOP变得立体了。如果加上时间维度，AOP使OOP由原来的二维变为三维了，由平面变成立体了。

从技术上来说，AOP基本上是通过代理机制实现的。 

AOP在编程历史上可以说是里程碑式的，对OOP编程是一种十分有益的补充。