import Loading, { type LoadingProps } from './Loading.vue'
import { createApp, h, reactive, type Directive } from 'vue'

const createLoading = (options: LoadingProps, target: HTMLElement) => {
  const loadingOptions = reactive(options)
  const loadingCom = createApp({
    render() {
      return h(Loading, loadingOptions)
    }
  }).mount(document.createElement('div'))
  target.appendChild(loadingCom.$el)

  const close = () => {
    loadingCom.$el.parentNode.removeChild(loadingCom.$el)
  }

  const setLoading = (loading: boolean) => (loadingOptions.loading = loading)

  return {
    close,
    setLoading
  }
}

const loadingDirective: Directive = {
  mounted(el, binding) {
    el.style.position = el.style.position || 'relative'
    const tip = el.getAttribute('loading-tip')
    const size = el.getAttribute('loading-size')
    const delay = Number(el.getAttribute('loading-delay'))
    const fullScreen = !!binding.modifiers.fullScreen
    const instance = createLoading(
      {
        loading: binding.value,
        tip,
        size,
        delay: isNaN(delay) ? 0 : delay,
        fullScreen
      },
      fullScreen ? document.body : el
    )
    el.instance = instance
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.instance?.setLoading(binding.value)
    }
  },
  unmounted(el) {
    el.instance?.close()
  }
}

export default loadingDirective
