import type { DirectiveBinding } from 'vue'

import type { ClickAnywhereOptions, EventInvoker } from './core/index'
import { createHandler, removed } from './core/index'

export type DirectiveOptions = EventInvoker | [handler: EventInvoker, options: ClickAnywhereOptions]

function bind(el: HTMLElement, { modifiers: { once }, value }: DirectiveBinding<DirectiveOptions>): void {
  const [_handler, options] = Array.isArray(value) ? value : [value, {}]

  if (options.disabled) {
    removed(el)
    return
  }

  createHandler(el, _handler, Object.assign({ once }, options))
}

function update (el: HTMLElement, binding: DirectiveBinding<DirectiveOptions>): void {
  if (binding.value === binding.oldValue) {
    return
  }

  if (binding.value != null) {
    bind(el, binding)
  }
}

function unbind (el: HTMLElement): void {
  removed(el)
}

export default {
  name: 'ClickOutside',
  // Vue2
  bind,
  update,
  unbind,

  // Vue3
  beforeMount: bind,
  updated: update,
  unmounted: unbind
}
