/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
} from "@mui/material";
import bgFeatures from "@sr/assets/images/bgFeatures.png";
import bgFeatures1 from "@sr/assets/images/bgFeatures1.png";
import bgFeatures2 from "@sr/assets/images/bgFeatures2.png";
import { DestaqueTitle } from "@sr/assets/styles/styles.d";
import { Button } from "@sr/common/iu/components/Button";
import { Typography } from "@sr/common/iu/components/Typography";
import {
  ArrowCircleRight2,
  ArrowDown2,
  Buildings2,
  CalendarTick,
  Chart1,
  DiscountShape,
  DocumentText,
  FingerScan,
  Key,
  Layer,
  Messages1,
  MessageSquare,
  Mobile,
  MoneyRecive,
  NotificationBing,
  Profile2User,
  Shield,
  ShieldSecurity,
  ShieldTick,
  Star,
  TickCircle,
  TrendUp,
} from "iconsax-react";
import { BsApple, BsGooglePlay } from "react-icons/bs";
import "../../../input.css";
import Footer from "../../components/Footer";
import { HomeHeader } from "./sections/header";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Gestão completa de convênios",
      description:
        "Configure regras, limites por CPF, categorias de produto e formas de pagamento direto no seu painel.",
      color: "bg-primary/10 text-primary",
      hoverBg: "group-hover:bg-primary",
    },
    {
      icon: Star,
      title: "Agilidade no ponto de venda",
      description:
        "Validação automática de beneficiários e autorização em tempo real. Sem atrasos no balcão.",
      color: "bg-orange/10 text-orange",
      hoverBg: "group-hover:bg-orange",
    },
    {
      icon: Chart1,
      title: "Indicadores e relatórios",
      description:
        "Acompanhe o desempenho dos convênios com dados de consumo, categorias e decisões estratégicas.",
      color: "bg-success/10 text-success",
      hoverBg: "group-hover:bg-success",
    },
    {
      icon: Mobile,
      title: "Pré-autorização pelo app",
      description:
        "O beneficiário reserva pelo app e agiliza a compra na farmácia, reduzindo filas e faltas.",
      color: "bg-warning/10 text-warning",
      hoverBg: "group-hover:bg-warning",
    },
  ];

  const differentials = [
    {
      icon: FingerScan,
      title: "Autenticação 2FA",
      description:
        "Duplo fator de autenticação para proteger o acesso de operadores e administradores.",
      color: "bg-danger-600/10 text-danger", // Mantido
      iconBg: "bg-danger-600",
    },
    {
      icon: Key,
      title: "Token dinâmico",
      description:
        "Autorização de venda via token dinâmico no beneficiário, garantindo segurança em cada transação.",
      color: "bg-info/10 text-info", // Mantido
      iconBg: "bg-info",
    },
    {
      icon: Mobile,
      title: "App BenefyCare",
      description:
        "Aplicativo exclusivo para o beneficiário consultar saldo, histórico, pré-autorizar compras e muito mais.",
      color: "bg-violet-600/10 text-violet-600", // Nova cor: Violeta
      iconBg: "bg-violet-600",
    },
    {
      icon: MoneyRecive,
      title: "Benefy Rewards & Cashback",
      description:
        "Programa de fidelidade com cashback automático e recompensas para engajar beneficiários.",
      color: "bg-success/10 text-success", // Mantido
      iconBg: "bg-success",
    },
    {
      icon: DiscountShape,
      title: "Desconto flexíveis",
      description:
        "Configure descontos lineares, progressivos, combo ou campanha - por valor fixo ou percentual.",
      color: "bg-orange-500/10 text-orange-500", // Nova cor: Laranja
      iconBg: "bg-orange-500",
    },
    {
      icon: Layer,
      title: "API & integrações",
      description:
        "Integração via API REST com ERPs, PDVs e sistemas de saúde. Conecte tudo em um só lugar.",
      color: "bg-cyan-600/10 text-cyan-600", // Nova cor: Ciano
      iconBg: "bg-cyan-600",
    },
    {
      icon: NotificationBing,
      title: "Notificações inteligentes",
      description:
        "Alertas em tempo real sobre autorizações, limites atingidos e atividades suspeitas.",
      color: "bg-yellow-500/10 text-yellow-600", // Nova cor: Amarelo/Dourado
      iconBg: "bg-yellow-500",
    },
    {
      icon: MessageSquare,
      title: "Canal Direto e Integrado",
      description:
        "RH e beneficiários conectados à operadora em tempo real, direto pelo portal e aplicativo.",
      color: "bg-indigo-600/10 text-indigo-600", // Nova cor: Índigo/Roxo
      iconBg: "bg-indigo-600",
    },
  ];

  const faqData = [
    {
      question: "Quais são os custos de implementação para a empresa?",
      answer:
        "A BenefyCare possui custo zero de implementação e setup para a empresa. Não cobramos taxas de adesão. Nosso modelo de negócio é baseado na performance e no giro de benefícios dentro da rede parceira, eliminando barreiras para que sua empresa comece hoje mesmo.",
    },
    {
      question: "Como o beneficiário gera o token de autorização?",
      answer:
        "Para garantir flexibilidade e segurança, o código TOTP de transação pode ser gerado instantaneamente pelo App BenefyCare ou enviado via E-mail e SMS, dependendo da configuração de segurança escolhida pela empresa ou usuário.",
    },
    {
      question: "Como funciona o Benefy Rewards & Cashback?",
      answer:
        "Diferente de descontos comuns, o valor acumulado é saldo real. Se o beneficiário possui R$ 100,00 de cashback, ele pode optar por abater o valor total ou parcial da compra. Quando utilizado, o beneficiário não paga nada no balcão e a BenefyCare abate esse valor diretamente da fatura de serviços da rede parceira.",
    },
    {
      question: "Qual tecnologia é utilizada na integração do sistema?",
      answer:
        "Nossa infraestrutura é moderna e utiliza GraphQL para consultas de dados, o que garante comunicações muito mais rápidas e leves entre o PDV e nossa nuvem. Isso permite que as autorizações e consultas de saldo ocorram em milissegundos, sem lentidão no checkout.",
    },
    {
      question: "O que é o sistema de autenticação 2FA?",
      answer:
        "A autenticação de dois fatores (2FA) é utilizada para o acesso seguro à conta. Ela garante que apenas o titular ou administradores consigam entrar na plataforma, protegendo dados sensíveis e configurações de limites de crédito.",
    },
    {
      question: "O sistema de TOTP funciona sem internet?",
      answer:
        "Quando gerado via App, o token TOTP segue protocolos de tempo sincronizado que permitem a validação da transação com altíssima segurança, sendo o método principal para evitar fraudes no ponto de venda.",
    },
    {
      question: "A rede parceira recebe o valor do cashback resgatado?",
      answer:
        "Sim. O lojista não tem prejuízo. Quando o cliente utiliza o cashback, o valor é processado pela BenefyCare e o acerto financeiro é realizado através do abatimento ou compensação na fatura mensal de serviços da rede.",
    },
  ];

  const CardFeature = ({ feature }: { feature: any }) => (
    <Box className="group bg-rhino-100/20 rounded-2xl p-7 border-solid border border-gray-200/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 shadow-soft">
      <Box
        className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 ${feature.hoverBg} group-hover:shadow-glow transition-all duration-300`}
      >
        <feature.icon
          variant="Bulk"
          size={28}
          className={`${feature.color.split(" ")[1]} group-hover:text-white transition-colors`}
        />
      </Box>

      <Typography
        translateId={feature.title}
        className="text-lg mb-2 font-ubuntu text-primary-950 font-bold"
      />

      <Typography
        className="text-sm leading-relaxed text-primary-950/80"
        translateId={feature.description}
      />
    </Box>
  );

  return (
    <>
      <HomeHeader />

      <Box
        component="section"
        className="w-full bg-gradient-to-t from-white from-50% to-primary-200/10 to-50%"
      >
        {/* Ajustado px-6 para px-4 no mobile e mantido px-6 no lg */}
        <Box className="mx-auto max-w-screen-2xl px-4 lg:px-6">
          {/* Ajustado px-12 para px-6 no mobile e mantido px-12 no lg */}
          <Box className="bg-primary-950 bgOverlay text-white rounded-3xl w-full px-6 lg:px-12 pb-12">
            {/* flex-col por padrão (mobile) e flex-row no lg (desktop) */}
            <Box className="flex flex-col lg:flex-row gap-5">
              {/* Bloco de texto: w-full no mobile e w-156 no lg */}
              <Box className="flex flex-col gap-5 p-5 pt-12 lg:pt-20 w-full lg:w-156">
                <Typography className="uppercase text-sm font-bold font-ubuntu">
                  Por que nos escolher?
                </Typography>
                <Typography className="text-3xl lg:text-4xl font-ubuntu font-bold">
                  Um ecossistema feito para conectar
                </Typography>
                <Button
                  fullWidth
                  translateId="Tenho interesse"
                  to="#contact"
                  className="py-3 px-4 text-base bg-primary text-white w-fit"
                  startIcon={<ArrowCircleRight2 size={23} variant="Linear" />}
                />
              </Box>

              {/* Card 1 */}
              <Box className="p-5 flex items-center justify-center">
                <Box className="flex flex-col gap-5 items-center justify-center text-center">
                  <Box className="bg-white p-5 rounded-2xl w-fit">
                    <Messages1 size={60} className="text-primary-900" />
                  </Box>
                  <Typography className="text-xl font-ubuntu font-bold">
                    Conexão Direta
                  </Typography>
                  <Typography className="text-base">
                    Portal integrado para abertura de tickets e suporte entre
                    RH, Beneficiário e Varejo.
                  </Typography>
                </Box>
              </Box>

              {/* Card 2: Cashback */}
              {/* Mantido bg-primary e rounded, apenas ajustado para o fluxo vertical no mobile */}
              <Box className="bg-primary rounded-2xl lg:rounded-none lg:rounded-b-2xl p-5 flex items-center justify-center">
                <Box className="flex flex-col gap-5 items-center justify-center text-center">
                  <Box className="bg-white p-5 rounded-2xl w-fit">
                    <MoneyRecive size={60} className="text-primary-900" />
                  </Box>
                  <Typography className="text-xl font-ubuntu font-bold text-white">
                    Cashback
                  </Typography>
                  <Typography className="text-base text-white">
                    Pontos que viram desconto direto na fatura, criando um ciclo
                    de fidelidade e retorno à sua rede.
                  </Typography>
                </Box>
              </Box>

              {/* Card 3 */}
              <Box className="p-5 flex items-center justify-center">
                <Box className="flex flex-col gap-5 items-center justify-center text-center">
                  <Box className="bg-white p-5 rounded-2xl w-fit">
                    <ShieldSecurity size={60} className="text-primary-900" />
                  </Box>
                  <Typography className="text-xl font-ubuntu font-bold">
                    Token Dinâmico
                  </Typography>
                  <Typography className="text-base">
                    Segurança total no PDV, protegendo beneficiários e lojistas
                    contra fraudes.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Box
        component="section"
        className="py-20 bg-primary text-white text-left"
      >
        <Box className="max-w-4xl mx-auto px-6">
          <Typography className="text-5xl font-bold font-ubuntu">
            Conecte sua empresa ao futuro da gestão de benefícios e saúde.
          </Typography>
        </Box>
      </Box>

      <Box component="section" className="py-5 bg-primary-950" /> */}

      <Box
        component="section"
        id="funcionalidades"
        className="py-16 lg:py-24 bg-white mx-auto max-w-screen-2xl px-6"
      >
        <Box className="text-center mb-12 lg:mb-16 mx-auto flex flex-col items-center">
          <DestaqueTitle className="bg-primary">
            <Typography
              className="font-ubuntu text-sm font-semibold uppercase tracking-wider mt-3.5"
              translateId="Funcionalidades"
            />
          </DestaqueTitle>
          <Typography className="font-ubuntu text-primary-950 text-3xl lg:text-5xl mt-6">
            Otimize sua{" "}
            <span className="text-orange font-bold underline">jornada</span> com
            o BenefyCare
          </Typography>
        </Box>

        {/* No mobile empilha (col), no desktop fica lado a lado (row) */}
        <Box className="flex flex-col lg:flex-row gap-7 items-center lg:items-start justify-between">
          {/* Imagem: Ajustada altura no mobile para não ocupar a tela toda */}
          <div className="relative rounded-3xl overflow-hidden w-fit">
            <img
              src={bgFeatures}
              alt="Farmacêutica atendendo clientes com eficiência"
              className="h-[350px] lg:h-[600px] object-contain"
            />
          </div>

          {/* Container de Cards: 
        No mobile usa largura total. 
        No desktop mantém seus 54% e o mt-10 original.
    */}
          <Box className="flex flex-col md:flex-row gap-6 items-start w-full lg:w-[54%] mt-6 lg:mt-10">
            {/* Coluna 1 (Cards 1 e 3) */}
            <Box className="flex flex-col gap-6 w-full">
              {features
                .filter((_, index) => index % 2 === 0)
                .map((feature) => (
                  <CardFeature key={feature.title} feature={feature} />
                ))}
              {/* Botão centralizado no mobile e w-fit no desktop */}
              <Button
                fullWidth
                translateId="Agende uma reunião"
                to="#contact"
                className="py-3 px-4 text-base bg-primary text-white mt-4 lg:mt-6"
                startIcon={<CalendarTick size={23} variant="Linear" />}
              />
            </Box>

            {/* Coluna 2 (Cards 2 e 4) 
          Mantém o mt-12 original apenas no desktop (lg)
      */}
            <Box className="flex flex-col gap-6 w-full mt-0 lg:mt-12">
              {features
                .filter((_, index) => index % 2 !== 0)
                .map((feature) => (
                  <CardFeature key={feature.title} feature={feature} />
                ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        id="ecosystem"
        className="py-24 overflow-hidden bg-rhino-100/50"
      >
        <Box className="mx-auto max-w-screen-2xl px-6">
          <Box className="text-center">
            <Box className="font-ubuntu inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-wider">
              <DocumentText size={14} variant="Linear" />
              Controle Total
            </Box>
            <Typography className="font-ubuntu text-primary-950 text-3xl lg:text-4xl leading-tight mb-5 font-bold">
              Gerencie convênios com{" "}
              <span className="text-orange underline">precisão</span> e{" "}
              <span className="text-orange underline">agilidade</span>
            </Typography>
            <Typography
              className="font-ubuntu text-primary-950/80 leading-relaxed text-lg"
              translateId={
                "Tenha controle completo sobre regras, limites, categorias de produto e formas de pagamento."
              }
            />
            <Typography
              className="font-ubuntu text-primary-950/80 leading-relaxed mb-8 text-lg"
              translateId={
                "Monitore tudo em tempo real com dashboards personalizados."
              }
            />
          </Box>
          <Box className="flex items-center justify-center">
            {/* Lado Visual (Cards Flutuantes) */}
            <Box className="relative flex justify-center items-center min-h-[500px]">
              {/* Imagem Central */}
              <Box className="relative w-full transition-transform duration-700 hover:scale-105">
                <img
                  src={bgFeatures2}
                  alt="Feature illustration"
                  className="w-full h-[600px] drop-shadow-2xl"
                />
              </Box>

              {/* Card 1 - Superior Esquerdo */}
              <Box className="absolute top-1/3 -left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce-slow max-w-[200px]">
                <Typography className="text-sm font-bold text-primary-950">
                  Regras
                </Typography>
                <Typography className="text-sm text-primary-950">
                  Flexíveis por convênio
                </Typography>
              </Box>

              {/* Card 2 - Meio Direita (Convênio Municipal) */}
              <Box className="absolute top-1/4 -right-8 bg-white p-4 rounded-xl shadow-2xl border border-gray-100 min-w-[240px]">
                <Box className="flex items-center gap-3 mb-2">
                  <Box className="w-8 h-8 rounded bg-success/10 flex items-center justify-center">
                    <DocumentText
                      variant="Bulk"
                      size={20}
                      className="text-success"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm font-bold text-primary-950">
                      Convênio Cliente ABC
                    </Typography>
                    <Typography className="text-[10px] text-gray-500">
                      1.385 beneficiários
                    </Typography>
                  </Box>
                </Box>
                <Box className="flex justify-between items-center border-t pt-2 border-gray-50">
                  <Typography className="text-xs font-bold text-primary-950">
                    R$ 800,00/mês
                  </Typography>
                  <Typography className="text-[10px] bg-success/10 text-success px-2 py-0.5 rounded-full font-bold">
                    Ativo
                  </Typography>
                </Box>
              </Box>

              {/* Card 3 - Inferior Esquerdo */}
              <Box className="absolute bottom-10 left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                <Typography className="flex flex-row items-center gap-3 text-sm font-bold text-primary-950">
                  <Chart1 size={20} variant="Bulk" className="text-primary" />
                  Dashboards em tempo real
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        className="pt-24 overflow-hidden bg-gradient-to-t from-primary-950 from-95% to-rhino-100/50 to-95%"
      >
        <Box className="bgOverlay pb-16">
          <Box className="mx-auto max-w-screen-2xl px-6">
            {/* Ajustado para flex-col no mobile e flex-row no lg */}
            <Box className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-0">
              {/* Lado do Conteúdo: w-full no mobile, w-1/2 no lg */}
              <Box className="w-full lg:w-1/2">
                <Box className="font-ubuntu inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 uppercase tracking-wider">
                  <TrendUp
                    size={14}
                    variant="Linear"
                    className="text-primary"
                  />
                  Performance
                </Box>
                <Typography
                  className="font-ubuntu text-white text-3xl lg:text-4xl font-extrabold leading-tight mb-5"
                  translateId={
                    "Potencialize suas vendas com dados inteligentes"
                  }
                />
                <Typography
                  className="font-ubuntu text-white leading-relaxed mb-8 text-lg"
                  translateId={
                    "Análises detalhadas de consumo, tendências e oportunidades. Tome decisões estratégicas baseadas em dados reais da sua operação."
                  }
                />
                <Box className="space-y-3">
                  <Box className="flex items-center gap-3">
                    <Box className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <TickCircle
                        size={16}
                        className="text-white"
                        variant="Linear"
                      />
                    </Box>
                    <Typography
                      className=" text-white"
                      translateId="Relatórios personalizados"
                    />
                  </Box>

                  <Box className="flex items-center gap-3">
                    <Box className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <TickCircle
                        size={16}
                        className="text-white"
                        variant="Linear"
                      />
                    </Box>
                    <Typography
                      className=" text-white"
                      translateId="Análise de tendências"
                    />
                  </Box>

                  <Box className="flex items-center gap-3">
                    <Box className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <TickCircle
                        size={16}
                        className="text-white"
                        variant="Linear"
                      />
                    </Box>
                    <Typography
                      className=" text-white"
                      translateId="Exportação em múltiplos formatos"
                    />
                  </Box>
                </Box>
                <Button
                  fullWidth
                  translateId="Contratar agora"
                  to="#contact"
                  className="py-3 px-4 text-base bg-primary text-white w-full lg:w-fit mt-10 lg:mt-16"
                  startIcon={<ArrowCircleRight2 size={23} variant="Linear" />}
                />
              </Box>

              {/* Lado Visual: w-full no mobile, w-1/2 no lg */}
              <Box className="relative flex justify-center items-center min-h-[500px] w-full lg:w-1/2">
                {/* Imagem Central - Ajustado posicionamento para não sumir no mobile */}
                <Box className="relative w-full top-0 lg:-top-24 max-w-[400px] transition-transform duration-700 hover:scale-105 flex justify-center">
                  <img
                    src={bgFeatures1}
                    alt="Farmacêutica atendendo clientes com eficiência"
                    className="h-[450px] lg:h-[600px] object-contain"
                  />
                </Box>

                {/* Card 1 - Superior Esquerdo */}
                <Box className="absolute top-5 lg:-top-2 left-0 lg:left-4 bg-white p-4 rounded-xl shadow-xl border border-gray-100 animate-bounce-slow max-w-[180px] lg:max-w-[200px]">
                  <Box className="flex items-center justify-between mb-3 gap-6">
                    <Typography className="text-sm text-primary-950/90 font-ubuntu">
                      Total convênios
                    </Typography>
                    <Box className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Chart1 className="w-5 h-5 text-primary" variant="Bulk" />
                    </Box>
                  </Box>
                  <Typography className="text-xl font-extrabold text-primary-950/90">
                    R$ 48.320,00
                  </Typography>
                  <Box className="flex items-center gap-2 mt-2">
                    <Typography className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      +22%
                    </Typography>
                    <Typography className="text-xs text-primary-950/80">
                      vs. mês anterior
                    </Typography>
                  </Box>
                </Box>

                {/* Card 2 - Meio Direita */}
                <Box className="absolute top-1/4 -right-4 lg:-right-8 bg-white p-4 rounded-xl shadow-2xl border border-gray-100">
                  <Box className="flex items-center justify-between mb-3">
                    <Typography className="text-sm text-primary-950/90 font-ubuntu">
                      Beneficiários
                    </Typography>
                    <Box className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                      <Profile2User
                        className="w-5 h-5 text-success"
                        variant="Bulk"
                      />
                    </Box>
                  </Box>
                  <Typography className="text-xl font-extrabold text-primary-950/90">
                    3.842
                  </Typography>
                  <Box className="flex items-center gap-2 mt-2">
                    <Typography className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      +18%
                    </Typography>
                    <Typography className="text-xs text-primary-950/80">
                      vs. mês anterior
                    </Typography>
                  </Box>
                </Box>

                {/* Card 3 - Inferior Esquerdo */}
                <Box className="absolute bottom-10 -left-4 lg:left-10 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                  <Box className="flex items-center justify-between mb-3">
                    <Typography className="text-sm text-primary-950/90 font-ubuntu">
                      Autorizações
                    </Typography>
                    <Box className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <ShieldTick
                        className="w-5 h-5 text-purple"
                        variant="Bulk"
                      />
                    </Box>
                  </Box>
                  <Typography className="text-xl font-extrabold text-primary-950/90">
                    12.493
                  </Typography>
                  <Box className="flex items-center gap-2 mt-2">
                    <Typography className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      +31%
                    </Typography>
                    <Typography className="text-xs text-primary-950/80">
                      vs. mês anterior
                    </Typography>
                  </Box>
                </Box>

                {/* Card 4 - Inferior Direita */}
                <Box className="absolute bottom-0 right-4 lg:right-32 bg-white p-4 rounded-xl shadow-xl border border-gray-100">
                  <Box className="flex items-center justify-between mb-3 gap-6">
                    <Typography className="text-sm text-primary-950/90 font-ubuntu">
                      Convênios ativos
                    </Typography>
                    <Box className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Buildings2
                        className="w-5 h-5 text-warning"
                        variant="Bulk"
                      />
                    </Box>
                  </Box>
                  <Typography className="text-xl font-extrabold text-primary-950/90">
                    258
                  </Typography>
                  <Box className="flex items-center gap-2 mt-2">
                    <Typography className="text-xs font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      +5
                    </Typography>
                    <Typography className="text-xs text-primary-950/80">
                      vs. mês anterior
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        className="py-20 bg-primary text-white text-center"
      >
        <Box className="max-w-4xl mx-auto px-6">
          <Typography className="text-5xl font-bold font-ubuntu">
            Conecte sua empresa ao futuro da gestão de benefícios e saúde.
          </Typography>
        </Box>
      </Box>

      <Box component="section" id="diferenciais" className="py-24 bg-white">
        <Box className="mx-auto max-w-screen-2xl px-6">
          <Box className="text-center mb-16 max-w-2xl mx-auto">
            <DestaqueTitle className="bg-primary">
              <Typography
                className="font-ubuntu text-sm font-semibold uppercase tracking-wider mt-3.5"
                translateId="Diferenciais"
              />
            </DestaqueTitle>
            <Typography className="text-3xl lg:text-5xl text-primary-950/90 leading-tight">
              Por que escolher o{" "}
              <span className="text-orange font-extrabold">BenefyCare</span>?
            </Typography>
          </Box>

          <Box className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentials.map((item) => (
              <Box
                key={item.title}
                className="text-center p-8 rounded-2xl bg-rhino-100/20 border-solid border border-gray-200/50 hover:shadow-soft hover:-translate-y-1 transition-all duration-300"
              >
                <Box
                  className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center mx-auto mb-5 shadow-lg`}
                >
                  <item.icon variant="Bulk" size={32} className="text-white" />
                </Box>
                <Typography
                  translateId={item.title}
                  className="text-lg mb-2 font-ubuntu text-primary-950"
                />
                <Typography
                  className="text-sm leading-relaxed text-primary-950/80"
                  translateId={item.description}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box component="section" id="faq" className="py-24 bg-white">
        <Box className="mx-auto max-w-screen-2xl px-6 flex flex-col md:flex-row gap-16">
          {/* Lado Esquerdo: Títulos e Chamada */}
          <Box className="flex flex-col gap-6 w-full md:w-1/3">
            <Typography className="uppercase text-sm font-bold font-ubuntu text-primary tracking-widest">
              Dúvidas comuns
            </Typography>
            <Typography className="text-4xl md:text-5xl font-ubuntu font-bold text-primary-950">
              Perguntas <br /> Frequentes
            </Typography>
            <Typography className="text-lg text-gray-600 leading-relaxed">
              Tudo o que você precisa saber sobre como a BenefyCare está
              modernizando a gestão de convênios e saúde.
            </Typography>
            <Box className="mt-4 p-6 bg-primary-50 rounded-2xl border border-primary-100">
              <Typography className="font-bold text-primary-950 mb-2">
                Ainda tem dúvidas?
              </Typography>
              <Typography className="text-sm text-gray-600">
                Nossa equipe técnica está pronta para te ajudar com detalhes
                sobre integração e regras.
              </Typography>
            </Box>
          </Box>

          {/* Lado Direito: Acordeões (Perguntas/Respostas) */}
          <Box className="w-full md:w-2/3 flex flex-col gap-4">
            {faqData.map((item, index) => (
              <Accordion
                key={index}
                elevation={0}
                className="before:display-none border border-gray-100 rounded-xl overflow-hidden shadow-md"
                sx={{
                  "&:not(:last-child)": { marginBottom: "16px" },
                  "&:before": { display: "none" },
                  borderRadius: "16px !important",
                  border: "1px solid #f3f4f6",
                }}
              >
                <AccordionSummary
                  expandIcon={<ArrowDown2 size={24} className="text-primary" />}
                  className="py-2 px-6 hover:bg-gray-50 transition-colors"
                >
                  <Typography className="text-lg font-bold font-ubuntu text-primary-950">
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails className="px-6 pb-6 pt-0">
                  <Typography className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        component="section"
        id="app"
        className="w-full bg-gradient-to-t from-primary-950 from-50% to-white to-50%"
      >
        <Box className="mx-auto max-w-screen-2xl px-6">
          <Box className="bg-primary bgOverlay text-white rounded-3xl w-full p-12 md:p-20">
            {/* Removi o flex-row e adicionei centralização total */}
            <Box className="flex flex-col items-center text-center gap-8">
              {/* Container de Texto Centralizado */}
              <Box className="flex flex-col gap-6 max-w-3xl">
                <Typography className="uppercase text-sm font-bold font-ubuntu tracking-widest opacity-80">
                  App BenefyCare
                </Typography>

                <Typography className="text-4xl md:text-5xl font-ubuntu font-bold leading-tight">
                  Leve seus benefícios no{" "}
                  <span className="text-secondary-400">bolso</span>
                </Typography>

                <Typography className="text-lg md:text-xl opacity-90 leading-relaxed">
                  Consulte seu saldo, gere tokens dinâmicos para compras seguras
                  e acompanhe seu cashback em tempo real. Tudo o que você
                  precisa para economizar na rede de farmácias parceira, direto
                  no seu smartphone.
                </Typography>

                {/* Botões de Store Centralizados */}
                <Box className="flex flex-wrap justify-center gap-5 mt-6">
                  <Button
                    className="!normal-case font-secondary !rounded-xl bg-gray-900 !text-white w-[200px] h-[65px] !border !border-white/10 hover:!bg-primary-900 transition-all duration-300"
                    disableElevation
                    startIcon={<BsApple size={30} />}
                  >
                    <Box className="flex flex-col items-start text-left">
                      <Box className="text-[10px] uppercase leading-none opacity-70">
                        Em breve na
                      </Box>
                      <Box className="text-[1.1rem] font-bold leading-none mt-1">
                        App Store
                      </Box>
                    </Box>
                  </Button>

                  <Button
                    className="!normal-case font-secondary !rounded-xl bg-gray-900 !text-white w-[200px] h-[65px] !border !border-white/10 hover:!bg-primary-900 transition-all duration-300"
                    disableElevation
                    startIcon={<BsGooglePlay size={30} />}
                  >
                    <Box className="flex flex-col items-start text-left">
                      <Box className="text-[10px] uppercase leading-none opacity-70">
                        Em breve no
                      </Box>
                      <Box className="text-[1.1rem] font-bold leading-none mt-1">
                        Google Play
                      </Box>
                    </Box>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
