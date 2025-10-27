'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button, Input, Card, CardContent, CardHeader, CardTitle } from '@/components/ui'
import { createSupabaseClient } from '@/lib/supabase'
import { useLanguage } from '@/store/useAppStore'
import type { LanguageCode } from '@/types'

// RFQ form translations
const rfqFormTexts = {
  en: {
    title: 'Request a Quote',
    subtitle: 'Get a personalized quote for your industrial automation needs',
    name: 'Full Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email Address',
    emailPlaceholder: 'Enter your email address',
    company: 'Company Name',
    companyPlaceholder: 'Enter your company name',
    phone: 'Phone Number',
    phonePlaceholder: 'Enter your phone number (optional)',
    productInterest: 'Product of Interest',
    productPlaceholder: 'Which product are you interested in?',
    message: 'Message',
    messagePlaceholder: 'Tell us about your requirements, quantity needed, timeline, etc.',
    quantity: 'Quantity Needed',
    quantityPlaceholder: 'How many units do you need?',
    country: 'Country',
    countryPlaceholder: 'Enter your country',
    industry: 'Industry',
    industryPlaceholder: 'What industry are you in?',
    urgency: 'Urgency',
    urgencyNormal: 'Normal (1-2 weeks)',
    urgencyUrgent: 'Urgent (Within 1 week)',
    urgencyFlexible: 'Flexible (No rush)',
    budgetRange: 'Budget Range',
    budgetPlaceholder: 'Your approximate budget (optional)',
    submitButton: 'Submit Request',
    submitting: 'Submitting...',
    successMessage: 'Thank you! Your request has been submitted successfully.',
    errorMessage: 'Sorry, there was an error submitting your request. Please try again.',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    minLength: 'Must be at least {min} characters',
    maxLength: 'Must be no more than {max} characters'
  },
  ru: {
    title: 'Запросить предложение',
    subtitle: 'Получите персональное предложение для ваших потребностей в промышленной автоматизации',
    name: 'Полное имя',
    namePlaceholder: 'Введите ваше полное имя',
    email: 'Адрес электронной почты',
    emailPlaceholder: 'Введите ваш адрес электронной почты',
    company: 'Название компании',
    companyPlaceholder: 'Введите название вашей компании',
    phone: 'Номер телефона',
    phonePlaceholder: 'Введите ваш номер телефона (необязательно)',
    productInterest: 'Интересующий продукт',
    productPlaceholder: 'Какой продукт вас интересует?',
    message: 'Сообщение',
    messagePlaceholder: 'Расскажите нам о ваших требованиях, необходимом количестве, сроках и т.д.',
    quantity: 'Необходимое количество',
    quantityPlaceholder: 'Сколько единиц вам нужно?',
    country: 'Страна',
    countryPlaceholder: 'Введите вашу страну',
    industry: 'Отрасль',
    industryPlaceholder: 'В какой отрасли вы работаете?',
    urgency: 'Срочность',
    urgencyNormal: 'Обычная (1-2 недели)',
    urgencyUrgent: 'Срочно (В течение 1 недели)',
    urgencyFlexible: 'Гибкая (Не спешим)',
    budgetRange: 'Бюджетный диапазон',
    budgetPlaceholder: 'Ваш приблизительный бюджет (необязательно)',
    submitButton: 'Отправить запрос',
    submitting: 'Отправка...',
    successMessage: 'Спасибо! Ваш запрос был успешно отправлен.',
    errorMessage: 'Извините, произошла ошибка при отправке вашего запроса. Пожалуйста, попробуйте еще раз.',
    requiredField: 'Это поле обязательно',
    invalidEmail: 'Пожалуйста, введите действительный адрес электронной почты',
    minLength: 'Должно быть не менее {min} символов',
    maxLength: 'Должно быть не более {max} символов'
  },
  ja: {
    title: '見積もりを依頼',
    subtitle: '産業オートメーションのニーズに合わせたパーソナライズされた見積もりを取得',
    name: '氏名',
    namePlaceholder: 'お名前を入力してください',
    email: 'メールアドレス',
    emailPlaceholder: 'メールアドレスを入力してください',
    company: '会社名',
    companyPlaceholder: '会社名を入力してください',
    phone: '電話番号',
    phonePlaceholder: '電話番号を入力してください（任意）',
    productInterest: '興味のある製品',
    productPlaceholder: 'どの製品に興味がありますか？',
    message: 'メッセージ',
    messagePlaceholder: 'ご要件、必要数量、タイムラインなどをお聞かせください',
    quantity: '必要数量',
    quantityPlaceholder: '何台必要ですか？',
    country: '国',
    countryPlaceholder: 'お住まいの国を入力してください',
    industry: '業界',
    industryPlaceholder: 'どの業界にお勤めですか？',
    urgency: '緊急度',
    urgencyNormal: '通常（1-2週間）',
    urgencyUrgent: '緊急（1週間以内）',
    urgencyFlexible: '柔軟（急ぎません）',
    budgetRange: '予算範囲',
    budgetPlaceholder: 'おおよその予算（任意）',
    submitButton: 'リクエストを送信',
    submitting: '送信中...',
    successMessage: 'ありがとうございます！リクエストが正常に送信されました。',
    errorMessage: '申し訳ございませんが、リクエストの送信中にエラーが発生しました。もう一度お試しください。',
    requiredField: 'この項目は必須です',
    invalidEmail: '有効なメールアドレスを入力してください',
    minLength: '{min}文字以上である必要があります',
    maxLength: '{max}文字以下である必要があります'
  },
  fr: {
    title: 'Demander un devis',
    subtitle: 'Obtenez un devis personnalisé pour vos besoins en automatisation industrielle',
    name: 'Nom complet',
    namePlaceholder: 'Entrez votre nom complet',
    email: 'Adresse e-mail',
    emailPlaceholder: 'Entrez votre adresse e-mail',
    company: 'Nom de l\'entreprise',
    companyPlaceholder: 'Entrez le nom de votre entreprise',
    phone: 'Numéro de téléphone',
    phonePlaceholder: 'Entrez votre numéro de téléphone (optionnel)',
    productInterest: 'Produit d\'intérêt',
    productPlaceholder: 'Quel produit vous intéresse ?',
    message: 'Message',
    messagePlaceholder: 'Parlez-nous de vos exigences, quantité nécessaire, délais, etc.',
    quantity: 'Quantité nécessaire',
    quantityPlaceholder: 'Combien d\'unités avez-vous besoin ?',
    country: 'Pays',
    countryPlaceholder: 'Entrez votre pays',
    industry: 'Industrie',
    industryPlaceholder: 'Dans quelle industrie êtes-vous ?',
    urgency: 'Urgence',
    urgencyNormal: 'Normal (1-2 semaines)',
    urgencyUrgent: 'Urgent (Dans la semaine)',
    urgencyFlexible: 'Flexible (Pas pressé)',
    budgetRange: 'Gamme de budget',
    budgetPlaceholder: 'Votre budget approximatif (optionnel)',
    submitButton: 'Soumettre la demande',
    submitting: 'Soumission...',
    successMessage: 'Merci ! Votre demande a été soumise avec succès.',
    errorMessage: 'Désolé, il y a eu une erreur lors de la soumission de votre demande. Veuillez réessayer.',
    requiredField: 'Ce champ est requis',
    invalidEmail: 'Veuillez entrer une adresse e-mail valide',
    minLength: 'Doit contenir au moins {min} caractères',
    maxLength: 'Doit contenir au maximum {max} caractères'
  },
  pt: {
    title: 'Solicitar Cotação',
    subtitle: 'Obtenha uma cotação personalizada para suas necessidades de automação industrial',
    name: 'Nome Completo',
    namePlaceholder: 'Digite seu nome completo',
    email: 'Endereço de E-mail',
    emailPlaceholder: 'Digite seu endereço de e-mail',
    company: 'Nome da Empresa',
    companyPlaceholder: 'Digite o nome da sua empresa',
    phone: 'Número de Telefone',
    phonePlaceholder: 'Digite seu número de telefone (opcional)',
    productInterest: 'Produto de Interesse',
    productPlaceholder: 'Qual produto você tem interesse?',
    message: 'Mensagem',
    messagePlaceholder: 'Conte-nos sobre seus requisitos, quantidade necessária, cronograma, etc.',
    quantity: 'Quantidade Necessária',
    quantityPlaceholder: 'Quantas unidades você precisa?',
    country: 'País',
    countryPlaceholder: 'Digite seu país',
    industry: 'Indústria',
    industryPlaceholder: 'Em que indústria você atua?',
    urgency: 'Urgência',
    urgencyNormal: 'Normal (1-2 semanas)',
    urgencyUrgent: 'Urgente (Dentro de 1 semana)',
    urgencyFlexible: 'Flexível (Sem pressa)',
    budgetRange: 'Faixa de Orçamento',
    budgetPlaceholder: 'Seu orçamento aproximado (opcional)',
    submitButton: 'Enviar Solicitação',
    submitting: 'Enviando...',
    successMessage: 'Obrigado! Sua solicitação foi enviada com sucesso.',
    errorMessage: 'Desculpe, houve um erro ao enviar sua solicitação. Tente novamente.',
    requiredField: 'Este campo é obrigatório',
    invalidEmail: 'Por favor, digite um endereço de e-mail válido',
    minLength: 'Deve ter pelo menos {min} caracteres',
    maxLength: 'Deve ter no máximo {max} caracteres'
  },
  'zh-CN': {
    title: '询价',
    subtitle: '为您的工业自动化需求获取个性化报价',
    name: '姓名',
    namePlaceholder: '请输入您的姓名',
    email: '邮箱地址',
    emailPlaceholder: '请输入您的邮箱地址',
    company: '公司名称',
    companyPlaceholder: '请输入您的公司名称',
    phone: '电话号码',
    phonePlaceholder: '请输入您的电话号码（可选）',
    productInterest: '感兴趣的产品',
    productPlaceholder: '您对哪个产品感兴趣？',
    message: '留言',
    messagePlaceholder: '请告诉我们您的需求、所需数量、时间安排等',
    quantity: '所需数量',
    quantityPlaceholder: '您需要多少台？',
    country: '国家',
    countryPlaceholder: '请输入您的国家',
    industry: '行业',
    industryPlaceholder: '您从事什么行业？',
    urgency: '紧急程度',
    urgencyNormal: '正常（1-2周）',
    urgencyUrgent: '紧急（1周内）',
    urgencyFlexible: '灵活（不急）',
    budgetRange: '预算范围',
    budgetPlaceholder: '您的大概预算（可选）',
    submitButton: '提交询价',
    submitting: '提交中...',
    successMessage: '谢谢！您的询价已成功提交。',
    errorMessage: '抱歉，提交询价时出现错误。请重试。',
    requiredField: '此字段为必填项',
    invalidEmail: '请输入有效的邮箱地址',
    minLength: '至少需要{min}个字符',
    maxLength: '最多{max}个字符'
  }
}

// Form validation schema
const createRFQSchema = (texts: typeof rfqFormTexts.en) => z.object({
  name: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(100, texts.maxLength.replace('{max}', '100')),
  email: z.string()
    .email(texts.invalidEmail),
  company: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(200, texts.maxLength.replace('{max}', '200')),
  phone: z.string().optional(),
  productInterest: z.string()
    .min(2, texts.minLength.replace('{min}', '2'))
    .max(200, texts.maxLength.replace('{max}', '200')),
  message: z.string()
    .min(10, texts.minLength.replace('{min}', '10'))
    .max(2000, texts.maxLength.replace('{max}', '2000')),
  quantity: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  urgency: z.enum(['normal', 'urgent', 'flexible']).default('normal'),
  budgetRange: z.string().optional()
})

type RFQFormData = z.infer<ReturnType<typeof createRFQSchema>>

interface RFQFormProps {
  productSlug?: string
  onSuccess?: () => void
  className?: string
}

export function RFQForm({ productSlug, onSuccess, className = '' }: RFQFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const language = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createSupabaseClient()
  const texts = rfqFormTexts[language] || rfqFormTexts.en

  const schema = createRFQSchema(texts)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<RFQFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productInterest: productSlug || '',
      urgency: 'normal'
    }
  })

  // Pre-fill form from URL parameters
  useEffect(() => {
    const productFromUrl = searchParams.get('product')
    if (productFromUrl && !productSlug) {
      setValue('productInterest', productFromUrl)
    }
  }, [searchParams, productSlug, setValue])

  const onSubmit = async (data: RFQFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Get client information
      const clientInfo = {
        ip_address: null, // Will be handled by server
        user_agent: navigator.userAgent,
        referrer: document.referrer || null,
        language_code: language
      }

      // Submit to Supabase
      // Important: use returning: 'minimal' so anon insert doesn't require SELECT permission
      const { error } = await supabase
        .from('rfqs')
        .insert({
          ...data,
          ...clientInfo,
          quantity: data.quantity ? parseInt(data.quantity) : null
        }, { returning: 'minimal' })

      if (error) {
        throw error
      }

      setSubmitStatus('success')
      reset()
      
      // Call success callback or redirect
      if (onSuccess) {
        onSuccess()
      } else {
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          router.push('/thank-you')
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting RFQ:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-black">
          {texts.title}
        </CardTitle>
        <p className="text-gray-600 text-center">
          {texts.subtitle}
        </p>
      </CardHeader>
      
      <CardContent>
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-center font-medium">
              {texts.successMessage}
            </p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-center font-medium">
              {texts.errorMessage}
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.name} *
              </label>
              <Input
                {...register('name')}
                placeholder={texts.namePlaceholder}
                error={errors.name?.message}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.email} *
              </label>
              <Input
                type="email"
                {...register('email')}
                placeholder={texts.emailPlaceholder}
                error={errors.email?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.company} *
              </label>
              <Input
                {...register('company')}
                placeholder={texts.companyPlaceholder}
                error={errors.company?.message}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.phone}
              </label>
              <Input
                {...register('phone')}
                placeholder={texts.phonePlaceholder}
                error={errors.phone?.message}
              />
            </div>
          </div>

          {/* Product Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {texts.productInterest} *
            </label>
            <Input
              {...register('productInterest')}
              placeholder={texts.productPlaceholder}
              error={errors.productInterest?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {texts.message} *
            </label>
            <textarea
              {...register('message')}
              placeholder={texts.messagePlaceholder}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
            )}
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.quantity}
              </label>
              <Input
                {...register('quantity')}
                placeholder={texts.quantityPlaceholder}
                error={errors.quantity?.message}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.country}
              </label>
              <Input
                {...register('country')}
                placeholder={texts.countryPlaceholder}
                error={errors.country?.message}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.industry}
              </label>
              <Input
                {...register('industry')}
                placeholder={texts.industryPlaceholder}
                error={errors.industry?.message}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.urgency}
              </label>
              <select
                {...register('urgency')}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="normal">{texts.urgencyNormal}</option>
                <option value="urgent">{texts.urgencyUrgent}</option>
                <option value="flexible">{texts.urgencyFlexible}</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {texts.budgetRange}
              </label>
              <Input
                {...register('budgetRange')}
                placeholder={texts.budgetPlaceholder}
                error={errors.budgetRange?.message}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? texts.submitting : texts.submitButton}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
