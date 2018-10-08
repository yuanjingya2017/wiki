# wbs部分组件文档
::: tip Tips
主要是针对常用的wbs组件的使用记录，正常文档包括：props、slot、event、methods的说明以及部分复杂的props和event的返回数据类型说明。其中methods因为没法区分是外部还是内部调用，所以主要是用到一个注释一个。  

+ 多种类型用`/`隔开（radio/select 表示接受radio或者select）
+ `event`中的`params`用数组表示，从`0～n`表示第一个到第N个参数；有复杂的数据结构统一在`model`中表示。
::: 

## nb-detail
> 
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
  click: boolean // 设置该列可不可以点击，点击的回调事件是clickFirst
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
// headerType说明: 对应的是nb-popover.vue的代码解读
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
