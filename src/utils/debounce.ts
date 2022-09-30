let timer = null
export function debounce(func: () => void, wait = 200) {
  clearTimeout(timer)
  timer = setTimeout(func, wait)
}
