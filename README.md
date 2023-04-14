# click-anywhere

[中文](./README-zh.md)

## Install

```bash
npm install click-anywhere
```

## Usage
The library also provides `vue2/3 directives` and `vue2.7/3 components` for selection.

### Component
> TIP: Currently, only vue3 and vue2.7 are supported.

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
