---
sidebar: false
---

# Get Started

::: tip 快速起步
一分钟了解NewBanker Front-End套路，三分钟快速上手开发
:::


## 环境

前端dev环境大多基于`NodeJs`来实现，所以第一步要先安装适当的版本

通常情况下：
```json
"engines": {
  "node": ">= 6.0.0",
  "npm": ">= 3.0.0"
}
```

2018年开始，新的系统陆续更新到支持`>=v8.0`版本，同时npm要更新到`>=5.0`版本：
```json
"engines": {
  "node": ">= 8.0.0",
  "npm": ">= 5.0.0"
}
```

建议更新到 `>=v8.0` 以上版本

`推荐使用nvm来安装NodeJs环境`

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

# 用nvm安装>=v6.x版本nodejs(但推荐安装>=v8.x版本)
$ nvm install v8

# 设置v8为默认版本
$ nvm alias default v8
```


## 安装nbnpm

nbnpm即NewBanker npm client ，本质就是[npm](https://www.npmjs.com/)，只是在npm的基础上设置了私有镜像，对客户端工具封装一层我们自己的代理逻辑，用法和npm一样，好处是可以发布公司私有的依赖包。

```bash
# 同时我们依托淘宝镜像来加速非私有包

$ npm install nbnpm -g --registry=https://registry.npm.taobao.org
```

执行完以上命令以后，在终端输入`nbnpm -v` 如果能出现版本号提示，表明nbnpm安装成功，之后就可以用nbnpm替代npm来安装依赖包了。


## 安装nb-cli

`nb-cli`提供了一个命令行初始化系统模板的接口，可快速进入业务开发，不需要关心底层实现。

```bash
# Install
$ nbnpm i -g nb-cli

# Usage
$ nb init <template-name> <project-name>

# 比如要初始化一个vue-standard类型的模板项目到本地的demo目录
$ nb init vue-standard demo
```


## 通过安装脚本安装

我们提供了一个安装脚本，可以快速的安装以上所有基础工具，在命令行运行以下命令即可：

```bash
$ curl -o- -L https://fe.newbanker.cn/install.sh | bash
```


## 运行一个测试项目

```bash
# 初始化项目
$ nbnpm init vue-standard demo

# 安装依赖
$ cd demo && nbnpm install

# start dev server
$ nbnpm run dev
```

接下来就可访问控制台提示的地址来查看系统了，通常默认地址是 `http://localhost:8080`


## 编辑器

推荐大家用以下编辑器

* [Atom](https://atom.io/) Github官方出品，轻量、简约、强大（推荐）

* [Brackets](http://brackets.io/) Adobe出品，简约、优雅、快捷(专为前端而生)

* [VS Code](https://code.visualstudio.com/) 微软出品，对TS天生支持友好，功能超级强大(强烈推荐，插件齐全而优秀)
