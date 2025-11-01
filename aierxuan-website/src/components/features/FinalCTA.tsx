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
    description: 'Fill out the form below and our team will get back to you within 2 hours with a detailed quotation.',
    form: {
      name: 'Name (Optional)',
      namePlaceholder: 'John Doe',
      email: 'Email Address',
      emailPlaceholder: 'john@company.com',
      country: 'Country (Optional)',
      countryPlaceholder: 'Select your country',
      productInterest: 'Product Interest (Optional)',
      productInterestPlaceholder: 'Which products are you interested in?',
      message: 'Message (Optional)',
      messagePlaceholder: 'Tell us about your project requirements, quantity, timeline, etc.',
      submit: 'Submit Request',
      submitting: 'Submitting...'
    },
    validation: {
      emailRequired: 'Email is required',
      emailInvalid: 'Please enter a valid email'
    },
    success: 'Thank you! We will contact you soon.',
    error: 'Failed to submit. Please try again.',
    responseTime: '⚡ We typically respond within 2 hours',
    privacyNote: 'Your information will be kept confidential and used only to respond to your inquiry.',
    productCategories: [
      'Industrial Panel PC',
      'Mini PC',
      'Embedded System',
      'Touch Display',
      'IoT Gateway',
      'Other'
    ],
    features: [
      { icon: '⚡', text: 'Fast Response within 2 hours' },
      { icon: '💰', text: 'Competitive Pricing' },
      { icon: '🎨', text: 'Full Customization Options' },
      { icon: '🌍', text: 'Global Shipping Available' }
    ]
  },
  ru: {
    title: 'Готовы начать?',
    subtitle: 'Получите индивидуальное предложение для вашего бизнеса',
    description: 'Заполните форму ниже, и наша команда свяжется с вами в течение 2 часов с подробным предложением.',
    form: {
      name: 'Имя (необязательно)',
      namePlaceholder: 'Иван Иванов',
      email: 'Адрес электронной почты',
      emailPlaceholder: 'ivan@company.com',
      country: 'Страна (необязательно)',
      countryPlaceholder: 'Выберите вашу страну',
      productInterest: 'Интересующий продукт (необязательно)',
      productInterestPlaceholder: 'Какие продукты вас интересуют?',
      message: 'Сообщение (необязательно)',
      messagePlaceholder: 'Расскажите нам о требованиях к проекту, количестве, сроках и т.д.',
      submit: 'Отправить запрос',
      submitting: 'Отправка...'
    },
    validation: {
      emailRequired: 'Email обязателен',
      emailInvalid: 'Введите действительный email'
    },
    success: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
    error: 'Не удалось отправить. Попробуйте еще раз.',
    responseTime: '⚡ Обычно мы отвечаем в течение 2 часов',
    privacyNote: 'Ваша информация будет конфиденциальной и использована только для ответа на ваш запрос.',
    productCategories: [
      'Промышленный панельный ПК',
      'Мини ПК',
      'Встраиваемая система',
      'Сенсорный дисплей',
      'IoT шлюз',
      'Другое'
    ],
    features: [
      { icon: '⚡', text: 'Быстрый ответ в течение 2 часов' },
      { icon: '💰', text: 'Конкурентные цены' },
      { icon: '🎨', text: 'Полная настройка' },
      { icon: '🌍', text: 'Доставка по всему миру' }
    ]
  },
  ja: {
    title: '始める準備はできましたか？',
    subtitle: 'ビジネスニーズに合わせたカスタマイズされた見積もりを取得',
    description: '以下のフォームに記入してください。2時間以内に詳細な見積もりをお送りします。',
    form: {
      name: '名前（オプション）',
      namePlaceholder: '山田太郎',
      email: 'メールアドレス',
      emailPlaceholder: 'yamada@company.com',
      country: '国（オプション）',
      countryPlaceholder: '国を選択してください',
      productInterest: '興味のある製品（オプション）',
      productInterestPlaceholder: 'どの製品に興味がありますか？',
      message: 'メッセージ（オプション）',
      messagePlaceholder: 'プロジェクトの要件、数量、タイムラインなどをお知らせください。',
      submit: 'リクエストを送信',
      submitting: '送信中...'
    },
    validation: {
      emailRequired: 'メールは必須です',
      emailInvalid: '有効なメールアドレスを入力してください'
    },
    success: 'ありがとうございます！すぐにご連絡いたします。',
    error: '送信に失敗しました。もう一度お試しください。',
    responseTime: '⚡ 通常2時間以内に返信いたします',
    privacyNote: 'お客様の情報は機密として扱われ、お問い合わせへの返信のみに使用されます。',
    productCategories: [
      '産業用パネルPC',
      'ミニPC',
      '組込みシステム',
      'タッチディスプレイ',
      'IoTゲートウェイ',
      'その他'
    ],
    features: [
      { icon: '⚡', text: '2時間以内の迅速な対応' },
      { icon: '💰', text: '競争力のある価格' },
      { icon: '🎨', text: '完全なカスタマイズオプション' },
      { icon: '🌍', text: '世界中への配送可能' }
    ]
  },
  fr: {
    title: 'Prêt à commencer?',
    subtitle: 'Obtenez un devis personnalisé pour vos besoins professionnels',
    description: 'Remplissez le formulaire ci-dessous et notre équipe vous répondra dans les 2 heures avec un devis détaillé.',
    form: {
      name: 'Nom (facultatif)',
      namePlaceholder: 'Jean Dupont',
      email: 'Adresse e-mail',
      emailPlaceholder: 'jean@entreprise.com',
      country: 'Pays (facultatif)',
      countryPlaceholder: 'Sélectionnez votre pays',
      productInterest: 'Produit d\'intérêt (facultatif)',
      productInterestPlaceholder: 'Quels produits vous intéressent?',
      message: 'Message (facultatif)',
      messagePlaceholder: 'Parlez-nous de vos besoins de projet, quantité, délais, etc.',
      submit: 'Soumettre la demande',
      submitting: 'Envoi en cours...'
    },
    validation: {
      emailRequired: 'L\'e-mail est requis',
      emailInvalid: 'Veuillez entrer un e-mail valide'
    },
    success: 'Merci! Nous vous contactons bientôt.',
    error: 'Échec de l\'envoi. Veuillez réessayer.',
    responseTime: '⚡ Nous répondons généralement dans les 2 heures',
    privacyNote: 'Vos informations seront gardées confidentielles et utilisées uniquement pour répondre à votre demande.',
    productCategories: [
      'PC industriel à panneau',
      'Mini PC',
      'Système embarqué',
      'Écran tactile',
      'Passerelle IoT',
      'Autre'
    ],
    features: [
      { icon: '⚡', text: 'Réponse rapide dans les 2 heures' },
      { icon: '💰', text: 'Prix compétitifs' },
      { icon: '🎨', text: 'Options de personnalisation complètes' },
      { icon: '🌍', text: 'Expédition mondiale disponible' }
    ]
  },
  pt: {
    title: 'Pronto para começar?',
    subtitle: 'Obtenha uma cotação personalizada para suas necessidades de negócios',
    description: 'Preencha o formulário abaixo e nossa equipe entrará em contato em até 2 horas com uma cotação detalhada.',
    form: {
      name: 'Nome (opcional)',
      namePlaceholder: 'João Silva',
      email: 'Endereço de e-mail',
      emailPlaceholder: 'joao@empresa.com',
      country: 'País (opcional)',
      countryPlaceholder: 'Selecione seu país',
      productInterest: 'Interesse em produto (opcional)',
      productInterestPlaceholder: 'Quais produtos lhe interessam?',
      message: 'Mensagem (opcional)',
      messagePlaceholder: 'Conte-nos sobre os requisitos do projeto, quantidade, cronograma, etc.',
      submit: 'Enviar solicitação',
      submitting: 'Enviando...'
    },
    validation: {
      emailRequired: 'E-mail é obrigatório',
      emailInvalid: 'Por favor, insira um e-mail válido'
    },
    success: 'Obrigado! Entraremos em contato em breve.',
    error: 'Falha ao enviar. Por favor, tente novamente.',
    responseTime: '⚡ Normalmente respondemos em 2 horas',
    privacyNote: 'Suas informações serão mantidas confidenciais e usadas apenas para responder à sua consulta.',
    productCategories: [
      'PC industrial de painel',
      'Mini PC',
      'Sistema embarcado',
      'Display touch',
      'Gateway IoT',
      'Outro'
    ],
    features: [
      { icon: '⚡', text: 'Resposta rápida em 2 horas' },
      { icon: '💰', text: 'Preços competitivos' },
      { icon: '🎨', text: 'Opções de personalização completas' },
      { icon: '🌍', text: 'Envio global disponível' }
    ]
  },
  'zh-CN': {
    title: '准备好开始了吗？',
    subtitle: '获取适合您业务需求的定制报价',
    description: '填写下面的表单，我们的团队将在 2 小时内回复您并提供详细报价。',
    form: {
      name: '姓名（可选）',
      namePlaceholder: '张三',
      email: '电子邮箱',
      emailPlaceholder: 'zhangsan@company.com',
      country: '国家（可选）',
      countryPlaceholder: '选择您的国家',
      productInterest: '感兴趣的产品（可选）',
      productInterestPlaceholder: '您对哪些产品感兴趣？',
      message: '留言（可选）',
      messagePlaceholder: '告诉我们您的项目需求、数量、时间表等。',
      submit: '提交询盘',
      submitting: '提交中...'
    },
    validation: {
      emailRequired: '邮箱为必填项',
      emailInvalid: '请输入有效的邮箱地址'
    },
    success: '感谢您！我们将尽快与您联系。',
    error: '提交失败，请重试。',
    responseTime: '⚡ 我们通常在2小时内回复',
    privacyNote: '您的信息将被保密，仅用于回复您的询盘。',
    productCategories: [
      '工业平板电脑',
      '迷你电脑',
      '嵌入式系统',
      '触摸显示器',
      '物联网网关',
      '其他'
    ],
    features: [
      { icon: '⚡', text: '2 小时内快速响应' },
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
    email: '',
    country: '',
    productInterest: '',
    message: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Only email is required
    if (!formData.email.trim()) {
      newErrors.email = t.validation.emailRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.validation.emailInvalid
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
          name: formData.name || null,
          company: formData.country || null, // Using company field to store country temporarily
          email: formData.email,
          phone: formData.productInterest || null, // Using phone field to store product interest temporarily
          message: formData.message || null,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <form onSubmit={handleSubmit} className="space-y-5">
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
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.email} <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.form.emailPlaceholder}
                  className={errors.email ? 'border-red-500' : ''}
                  required
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.country}
                </label>
                <Input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder={t.form.countryPlaceholder}
                />
              </div>

              {/* Product Interest */}
              <div>
                <label htmlFor="productInterest" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.productInterest}
                </label>
                <select
                  id="productInterest"
                  name="productInterest"
                  value={formData.productInterest}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">{t.form.productInterestPlaceholder}</option>
                  {t.productCategories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.form.messagePlaceholder}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Response Time Promise */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                {t.responseTime}
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 italic">
                {t.privacyNote}
              </p>

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

