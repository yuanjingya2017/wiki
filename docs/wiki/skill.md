## 常用文档编写技巧

::: tip Tips
Wiki文档内容主要采用`markdown`语言来编写，系统本身能很友好的进行解析和渲染。结合系统提供的一些hook，以及 [`YAML`](https://jekyllrb.com/docs/frontmatter/) 可以很方便的写出一篇具备良好显示效果的文档。
:::


## 定义页面标题

```yaml
---
title: Blogging Like a Hacker
lang: zh-CN
---
```
`title` 和 `lang` 会自动设置到当前页面

## 定制meta信息

另外也可以指定额外的 `meta` 标签进行注入

```yaml
---
meta:
  - name: description
    content: description-here
  - name: keywords
    content: keywords-here
---
```

## 设置当前页面侧边栏

```yaml
---
# 连个值可选：auto / false
sidebar: auto
---
```

`auto` 会自动设置当前页的侧边栏（会覆盖config中设置的全局侧边栏），`false` 会强制关闭当前页的侧边栏


## 上一页/下一页链接

```yaml
---
# false表示禁用掉
prev: ./prev-page-link
next: false
---
```

## 编辑链接

会在每个页面的底部显示「编辑此页面」的链接，跳转到对应repo的文件上
```js
// config/default.js
module.exports = {
  themeConfig: {
    // 假定 GitHub或GitLab完整地址（是repo页面地址，不是repo的clone地址）
    repo: 'https://gitlab.newbanker.cn/nbfe/wiki',
    // 如果你的文档不在仓库的根部，可以设置该项
    docsDir: 'docs',
    // 默认为 master
    docsBranch: 'master',
    // 启用或禁用编辑链接
    editLinks: true
  }
}
```

## 代码块某行高亮

````js
// 以下代码表示第4行高亮显示
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## 自定义容器

通过固定语法，可以很方便的定义一个着色的block
```
# 目前有 tip/warning/danger 三种
# 类型后边可以跟上自定义的标题

::: tip title-here
This is a tip
:::
```

::: tip
This is a tip
:::

::: warning Custome Tips Title
This is a warning
:::

::: danger
This is a dangerous warning
:::


## 表格


```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


## 链接

如果是markdown本身的语法添加的连接，如 `[连接文本](/docs/guide.html)` ，系统会自动根据基路径`base`来做处理，build之后就会变成`{base}/docs/guide.html`。

但如果是在markdown中写html语法的超链接，就需要用到系统内置的 `$withBase` 方法：

```html
<ul>
  <li>
    <a :href="$withBase(`/docs/guide.html`)">文档编写技巧</a>
  </li>
</ul>

<!--
build之后就会变成`{base}/docs/guide.html`
-->
```

扩展名 `.html` 也需要加上


## Emoji :smile:

```
:tada: :smile:
```

一些常用的：

| name          | display         | name            | display       | name            | display       | name            | display       |
| :-------------: |:-------------:| :-------------: |:-------------:| :-------------: |:-------------:| :-------------: |:-------------:|
| smile         | :smile:         | sob             | :sob:         | joy             | :joy:         | fearful         | :fearful:     |
| worried       | :worried:       | sweat_smile     | :sweat_smile: | blush           | :blush:       | innocent        | :innocent:    |
| sunglasses    | :sunglasses:    | heart_eyes      | :heart_eyes:  | scream          | :scream:      | ghost           | :ghost:       |
| fire          | :fire:          | clap            | :clap:        | bomb            | :bomb:        | gun             | :gun:         |
| car           | :car:           | fire_engine     | :fire_engine: | airplane        | :airplane:    | ship            | :ship:        |
| cn            | :cn:            | us              | :us:          | uk              | :uk:          | canada          | :canada:      |

更多Emoji请参考[这里](https://emojipedia.org/)

## 目录

通过 `[[toc]]` 可创建当前页面目录信息
```
[[toc]]
```

[[toc]]
