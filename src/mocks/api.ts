export function mockDelay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function mockApi<T>(data: T, delay = 500): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay))
}
