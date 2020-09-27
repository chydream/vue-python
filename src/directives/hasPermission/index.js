const hasPermission = {
    install (Vue) {
        Vue.directive('hasPermission', {
            bind (el, binding, vnode) {
            },
            inserted (el, binding, vnode) {
                var arr = vnode.context.$route.path.split('/')
                var module = arr[arr.length - 1]
                let permissionList = vnode.context.$store.getters.permissionList
                if (!permissionList) {
                    return
                }
                if (permissionList.length == 0) {
                    return
                }
                // console.log(module + ':' + binding.value)
                if (!permissionList.includes(binding.value)) {
                    el.parentNode.removeChild(el)
                    // el.setAttribute('disabled', 'true')
                    // el.setAttribute('style', 'color: #C0C4CC;cursor: not-allowed;')
                }
            },
            update (el, binding) { 
            },
            componentUpdated (el, binding) {
            },
            unbind (el, binding) {
            }
        })
    }
}
export default hasPermission
