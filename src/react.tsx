import { PropsWithChildren, useEffect, useRef } from 'react'
import {
  createHandler,
  removed,
  type ClickAnywhereOptions,
  type EventInvoker
} from './core'

export interface ClickAnywhereProps extends PropsWithChildren {
  once?: ClickAnywhereOptions['once'],
  ignores?: ClickAnywhereOptions['ignores'],
  disabled?: ClickAnywhereOptions['disabled'],

  onTrigger?: EventInvoker
}

export default function ClickAnywhere ({
  once,
  ignores,
  children,
  disabled,
  onTrigger = () => {}
}: ClickAnywhereProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    createHandler(containerRef.current!, onTrigger, { once, disabled, ignores })

    return () => {
      removed(containerRef.current!)
    }
  }, [containerRef])

  return (<div ref={containerRef}>{ children }</div>)
}
