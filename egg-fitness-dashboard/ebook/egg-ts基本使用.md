# 自动编译+重启

如果每次都要我们编译，然后重启，我们的开发就会极其缓慢，幸好，我们的egg开发者们已经为我们准备好了egg-bin，我们只需要```npm run dev```就可以启动egg

然后我们只要有代码改动，egg-bin就会自动帮我们重启.

目前egg-bin支持TS代码重启的功能还处于开发阶段，为了不影响我们的开发，我们可以使用一个巧妙的方法去实现代码自动编译+重启功能。

以保证以后egg-bin升级，我们的功能一样能使用。


### 第一步
在package.json中添加

```json
"scripts": {
    "tsc:w": "tsc -p tsconfig.json -w"//这一行代码
  },
```

### 第二步：开启两个终端

第一个终端敲
```
npm run dev
```

第二个终端敲:
```
npm run tsc:w

```

随便改几行ts代码，就会看到
```bash
2018-02-27 11:53:09,007 WARN 78381 [agent:development] reload worker because /Users/zf/Desktop/burnjs/egg-fitness-dashboard/app/controller/home.js change
```
我们就能看到第一个终端中的代码自动重启了。

