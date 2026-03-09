import React, { useState, useEffect, useRef } from 'react';
import { WeddingIcons, WeddingIconOptions } from './components/WeddingIcons.jsx';
import logo from './assets/logo.png';
import wreathIvory from './assets/wreath_ivory.png';

const CustomRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    description: '',
    links: '',
    email: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send data to backend. We mock it here:
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ description: '', links: '', email: '', phone: '' });
        onClose();
      }, 3000);
    }, 800);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="lux-container" style={{
        background: '#fdfaf5', // Solid background color
        backgroundImage: 'var(--paper-texture)', // Overlay the texture on top of the solid color
        padding: '3rem', borderRadius: '8px', maxWidth: '600px', width: '100%',
        boxShadow: '0 20px 50px rgba(0,0,0,0.3)', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'none',
          border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--accent-gold)'
        }}>✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 className="serif" style={{ color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>Запитването е изпратено!</h2>
            <p className="serif" style={{ color: '#666', fontSize: '1.2rem' }}>Ще се свържем с Вас съвсем скоро, за да обсъдим детайлите за Вашата мечтана покана. ✨</p>
          </div>
        ) : (
          <>
            <h2 className="serif" style={{ textAlign: 'center', color: 'var(--accent-gold-dark)', fontSize: '2.2rem', marginBottom: '1rem' }}>Вашата Мечтана Покана</h2>
            <p className="serif" style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>Разкажете ни как си представяте перфектната покана. Ние ще я създадем специално за Вас.</p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label className="serif" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold-dark)' }}>Описание</label>
                <textarea
                  required
                  placeholder="Опишете цветове, тема, стил (напр. романтична, минималистична, винтидж)..."
                  className="lux-input"
                  style={{ width: '100%', minHeight: '120px', resize: 'vertical' }}
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="serif" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold-dark)' }}>Примерни Линкове (Опционално)</label>
                <input
                  type="text"
                  placeholder="Pinterest, Instagram, или други сайтове за вдъхновение"
                  className="lux-input"
                  style={{ width: '100%' }}
                  value={formData.links}
                  onChange={e => setFormData({ ...formData, links: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="serif" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold-dark)' }}>Имейл</label>
                  <input
                    required type="email" placeholder="vasheto@ime.com"
                    className="lux-input" style={{ width: '100%' }}
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="serif" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-gold-dark)' }}>Телефон</label>
                  <input
                    required type="tel" placeholder="+359..."
                    className="lux-input" style={{ width: '100%' }}
                    value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="lux-btn" style={{ marginTop: '1rem' }}>
                Изпрати Запитване
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const IconPicker = ({ currentIcon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const SelectedIcon = WeddingIcons[currentIcon] || WeddingIcons['✨'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '50px',
          height: '50px',
          padding: '10px',
          background: 'rgba(255,255,255,0.8)',
          border: '1px solid var(--accent-gold)',
          borderRadius: '4px',
          cursor: 'pointer',
          color: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          zIndex: isOpen ? 101 : 1
        }}
      >
        <SelectedIcon style={{ width: '24px', height: '24px' }} />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '0',
          background: 'white',
          border: '1px solid var(--accent-gold)',
          borderRadius: '8px',
          padding: '15px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '10px',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          zIndex: 1000,
          width: '240px'
        }}>
          {WeddingIconOptions.map((option) => {
            const Icon = WeddingIcons[option.key];
            const isSelected = currentIcon === option.key;
            return (
              <button
                key={option.key}
                type="button"
                title={option.label}
                onClick={() => {
                  onSelect(option.key);
                  setIsOpen(false);
                }}
                style={{
                  padding: '8px',
                  background: isSelected ? 'var(--accent-gold)' : 'white',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: isSelected ? 'white' : 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.2s',
                  height: '42px'
                }}
              >
                <Icon style={{ width: '20px', height: '20px' }} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CreatorForm = ({ data, onChange, onSubmit, onLogin, onRegister }) => {
  const [formData, setFormData] = useState(data || {
    eventType: 'wedding', // 'wedding', 'christening', 'birthday', 'jubilee'
    groom: '',
    bride: '',
    childName: '', // For Christening
    childGender: 'boy', // 'boy' or 'girl'
    godparents: '', // For Christening
    church: '', // For Christening
    parents: '', // For Christening/Birthday
    birthdayPerson: '', // For Birthday
    illustrativeTheme: 'bear', // 'bear', 'angel', 'star', 'balloon'
    jubileePerson: '', // For Jubilee
    jubileeYears: '', // For Jubilee
    date: '',
    time: '',
    location: '',
    locationLink: '',
    message: '',
    photos: [],
    venuePhoto: null,
    showProgram: true,
    program: [
      { time: '13:00', activity: 'Подготовка на булката и младоженеца', icon: '👔' },
      { time: '15:00', activity: 'Взимана на кумове и крадене на булката', icon: '💍' },
      { time: '16:00', activity: 'Църковен ритуал', icon: '⛪' },
      { time: '17:00', activity: 'Сватбена фотосесия', icon: '📸' },
      { time: '17:30', activity: 'Граждански ритуал', icon: '✍️' },
      { time: '19:00', activity: 'Вечеря и празнуване', icon: '🥂' }
    ]
  });

  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [isProgramDetailsOpen, setIsProgramDetailsOpen] = useState(false);

  const updateProgramDefaults = (type) => {
    let newProgram = [];
    if (type === 'wedding') {
      newProgram = [
        { time: '13:00', activity: 'Подготовка на булката и младоженеца', icon: '👔' },
        { time: '15:00', activity: 'Взимана на кумове и крадене на булката', icon: '💍' },
        { time: '16:00', activity: 'Църковен ритуал', icon: '⛪' },
        { time: '17:00', activity: 'Сватбена фотосесия', icon: '📸' },
        { time: '17:30', activity: 'Граждански ритуал', icon: '✍️' },
        { time: '19:00', activity: 'Вечеря и празнуване', icon: '🥂' }
      ];
    } else if (type === 'christening') {
      newProgram = [
        { time: '11:00', activity: 'Ритуал в храма', icon: '⛪' },
        { time: '12:30', activity: 'Фотосесия', icon: '📸' },
        { time: '13:30', activity: 'Празничен обяд', icon: '🍽️' },
        { time: '15:30', activity: 'Торта и изненади', icon: '🍰' }
      ];
    } else if (type === 'birthday') {
      newProgram = [
        { time: '18:00', activity: 'Посрещане на гостите', icon: '🥂' },
        { time: '19:00', activity: 'Начало на партито', icon: '💃' },
        { time: '21:00', activity: 'Торта и наздравици', icon: '🍰' }
      ];
    } else if (type === 'jubilee') {
      newProgram = [
        { time: '19:00', activity: 'Посрещане и коктейл', icon: '🥂' },
        { time: '20:00', activity: 'Официална вечеря', icon: '🍽️' },
        { time: '21:30', activity: 'Поздрави и ретроспекция', icon: '📸' },
        { time: '22:30', activity: 'Торта', icon: '🍰' }
      ];
    }
    setFormData(prev => ({ ...prev, eventType: type, program: newProgram }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
  };

  const handleVenuePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, venuePhoto: URL.createObjectURL(file) }));
    }
  };

  const handleProgramChange = (index, field, value) => {
    const newProgram = [...formData.program];
    newProgram[index][field] = value;
    setFormData(prev => ({ ...prev, program: newProgram }));
  };

  const addProgramItem = () => {
    setFormData(prev => ({
      ...prev,
      program: [...prev.program, { time: '', activity: '', icon: '✨' }]
    }));
  };

  const removeProgramItem = (index) => {
    setFormData(prev => ({
      ...prev,
      program: prev.program.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ background: 'var(--paper-bg)', minHeight: '100vh' }}>
      {/* Premium Header */}
      <nav style={{
        padding: '1rem clamp(1rem, 5vw, 4rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(15px)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.03)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="PokaniPro Logo" style={{ height: '40px', mixBlendMode: 'multiply' }} />
          <span className="serif" style={{ fontSize: '1.6rem', letterSpacing: '3px', color: 'var(--accent-gold-dark)', fontWeight: '500' }}>PokaniPro</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 5vw, 4rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(1rem, 3vw, 2rem)' }}>
            <span
              className="serif"
              style={{ fontSize: 'clamp(0.8rem, 3vw, 0.9rem)', letterSpacing: '2px', cursor: 'pointer', opacity: 0.8, textTransform: 'uppercase', fontWeights: '600' }}
              onClick={() => scrollToSection('features')}
            >
              Функции
            </span>
            <span
              className="serif"
              style={{ fontSize: 'clamp(0.8rem, 3vw, 0.9rem)', letterSpacing: '2px', cursor: 'pointer', opacity: 0.8, textTransform: 'uppercase', fontWeights: '600' }}
              onClick={() => document.getElementById('designer').scrollIntoView({ behavior: 'smooth' })}
            >
              Създай
            </span>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button
              onClick={onLogin}
              className="serif"
              style={{
                background: 'none',
                border: 'none',
                fontSize: 'clamp(0.8rem, 3vw, 0.9rem)',
                letterSpacing: '2px',
                cursor: 'pointer',
                color: '#444',
                textTransform: 'uppercase'
              }}
            >
              Вход
            </button>
            <button
              onClick={onRegister}
              className="lux-btn"
              style={{
                padding: '0.6rem clamp(1rem, 3vw, 1.8rem)',
                fontSize: 'clamp(0.7rem, 2.5vw, 0.8rem)',
                letterSpacing: '2px'
              }}
            >
              Регистрация
            </button>
          </div>
        </div>
      </nav>

      {/* High-Tech Innovative Hero Section */}
      <div id="hero" style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '6rem 2rem 2rem 2rem', // Account for fixed nav
        overflow: 'hidden',
        background: '#0a0a0a', // Dark, sleek high-tech background
      }}>
        {/* Animated Glowing Orbs Behind */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100vw', maxWidth: '800px', maxHeight: '800px', zIndex: 0, opacity: 0.6 }}>
          <div style={{ position: 'absolute', top: '20%', left: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(197,160,89,0.3) 0%, transparent 70%)', filter: 'blur(40px)', animation: 'float 8s ease-in-out infinite' }}></div>
          <div style={{ position: 'absolute', bottom: '20%', right: '20%', width: '50%', height: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'float 12s ease-in-out infinite reverse' }}></div>
        </div>

        {/* Global Keyframes for the animation are needed, but we can do a simple inline trick or just let it be static if keyframes aren't defined. We'll rely on the CSS filter block for an amazing look regardless */}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: '1200px', width: '100%', zIndex: 1, position: 'relative' }}>

          {/* Text Content */}
          <div style={{ textAlign: 'center', padding: '0 1rem' }}>
            <span className="serif" style={{ display: 'inline-block', color: 'var(--accent-gold)', fontSize: 'clamp(0.7rem, 2.5vw, 0.85rem)', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 'bold', padding: '5px 15px', border: '1px solid rgba(197,160,89,0.3)', borderRadius: '20px', background: 'rgba(197,160,89,0.05)' }}>
              Технологията среща Изкуството
            </span>
            <h1 className="serif" style={{ fontSize: 'clamp(2.2rem, 8vw, 4.8rem)', color: '#fff', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Интелигентни Дигитални Покани.
            </h1>
            <p className="serif" style={{ fontSize: 'clamp(1rem, 4vw, 1.2rem)', color: '#aaa', lineHeight: '1.7', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
              Край на хартията. Подарете на гостите си изумително дигитално преживяване, което спира дъха. С мигновена доставка, жива програма и умна навигация директно в техния телефон.
            </p>
            <button
              style={{
                fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)',
                padding: '1.1rem clamp(1.5rem, 5vw, 2.5rem)',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(197, 160, 89, 0.25)',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                document.getElementById('designer').scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Създай Сега
            </button>
          </div>

          {/* 3D Glass Floating Card Showcase */}
          <div style={{ perspective: '1000px', display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div style={{
              width: 'clamp(260px, 80vw, 320px)',
              height: 'clamp(400px, 120vw, 500px)',
              background: 'rgba(25, 25, 25, 0.4)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderTop: '1px solid rgba(255, 255, 255, 0.3)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              boxShadow: '0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(197,160,89,0.2)',
              transform: 'rotateY(-15deg) rotateX(10deg) translateY(-10px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Card Inner Reflections */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)', pointerEvents: 'none' }}></div>
              {/* Luxury Invitation Mockup */}
              <div style={{
                position: 'absolute',
                top: '5%',
                left: '5%',
                right: '5%',
                bottom: '5%',
                background: '#fdfaf5', // Ivory paper
                borderRadius: '16px',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(197,160,89,0.1)',
                border: '1px solid rgba(197,160,89,0.3)',
                overflow: 'hidden'
              }}>
                {/* Subtle ornament top */}
                <svg width="60" height="20" viewBox="0 0 100 30" fill="none" style={{ marginBottom: '1rem', opacity: 0.6 }}>
                  <path d="M10 15 Q50 -5 90 15" stroke="var(--accent-gold)" strokeWidth="1" fill="none" />
                  <circle cx="50" cy="8" r="3" fill="var(--accent-gold)" />
                </svg>

                <p className="serif" style={{ fontSize: '0.6rem', letterSpacing: '3px', color: '#777', textTransform: 'uppercase', marginBottom: '0.5rem' }}>С Голямо Удоволствие</p>
                <p className="serif" style={{ fontSize: '0.7rem', color: '#555', marginBottom: '1.5rem' }}>Ви Каним на Нашата Сватба</p>

                <h3 style={{ fontFamily: '"Great Vibes", cursive, serif', fontSize: '2.5rem', color: 'var(--accent-gold-dark)', margin: '0 0 0.5rem 0', fontWeight: 'normal', lineHeight: '1.2' }}>Александър</h3>
                <span style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '0.5rem', fontStyle: 'italic' }}>&</span>
                <h3 style={{ fontFamily: '"Great Vibes", cursive, serif', fontSize: '2.5rem', color: 'var(--accent-gold-dark)', margin: '0 0 1.5rem 0', fontWeight: 'normal', lineHeight: '1.2' }}>София</h3>

                <div style={{ width: '30px', height: '1px', background: 'var(--accent-gold)', marginBottom: '1rem', opacity: 0.5 }}></div>

                <p className="serif" style={{ fontSize: '0.8rem', letterSpacing: '2px', color: '#444', fontWeight: 'bold', marginBottom: '0.3rem' }}>14.09.2026</p>
                <p className="serif" style={{ fontSize: '0.65rem', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Резиденция Тера</p>

                {/* Subtle ornament bottom */}
                <svg width="60" height="20" viewBox="0 0 100 30" fill="none" style={{ marginTop: 'auto', opacity: 0.6 }}>
                  <path d="M10 15 Q50 35 90 15" stroke="var(--accent-gold)" strokeWidth="1" fill="none" />
                  <circle cx="50" cy="22" r="3" fill="var(--accent-gold)" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Modern Features Section (Ultra Compact Full Width Marquee) */}
      <div id="features" style={{ padding: '0.5rem 0', background: 'white', overflow: 'hidden', borderBottom: '1px solid rgba(197, 160, 89, 0.05)' }}>
        <div className="marquee-container" style={{ paddingBottom: '0' }}>
          <div className="marquee-content">
            {/* First Set of Items */}
            {[
              { icon: '📸', title: 'Дигитални Албуми', desc: 'Споделете неограничен брой професионални снимки.' },
              { icon: '🗺️', title: 'Интелигентна Навигация', desc: 'Google Maps интеграция за Вашите гости.' },
              { icon: '💍', title: 'Премиум Визия', desc: 'Дизайн, вдъхновен от най-скъпите италиански покани.' },
              { icon: '👔', title: 'Жива Програма', desc: 'Интерактивен график за всеки момент от деня.' },
              { icon: '✍️', title: 'Онлайн RSVP', desc: 'Получавайте потвърждения директно в своя панел.' },
              { icon: '✨', title: 'Мобилна Оптимизация', desc: 'Перфектна визия на всеки телефон или таблет.' },
              { icon: '🎻', title: 'Музикален Фон', desc: 'Любимата Ви песен посреща Вашите гости.' },
              { icon: '🎁', title: 'Списък с Подаръци', desc: 'Улеснете гостите си с дигитален списък.' },
              { icon: '🏛️', title: 'История на Мястото', desc: 'Снимка и описание на Вашата локация.' }
            ].map((feature, idx) => (
              <div key={`feat-1-${idx}`} style={{ textAlign: 'center', minWidth: '210px', maxWidth: '230px', background: '#fafafa', padding: '1.2rem 1rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '45px', height: '45px', margin: '0 auto 1rem auto', background: '#fdfaf5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => { const Icon = WeddingIcons[feature.icon]; return Icon ? <Icon style={{ width: '22px', height: '22px', color: 'var(--accent-gold-dark)' }} /> : null; })()}
                </div>
                <h4 className="serif" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', whiteSpace: 'normal', color: '#222' }}>{feature.title}</h4>
                <p className="serif" style={{ color: '#777', lineHeight: '1.4', whiteSpace: 'normal', fontSize: '0.85rem' }}>{feature.desc}</p>
              </div>
            ))}

            {/* Second Set of Items */}
            {[
              { icon: '📸', title: 'Дигитални Албуми', desc: 'Споделете неограничен брой професионални снимки.' },
              { icon: '🗺️', title: 'Интелигентна Навигация', desc: 'Google Maps интеграция за Вашите гости.' },
              { icon: '💍', title: 'Премиум Визия', desc: 'Дизайн, вдъхновен от най-скъпите италиански покани.' },
              { icon: '👔', title: 'Жива Програма', desc: 'Интерактивен график за всеки момент от деня.' },
              { icon: '✍️', title: 'Онлайн RSVP', desc: 'Получавайте потвърждения директно в своя панел.' },
              { icon: '✨', title: 'Мобилна Оптимизация', desc: 'Перфектна визия на всеки телефон или таблет.' },
              { icon: '🎻', title: 'Музикален Фон', desc: 'Любимата Ви песен посреща Вашите гости.' },
              { icon: '🎁', title: 'Списък с Подаръци', desc: 'Улеснете гостите си с дигитален списък.' },
              { icon: '🏛️', title: 'История на Мястото', desc: 'Снимка и описание на Вашата локация.' }
            ].map((feature, idx) => (
              <div key={`feat-2-${idx}`} style={{ textAlign: 'center', minWidth: '210px', maxWidth: '230px', background: '#fafafa', padding: '1.2rem 1rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '45px', height: '45px', margin: '0 auto 1rem auto', background: '#fdfaf5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {(() => { const Icon = WeddingIcons[feature.icon]; return Icon ? <Icon style={{ width: '22px', height: '22px', color: 'var(--accent-gold-dark)' }} /> : null; })()}
                </div>
                <h4 className="serif" style={{ fontSize: '1.1rem', marginBottom: '0.5rem', whiteSpace: 'normal', color: '#222' }}>{feature.title}</h4>
                <p className="serif" style={{ color: '#777', lineHeight: '1.4', whiteSpace: 'normal', fontSize: '0.85rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Creator Form Section */}
      <div id="designer" className="lux-container" style={{ maxWidth: '1000px', padding: '1rem 2rem 4rem 2rem' }}>
        <div className="paper-surface" style={{ padding: '5rem 4rem', border: '1px solid rgba(197, 160, 89, 0.2)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
          {/* Subtle Background Ornament */}
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', opacity: 0.05, transform: 'rotate(45deg)' }}>
            <img src={wreathIvory} alt="bg" style={{ width: '400px' }} />
          </div>

          <h2 className="serif" style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--accent-gold-dark)', fontSize: 'clamp(1.8rem, 6vw, 3rem)', letterSpacing: 'clamp(2px, 1vw, 6px)' }}>
            СЪЗДАЙТЕ ВАШАТА МОДЕРНА ПОКАНА
          </h2>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'wedding', label: 'Сватба', icon: '💍' },
              { id: 'christening', label: 'Кръщене', icon: '👼' },
              { id: 'birthday', label: 'Рожден Ден', icon: '🎂' },
              { id: 'jubilee', label: 'Юбилей', icon: '🎊' }
            ].map(type => (
              <button
                key={type.id}
                type="button"
                onClick={() => updateProgramDefaults(type.id)}
                className="serif"
                style={{
                  padding: '1rem 2rem',
                  background: formData.eventType === type.id ? 'var(--accent-gold)' : 'white',
                  color: formData.eventType === type.id ? 'white' : 'var(--accent-gold-dark)',
                  border: '1px solid var(--accent-gold)',
                  borderRadius: '30px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  letterSpacing: '2px',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span>{type.icon}</span> <span style={{ whiteSpace: 'nowrap' }}>{type.label}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Main Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
              {formData.eventType === 'wedding' && (
                <>
                  <div>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>МЛАДОЖЕНЕЦ</label>
                    <input type="text" name="groom" className="lux-input" placeholder="Име..." value={formData.groom} onChange={handleChange} required />
                  </div>
                  <div>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>БУЛКА</label>
                    <input type="text" name="bride" className="lux-input" placeholder="Име..." value={formData.bride} onChange={handleChange} required />
                  </div>
                </>
              )}

              {formData.eventType === 'christening' && (
                <>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ИМЕ НА ДЕТЕТО</label>
                    <input type="text" name="childName" className="lux-input" placeholder="Име..." value={formData.childName} onChange={handleChange} required />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ХРАМ / ЦЪРКВА</label>
                    <input type="text" name="church" className="lux-input" placeholder="Име на църквата..." value={formData.church} onChange={handleChange} />
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div>
                      <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>РОДИТЕЛИ</label>
                      <input type="text" name="parents" className="lux-input" placeholder="Имена..." value={formData.parents} onChange={handleChange} />
                    </div>
                    <div>
                      <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>КРЪСТНИЦИ</label>
                      <input type="text" name="godparents" className="lux-input" placeholder="Имена..." value={formData.godparents} onChange={handleChange} />
                    </div>
                  </div>
                  <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '1.5rem', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ПОЛ:</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      {['boy', 'girl'].map(gender => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, childGender: gender }))}
                          className="serif"
                          style={{
                            padding: '0.5rem 1.5rem',
                            background: formData.childGender === gender ? (gender === 'boy' ? '#7FB3D5' : '#F1948A') : 'white',
                            color: formData.childGender === gender ? 'white' : '#777',
                            border: `1px solid ${gender === 'boy' ? '#7FB3D5' : '#F1948A'}`,
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '0.8rem',
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {gender === 'boy' ? 'Момче 👦' : 'Момиче 👧'}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {formData.eventType === 'birthday' && (
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ИМЕ НА РОЖДЕНИКА</label>
                  <input type="text" name="birthdayPerson" className="lux-input" placeholder="Име..." value={formData.birthdayPerson} onChange={handleChange} required />
                </div>
              )}

              {formData.eventType === 'jubilee' && (
                <>
                  <div style={{ gridColumn: window.innerWidth <= 600 ? '1 / -1' : 'auto' }}>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ИМЕ НА ЮБИЛЯРА</label>
                    <input type="text" name="jubileePerson" className="lux-input" placeholder="Име..." value={formData.jubileePerson} onChange={handleChange} required />
                  </div>
                  <div style={{ gridColumn: window.innerWidth <= 600 ? '1 / -1' : 'auto' }}>
                    <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ГОДИНИ (ЮБИЛЕЙ)</label>
                    <input type="number" name="jubileeYears" className="lux-input" placeholder="Напр. 50" value={formData.jubileeYears} onChange={handleChange} required />
                  </div>
                </>
              )}
            </div>

            {(formData.eventType === 'christening' || formData.eventType === 'birthday') && (
              <div style={{ margin: '2rem 0', padding: '2rem', border: '1px solid rgba(197, 160, 89, 0.2)', background: 'rgba(255,255,255,0.1)' }}>
                <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px', display: 'block', marginBottom: '1.5rem', textAlign: 'center' }}>ТЕМА НА ДЕКОРАЦИЯТА</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
                  {[
                    { id: 'none', label: 'Без тема (за възрастни) ✨' },
                    { id: 'bear', label: 'Мече 🧸' },
                    { id: 'angel', label: 'Ангелче 👼' },
                    { id: 'star', label: 'Звездички 🌟' },
                    { id: 'balloon', label: 'Балони 🎈' }
                  ].map(theme => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, illustrativeTheme: theme.id }))}
                      className="serif"
                      style={{
                        padding: '1.5rem',
                        background: formData.illustrativeTheme === theme.id ? 'var(--accent-gold-dark)' : 'white',
                        color: formData.illustrativeTheme === theme.id ? 'white' : '#777',
                        border: `1px solid var(--accent-gold)`,
                        borderRadius: '15px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        textAlign: 'center',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '0.8rem',
                        boxShadow: formData.illustrativeTheme === theme.id ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
                      }}
                    >
                      {theme.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '1rem' }}>
              <div>
                <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ДАТА</label>
                <input type="date" name="date" className="lux-input" value={formData.date} onChange={handleChange} required />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'clamp(1.5rem, 5vw, 3rem)', marginTop: '1rem', marginBottom: '3rem' }}>
              <div>
                <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ЛОКАЦИЯ (РЕСТОРАНТ)</label>
                <input type="text" name="location" className="lux-input" placeholder="напр. Резиденция..." value={formData.location} onChange={handleChange} required />
              </div>
              <div>
                <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>GPS ЛОКАЦИЯ (Google Maps линк)</label>
                <input type="url" name="locationLink" className="lux-input" placeholder="https://maps.app.goo.gl/..." value={formData.locationLink} onChange={handleChange} />
              </div>
            </div>

            {/* Program Toggle & Editor */}
            <div style={{ margin: '2rem 0', padding: '2rem', border: '1px solid rgba(197, 160, 89, 0.2)', background: 'rgba(255,255,255,0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: (formData.showProgram && isProgramDetailsOpen) ? '2rem' : '0' }}>
                <input
                  type="checkbox"
                  name="showProgram"
                  id="showProgram"
                  checked={formData.showProgram}
                  onChange={(e) => {
                    handleChange(e);
                    // Automatically open details when checking the box, close when unchecking
                    if (e.target.checked) {
                      setIsProgramDetailsOpen(true);
                    } else {
                      setIsProgramDetailsOpen(false);
                    }
                  }}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-gold)' }}
                />
                <label htmlFor="showProgram" className="serif" style={{ fontSize: '1.2rem', color: 'var(--accent-gold-dark)', cursor: 'pointer', fontWeight: 'bold' }}>
                  Включи официална програма за деня
                </label>
              </div>

              {formData.showProgram && (
                <div style={{ paddingLeft: '2.5rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    onClick={() => setIsProgramDetailsOpen(!isProgramDetailsOpen)}
                    className="serif"
                    style={{
                      background: 'none',
                      border: '1px solid var(--accent-gold)',
                      borderRadius: '20px',
                      padding: '0.4rem 1.2rem',
                      fontSize: '0.85rem',
                      color: 'var(--accent-gold-dark)',
                      cursor: 'pointer',
                      marginBottom: isProgramDetailsOpen ? '1.5rem' : '0',
                      transition: 'all 0.3s'
                    }}
                  >
                    {isProgramDetailsOpen ? 'Скрий подробности ▲' : 'Подробности ▼'}
                  </button>

                  {isProgramDetailsOpen && (
                    <div style={{ marginTop: '1rem' }}>
                      {formData.program.map((item, index) => (
                        <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem', alignItems: 'center' }}>
                          <IconPicker
                            currentIcon={item.icon}
                            onSelect={(newIcon) => handleProgramChange(index, 'icon', newIcon)}
                          />
                          <input
                            type="time"
                            value={item.time}
                            onChange={(e) => handleProgramChange(index, 'time', e.target.value)}
                            className="lux-input"
                            style={{ width: '90px', margin: 0 }}
                          />
                          <input
                            type="text"
                            value={item.activity}
                            onChange={(e) => handleProgramChange(index, 'activity', e.target.value)}
                            placeholder="Дейност..."
                            className="lux-input"
                            style={{ flex: 2, margin: 0 }}
                          />
                          <button
                            type="button"
                            onClick={() => removeProgramItem(index)}
                            style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}
                          >✕</button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addProgramItem}
                        className="lux-btn"
                        style={{ fontSize: '0.8rem', padding: '0.5rem 1.5rem', marginTop: '1rem' }}
                      >+ Добави час</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Photo Management */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              <div style={{ border: '1px dashed var(--accent-gold)', padding: 'clamp(1rem, 4vw, 2rem)', textAlign: 'center' }}>
                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} id="photo-upload" />
                <p className="serif" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--accent-gold-dark)' }}>Снимки на двойката</p>
                <label htmlFor="photo-upload" className="lux-btn" style={{ cursor: 'pointer', fontSize: '0.7rem', display: 'inline-block' }}>Добави снимки</label>

                {/* Photo Preview Added Back - FIX for "not working" */}
                {formData.photos.length > 0 && (
                  <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {formData.photos.map((url, i) => (
                      <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--accent-gold)' }}>
                        <img src={url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ border: '1px dashed var(--accent-gold)', padding: '2rem', textAlign: 'center' }}>
                <input type="file" accept="image/*" onChange={handleVenuePhotoUpload} style={{ display: 'none' }} id="venue-upload" />
                <p className="serif" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--accent-gold-dark)' }}>Снимка на ресторанта</p>
                <label htmlFor="venue-upload" className="lux-btn" style={{ cursor: 'pointer', fontSize: '0.7rem' }}>Качи снимка</label>
                {formData.venuePhoto && (
                  <div style={{ marginTop: '15px' }}>
                    <img src={formData.venuePhoto} alt="venue preview" style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid var(--accent-gold)' }} />
                    <p style={{ fontSize: '0.6rem', color: 'green', marginTop: '5px' }}>Качена ✓</p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <button
                type="submit"
                className="lux-btn"
                style={{
                  minWidth: '350px',
                  fontSize: '1.2rem',
                  padding: '1.2rem 2rem',
                  boxShadow: '0 10px 40px rgba(197, 160, 89, 0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, var(--accent-gold) 0%, var(--accent-gold-dark) 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '30px'
                }}
              >
                Виж Готовата Покана
              </button>

              <button
                type="button"
                onClick={() => setIsCustomModalOpen(true)}
                className="serif"
                style={{
                  background: 'none',
                  color: '#999',
                  border: 'none',
                  borderBottom: '1px solid #ddd',
                  paddingBottom: '2px',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  marginTop: '1.5rem',
                  transition: 'all 0.3s',
                  letterSpacing: '1px'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--accent-gold-dark)'}
                onMouseOut={(e) => e.target.style.color = '#999'}
              >
                Не намираш своята тема? Изпрати запитване за персонализиран дизайн
              </button>
            </div>
          </form>
        </div>
      </div>

      <CustomRequestModal isOpen={isCustomModalOpen} onClose={() => setIsCustomModalOpen(false)} />


      {/* Footer Branding */}
      <footer id="support" style={{ padding: '4rem 0', textAlign: 'center', borderTop: '1px solid rgba(197, 160, 89, 0.1)', background: '#fdfaf5' }}>
        <div style={{ height: '40px', overflow: 'hidden', display: 'inline-flex', alignItems: 'flex-start', justifyContent: 'center' }}>
          <img src={logo} alt="PokaniPro Symbol" style={{ height: '70px', objectFit: 'contain', objectPosition: 'top', opacity: 0.5, mixBlendMode: 'multiply' }} />
        </div>
        <p className="serif" style={{ fontSize: '0.8rem', letterSpacing: '4px', color: 'var(--accent-gold-dark)', marginTop: '1rem', opacity: 0.6 }}>POKANIPRO • © 2026 • ПОДДРЪЖКА: support@pokani.pro</p>
      </footer>
    </div >
  );
};

export default CreatorForm;
