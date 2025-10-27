-- Update FAQ Chinese translations with proper Chinese content
-- This script fixes the Chinese FAQ translations that were incorrectly set to English

-- Update Chinese translations for FAQ
UPDATE faq_translations 
SET 
  question = CASE 
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 1) THEN 'AIERXUAN产品的保修期是多长？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 2) THEN '我可以定制产品配置吗？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 3) THEN '你们的产品支持全球保修吗？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 4) THEN '批量采购有折扣吗？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 5) THEN '你们提供OEM/ODM服务吗？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 6) THEN '你们接受哪些付款方式？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 7) THEN '发货需要多长时间？'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 8) THEN '你们提供国际运输服务吗？'
  END,
  answer = CASE 
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 1) THEN '我们所有的笔记本产品都提供2年免费保修，迷你PC产品提供3年保修。在保修期内，我们为非人为原因造成的硬件问题提供免费维修或更换服务。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 2) THEN '是的，我们提供灵活的产品定制服务。您可以根据业务需求选择不同的处理器、内存、存储等配置。最小订购数量为20台。具体配置选项请联系我们的销售团队。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 3) THEN '是的，我们的产品支持全球保修服务。在中国大陆，我们拥有50多个授权服务中心。在其他国家和地区，我们与当地服务提供商合作提供保修服务。购买时请咨询我们的销售人员了解具体保修政策。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 4) THEN '我们为批量采购客户提供有竞争力的价格折扣。具体折扣率取决于采购数量和合作模式。一般来说，10台以上的采购可享受5-10%的折扣，50台以上可获得10-15%的折扣。详细报价请联系我们的销售团队。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 5) THEN '是的，我们提供专业的OEM/ODM服务。我们拥有完整的产品研发和制造能力，可以根据客户要求定制产品、外观设计和功能开发。OEM服务的最小订购数量为500台，ODM服务根据具体项目要求确定。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 6) THEN '我们接受多种付款方式：银行转账、信用卡付款和电汇。对于国内客户，我们支持30%定金，发货前付清70%余款。对于国际客户，我们接受T/T电汇和L/C信用证。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 7) THEN '标准产品在订单确认后3-5个工作日内发货。定制产品的发货时间因具体配置而异，通常为7-15个工作日。急单可优先处理，可能产生额外费用。'
    WHEN faq_id IN (SELECT id FROM faq WHERE sort_order = 8) THEN '是的，我们提供全球运输服务。我们与DHL、FedEx、UPS等国际快递公司合作，安全快速地将产品运送到世界各地。运费根据目的地和重量计算。具体运费请联系我们的销售团队。'
  END
WHERE locale = 'zh-CN';

-- Add other language translations if they don't exist
-- Russian translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT 
  f.id,
  'ru',
  CASE f.sort_order
    WHEN 1 THEN 'Какой гарантийный срок на продукцию AIERXUAN?'
    WHEN 2 THEN 'Могу ли я настроить конфигурацию продукта?'
    WHEN 3 THEN 'Поддерживают ли ваши продукты глобальную гарантию?'
    WHEN 4 THEN 'Есть ли скидки при оптовых покупках?'
    WHEN 5 THEN 'Предоставляете ли вы услуги OEM/ODM?'
    WHEN 6 THEN 'Какие способы оплаты вы принимаете?'
    WHEN 7 THEN 'Сколько времени занимает доставка?'
    WHEN 8 THEN 'Предоставляете ли вы международные услуги доставки?'
  END,
  CASE f.sort_order
    WHEN 1 THEN 'Все наши ноутбуки поставляются с 2-летней бесплатной гарантией, а мини-ПК включают 3-летнюю гарантию. В течение гарантийного периода мы предоставляем бесплатные услуги по ремонту или замене для аппаратных проблем, не вызванных человеческим фактором.'
    WHEN 2 THEN 'Да, мы предлагаем гибкие услуги по настройке продуктов. Вы можете выбрать различные процессоры, память, хранилище и другие конфигурации в зависимости от ваших бизнес-потребностей. Минимальное количество заказа составляет 20 единиц. Пожалуйста, свяжитесь с нашей командой продаж для получения конкретных вариантов конфигурации.'
    WHEN 3 THEN 'Да, наши продукты поддерживают глобальные гарантийные услуги. В материковом Китае у нас есть более 50 авторизованных сервисных центров. В других странах и регионах мы сотрудничаем с местными поставщиками услуг для предоставления гарантийных услуг. Пожалуйста, проконсультируйтесь с нашими сотрудниками по продажам для получения конкретных гарантийных политик при покупке.'
    WHEN 4 THEN 'Мы предлагаем конкурентоспособные ценовые скидки для клиентов, совершающих оптовые покупки. Конкретные ставки скидок зависят от количества покупок и модели сотрудничества. Как правило, покупки от 10+ единиц могут получить скидки 5-10%, а 50+ единиц могут получить скидки 10-15%. Пожалуйста, свяжитесь с нашей командой продаж для получения подробных котировок.'
    WHEN 5 THEN 'Да, мы предоставляем профессиональные услуги OEM/ODM. У нас есть полные возможности по разработке и производству продуктов, и мы можем настраивать продукты, дизайн внешнего вида и разработку функций в соответствии с требованиями клиентов. Минимальное количество заказа для услуг OEM составляет 500 единиц, а услуги ODM определяются на основе конкретных требований проекта.'
    WHEN 6 THEN 'Мы принимаем несколько способов оплаты: банковский перевод, платежи кредитными картами и телеграфные переводы. Для отечественных клиентов мы поддерживаем 30% депозит с 70% оплатой перед отгрузкой. Для международных клиентов мы принимаем телеграфные переводы T/T и аккредитивы L/C.'
    WHEN 7 THEN 'Стандартные продукты отправляются в течение 3-5 рабочих дней после подтверждения заказа. Время доставки индивидуальных продуктов варьируется в зависимости от конкретных конфигураций, обычно 7-15 рабочих дней. Срочные заказы могут быть приоритизированы с потенциальными дополнительными сборами.'
    WHEN 8 THEN 'Да, мы предоставляем глобальные услуги доставки. Мы сотрудничаем с международными экспресс-компаниями, такими как DHL, FedEx и UPS, чтобы безопасно и быстро доставлять продукты по всему миру. Стоимость доставки рассчитывается на основе пункта назначения и веса. Пожалуйста, свяжитесь с нашей командой продаж для получения конкретных расходов на доставку.'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft 
    WHERE ft.faq_id = f.id AND ft.locale = 'ru'
  );

-- Japanese translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT 
  f.id,
  'ja',
  CASE f.sort_order
    WHEN 1 THEN 'AIERXUAN製品の保証期間はどのくらいですか？'
    WHEN 2 THEN '製品の構成をカスタマイズできますか？'
    WHEN 3 THEN 'あなたの製品はグローバル保証をサポートしていますか？'
    WHEN 4 THEN '大量購入の割引はありますか？'
    WHEN 5 THEN 'OEM/ODMサービスを提供していますか？'
    WHEN 6 THEN 'どのような支払い方法を受け付けていますか？'
    WHEN 7 THEN '配送にはどのくらい時間がかかりますか？'
    WHEN 8 THEN '国際配送サービスを提供していますか？'
  END,
  CASE f.sort_order
    WHEN 1 THEN '当社のすべてのラップトップ製品には2年間の無料保証が付いており、ミニPC製品には3年間の保証が含まれています。保証期間中、人為的でないハードウェアの問題に対して無料の修理または交換サービスを提供します。'
    WHEN 2 THEN 'はい、柔軟な製品カスタマイズサービスを提供しています。ビジネスニーズに基づいて、異なるプロセッサ、メモリ、ストレージ、その他の構成を選択できます。最小注文数量は20台です。具体的な構成オプションについては、営業チームにお問い合わせください。'
    WHEN 3 THEN 'はい、当社の製品はグローバル保証サービスをサポートしています。中国本土では、50以上の認定サービスセンターがあります。他の国や地域では、地元のサービスプロバイダーと協力して保証サービスを提供しています。購入時の具体的な保証ポリシーについては、営業スタッフにご相談ください。'
    WHEN 4 THEN '大量購入のお客様には競争力のある価格割引を提供しています。具体的な割引率は購入数量と協力モデルによって異なります。一般的に、10台以上の購入では5-10%の割引を享受でき、50台以上では10-15%の割引を受けることができます。詳細な見積もりについては、営業チームにお問い合わせください。'
    WHEN 5 THEN 'はい、プロフェッショナルなOEM/ODMサービスを提供しています。完全な製品R&Dと製造能力を持ち、顧客の要求に応じて製品、外観デザイン、機能開発をカスタマイズできます。OEMサービスの最小注文数量は500台で、ODMサービスは具体的なプロジェクト要件に基づいて決定されます。'
    WHEN 6 THEN '複数の支払い方法を受け付けています：銀行振込、クレジットカード決済、電信送金。国内のお客様には、30%の前金と出荷前の70%の支払いをサポートしています。国際的なお客様には、T/T電信送金とL/C信用状を受け付けています。'
    WHEN 7 THEN '標準製品は注文確認後3-5営業日以内に出荷されます。カスタム製品の出荷時間は具体的な構成によって異なり、通常7-15営業日です。急ぎの注文は追加料金で優先処理できます。'
    WHEN 8 THEN 'はい、グローバル配送サービスを提供しています。DHL、FedEx、UPSなどの国際宅配会社と協力して、世界中に製品を安全かつ迅速に配送しています。配送料は目的地と重量に基づいて計算されます。具体的な配送料については、営業チームにお問い合わせください。'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft 
    WHERE ft.faq_id = f.id AND ft.locale = 'ja'
  );

-- French translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT 
  f.id,
  'fr',
  CASE f.sort_order
    WHEN 1 THEN 'Quelle est la période de garantie des produits AIERXUAN ?'
    WHEN 2 THEN 'Puis-je personnaliser les configurations de produits ?'
    WHEN 3 THEN 'Vos produits supportent-ils la garantie mondiale ?'
    WHEN 4 THEN 'Y a-t-il des remises pour les achats en gros ?'
    WHEN 5 THEN 'Fournissez-vous des services OEM/ODM ?'
    WHEN 6 THEN 'Quels modes de paiement acceptez-vous ?'
    WHEN 7 THEN 'Combien de temps prend la livraison ?'
    WHEN 8 THEN 'Fournissez-vous des services de livraison internationale ?'
  END,
  CASE f.sort_order
    WHEN 1 THEN 'Tous nos produits portables sont livrés avec une garantie gratuite de 2 ans, tandis que les produits mini PC incluent une garantie de 3 ans. Pendant la période de garantie, nous fournissons des services de réparation ou de remplacement gratuits pour les problèmes matériels non causés par l''homme.'
    WHEN 2 THEN 'Oui, nous offrons des services de personnalisation de produits flexibles. Vous pouvez choisir différents processeurs, mémoire, stockage et autres configurations en fonction de vos besoins commerciaux. La quantité minimale de commande est de 20 unités. Veuillez contacter notre équipe de vente pour les options de configuration spécifiques.'
    WHEN 3 THEN 'Oui, nos produits supportent les services de garantie mondiale. En Chine continentale, nous avons plus de 50 centres de service autorisés. Dans d''autres pays et régions, nous coopérons avec des fournisseurs de services locaux pour offrir des services de garantie. Veuillez consulter notre personnel de vente pour les politiques de garantie spécifiques lors de l''achat.'
    WHEN 4 THEN 'Nous offrons des remises de prix compétitives pour les clients qui achètent en gros. Les taux de remise spécifiques dépendent de la quantité d''achat et du modèle de coopération. Généralement, les achats de 10+ unités peuvent bénéficier de remises de 5-10%, tandis que 50+ unités peuvent recevoir des remises de 10-15%. Veuillez contacter notre équipe de vente pour des devis détaillés.'
    WHEN 5 THEN 'Oui, nous fournissons des services OEM/ODM professionnels. Nous avons des capacités complètes de R&D et de fabrication de produits, et pouvons personnaliser les produits, la conception d''apparence et le développement fonctionnel selon les exigences des clients. La quantité minimale de commande pour les services OEM est de 500 unités, tandis que les services ODM sont déterminés en fonction des exigences spécifiques du projet.'
    WHEN 6 THEN 'Nous acceptons plusieurs modes de paiement : virement bancaire, paiements par carte de crédit et virements télégraphiques. Pour les clients domestiques, nous supportons un acompte de 30% avec un paiement de 70% avant l''expédition. Pour les clients internationaux, nous acceptons les virements télégraphiques T/T et les lettres de crédit L/C.'
    WHEN 7 THEN 'Les produits standard sont expédiés dans les 3-5 jours ouvrables après confirmation de la commande. Les temps d''expédition des produits personnalisés varient selon les configurations spécifiques, généralement 7-15 jours ouvrables. Les commandes urgentes peuvent être priorisées avec des frais supplémentaires potentiels.'
    WHEN 8 THEN 'Oui, nous fournissons des services de livraison mondiale. Nous coopérons avec des compagnies express internationales comme DHL, FedEx et UPS pour livrer les produits dans le monde entier de manière sûre et rapide. Les coûts d''expédition sont calculés en fonction de la destination et du poids. Veuillez contacter notre équipe de vente pour les coûts d''expédition spécifiques.'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft 
    WHERE ft.faq_id = f.id AND ft.locale = 'fr'
  );

-- Portuguese translations
INSERT INTO faq_translations (faq_id, locale, question, answer)
SELECT 
  f.id,
  'pt',
  CASE f.sort_order
    WHEN 1 THEN 'Qual é o período de garantia dos produtos AIERXUAN?'
    WHEN 2 THEN 'Posso personalizar as configurações do produto?'
    WHEN 3 THEN 'Seus produtos suportam garantia global?'
    WHEN 4 THEN 'Há descontos para compras em grande quantidade?'
    WHEN 5 THEN 'Vocês fornecem serviços OEM/ODM?'
    WHEN 6 THEN 'Quais métodos de pagamento vocês aceitam?'
    WHEN 7 THEN 'Quanto tempo leva o envio?'
    WHEN 8 THEN 'Vocês fornecem serviços de envio internacional?'
  END,
  CASE f.sort_order
    WHEN 1 THEN 'Todos os nossos produtos laptop vêm com garantia gratuita de 2 anos, enquanto os produtos mini PC incluem garantia de 3 anos. Durante o período de garantia, fornecemos serviços gratuitos de reparo ou substituição para problemas de hardware não causados por humanos.'
    WHEN 2 THEN 'Sim, oferecemos serviços flexíveis de personalização de produtos. Você pode escolher diferentes processadores, memória, armazenamento e outras configurações com base em suas necessidades comerciais. A quantidade mínima de pedido é de 20 unidades. Entre em contato com nossa equipe de vendas para opções específicas de configuração.'
    WHEN 3 THEN 'Sim, nossos produtos suportam serviços de garantia global. Na China continental, temos mais de 50 centros de serviço autorizados. Em outros países e regiões, cooperamos com provedores de serviços locais para oferecer serviços de garantia. Consulte nossa equipe de vendas para políticas específicas de garantia ao comprar.'
    WHEN 4 THEN 'Oferecemos descontos de preços competitivos para clientes que fazem compras em grande quantidade. As taxas específicas de desconto dependem da quantidade de compra e do modelo de cooperação. Geralmente, compras de 10+ unidades podem desfrutar de descontos de 5-10%, enquanto 50+ unidades podem receber descontos de 10-15%. Entre em contato com nossa equipe de vendas para cotações detalhadas.'
    WHEN 5 THEN 'Sim, fornecemos serviços profissionais de OEM/ODM. Temos capacidades completas de P&D e fabricação de produtos, e podemos personalizar produtos, design de aparência e desenvolvimento funcional de acordo com os requisitos do cliente. A quantidade mínima de pedido para serviços OEM é de 500 unidades, enquanto os serviços ODM são determinados com base nos requisitos específicos do projeto.'
    WHEN 6 THEN 'Aceitamos múltiplos métodos de pagamento: transferência bancária, pagamentos com cartão de crédito e transferências telegráficas. Para clientes domésticos, apoiamos depósito de 30% com pagamento de 70% antes do envio. Para clientes internacionais, aceitamos transferências telegráficas T/T e cartas de crédito L/C.'
    WHEN 7 THEN 'Produtos padrão são enviados dentro de 3-5 dias úteis após confirmação do pedido. Os tempos de envio de produtos personalizados variam dependendo das configurações específicas, tipicamente 7-15 dias úteis. Pedidos urgentes podem ser priorizados com taxas adicionais potenciais.'
    WHEN 8 THEN 'Sim, fornecemos serviços de envio global. Cooperamos com empresas expressas internacionais como DHL, FedEx e UPS para entregar produtos com segurança e rapidez em todo o mundo. Os custos de envio são calculados com base no destino e peso. Entre em contato com nossa equipe de vendas para custos específicos de envio.'
  END
FROM faq f
WHERE f.is_active = true
  AND NOT EXISTS (
    SELECT 1 FROM faq_translations ft 
    WHERE ft.faq_id = f.id AND ft.locale = 'pt'
  );
