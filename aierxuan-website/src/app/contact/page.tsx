'use client'

import { Suspense } from 'react'
import { RFQForm } from '@/components/forms/RFQForm'
import { useLanguage } from '@/store/useAppStore'

// Contact page translations
const contactPageTexts = {
  en: {
    title: 'Contact Us',
    subtitle: 'Get in touch with our team for personalized industrial automation solutions',
    description: 'Ready to transform your manufacturing processes? Our experts are here to help you find the perfect industrial automation solution for your needs.',
    contactInfo: 'Contact Information',
    address: 'Address',
    addressValue: 'Industrial District, City, Country',
    phone: 'Phone',
    phoneValue: '+86 123 456 7890',
    email: 'Email',
    emailValue: 'admin@aierxuanlaptop.com',
    businessHours: 'Business Hours',
    businessHoursValue: 'Monday - Friday: 9:00 AM - 6:00 PM (GMT+8)',
    responseTime: 'Response Time',
    responseTimeValue: 'We typically respond within 24 hours',
    whyChooseUs: 'Why Choose AIERXUAN?',
    reasons: [
      'Over 10 years of experience in industrial automation',
      'Comprehensive product range for all your needs',
      'Expert technical support and consultation',
      '24/7 customer service and after-sales support',
      'Competitive pricing and flexible payment terms',
      'Global shipping and local support'
    ]
  },
  ru: {
    title: 'Свяжитесь с нами',
    subtitle: 'Свяжитесь с нашей командой для персонализированных решений промышленной автоматизации',
    description: 'Готовы трансформировать ваши производственные процессы? Наши эксперты готовы помочь вам найти идеальное решение промышленной автоматизации для ваших нужд.',
    contactInfo: 'Контактная информация',
    address: 'Адрес',
    addressValue: 'Промышленный район, Город, Страна',
    phone: 'Телефон',
    phoneValue: '+86 123 456 7890',
    email: 'Электронная почта',
    emailValue: 'info@aierxuan.com',
    businessHours: 'Рабочие часы',
    businessHoursValue: 'Понедельник - Пятница: 9:00 - 18:00 (GMT+8)',
    responseTime: 'Время ответа',
    responseTimeValue: 'Мы обычно отвечаем в течение 24 часов',
    whyChooseUs: 'Почему выбирают AIERXUAN?',
    reasons: [
      'Более 10 лет опыта в промышленной автоматизации',
      'Комплексный ассортимент продукции для всех ваших нужд',
      'Экспертная техническая поддержка и консультации',
      'Круглосуточное обслуживание клиентов и послепродажная поддержка',
      'Конкурентные цены и гибкие условия оплаты',
      'Глобальная доставка и местная поддержка'
    ]
  },
  ja: {
    title: 'お問い合わせ',
    subtitle: 'パーソナライズされた産業オートメーションソリューションについて、チームにお問い合わせください',
    description: '製造プロセスの変革の準備はできていますか？私たちの専門家が、お客様のニーズに最適な産業オートメーションソリューションを見つけるお手伝いをします。',
    contactInfo: '連絡先情報',
    address: '住所',
    addressValue: '工業地区、市、国',
    phone: '電話',
    phoneValue: '+86 123 456 7890',
    email: 'メール',
    emailValue: 'info@aierxuan.com',
    businessHours: '営業時間',
    businessHoursValue: '月曜日 - 金曜日: 9:00 AM - 6:00 PM (GMT+8)',
    responseTime: '応答時間',
    responseTimeValue: '通常24時間以内に返信いたします',
    whyChooseUs: 'なぜAIERXUANを選ぶのか？',
    reasons: [
      '産業オートメーションにおける10年以上の経験',
      'すべてのニーズに対応する包括的な製品ラインナップ',
      '専門的な技術サポートとコンサルテーション',
      '24時間365日のカスタマーサービスとアフターサポート',
      '競争力のある価格と柔軟な支払い条件',
      'グローバル配送と現地サポート'
    ]
  },
  fr: {
    title: 'Contactez-nous',
    subtitle: 'Contactez notre équipe pour des solutions d\'automatisation industrielle personnalisées',
    description: 'Prêt à transformer vos processus de fabrication ? Nos experts sont là pour vous aider à trouver la solution d\'automatisation industrielle parfaite pour vos besoins.',
    contactInfo: 'Informations de contact',
    address: 'Adresse',
    addressValue: 'District industriel, Ville, Pays',
    phone: 'Téléphone',
    phoneValue: '+86 123 456 7890',
    email: 'E-mail',
    emailValue: 'info@aierxuan.com',
    businessHours: 'Heures d\'ouverture',
    businessHoursValue: 'Lundi - Vendredi: 9h00 - 18h00 (GMT+8)',
    responseTime: 'Temps de réponse',
    responseTimeValue: 'Nous répondons généralement dans les 24 heures',
    whyChooseUs: 'Pourquoi choisir AIERXUAN ?',
    reasons: [
      'Plus de 10 ans d\'expérience en automatisation industrielle',
      'Gamme de produits complète pour tous vos besoins',
      'Support technique expert et consultation',
      'Service client 24/7 et support après-vente',
      'Prix compétitifs et conditions de paiement flexibles',
      'Expédition mondiale et support local'
    ]
  },
  pt: {
    title: 'Entre em Contato',
    subtitle: 'Entre em contato com nossa equipe para soluções personalizadas de automação industrial',
    description: 'Pronto para transformar seus processos de fabricação? Nossos especialistas estão aqui para ajudá-lo a encontrar a solução perfeita de automação industrial para suas necessidades.',
    contactInfo: 'Informações de Contato',
    address: 'Endereço',
    addressValue: 'Distrito Industrial, Cidade, País',
    phone: 'Telefone',
    phoneValue: '+86 123 456 7890',
    email: 'E-mail',
    emailValue: 'info@aierxuan.com',
    businessHours: 'Horário Comercial',
    businessHoursValue: 'Segunda - Sexta: 9:00 - 18:00 (GMT+8)',
    responseTime: 'Tempo de Resposta',
    responseTimeValue: 'Normalmente respondemos em 24 horas',
    whyChooseUs: 'Por que escolher a AIERXUAN?',
    reasons: [
      'Mais de 10 anos de experiência em automação industrial',
      'Linha completa de produtos para todas as suas necessidades',
      'Suporte técnico especializado e consultoria',
      'Atendimento ao cliente 24/7 e suporte pós-venda',
      'Preços competitivos e condições de pagamento flexíveis',
      'Envio global e suporte local'
    ]
  },
  'zh-CN': {
    title: '联系我们',
    subtitle: '联系我们的团队，获取个性化的工业自动化解决方案',
    description: '准备好改变您的制造流程了吗？我们的专家随时为您找到完美的工业自动化解决方案。',
    contactInfo: '联系信息',
    address: '地址',
    addressValue: '工业区，城市，国家',
    phone: '电话',
    phoneValue: '+86 123 456 7890',
    email: '邮箱',
    emailValue: 'info@aierxuan.com',
    businessHours: '营业时间',
    businessHoursValue: '周一至周五：上午9:00 - 下午6:00 (GMT+8)',
    responseTime: '响应时间',
    responseTimeValue: '我们通常在24小时内回复',
    whyChooseUs: '为什么选择AIERXUAN？',
    reasons: [
      '在工业自动化领域拥有超过10年的经验',
      '全面的产品系列满足您的所有需求',
      '专业的技术支持和咨询',
      '24/7客户服务和售后支持',
      '有竞争力的价格和灵活的付款条件',
      '全球发货和本地支持'
    ]
  }
}

export default function ContactPage() {
  const language = useLanguage()
  const texts = contactPageTexts[language] || contactPageTexts.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/images/contact-hero-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        {/* Light blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/15 to-blue-700/10"></div>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-lg">
              {texts.title}
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto drop-shadow-md">
              {texts.subtitle}
            </p>
            <p className="mt-4 text-lg text-blue-200 max-w-2xl mx-auto drop-shadow-md">
              {texts.description}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="flex justify-center items-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div></div>}>
                <RFQForm />
              </Suspense>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Contact Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {texts.contactInfo}
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{texts.address}</p>
                      <p className="text-sm text-gray-600">{texts.addressValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{texts.phone}</p>
                      <p className="text-sm text-gray-600">{texts.phoneValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{texts.email}</p>
                      <p className="text-sm text-gray-600">{texts.emailValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{texts.businessHours}</p>
                      <p className="text-sm text-gray-600">{texts.businessHoursValue}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{texts.responseTime}</p>
                      <p className="text-sm text-gray-600">{texts.responseTimeValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {texts.whyChooseUs}
                </h3>
                
                <ul className="space-y-3">
                  {texts.reasons.map((reason, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{reason}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
