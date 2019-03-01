/**
 * Created by linfengluo@gmail.com  on 2019/2/28.
 */
import Touch from './touch'

export default {
    install(Vue: any, options: any = {}) {
        Vue.directive('longPress', {
            inserted(el: any, binding: any) {
                new Touch(el, binding.value, options)
            }
        })
    }
}
