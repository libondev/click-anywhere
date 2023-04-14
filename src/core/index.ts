export type EventParams = PointerEvent | MouseEvent
export type EventInvoker = (event: EventParams) => void

export interface ClickAnywhereOptions {
  ignores?: string[]
  once?: boolean
  disabled?: boolean
}

const HANDLER_FLAG = '__click_anywhere_handler__'
const INITIAL_FLAG = '__click_anywhere_initialized__'

const GLOBAL_IGNORES: string[] = []
const invokers = new Set<EventInvoker>()

function eventInvoker (this: Document, event: EventParams): void {
  if (invokers.size === 0) {
    return
  }

  invokers.forEach((invoker) => { invoker(event) })
}

export function initial (): void {
  if (typeof document === 'undefined' || document[INITIAL_FLAG]) {
    return
  }

  document.addEventListener('click', eventInvoker)
  document[INITIAL_FLAG] = true
}

export function removed(element: HTMLElement): void {
  if (element && element[HANDLER_FLAG]) {
    invokers.delete(element[HANDLER_FLAG])

    element[HANDLER_FLAG] = undefined

    // Destroy if no invokers
    if (invokers.size !== 0) {
      return
    }

    document.removeEventListener('click', eventInvoker)
    document[INITIAL_FLAG] = false
  }
}

export function setGlobalIgnores(ignores: string[]) {
  GLOBAL_IGNORES.length = 0
  GLOBAL_IGNORES.push(...ignores)
}

export function createHandler (
  targetElement: HTMLElement,
  eventHandler: EventInvoker,
  options: ClickAnywhereOptions = {}
): void {
  const { ignores = [], once = false, disabled } = options

  if (!targetElement || disabled) {
    return
  }

  initial()

  // Remove previous handler
  removed(targetElement)

  const _handler: EventInvoker = (event: EventParams): void => {
    if (
      !targetElement ||
      event.target == null ||
      targetElement.contains(event.target as HTMLElement)
    ) {
      return
    }

    const _ignores = GLOBAL_IGNORES.concat(ignores)
    // Exclude document/window
    const composedPath = event.composedPath().slice(0, -2) as HTMLElement[]

    if (
      _ignores.length > 0 &&
      composedPath.some((el) => _ignores.some((cls) => el.classList.contains(cls)))
    ) {
      return
    }

    eventHandler(event)

    once && removed(targetElement)
  }

  targetElement[HANDLER_FLAG] = _handler

  invokers.add(_handler)
}
