let menu = {
  admin: [
    {
      id: 1,
      label: '首页',
      href: '/home/index',
      icon: 'fa fa-home',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 1,
      label: '权限',
      href: '/auth/index',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    },
    {
      id: 1,
      label: '实例',
      href: '#',
      icon: 'fa fa-file-text',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: [
        {
          id: 1,
          label: '实例1',
          href: '/demo/index',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例2',
          href: '/demo/faculty',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例3',
          href: '/demo/subject',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        },
        {
          id: 1,
          label: '实例4',
          href: '/demo/school-manage',
          icon: 'fa fa-file-text',
          permission: ['view', 'add', 'delete', 'edit'],
          show: true,
          children: []
        }
      ]
    }
  ],
  user: [
    {
      id: 1,
      label: '首页',
      href: '/home/index',
      icon: 'fa fa-home',
      permission: ['view', 'add', 'delete', 'edit'],
      show: true,
      children: []
    }
  ]
}
export default menu
