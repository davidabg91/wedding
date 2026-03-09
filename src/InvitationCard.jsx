import React, { useEffect, useState, useRef } from 'react';
import { WeddingIcons } from './components/WeddingIcons.jsx';
import teddyBearImg from './assets/teddy_bear.png';
import angelImg from './assets/angel.png';
import starsImg from './assets/stars.png';
import balloonsImg from './assets/balloons.png';
import wreathIvoryImg from './assets/wreath_ivory.png';

const BaroqueOrnament = ({ style }) => (
    <svg viewBox="0 0 500 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '400px', opacity: 0.35, ...style }}>
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
            style={{
                width: '180px',
                position: 'absolute',
                transform: `rotate(${rotations[position]})`,
                opacity: 0.35,
                zIndex: 5,
                ...{
                    "top-left": { top: '-25px', left: '-25px' },
                    "top-right": { top: '-25px', right: '-25px' },
                    "bottom-right": { bottom: '-25px', right: '-25px' },
                    "bottom-left": { bottom: '-25px', left: '-25px' }
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

const TeddyBear = ({ style }) => (
    <img src={teddyBearImg} alt="Teddy Bear Illustration" style={{ width: '180px', height: 'auto', mixBlendMode: 'multiply', ...style }} />
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
    <img src={angelImg} alt="Angel Illustration" style={{ width: '180px', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const StarCluster = ({ style }) => (
    <img src={starsImg} alt="Stars Illustration" style={{ width: '120px', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

const BalloonIllustration = ({ style }) => (
    <img src={balloonsImg} alt="Balloons Illustration" style={{ width: '150px', height: 'auto', mixBlendMode: 'multiply', ...style }} />
);

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
        <div style={{ textAlign: 'center', margin: '3rem auto', width: '100%', maxWidth: '800px' }}>
            <h4 className="serif" style={{ fontSize: 'min(1.2rem, 4vw)', color: 'var(--accent-gold-dark)', letterSpacing: '4px', marginBottom: '2rem', opacity: 0.8 }}>
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
                width: '90%'
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
    const isHeart = !isWedding && !isBirthday;

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '850px',
            margin: '10rem auto 8rem auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            {/* Floral Wreath - ONLY for Weddings */}
            {isWedding && (
                <div style={{
                    position: 'absolute',
                    width: '180%',
                    height: '180%',
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
                    filter: 'contrast(1.02) brightness(1.01)'
                }}></div>
            )}

            {/* The Photo Frame - Dynamic for Event Type */}
            <div style={{
                position: 'relative',
                width: '400px',
                height: '400px',
                borderRadius: isWedding ? '50%' : isBirthday ? '40px' : '0',
                overflow: 'hidden',
                zIndex: 1,
                boxShadow: '0 30px 80px rgba(0,0,0,0.15)',
                border: isWedding ? '2px solid rgba(255, 255, 255, 0.9)' : isBirthday ? `8px solid white` : 'none',
                maskImage: isHeart ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")' : 'none',
                maskSize: '100% 100%',
                maskRepeat: 'no-repeat',
                WebkitMaskImage: isHeart ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'><path d=\'M50 30 C30 10 10 10 10 40 C10 65 50 90 50 90 C50 90 90 65 90 40 C90 10 70 10 50 30 Z\' fill=\'black\'/></svg>")' : 'none',
                WebkitMaskSize: '100% 100%',
                WebkitMaskRepeat: 'no-repeat'
            }}>
                <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Bottom Fade */}
            <div style={{
                position: 'absolute',
                bottom: '-40px',
                width: '600px',
                height: '150px',
                background: 'radial-gradient(ellipse at center, var(--paper-bg) 0%, transparent 80%)',
                zIndex: 2,
                pointerEvents: 'none',
                opacity: 0.8
            }}></div>
        </div>
    );
};

const HeartImage = ({ src, size = "200px" }) => (
    <div style={{
        position: 'relative',
        height: size,
        width: size,
        margin: '2rem auto',
        overflow: 'hidden',
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
            filter: 'sepia(0.1) contrast(1.05)'
        }} />
    </div>
);

const MaskedImage = ({ src, alt, height = "450px", ornate = false }) => (
    <div style={{
        position: 'relative',
        height: height,
        width: '100%',
        maxWidth: '700px',
        margin: ornate ? '4rem auto 6rem auto' : '4rem auto',
        overflow: 'visible',
        maskImage: 'radial-gradient(circle at 50% 50%, black 10%, rgba(0,0,0,0.8) 30%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 10%, rgba(0,0,0,0.8) 30%, transparent 70%)',
        zIndex: 1
    }}>
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }}>
            <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.95, filter: 'sepia(0.1) contrast(1.05) brightness(1.02)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 80%, var(--paper-bg))' }}></div>
        </div>

        {ornate && (
            <>
                <BaroqueOrnament style={{ position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%) scale(1.2)', zIndex: -1, opacity: 0.6 }} />
                <BaroqueOrnament style={{ position: 'absolute', bottom: '-80px', left: '50%', transform: 'translateX(-50%) scale(1.2) scaleY(-1)', zIndex: -1, opacity: 0.6 }} />
                <SwirlOrnament style={{ position: 'absolute', top: '-30px', left: '-30px', opacity: 0.4 }} />
                <SwirlOrnament style={{ position: 'absolute', bottom: '-30px', right: '-30px', opacity: 0.4, transform: 'rotate(180deg)' }} />
            </>
        )}
    </div>
);

const ProgramItem = ({ time, activity, icon, isReversed, theme }) => {
    const IconComponent = WeddingIcons[icon] || WeddingIcons['✨'];

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            margin: '3rem 0',
            flexDirection: isReversed ? 'row-reverse' : 'row',
            position: 'relative',
            zIndex: 2
        }}>
            <div style={{ flex: 1, textAlign: isReversed ? 'left' : 'right', padding: isReversed ? '0 0 0 40px' : '0 40px 0 0' }}>
                <p className="serif" style={{ fontSize: '1.2rem', color: theme.primary, fontWeight: '600', marginBottom: '0.2rem' }}>{time}</p>
            </div>

            <div style={{
                width: '40px',
                height: '40px',
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

            <div style={{ flex: 1, textAlign: isReversed ? 'right' : 'left', padding: isReversed ? '0 40px 0 0' : '0 0 0 40px' }}>
                <p className="serif" style={{ fontSize: '1.2rem', color: theme.accent, letterSpacing: '0.5px', lineHeight: '1.4' }}>{activity}</p>
            </div>
        </div>
    );
};

const InvitationCard = ({ data }) => {
    const { eventType = 'wedding' } = data;
    const [submitted, setSubmitted] = useState(false);
    const [guests, setGuests] = useState(1);
    const [guestNames, setGuestNames] = useState('');

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
                    label: 'СВЕТО КРЪЩЕНИЕ',
                    timerLabel: 'ДО СВЕТИЯ ПРАЗНИК ОСТАВАТ',
                    ornament: isGirl ? '🌸' : '🕊️',
                    bgPattern: deco === 'none' ? 'none' : (deco === 'star' ? 'radial-gradient(var(--accent-gold) 0.5px, transparent 0.5px)' : 'radial-gradient(var(--accent-gold) 0.2px, transparent 0.2px)'),
                    bgSize: '20px 20px',
                    symbol: deco === 'none' ? null : (
                        deco === 'bear' ? <TeddyBear style={{ marginTop: '2rem' }} /> :
                            deco === 'angel' ? <AngelSymbol style={{ marginTop: '2rem' }} /> :
                                deco === 'star' ? <StarCluster style={{ marginTop: '2rem' }} /> :
                                    <BalloonIllustration style={{ marginTop: '2rem' }} />
                    )
                };
            case 'birthday':
                const bDeco = data.illustrativeTheme || 'balloon';
                return {
                    primary: bDeco === 'none' ? '#333' : '#FF5733', // Darker for adult
                    secondary: bDeco === 'none' ? '#c5a059' : '#FFC300',
                    accent: '#333',
                    bg: bDeco === 'none' ? '#fdfaf5' : '#FFF8F0',
                    label: 'ЧЕСТИТ РОЖДЕН ДЕН',
                    timerLabel: 'ДО ПРАЗНИКА ОСТАВАТ',
                    ornament: bDeco === 'none' ? '✨' : '🎈',
                    bgPattern: bDeco === 'none' ? 'var(--paper-texture)' : `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23FFC300' fill-opacity='0.4'/%3E%3Cpath d='M5 5l2 2m30 30l-2-2m-30 0l2-2m30-30l-2 2' stroke='%23FF5733' stroke-opacity='0.2' stroke-width='1'/%3E%3C/svg%3E")`,
                    bgSize: '40px 40px',
                    symbol: bDeco === 'none' ? <BaroqueOrnament style={{ marginTop: '2rem' }} /> : (
                        bDeco === 'bear' ? <TeddyBear style={{ marginTop: '2rem' }} /> :
                            bDeco === 'star' ? <StarCluster style={{ marginTop: '2rem' }} /> :
                                <BalloonIllustration style={{ marginTop: '2rem' }} />
                    )
                };
            case 'jubilee':
                return {
                    primary: '#4B0082', // Indigo/Purple
                    secondary: '#D7BDE2',
                    accent: '#D4AF37',
                    bg: '#FBFAFF',
                    label: 'ЮБИЛЕЙ',
                    timerLabel: 'ДО ТЪРЖЕСТВЕНИЯ МОМЕНТ ОСТАВАТ',
                    ornament: '✨',
                    bgPattern: 'radial-gradient(circle, var(--accent-gold) 0.2px, transparent 0.2px)',
                    bgSize: '15px 15px',
                    symbol: <span style={{ fontSize: '3rem', marginTop: '2rem' }}>💎</span>
                };
            default: // wedding
                return {
                    primary: '#c5a059',
                    secondary: '#d4af37',
                    accent: '#222',
                    bg: '#fdfaf5',
                    label: 'СВАТБЕНА ПОКАНА',
                    timerLabel: 'ДО НАШИЯ ВЪЛШЕБЕН ДЕН ОСТАВАТ',
                    ornament: '💍',
                    bgPattern: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 30c0-10 10-20 20-20V0c-15 0-25 10-25 25S15 50 0 50v10c10 0 20-10 20-20s10-10 10-10z\' fill=\'%23c5a059\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
                    bgSize: '60px 60px',
                    symbol: <BaroqueOrnament style={{ marginTop: '2rem' }} />
                };
        }
    };

    const theme = getTheme();

    const Section = ({ title, children, className = "", delay = "0s" }) => {
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
                style={{ padding: '1rem 2rem', textAlign: 'center', transitionDelay: delay, marginBottom: '3rem', position: 'relative' }}
            >
                {title && (
                    <h3 className="serif" style={{ textAlign: 'center', color: theme.primary, letterSpacing: '4px', fontSize: '2.2rem', marginBottom: '3rem' }}>
                        {title}
                    </h3>
                )}
                {children}
            </div>
        );
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const photos = data.photos || [];
    const venuePhoto = data.venuePhoto || (eventType === 'wedding' ? "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000" : null);
    const program = data.program || [];
    const heroPhoto = photos[0];
    const remainingPhotos = photos.slice(1);

    return (
        <div style={{
            background: theme.bg,
            minHeight: '100vh',
            position: 'relative',
            padding: '4rem 0',
            color: theme.accent,
            '--accent-gold': theme.secondary,
            '--accent-gold-dark': theme.primary
        }}>
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
            `}</style>

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
            {data.illustrativeTheme === 'balloon' && (
                <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9 }}>
                    <span style={{ position: 'absolute', top: '20%', left: '10%', fontSize: '2rem', animation: 'float-drift 10s infinite linear' }}>🎈</span>
                    <span style={{ position: 'absolute', top: '50%', right: '10%', fontSize: '2.5rem', animation: 'float-drift 12s infinite linear', animationDelay: '-3s' }}>🎈</span>
                    <span style={{ position: 'absolute', bottom: '20%', left: '15%', fontSize: '1.8rem', animation: 'float-drift 15s infinite linear', animationDelay: '-7s' }}>🎈</span>
                </div>
            )}

            <div className="lux-container" style={{
                maxWidth: '850px',
                margin: '2rem auto',
                position: 'relative',
                zIndex: 11,
                background: theme.bg,
                boxShadow: '0 40px 100px rgba(0,0,0,0.12), 0 10px 30px rgba(0,0,0,0.05)',
                padding: '6rem 4rem',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '4px',
                backgroundImage: 'var(--paper-texture)',
                overflow: 'visible'
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
                    <h2 className="serif" style={{ fontSize: '1.1rem', letterSpacing: '12px', opacity: 0.6, marginBottom: '2rem', textTransform: 'uppercase' }}>
                        {eventType === 'wedding' ? 'Wedding Invitation' : 'Special Event Invitation'}
                    </h2>
                    <h1 className="serif" style={{ fontSize: '4rem', marginTop: '3rem', letterSpacing: '5px', fontWeight: '400', color: theme.primary }}>
                        {theme.label}
                    </h1>
                    {theme.symbol && (
                        <div style={{ margin: '2rem auto' }}>
                            {theme.symbol}
                        </div>
                    )}
                    <div style={{ height: '1px', width: '100px', background: theme.secondary, margin: '1.5rem auto', opacity: 0.4 }}></div>
                    <h2 className="script" style={{ fontSize: 'min(7rem, 15vw)', color: theme.primary, marginTop: '0.5rem', lineHeight: '0.8' }}>
                        {eventType === 'wedding' && `${data.groom} & ${data.bride}`}
                        {eventType === 'christening' && data.childName}
                        {eventType === 'birthday' && data.birthdayPerson}
                        {eventType === 'jubilee' && `${data.jubileePerson}`}
                    </h2>
                    {eventType === 'jubilee' && data.jubileeYears && (
                        <p className="serif" style={{ fontSize: '2.5rem', color: theme.secondary, marginTop: '2rem', fontStyle: 'italic' }}>
                            {data.jubileeYears} ГОДИНИ
                        </p>
                    )}
                </div>

                <Section>
                    {eventType === 'christening' && data.parents && (
                        <p className="serif" style={{ fontSize: '1.2rem', color: theme.primary, letterSpacing: '2px', marginBottom: '1rem' }}>
                            {data.parents.toUpperCase()} ИМАТ УДОВОЛСТВИЕТО ДА ВИ ПОКАНЯТ НА
                        </p>
                    )}

                    <p className="serif" style={{ fontSize: '1.5rem', color: theme.accent, maxWidth: '650px', margin: '0 auto', lineHeight: '2', fontStyle: 'italic' }}>
                        {eventType === 'wedding'
                            ? '"Най-красивото в живота е да намериш човек, който вижда в теб всичко, от което ти се страхува някой да бъдеш."'
                            : eventType === 'christening'
                                ? '„Всяко дете е ангел, изпратен от небето... Днес нашето малко съкровище приема Божието благословение!“'
                                : 'За нас е огромно удоволствие да Ви поканим да бъдете част от нашето специално тържество!'}
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

                {/* Church Info for Christening */}
                {eventType === 'christening' && data.church && (
                    <Section title="СВЕТО ТАЙНСТВО">
                        <OrthodoxCross style={{ marginBottom: '2rem' }} />
                        <p className="serif" style={{ fontSize: '1.1rem', letterSpacing: '4px', opacity: 0.6 }}>РИТУАЛЪТ ЩЕ СЕ ИЗВЪРШИ В</p>
                        <p className="serif" style={{ fontSize: '2.5rem', color: theme.primary, margin: '1rem 0' }}>{data.church.toUpperCase()}</p>
                        <div style={{ height: '1px', width: '60px', background: theme.secondary, margin: '2rem auto' }}></div>
                    </Section>
                )}

                {data.showProgram && program.length > 0 && (
                    <Section title="ПРОГРАМА">
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

                <Section title="ЛОКАЦИЯ">
                    <h3 className="serif" style={{ letterSpacing: '6px', fontSize: '1.1rem', color: theme.primary, marginBottom: '2rem', opacity: 0.7 }}>КЪДЕ ЩЕ СЕ СЛУЧИ МАГИЯТА</h3>
                    <p className="serif" style={{ fontSize: '3rem', color: theme.primary, marginBottom: '1.5rem' }}>{data.location}</p>
                    {venuePhoto && <MaskedImage src={venuePhoto} alt="Location" height="400px" />}
                    <p className="serif" style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '550px', margin: '2rem auto' }}>
                        Очакваме Ви с нетърпение в {data.location}, за да отпразнуваме заедно този щастлив ден.
                    </p>
                    {remainingPhotos[1] && <HeartImage src={remainingPhotos[1]} size="220px" />}
                    {data.locationLink && (
                        <a href={data.locationLink} target="_blank" rel="noreferrer" className="lux-btn" style={{ marginTop: '3rem', display: 'inline-block', background: theme.primary, color: 'white' }}>📍 ВИЖ ЛОКАЦИЯ (GPS)</a>
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

                <div style={{ textAlign: 'center', padding: '3rem 0' }}><BaroqueOrnament /></div>

                <Section className="rsvp-section" title="ПОТВЪРЖДЕНИЕ">
                    <div style={{ padding: '6rem 3rem', background: 'rgba(255, 255, 255, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', borderRadius: '4px', position: 'relative' }}>
                        {!submitted ? (
                            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                                <p className="serif" style={{ marginBottom: '3rem', fontStyle: 'italic', color: '#777' }}>Моля, потвърдете Вашето присъствие.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
                                    <input type="text" placeholder="Вашето име..." className="lux-input" style={{ textAlign: 'center' }} required />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                        <p className="serif" style={{ fontSize: '0.9rem', opacity: 0.6 }}>Брой гости (включително Вас):</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={{ background: 'none', border: `1px solid ${theme.secondary}`, color: theme.secondary, width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>-</button>
                                            <span className="serif" style={{ fontSize: '1.4rem' }}>{guests}</span>
                                            <button type="button" onClick={() => setGuests(guests + 1)} style={{ background: 'none', border: `1px solid ${theme.secondary}`, color: theme.secondary, width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>+</button>
                                        </div>
                                    </div>
                                    {guests > 1 && (
                                        <textarea placeholder="Имена на спътници..." className="lux-input" style={{ textAlign: 'center', height: '100px', resize: 'none', paddingTop: '1rem' }} value={guestNames} onChange={(e) => setGuestNames(e.target.value)} />
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', margin: '3rem 0' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '1.1rem', color: theme.accent }}>
                                        <input type="radio" name="rsvp" defaultChecked style={{ accentColor: theme.primary }} /> Ще присъствам
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '1.1rem', color: theme.accent }}>
                                        <input type="radio" name="rsvp" style={{ accentColor: theme.primary }} /> Няма да мога
                                    </label>
                                </div>
                                <button type="submit" className="lux-btn" style={{ minWidth: '280px', background: theme.primary, color: 'white' }}>ИЗПРАТИ ОТГОВОР</button>
                            </form>
                        ) : (
                            <div style={{ padding: '3rem 0', animation: 'fadeIn 2s' }}>
                                <h3 className="script" style={{ fontSize: '5rem', color: theme.primary }}>Благодарим Ви!</h3>
                                <p className="serif" style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.6 }}>Очакваме Ви с нетърпение!</p>
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
                    </p>
                    <p className="serif" style={{ fontSize: '0.7rem', color: theme.secondary, marginTop: '2rem', letterSpacing: '4px' }}>2026</p>
                </div>
            </div>
        </div>
    );
};

export default InvitationCard;
