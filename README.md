![](https://github.com/floveluy/Burnjs/blob/master/burnlogo.png)
# Burnjs
burnjs是系列教程[《使用Typescript封装一款装饰器风格的Web框架》](https://www.gitbook.com/book/215566435/-typescript-web/details)配套框架，全部使用Typescript编写完成。

# 快速开始
```bash
#安装脚手架
npm install -g burn-cli
#初始化项目
burn-cli -init-ts myapp
#进入目录
cd myapp
#安装依赖
npm install
```
## 项目结构介绍
====
通过我写的小工具，生成的项目目录如下

```bash
.
├── README.md  #readme文件
├── app         #app文件夹，我们的TS编译出来的就是这样的
├── nodemon.json  #nodemon的配置文件
├── package-lock.json
├── package.json  #npm包文件
├── src   #TS，工作目录
│   ├── config  #配置文件目录
│   │   ├── config.default.ts  #普通配置
│   │   ├── config.dev.ts  #开发环境配置
│   ├── controller   #控制器目录
│   │   └── index.ts   #
│   ├── service     #业务逻辑目录
│   │   └── svs.ts
│   └── start.ts   #app启动入口
└── tsconfig.json  #TS编译配置文件
```
## 快速编写一个路由
```ts
//index.ts
import { Controller, Blueprint } from 'burnjs';

export default class Index extends Controller {
    @Blueprint.get('/')
    async first() {
        this.ctx.body = 'hello burn.js'
    }
}
```

# 启动调试
```
#启动项目
npm run dev
```



# 测试
```
npm run test
```
