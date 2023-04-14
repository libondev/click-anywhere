import type { EventInvoker } from '../src/core'

declare global {
  interface Document {
    __click_anywhere_initialized__?: boolean
  }

  interface HTMLElement {
    __click_anywhere_handler__?: EventInvoker
  }
}
