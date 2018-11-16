# 数组属性介绍
## es3
1. join()将数组中所有元素转为一个字符串
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
var energy = fruits.join();
```
2. reverse()反转数组的元素顺序。
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.reverse();
```
3. sort()对数组的元素进行排序。(会改变原始数组)
sort() 方法用于对数组的元素进行排序。

排序顺序可以是字母或数字，并按升序或降序。

默认排序顺序为按字母升序。

注意：当数字是按字母顺序排列时"40"将排在"5"前面。

使用数字排序，你必须通过一个函数作为参数来调用。

函数指定数字是按照升序还是降序排列。

```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.sort();
// 数字排序（数字和升序）：
var points = [40,100,1,5,25,10];
points.sort(function(a,b){return a-b});
```
4. concat()连接两个或更多的数组，并返回结果。
字符串String对象的concat连接两个或更多字符串，并返回新的字符串，不改变原始字符串。
```javascript
var hege = ["Cecilie", "Lone"];
var stale = ["Emil", "Tobias", "Linus"];
var kai = ["Robin"];
var children = hege.concat(stale,kai);
```
5. slice()选取数组的的一部分，并返回一个新数组。不会改变原始数组。语法：array.slice(start, end)
字符串String对象的slice提取字符串的片断，并在新的字符串中返回被提取的部分
```javascript
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var citrus = fruits.slice(1,3);
```
6. splice()从数组中插入、删除或替换数组的元素。返回被删除的元素；这种方法会改变原始数组！
语法：array.splice(index,howmany,item1,.....,itemX)
index: 规定从何处添加/删除元素。(r)
howmany: 规定应该删除多少元素。必须是数字，但可以是 "0"。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。(r)
item1,.....,itemX: 要添加到数组的新元素
7. pop()删除数组的最后一个元素并返回删除的元素。
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.pop();
```
8. push()向数组的末尾添加一个或更多元素，并返回新的长度。
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi")
// 5
```
9. unshift()向数组的开头添加一个或更多元素，并返回新的长度。
10. shift()删除并返回数组的第一个元素。
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.shift()
// Orange,Apple,Mango
```

11. toString(),LocaleString(),valueOf()
```javascript
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.toLocaleString()
// "Banana,Orange,Apple,Mango"
fruits.toString()
// "Banana,Orange,Apple,Mango"
fruits.valueOf()
// (4) ["Banana", "Orange", "Apple", "Mango"] 同fruits数组输出的一样
```

## es5
1. forEach()数组每个元素都执行一次回调函数。
2. map()通过指定函数处理数组的每个元素，并返回处理后的数组。
3. filter()检测数值元素，并返回符合条件所有元素的数组。不能return
4. every()检测数值元素的每个元素是否都符合条件。
5. some()检测数组元素中是否有元素符合指定条件。
6. reduce()将数组元素计算为一个值（从左到右）。
7. reduceRight()将数组元素计算为一个值（从右到左）。
8. indexOf()搜索数组中的元素，并返回它所在的位置。
9. lastIndexOf()返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。
10. 数组类型 Array.isArray()检测是否为数组

作为数组的字符串

字符串charAt() => []

字符串是不可变值，所以当把字符串作为数组看待的时候，它们是只读的，push，sort，reverse，splice等会修改数组的方法在字符串上无效

## es6
1. 扩展运算符
2. Array.from()
Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
3. Array.of()
Array.of方法用于将一组值，转换为数组。
```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```
Array.of基本上可以用来替代Array()或new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

4. 数组实例的 copyWithin()
数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组。
5. 数组实例的 find() 和 findIndex()
数组实例的find方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为true的成员，然后返回该成员。如果没有符合条件的成员，则返回undefined。
数组实例的findIndex方法的用法与find方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。
6. 数组实例的 fill()
fill方法使用给定值，填充一个数组。
7. 数组实例的 entries()，keys() 和 values()
ES6 提供三个新的方法——entries()，keys()和values()——用于遍历数组。它们都返回一个遍历器对象（详见《Iterator》一章），可以用for...of循环进行遍历，唯一的区别是keys()是对键名的遍历、values()是对键值的遍历，entries()是对键值对的遍历。
```javascript
for (let index of ['a', 'b'].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ['a', 'b'].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ['a', 'b'].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```
8. 数组实例的 includes()(es7)
Array.prototype.includes方法返回一个布尔值，表示某个数组是否包含给定的值，与字符串的includes方法类似。

indexOf方法有两个缺点，一是不够语义化，它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1，表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

9. 数组实例的 flat()，flatMap()
数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。该方法返回一个新数组，对原数据没有影响。
flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），然后对返回值组成的数组执行flat()方法。该方法返回一个新数组，不改变原数组。
flatMap()只能展开一层数组。

10. 数组的空位