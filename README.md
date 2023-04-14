# click-anywhere

[中文](./README-zh.md)

## Install

```bash
npm install click-anywhere
```

## Usage
The library also provides `vue2/3 directives` `vue2.7/3 components` and `react component` for selection.

### VanillaJS/Native JS

```html
<div id="app">This is app</div>

<div class="ignore">This is ignore area</div>

<script type="module">
import { createHandler, removed } from 'click-anywhere'

const el = document.getElementById('app')

createHandler(console.log, {
  once: true,
  ignores: ['ignore'],
  disabled: false
})

// remove handler
removed(el)
</script>
```

### Vue Component
> TIP: Currently, only vue3 vue2.7 and react are supported. vue2.6 and below are not supported.

```html
<template>
  <click-anywhere @trigger="clickAnywhere">Click anywhere</click-anywhere>
</template>

<script setup>
import ClickAnywhere from 'click-anywhere'

// or only component are introduced separately
import ClickAnywhere from 'click-anywhere/dist/component'
</script>
```

#### React Component
```jsx
import ClickAnywhere from 'click-anywhere/dist/react-component'

function App () {
  return (
    <ClickAnywhere
      once
      ignores={['ignore']}
      disabled={false}
      trigger={console.log}
    >
      Click anywhere
    </ClickAnywhere>
  )
}
```

### Directive

The directive are common to vue2/vue3.

```html
<template>
  <div v-click-anywhere="clickAnywhere">Click anywhere</div>

  <!--
    This directive has an optional modifier once.
    See below for a full explanation, It has a lower priority than options.once
  -->
  <div v-click-anywhere.once="clickAnywhere">Click anywhere</div>
</template>

<script setup>
import { vClickAnywhere } from 'click-anywhere'

// or only directive are introduced separately
import vClickAnywhere from 'click-anywhere/dist/directive'

function clickAnywhere () {
  console.log('click anywhere')
}

// use options
const directiveHandler = [
  console.log,
  {
    // The event registered by this directive is executed only once
    once: true,
    // Element whitelist, the event registered by this directive will not be
    // triggered when the event is triggered on the element in the whitelist
    ignores: []
  }
]
</script>
```

#### Attributes
| Attribute | Description | Type | Default |
| --- | --- | --- | --- |
| once | The event registered by this component is executed only once | `Boolean` | `false` |
| ignores | Element whitelist, the event registered by this component will not be triggered when the event is triggered on the element in the whitelist | `string[]` | `[]` |
| disabled | Whether to disable the event registered by this component(Events are not executed until disabled becomes false) | `Boolean` | `false` |

#### Events
| Event | Description | Parameters |
| --- | --- | --- |
| trigger | Triggered when the event is triggered | `PointerEvent` | `MouseEvent` |
