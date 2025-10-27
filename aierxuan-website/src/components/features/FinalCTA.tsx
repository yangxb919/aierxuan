'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/store/useAppStore'
import { Button, Input } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'

// Translations
const translations = {
  en: {
    title: 'Ready to Get Started?',
    subtitle: 'Get a customized quote for your business needs',
    description: 'Fill out the form below and our team will get back to you within 24 hours with a detailed quotation.',
    form: {
      name: 'Full Name',
      namePlaceholder: 'John Doe',
      company: 'Company Name',
      companyPlaceholder: 'Your Company',
      email: 'Email Address',
      emailPlaceholder: 'john@company.com',
      phone: 'Phone Number (Optional)',
      phonePlaceholder: '+1 234 567 8900',
      requirements: 'Your Requirements',
      requirementsPlaceholder: 'Tell us about your project requirements, quantity, timeline, etc.',
      submit: 'Submit Request',
      submitting: 'Submitting...'
    },
    validation: {
      nameRequired: 'Name is required',
      companyRequired: 'Company name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email',
      requirementsRequired: 'Please describe your requirements'
    },
    success: 'Thank you! We will contact you soon.',
    error: 'Failed to submit. Please try again.',
    features: [
      { icon: '⚡', text: 'Fast Response within 24 hours' },
      { icon: '💰', text: 'Competitive Pricing' },
      { icon: '🎨', text: 'Full Customization Options' },
      { icon: '🌍', text: 'Global Shipping Available' }
    ]
  },
  ru: {
    title: 'Готовы начать?',
    subtitle: 'Получите индивидуальное предложение для вашего бизнеса',
    description: 'Заполните форму ниже, и наша команда свяжется с вами в течение 24 часов с подробным предложением.',
    form: {
      name: 'Полное имя',
      namePlaceholder: 'Иван Иванов',
      company: 'Название компании',
      companyPlaceholder: 'Ваша компания',
      email: 'Адрес электронной почты',
      emailPlaceholder: 'ivan@company.com',
      phone: 'Номер телефона (необязательно)',
      phonePlaceholder: '+7 123 456 7890',
      requirements: 'Ваши требования',
      requirementsPlaceholder: 'Расскажите нам о требованиях к проекту, количестве, сроках и т.д.',
      submit: 'Отправить запрос',
      submitting: 'Отправка...'
    },
    validation: {
      nameRequired: 'Имя обязательно',
      companyRequired: 'Название компании обязательно',
      emailRequired: 'Email обязателен',
      emailInvalid: 'Введите действительный email',
      requirementsRequired: 'Опишите ваши требования'
    },
    success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
    error: 'Не удалось отправить. Попробуйте еще раз.',
    features: [
      { icon: '⚡', text: 'Быстрый ответ в течение 24 часов' },
      { icon: '💰', text: 'Конкурентные цены' },
      { icon: '🎨', text: 'Полная настройка' },
      { icon: '🌍', text: 'Доставка по всему миру' }
    ]
  },
  ja: {
    title: '始める準備はできましたか？',
    subtitle: 'ビジネスニーズに合わせたカスタマイズされた見積もりを取得',
    description: '以下のフォームに記入してください。24時間以内に詳細な見積もりをお送りします。',
    form: {
      name: 'フルネーム',
      namePlaceholder: '山田太郎',
      company: '会社名',
      companyPlaceholder: 'あなたの会社',
      email: 'メールアドレス',
      emailPlaceholder: 'yamada@company.com',
      phone: '電話番号（オプション）',
      phonePlaceholder: '+81 90 1234 5678',
      requirements: 'ご要望',
      requirementsPlaceholder: 'プロジェクトの要件、数量、タイムラインなどをお知らせください。',
      submit: 'リクエストを送信',
      submitting: '送信中...'
    },
    validation: {
      nameRequired: '名前は必須です',
      companyRequired: '会社名は必須です',
      emailRequired: 'メールは必須です',
      emailInvalid: '有効なメールアドレスを入力してください',
      requirementsRequired: '要件を説明してください'
    },
    success: 'ありがとうございます！すぐにご連絡いたします。',
    error: '送信に失敗しました。もう一度お試しください。',
    features: [
      { icon: '⚡', text: '24時間以内の迅速な対応' },
      { icon: '💰', text: '競争力のある価格' },
      { icon: '🎨', text: '完全なカスタマイズオプション' },
      { icon: '🌍', text: '世界中への配送可能' }
    ]
  },
  fr: {
    title: 'Prêt à commencer?',
    subtitle: 'Obtenez un devis personnalisé pour vos besoins professionnels',
    description: 'Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les 24 heures avec un devis détaillé.',
    form: {
      name: 'Nom complet',
      namePlaceholder: 'Jean Dupont',
      company: 'Nom de l\'entreprise',
      companyPlaceholder: 'Votre entreprise',
      email: 'Adresse e-mail',
      emailPlaceholder: 'jean@entreprise.com',
      phone: 'Numéro de téléphone (facultatif)',
      phonePlaceholder: '+33 1 23 45 67 89',
      requirements: 'Vos exigences',
      requirementsPlaceholder: 'Parlez-nous de vos besoins de projet, quantité, délais, etc.',
      submit: 'Soumettre la demande',
      submitting: 'Envoi en cours...'
    },
    validation: {
      nameRequired: 'Le nom est requis',
      companyRequired: 'Le nom de l\'entreprise est requis',
      emailRequired: 'L\'e-mail est requis',
      emailInvalid: 'Veuillez entrer un e-mail valide',
      requirementsRequired: 'Veuillez décrire vos exigences'
    },
    success: 'Merci! Nous vous contactons bientôt.',
    error: 'Échec de l\'envoi. Veuillez réessayer.',
    features: [
      { icon: '⚡', text: 'Réponse rapide dans les 24 heures' },
      { icon: '💰', text: 'Prix compétitifs' },
      { icon: '🎨', text: 'Options de personnalisation complètes' },
      { icon: '🌍', text: 'Expédition mondiale disponible' }
    ]
  },
  pt: {
    title: 'Pronto para começar?',
    subtitle: 'Obtenha uma cotação personalizada para suas necessidades de negócios',
    description: 'Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas com uma cotação detalhada.',
    form: {
      name: 'Nome completo',
      namePlaceholder: 'João Silva',
      company: 'Nome da empresa',
      companyPlaceholder: 'Sua empresa',
      email: 'Endereço de e-mail',
      emailPlaceholder: 'joao@empresa.com',
      phone: 'Número de telefone (opcional)',
      phonePlaceholder: '+55 11 98765 4321',
      requirements: 'Seus requisitos',
      requirementsPlaceholder: 'Conte-nos sobre os requisitos do projeto, quantidade, cronograma, etc.',
      submit: 'Enviar solicitação',
      submitting: 'Enviando...'
    },
    validation: {
      nameRequired: 'Nome é obrigatório',
      companyRequired: 'Nome da empresa é obrigatório',
      emailRequired: 'E-mail é obrigatório',
      emailInvalid: 'Por favor, insira um e-mail válido',
      requirementsRequired: 'Por favor, descreva seus requisitos'
    },
    success: 'Obrigado! Entraremos em contato em breve.',
    error: 'Falha ao enviar. Por favor, tente novamente.',
    features: [
      { icon: '⚡', text: 'Resposta rápida em 24 horas' },
      { icon: '💰', text: 'Preços competitivos' },
      { icon: '🎨', text: 'Opções de personalização completas' },
      { icon: '🌍', text: 'Envio global disponível' }
    ]
  },
  'zh-CN': {
    title: '准备好开始了吗？',
    subtitle: '获取适合您业务需求的定制报价',
    description: '填写下面的表单，我们的团队将在 24 小时内回复您并提供详细报价。',
    form: {
      name: '姓名',
      namePlaceholder: '张三',
      company: '公司名称',
      companyPlaceholder: '您的公司',
      email: '电子邮箱',
      emailPlaceholder: 'zhangsan@company.com',
      phone: '电话号码（可选）',
      phonePlaceholder: '+86 138 0000 0000',
      requirements: '您的需求',
      requirementsPlaceholder: '告诉我们您的项目需求、数量、时间表等。',
      submit: '提交询盘',
      submitting: '提交中...'
    },
    validation: {
      nameRequired: '姓名为必填项',
      companyRequired: '公司名称为必填项',
      emailRequired: '邮箱为必填项',
      emailInvalid: '请输入有效的邮箱地址',
      requirementsRequired: '请描述您的需求'
    },
    success: '感谢您！我们将尽快与您联系。',
    error: '提交失败，请重试。',
    features: [
      { icon: '⚡', text: '24 小时内快速响应' },
      { icon: '💰', text: '具有竞争力的价格' },
      { icon: '🎨', text: '完全定制选项' },
      { icon: '🌍', text: '全球配送' }
    ]
  }
}

export function FinalCTA() {
  const language = useLanguage()
  const t = translations[language] || translations.en
  const router = useRouter()
  const supabase = createSupabaseClient()

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    requirements: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = t.validation.nameRequired
    }
    if (!formData.company.trim()) {
      newErrors.company = t.validation.companyRequired
    }
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid
    }
    if (!formData.requirements.trim()) {
      newErrors.requirements = t.validation.requirementsRequired
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setSubmitting(true)

    try {
      // Important: use returning: 'minimal' so anon insert doesn't require SELECT permission
      const { error } = await supabase.from('rfqs').insert([
        {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.requirements,
          status: 'new',
          source: 'homepage_cta'
        }
      ], { returning: 'minimal' })

      if (error) throw error

      // Redirect to thank you page
      router.push('/thank-you')
    } catch (error) {
      console.error('Error submitting RFQ:', error)
      alert(t.error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/final-cta-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900 opacity-80"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
          {/* Left: Content */}
          <div className="mb-12 lg:mb-0">
            <h2 className="text-3xl font-bold sm:text-4xl mb-4">
              {t.title}
            </h2>
            <p className="text-xl text-blue-100 mb-6">
              {t.subtitle}
            </p>
            <p className="text-blue-100 mb-8">
              {t.description}
            </p>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {t.features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-2xl mr-3">{feature.icon}</span>
                  <span className="text-blue-100">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.name}
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t.form.namePlaceholder}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.company}
                </label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={t.form.companyPlaceholder}
                  className={errors.company ? 'border-red-500' : ''}
                />
                {errors.company && <p className="mt-1 text-sm text-red-600">{errors.company}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.email}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.form.emailPlaceholder}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.phone}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t.form.phonePlaceholder}
                />
              </div>

              {/* Requirements */}
              <div>
                <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.requirements}
                </label>
                <textarea
                  id="requirements"
                  name="requirements"
                  rows={4}
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder={t.form.requirementsPlaceholder}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.requirements ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.requirements && <p className="mt-1 text-sm text-red-600">{errors.requirements}</p>}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                size="lg"
                className="w-full"
                loading={submitting}
                disabled={submitting}
              >
                {submitting ? t.form.submitting : t.form.submit}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

