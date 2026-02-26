import { useCallback, useRef } from 'react'
import type { RefObject } from 'react'
import { useCanvasStore } from '@/stores/canvasStore.ts'
import { screenToCanvas, isInBounds } from '@/lib/canvas-math.ts'
import { ZOOM_STEP } from '@/lib/constants.ts'
import { clampZoom } from '@/lib/canvas-math.ts'

const CLICK_TIME_THRESHOLD = 200
const CLICK_DISTANCE_THRESHOLD = 5

interface DragState {
  active: boolean
  startX: number
  startY: number
  startOffsetX: number
  startOffsetY: number
  startTime: number
}

interface PinchState {
  active: boolean
  initialDistance: number
  initialZoom: number
}

function getTouchDistance(t1: { clientX: number; clientY: number }, t2: { clientX: number; clientY: number }): number {
  const dx = t1.clientX - t2.clientX
  const dy = t1.clientY - t2.clientY
  return Math.sqrt(dx * dx + dy * dy)
}

export function useCanvasInteraction(
  containerRef: RefObject<HTMLDivElement | null>,
) {
  const dragRef = useRef<DragState>({
    active: false,
    startX: 0,
    startY: 0,
    startOffsetX: 0,
    startOffsetY: 0,
    startTime: 0,
  })

  const pinchRef = useRef<PinchState>({
    active: false,
    initialDistance: 0,
    initialZoom: 1,
  })

  const getContainerRect = useCallback(() => {
    return containerRef.current?.getBoundingClientRect() ?? null
  }, [containerRef])

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return
      const { offset } = useCanvasStore.getState()
      dragRef.current = {
        active: true,
        startX: e.clientX,
        startY: e.clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startTime: Date.now(),
      }
      useCanvasStore.getState().setIsDragging(true)
    },
    [],
  )

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = getContainerRect()
      if (!rect) return

      const { zoom, offset } = useCanvasStore.getState()
      const drag = dragRef.current

      if (drag.active) {
        const dx = e.clientX - drag.startX
        const dy = e.clientY - drag.startY
        useCanvasStore
          .getState()
          .setOffset(drag.startOffsetX + dx, drag.startOffsetY + dy)
      } else {
        const localX = e.clientX - rect.left
        const localY = e.clientY - rect.top
        const pixel = screenToCanvas(localX, localY, zoom, offset.x, offset.y)
        if (isInBounds(pixel.x, pixel.y)) {
          useCanvasStore.getState().setHoveredPixel(pixel)
        } else {
          useCanvasStore.getState().setHoveredPixel(null)
        }
      }
    },
    [getContainerRect],
  )

  const onMouseUp = useCallback(
    (e: React.MouseEvent) => {
      const drag = dragRef.current
      if (!drag.active) return

      drag.active = false
      useCanvasStore.getState().setIsDragging(false)

      const elapsed = Date.now() - drag.startTime
      const dx = Math.abs(e.clientX - drag.startX)
      const dy = Math.abs(e.clientY - drag.startY)

      if (
        elapsed < CLICK_TIME_THRESHOLD &&
        dx < CLICK_DISTANCE_THRESHOLD &&
        dy < CLICK_DISTANCE_THRESHOLD
      ) {
        const rect = getContainerRect()
        if (!rect) return
        const { zoom, offset } = useCanvasStore.getState()
        const localX = e.clientX - rect.left
        const localY = e.clientY - rect.top
        const pixel = screenToCanvas(localX, localY, zoom, offset.x, offset.y)
        if (isInBounds(pixel.x, pixel.y)) {
          useCanvasStore.getState().placePixel(pixel.x, pixel.y)
        }
      }
    },
    [getContainerRect],
  )

  const onMouseLeave = useCallback(() => {
    if (dragRef.current.active) {
      dragRef.current.active = false
      useCanvasStore.getState().setIsDragging(false)
    }
    useCanvasStore.getState().setHoveredPixel(null)
  }, [])

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault()
      const rect = getContainerRect()
      if (!rect) return

      const { zoom, offset } = useCanvasStore.getState()
      const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP
      const newZoom = clampZoom(zoom * factor)

      // Zoom toward cursor
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      const scale = newZoom / zoom
      const newOffsetX = mouseX - (mouseX - offset.x) * scale
      const newOffsetY = mouseY - (mouseY - offset.y) * scale

      useCanvasStore.getState().setZoom(newZoom)
      useCanvasStore.getState().setOffset(newOffsetX, newOffsetY)
    },
    [getContainerRect],
  )

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getTouchDistance(e.touches[0], e.touches[1])
      pinchRef.current = {
        active: true,
        initialDistance: dist,
        initialZoom: useCanvasStore.getState().zoom,
      }
    } else if (e.touches.length === 1) {
      const touch = e.touches[0]
      const { offset } = useCanvasStore.getState()
      dragRef.current = {
        active: true,
        startX: touch.clientX,
        startY: touch.clientY,
        startOffsetX: offset.x,
        startOffsetY: offset.y,
        startTime: Date.now(),
      }
      useCanvasStore.getState().setIsDragging(true)
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (pinchRef.current.active && e.touches.length === 2) {
      e.preventDefault()
      const dist = getTouchDistance(e.touches[0], e.touches[1])
      const scale = dist / pinchRef.current.initialDistance
      const newZoom = clampZoom(pinchRef.current.initialZoom * scale)
      useCanvasStore.getState().setZoom(newZoom)
    } else if (dragRef.current.active && e.touches.length === 1) {
      const touch = e.touches[0]
      const drag = dragRef.current
      const dx = touch.clientX - drag.startX
      const dy = touch.clientY - drag.startY
      useCanvasStore
        .getState()
        .setOffset(drag.startOffsetX + dx, drag.startOffsetY + dy)
    }
  }, [])

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (pinchRef.current.active) {
        pinchRef.current.active = false
        return
      }

      const drag = dragRef.current
      if (!drag.active) return

      drag.active = false
      useCanvasStore.getState().setIsDragging(false)

      if (e.changedTouches.length === 1) {
        const touch = e.changedTouches[0]
        const elapsed = Date.now() - drag.startTime
        const dx = Math.abs(touch.clientX - drag.startX)
        const dy = Math.abs(touch.clientY - drag.startY)

        if (
          elapsed < CLICK_TIME_THRESHOLD &&
          dx < CLICK_DISTANCE_THRESHOLD &&
          dy < CLICK_DISTANCE_THRESHOLD
        ) {
          const rect = getContainerRect()
          if (!rect) return
          const { zoom, offset } = useCanvasStore.getState()
          const localX = touch.clientX - rect.left
          const localY = touch.clientY - rect.top
          const pixel = screenToCanvas(
            localX,
            localY,
            zoom,
            offset.x,
            offset.y,
          )
          if (isInBounds(pixel.x, pixel.y)) {
            useCanvasStore.getState().placePixel(pixel.x, pixel.y)
          }
        }
      }
    },
    [getContainerRect],
  )

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const { zoom, offset } = useCanvasStore.getState()
    const panStep = 50

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        useCanvasStore.getState().setOffset(offset.x, offset.y + panStep)
        break
      case 'ArrowDown':
        e.preventDefault()
        useCanvasStore.getState().setOffset(offset.x, offset.y - panStep)
        break
      case 'ArrowLeft':
        e.preventDefault()
        useCanvasStore.getState().setOffset(offset.x + panStep, offset.y)
        break
      case 'ArrowRight':
        e.preventDefault()
        useCanvasStore.getState().setOffset(offset.x - panStep, offset.y)
        break
      case '+':
      case '=': {
        const newZoom = clampZoom(zoom * ZOOM_STEP)
        useCanvasStore.getState().setZoom(newZoom)
        break
      }
      case '-': {
        const newZoom = clampZoom(zoom / ZOOM_STEP)
        useCanvasStore.getState().setZoom(newZoom)
        break
      }
      case 'Escape':
        useCanvasStore.getState().setHoveredPixel(null)
        break
    }
  }, [])

  return {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onWheel,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onKeyDown,
  }
}
