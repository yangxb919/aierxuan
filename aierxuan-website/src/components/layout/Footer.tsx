'use client'

import Link from 'next/link'
import { useLanguage } from '@/store/useAppStore'

const footerContent = {
  en: {
    company: {
      title: 'AIERXUAN',
      description: 'Professional OEM/ODM manufacturer of custom computing solutions. Specializing in laptops, mini PCs, and industrial computing equipment for businesses worldwide.',
    },
    links: {
      products: {
        title: 'Products',
        items: [
          { name: 'Industrial Equipment', href: '/products/industrial' },
          { name: 'Automation Systems', href: '/products/automation' },
          { name: 'Control Solutions', href: '/products/control' },
          { name: 'Sensors & Instruments', href: '/products/sensors' },
        ]
      },
      company: {
        title: 'Company',
        items: [
          { name: 'About Us', href: '/about' },
          { name: 'Our Team', href: '/about/team' },
          { name: 'Careers', href: '/careers' },
          { name: 'News', href: '/news' },
        ]
      },
      support: {
        title: 'Support',
        items: [
          { name: 'Contact Us', href: '/contact' },
          { name: 'Technical Support', href: '/support' },
          { name: 'Documentation', href: '/docs' },
          { name: 'FAQ', href: '/faq' },
        ]
      }
    },
    contact: {
      title: 'Contact Info',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: 'Longgang District, Shenzhen, China'
    },
    copyright: '© 2024 AIERXUAN. All rights reserved.',
  },
  ru: {
    company: {
      title: 'AIERXUAN',
      description: 'Ведущий поставщик решений промышленной автоматизации, специализирующийся на высококачественном оборудовании и инновационных технологиях для современного производства.',
    },
    links: {
      products: {
        title: 'Продукты',
        items: [
          { name: 'Промышленное оборудование', href: '/products/industrial' },
          { name: 'Системы автоматизации', href: '/products/automation' },
          { name: 'Решения управления', href: '/products/control' },
          { name: 'Датчики и приборы', href: '/products/sensors' },
        ]
      },
      company: {
        title: 'Компания',
        items: [
          { name: 'О нас', href: '/about' },
          { name: 'Наша команда', href: '/about/team' },
          { name: 'Карьера', href: '/careers' },
          { name: 'Новости', href: '/news' },
        ]
      },
      support: {
        title: 'Поддержка',
        items: [
          { name: 'Связаться с нами', href: '/contact' },
          { name: 'Техническая поддержка', href: '/support' },
          { name: 'Документация', href: '/docs' },
          { name: 'FAQ', href: '/faq' },
        ]
      }
    },
    contact: {
      title: 'Контактная информация',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: 'Район Longgang, Шэньчжэнь, Китай'
    },
    copyright: '© 2024 AIERXUAN. Все права защищены.',
  },
  'zh-CN': {
    company: {
      title: 'AIERXUAN',
      description: '工业自动化解决方案的领先供应商，专注于为现代制造业提供高品质设备和创新技术。',
    },
    links: {
      products: {
        title: '产品',
        items: [
          { name: '工业设备', href: '/products/industrial' },
          { name: '自动化系统', href: '/products/automation' },
          { name: '控制解决方案', href: '/products/control' },
          { name: '传感器和仪表', href: '/products/sensors' },
        ]
      },
      company: {
        title: '公司',
        items: [
          { name: '关于我们', href: '/about' },
          { name: '我们的团队', href: '/about/team' },
          { name: '招聘信息', href: '/careers' },
          { name: '新闻动态', href: '/news' },
        ]
      },
      support: {
        title: '支持',
        items: [
          { name: '联系我们', href: '/contact' },
          { name: '技术支持', href: '/support' },
          { name: '文档资料', href: '/docs' },
          { name: '常见问题', href: '/faq' },
        ]
      }
    },
    contact: {
      title: '联系信息',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: '深圳市龙岗区'
    },
    copyright: '© 2024 AIERXUAN. 保留所有权利。',
  },
  ja: {
    company: {
      title: 'AIERXUAN',
      description: '現代の製造業向けの高品質機器と革新的技術を専門とする産業オートメーションソリューションの主要プロバイダー。',
    },
    links: {
      products: {
        title: '製品',
        items: [
          { name: '産業機器', href: '/products/industrial' },
          { name: 'オートメーションシステム', href: '/products/automation' },
          { name: '制御ソリューション', href: '/products/control' },
          { name: 'センサー・計器', href: '/products/sensors' },
        ]
      },
      company: {
        title: '会社',
        items: [
          { name: '会社概要', href: '/about' },
          { name: 'チーム', href: '/about/team' },
          { name: '採用情報', href: '/careers' },
          { name: 'ニュース', href: '/news' },
        ]
      },
      support: {
        title: 'サポート',
        items: [
          { name: 'お問い合わせ', href: '/contact' },
          { name: 'テクニカルサポート', href: '/support' },
          { name: 'ドキュメント', href: '/docs' },
          { name: 'FAQ', href: '/faq' },
        ]
      }
    },
    contact: {
      title: '連絡先情報',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: '深セン市龍崗区、中国'
    },
    copyright: '© 2024 AIERXUAN. 全著作権所有。',
  },
  fr: {
    company: {
      title: 'AIERXUAN',
      description: 'Fournisseur leader de solutions d\'automatisation industrielle, spécialisé dans les équipements de haute qualité et les technologies innovantes pour la fabrication moderne.',
    },
    links: {
      products: {
        title: 'Produits',
        items: [
          { name: 'Équipement industriel', href: '/products/industrial' },
          { name: 'Systèmes d\'automatisation', href: '/products/automation' },
          { name: 'Solutions de contrôle', href: '/products/control' },
          { name: 'Capteurs et instruments', href: '/products/sensors' },
        ]
      },
      company: {
        title: 'Entreprise',
        items: [
          { name: 'À propos de nous', href: '/about' },
          { name: 'Notre équipe', href: '/about/team' },
          { name: 'Carrières', href: '/careers' },
          { name: 'Actualités', href: '/news' },
        ]
      },
      support: {
        title: 'Support',
        items: [
          { name: 'Nous contacter', href: '/contact' },
          { name: 'Support technique', href: '/support' },
          { name: 'Documentation', href: '/docs' },
          { name: 'FAQ', href: '/faq' },
        ]
      }
    },
    contact: {
      title: 'Informations de contact',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: 'District Longgang, Shenzhen, Chine'
    },
    copyright: '© 2024 AIERXUAN. Tous droits réservés.',
  },
  pt: {
    company: {
      title: 'AIERXUAN',
      description: 'Fornecedor líder de soluções de automação industrial, especializado em equipamentos de alta qualidade e tecnologias inovadoras para fabricação moderna.',
    },
    links: {
      products: {
        title: 'Produtos',
        items: [
          { name: 'Equipamento Industrial', href: '/products/industrial' },
          { name: 'Sistemas de Automação', href: '/products/automation' },
          { name: 'Soluções de Controle', href: '/products/control' },
          { name: 'Sensores e Instrumentos', href: '/products/sensors' },
        ]
      },
      company: {
        title: 'Empresa',
        items: [
          { name: 'Sobre Nós', href: '/about' },
          { name: 'Nossa Equipe', href: '/about/team' },
          { name: 'Carreiras', href: '/careers' },
          { name: 'Notícias', href: '/news' },
        ]
      },
      support: {
        title: 'Suporte',
        items: [
          { name: 'Entre em Contato', href: '/contact' },
          { name: 'Suporte Técnico', href: '/support' },
          { name: 'Documentação', href: '/docs' },
          { name: 'FAQ', href: '/faq' },
        ]
      }
    },
    contact: {
      title: 'Informações de Contato',
      email: 'admin@aierxuanlaptop.com',
      phone: '4008-8228-058',
      address: 'Distrito Longgang, Shenzhen, China'
    },
    copyright: '© 2024 AIERXUAN. Todos os direitos reservados.',
  }
}

export function Footer() {
  const language = useLanguage()
  const content = footerContent[language] || footerContent.en // Fallback to English if language not found

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold text-blue-400">{content.company.title}</span>
            </div>
            <p className="text-gray-300 text-sm leading-6 mb-6">
              {content.company.description}
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.links.products.title}
            </h3>
            <ul className="space-y-3">
              {content.links.products.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.links.company.title}
            </h3>
            <ul className="space-y-3">
              {content.links.company.items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-gray-300 hover:text-white text-sm transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              {content.contact.title}
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-300 text-sm">{content.contact.email}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">{content.contact.phone}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">{content.contact.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm text-center">
            {content.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
