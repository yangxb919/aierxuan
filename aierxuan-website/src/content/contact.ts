/**
 * 联系页面文案配置
 */

export interface ContactContent {
  title: string
  subtitle: string
  description: string
  form: {
    title: string
    name: string
    email: string
    phone: string
    company: string
    message: string
    productInterest: string
    quantity: string
    industry: string
    contactMethod: string
    submit: string
    submitting: string
    required: string
    optional: string
  }
  contactInfo: {
    title: string
    address: string
    phone: string
    email: string
    hours: string
  }
  success: {
    title: string
    message: string
    close: string
  }
  error: {
    title: string
    message: string
    retry: string
  }
}

export const contactContent: Record<string, ContactContent> = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in Touch',
    description: 'Ready to discuss your automation needs? Contact us today for expert consultation and solutions.',
    form: {
      title: 'Send us a message',
      name: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      company: 'Company Name',
      message: 'Your Message',
      productInterest: 'Product Interest',
      quantity: 'Quantity Needed',
      industry: 'Your Industry',
      contactMethod: 'Preferred Contact Method',
      submit: 'Send Message',
      submitting: 'Sending...',
      required: 'Required field',
      optional: 'Optional'
    },
    contactInfo: {
      title: 'Contact Information',
      address: 'Juyin Science and Technology Industrial Park, Jihua Street, Longgang District, Shenzhen, China',
      phone: '4008-8228-058',
      email: 'admin@aierxuanlaptop.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM (GMT+8)'
    },
    success: {
      title: 'Message Sent Successfully!',
      message: 'Thank you for contacting us. We will respond within 24 hours.',
      close: 'Close'
    },
    error: {
      title: 'Failed to Send Message',
      message: 'Please check your information and try again.',
      retry: 'Try Again'
    }
  },
  'zh-CN': {
    title: '联系我们',
    subtitle: '取得联系',
    description: '准备好讨论您的自动化需求了吗？立即联系我们，获取专业咨询和解决方案。',
    form: {
      title: '发送消息',
      name: '姓名',
      email: '邮箱地址',
      phone: '电话号码',
      company: '公司名称',
      message: '您的消息',
      productInterest: '感兴趣的产品',
      quantity: '需要数量',
      industry: '所属行业',
      contactMethod: '首选联系方式',
      submit: '发送消息',
      submitting: '发送中...',
      required: '必填项',
      optional: '选填项'
    },
    contactInfo: {
      title: '联系信息',
      address: '深圳市龙岗区吉华街道聚银科技产业园',
      phone: '4008-8228-058',
      email: 'admin@aierxuanlaptop.com',
      hours: '周一至周五: 上午9:00 - 下午6:00 (GMT+8)'
    },
    success: {
      title: '消息发送成功！',
      message: '感谢您的联系，我们将在24小时内回复。',
      close: '关闭'
    },
    error: {
      title: '发送失败',
      message: '请检查信息后重试。',
      retry: '重试'
    }
  },
  // 其他语言版本...
  ru: {
    title: 'Связаться с нами',
    subtitle: 'На связи',
    description: 'Готовы обсудить ваши потребности в автоматизации? Свяжитесь с нами сегодня для получения экспертной консультации и решений.',
    form: {
      title: 'Отправить сообщение',
      name: 'Полное имя',
      email: 'Адрес электронной почты',
      phone: 'Номер телефона',
      company: 'Название компании',
      message: 'Ваше сообщение',
      productInterest: 'Интерес к продукту',
      quantity: 'Необходимое количество',
      industry: 'Ваша отрасль',
      contactMethod: 'Предпочтительный способ связи',
      submit: 'Отправить сообщение',
      submitting: 'Отправка...',
      required: 'Обязательное поле',
      optional: 'Необязательно'
    },
    contactInfo: {
      title: 'Контактная информация',
      address: 'Индустриальный парк науки и технологий Juyin, улица Jihua, район Longgang, Шэньчжэнь, Китай',
      phone: '4008-8228-058',
      email: 'admin@aierxuanlaptop.com',
      hours: 'Пн-Пт: 9:00 - 18:00 (GMT+8)'
    },
    success: {
      title: 'Сообщение отправлено успешно!',
      message: 'Спасибо за обращение. Мы ответим в течение 24 часов.',
      close: 'Закрыть'
    },
    error: {
      title: 'Не удалось отправить сообщение',
      message: 'Проверьте информацию и попробуйте снова.',
      retry: 'Попробовать снова'
    }
  }
}

export const CONTACT_CONTENT_LIMITS = {
  title: { max: 30, recommended: { min: 5, max: 15 } },
  subtitle: { max: 40, recommended: { min: 8, max: 20 } },
  description: { max: 200, recommended: { min: 50, max: 150 } }
} as const