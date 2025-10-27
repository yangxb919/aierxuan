'use client'

import Link from 'next/link'
import { Button } from '@/components/ui'
import { useLanguage } from '@/store/useAppStore'

// Thank you page translations
const thankYouPageTexts = {
  en: {
    title: 'Thank You!',
    subtitle: 'Your request has been submitted successfully',
    message: 'We have received your inquiry and our team will review it shortly. You can expect to hear from us within 24 hours during business days.',
    whatHappensNext: 'What happens next?',
    steps: [
      {
        title: 'Review & Analysis',
        description: 'Our technical team will review your requirements and analyze the best solutions for your needs.'
      },
      {
        title: 'Personalized Quote',
        description: 'We will prepare a detailed quote with pricing, specifications, and delivery timeline.'
      },
      {
        title: 'Follow-up Contact',
        description: 'Our sales representative will contact you to discuss the proposal and answer any questions.'
      }
    ],
    backToHome: 'Back to Home',
    browseProducts: 'Browse Products',
    contactInfo: 'Need immediate assistance?',
    phone: 'Call us: +86 123 456 7890',
    email: 'Email us: admin@aierxuanlaptop.com',
    businessHours: 'Business Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)',
    socialMedia: 'Follow us for updates',
    additionalResources: 'Additional Resources',
    resources: [
      { title: 'Product Catalog', href: '/products', description: 'Browse our complete product range' },
      { title: 'Technical Support', href: '/support', description: 'Get technical assistance' },
      { title: 'About Us', href: '/about', description: 'Learn more about our company' }
    ]
  },
  ru: {
    title: 'Спасибо!',
    subtitle: 'Ваш запрос был успешно отправлен',
    message: 'Мы получили ваш запрос, и наша команда скоро его рассмотрит. Ожидайте ответа от нас в течение 24 часов в рабочие дни.',
    whatHappensNext: 'Что происходит дальше?',
    steps: [
      {
        title: 'Обзор и анализ',
        description: 'Наша техническая команда рассмотрит ваши требования и проанализирует лучшие решения для ваших нужд.'
      },
      {
        title: 'Персональное предложение',
        description: 'Мы подготовим подробное предложение с ценами, спецификациями и сроками поставки.'
      },
      {
        title: 'Последующий контакт',
        description: 'Наш торговый представитель свяжется с вами, чтобы обсудить предложение и ответить на любые вопросы.'
      }
    ],
    backToHome: 'Вернуться на главную',
    browseProducts: 'Просмотреть продукты',
    contactInfo: 'Нужна немедленная помощь?',
    phone: 'Позвоните нам: +86 123 456 7890',
    email: 'Напишите нам: admin@aierxuanlaptop.com',
    businessHours: 'Рабочие часы: Понедельник - Пятница, 9:00 - 18:00 (GMT+8)',
    socialMedia: 'Следите за обновлениями',
    additionalResources: 'Дополнительные ресурсы',
    resources: [
      { title: 'Каталог продукции', href: '/products', description: 'Просмотрите наш полный ассортимент продукции' },
      { title: 'Техническая поддержка', href: '/support', description: 'Получите техническую помощь' },
      { title: 'О нас', href: '/about', description: 'Узнайте больше о нашей компании' }
    ]
  },
  ja: {
    title: 'ありがとうございます！',
    subtitle: 'お客様のリクエストが正常に送信されました',
    message: 'お問い合わせを受け取りました。チームが間もなく確認いたします。営業日の24時間以内にご連絡いたします。',
    whatHappensNext: '次に何が起こりますか？',
    steps: [
      {
        title: 'レビューと分析',
        description: '技術チームがお客様の要件を確認し、ニーズに最適なソリューションを分析します。'
      },
      {
        title: 'パーソナライズされた見積もり',
        description: '価格、仕様、納期を含む詳細な見積もりを準備いたします。'
      },
      {
        title: 'フォローアップ連絡',
        description: '営業担当者がお客様に連絡し、提案について話し合い、ご質問にお答えします。'
      }
    ],
    backToHome: 'ホームに戻る',
    browseProducts: '製品を見る',
    contactInfo: '緊急のサポートが必要ですか？',
    phone: 'お電話: +86 123 456 7890',
    email: 'メール: admin@aierxuanlaptop.com',
    businessHours: '営業時間: 月曜日 - 金曜日, 9:00 AM - 6:00 PM (GMT+8)',
    socialMedia: '最新情報をフォロー',
    additionalResources: '追加リソース',
    resources: [
      { title: '製品カタログ', href: '/products', description: '完全な製品ラインナップをご覧ください' },
      { title: 'テクニカルサポート', href: '/support', description: '技術的なサポートを受ける' },
      { title: '会社概要', href: '/about', description: '当社についてもっと知る' }
    ]
  },
  fr: {
    title: 'Merci !',
    subtitle: 'Votre demande a été soumise avec succès',
    message: 'Nous avons reçu votre demande et notre équipe va l\'examiner sous peu. Vous pouvez vous attendre à recevoir de nos nouvelles dans les 24 heures pendant les jours ouvrables.',
    whatHappensNext: 'Que se passe-t-il ensuite ?',
    steps: [
      {
        title: 'Examen et analyse',
        description: 'Notre équipe technique examinera vos exigences et analysera les meilleures solutions pour vos besoins.'
      },
      {
        title: 'Devis personnalisé',
        description: 'Nous préparerons un devis détaillé avec les prix, les spécifications et les délais de livraison.'
      },
      {
        title: 'Contact de suivi',
        description: 'Notre représentant commercial vous contactera pour discuter de la proposition et répondre à vos questions.'
      }
    ],
    backToHome: 'Retour à l\'accueil',
    browseProducts: 'Parcourir les produits',
    contactInfo: 'Besoin d\'une assistance immédiate ?',
    phone: 'Appelez-nous : +86 123 456 7890',
    email: 'Écrivez-nous : admin@aierxuanlaptop.com',
    businessHours: 'Heures d\'ouverture : Lundi - Vendredi, 9h00 - 18h00 (GMT+8)',
    socialMedia: 'Suivez-nous pour les mises à jour',
    additionalResources: 'Ressources supplémentaires',
    resources: [
      { title: 'Catalogue de produits', href: '/products', description: 'Parcourez notre gamme complète de produits' },
      { title: 'Support technique', href: '/support', description: 'Obtenez une assistance technique' },
      { title: 'À propos de nous', href: '/about', description: 'En savoir plus sur notre entreprise' }
    ]
  },
  pt: {
    title: 'Obrigado!',
    subtitle: 'Sua solicitação foi enviada com sucesso',
    message: 'Recebemos sua consulta e nossa equipe irá analisá-la em breve. Você pode esperar ouvir de nós dentro de 24 horas durante os dias úteis.',
    whatHappensNext: 'O que acontece a seguir?',
    steps: [
      {
        title: 'Revisão e Análise',
        description: 'Nossa equipe técnica revisará seus requisitos e analisará as melhores soluções para suas necessidades.'
      },
      {
        title: 'Cotação Personalizada',
        description: 'Prepararemos uma cotação detalhada com preços, especificações e cronograma de entrega.'
      },
      {
        title: 'Contato de Acompanhamento',
        description: 'Nosso representante de vendas entrará em contato para discutir a proposta e responder a quaisquer perguntas.'
      }
    ],
    backToHome: 'Voltar ao Início',
    browseProducts: 'Navegar Produtos',
    contactInfo: 'Precisa de assistência imediata?',
    phone: 'Ligue para nós: +86 123 456 7890',
    email: 'Envie-nos um e-mail: admin@aierxuanlaptop.com',
    businessHours: 'Horário Comercial: Segunda - Sexta, 9:00 - 18:00 (GMT+8)',
    socialMedia: 'Siga-nos para atualizações',
    additionalResources: 'Recursos Adicionais',
    resources: [
      { title: 'Catálogo de Produtos', href: '/products', description: 'Navegue por nossa linha completa de produtos' },
      { title: 'Suporte Técnico', href: '/support', description: 'Obtenha assistência técnica' },
      { title: 'Sobre Nós', href: '/about', description: 'Saiba mais sobre nossa empresa' }
    ]
  },
  'zh-CN': {
    title: '谢谢！',
    subtitle: '您的询价已成功提交',
    message: '我们已收到您的询价，我们的团队将很快审核。您可以期待在工作日的24小时内收到我们的回复。',
    whatHappensNext: '接下来会发生什么？',
    steps: [
      {
        title: '审核与分析',
        description: '我们的技术团队将审核您的需求，并分析最适合您需要的解决方案。'
      },
      {
        title: '个性化报价',
        description: '我们将准备详细的报价，包括价格、规格和交货时间。'
      },
      {
        title: '后续联系',
        description: '我们的销售代表将联系您讨论提案并回答任何问题。'
      }
    ],
    backToHome: '返回首页',
    browseProducts: '浏览产品',
    contactInfo: '需要立即帮助？',
    phone: '致电我们：+86 123 456 7890',
    email: '邮件联系：admin@aierxuanlaptop.com',
    businessHours: '营业时间：周一至周五，上午9:00 - 下午6:00 (GMT+8)',
    socialMedia: '关注我们获取更新',
    additionalResources: '其他资源',
    resources: [
      { title: '产品目录', href: '/products', description: '浏览我们完整的产品系列' },
      { title: '技术支持', href: '/support', description: '获取技术帮助' },
      { title: '关于我们', href: '/about', description: '了解更多关于我们公司的信息' }
    ]
  }
}

export default function ThankYouPage() {
  const language = useLanguage()
  const texts = thankYouPageTexts[language] || thankYouPageTexts.en

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-8">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            {texts.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            {texts.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {texts.message}
          </p>
        </div>
      </section>

      {/* What Happens Next */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            {texts.whatHappensNext}
          </h2>

          <div className="space-y-8">
            {texts.steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" variant="outline">
                {texts.backToHome}
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg">
                {texts.browseProducts}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              {texts.contactInfo}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">{texts.phone}</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mx-auto mb-4">
                  <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">{texts.email}</p>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-gray-600">{texts.businessHours}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            {texts.additionalResources}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {texts.resources.map((resource, index) => (
              <Link key={index} href={resource.href}>
                <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    {resource.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {resource.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
