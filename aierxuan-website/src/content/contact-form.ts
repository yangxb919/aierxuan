/**
 * 联系表单文案配置
 * 支持多语言，包含表单字段、验证信息、提交状态等
 */

export interface ContactFormContent {
  title: string
  subtitle: string
  fields: {
    name: {
      label: string
      placeholder: string
      required: string
    }
    company: {
      label: string
      placeholder: string
      required: string
    }
    email: {
      label: string
      placeholder: string
      required: string
      invalid: string
    }
    message: {
      label: string
      placeholder: string
      required: string
      minLength: string
    }
  }
  buttons: {
    submit: string
    cancel: string
    submitting: string
  }
  messages: {
    success: string
    error: string
    loading: string
  }
}

export const contactFormContent: Record<string, ContactFormContent> = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team for inquiries, quotes, or technical support.',
    fields: {
      name: {
        label: 'Full Name *',
        placeholder: 'Enter your full name',
        required: 'Name is required'
      },
      company: {
        label: 'Company *',
        placeholder: 'Enter your company name',
        required: 'Company is required'
      },
      email: {
        label: 'Email Address *',
        placeholder: 'Enter your email address',
        required: 'Email is required',
        invalid: 'Please enter a valid email address'
      },
      message: {
        label: 'Message *',
        placeholder: 'Tell us about your requirements...',
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters'
      }
    },
    buttons: {
      submit: 'Send Message',
      cancel: 'Cancel',
      submitting: 'Sending...'
    },
    messages: {
      success: 'Thank you for your message! We will get back to you within 24 hours.',
      error: 'Failed to send message. Please try again or contact us directly.',
      loading: 'Sending your message...'
    }
  },
  ru: {
    title: 'Связаться с нами',
    subtitle: 'Свяжитесь с нашей командой для получения консультаций, предложений или технической поддержки.',
    fields: {
      name: {
        label: 'Полное имя *',
        placeholder: 'Введите ваше полное имя',
        required: 'Имя обязательно'
      },
      company: {
        label: 'Компания *',
        placeholder: 'Введите название компании',
        required: 'Название компании обязательно'
      },
      email: {
        label: 'Email адрес *',
        placeholder: 'Введите ваш email адрес',
        required: 'Email обязателен',
        invalid: 'Пожалуйста, введите корректный email адрес'
      },
      message: {
        label: 'Сообщение *',
        placeholder: 'Расскажите нам о ваших требованиях...',
        required: 'Сообщение обязательно',
        minLength: 'Сообщение должно содержать минимум 10 символов'
      }
    },
    buttons: {
      submit: 'Отправить',
      cancel: 'Отмена',
      submitting: 'Отправка...'
    },
    messages: {
      success: 'Спасибо за ваше сообщение! Мы свяжемся с вами в течение 24 часов.',
      error: 'Не удалось отправить сообщение. Попробуйте еще раз или свяжитесь с нами напрямую.',
      loading: 'Отправка вашего сообщения...'
    }
  },
  ja: {
    title: 'お問い合わせ',
    subtitle: 'お見積もり、技術サポートなど、弊社チームまでお気軽にお問い合わせください。',
    fields: {
      name: {
        label: 'お名前 *',
        placeholder: 'お名前を入力してください',
        required: 'お名前は必須です'
      },
      company: {
        label: '会社名 *',
        placeholder: '会社名を入力してください',
        required: '会社名は必須です'
      },
      email: {
        label: 'メールアドレス *',
        placeholder: 'メールアドレスを入力してください',
        required: 'メールアドレスは必須です',
        invalid: '有効なメールアドレスを入力してください'
      },
      message: {
        label: 'メッセージ *',
        placeholder: 'ご要望をお聞かせください...',
        required: 'メッセージは必須です',
        minLength: 'メッセージは最低10文字以上で入力してください'
      }
    },
    buttons: {
      submit: '送信',
      cancel: 'キャンセル',
      submitting: '送信中...'
    },
    messages: {
      success: 'メッセージありがとうございます！24時間以内にご連絡いたします。',
      error: 'メッセージの送信に失敗しました。再試行するか、直接お問い合わせください。',
      loading: 'メッセージを送信中...'
    }
  },
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Contactez notre équipe pour des demandes, des devis ou un support technique.',
    fields: {
      name: {
        label: 'Nom complet *',
        placeholder: 'Entrez votre nom complet',
        required: 'Le nom est requis'
      },
      company: {
        label: 'Entreprise *',
        placeholder: 'Entrez le nom de votre entreprise',
        required: 'L\'entreprise est requise'
      },
      email: {
        label: 'Adresse email *',
        placeholder: 'Entrez votre adresse email',
        required: 'L\'email est requis',
        invalid: 'Veuillez entrer une adresse email valide'
      },
      message: {
        label: 'Message *',
        placeholder: 'Décrivez vos besoins...',
        required: 'Le message est requis',
        minLength: 'Le message doit contenir au moins 10 caractères'
      }
    },
    buttons: {
      submit: 'Envoyer',
      cancel: 'Annuler',
      submitting: 'Envoi...'
    },
    messages: {
      success: 'Merci pour votre message! Nous vous répondrons dans les 24 heures.',
      error: 'Échec de l\'envoi du message. Veuillez réessayer ou nous contacter directement.',
      loading: 'Envoi de votre message...'
    }
  },
  pt: {
    title: 'Entre em Contato',
    subtitle: 'Entre em contato com nossa equipe para consultas, orçamentos ou suporte técnico.',
    fields: {
      name: {
        label: 'Nome Completo *',
        placeholder: 'Digite seu nome completo',
        required: 'Nome é obrigatório'
      },
      company: {
        label: 'Empresa *',
        placeholder: 'Digite o nome da sua empresa',
        required: 'Empresa é obrigatória'
      },
      email: {
        label: 'Endereço de Email *',
        placeholder: 'Digite seu endereço de email',
        required: 'Email é obrigatório',
        invalid: 'Por favor, digite um endereço de email válido'
      },
      message: {
        label: 'Mensagem *',
        placeholder: 'Conte-nos sobre seus requisitos...',
        required: 'Mensagem é obrigatória',
        minLength: 'A mensagem deve ter pelo menos 10 caracteres'
      }
    },
    buttons: {
      submit: 'Enviar Mensagem',
      cancel: 'Cancelar',
      submitting: 'Enviando...'
    },
    messages: {
      success: 'Obrigado pela sua mensagem! Entraremos em contato dentro de 24 horas.',
      error: 'Falha ao enviar mensagem. Tente novamente ou entre em contato diretamente.',
      loading: 'Enviando sua mensagem...'
    }
  },
  'zh-CN': {
    title: '联系我们',
    subtitle: '联系我们的团队获取咨询、报价或技术支持。',
    fields: {
      name: {
        label: '姓名 *',
        placeholder: '请输入您的姓名',
        required: '姓名为必填项'
      },
      company: {
        label: '公司 *',
        placeholder: '请输入您的公司名称',
        required: '公司名称为必填项'
      },
      email: {
        label: '邮箱地址 *',
        placeholder: '请输入您的邮箱地址',
        required: '邮箱为必填项',
        invalid: '请输入有效的邮箱地址'
      },
      message: {
        label: '留言内容 *',
        placeholder: '请告诉我们您的需求...',
        required: '留言内容为必填项',
        minLength: '留言内容至少需要10个字符'
      }
    },
    buttons: {
      submit: '发送消息',
      cancel: '取消',
      submitting: '发送中...'
    },
    messages: {
      success: '感谢您的留言！我们将在24小时内与您联系。',
      error: '发送失败，请重试或直接联系我们。',
      loading: '正在发送您的消息...'
    }
  }
}