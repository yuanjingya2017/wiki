let base = process.env.NODE_ENV_BASE || '/'
const utils = require('../build/utils')

// 载入个性化配置
let wiki = utils.noCacheRequire('../config/wiki')
let yuan = utils.noCacheRequire('../config/yuan')
let xu = utils.noCacheRequire('../config/xu')
let li = utils.noCacheRequire('../config/li')
let su = utils.noCacheRequire('../config/su')

module.exports = {
  base,
  port: 6001,
  title: '四叶草 WIKI',
  description: 'siyecao study Wiki',
  // 修改dest需要同步修改package.json中的dist
  dest: 'dist',
  themeConfig: {
    nav: [
      {text: '袁靖雅', link: '/docs/yuan/guide.md'},
      {text: '许超', link: '/docs/xu/guide.md'},
      {text: '李书明', link: '/docs/li/vueChat.md'},
      {text: '苏鹤', link: '/docs/su/markdown.md'}
    ],
    sidebar: [
      '/',
      ['/docs/guide/guide', '起步'],
      // wiki相关配置
      wiki.sidebar,
      yuan.sidebar,
      xu.sidebar,
      li.sidebar,
      su.sidebar
    ],
    repo: 'https://github.com/flowSu/wiki',
    editLinks: false
  },
  style: {
    override: {
      // 链接颜色
      accentColor: '#0081ff',
      // 文字颜色
      textColor: '#2c3e50',
      // border颜色
      borderColor: '#eaecef',
      // 代码块背景色
      codeBgColor: '#282c34'
    }
  }
}
