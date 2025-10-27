/**
 * 通用文案配置
 * 按钮状态、表单标签、错误信息等
 */

export interface CommonContent {
  buttons: {
    submit: string
    cancel: string
    save: string
    edit: string
    delete: string
    view: string
    back: string
    next: string
    previous: string
    close: string
    loading: string
  }
  form: {
    required: string
    optional: string
    email: string
    phone: string
    name: string
    message: string
    company: string
    search: string
  }
  status: {
    success: string
    error: string
    loading: string
    empty: string
  }
  navigation: {
    home: string
    about: string
    products: string
    contact: string
    blog: string
    admin: string
  }
}

export const commonContent: Record<string, CommonContent> = {
  en: {
    buttons: {
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      edit: 'Edit',
      delete: 'Delete',
      view: 'View',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      loading: 'Loading...'
    },
    form: {
      required: 'Required',
      optional: 'Optional',
      email: 'Email',
      phone: 'Phone',
      name: 'Name',
      message: 'Message',
      company: 'Company',
      search: 'Search'
    },
    status: {
      success: 'Success',
      error: 'Error',
      loading: 'Loading...',
      empty: 'No data available'
    },
    navigation: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      contact: 'Contact',
      blog: 'Blog',
      admin: 'Admin'
    }
  },
  'zh-CN': {
    buttons: {
      submit: '提交',
      cancel: '取消',
      save: '保存',
      edit: '编辑',
      delete: '删除',
      view: '查看',
      back: '返回',
      next: '下一步',
      previous: '上一步',
      close: '关闭',
      loading: '加载中...'
    },
    form: {
      required: '必填',
      optional: '选填',
      email: '邮箱',
      phone: '电话',
      name: '姓名',
      message: '留言',
      company: '公司',
      search: '搜索'
    },
    status: {
      success: '成功',
      error: '错误',
      loading: '加载中...',
      empty: '暂无数据'
    },
    navigation: {
      home: '首页',
      about: '关于',
      products: '产品',
      contact: '联系',
      blog: '博客',
      admin: '管理'
    }
  },
  // 其他语言版本可以类似添加...
}