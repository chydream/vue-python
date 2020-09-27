const getters = {
    token: state => state.user.token,
    role: state => state.user.role,
    userInfo: state => state.user.userInfo,
    appInfo: state => state.user.appInfo,
    permissionList: state => state.user.permission,
    menu: state => state.user.menu,
    tenantId: state => state.user.tenantId,
    isCollapse: state => state.common.isCollapse,
    tagList: state => state.common.tagList,
    tagCurrent: state => state.common.tag,
    isFullScreen: state => state.common.isFullScreen,
    keepAlive: state => state.common.keepAlive,
    keepAlivePage: state => state.common.keepAlivePage,
    keepAlivePath: state => state.common.keepAlivePath
}
export default getters
