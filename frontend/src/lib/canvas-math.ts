import { CANVAS_SIZE, ZOOM_MIN, ZOOM_MAX } from './constants'

export function screenToCanvas(
  screenX: number,
  screenY: number,
  zoom: number,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  const x = Math.floor((screenX - offsetX) / zoom)
  const y = Math.floor((screenY - offsetY) / zoom)
  return { x, y }
}

export function canvasToScreen(
  canvasX: number,
  canvasY: number,
  zoom: number,
  offsetX: number,
  offsetY: number,
): { x: number; y: number } {
  const x = canvasX * zoom + offsetX
  const y = canvasY * zoom + offsetY
  return { x, y }
}

export function isInBounds(x: number, y: number): boolean {
  return x >= 0 && x < CANVAS_SIZE && y >= 0 && y < CANVAS_SIZE
}

export function pixelIndex(x: number, y: number): number {
  return y * CANVAS_SIZE + x
}

export function indexToCoords(index: number): { x: number; y: number } {
  return {
    x: index % CANVAS_SIZE,
    y: Math.floor(index / CANVAS_SIZE),
  }
}

export function clampZoom(zoom: number): number {
  return Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoom))
}

export function clampOffset(
  offsetX: number,
  offsetY: number,
  zoom: number,
  viewWidth: number,
  viewHeight: number,
): { x: number; y: number } {
  const canvasPixelSize = CANVAS_SIZE * zoom
  const minX = viewWidth - canvasPixelSize
  const minY = viewHeight - canvasPixelSize
  return {
    x: Math.min(0, Math.max(minX, offsetX)),
    y: Math.min(0, Math.max(minY, offsetY)),
  }
}
