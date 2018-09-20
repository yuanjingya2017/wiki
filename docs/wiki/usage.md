## 基本用法

::: tip 简介
基于VuePress的静态文档构建工具，在VuePress基础上添加了一些hook和底层的处理，可以很方便的作为一个模块挂载到FE的站点中，项目本身只需维护自己的repo，然后编写markdown文件即可。
:::

## Setup

```bash
# 初始化操作，安装依赖
# 系统有一部分依赖包在用npm安装会有依赖异常问题
# 暂时采用yarn来安装
$ nbnpm run bootstrap

# 启动dev server
$ nbnpm run dev

# build for production
$ nbnpm run build
```

## Usage

> 需要配置 `config/default.js` ，config部分遵循npm `config` 模块加载方式

```js
{
  // 基路径
  base: '/',
  // prod版本产出目录，修改dest需要同步修改package.json中的dist
  dest: 'dist',
  themeConfig: {
    // 顶部导航
    nav: [
      {text: 'Usage', link: '/usage'},
      {text: 'Advanced', link: '/advanced'},
      {text: 'FE', link: 'https://fe.newbanker.cn'},
    ],
    // 左侧菜单
    sidebar: [
      '/',
      ['/usage', 'Usage'],
      ['/advanced', 'Advanced']
    ]
  },
  // 全局样式
  style: {
    override: {
      // 链接颜色
      accentColor: '#0081ff', //#3eaf7c
      // 文字颜色
      textColor: '#2c3e50',
      // border颜色
      borderColor: '#eaecef',
      // 代码块背景色
      codeBgColor: '#282c34'
    }
  }
}
```

config文件夹下内置了一些模块的独立配置文件：

```yaml
rn.js:         react-native相关的配置
h5.js:         h5相关的配置
standard.js:   规范相关的配置
template.js:   模板相关的配置
tools.js:      工具相关的配置
vue.js:        vue相关的配置
fe.js:         HTML\CSS\JS相关的配置
other.js:      其他相关的配置
```

以上配置会被merge到default.js中

## 其他

`package.json` 中的 `dist` 项需要配置成 `config.dest` 中一样的值。

```json
{
  "dist": "dist"
}
```

<br />

然后在repo里直接写markdown文件就可以了

高级配置请 [参考这里](/advanced.html)

更加详细的配置可参考VuePress [官方文档](https://vuepress.vuejs.org/)
