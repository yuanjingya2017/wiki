## 高级用法


## page

每个页面都会有一个 `page` class，可通过编写css代码来统一控制页面样式

```html
<div class="page">
  <!-- page content -->
</div>
```


## pageClass

可以用`YAML`语法给某个页面添加 page class，方便对某个页面做特殊的样式处理

```yaml
---
pageClass: nb-home-page
---
```

然后就可以在页面里写css样式了

```css
.nb-home-page {
  /* page styles */
}
```


## SpecialLayout

可以用`YAML`语法给某个页面设置特殊的layout布局

```yaml
---
layout: SpecialLayout
---
```

这将为给定页面渲染 `.vuepress/components/SpecialLayout.vue`


## 扩展主题

两种方式：
  1. 执行 `nbnpm run eject` 命令来导出当前默认主题到 `.vuepress/theme/` 目录，然后修改对应文件。

  2. 采用依赖包的方式来配置新的主题

采用依赖包的方式需要在 `config` 中配置 `theme` 项来定义新的主题

```js
module.exports = {
  theme: 'theme-name-here'
}
```

而依赖包则需要你在我们的gitlab.newbanker.cn上 `theme` 组中创建一个名为 `nb-sdb-theme-{theme-name-here}` 的repo，这样系统会去尝试定位并使用 `node_modules/nb-sdb-theme-{theme-name-here}/Layout.vue`

<br />

> 如果想完全自定义主题，可在 `.vuepress` 目录中新建 `theme` 目录，然后自行编写相应的组件和样式。


<br />

更加详细的主题定制方式，请参考VuePress [官方文档](https://vuepress.vuejs.org/)
