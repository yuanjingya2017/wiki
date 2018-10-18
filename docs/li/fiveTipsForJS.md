# JS编写条件语句的五个技巧

::: tip tips
  使用JavaScript时，我们处理了很多条件语句，这里有五个方法，可以帮助我们更好，更清晰的处理条件语句
:::
## 1.对多个条件使用Array.includes
首先来看一下下面的例子
```javascript
  test (fruit) {
    if (fruit === 'apple' || fruit === 'strawberry') {
      console.log('red')
    }
  }

  this.test('apple')  // red
```
乍一看，上面的例子看起来不错。然而，如果我们的条件语句更多呢，指的是 `apple` 和 `strawberry`,我们是否会更多的拓展声明 `||` ?

我们可以使用（[Array.includes](http://www.runoob.com/jsref/jsref-includes.html)）重写上面的条件语句
```javascript
  test (fruit) {
    // 将所有条件放在一个数组里面
    const redFruits = ['apple', 'strawberry', 'cranberries']
    if (redFruits.includes(fruit)) {
      console.log('red')
    }
  }

  this.test('apple') // red
  this.test('strawberry') // red
  this.test('cranberries') // red
```
我们将 `apple`、`strawberry`、`cranberries` 这些条件提取到一个数组中。这样做，可以使代码看起来更整洁。
## 2.少嵌套，早return
我们可以拓展前面的例子并且包含其他的条件
  * 如果没有提供参数 `fruit`，则抛出错误
  * 如果参数 `quantity` 超过`10`，就打印出来
```javascript
  test (fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cranberries']
    // 条件1：fruit 有值
    if (fruit) {
      // 条件2： 符合数组里的某一个条件
      if (redFruits.includes(fruit)) {
        console.log('red')
      }

      // 条件3： quantity > 10
      if (quantity > 10) {
        console.log('big quantity')
      }
    } else {
      console.log('No fruit!')
    }
  }

  // test results
  test(null); // No fruits
  test('apple'); // red
  test('apple', 20); // red, big quantity
```
阅读完上面的代码，我们可以看出：
  * 1个 `if/else` 语句过滤掉无效条件
  * 3个if嵌套语句（语句1，2，3）

咱们在开发时，对于条件嵌套，可以遵循**在**发现**无效条件时提前返回**原则
```javascript
  test (fruit, quantity) {
    const redFruits = ['apple', 'strawberry', 'cranberries']
    // 条件1：fruit 有值
    if (!fruit) console.log('No fruit')
    // 条件2： 符合数组里的某一个条件
    if (!redFruits.includes(fruit)) return
    console.log('red')
    // 条件3：quantity > 10
    if (quantity > 10) {
      console.log('big quantity')
    }
  }

  // test results
  test(null); // No fruits
  test('apple'); // red
  test('apple', 20); // red, big quantity
```
通过反转条件的语句，提前返回结果，我们可以少写很多嵌套语句。当我们有很长的逻辑时，这种代码编写就非常简洁，有效（可以想象需要滚动到最底层才知道有一个else语句,是一件非常难受的事情）
::: tip tips
  如果你有兴趣的话，在[StackOverflow](https://softwareengineering.stackexchange.com/questions/18454/should-i-return-from-a-function-early-or-use-an-if-statement)上有一篇专门讨论`if/else`编写风格的文章
:::
## 3.使用参数默认功能以及解构
还是上面的例子，我们总是需要检查参数`quantity`是 `null || undefined`，而且还需要在使用的时候分配默认值：
```javascript
  test (fruit, quantity) {
    if (!fruit) return;
    const q = quantity || 1; // 如果quantity没有传值的话，分配一个默认值 为 1
    console.log(`We have ${q} ${fruit}!`);
  }

  //test results
  test('banana'); // We have 1 banana!
  test('apple', 2); // We have 2 apple!
```
实际上我们可以通过对`quantity`分配默认函数参数来避免重新定义变量
```javascript
  test (fruit, quantity = 1) {
    if (!fruit) return;
    console.log(`We have ${q} ${fruit}!`);
  }

  //test results
  test('banana'); // We have 1 banana!
  test('apple', 2); // We have 2 apple!
```
这样就更简单，直观。但是需要注意的是，每个参数都有自己的[默认函数参数](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters),例如，我们也可以给`fruit`指定默认值 `test(fruit = 'unknown', quantity = 1)`。

如果`fruit`是一个对象怎么办，我们可以指定默认参数吗？ 答案是当然
```javascript
  test (fruit) {
    if (fruit && fruit.name) {
      console.log(fruit.name)
    } else {
      console.log('unknown)
    } 
  }

  //test results
  test(undefined); // unknown
  test({ }); // unknown
  test({ name: 'apple', color: 'red' }); // apple
```
上面这个例子，如果我们想要打印`name`的值，需要通过判断语句`fruit && fruit.name`为`true`时，才能打印出来
```javascript
  test ({name} = {}) {
    console.log(fruit.name || 'unknown')
  }

  //test results
  test(undefined); // unknown
  test({ }); // unknown
  test({ name: 'apple', color: 'red' }); // apple
```
由于我们只需要`name`的值，所以我们可以使用构造参数`{name}`，然后就可以通过`name`这个变量来代替`fruit.name`

我们还将空对象指定为`{}`默认值。如果不这样做的话。会在执行时报错`test(undefined)- Cannot destructure property name of 'undefined' or 'null'`，因为在`undefined`中没有`name`属性
::: tip 其他空对象检查方法(第三方库)
  * 使用[Lodash获取](https://lodash.com/docs/4.17.10#get)功能
  * 使用Facebook开源的[idx](https://github.com/facebookincubator/idx)库（与Babel.js）
:::
## 4.使用Map/Object Litteral而不是switch语句
::: tip tips
  [Object Litteral](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types): 对象字面量 指的是封闭在花括号对`{}`中的一个对象的零个或多个”属性名:值”列表。
:::
通过下面的例子，实现根据参数`color`打印出对应的值
```javascript
  test (color) {
    switch (color) {
      case 'red':
        return ['apple', 'strawberry'];
      case 'yellow':
        return ['banana', 'pineapple'];
      case 'purple':
        return ['grape', 'plum'];
      default:
        return [];
    }
  }

  //test results
  test(null); // []
  test('yellow'); // ['banana', 'pineapple']
```
这种代码也没有错，但是它很冗长。我们可以使用更清晰的语法（`object literal`）来实现相同的结果。
```javascript
  const fruitColor = {
    red: ['apple', 'strawberry'],
    yellow: ['banana', 'pineapple'],
    purple: ['grape', 'plum']
  }

  test (color) {
    return fruitColor[color] || []
  }
```
当然，也可以使用[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)来实现相同的结果。
```javascript
  const fruitColor = new Map()
    .set('red', ['apple', 'strawberry'])
    .set('yellow', ['banana', 'pineapple'])
    .set('purple', ['grape', 'plum'])

    test (color) {
      return fruitColor[color] || []
    }
```
::: tip tips
  Todd Motto有一篇文章深入研究`switch`语句与`object literal`，你可以[在这里](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/)阅读。
:::
### TL; DR; 重构语法
对于上面的例子，我们可以通过`Array.filter`重构代码来实现相同的结果
```javascript
  const fruits = [
    { name: 'apple', color: 'red' }, 
    { name: 'strawberry', color: 'red' }, 
    { name: 'banana', color: 'yellow' }, 
    { name: 'pineapple', color: 'yellow' }, 
    { name: 'grape', color: 'purple' }, 
    { name: 'plum', color: 'purple' }
  ]

  test (color) {
    return fruits.filter(f => f.color === color)
  }
```
## 5. 使用Array.every 和 Array.some
看下面的例子，检查对象所有中的`color`是否都是`red`:
```javascript
  const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ]

  test () {
    let isAllRed = true
    for (let f of fruits) {
      if (!isAllRed) break
      isAllRed = (f.color == 'red')
    }

    console.log(isAllRed); // false
  }
```
这样写代码就太长了，我们可以使用`Array.every`函数来减少代码行数。
### Array.every
```javascript
  const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ]

  test () {
    cosnt isAllRed = fruits.every(f => f.color === 'red')
    console.log(isAllRed) // false
  }
```
同样我们也可以使用 `Array.some` 来实现数组中是否有一个对象的`color`是`red`。
```javascript
  const fruits = [
    { name: 'apple', color: 'red' },
    { name: 'banana', color: 'yellow' },
    { name: 'grape', color: 'purple' }
  ]

  test () {
  const isAnyRed = fruits.some(f => f.color == 'red')

  console.log(isAnyRed) // true
}
```
<p style="font-size: 25px; text-align: right; color: #0081ff">-- over</p>
