import { defineComponent, h, onBeforeUnmount, shallowRef, watch } from 'vue'
import { createHandler, removed } from './core/index'

import type { PropType } from 'vue'
import type { EventParams } from './core'

export default defineComponent({
  name: 'ClickAnywhere',

  props: {
    once: {
      type: Boolean,
      default: false
    },

    disabled: {
      type: Boolean,
      default: false
    },

    ignores: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },

  emits: {
    trigger: (event: EventParams) => true
  },

  setup(props, { emit, slots }) {
    const containerRef = shallowRef()

    const unwatchDisabled = watch(() => props.disabled, (dd) => {
      dd && removed(containerRef.value)
    }, { immediate: true })

    const unwatchContainer = watch(containerRef, (container) => {
      createHandler(container, (event: EventParams) => {
        emit('trigger', event)

        props.once && unwatchDisabled()
      }, props)
    }, { immediate: true })

    onBeforeUnmount(() => {
      unwatchContainer()
      unwatchDisabled()
    })

    return () => h('div', { ref: containerRef }, slots.default && slots.default())
  }
})
