# wbs部分组件文档
::: tip Tips
主要是针对常用的wbs组件的使用记录，正常文档包括：props、slot、event、methods的说明以及部分复杂的props和event的返回数据类型说明。其中methods因为没法区分是外部还是内部调用，所以主要是用到一个注释一个。  

+ 多种类型用`/`隔开（radio/select 表示接受radio或者select）
+ `event`中的`params`用数组表示，从`0～n`表示第一个到第N个参数；有复杂的数据结构统一在`model`中表示。
::: 

## nb-detail

### props  

name       |type            |default  |备注
-----------|----------------|---------|-----------------------
width      |number/string   |80       |width = `${width}%`
url        |string          |undefined|头部头像url
title      |string          |undefined|头部文字title
header     |boolean         |true     |是否显示头部
right      |boolean         |true     |是否有右侧，配合slot: right
top-options|arrayOf(Option) |[]       |头部菜单按钮配置

### event

name     |params   |备注
---------|---------|-----------------------------------------------
clickMenu|[Option] |头部选项菜单点击事件，对应的是`props`中`top-options`

### slot

name        |备注
------------|---------------------------------------------------------------
title       |头部标题，在props里设置的title下方
tips        |头部提示
top         |头部下面的部分
right       |body部分的右侧 这个和`props`里面的`right`配套 如果显示，这部分宽度`280px`
unnamed slot|body主体部分

### model
#### Option  
```javascript
Option: {
  label, // 按钮名称
  value, // 按钮值
  icon   // 按钮图标
}
```  

## nb-table
>   
### props
name         | type                           | default | 备注
-------------|--------------------------------|---------|-----
table-headers|arrayOf(TableHeader)            |[]       |表头
table-data   |arrayOf(Object)                 |[]       |表格数据
select       |select/radio                    |undefined|单选还是多选
fixed-one    |Boolean                         |true     |第一列是否固定
header-map   |arrayOf(HeaderOpration)         |[]       |表头配置
query-model  |Object                          |undefined|查询条件数据结构，时间区间用的是数组表示
operator     |Boolean                         |undefined|是否显示操作列
show-header  |Boolean                         |true     |是否显示表头 
align        |left/center/right               |left     |表格内对齐方式
default-width|String                          |155      |表格列最小宽度，数字类型的字符串
all-field    |array                           |undefined|所有字段列表      
field        |array                           |undefined|当前显示字段
operator-text|Boolean                         |undefined|表头右侧是否显示操作文案
click-data   |array                           |[]       |右侧按钮定制数组对象
height       |String                          |undefined|
top          |Number                          |0        |
new-date     |Boolean                         |false    |
pop-disabled |Boolean                         |undefined|

### event

name           |params                           |备注
---------------|---------------------------------|-----------------------------------------------
selectionChange|selection                        |select===select的时候当选择项改变时触发，参数为已选行
selectRow      |[[row], row]                     |select===radio的时候，选项发生改变时触发，参数为已选行
clickFirst     |[row, TableHeaderItem, cellIndex]|列可点击时，点击某个字段时触发，返回当前点击行，当前点击的列的配置和列的序号
clickRight     |{row, type}                      |click-data配置的可点击项的点击事件
operator       |[]                               |操作列被点击时触发的函数
saveField      |arrayOf(Field)                   |保存可见列
resetField     |[]                               |重置可见列
change         |[]                               |当可编辑列值改变时触发
resize         |height                           |

### 调用者需要提供的方法

name           |params                      |备注
---------------|----------------------------|-----------------------------------------------
handleSearch   |[data, headerMapItem]       |搜索方法，当搜索条件改变时调用
delQueryModel  |[searchModel, headerMapItem]|删除搜索条件时调用

### model

#### TableHeaderItem

```javascript
{
  headerKey: string, // 表头对应的数据字段
  headerName: string, // 表头名
  click: boolean, // 设置该列可不可以点击，点击的回调事件是clickFirst
  ableInput: boolean, // 是否可输入
  ableSelect: boolean, // 是否可选择
  image: boolean, // 是否是图片
  type: string // 数据类型 格式：'type|fmtStr'。type支持 phone | card | date, fmtStr当类型为date的时候的日期格式串
}
```  

#### headerMapItem

```javascript
{
  headerName: string, // 表头名
  searchKey: string,  // 查询时对应的key
  headerKey: string,  // 对应字段key
  headerType: string, // 详见下面注释
  width: string,      // 
  options: [{         // 当时select或者inSelect的时候生效，可选值
    label: string,    // label
    value: any        // value
  }]
}
// headerType   : 对应的是nb-popover.vue的代码解读
// select       : select选框
// input        : 输入框
// sort         : 排序
// inSelect     : 可搜索的select选框
// date         : 日期选则
// datesort     : 带排序的日期选择
// daterange    : 日期范围
// daterangesort: 带排序的日期范围选择
// range        : 区间搜索
// moreSearch   : 
// more         : 
```  

## appear-item
> 详情页展示组件

### props

name | type              | default | 备注
-----|-------------------|---------|------------------------
item |arrayOf(AppearItem)|[]       |展示项列表
id   |String             |nb-iframe|iframe的id

### model  

#### AppearItem  

```javascript
{
  label, // 标签
  value, // 展示的值，如果是image或者是attach，则为链接
  name,  // type=attach时的展示名称
  param, // type=image时，查询参数如果有，img的src的拼接规则为value+param
  type   // editor(iframe作为富文本区域)|editor2(普通的div作为富文本区域)|image|attach (缺省值为普通文本类型)
}
```  

## nb-drawer  

### props

name    | type   | default | 备注
--------|--------|---------|-
title   | String | 设置     | 标题
cancel  | String | 取消     | 取消按钮文案
success | String | 下一步   | 确认按钮文案

### 对外提供的方法
> 供外接调用的方法

name | param | return    | 备注
-----|-------|-----------|-------
show | []    | undefined | 显示
hide | []    | undefined | 隐藏

## nb-batch

### props

name       | type                 | default | 备注
-----------|----------------------|---------|-----
length     | Number               | 0       | 选中的记录数
options    | arrayOf(OptionItem)  | []      | 按钮配置
cancelText | String               | ''      | 取消文案

### event  

name   | params   | 备注
-------|----------|-------
click  | [type]   | type 是options的type字段
cancel | []       | 取消操作

### model  

#### OptionItem  

```javascript
{
  label: '撤销发布', // 操作文案
  type: 'CANCEL_PUBLISH', // 操作类型
  icon: 'back' // 操作图标
}
```  

:::tip Tips
由于这个操作不涉及具体接口调用，因此建议操作类型统一管理，这样方便图表的统一和类型的统一。
如下：
```javascript
/**
 * 列表页操作集合
 */
export const OPERATE_TYPES = {
  CANCEL_RECOMEND: 'CANCEL_RECOMEND',
  CANCEL_PUBLISH: 'CANCEL_PUBLISH',
  PUBLISH: 'PUBLISH',
  RECOMEND: 'RECOMEND',
  CLOCKED_PUBLISH: 'CLOCKED_PUBLISH',
  DELETE: 'DELETE',
  COPY_LINK: 'COPY_LINK',
  EDIT: 'EDIT'
}

export default {
  [OPERATE_TYPES.CANCEL_PUBLISH]: {
    label: '撤销发布',
    type: OPERATE_TYPES.CANCEL_PUBLISH,
    icon: 'back'
  },
  [OPERATE_TYPES.CANCEL_RECOMEND]: {
    label: '取消推荐',
    type: OPERATE_TYPES.CANCEL_RECOMEND,
    icon: 'uncom'
  },
  [OPERATE_TYPES.RECOMEND]: {
    label: '推荐',
    type: OPERATE_TYPES.RECOMEND,
    icon: 'commend'
  },
  [OPERATE_TYPES.PUBLISH]: {
    label: '发布',
    type: OPERATE_TYPES.PUBLISH,
    icon: 'publish'
  },
  [OPERATE_TYPES.CLOCKED_PUBLISH]: {
    label: '定时发布',
    type: OPERATE_TYPES.CLOCKED_PUBLISH,
    icon: 'time'
  },
  [OPERATE_TYPES.DELETE]: {
    label: '删除',
    type: OPERATE_TYPES.DELETE,
    icon: 'delete'
  },
  [OPERATE_TYPES.COPY_LINK]: {
    label: '复制链接',
    type: OPERATE_TYPES.COPY_LINK,
    icon: 'fzlj'
  },
  [OPERATE_TYPES.EDIT]: {
    label: '编辑',
    type: OPERATE_TYPES.EDIT,
    icon: 'edit'
  }
}

```
:::  

## nb-form  
> 这个是对`form-item`的扩展，由于这个组件根据`type`扩展的组件太多，大部分用法可以参考源代码，这里就不赘述。有以下几点需要注意  

+ 必填项设置  
关于必填项`required`属性，用冒号隔开，冒号前面为校验类型，后面为提示文案。  
具体校验类型，参考`nb-form`的`validator`方法   

```html
// 单纯的校验是否必填
<nb-form
  label="必填项"
  prop="req"
  required=":该项必填"
  placeholder="请输入"
  v-model="form.req"
/>
```  

+ 必须引入的`mixins`文件
  
这里的校验必须要配合`prop`属性一起使用。整体校验方法在`@/common/mixin`中；  
并且在`wbs`的交互中，如果是编辑页面离开时都会有提示，这个需要引入`@/common/mixinEdit`  

```javascript
import MixinEdit from '@/common/mixinEdit'
import Mixin from '@/common/mixin'
export default {
  name: 'demoForm',
  methods: {
    submit () {
      // validator方法返回的是错误信息
      const errorMsg = this.validator(this.$refs.contentForm)
      if (!errorMsg) {
        // do submit
      }
    },
    minxins: [MixinEdit, Mixin]
  }
}
```  

+ 自定义表单元素  

很多时候`nb-form`的类型不满足我们的需要，这时候就需要自定义一些表单元素。  
自定义的表单元素通过`box`分发，并且将`nb-form`的`boxed`设置为`true`。  

```html
<nb-form
  :inline="false"
  type="box"
  :boxed="true"
  label="内容"
  required=":请添加模块"
  name="uris"
  prop="uris"
  v-model="form.uris"
>
  <div class="model-container" slot="box">
    <model-item 
      v-for="(item, index) in form.uris" 
      :key="index" 
      :title="item.title" 
      :uri="item.uri"
      @edit="handleEdit(index)"
      @remove="handleRemove(index)"
    />
    <nb-button @click="addModel" large>添加模块</nb-button>
  </div>
</nb-form>
```  
:::tip Tips
`nb-form`大部分的用法都直接阅读文档即可，属性和事件较多。因此不加赘述。
:::

## 其他开发建议

### 关于文件结构组织  

```javascript
headline
|+-- comps
|    +-- form.vue
|    +-- info.vue
|+-- detail.vue
|+-- create.vue
|+-- index.vue
|+-- list.vue
```  
> 这几个目前都有对应的模版代码（vscode版）。欢迎补充～  

+ comps/info.vue

详情展示

```json
{
	"Print to nb-wbs-info": {
		"scope": "vue",
		"prefix": "nb-wbs-info",
		"body": [
			"<template>",
			"<section class=\"detail-tpl-wrapper\">",
			"	<appear-item",
			"		:item=\"[{",
			"			label: '类型', ",
			"			value: detail.categoryStr",
			"		}, {",
			"			label: '分类', ",
			"			value: detail.typeStr",
			"		}]\"",
			"	></appear-item>",
			"	<appear-item",
			"		:item=\"[{",
			"			label: '作者', ",
			"			value: detail.author",
			"		}]\"",
			"	></appear-item>",
			"	<appear-item",
			"		:item=\"[{",
			"			label: '图片', ",
			"			value: 'https://pic.newbanker.cn/1536916298049__d270c5659b1413ef5a113166b253102c.jpg',", 
			"			type: 'image'",
			"		}]\"",
			"	></appear-item>",
			"</section>",
			"</template>",
			"<script>",
			"	import AppearItem from '@/components/nb-detail/appear-item'",
			"	export default {",
			"		data () {",
			"			return {",
			"				detail: {",
			"					categoryStr: '类型',",
			"					typeStr: '分类',",
			"					author: '许超'",
			"				}",
			"			}",
			"		},",
			"		components: {",
			"			AppearItem",
			"		}",
			"	}",
			"</script>",
			"<style>",
			".detail-tpl-wrapper {",
			"	padding: 20px;",
			"}",
			"</style>"
		],
		"description": "wbs vue info"
	}
}
```  

+ comps/form.vue  

这个组件主要是用来编辑和创建用的编辑表单。一般默认有两个属性`defaultClass`和`isEdit`。这两个属性控制`form`的展现样式和是否是编辑（编辑在抽屉中进行，取消编辑时和取消新增的逻辑不一样）。

```json
{
	"Print to nb-wbs-form": {
		"scope": "vue",
		"prefix": "nb-wbs-form",
		"body": [
			"<template>",
			"  <el-form ref=\"contentForm\" :class=\"defaultClass\">",
			"    <nb-form",
			"      label=\"类型\"",
			"      v-model=\"form.media\"",
			"      prop=\"media\"",
			"      type=\"radio\"",
			"      :checkItem=\"mediaTypes\"",
			"      required=\":请选择类型\"",
			"    />",
			"    <nb-form",
			"       label=\"观点解读\"",
			"       prop=\"comment\"",
			"       required=\":请输入观点解读\"",
			"       placeholder=\"请输入观点解读\"",
			"       v-model=\"form.comment\"",
			"    />",
			"    <div class=\"self-footer\" style=\"padding-bottom: 20px;\">",
			"      <nb-button large type=\"plain\" @click=\"handleCancel\">取消</nb-button>",
			"      <nb-button",
			"        large",
			"        menu",
			"        type=\"primary\"",
			"        :options=\"[{",
			"          value: 1,",
			"          label: '保存并发布',",
			"          disable: false",
			"        }, {",
			"          value: 2,",
			"          label: '保存'",
			"        }]\"",
			"        @click=\"handleSave\"",
			"        v-if=\"!isEdit\"",
			"      />",
			"      <nb-button @click=\"handleSave(2)\" v-else>保存</nb-button>",
			"    </div>",
			"  </el-form>",
			"</template>",
			"<script>",
			"import NbForm from '@/components/nb-form.vue'",
			"import MixinEdit from '@/common/mixinEdit'",
			"import Mixin from '@/common/mixin'",
			"",
			"export default {",
			"  data () {",
			"    return {",
			"      form: {",
			"        id: '',",
			"        media: '',",
			"        comment: ''",
			"      },",
			"      mediaTypes: [{",
			"        label: '图文内容',",
			"        value: 'ARTICLE'",
			"      }, {",
			"        label: '图片内容',",
			"        value: 'PICTURE'",
			"      }]",
			"    }",
			"  },",
			"  props: {",
			"    defaultClass: {",
			"      type: String,",
			"      default: 'form-center-wrapper'",
			"    },",
			"    isEdit: {",
			"      type: Boolean,",
			"      default: false",
			"    }",
			"  },",
			"  mixins: [MixinEdit, Mixin],",
			"  created () {",
			"    if (!this.isEdit) {",
			"      this.initData()",
			"    }",
			"  },",
			"  methods: {",
			"    initData (form = {}) {",
			"      const tform = Object.assign({ ...this.form }, form)",
			"      this.form = tform",
			"    },",
			"    handleCancel () {",
			"      if (this.isEdit) {",
			"        this.$emit('done')",
			"      } else {",
			"        this.$router.back()",
			"      }",
			"    },",
			"    async handleSave (type) {",
			"      const errMsg = this.validator(this.$refs.contentForm)",
			"      if (!errMsg) {",
			"        await this.submit(type)",
			"        this.$message.success('保存成功！')",
			"        this.handleCancel()",
			"      }",
			"    },",
			"    submit (type) {",
			"      switch (type) {",
			"        case 1:",
			"          return this.saveAndPublish()",
			"        case 2:",
			"        default:",
			"          return this.save()",
			"      }",
			"    },",
			"    saveAndPublish () {",
			"      const form = { ...this.form }",
			"      form.id = form.id || undefined",
			"      return this.$store.dispatch('SAVE_PUBLISH', form)",
			"    },",
			"    save () {",
			"      const form = { ...this.form }",
			"      form.id = form.id || undefined",
			"      return this.$store.dispatch('SAVE', form)",
			"    }",
			"  },",
			"  components: {",
			"    NbForm",
			"  }",
			"}",
			"</script>",
			""
		],
		"description": "wbs form"
	}
}
```  
+ detail.vue  

这个组件是用来展示详情和编辑页用的。  

``` json
{
	"Print to nb-wbs-detail": {
		"scope": "vue",
		"prefix": "nb-wbs-detail",
		"body": [
			"<template>",
			"<nb-detail",
			"	title=\"内容详情\"",
			"	ref=\"nbDetail\"",
			"	:right=\"false\"",
			">",
			"	<fd-form",
			"		title=\"基本信息\"",
			"		:bottom=\"false\"",
			"	>",
			"		<div slot=\"header\" v-if=\"view === 'info'\">",
			"			<el-button icon=\"el-icon-edit\" @click=\"editInfo\" type=\"text\">编辑</el-button>",
			"		</div>",
			"		<component",
			"			:is=\"view\"",
			"			defaultClass=\"form-flex-wrapper\"",
			"		></component>",
			"	</fd-form>",
			"</nb-detail>",
			"</template>",
			"<script>",
			"	import NbDetail from '@/components/nb-detail'",
			"	import FdForm from '@/components/fd-form'",
			"	import info from './comps/info'",
			"	import edit from './comps/edit'",
			"	export default {",
			"		data () {",
			"			return {",
			"				view: 'info'",
			"			}",
			"		},",
			"		methods: {",
			"			showDetail (id) {",
			"				this.\\$refs.nbDetail.show()",
			"			},",
			"			closeDetail () {",
			"				this.\\$refs.nbDetail.hide()",
			"			},",
			"			editInfo () {",
			"				this.view = 'edit'",
			"			}",
			"		},",
			"		components: {",
			"			NbDetail,",
			"			info,",
			"			FdForm,",
			"			edit",
			"		}",
			"	}",
			"</script>",
			"<style>",
			"</style>",
		],
		"description": "wbs detail"
	}
}
```  

+ list.vue  

列表页面  

```json
{
	"Print to wbs-list-page": {
		"scope": "vue",
		"prefix": "wbs-list-page",
		"body": [
			"<template>",
			"  <section>",
			"    <nb-table ",
			"      :table-data=\"tableData\"",
			"      :table-headers=\"tableHeaders\"",
			"      :operator=\"false\"",
			"      :header-map=\"headerMap\"",
			"      :query-model=\"searchModel\"",
			"    />",
			"    <pagination",
			"      :total=\"total\"",
			"      :model=\"searchModel\"",
			"      :fetch=\"search\"",
			"    />",
			"  </section>",
			"</template>",
			"<script>",
			"  import NbTable from '@/components/nb-table.vue'",
			"  import Pagination from '@/components/pagination.vue'",
			"  export default {",
			"    name: '$1',",
			"    data () {",
			"      return {",
			"        tableData: [],",
			"        total: 0,",
			"        searchModel: {",
			"          pageNo: 1,",
			"          pageSize: 20",
			"        },",
			"        tableHeaders: [],",
			"        headerMap: []",
			"      }",
			"    },",
			"    created () {",
			"      this.search()",
			"    },",
			"    methods: {",
			"      async search () {",
			"      },",
			"      handleSearch (data, headerMapItem) {",
			"        this.searchModel[headerMapItem.searchKey] = data",
			"        this.search()",
			"      },",
			"      delQueryModel (searchModel, headerMapItem) {",
			"        this.searchModel = searchModel",
			"        this.search()",
			"      }",
			"    },",
			"    components: {",
			"      NbTable,",
			"      Pagination",
			"    }",
			"  }",
			"</script>"
		],
		"description": "wbs list page template"
	}
}
```

+ index.vue  

包含列表页和详情组件，也就实际展示的列表页面。  

```json
{
  "Print to console": {
    "scope": "javascript,typescript",
    "prefix": "log",
    "body": [
      "<template>",
      "<section class=\"content index-wrapper nb-shadow\" @click=\"closeDetail\">",
      "  <detail ref=\"contentDetail\"></detail>",
      "  <nb-batch",
      "    ref=\"batch\"",
      "    :length=\"length\"",
      "    :options=\"batchOptions\"",
      "    @click=\"clickRight\"",
      "    :activeName=\"activeName\"",
      "  ></nb-batch>",
      "  <el-tabs v-model=\"activeName\">",
      "    <div slot=\"bar\" class=\"bar-tabs-wrapper\">",
      "      <nb-button",
      "        type=\"primary\"",
      "        @click=\"create()\"",
      "        icon=\"el-icon-plus\"",
      "      >",
      "        添加内容",
      "      </nb-button>",
      "    </div>",
      "    <el-tab-pane label=\"已推荐\" class=\"handle-wrapper\" name=\"recommend\">",
      "      <content-list",
      "        type=\"recommend\"",
      "        v-if=\"activeName === 'recommend'\"",
      "        ref=\"list\"",
      "        @toDetail=\"toDetail\"",
      "        @onselect=\"handleSelect\"",
      "      />",
      "    </el-tab-pane>",
      "  </el-tabs>",
      "</section>",
      "</template>",
      "<script>",
      "import ContentList from './list'",
      "import NbBatch from '@/components/nb-batch'",
      "import operates, { OPERATE_TYPES } from '../../common/operates'",
      "import detail from './detail'",
      "import Mixin from '@/common/mixin'",
      "",
      "export default {",
      "  name: 'ContentIndex',",
      "  mixins: [Mixin],",
      "  data () {",
      "    return {",
      "      activeName: 'recommend',",
      "      selectRow: {},",
      "      length: 0",
      "    }",
      "  },",
      "  computed: {",
      "    batchOptions () {",
      "      const listOperates = []",
      "      listOperates.push(operates.DELETE)",
      "      return listOperates",
      "    }",
      "  },",
      "  mounted () {",
      "    const contentId = this.$route.params.contentId",
      "    console.log(contentId)",
      "    if (contentId) {",
      "      this.toDetail({ id: contentId })",
      "    }",
      "  },",
      "  methods: {",
      "    create () {",
      "      this.$router.push('/content/add')",
      "    },",
      "    closeDetail () {",
      "      this.handleEdit(this.$refs.contentDetail.closeDetail)",
      "    },",
      "    toDetail (row) {",
      "      this.$refs.contentDetail.showDetail(row)",
      "    },",
      "    handleSelect (length, row) {",
      "      this.length = length",
      "      if (length > 0) {",
      "        this.$refs.batch.show()",
      "      }",
      "      this.selectRow = row",
      "    },",
      "    async clickRight (type) {",
      "      await this.operate(type)",
      "      this.$refs.batch.hide()",
      "      this.selectRow = {}",
      "      this.$refs.list.search()",
      "    },",
      "    operate (type) {",
      "      if (!this.selectRow.id) {",
      "        return Promise.reject(new Error('未选中任何数据'))",
      "      }",
      "      switch (type) {",
      "        case OPERATE_TYPES.DELETE:",
      "          return this.delete()",
      "        default:",
      "          return Promise.resolve()",
      "      }",
      "    },",
      "    async delete () {",
      "      await this.$confirm('确定删除该内容？', '提示信息', { type: 'warning' })",
      "      return this.$store.dispatch('CONTENT_DELETE', this.selectRow.id)",
      "    }",
      "  },",
      "  components: {",
      "    ContentList,",
      "    NbBatch,",
      "    detail",
      "  }",
      "}",
      "</script>",
      "<style>",
      ".index-wrapper {",
      "  background: white;",
      "}",
      "</style>"
    ],
    "description": "Log output to console"
  }
}
```  
