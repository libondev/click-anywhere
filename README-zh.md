# click-anywhere

[EN](./README.md)

## 安装

```bash
npm install click-anywhere
```

## Usage
这个库提供了 `vue2/3 指令` 和 `vue2.7/3 组件` 三种使用方式。

### Component
> 注意：目前组件只支持了 vue3 和 vue2.7。

```html
<template>
  <click-anywhere @trigger="clickAnywhere">Click anywhere</click-anywhere>
</template>

<script setup>
import ClickAnywhere from 'click-anywhere'

// 或者 只单独引入组件
import ClickAnywhere from 'click-anywhere/dist/component'
</script>
```

#### Attributes
| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| once | 该组件注册的事件只会执行一次 | `Boolean` | `false` |
| ignores | 如果触发事件的 className 中的某一个类名出现在 `ignores` 中，那么本地事件则不会再执行 | `string[]` | `[]` |
| disabled | 是否暂时禁用组件的点击事件(只有当组件传入的 `disabled` 参数变为 `false` 时事件才会正常触发) | `Boolean` | `false` |

#### Events
| Event | Description | Parameters |
| --- | --- | --- |
| trigger | 当触发事件的目标元素符合过滤规则时则会触发此事件，如果设置了 `once` 属性，那么该事件只会执行一次 | `PointerEvent` |

### Directive

在 `vue2` 和 `vue3` 中都可以使用指令。

```html
<template>
  <div v-click-anywhere="clickAnywhere">Click anywhere</div>

  <!--
    指令有一个可选的修饰符 `once`, 该修饰符的优先级低于 `options.once`, 关于 options 请看下文说明
  -->
  <div v-click-anywhere.once="clickAnywhere">Click anywhere</div>
</template>

<script setup>
import { vClickAnywhere } from 'click-anywhere'
// 或者只单独引入指令
import vClickAnywhere from 'click-anywhere/dist/directive'

function clickAnywhere () {
  console.log('click anywhere')
}

// 当指令的参数为一个函数时，该函数会被当做事件处理函数
// 当指令的参数为一个数组时，该数组的第一个元素会被当做事件处理函数，第二个元素会被当做 options
const directiveHandler = [
  console.log,
  {
    once: true,
    ignores: []
  }
]
</script>
```