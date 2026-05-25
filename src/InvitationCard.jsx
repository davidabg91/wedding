import React, { useEffect, useState, useRef } from 'react';
import { WeddingIcons } from './components/WeddingIcons.jsx';
import teddyBearImg from './assets/teddy_bear.png';
import angelImg from './assets/angel.png';
import starsImg from './assets/stars.png';
import balloonsImg from './assets/balloons.png';
import wreathIvoryImg from './assets/wreath_ivory.png';
import { submitRSVP } from './firebaseService';

const BaroqueOrnament = ({ style }) => (
    <svg viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'min(400px, 90%)', opacity: 0.35, ...style }}>
        <path d="M250 50C200 10 150 10 100 50C50 90 20 90 0 50" stroke="var(--accent-gold)" strokeWidth="0.8" />
        <path d="M250 50C300 10 350 10 400 50C450 90 480 90 500 50" stroke="var(--accent-gold)" strokeWidth="0.8" />
        <path d="M250 20C230 40 230 60 250 80C270 60 270 40 250 20Z" fill="var(--accent-gold)" opacity="0.2" />
        <circle cx="250" cy="50" r="4" fill="var(--accent-gold)" />
        <path d="M200 50C200 30 220 30 230 50" stroke="var(--accent-gold)" strokeWidth="0.5" />
        <path d="M300 50C300 30 280 30 270 50" stroke="var(--accent-gold)" strokeWidth="0.5" />
    </svg>
);

const SwirlOrnament = ({ style }) => (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60px', opacity: 0.25, ...style }}>
        <path d="M50 50C30 30 30 10 50 10C70 10 70 30 50 50C30 70 10 70 10 50C10 30 30 30 50 50Z" stroke="var(--accent-gold)" strokeWidth="1" />
    </svg>
);

const OrthodoxCross = ({ style }) => (
    <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '40px', ...style }}>
        <path d="M50 10V140M20 40H80M30 70H70M35 120L65 100" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" />
    </svg>
);


const CornerOrnament = ({ position = "top-left", eventType }) => {
    const rotations = {
        "top-left": "0deg",
        "top-right": "90deg",
        "bottom-right": "180deg",
        "bottom-left": "270deg"
    };

    const isChild = eventType === 'christening' || eventType === 'birthday';

    return (
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="corner-ornament"
            style={{
                width: 'min(180px, 40vw)',
                position: 'absolute',
                transform: `rotate(${rotations[position]}) translateZ(25px)`,
                transformStyle: 'preserve-3d',
                opacity: 0.35,
                zIndex: 5,
                ...{
                    "top-left": { top: '-15px', left: '-15px' },
                    "top-right": { top: '-15px', right: '-15px' },
                    "bottom-right": { bottom: '-15px', right: '-15px' },
                    "bottom-left": { bottom: '-15px', left: '-15px' }
                }[position]
            }}>
            {isChild ? (
                // Playful but detailed bubbly/star shape for children
                <>
                    <path d="M10 10C30 0 50 15 50 15C50 15 70 0 90 10C95 12 95 18 90 20C70 30 50 20 50 20C50 20 30 30 10 20C5 18 5 12 10 10Z" fill="var(--accent-gold)" opacity="0.6" />
                    <path d="M10 90C30 100 50 85 50 85C50 85 70 100 90 90C95 88 95 82 90 80C70 70 50 80 50 80C50 80 30 70 10 80C5 82 5 88 10 90Z" fill="var(--accent-gold)" opacity="0.6" />
                    <circle cx="50" cy="50" r="8" fill="var(--accent-gold)" />
                    <circle cx="20" cy="50" r="4" fill="var(--accent-gold)" opacity="0.5" />
                    <circle cx="80" cy="50" r="4" fill="var(--accent-gold)" opacity="0.5" />
                    <circle cx="50" cy="20" r="4" fill="var(--accent-gold)" opacity="0.5" />
                    <circle cx="50" cy="80" r="4" fill="var(--accent-gold)" opacity="0.5" />
                </>
            ) : (
                // Exquisite, complex Baroque floral ornament for weddings/jubilees
                <>
                    <path d="M0 0C30 5 60 20 80 50C95 75 95 90 100 100C90 95 75 95 50 80C20 60 5 30 0 0Z" fill="var(--accent-gold)" opacity="0.15" />
                    <path d="M5 5C25 10 45 25 60 50C70 65 75 80 75 90C65 85 55 80 40 65C20 45 10 25 5 5Z" fill="var(--accent-gold)" opacity="0.4" />
                    <path d="M15 15C30 20 40 30 50 50C55 60 55 70 55 75C45 70 40 60 30 45C20 35 15 25 15 15Z" fill="var(--accent-gold)" opacity="0.8" />
                    <path d="M0 40C20 35 40 40 50 60C55 70 55 80 50 90C45 80 35 75 25 75C15 75 5 80 0 90C5 75 5 55 0 40Z" fill="var(--accent-gold)" opacity="0.3" />
                    <path d="M40 0C35 20 40 40 60 50C70 55 80 55 90 50C80 45 75 35 75 25C75 15 80 5 90 0C75 5 55 5 40 0Z" fill="var(--accent-gold)" opacity="0.3" />
                    <circle cx="65" cy="65" r="4" fill="var(--accent-gold)" />
                    <circle cx="75" cy="75" r="2" fill="var(--accent-gold)" />
                    <circle cx="85" cy="85" r="1.5" fill="var(--accent-gold)" />
                    <circle cx="35" cy="80" r="1.5" fill="var(--accent-gold)" />
                    <circle cx="80" cy="35" r="1.5" fill="var(--accent-gold)" />
                </>
            )}
        </svg>
    );
};

const WaxSealStamp = ({ theme, monogram }) => {
    return (
        <div className="wax-stamp-container" style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            margin: '1.5rem auto',
            perspective: '500px',
        }}>
            <svg viewBox="0 0 80 80" className="wax-stamp-element" style={{
                width: '100%',
                height: '100%',
                filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.45))'
            }}>
                <defs>
                    <radialGradient id="stampWaxGrad" cx="35%" cy="35%" r="65%">
                        {theme.waxColor === '#c5a059' ? (
                            <>
                                <stop offset="0%" stopColor="#d9b655" />
                                <stop offset="70%" stopColor="#9e7d44" />
                                <stop offset="100%" stopColor="#57421c" />
                            </>
                        ) : theme.waxColor === '#e07a7a' ? (
                            <>
                                <stop offset="0%" stopColor="#f3a7a7" />
                                <stop offset="70%" stopColor="#e07a7a" />
                                <stop offset="100%" stopColor="#9c3e3e" />
                            </>
                        ) : theme.waxColor === '#5d92b8' ? (
                            <>
                                <stop offset="0%" stopColor="#8db6d4" />
                                <stop offset="70%" stopColor="#5d92b8" />
                                <stop offset="100%" stopColor="#2c5c7d" />
                            </>
                        ) : theme.primary === '#4B0082' ? (
                            <>
                                <stop offset="0%" stopColor="#a376eb" />
                                <stop offset="70%" stopColor="#5a22b0" />
                                <stop offset="100%" stopColor="#2b0561" />
                            </>
                        ) : (
                            <>
                                <stop offset="0%" stopColor="#b52626" />
                                <stop offset="70%" stopColor="#801414" />
                                <stop offset="100%" stopColor="#400505" />
                            </>
                        )}
                    </radialGradient>
                </defs>
                <path d="M 40 5 Q 58 7 70 20 Q 78 38 75 55 Q 70 75 52 77 Q 32 79 16 70 Q 5 54 8 35 Q 11 12 40 5 Z" fill="url(#stampWaxGrad)" />
                <ellipse cx="26" cy="22" rx="15" ry="7" fill="rgba(255,255,255,0.18)" transform="rotate(-30, 26, 22)" filter="blur(1.5px)" />
                <circle cx="40" cy="40" r="26" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
                <circle cx="40" cy="40" r="24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
                <text 
                    x="40" 
                    y="46" 
                    fontFamily="'Cormorant Garamond', serif" 
                    fontSize="13" 
                    fontWeight="700" 
                    fill="url(#goldGradient)" 
                    textAnchor="middle" 
                    letterSpacing="0.5"
                    style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                >
                    {monogram}
                </text>
            </svg>
        </div>
    );
};

const GoldParticles = () => {
    return (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            {[...Array(50)].map((_, i) => {
                const size = Math.random() * 4 + 2;
                const left = Math.random() * 100;
                const delay = Math.random() * 8;
                const duration = Math.random() * 10 + 8;
                const isLeftDirection = i % 2 === 0;
                return (
                    <div
                        key={i}
                        style={{
                            position: 'absolute',
                            bottom: '-20px',
                            left: `${left}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            background: 'radial-gradient(circle, #ffe999 0%, #d4af37 70%, transparent 100%)',
                            borderRadius: '50%',
                            opacity: Math.random() * 0.4 + 0.2,
                            animation: `${isLeftDirection ? 'float-up-left' : 'float-up-right'} ${duration}s infinite linear`,
                            animationDelay: `${delay}s`,
                            boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                        }}
                    />
                );
            })}
        </div>
    );
};

const TeddyBear = ({ style }) => (
    <img src={teddyBearImg} alt="Teddy Bear Illustration" style={{ width: 'min(180px, 45%)', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const Cloud = ({ style, duration = "15s", delay = "0s" }) => (
    <div className="float-anim" style={{
        position: 'absolute',
        animation: `float-drift ${duration} infinite ease-in-out`,
        animationDelay: delay,
        opacity: 0.3,
        zIndex: 5,
        ...style
    }}>
        <svg viewBox="0 0 120 80" width="100" fill="white">
            <path d="M25 40C25 29 34 20 45 20C47 20 49 20 51 21C56 12 65 6 75 6C89 6 100 17 100 31C100 32 100 32 100 33C111 35 120 45 120 56C120 68 110 78 98 78H30C13 78 0 65 0 48C0 34 11 22 25 20Z" />
        </svg>
    </div>
);

const AngelSymbol = ({ style }) => (
    <img src={angelImg} alt="Angel Illustration" style={{ width: 'min(180px, 45%)', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const StarCluster = ({ style }) => (
    <img src={starsImg} alt="Stars Illustration" style={{ width: '120px', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const BalloonIllustration = ({ style }) => (
    <img src={balloonsImg} alt="Balloons Illustration" style={{ width: 'min(150px, 40%)', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const PogachaLoaf = ({ style }) => (
    <svg viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '160px', ...style }}>
        {/* Долна основа — сянка */}
        <ellipse cx="80" cy="98" rx="62" ry="18" fill="var(--accent-gold)" opacity="0.12"/>
        {/* Тяло на хляба */}
        <ellipse cx="80" cy="72" rx="60" ry="44" fill="var(--accent-gold)" opacity="0.18"/>
        <ellipse cx="80" cy="70" rx="58" ry="42" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" opacity="0.7"/>
        {/* Горна купола */}
        <path d="M22 72 Q22 28 80 24 Q138 28 138 72" fill="var(--accent-gold)" opacity="0.22"/>
        <path d="M22 72 Q22 28 80 24 Q138 28 138 72" fill="none" stroke="var(--accent-gold)" strokeWidth="1.4" opacity="0.7"/>
        {/* Кръст на горната повърхност */}
        <line x1="80" y1="34" x2="80" y2="66" stroke="var(--accent-gold)" strokeWidth="1.6" opacity="0.55" strokeLinecap="round"/>
        <line x1="58" y1="50" x2="102" y2="50" stroke="var(--accent-gold)" strokeWidth="1.6" opacity="0.55" strokeLinecap="round"/>
        {/* Декоративни кръгчета около кръста */}
        <circle cx="80" cy="50" r="3.5" fill="var(--accent-gold)" opacity="0.35"/>
        <circle cx="65" cy="62" r="2.2" fill="var(--accent-gold)" opacity="0.3"/>
        <circle cx="80" cy="68" r="2.2" fill="var(--accent-gold)" opacity="0.3"/>
        <circle cx="95" cy="62" r="2.2" fill="var(--accent-gold)" opacity="0.3"/>
        {/* Малки точки по ръба */}
        <circle cx="44" cy="72" r="1.5" fill="var(--accent-gold)" opacity="0.25"/>
        <circle cx="116" cy="72" r="1.5" fill="var(--accent-gold)" opacity="0.25"/>
    </svg>
);

const WheatBranch = ({ style }) => (
    <svg viewBox="0 0 50 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '44px', pointerEvents: 'none', ...style }}>
        {/* Стъбло */}
        <line x1="25" y1="125" x2="25" y2="8" stroke="var(--accent-gold)" strokeWidth="1.3" strokeLinecap="round" opacity="0.6"/>
        {/* Връх */}
        <ellipse cx="25" cy="8" rx="4" ry="7" fill="var(--accent-gold)" opacity="0.5" />
        {/* 4 двойки зърна */}
        {[[25,28],[25,48],[25,68],[25,90]].map(([cx, cy], i) => (
            <g key={i}>
                <ellipse cx={cx - 9} cy={cy} rx="9" ry="4.5" fill="var(--accent-gold)" opacity="0.45" transform={`rotate(-30 ${cx-9} ${cy})`}/>
                <ellipse cx={cx + 9} cy={cy} rx="9" ry="4.5" fill="var(--accent-gold)" opacity="0.45" transform={`rotate(30 ${cx+9} ${cy})`}/>
            </g>
        ))}
    </svg>
);

const BirthStatBox = ({ label, value }) => (
    <div style={{ textAlign: 'center', minWidth: '100px' }}>
        <p className="serif" style={{ fontSize: '0.7rem', letterSpacing: '3px', opacity: 0.5, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{label}</p>
        <p className="serif" style={{ fontSize: 'clamp(1.2rem, 4vw, 1.8rem)', color: 'var(--accent-gold-dark)', fontWeight: '600', lineHeight: 1.2 }}>{value}</p>
    </div>
);

const formatBirthDate = (dateStr) => {
    if (!dateStr) return '';
    const months = ['ЯНУАРИ','ФЕВРУАРИ','МАРТ','АПРИЛ','МАЙ','ЮНИ','ЮЛИ','АВГУСТ','СЕПТЕМВРИ','ОКТОМВРИ','НОЕМВРИ','ДЕКЕМВРИ'];
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
};

const CountdownTimer = ({ targetDate, label }) => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate);

            if (isNaN(target.getTime())) {
                clearInterval(timer);
                return;
            }

            const distance = target.getTime() - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit = ({ label, value }) => (
        <div style={{ flex: 1, textAlign: 'center' }}>
            <span className="serif" style={{ fontSize: 'min(3.5rem, 10vw)', color: 'var(--accent-gold-dark)', fontWeight: '300', lineHeight: '1', display: 'block' }}>
                {value.toString().padStart(2, '0')}
            </span>
            <span className="serif" style={{ fontSize: 'min(0.8rem, 2.5vw)', color: 'var(--accent-gold)', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '0.5rem', display: 'block' }}>
                {label}
            </span>
        </div>
    );

    if (!targetDate || isNaN(new Date(targetDate).getTime())) return null;

    return (
        <div style={{ textAlign: 'center', margin: '4rem auto 3rem auto', width: '100%', maxWidth: '800px' }}>
            <h4 className="serif letterpress-text" style={{ fontSize: 'min(1.2rem, 4vw)', color: 'var(--accent-gold-dark)', letterSpacing: '4px', marginBottom: '2rem', opacity: 0.8 }}>
                {label}
            </h4>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 1rem',
                background: 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(5px)',
                borderRadius: '15px',
                border: '1px solid rgba(197, 160, 89, 0.1)',
                margin: '0 auto',
                width: 'min(95%, 600px)'
            }}>
                <TimeUnit label="Дни" value={timeLeft.days} />
                <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', opacity: 0.3 }}>•</div>
                <TimeUnit label="Часа" value={timeLeft.hours} />
                <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', opacity: 0.3 }}>•</div>
                <TimeUnit label="Минути" value={timeLeft.minutes} />
                <div style={{ fontSize: '2rem', color: 'var(--accent-gold)', opacity: 0.3 }}>•</div>
                <TimeUnit label="Секунди" value={timeLeft.seconds} />
            </div>
        </div>
    );
};

const FloralHeroPhoto = ({ src, alt, eventType }) => {
    const isBirthday = eventType === 'birthday';
    const isWedding = eventType === 'wedding';
    const isPogacha = eventType === 'pogacha';
    const isHeart = !isWedding && !isBirthday && !isPogacha;

    return (
        <div className="floral-hero-container" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '850px',
            height: isWedding ? 'calc(1.45 * min(400px, 75vw))' : 'min(420px, 79vw)',
            margin: '2.5rem auto 3rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box',
            transformStyle: 'preserve-3d'
        }}>
            {/* Floral Wreath - ONLY for Weddings */}
            {isWedding && (
                <div className="wreath-animate" style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${wreathIvoryImg})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 0,
                    pointerEvents: 'none',
                    clipPath: 'circle(49% at 50% 50%)',
                    WebkitClipPath: 'circle(49% at 50% 50%)',
                    maskImage: 'radial-gradient(circle at center, black 65%, transparent 98%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 65%, transparent 98%)',
                    filter: 'contrast(1.02) brightness(1.01)',
                    transform: 'translateZ(15px)'
                }}></div>
            )}

            {/* Passepartout Frame */}
            <div style={{
                position: 'relative',
                width: 'min(420px, 79vw)',
                height: 'min(420px, 79vw)',
                borderRadius: isWedding ? '50%' : isBirthday ? 'max(24px, 6vw)' : isPogacha ? '50% / 60%' : '4px',
                background: '#fcfaf6',
                backgroundImage: 'var(--paper-texture)',
                padding: 'min(15px, 3.5vw)',
                boxShadow: '0 25px 65px rgba(0,0,0,0.12), inset 0 0 15px rgba(197,160,89,0.08)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                transform: 'translateZ(30px)',
                boxSizing: 'border-box'
            }}>
                {/* The Photo Frame - Dynamic for Event Type */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: isWedding ? '50%' : isBirthday ? 'max(16px, 4vw)' : isPogacha ? '50% / 60%' : '2px',
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.1)',
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    maskImage: isHeart ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")' : 'none',
                    maskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskImage: isHeart ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")' : 'none',
                    WebkitMaskSize: '100% 100%',
                    WebkitMaskRepeat: 'no-repeat',
                }}>
                    <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            </div>

            {/* Bottom Fade */}
            <div style={{
                position: 'absolute',
                bottom: isWedding ? 'calc(0.225 * min(400px, 75vw) - 40px)' : '-40px',
                width: 'min(600px, 120%)',
                height: 'min(150px, 30vw)',
                background: 'radial-gradient(ellipse at center, var(--paper-bg) 0%, transparent 80%)',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.8
            }}></div>
        </div>
    );
};

const HeartImage = ({ src, size = "200px" }) => {
    const isResponsive = size === "responsive";
    
    return (
        <div style={{
            position: 'relative',
            width: isResponsive ? '100%' : size,
            height: isResponsive ? 'auto' : size,
            maxWidth: isResponsive ? '400px' : 'none',
            aspectRatio: isResponsive ? '1/1' : 'auto',
            margin: '2rem auto',
            overflow: 'visible',
            display: 'block'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundImage: `url("${src}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                maskImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")',
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")',
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat',
                filter: 'sepia(0.1) contrast(1.05)',
                position: 'relative',
                zIndex: 1
            }} />
            
            {/* Heart Gold Outline */}
            <svg viewBox="0 0 100 100" style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))'
            }}>
                <path 
                    d="M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z" 
                    fill="none" 
                    stroke="url(#goldGradient)" 
                    strokeWidth="1.2" 
                    opacity="0.9"
                />
            </svg>
        </div>
    );
};

const MaskedImage = ({ src, alt, height = "450px", ornate = false }) => (
    <div style={{
        position: 'relative',
        height: 'auto',
        minHeight: '200px',
        width: '100%',
        maxWidth: '700px',
        margin: ornate ? 'clamp(2rem, 8vw, 4rem) auto clamp(3rem, 10vw, 6rem) auto' : 'clamp(2rem, 8vw, 4rem) auto',
        overflow: 'visible',
        maskImage: 'radial-gradient(circle at 50% 50%, black 10%, rgba(0,0,0,0.8) 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, rgba(0,0,0,0.8) 30%, transparent 70%)',
        zIndex: 1
    }}>
        <div style={{
            position: 'relative',
            width: '100%',
            height: 'auto',
            aspectRatio: '16/9',
            maxHeight: height,
            overflow: 'hidden'
        }}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95, filter: 'sepia(0.1) contrast(1.05) brightness(1.02)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 80%, var(--paper-bg))' }}></div>
        </div>

        {ornate && (
            <>
                <BaroqueOrnament style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%) scale(1.2) translateZ(10px)', zIndex: -1, opacity: 0.6 }} />
                <BaroqueOrnament style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%) scale(1.2) scaleY(-1) translateZ(10px)', zIndex: -1, opacity: 0.6 }} />
                <SwirlOrnament style={{ position: 'absolute', top: '-30px', left: '-30px', opacity: 0.4 }} />
                <SwirlOrnament style={{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.4, transform: 'rotate(180deg)' }} />
            </>
        )}
    </div>
);

const ProgramItem = ({ time, activity, icon, isReversed, theme }) => {
    const IconComponent = WeddingIcons[icon] || WeddingIcons['✨'];
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const effectiveIsReversed = isMobile ? false : isReversed;

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '15px' : '20px',
            margin: isMobile ? '2rem 0' : '3rem 0',
            flexDirection: effectiveIsReversed ? 'row-reverse' : 'row',
            position: 'relative',
            zIndex: 2,
            width: '100%'
        }}>
            <div style={{
                flex: isMobile ? '0 0 70px' : 1,
                textAlign: effectiveIsReversed ? 'left' : 'right',
                padding: isMobile ? '0' : (effectiveIsReversed ? '0 0 0 40px' : '0 40px 0 0')
            }}>
                <p className="serif" style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: theme.primary, fontWeight: '600', marginBottom: '0.2rem' }}>{time}</p>
            </div>

            <div style={{
                width: isMobile ? '30px' : '40px',
                height: isMobile ? '30px' : '40px',
                background: theme.bg,
                color: theme.secondary,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
            }}>
                <IconComponent style={{ width: '100%', height: '100%' }} />
            </div>

            <div style={{
                flex: 1,
                textAlign: effectiveIsReversed ? 'right' : 'left',
                padding: isMobile ? '0' : (effectiveIsReversed ? '0 40px 0 0' : '0 0 0 40px')
            }}>
                <p className="serif" style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: theme.accent, letterSpacing: '0.5px', lineHeight: '1.4' }}>{activity}</p>
            </div>
        </div>
    );
};

// Moving Section outside InvitationCard to prevent unmounting/remounting on parent state updates
const Section = ({ title, children, className = "", delay = "0s", theme }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true);
            });
        }, { threshold: 0.1 });
        if (domRef.current) observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`reveal ${isVisible ? 'active' : ''} ${className}`}
            style={{ padding: 'min(1rem, 2vw) min(2rem, 5vw)', textAlign: 'center', transitionDelay: delay, marginBottom: 'var(--section-margin)', position: 'relative' }}
        >
            {title && (
                <h3 className="serif" style={{ textAlign: 'center', color: theme?.primary || 'var(--accent-gold-dark)', letterSpacing: '4px', fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', marginBottom: 'clamp(1.5rem, 5vw, 3rem)' }}>
                    {title}
                </h3>
            )}
            {children}
        </div>
    );
};

const InvitationCard = ({ data, eventId }) => {
    const { eventType = 'wedding' } = data;
    const [submitted, setSubmitted] = useState(false);
    const [guests, setGuests] = useState(1);
    const [guestNames, setGuestNames] = useState('');
    const [guestName, setGuestName] = useState('');
    const [rsvpStatus, setRsvpStatus] = useState('Ще присъствам');
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const [isShaking, setIsShaking] = useState(false);
    const cardRef = useRef(null);



    const getMonogram = () => {
        if (eventType === 'wedding') {
            const gLetter = data.groom ? data.groom.trim().charAt(0).toUpperCase() : 'A';
            const bLetter = data.bride ? data.bride.trim().charAt(0).toUpperCase() : 'S';
            return `${gLetter} & ${bLetter}`;
        }
        if (eventType === 'christening') {
            return data.childName ? data.childName.trim().charAt(0).toUpperCase() : '👼';
        }
        if (eventType === 'birthday') {
            return data.birthdayPerson ? data.birthdayPerson.trim().charAt(0).toUpperCase() : '🎂';
        }
        if (eventType === 'pogacha') {
            return data.pogachaBabyName ? data.pogachaBabyName.trim().charAt(0).toUpperCase() : '🍞';
        }
        return '✨';
    };

    const monogram = getMonogram();

    const getTheme = () => {
        switch (eventType) {
            case 'christening':
                const isGirl = data.childGender === 'girl';
                const deco = data.illustrativeTheme || 'angel';
                return {
                    primary: isGirl ? '#D98880' : '#7FB3D5', // Soft Pink / Soft Blue
                    secondary: isGirl ? '#F2D7D5' : '#D4E6F1',
                    accent: '#555',
                    bg: isGirl ? '#FFF5F5' : '#F4F9FF',
                    waxColor: isGirl ? '#e07a7a' : '#5d92b8',
                    label: 'СВЕТО КРЪЩЕНИЕ',
                    timerLabel: 'ДО СВЕТИЯ ПРАЗНИК ОСТАВАТ',
                    photosLabel: 'СНИМКИ НА АНГЕЛЧЕТО',
                    venueLabel: 'МЯСТОТО НА ПРАЗНИКА',
                    rsvpLabel: 'ЩЕ ПРИСЪСТВАТЕ ЛИ НА КРЪЩЕНИЕТО?',
                    ornament: isGirl ? '🌸' : '🕊️',
                    bgPattern: deco === 'none' ? 'none' : (deco === 'star' ? 'radial-gradient(var(--accent-gold) 0.5px, transparent 0.5px)' : 'radial-gradient(var(--accent-gold) 0.2px, transparent 0.2px)'),
                    bgSize: '20px 20px',
                    symbol: deco === 'none' ? null : (
                        deco === 'bear' ? <TeddyBear style={{ marginTop: '2rem' }} /> :
                            deco === 'angel' ? <AngelSymbol style={{ marginTop: '2rem' }} /> :
                                deco === 'star' ? <StarCluster style={{ marginTop: '2rem' }} /> :
                                    <BalloonIllustration style={{ marginTop: '2rem' }} />
                    ),
                    introSubtitle: 'С ГОЛЯМА РАДОСТ ВИ КАНЯТ НА СВЕТО КРЪЩЕНИЕ'
                };
            case 'birthday':
                const bDeco = data.illustrativeTheme || 'balloon';
                return {
                    primary: bDeco === 'none' ? '#333' : '#FF5733', // Darker for adult
                    secondary: bDeco === 'none' ? '#c5a059' : '#FFC300',
                    accent: '#333',
                    bg: bDeco === 'none' ? '#fdfaf5' : '#FFF8F0',
                    waxColor: bDeco === 'none' ? '#c5a059' : '#ff5733',
                    label: 'ЧЕСТИТ РОЖДЕН ДЕН',
                    timerLabel: 'ДО ПРАЗНИКА ОСТАВАТ',
                    photosLabel: 'СНИМКИ НА РОЖДЕНИКА',
                    venueLabel: 'МЯСТОТО НА ПАРТИТО',
                    rsvpLabel: 'ЩЕ ДОЙДЕТЕ ЛИ НА МОЯ РОЖДЕН ДЕН?',
                    ornament: bDeco === 'none' ? '✨' : '🎈',
                    bgPattern: bDeco === 'none' ? 'var(--paper-texture)' : `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23FFC300' fill-opacity='0.4'/%3E%3Cpath d='M5 5l2 2m30 30l-2-2m-30 0l2-2m30-30l-2 2' stroke='%23FF5733' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
                    bgSize: '40px 40px',
                    symbol: bDeco === 'none' ? <BaroqueOrnament style={{ marginTop: '2rem' }} /> : (
                        bDeco === 'bear' ? <TeddyBear style={{ marginTop: '2rem' }} /> :
                            bDeco === 'star' ? <StarCluster style={{ marginTop: '2rem' }} /> :
                                <BalloonIllustration style={{ marginTop: '2rem' }} />
                    ),
                    introSubtitle: 'ВИ КАНЯ НА НЕЗАБРАВИМО ПАРТИ ЗА РОЖДЕН ДЕН'
                };
            case 'jubilee':
                return {
                    primary: '#4B0082', // Indigo/Purple
                    secondary: '#D7BDE2',
                    accent: '#D4AF37',
                    bg: '#FBFAFF',
                    waxColor: '#c5a059',
                    label: 'ЮБИЛЕЙ',
                    timerLabel: 'ДО ТЪРЖЕСТВЕНИЯ МОМЕНТ ОСТАВАТ',
                    photosLabel: 'СНИМКИ ОТ ЖИВОТА',
                    venueLabel: 'МЯСТОТО НА ТЪРЖЕСТВОТО',
                    rsvpLabel: 'ЩЕ СПОДЕЛИТЕ ЛИ ПРАЗНИКА С МЕН?',
                    ornament: '✨',
                    bgPattern: 'radial-gradient(circle, var(--accent-gold) 0.2px, transparent 0.2px)',
                    bgSize: '15px 15px',
                    symbol: <span style={{ fontSize: '3rem', marginTop: '2rem' }}>💎</span>,
                    introSubtitle: 'ВИ КАНЯ ДА ОТПРАЗНУВАМЕ МОЯ ЮБИЛЕЙ ЗАЕДНО'
                };
            case 'pogacha': {
                const isGirl = data.pogachaGender === 'girl';
                return {
                    primary:      isGirl ? '#B5566A' : '#4A7FA5',
                    secondary:    isGirl ? '#DFA0B0' : '#8AB8D4',
                    accent:       '#3D2B1F',
                    bg:           isGirl ? '#FDF5F2' : '#F2F7FB',
                    waxColor:     '#C17A3A',
                    label:        'ПОГАЧА',
                    timerLabel:   'ДО ПРАЗНИКА ОСТАВАТ',
                    photosLabel:  'СНИМКИ НА БЕБЕТО',
                    venueLabel:   'МЯСТО НА СЪБИРАНЕТО',
                    rsvpLabel:    'ЩЕ СПОДЕЛИТЕ ЛИ РАДОСТТА С НАС?',
                    ornament:     isGirl ? '🌸' : '🍀',
                    bgPattern:    `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='20' cy='20' rx='5' ry='2.5' fill='%23C17A3A' fill-opacity='0.07' transform='rotate(30 20 20)'/%3E%3C/svg%3E")`,
                    bgSize:       '40px 40px',
                    symbol:       <PogachaLoaf style={{ marginTop: '2rem' }} />,
                    introSubtitle: isGirl
                        ? 'С ГОЛЯМА РАДОСТ ВИ КАНЯТ НА ПОГАЧА ЗА МАЛКОТО ИМ МОМИЧЕНЦЕ'
                        : 'С ГОЛЯМА РАДОСТ ВИ КАНЯТ НА ПОГАЧА ЗА МАЛКОТО ИМ МОМЧЕНЦЕ',
                };
            }
            default: // wedding
                return {
                    primary: '#c5a059',
                    secondary: '#d4af37',
                    accent: '#222',
                    bg: '#fdfaf5',
                    waxColor: '#801414',
                    label: 'СВАТБЕНА ПОКАНА',
                    timerLabel: 'ДО НАШИЯ ВЪЛШЕБЕН ДЕН ОСТАВАТ',
                    photosLabel: 'СНИМКИ НА ДВОЙКАТА',
                    venueLabel: 'МЯСТОТО НА СЪБИТИЕТО',
                    rsvpLabel: 'МОЛЯ, ПОТВЪРДЕТЕ ВАШЕТО ПРИСЪСТВИЕ',
                    ornament: '💍',
                    bgPattern: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 30c0-10 10-20 20-20V0c-15 0-25 10-25 25S15 50 0 50v10c10 0 20-10 20-20s10-10 10-10z\' fill=\'%23c5a059\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                    bgSize: '60px 60px',
                    symbol: <BaroqueOrnament style={{ marginTop: '2rem' }} />,
                    introSubtitle: 'С ГОЛЯМО УДОВОЛСТВИЕ ВИ КАНЯТ НА СВОЯТА СВАТБА'
                };
        }
    };

    const theme = getTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const photos = data.photos || [];
    const venuePhoto = data.venuePhoto || (eventType === 'wedding' ? "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" : null);
    const program = data.program || [];
    const heroPhoto = photos[0];
    const remainingPhotos = photos.slice(1);

    const openLightbox = (index) => {
        setActiveImageIndex(index);
    };

    const closeLightbox = () => {
        setActiveImageIndex(null);
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev + 1) % remainingPhotos.length);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setActiveImageIndex((prev) => (prev - 1 + remainingPhotos.length) % remainingPhotos.length);
    };

    const handleSubmitRSVP = async (e) => {
        e.preventDefault();
        try {
            if (eventId) {
                await submitRSVP(eventId, {
                    name: guestName,
                    count: guests,
                    names: guestNames,
                    status: rsvpStatus
                });
            }
            setSubmitted(true);
            setIsShaking(true);
            setTimeout(() => {
                setIsShaking(false);
            }, 1500);
        } catch (err) {
            console.error(err);
            alert("Грешка при изпращане. Моля опитайте пак.");
        }
    };

    return (
        <div style={{
            background: theme.bg,
            minHeight: '100vh',
            position: 'relative',
            padding: 'clamp(2rem, 8vw, 4rem) 0',
            color: theme.accent,
            '--accent-gold': theme.secondary,
            '--accent-gold-dark': theme.primary,
            width: '100%'
        }}>
            {/* Global Gradients Definition SVG */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff1c2" />
                        <stop offset="30%" stopColor="#f3d070" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="85%" stopColor="#aa8422" />
                        <stop offset="100%" stopColor="#876816" />
                    </linearGradient>
                </defs>
            </svg>

            <style>{`
                @keyframes float-drift {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(30px, -20px) rotate(2deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
                @keyframes pulse {
                    0%, 100% { transform: scale(1); opacity: 0.6; }
                    50% { transform: scale(1.2); opacity: 1; }
                }
                .float-anim { pointer-events: none; }

                @keyframes ambientSway {
                    0% { transform: rotateX(1deg) rotateY(-1.5deg); }
                    25% { transform: rotateX(1.5deg) rotateY(-0.5deg); }
                    50% { transform: rotateX(0.5deg) rotateY(-2deg); }
                    75% { transform: rotateX(1.2deg) rotateY(-1deg); }
                    100% { transform: rotateX(1deg) rotateY(-1.5deg); }
                }

                @keyframes cardShake {
                    0%, 100% { transform: rotateX(2deg) rotateY(-3deg) translate3d(0,0,0); }
                    70% { transform: rotateX(2deg) rotateY(-3deg) translate3d(0,0,0); }
                    72% { transform: rotateX(3deg) rotateY(-2deg) translate3d(-3px, 4px, 8px); }
                    75% { transform: rotateX(1deg) rotateY(-4deg) translate3d(3px, -4px, -8px); }
                    78% { transform: rotateX(2.5deg) rotateY(-2.5deg) translate3d(-1px, 2px, 3px); }
                    81% { transform: rotateX(1.8deg) rotateY(-3.5deg) translate3d(1px, -2px, -3px); }
                    85% { transform: rotateX(2deg) rotateY(-3deg) translate3d(0,0,0); }
                }

                @keyframes stampDrop {
                    0% {
                        transform: scale(3.5) translate3d(0, -120px, 120px);
                        opacity: 0;
                    }
                    65% {
                        transform: scale(0.9) translate3d(0, 0, 0);
                        opacity: 1;
                    }
                    80% {
                        transform: scale(1.2) translate3d(0, -6px, 15px);
                    }
                    100% {
                        transform: scale(1) translate3d(0, 0, 0);
                    }
                }

                @keyframes float-up-left {
                    0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-105vh) translateX(-50px) scale(1); opacity: 0; }
                }

                @keyframes float-up-right {
                    0% { transform: translateY(0) translateX(0) scale(0.8); opacity: 0; }
                    10% { opacity: 0.6; }
                    90% { opacity: 0.6; }
                    100% { transform: translateY(-105vh) translateX(50px) scale(1); opacity: 0; }
                }

                .main-card-container {
                    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s ease;
                    transform-style: preserve-3d;
                }

                .main-card-container.ambient-sway {
                    animation: ambientSway 12s infinite ease-in-out;
                }

                .main-card-container.shaking {
                    animation: cardShake 1.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
                }

                .wax-stamp-element {
                    animation: stampDrop 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    transform-origin: center;
                }

                .main-card-container:hover .foil-text {
                    animation: none;
                    background-position: var(--foil-x, 50%) var(--foil-y, 50%) !important;
                }

                .corner-ornament {
                    opacity: 0;
                    animation: fadeInOrnament 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                    animation-delay: 0.5s;
                }

                @keyframes fadeInOrnament {
                    to { opacity: 0.35; }
                }
            `}</style>

            {/* Floating Gold Particles background */}
            <GoldParticles />

            <div style={{ position: 'fixed', inset: 0, backgroundImage: 'var(--paper-texture)', opacity: 0.4, pointerEvents: 'none', zIndex: 10 }}></div>

            {/* Theme Pattern Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: theme.bgPattern,
                backgroundSize: theme.bgSize,
                opacity: 0.1,
                pointerEvents: 'none',
                zIndex: 9
            }}></div>

            {/* Floating Cute Ornaments */}
            {(data.illustrativeTheme === 'bear' || data.illustrativeTheme === 'angel') && (
                <>
                    <Cloud style={{ top: '10%', left: '5%' }} duration="20s" />
                    <Cloud style={{ top: '40%', right: '8%' }} duration="25s" delay="-5s" />
                    <Cloud style={{ bottom: '20%', left: '10%' }} duration="22s" delay="-10s" />
                    <Cloud style={{ bottom: '15%', right: '15%' }} duration="18s" delay="-2s" />
                </>
            )}
            {data.illustrativeTheme === 'star' && (
                <>
                    <StarCluster style={{ top: '15%', left: '10%' }} />
                    <StarCluster style={{ top: '45%', right: '12%' }} />
                    <StarCluster style={{ bottom: '25%', left: '8%' }} />
                    <StarCluster style={{ bottom: '10%', right: '18%' }} />
                </>
            )}
            {eventType === 'pogacha' && (
                <>
                    <WheatBranch style={{ position: 'fixed', top: '8%',    left: '3%',  transform: 'rotate(-15deg)', zIndex: 8 }} />
                    <WheatBranch style={{ position: 'fixed', top: '38%',   right: '4%', transform: 'rotate(15deg)',  zIndex: 8 }} />
                    <WheatBranch style={{ position: 'fixed', bottom: '18%',left: '5%',  transform: 'rotate(-8deg)',  zIndex: 8 }} />
                    <WheatBranch style={{ position: 'fixed', bottom: '6%', right: '6%', transform: 'rotate(22deg)',  zIndex: 8 }} />
                </>
            )}
            {data.illustrativeTheme === 'balloon' && (
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9 }}>
                    <span style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '2rem', animation: 'float-drift 10s infinite linear' }}>🎈</span>
                    <span style={{ position: 'absolute', top: '50%', right: '10%', fontSize: '2.5rem', animation: 'float-drift 12s infinite linear', animationDelay: '-3s' }}>🎈</span>
                    <span style={{ position: 'absolute', bottom: '20%', left: '15%', fontSize: '1.8rem', animation: 'float-drift 15s infinite linear', animationDelay: '-7s' }}>🎈</span>
                </div>
            )}

            {/* Outer Static Wrapper (establishes 3D perspective space) */}
            <div 
                style={{
                    width: '100%',
                    maxWidth: '850px',
                    margin: '2rem auto',
                    perspective: '1500px',
                    position: 'relative',
                    zIndex: 11
                }}
            >
                {/* Inner Card (Interactive 3D Parallax & Ambient Sway) */}
                <div 
                    ref={cardRef}
                    className={`lux-container main-card-container ambient-sway ${isShaking ? 'shaking' : ''}`}
                    style={{
                        width: 'min(calc(100% - 2rem), 850px)',
                        margin: '0 auto',
                        background: theme.bg,
                        padding: 'clamp(3rem, 10vw, 6rem) clamp(1.5rem, 5vw, 4rem)',
                        border: '1px solid rgba(197, 160, 89, 0.3)',
                        borderRadius: '4px',
                        backgroundImage: 'var(--paper-texture)',
                        overflow: 'visible',
                        transformStyle: 'preserve-3d',
                        '--foil-x': '50%',
                        '--foil-y': '50%',
                    }}>
                {/* Decorative Inner Border */}
                <div style={{
                    position: 'absolute',
                    inset: '20px',
                    border: '1px solid rgba(197, 160, 89, 0.15)',
                    pointerEvents: 'none',
                    zIndex: 0
                }}></div>

                {/* Corner Ornaments */}
                <CornerOrnament position="top-left" eventType={eventType} />
                <CornerOrnament position="top-right" eventType={eventType} />
                <CornerOrnament position="bottom-left" eventType={eventType} />
                <CornerOrnament position="bottom-right" eventType={eventType} />

                <div style={{ textAlign: 'center', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
                    <h1 className="serif" style={{ fontSize: 'clamp(2rem, 10vw, 4.0rem)', marginTop: '3rem', letterSpacing: '5px', fontWeight: '400', color: theme.primary }}>
                        {theme.label}
                    </h1>
                    {theme.symbol && (
                        <div style={{ margin: '2rem auto', maxWidth: '100%' }}>
                            {theme.symbol}
                        </div>
                    )}
                    <div style={{ height: '1px', width: '100px', background: theme.secondary, margin: '1.5rem auto', opacity: 0.4 }}></div>
                    <h2 className="script foil-text auto-shimmer" style={{
                        fontSize: 'clamp(3.5rem, 15vw, 7rem)',
                        marginTop: '0.5rem',
                        lineHeight: '1.1',
                        wordBreak: 'break-word',
                        width: '100%',
                        backgroundImage: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 30%, #fff1c2 50%, ${theme.secondary} 70%, ${theme.primary} 100%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundSize: '200% 200%',
                        transform: 'translateZ(40px)',
                        display: 'inline-block'
                    }}>
                        {eventType === 'wedding' && `${data.groom} & ${data.bride}`}
                        {eventType === 'christening' && data.childName}
                        {eventType === 'birthday' && data.birthdayPerson}
                        {eventType === 'jubilee' && `${data.jubileePerson}`}
                        {eventType === 'pogacha' && data.pogachaBabyName}
                    </h2>
                    {eventType === 'jubilee' && data.jubileeYears && (
                        <p className="serif" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', color: theme.secondary, marginTop: '2rem', fontStyle: 'italic' }}>
                            {data.jubileeYears} ГОДИНИ
                        </p>
                    )}
                </div>

                <Section theme={theme}>
                    {eventType === 'christening' && data.parents && (
                        <p className="serif letterpress-text" style={{ fontSize: '1.2rem', color: theme.primary, letterSpacing: '2px', marginBottom: '1rem' }}>
                            {data.parents.toUpperCase()}
                        </p>
                    )}
                    {eventType === 'pogacha' && data.pogachaParents && (
                        <p className="serif letterpress-text" style={{ fontSize: '1.1rem', color: theme.primary, letterSpacing: '2px', marginBottom: '1rem', opacity: 0.85 }}>
                            {data.pogachaParents.toUpperCase()}
                        </p>
                    )}
                    <p className="serif letterpress-text" style={{ fontSize: '1rem', color: theme.primary, letterSpacing: '4px', marginBottom: '1rem', opacity: 0.8 }}>
                        {theme.introSubtitle}
                    </p>

                    <p className="serif letterpress-text" style={{
                        fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                        color: theme.accent,
                        maxWidth: '650px',
                        margin: '0 auto',
                        lineHeight: '1.8',
                        fontStyle: 'italic',
                        whiteSpace: 'pre-wrap',
                        position: 'relative',
                        zIndex: 2,
                        transform: 'translateZ(20px)'
                    }}>
                        {data.message || (eventType === 'wedding'
                            ? '"Най-красивото в живота е да намериш човек, който вижда в теб всичко, което се страхуваш да бъдеш."'
                            : eventType === 'christening'
                                ? '„Всяко дете е ангел, изпратен от небето... Днес нашето малко съкровище приема Божието благословение!“'
                                : 'За нас е огромно удоволствие да Ви поканим да бъдете част от нашето специално тържество!')}
                    </p>

                    {eventType === 'christening' && data.godparents && (
                        <div style={{ marginTop: '3rem', padding: '2rem', borderTop: `1px dashed ${theme.secondary}`, borderBottom: `1px dashed ${theme.secondary}` }}>
                            <p className="serif" style={{ fontSize: '0.9rem', letterSpacing: '4px', opacity: 0.6, marginBottom: '0.5rem' }}>НАШИЯТ КРЪСТНИК:</p>
                            <p className="serif" style={{ fontSize: '1.8rem', color: theme.primary }}>{data.godparents.toUpperCase()}</p>
                        </div>
                    )}

                    {heroPhoto && <FloralHeroPhoto src={heroPhoto} alt="Hero" eventType={eventType} />}
                    {data.date && <CountdownTimer targetDate={`${data.date}T00:00`} label={theme.timerLabel} />}

                    {eventType === 'christening' ? <AngelSymbol style={{ marginTop: '2rem', opacity: 0.3 }} /> : <BaroqueOrnament style={{ marginTop: '2rem', transform: 'scaleY(-1)' }} />}
                </Section>

                {/* Birth Stats for Погача */}
                {eventType === 'pogacha' && (data.pogachaBirthDate || data.pogachaWeight || data.pogachaHeight) && (
                    <Section title="ДОБРЕ ДОШЛО, МАЛКО ЧУДО" theme={theme}>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 3.5rem)', flexWrap: 'wrap', margin: '1rem 0 2rem 0' }}>
                            {data.pogachaBirthDate && (
                                <BirthStatBox label="РОДЕНО НА" value={formatBirthDate(data.pogachaBirthDate)} />
                            )}
                            {data.pogachaWeight && (
                                <BirthStatBox label="ТЕГЛО" value={data.pogachaWeight} />
                            )}
                            {data.pogachaHeight && (
                                <BirthStatBox label="РЪСТ" value={data.pogachaHeight} />
                            )}
                        </div>
                        <PogachaLoaf style={{ margin: '0 auto', opacity: 0.5, display: 'block' }} />
                        <div style={{ height: '1px', width: '80px', background: theme.secondary, margin: '2rem auto 0 auto', opacity: 0.4 }}></div>
                    </Section>
                )}

                {/* Church Info for Christening */}
                {eventType === 'christening' && data.church && (
                    <Section title="СВЕТО ТАЙНСТВО" theme={theme}>
                        <OrthodoxCross style={{ marginBottom: '2rem' }} />
                        <p className="serif" style={{ fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', letterSpacing: '4px', opacity: 0.6 }}>РИТУАЛЪТ ЩЕ СЕ ИЗВЪРШИ В</p>
                        <p className="serif" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', color: theme.primary, margin: '1rem 0' }}>{data.church.toUpperCase()}</p>
                        <div style={{ height: '1px', width: '60px', background: theme.secondary, margin: '2rem auto' }}></div>
                    </Section>
                )}

                {data.showProgram && program.length > 0 && (
                    <Section title="ПРОГРАМА" theme={theme}>
                        <div style={{ position: 'relative', padding: '4rem 0', maxWidth: '750px', margin: '0 auto' }}>
                            <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '1px', background: theme.secondary, opacity: 0.2, transform: 'translateX(-50%)' }}></div>
                            {program.map((item, index) => (
                                <ProgramItem key={index} {...item} isReversed={index % 2 !== 0} theme={theme} />
                            ))}
                        </div>
                        {remainingPhotos[0] && <HeartImage src={remainingPhotos[0]} size="220px" />}
                        {eventType === 'wedding' && <SwirlOrnament style={{ marginTop: '4rem' }} />}
                    </Section>
                )}

                <Section title={theme.photosLabel} theme={theme}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: remainingPhotos.length === 1
                            ? '1fr'
                            : remainingPhotos.length === 2
                                ? 'repeat(auto-fit, minmax(320px, 1fr))'
                                : 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2rem',
                        margin: '2rem 0',
                        justifyContent: 'center'
                    }}>
                        {remainingPhotos.map((src, i) => (
                            <div key={i} onClick={() => openLightbox(i)} style={{ cursor: 'pointer' }} className="hover-lift">
                                <HeartImage src={src} size="responsive" />
                            </div>
                        ))}
                    </div>
                </Section>

                <Section title={theme.venueLabel} theme={theme}>
                    <h3 className="serif" style={{ letterSpacing: '6px', fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', color: theme.primary, marginBottom: '2rem', opacity: 0.7 }}>КЪДЕ ЩЕ СЕ СЛУЧИ МАГИЯТА</h3>
                    <p className="serif" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', color: theme.primary, marginBottom: '1.5rem' }}>{data.location}</p>
                    {venuePhoto && <MaskedImage src={venuePhoto} alt="Location" height="400px" />}
                    <p className="serif" style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '550px', margin: '2rem auto' }}>
                        Очакваме Ви с нетърпение в {data.location}, за да отпразнуваме заедно този щастлив ден.
                    </p>
                    {remainingPhotos[1] && <HeartImage src={remainingPhotos[1]} size="220px" />}
                    {data.locationLink && (
                        <a href={data.locationLink} target="_blank" rel="noreferrer" className="lux-btn" style={{ marginTop: '3rem', display: 'inline-block', background: theme.primary, color: 'white', width: 'min(280px, 90%)' }}>📍 ВИЖ ЛОКАЦИЯ (GPS)</a>
                    )}
                </Section>

                {remainingPhotos[2] && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <HeartImage src={remainingPhotos[2]} size="220px" />
                    </div>
                )}

                {remainingPhotos.length > 3 && (
                    <div style={{ textAlign: 'center', padding: '2rem 10%' }}>
                        {remainingPhotos.slice(3).map((src, i) => (
                            <HeartImage key={i} src={src} size="180px" />
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', padding: '3rem 0' }}><BaroqueOrnament style={{ width: 'min(400px, 80%)' }} /></div>

                <Section className="rsvp-section" title="ПОТВЪРЖДЕНИЕ" theme={theme}>
                    <div style={{
                        padding: 'clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 3rem)',
                        background: 'rgba(255, 255, 255, 0.4)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                        borderRadius: '4px',
                        position: 'relative',
                        width: '100%',
                        boxSizing: 'border-box'
                    }}>
                        {!submitted ? (
                            <form onSubmit={handleSubmitRSVP}>
                                <p className="serif" style={{ marginBottom: '2rem', fontStyle: 'italic', color: '#777', fontSize: '0.95rem' }}>Моля, потвърдете Вашето присъствие.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Вашето име..." 
                                        className="lux-input" 
                                        style={{ textAlign: 'center' }} 
                                        required 
                                        value={guestName}
                                        onChange={(e) => setGuestName(e.target.value)}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                        <p className="serif" style={{ fontSize: '0.9rem', opacity: 0.6 }}>Брой гости (включително Вас):</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={{ background: 'none', border: `1px solid ${theme.secondary}`, color: theme.secondary, width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>-</button>
                                            <span className="serif" style={{ fontSize: '1.4rem' }}>{guests}</span>
                                            <button type="button" onClick={() => setGuests(guests + 1)} style={{ background: 'none', border: `1px solid ${theme.secondary}`, color: theme.secondary, width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>+</button>
                                        </div>
                                    </div>
                                    {guests > 1 && (
                                        <textarea 
                                            placeholder="Имена на спътници..." 
                                            className="lux-input" 
                                            style={{ textAlign: 'center', height: '100px', resize: 'none', paddingTop: '1rem' }} 
                                            value={guestNames} 
                                            onChange={(e) => setGuestNames(e.target.value)} 
                                        />
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: 'clamp(20px, 5vw, 50px)', justifyContent: 'center', margin: '3rem 0', flexWrap: 'wrap' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', color: theme.accent }}>
                                        <input 
                                            type="radio" 
                                            name="rsvp" 
                                            checked={rsvpStatus === 'Ще присъствам'} 
                                            onChange={() => setRsvpStatus('Ще присъствам')}
                                            style={{ accentColor: theme.primary }} 
                                        /> Ще присъствам
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)', color: theme.accent }}>
                                        <input 
                                            type="radio" 
                                            name="rsvp" 
                                            checked={rsvpStatus === 'Няма да мога'} 
                                            onChange={() => setRsvpStatus('Няма да мога')}
                                            style={{ accentColor: theme.primary }} 
                                        /> Няма да мога
                                    </label>
                                </div>
                                <button type="submit" className="lux-btn" style={{ width: 'min(280px, 100%)', background: theme.primary, color: 'white' }}>ИЗПРАТИ ОТГОВОР</button>
                            </form>
                        ) : (
                            <div style={{ padding: '2rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 2s' }}>
                                <WaxSealStamp theme={theme} monogram={monogram} />
                                <h3 className="script" style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', color: theme.primary, marginTop: '1rem', lineHeight: '1' }}>Благодарим Ви!</h3>
                                <p className="serif" style={{ marginTop: '1.5rem', fontSize: 'clamp(1rem, 4vw, 1.2rem)', opacity: 0.8, color: theme.primary, letterSpacing: '1px' }}>
                                    {rsvpStatus === 'Ще присъствам' ? 'Вашият отговор е изпратен успешно. Очакваме Ви!' : 'Благодарим Ви за отговора!'}
                                </p>
                            </div>
                        )}
                        <SwirlOrnament style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.1 }} />
                        <SwirlOrnament style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.1 }} />
                    </div>
                </Section>

                <div style={{ textAlign: 'center', padding: '10rem 0 4rem 0' }}>
                    <BaroqueOrnament style={{ marginBottom: '3rem' }} />
                    <p className="serif" style={{ fontSize: '1rem', letterSpacing: '8px', opacity: 0.4, color: theme.primary }}>
                        {eventType === 'wedding' && `${data.groom.toUpperCase()} & ${data.bride.toUpperCase()}`}
                        {eventType === 'christening' && data.childName.toUpperCase()}
                        {eventType === 'birthday' && data.birthdayPerson.toUpperCase()}
                        {eventType === 'jubilee' && data.jubileePerson.toUpperCase()}
                        {eventType === 'pogacha' && data.pogachaBabyName && data.pogachaBabyName.toUpperCase()}
                    </p>
                    <p className="serif" style={{ fontSize: '0.7rem', color: theme.secondary, marginTop: '2rem', letterSpacing: '4px' }}>2026</p>
                </div>

                {/* Lightbox Modal for Gallery */}
                {activeImageIndex !== null && (
                    <div 
                        onClick={closeLightbox}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(15, 11, 6, 0.95)',
                            backdropFilter: 'blur(10px)',
                            zIndex: 99999,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            animation: 'fadeIn 0.3s ease'
                        }}
                    >
                        {/* Close Button */}
                        <button 
                            onClick={closeLightbox}
                            style={{
                                position: 'absolute',
                                top: '30px',
                                right: '30px',
                                background: 'none',
                                border: 'none',
                                color: 'white',
                                fontSize: '2.5rem',
                                cursor: 'pointer',
                                zIndex: 10,
                                transition: 'transform 0.2s',
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        >
                            ✕
                        </button>

                        {/* Left Arrow */}
                        {remainingPhotos.length > 1 && (
                            <button 
                                onClick={prevImage}
                                style={{
                                    position: 'absolute',
                                    left: 'max(20px, 3vw)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '4rem',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    opacity: 0.7,
                                    transition: 'opacity 0.2s, transform 0.2s',
                                    padding: '20px'
                                }}
                                onMouseOver={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1.1)'; }}
                                onMouseOut={(e) => { e.target.style.opacity = 0.7; e.target.style.transform = 'scale(1)'; }}
                            >
                                ‹
                            </button>
                        )}

                        {/* Image Container with Passepartout Frame */}
                        <div 
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                position: 'relative',
                                width: 'min(420px, 85vw)',
                                height: 'min(420px, 85vw)',
                                background: '#fdfaf5',
                                padding: '24px',
                                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                                border: '1px solid rgba(197, 160, 89, 0.4)',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundImage: 'var(--paper-texture)',
                            }}
                        >
                            <HeartImage src={remainingPhotos[activeImageIndex]} size="100%" />
                        </div>

                        {/* Right Arrow */}
                        {remainingPhotos.length > 1 && (
                            <button 
                                onClick={nextImage}
                                style={{
                                    position: 'absolute',
                                    right: 'max(20px, 3vw)',
                                    background: 'none',
                                    border: 'none',
                                    color: 'white',
                                    fontSize: '4rem',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    opacity: 0.7,
                                    transition: 'opacity 0.2s, transform 0.2s',
                                    padding: '20px'
                                }}
                                onMouseOver={(e) => { e.target.style.opacity = 1; e.target.style.transform = 'scale(1.1)'; }}
                                onMouseOut={(e) => { e.target.style.opacity = 0.7; e.target.style.transform = 'scale(1)'; }}
                            >
                                ›
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

export default InvitationCard;
