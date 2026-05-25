import React, { useState, useEffect } from 'react';

const IntroVideo = ({ data, onFinish }) => {
    const [isOpened, setIsOpened] = useState(false);
    const [flapFlipped, setFlapFlipped] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFaded, setIsFaded] = useState(false);

    // Fallback data if page is accessed directly without state
    const safeData = data || {
        eventType: 'wedding',
        groom: 'Александър',
        bride: 'София',
        date: '2026-09-14',
        location: 'Резиденция Тера'
    };

    const getIntroTheme = () => {
        switch (safeData.eventType) {
            case 'christening':
                const isGirl = safeData.childGender === 'girl';
                return {
                    label: 'ПОКАНА ЗА СВЕТО КРЪЩЕНИЕ',
                    names: safeData.childName ? safeData.childName.toUpperCase() : 'ВАШЕТО ДЕТЕ',
                    overlay: isGirl ? 'rgba(217, 136, 128, 0.4)' : 'rgba(127, 179, 213, 0.4)',
                    envelopeColor: isGirl ? 'url(#christeningPinkGrad)' : 'url(#christeningBlueGrad)',
                    envelopeFlapColor: isGirl ? '#f7d8d0' : '#d2e6f5',
                    waxColor: isGirl ? '#e07a7a' : '#5d92b8',
                    innerLiningColor: isGirl ? '#fce2db' : '#d2e3f2',
                };
            case 'birthday':
                const isChildDeco = safeData.illustrativeTheme !== 'none';
                return {
                    label: 'ПОКАНА ЗА РОЖДЕН ДЕН',
                    names: safeData.birthdayPerson ? safeData.birthdayPerson.toUpperCase() : 'РОЖДЕНИК',
                    overlay: 'rgba(255, 87, 51, 0.3)',
                    envelopeColor: isChildDeco ? 'url(#birthdayLightGrad)' : 'url(#birthdayDarkGrad)',
                    envelopeFlapColor: isChildDeco ? '#fdecd8' : '#2b2924',
                    waxColor: isChildDeco ? '#ff5733' : '#c5a059',
                    innerLiningColor: isChildDeco ? '#fdeedc' : '#141312',
                };
            case 'jubilee':
                return {
                    label: 'ПОКАНА ЗА ЮБИЛЕЙ',
                    names: safeData.jubileePerson ? safeData.jubileePerson.toUpperCase() : 'ЮБИЛЯР',
                    overlay: 'rgba(197, 160, 89, 0.3)',
                    envelopeColor: 'url(#jubileeGrad)',
                    envelopeFlapColor: '#2d2535',
                    waxColor: '#c5a059',
                    innerLiningColor: '#110021', // Deep purple velvet
                };
            case 'pogacha': {
                const isPogachaGirl = safeData.pogachaGender === 'girl';
                return {
                    label: 'ПОКАНА ЗА ПОГАЧА',
                    names: safeData.pogachaBabyName ? safeData.pogachaBabyName.toUpperCase() : 'НАШЕТО БЕБЕ',
                    overlay: isPogachaGirl ? 'rgba(181, 86, 106, 0.3)' : 'rgba(74, 127, 165, 0.3)',
                    envelopeColor: isPogachaGirl ? 'url(#pogachaPinkGrad)' : 'url(#pogachaBlueGrad)',
                    envelopeFlapColor: isPogachaGirl ? '#f5dfe0' : '#dce8f2',
                    waxColor: '#C17A3A', // bread-crust brown
                    innerLiningColor: isPogachaGirl ? '#3d1a22' : '#1a2d3d', // deep velvet rose/navy
                };
            }
            default: // wedding
                return {
                    label: 'ПОКАНА ЗА СВАТБА',
                    names: `${safeData.groom || 'МЛАДОЖЕНЕЦ'} & ${safeData.bride || 'БУЛКА'}`,
                    overlay: 'rgba(197, 160, 89, 0.2)',
                    envelopeColor: 'url(#weddingEnvelopeGrad)',
                    envelopeFlapColor: 'url(#weddingEnvelopeGrad)',
                    waxColor: '#801414',
                    innerLiningColor: '#2b0505', // Deep rich velvet wine red
                };
        }
    };

    const theme = getIntroTheme();

    const getMonogram = () => {
        if (safeData.eventType === 'wedding') {
            const gLetter = safeData.groom ? safeData.groom.trim().charAt(0).toUpperCase() : 'A';
            const bLetter = safeData.bride ? safeData.bride.trim().charAt(0).toUpperCase() : 'S';
            return `${gLetter} & ${bLetter}`;
        }
        if (safeData.eventType === 'christening') {
            return safeData.childName ? safeData.childName.trim().charAt(0).toUpperCase() : '👼';
        }
        if (safeData.eventType === 'birthday') {
            return safeData.birthdayPerson ? safeData.birthdayPerson.trim().charAt(0).toUpperCase() : '🎂';
        }
        if (safeData.eventType === 'jubilee') {
            return safeData.jubileePerson ? safeData.jubileePerson.trim().charAt(0).toUpperCase() : '💎';
        }
        if (safeData.eventType === 'pogacha') {
            return safeData.pogachaBabyName ? safeData.pogachaBabyName.trim().charAt(0).toUpperCase() : '🍞';
        }
        return '✨';
    };

    const monogram = getMonogram();

    const handleOpenEnvelope = () => {
        if (isOpened) return;
        setIsOpened(true);

        // Flap flips open immediately, taking 1.2s
        // Switch flap z-index at 0.9s (when it's vertical)
        setTimeout(() => {
            setFlapFlipped(true);
        }, 900);

        // Card starts emerging at 1.0s (due to 1.0s delay in transition)
        // Zoom-in sequence starts at 3.4s
        setTimeout(() => {
            setIsZoomed(true);
        }, 3400);

        // Fades screen to card color at 4.4s
        setTimeout(() => {
            setIsFaded(true);
        }, 4400);

        // Call onFinish at 5.5s to redirect
        setTimeout(() => {
            onFinish();
        }, 5500);
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'radial-gradient(circle at center, #2c2518 0%, #0f0b06 100%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            transition: 'background 1.5s ease',
            backgroundColor: isFaded ? '#fdfaf5' : '#0f0b06',
        }}>
            {/* Global Gradients and Patterns Definition SVG */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff1c2" />
                        <stop offset="30%" stopColor="#f3d070" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="85%" stopColor="#aa8422" />
                        <stop offset="100%" stopColor="#876816" />
                    </linearGradient>
                    <linearGradient id="weddingEnvelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbf7ee" />
                        <stop offset="50%" stopColor="#ebdcb8" />
                        <stop offset="100%" stopColor="#d2c39e" />
                    </linearGradient>
                    <linearGradient id="christeningPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff5f2" />
                        <stop offset="50%" stopColor="#fceae6" />
                        <stop offset="100%" stopColor="#f5d6cd" />
                    </linearGradient>
                    <linearGradient id="christeningBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f4f9ff" />
                        <stop offset="50%" stopColor="#e5f0fa" />
                        <stop offset="100%" stopColor="#d0e2f5" />
                    </linearGradient>
                    <linearGradient id="birthdayDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3d3a35" />
                        <stop offset="50%" stopColor="#252421" />
                        <stop offset="100%" stopColor="#141312" />
                    </linearGradient>
                    <linearGradient id="birthdayLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fffbf5" />
                        <stop offset="50%" stopColor="#fff7eb" />
                        <stop offset="100%" stopColor="#f7ebd9" />
                    </linearGradient>
                    <linearGradient id="jubileeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#431e63" />
                        <stop offset="50%" stopColor="#2b1145" />
                        <stop offset="100%" stopColor="#150524" />
                    </linearGradient>
                    <linearGradient id="pogachaBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f4f9ff" />
                        <stop offset="50%" stopColor="#e0ecf7" />
                        <stop offset="100%" stopColor="#c5d8ec" />
                    </linearGradient>
                    <linearGradient id="pogachaPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fdf5f2" />
                        <stop offset="50%" stopColor="#f7e3df" />
                        <stop offset="100%" stopColor="#ecc8c6" />
                    </linearGradient>

                    {/* Luxurious Gold Damask Pattern for Inner Lining */}
                    <pattern id="goldDamask" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 50 50 M 50 0 L 0 50" stroke="url(#goldGradient)" strokeWidth="0.5" opacity="0.07" />
                        <circle cx="25" cy="25" r="1" fill="url(#goldGradient)" opacity="0.25" />
                        <path d="M 25 20 L 26 24 L 30 25 L 26 26 L 25 30 L 24 26 L 20 25 L 24 24 Z" fill="url(#goldGradient)" opacity="0.15" />
                    </pattern>
                </defs>
            </svg>

            {/* Gold dust particles */}
            {!isFaded && <GoldParticles />}

            {/* Main Header / Intro text */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2.5rem',
                zIndex: 2,
                transition: 'opacity 1s ease',
                opacity: isZoomed ? 0 : 1,
            }}>
                <p className="serif" style={{ color: 'var(--accent-gold)', letterSpacing: '8px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '0.8rem' }}>
                    {theme.label}
                </p>
                <h2 className="script" style={{
                    color: 'white',
                    fontSize: 'clamp(2.2rem, 8vw, 3.8rem)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                    margin: '0.5rem 0',
                    lineHeight: '1.2'
                }}>
                    {theme.names}
                </h2>
                <div style={{ height: '1px', width: '80px', background: 'var(--accent-gold)', margin: '1rem auto', opacity: 0.4 }}></div>
            </div>

            {/* Envelope 3D Container */}
            <div className="envelope-wrapper" style={{ opacity: isFaded ? 0 : 1, transition: 'opacity 1s ease' }}>
                <div className="envelope" style={{ 
                    background: theme.envelopeColor,
                    transform: isZoomed ? 'translate3d(0,0,0) rotateX(0deg) rotateY(0deg) rotateZ(0deg)' : 'rotateX(14deg) rotateY(-10deg) rotateZ(-1deg)',
                    transformStyle: 'preserve-3d'
                }}>
                    
                    {/* The Card inside the envelope */}
                    <div className={`envelope-card ${isOpened ? 'emerged' : ''} ${isZoomed ? 'zoomed' : ''}`}>
                        <div style={{
                            border: '2px solid var(--accent-gold)',
                            padding: 'clamp(0.6rem, 2vw, 1.5rem) clamp(0.5rem, 1.5vw, 1rem)',
                            height: '100%',
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxSizing: 'border-box',
                            position: 'relative'
                        }}>
                            {/* Card Decorative Corner Dots */}
                            <div style={{ position: 'absolute', top: '5px', left: '5px', width: '4px', height: '4px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', top: '5px', right: '5px', width: '4px', height: '4px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', bottom: '5px', left: '5px', width: '4px', height: '4px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', bottom: '5px', right: '5px', width: '4px', height: '4px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>

                            <svg width="40" height="15" viewBox="0 0 100 30" fill="none" style={{ opacity: 0.6, marginBottom: 'clamp(0.2rem, 1vw, 0.5rem)' }}>
                                <path d="M10 15 Q50 -5 90 15" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none" />
                                <circle cx="50" cy="8" r="3" fill="var(--accent-gold)" />
                            </svg>
                            
                            <p className="serif" style={{ fontSize: '0.55rem', letterSpacing: '3px', color: '#777', textTransform: 'uppercase', margin: '1px 0' }}>
                                КАНЯТ ВИ НА
                            </p>
                            <h3 className="serif" style={{ fontSize: '0.9rem', letterSpacing: '2px', color: 'var(--accent-gold-dark)', fontWeight: 'bold', margin: '2px 0 6px 0' }}>
                                {theme.label}
                            </h3>

                            <h2 className="script" style={{
                                fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                                color: 'var(--accent-gold-dark)',
                                margin: 'clamp(0.1rem, 1vw, 0.5rem) 0',
                                fontWeight: 'normal',
                                lineHeight: '1.1',
                                textAlign: 'center'
                            }}>
                                {theme.names}
                            </h2>

                            <div style={{ width: '30px', height: '1px', background: 'var(--accent-gold)', margin: 'clamp(0.3rem, 1.5vw, 0.8rem) 0', opacity: 0.5 }}></div>

                            <p className="serif" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#444', fontWeight: 'bold', margin: '1px 0' }}>
                                {safeData.date ? new Date(safeData.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                            </p>
                            <p className="serif" style={{ fontSize: '0.6rem', color: '#777', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '1px' }}>
                                {safeData.location || ''}
                            </p>
                        </div>
                    </div>

                    {/* Back Flap / Inside Pocket of Envelope */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 100%)',
                        borderRadius: '8px',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}></div>

                    {/* Luxurious inner velvet lining with gold pattern inside envelope pocket */}
                    <div style={{
                        position: 'absolute',
                        inset: '6px',
                        borderRadius: '6px',
                        zIndex: 1,
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 30px rgba(0,0,0,0.85)',
                        border: '1px solid rgba(197,160,89,0.2)',
                        transform: 'translate3d(0, 0, 1px)'
                    }}>
                        <svg width="100%" height="100%" style={{ display: 'block' }}>
                            <rect width="100%" height="100%" fill={theme.innerLiningColor} />
                            <rect width="100%" height="100%" fill="url(#goldDamask)" />
                        </svg>
                    </div>

                    {/* Left and Right Front Flaps */}
                    <svg viewBox="0 0 450 300" style={{
                        position: 'absolute',
                        inset: '-0.5px',
                        zIndex: 3,
                        width: 'calc(100% + 1px)',
                        height: 'calc(100% + 1px)',
                        pointerEvents: 'none',
                        transform: 'translate3d(0, 0, 4px)',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform',
                        backfaceVisibility: 'hidden'
                    }}>
                        {/* Left Flap with bevel gold embossed border */}
                        <path d="M -1.5 -1.5 L 226.5 150 L -1.5 301.5 Z" fill={theme.envelopeColor} opacity="0.98" filter="drop-shadow(3px 0 6px rgba(0,0,0,0.15))" />
                        {/* Right Flap with bevel gold embossed border */}
                        <path d="M 451.5 -1.5 L 223.5 150 L 451.5 301.5 Z" fill={theme.envelopeColor} opacity="0.98" filter="drop-shadow(-3px 0 6px rgba(0,0,0,0.15))" />
                        {/* Bottom Flap with bevel gold embossed border */}
                        <path d="M -1.5 301.5 L 225 148.5 L 451.5 301.5 Z" fill={theme.envelopeColor} filter="drop-shadow(0 -4px 8px rgba(0,0,0,0.18))" />
                        
                        {/* 3D Bevel Emboss Shadows under Gold Border */}
                        <path d="M 0 0 L 225 150" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                        <path d="M 450 0 L 225 150" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                        <path d="M 0 300 L 225 150 L 450 300" stroke="rgba(0,0,0,0.28)" strokeWidth="1.8" fill="none" transform="translate(0, -1)" />
                        
                        {/* Gold Foil Border Highlights */}
                        <path d="M 0 0 L 225 150" stroke="url(#goldGradient)" strokeWidth="1.2" fill="none" opacity="0.9" />
                        <path d="M 450 0 L 225 150" stroke="url(#goldGradient)" strokeWidth="1.2" fill="none" opacity="0.9" />
                        <path d="M 0 300 L 225 150 L 450 300" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
                    </svg>

                    {/* Top Flap (flips open) */}
                    <div className={`envelope-flap ${isOpened ? 'open' : ''}`} style={{
                        zIndex: flapFlipped ? 1 : 4,
                    }}>
                        <svg viewBox="0 0 450 150" style={{ width: '100%', height: '100%', display: 'block', filter: isOpened ? 'drop-shadow(0 -4px 6px rgba(0,0,0,0.15))' : 'drop-shadow(0 6px 8px rgba(0,0,0,0.22))', transition: 'filter 1.2s' }}>
                            <path d="M -1.5 -1.5 L 225 151.5 L 451.5 -1.5 Z" fill={theme.envelopeColor} />
                            {/* 3D Bevel Emboss Shadow */}
                            <path d="M 0 0 L 225 150 L 450 0" stroke="rgba(0,0,0,0.25)" strokeWidth="1.8" fill="none" transform="translate(0, 1.2)" />
                            {/* Gold Foil Border */}
                            <path d="M 0 0 L 225 150 L 450 0" stroke="url(#goldGradient)" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>

                    {/* Paper texture overlay on top of envelope flaps for extreme realism */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'var(--paper-texture)',
                        opacity: 0.15,
                        zIndex: 4,
                        pointerEvents: 'none',
                        mixBlendMode: 'multiply'
                    }}></div>

                    {/* Left Half of Wax Seal */}
                    <div 
                        onClick={handleOpenEnvelope} 
                        className={`seal-half seal-left ${isOpened ? 'broken' : ''}`}
                    >
                        <WaxSealSVG theme={theme} isLeft={true} monogram={monogram} />
                    </div>

                    {/* Right Half of Wax Seal */}
                    <div 
                        onClick={handleOpenEnvelope} 
                        className={`seal-half seal-right ${isOpened ? 'broken' : ''}`}
                    >
                        <WaxSealSVG theme={theme} isLeft={false} monogram={monogram} />
                    </div>
                </div>
            </div>

            {/* Bottom Help Text */}
            <div style={{
                marginTop: '3.5rem',
                textAlign: 'center',
                zIndex: 2,
                transition: 'opacity 1s ease',
                opacity: isZoomed ? 0 : 1,
            }}>
                <p className={`serif ${!isOpened ? 'pulsing-text' : ''}`} style={{
                    color: 'rgba(255,255,255,0.6)',
                    letterSpacing: '3px',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    textShadow: '0 2px 5px rgba(0,0,0,0.3)',
                    cursor: !isOpened ? 'pointer' : 'default'
                }} onClick={handleOpenEnvelope}>
                    {!isOpened ? "Докоснете печата, за да отворите поканата" : "Поканата се отваря..."}
                </p>
            </div>

            {/* Embedded styles for envelope animations */}
            <style>{`
                .envelope-wrapper {
                    position: relative;
                    width: min(450px, 90vw);
                    height: calc(min(450px, 90vw) * 2 / 3);
                    perspective: 1500px;
                    z-index: 10;
                }

                .envelope {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    box-shadow: 0 35px 70px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.1);
                    transform-style: preserve-3d;
                    transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .envelope-card {
                    position: absolute;
                    top: 9%;
                    left: 7%;
                    width: 86%;
                    height: 82%;
                    background: #fdfaf5;
                    border: 1px solid rgba(197,160,89,0.4);
                    border-radius: 4px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                    z-index: 2;
                    transform: translate3d(0, 0, 2px);
                    transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1);
                    padding: 10px;
                    box-sizing: border-box;
                    background-image: var(--paper-texture);
                    will-change: transform;
                    backface-visibility: hidden;
                }

                .envelope-card.emerged {
                    transform: translate3d(0, -73%, 2px) scale(1.08);
                    box-shadow: 0 30px 50px rgba(0,0,0,0.3), inset 0 0 15px rgba(197,160,89,0.1);
                    /* Remains z-index 2 and Z-depth 2px during slide to stay behind front flaps (Z=4px) but in front of top open flap (Z=1px) */
                    transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1) 1.0s;
                }

                .envelope-card.zoomed {
                    transform: translate3d(0, -37%, 50px) scale(3.5);
                    opacity: 1;
                    z-index: 100; /* Instantly moves in front of the front flaps during zoom */
                    transition: transform 1.5s cubic-bezier(0.7, 0, 0.3, 1), z-index 0s linear;
                }

                .envelope-flap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    transform-origin: top;
                    transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                    transform: rotateX(0deg) translate3d(0, 0, 4.02px);
                    z-index: 4;
                    will-change: transform;
                }

                .envelope-flap.open {
                    transform: rotateX(180deg) translate3d(0, 0, 1px);
                    z-index: 1;
                }

                .seal-half {
                    position: absolute;
                    top: calc(50% - 40px);
                    width: 40px;
                    height: 80px;
                    overflow: hidden;
                    z-index: 5;
                    transform: translate3d(0, 0, 4.05px);
                    transition: all 0.9s cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
                    will-change: transform;
                    backface-visibility: hidden;
                }

                .seal-left {
                    left: calc(50% - 40px);
                }

                .seal-right {
                    left: 50%;
                }

                .seal-left.broken {
                    transform: translate3d(-45px, 20px, 4.05px) rotate(-30deg) scale(0.7);
                    opacity: 0;
                    pointer-events: none;
                }

                .seal-right.broken {
                    transform: translate3d(45px, 20px, 4.05px) rotate(30deg) scale(0.7);
                    opacity: 0;
                    pointer-events: none;
                }

                .pulsing-text {
                    animation: pulse-glow 2s infinite ease-in-out;
                }

                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.6; text-shadow: 0 0 5px rgba(255,255,255,0); }
                    50% { opacity: 1; text-shadow: 0 0 10px rgba(197, 160, 89, 0.4); }
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
            `}</style>
        </div>
    );
};

// Wax Seal SVG Renderer (Helper Component)
const WaxSealSVG = ({ theme, isLeft, monogram }) => {
    return (
        <svg viewBox="0 0 80 80" style={{
            position: 'absolute',
            left: isLeft ? '0' : '-40px',
            width: '80px',
            height: '80px',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))'
        }}>
            {/* Irregular outer wax boundary for realism */}
            <path d="M 40 5 Q 58 7 70 20 Q 78 38 75 55 Q 70 75 52 77 Q 32 79 16 70 Q 5 54 8 35 Q 11 12 40 5 Z" fill={`url(#waxGradient-${theme.waxColor})`} />
            
            {/* Glossy highlight overlay for 3D shine */}
            <ellipse cx="26" cy="22" rx="15" ry="7" fill="rgba(255,255,255,0.18)" transform="rotate(-30, 26, 22)" filter="blur(1.5px)" />
            
            {/* Inside circular borders */}
            <circle cx="40" cy="40" r="26" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="24" fill="none" stroke="url(#goldGradient)" strokeWidth="1.5" />
            
            {/* Monogram inside wax seal */}
            <text 
                x="40" 
                y="46" 
                fontFamily="'Cormorant Garamond', serif" 
                fontSize="15" 
                fontWeight="700" 
                fill="url(#goldGradient)" 
                textAnchor="middle" 
                letterSpacing="0.5"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
                {monogram}
            </text>

            <defs>
                <radialGradient id={`waxGradient-${theme.waxColor}`} cx="35%" cy="35%" r="65%">
                    {theme.waxColor === '#801414' ? (
                        <>
                            <stop offset="0%" stopColor="#b52626" />
                            <stop offset="70%" stopColor="#801414" />
                            <stop offset="100%" stopColor="#400505" />
                        </>
                    ) : theme.waxColor === '#c5a059' ? (
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
                    ) : theme.waxColor === '#C17A3A' ? (
                        <>
                            <stop offset="0%" stopColor="#e0a06a" />
                            <stop offset="70%" stopColor="#C17A3A" />
                            <stop offset="100%" stopColor="#6b3d18" />
                        </>
                    ) : (
                        <>
                            <stop offset="0%" stopColor="#ff7b5a" />
                            <stop offset="70%" stopColor="#ff5733" />
                            <stop offset="100%" stopColor="#a32b13" />
                        </>
                    )}
                </radialGradient>
            </defs>
        </svg>
    );
};

// Background Floating Gold Dust Particles
const GoldParticles = () => {
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
            {[...Array(18)].map((_, i) => {
                const size = Math.random() * 4 + 2.5; // 2.5px to 6.5px
                const left = Math.random() * 100;
                const delay = Math.random() * 8;
                const duration = Math.random() * 7 + 6;
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
                            opacity: Math.random() * 0.5 + 0.3,
                            animation: `${isLeftDirection ? 'float-up-left' : 'float-up-right'} ${duration}s infinite linear`,
                            animationDelay: `${delay}s`,
                            boxShadow: '0 0 12px rgba(212, 175, 55, 0.7)'
                        }}
                    />
                );
            })}
        </div>
    );
};

export default IntroVideo;
