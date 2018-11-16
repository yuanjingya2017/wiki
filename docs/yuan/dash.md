# 财富查项目总结

## 在项目中使用了的新属性
1. vuex的使用。
:::tip Tips
场景说明：找机构下面的机构推荐，请求的接口每次请求回来的数据都不一样，但是我们点进去看这家公司的信息再返回的时候希望不再新请求数据，看到的还是之前的数据，而且还是之前的位置，所以就每次到这个页面的时候判断一下store是否有相应的数据，要是有就不再请求，直接渲染store里面的数据，否则再次请求。这样就实现了我们想要的效果。
:::
```javascript
import Vue from 'vue'
const RECOMMEND_LIST = 'RECOMMEND_LIST'
const state = {
  list: null
}

const mutations = {
  [RECOMMEND_LIST] (state, list) {
    state.list = list
  }
}

const actions = {
  [RECOMMEND_LIST] ({commit}, params) {
    return Vue.request({
      url: '/api/v1/data/dash/recommend',
      params: params
    })
    .then(res => {
      commit(RECOMMEND_LIST, res.param)
      return res.param
    })
  }
}

export default {
  state,
  mutations,
  actions
}
```
```javascript
async onLoad () {
  let stateRecList = this.$store.state.recommend.list
  if (stateRecList && stateRecList.length > 0) {
    stateRecList.map(item => this.list.push(item))
  } else {
    let res = await this.$store.dispatch('RECOMMEND_LIST', this.req)
    res.map(item => this.list.push(item))
  }
}
```
2. component :is 的使用
3. $router.replace的使用
4. 自定义的自动聚焦的搜索组件

selfSearch组件内
```javascript
<form data-v-caae4fb4="" action="/" class="self_search search_bar_in_search">
  <div class="van-search">
    <div class="van-cell van-field">
      <i class="van-icon van-icon-search van-cell__left-icon"></i>
      <div class="van-cell__value van-cell__value--alone">
        <div class="van-field__body">
          <input type="search" v-focus ref="input" v-model.trim="searchKey" @input="onInput" @keypress="onKeypress" :placeholder="placeholder" class="van-field__control">
          <input style="display:none"/>
          <i v-if="searchKey" class="van-icon van-icon-clear van-field_clear" @click="onCancle"></i>
        </div>
      </div>
    </div>
  </div>
</form>
```
main.js里面
```
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
[参考博客](https://blog.csdn.net/newbietao/article/details/78222917?locationNum=9&fps=1)