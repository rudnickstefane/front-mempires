import { Castle, CheckCircle, DesignServices, Engineering, MilitaryTech, Public, RocketLaunch, Schedule, TrendingUp } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Card, CardContent, Chip, Container, Divider, Grid, Paper, Skeleton, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import dailyCycle from "@sr/assets/images/daily-cycle-system.jpg";
import websiteOnline from "@sr/assets/images/website-online.jpg";
import { AnimatePresence, useAnimation } from "framer-motion";
import { Calendar, Share2 } from "lucide-react";
import * as motion from "motion/react-client";
import { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useIntl } from "react-intl";
import SwiperCore from "swiper";
import "swiper/css";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const HomeSlideComponent = () => {
  const swiperRef = useRef<SwiperCore | null>(null);
  const [filter, setFilter] = useState<'rent' | 'sale'>('rent');

  const properties = [
    {
      title: "Sistema de Ciclo Diário",
      description: 'O ambiente agora alterna entre dia e noite, afetando visibilidade, ambientação e estratégias de jogo.',
      tags: 'Novo Recurso',
      publishDate: "09 de novembro de 2025",
      forRent: true,
      imageCount: 2,
      image: dailyCycle
    },
    {
      title: "Bem-vindo ao site!",
      description: 'Nosso novo site acaba de entrar no ar! Explore as novidades, acompanhe atualizações e prepare-se para conquistar um novo mundo.',
      tags: 'Site',
      publishDate: "09 de novembro de 2025",
      forRent: true,
      featured: true,
      imageCount: 4,
      videoCount: 1,
      image: websiteOnline
    }
  ];

    const filteredProperties = properties.filter(p =>
    filter === 'rent' ? p.forRent : p.forSale
  );

  const slidesPerPage = 3;
  const [isDragging, setIsDragging] = useState(false);
  const totalSteps = Math.max(filteredProperties.length - slidesPerPage + 1, 1);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [filter]);

  const { ref, inView } = useInView({
    triggerOnce: false, // Allow animations to replay on scroll
    threshold: 0.2,
  });

  const controls = useAnimation(); // Animation controls for parent container

  // Animation variants for the parent container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger child animations
        when: "beforeChildren",
      },
    },
  };

  // Animation variants for child elements
  const childVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Animation variants for Swiper slides
  const slideVariants = {
    hidden: (index: number) => ({
      y: 50,
      opacity: 0,
      transition: { delay: index * 0.1 },
    }),
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: index * 0.1, // Cascade effect for slides
      },
    }),
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [inView, controls]);

  const { formatMessage } = useIntl();
  const [activePhase, setActivePhase] = useState(0);
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  // Fases do Roadmap
  const phases = [
    {
      id: 'foundation',
      title: 'roadmap.phase.foundation.title',
      subtitle: 'roadmap.phase.foundation.subtitle',
      icon: <Engineering />,
      status: 'completed',
      color: 'success',
      updates: [
        {
          id: 'alpha',
          title: 'roadmap.update.alpha.title',
          description: 'roadmap.update.alpha.description',
          status: 'completed',
          date: 'Q4 2024',
          features: [
            'roadmap.feature.core.mechanics',
            'roadmap.feature.basic.units',
            'roadmap.feature.resource.system',
            'roadmap.feature.multiplayer.test'
          ]
        },
        {
          id: 'beta',
          title: 'roadmap.update.beta.title',
          description: 'roadmap.update.beta.description',
          status: 'completed',
          date: 'Q1 2025',
          features: [
            'roadmap.feature.advanced.units',
            'roadmap.feature.tech.tree',
            'roadmap.feature.pvp.arenas',
            'roadmap.feature.guilds.system'
          ]
        }
      ]
    },
    {
      id: 'expansion',
      title: 'roadmap.phase.expansion.title',
      subtitle: 'roadmap.phase.expansion.subtitle',
      icon: <DesignServices />,
      status: 'current',
      color: 'primary',
      updates: [
        {
          id: 'civilizations',
          title: 'roadmap.update.civilizations.title',
          description: 'roadmap.update.civilizations.description',
          status: 'current',
          date: 'Q2 2025',
          features: [
            'roadmap.feature.new.civilizations',
            'roadmap.feature.unique.units',
            'roadmap.feature.cultural.bonuses',
            'roadmap.feature.diplomacy.system'
          ]
        },
        {
          id: 'daynight',
          title: 'roadmap.update.daynight.title',
          description: 'roadmap.update.daynight.description',
          status: 'upcoming',
          date: 'Q3 2025',
          features: [
            'roadmap.feature.daynight.cycle',
            'roadmap.feature.dynamic.weather',
            'roadmap.feature.seasonal.events',
            'roadmap.feature.time.based.units'
          ]
        }
      ]
    },
    {
      id: 'conquest',
      title: 'roadmap.phase.conquest.title',
      subtitle: 'roadmap.phase.conquest.subtitle',
      icon: <MilitaryTech />,
      status: 'upcoming',
      color: 'warning',
      updates: [
        {
          id: 'epic-battles',
          title: 'roadmap.update.epic.battles.title',
          description: 'roadmap.update.epic.battles.description',
          status: 'upcoming',
          date: 'Q4 2025',
          features: [
            'roadmap.feature.siege.weapons',
            'roadmap.feature.naval.combat',
            'roadmap.feature.army.formations',
            'roadmap.feature.hero.units'
          ]
        },
        {
          id: 'world-domination',
          title: 'roadmap.update.world.domination.title',
          description: 'roadmap.update.world.domination.description',
          status: 'planned',
          date: 'Q1 2026',
          features: [
            'roadmap.feature.world.map',
            'roadmap.feature.territory.control',
            'roadmap.feature.alliance.wars',
            'roadmap.feature.ranking.system'
          ]
        }
      ]
    },
    {
      id: 'empire',
      title: 'roadmap.phase.empire.title',
      subtitle: 'roadmap.phase.empire.subtitle',
      icon: <Castle />,
      status: 'planned',
      color: 'secondary',
      updates: [
        {
          id: 'mobile-features',
          title: 'roadmap.update.mobile.features.title',
          description: 'roadmap.update.mobile.features.description',
          status: 'planned',
          date: 'Q2 2026',
          features: [
            'roadmap.feature.mobile.optimization',
            'roadmap.feature.touch.controls',
            'roadmap.feature.offline.progress',
            'roadmap.feature.cloud.saves'
          ]
        }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle color="success" />;
      case 'current': return <Schedule color="primary" />;
      case 'upcoming': return <TrendingUp color="warning" />;
      case 'planned': return <RocketLaunch color="secondary" />;
      default: return <Schedule />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'current': return 'primary';
      case 'upcoming': return 'warning';
      case 'planned': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <Box className="w-full">
      <Box 
    >
      <Container maxWidth="lg">
        {/* Header Épico */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontWeight: 'bold',
                fontFamily: '"Cinzel", serif'
              }}
            >
              {formatMessage({ id: 'roadmap.title' })}
            </Typography>
            <Typography 
              variant="h5" 
              color="white" 
              sx={{ mb: 3, opacity: 0.9 }}
            >
              {formatMessage({ id: 'roadmap.subtitle' })}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip 
                icon={<CheckCircle />} 
                label={formatMessage({ id: 'roadmap.status.completed' })} 
                color="success" 
                variant="outlined"
              />
              <Chip 
                icon={<Schedule />} 
                label={formatMessage({ id: 'roadmap.status.current' })} 
                color="primary" 
                variant="outlined"
              />
              <Chip 
                icon={<TrendingUp />} 
                label={formatMessage({ id: 'roadmap.status.upcoming' })} 
                color="warning" 
                variant="outlined"
              />
              <Chip 
                icon={<RocketLaunch />} 
                label={formatMessage({ id: 'roadmap.status.planned' })} 
                color="secondary" 
                variant="outlined"
              />
            </Box>
          </Box>
        </motion.div>

        {/* Timeline Principal */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper 
              elevation={8} 
              sx={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                p: 4
              }}
            >
              <Stepper activeStep={activePhase} orientation="vertical">
                {phases.map((phase, phaseIndex) => (
                  <Step key={phase.id} expanded>
                    <StepLabel
                      StepIconComponent={() => (
                        <Badge
                          color={getStatusColor(phase.status)}
                          variant="dot"
                          overlap="circular"
                        >
                          <Avatar
                            sx={{
                              bgcolor: 
                                phase.status === 'completed' ? 'success.main' :
                                phase.status === 'current' ? 'primary.main' :
                                phase.status === 'upcoming' ? 'warning.main' : 'secondary.main',
                              width: 56,
                              height: 56
                            }}
                          >
                            {phase.icon}
                          </Avatar>
                        </Badge>
                      )}
                    >
                      <Box sx={{ cursor: 'pointer' }} onClick={() => setActivePhase(phaseIndex)}>
                        <Typography variant="h5" color="white" gutterBottom>
                          {formatMessage({ id: phase.title })}
                        </Typography>
                        <Typography variant="body1" color="grey.300">
                          {formatMessage({ id: phase.subtitle })}
                        </Typography>
                        <Chip 
                          label={formatMessage({ id: `roadmap.status.${phase.status}` })} 
                          color={getStatusColor(phase.status)}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </StepLabel>

                    <StepContent>
                      <Box sx={{ mt: 2 }}>
                        {phase.updates.map((update, updateIndex) => (
                          <motion.div
                            key={update.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: updateIndex * 0.1 }}
                          >
                            <Card 
                              sx={{ 
                                mb: 2,
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  borderColor: 'primary.main'
                                }
                              }}
                              onClick={() => setSelectedUpdate(update)}
                            >
                              <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                  {getStatusIcon(update.status)}
                                  <Typography variant="h6" color="white" sx={{ ml: 1, flexGrow: 1 }}>
                                    {formatMessage({ id: update.title })}
                                  </Typography>
                                  <Chip 
                                    label={update.date} 
                                    color={getStatusColor(update.status)}
                                    variant="outlined"
                                    size="small"
                                  />
                                </Box>
                                <Typography variant="body2" color="grey.300" paragraph>
                                  {formatMessage({ id: update.description })}
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                  {update.features.slice(0, 3).map((feature, featureIndex) => (
                                    <Chip
                                      key={featureIndex}
                                      label={formatMessage({ id: feature })}
                                      size="small"
                                      variant="outlined"
                                      color="primary"
                                    />
                                  ))}
                                  {update.features.length > 3 && (
                                    <Chip
                                      label={`+${update.features.length - 3}`}
                                      size="small"
                                      variant="outlined"
                                    />
                                  )}
                                </Box>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          </Grid>

          {/* Painel de Detalhes */}
          <Grid item xs={12} md={4}>
            <AnimatePresence>
              {selectedUpdate ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Paper 
                    elevation={8}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                      p: 3,
                      position: 'sticky',
                      top: 24
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      {getStatusIcon(selectedUpdate.status)}
                      <Typography variant="h5" color="white" sx={{ ml: 1, flexGrow: 1 }}>
                        {formatMessage({ id: selectedUpdate.title })}
                      </Typography>
                    </Box>

                    <Chip 
                      label={selectedUpdate.date} 
                      color={getStatusColor(selectedUpdate.status)}
                      sx={{ mb: 2 }}
                    />

                    <Typography variant="body1" color="grey.300" paragraph>
                      {formatMessage({ id: selectedUpdate.description })}
                    </Typography>

                    <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.1)' }} />

                    <Typography variant="h6" color="white" gutterBottom>
                      {formatMessage({ id: 'roadmap.features.title' })}
                    </Typography>
                    
                    <Box component="ul" sx={{ pl: 2 }}>
                      {selectedUpdate.features.map((feature, index) => (
                        <Typography 
                          key={index}
                          component="li" 
                          variant="body2" 
                          color="grey.300"
                          sx={{ mb: 1 }}
                        >
                          {formatMessage({ id: feature })}
                        </Typography>
                      ))}
                    </Box>
                  </Paper>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Paper 
                    sx={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 4,
                      p: 4,
                      textAlign: 'center',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Public sx={{ fontSize: 64, color: 'grey.500', mb: 2 }} />
                    <Typography variant="h6" color="white" gutterBottom>
                      {formatMessage({ id: 'roadmap.select.update' })}
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      {formatMessage({ id: 'roadmap.select.update.hint' })}
                    </Typography>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>
        </Grid>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Box textAlign="center" mt={8}>
            <Typography variant="h4" color="white" gutterBottom>
              {formatMessage({ id: 'roadmap.cta.title' })}
            </Typography>
            <Typography variant="body1" color="grey.300" paragraph>
              {formatMessage({ id: 'roadmap.cta.description' })}
            </Typography>
            <Button 
              variant="contained" 
              size="large"
              sx={{
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  background: 'linear-gradient(45deg, #d97706, #b45309)'
                }
              }}
            >
              {formatMessage({ id: 'roadmap.cta.button' })}
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div variants={childVariants}>
          <Typography
            className="!font-bold text-primary !text-[4rem] uppercase font-jost"
          >
            Últimas Novidades
          </Typography>
        </motion.div>
        <Box
          className={`${
            isDragging ? "cursor-grabbing" : "cursor-auto"
          } relative select-none`}
          onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
          onMouseLeave={() => swiperRef.current?.autoplay?.start()}
        >
          {loading ? (
            <Box className="flex justify-center gap-8">
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  className="rounded-2xl shadow-md overflow-hidden w-[419.33px] h-[444px]"
                >
                  <Skeleton
                    variant="rectangular"
                    height={256}
                    className="rounded-t-2xl w-full"
                  />
                  <Box className="p-4 !-mt-2">
                    <Skeleton
                      variant="text"
                      className="w-full !h-[4rem]"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[2rem] !-mt-2"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[2.7rem] !-mt-1.5"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[1.4rem] !-mt-1"
                      animation="wave"
                    />
                    <Skeleton
                      variant="text"
                      className="w-full !h-[1.4rem] !mt-1"
                      animation="wave"
                    />
                  </Box>
                </Box>
              ))}
            </Box>
          ) : (
            <Swiper
              key={filter}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const realIndex = swiper.realIndex;
                const pageIndex = realIndex % totalSteps;
                setCurrentPage(pageIndex);
              }}
              loop={true}
              speed={800}
              spaceBetween={30}
              slidesPerView={1.1}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className={`${
                isDragging ? "cursor-grabbing" : "cursor-auto"
              } select-none`}
              breakpoints={{
                768: { slidesPerView: 2.1 },
                1024: { slidesPerView: slidesPerPage },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              modules={[Autoplay]}
            >
              {filteredProperties.map((property, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    custom={index}
                    variants={slideVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                  >
                    <Box className="rounded-2xl shadow-md overflow-hidden p-3 bg-white">
                      <Box className="relative">
                        <Box className='gradient-card-box rounded-xl' />
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-64 object-cover rounded-xl"
                        />
                        <div className="absolute top-2 right-2 flex gap-2 items-center">
                          <div className="flex items-center bg-white text-xs px-2 py-1 rounded">
                            <Calendar className="w-4 h-4 mr-1" />
                            {property.publishDate}
                          </div>
                        </div>
                        <Box className="flex flex-col absolute bottom-0 p-4 gap-2 z-[1]">
                          <Box>
                            <Typography className="text-white !text-2xl !font-semibold !mb-2">
                              {property.title}
                            </Typography>
                            <Typography className="!text-sm text-gray-400">
                              {property.description}
                            </Typography>
                          </Box>
                          <Box className="flex justify-between gap-2">
                            {property.tags && (
                              <Typography className="bg-white !font-bold !text-xs px-2 py-1 rounded uppercase">
                                {property.tags}
                              </Typography>
                            )}
                            <button className="bg-white p-1 rounded-full">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <motion.div variants={childVariants}>
            <Box className="flex items-center justify-center gap-3 p-5">
              <Button
                onClick={() => swiperRef.current?.slidePrev()}
                variant="outlined"
                className="flex flex-row items-center !min-w-0 !rounded-full !min-h-0 w-[3rem] h-[3rem]"
              >
                <FaArrowLeft className="text-[1.25rem] color-primary" />
              </Button>
              <Box className="flex space-x-3 py-2 px-5 rounded-xl shadow-lg border-gray border">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                    className={`flex justify-center items-center rounded-full cursor-pointer ${
                      currentPage === index
                        ? "w-4 h-4 border-blue-500 border-[2px]"
                        : "w-4 h-4 bg-transparent"
                    }`}
                  >
                    <Box
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        currentPage === index ? "bg-secondary" : "bg-blue-200"
                      }`}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                onClick={() => swiperRef.current?.slideNext()}
                variant="outlined"
                className="flex flex-row items-center !min-w-0 !rounded-full !min-h-0 w-[3rem] h-[3rem]"
              >
                <FaArrowRight className="text-[1.25rem] color-primary" />
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default HomeSlideComponent;