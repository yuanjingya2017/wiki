# 设计模式学习笔记

:::tip Tips
主要记录平时在设计模式以及前端代码组织上的一些思考，贴出来的代码只给出ES5的实现版本，后续会补上ES6的写法。（因为ES6多了proxy，所以两种实现方式还有很多可以比较的地方。）
:::  

## 观察者模式/发布-订阅模式  
前端的学习中最重要的可能就是观察者模式和发布订阅模式了。传统的事件处理和现代的mvvm框架，基本都是基于这两种设计模式构建的。  
我网上查的资料很多都是把这两种设计模式放一块谈，这两种设计模式有联系也有区别，下面两段话是维基百科对这两种模式的解释。抛开网上各种版本的实现不谈，后面，我想通过一些简单的`demo`谈谈我对这两种设计模式的理解：  

> **观察者模式**是软件设计模式的一种。在此种模式中，一个目标对象管理所有相依于它的观察者对象，并且在它本身的状态改变时主动发出通知。这通常透过呼叫各观察者所提供的方法来实现。此种模式通常被用来实时事件处理系统。  
>  
> **发布-订阅**是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。  

### 观察者模式  

按照上面关于观察者模式的概念，我们大概能抽象出这样的概念。  

观察者模式是被观察者（Subject）自己管理观察者（Observers）。当`Subject`状态改变时，通知所有的`Observers`。我们可以通过以下代码来实现这样的一个功能（ES5）：

```javascript  
function Subject (name) {
  var name = name
  this.observers = []
  Object.defineProperty(this, 'name', {
    enumerable: true,
    configurable: true,
    get: function () {
      return name
    },
    set: function (newName) {
      name = newName
      this.notify(newName)
    }
  })
}
Subject.prototype.addObserver = function (observer) {
  return this.observers.push(observer)
}
Subject.prototype.removeObserver = function (id) {
  return this.observers[id] = null
}
Subject.prototype.cleanObservers = function () {
  return this.observers = []
}
Subject.prototype.notify = function (name) {
  this.observers.forEach(item => {
    if (typeof item === 'function') {
      item.call(this, name)
    }
  })
}
```  

这个代码很简单，主要是提供观察`Subject`对象的`name`属性的变化。对象本身提供添加和删除`Observer`的功能。当`name`发生改变时，通过`notify`方法通知所有的`Observer`。运行效果如下：

```javascript
var sub = new Subject('哆啦A梦')

sub.addObserver(function (name) {
  console.log('observer exec: ' + name)
})

sub.name = '大雄'
// observer exec: 大雄
```
从运行结果我们可以知道，当`name`发生改变的时候，就会通知到`Observer`。  

### 发布-订阅模式  

个人觉得**发布订阅**模式是对**观察者模式**的一种优化。  

发布订阅模式主体（`Subject`）并不是直接通知`Observer`，而是通知一个中间件（`MiddleWare`），再由中间件进行筛选分发给一个个订阅者（`Subscriber`）。发布者与订阅者松耦合，甚至不需要知道它们的存在。  

这中间最主要的是实现这个`MiddleWare`。暂时不考虑分发的功能，我们大概知道`MiddleWare`至少需要有添加订阅者、移除和清空订阅者这三个最基本的功能。整体实现，代码大致如下：

```javascript  
// 中间件
function MiddleWare (target) {
  this.target = target
  this.subscribers = []
}
MiddleWare.prototype.addSubscriber = function (target, subscriber) {
  subscriber = subscriber || target
  return this.subscribers.push(subscriber)
}
MiddleWare.prototype.removeSubscriber = function (id) {
  return this.subscribers[id] = null
}
MiddleWare.prototype.cleanSubscriber = function () {
  return this.subscribers = []
}
MiddleWare.prototype.notify = function (name) {
  this.subscribers.forEach(item => {
    if (typeof item === 'function') {
      item.call(this.target, name)
    }
  })
}
// 发布对象的某个属性
// 返回的是一个中间件
function doPublish (obj, key, val) {
  var innerVal = val
  var middleWare = new MiddleWare(obj)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return innerVal
    },
    set: function (newValue) {
      innerVal = newValue
      middleWare.notify(newValue)
    }
  })
  return middleWare
}
```  

对于原本的`Subject`我们可以改写为一个普通的对象即可：

```javascript  
function Subject (name) {
  this.name = name
}
```  

通过以下代码来看看最终的运行效果  

```javascript
// 创建实例
var sub = new Subject('多啦A梦')

// 发布
var middleWare = doPublish(sub, 'name', sub.name)

// 订阅
middleWare.addSubscriber(function (name) {
  console.log(this)
  console.log('subscriber exec: ' + name)
})

sub.name = '大雄'
// subscriber exec: 大雄
```  

至于如何分发消息给订阅者，我们可以在`MiddleWare`的`notify`方法里面进行分发。这里也就不做实现了。  

看起来发布-订阅模式好像代码量变多了，而且实现的需求也大致相同，但是实际上两种设计模式有本质上的区别：**观察者模式**实际上是由`Subject`主动推送的，它本身提供关于`Observer`的注册和通知的方法。但是**发布-订阅模式**则是由外部代码去监听`Subject`的变化。两者的应用场景不一样。
