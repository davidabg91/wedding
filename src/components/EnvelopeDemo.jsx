import React, { useState, useEffect } from 'react';

const WaxSealSVG = ({ isLeft, monogram }) => {
    return (
        <svg viewBox="0 0 80 80" style={{
            position: 'absolute',
            left: isLeft ? '0' : '-40px',
            width: '80px',
            height: '80px',
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.35))'
        }}>
            {/* Irregular outer wax boundary for realism */}
            <path d="M 40 5 Q 58 7 70 20 Q 78 38 75 55 Q 70 75 52 77 Q 32 79 16 70 Q 5 54 8 35 Q 11 12 40 5 Z" fill="url(#demoWaxGradient)" />
            
            {/* Glossy highlight overlay for 3D shine */}
            <ellipse cx="26" cy="22" rx="15" ry="7" fill="rgba(255,255,255,0.18)" transform="rotate(-30, 26, 22)" filter="blur(1.5px)" />
            
            {/* Inside circular borders */}
            <circle cx="40" cy="40" r="26" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" />
            <circle cx="40" cy="40" r="24" fill="none" stroke="url(#demoGoldGradient)" strokeWidth="1.5" />
            
            {/* Monogram inside wax seal */}
            <text 
                x="40" 
                y="46" 
                fontFamily="'Cormorant Garamond', serif" 
                fontSize="15" 
                fontWeight="700" 
                fill="url(#demoGoldGradient)" 
                textAnchor="middle" 
                letterSpacing="0.5"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
            >
                {monogram}
            </text>
        </svg>
    );
};

const EnvelopeDemo = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [flapFlipped, setFlapFlipped] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const runCycle = () => {
            if (!isMounted) return;
            
            // 0s: Closed, wax seal pulsing
            setIsOpened(false);
            setFlapFlipped(false);
            setIsZoomed(false);

            // 2.5s: Wax seal breaks, flap opens
            setTimeout(() => {
                if (!isMounted) return;
                setIsOpened(true);
            }, 2500);

            // 3.4s: Flip flap z-index so card can emerge in front of it
            setTimeout(() => {
                if (!isMounted) return;
                setFlapFlipped(true);
            }, 3400);

            // 4.5s: Card zooms in for detail view
            setTimeout(() => {
                if (!isMounted) return;
                setIsZoomed(true);
            }, 4500);

            // 9.5s: Card zooms back down
            setTimeout(() => {
                if (!isMounted) return;
                setIsZoomed(false);
            }, 9500);

            // 10.5s: Card goes back inside, flap closes
            setTimeout(() => {
                if (!isMounted) return;
                setIsOpened(false);
            }, 10500);

            // 11.4s: Reset flap z-index
            setTimeout(() => {
                if (!isMounted) return;
                setFlapFlipped(false);
            }, 11400);
        };

        // Start cycle immediately
        runCycle();

        // Run in loop every 13.5 seconds (allowing buffer between cycles)
        const interval = setInterval(runCycle, 13500);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, []);

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible'
        }}>
            {/* Definitions for gradients */}
            <svg style={{ width: 0, height: 0, position: 'absolute' }}>
                <defs>
                    <linearGradient id="demoGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff1c2" />
                        <stop offset="30%" stopColor="#f3d070" />
                        <stop offset="50%" stopColor="#d4af37" />
                        <stop offset="85%" stopColor="#aa8422" />
                        <stop offset="100%" stopColor="#876816" />
                    </linearGradient>
                    <linearGradient id="demoEnvelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fbf7ee" />
                        <stop offset="50%" stopColor="#ebdcb8" />
                        <stop offset="100%" stopColor="#d2c39e" />
                    </linearGradient>
                    <linearGradient id="demoWaxGradient" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stopColor="#b52626" />
                        <stop offset="70%" stopColor="#801414" />
                        <stop offset="100%" stopColor="#400505" />
                    </linearGradient>
                    <pattern id="demoGoldDamask" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 0 0 L 30 30 M 30 0 L 0 30" stroke="url(#demoGoldGradient)" strokeWidth="0.5" opacity="0.06" />
                        <circle cx="15" cy="15" r="0.8" fill="url(#demoGoldGradient)" opacity="0.2" />
                    </pattern>
                </defs>
            </svg>

            {/* Envelope 3D Container */}
            <div className="demo-envelope-wrapper" style={{
                position: 'relative',
                width: 'min(320px, 90%)',
                height: '213px', // 3:2 ratio
                perspective: '1000px',
                zIndex: 10,
                transform: isZoomed ? 'translateY(15px) scale(0.95)' : 'none',
                transition: 'transform 1.2s ease-in-out'
            }}>
                <div className="demo-envelope" style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '8px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.08)',
                    transformStyle: 'preserve-3d',
                    background: 'url(#demoEnvelopeGrad)',
                    backgroundColor: '#ebdcb8'
                }}>
                    
                    {/* The Card inside the envelope */}
                    <div className={`demo-envelope-card ${isOpened ? 'emerged' : ''} ${isZoomed ? 'zoomed' : ''}`} style={{
                        position: 'absolute',
                        top: '4%',
                        left: '4%',
                        width: '92%',
                        height: '92%',
                        background: '#fdfaf5',
                        border: '1px solid rgba(197,160,89,0.3)',
                        borderRadius: '4px',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                        zIndex: 2,
                        transform: 'translateZ(2px)',
                        padding: '12px 10px',
                        boxSizing: 'border-box',
                        backgroundImage: 'var(--paper-texture)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transformStyle: 'preserve-3d'
                    }}>
                        <div style={{
                            border: '1px solid var(--accent-gold)',
                            padding: '6px',
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
                            <div style={{ position: 'absolute', top: '3px', left: '3px', width: '3px', height: '3px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', top: '3px', right: '3px', width: '3px', height: '3px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', bottom: '3px', left: '3px', width: '3px', height: '3px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>
                            <div style={{ position: 'absolute', bottom: '3px', right: '3px', width: '3px', height: '3px', background: 'var(--accent-gold)', borderRadius: '50%' }}></div>

                            <svg width="35" height="12" viewBox="0 0 100 30" fill="none" style={{ opacity: 0.5, marginBottom: '2px' }}>
                                <path d="M10 15 Q50 -5 90 15" stroke="var(--accent-gold)" strokeWidth="1.5" fill="none" />
                                <circle cx="50" cy="8" r="3" fill="var(--accent-gold)" />
                            </svg>
                            
                            <p className="serif" style={{ fontSize: '0.45rem', letterSpacing: '2px', color: '#888', textTransform: 'uppercase', margin: '1px 0' }}>
                                КАНЯТ ВИ НА
                            </p>
                            <h3 className="serif" style={{ fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--accent-gold-dark)', fontWeight: 'bold', margin: '2px 0 4px 0' }}>
                                СВАТБЕНА ПОКАНА
                            </h3>

                            <h2 style={{
                                fontFamily: '"Great Vibes", cursive, serif',
                                fontSize: '1.8rem',
                                color: 'var(--accent-gold-dark)',
                                margin: '2px 0',
                                fontWeight: 'normal',
                                lineHeight: '1',
                                textAlign: 'center'
                            }}>
                                Александър & София
                            </h2>

                            <div style={{ width: '20px', height: '1px', background: 'var(--accent-gold)', margin: '4px 0', opacity: 0.4 }}></div>

                            <p className="serif" style={{ fontSize: '0.55rem', letterSpacing: '1px', color: '#444', fontWeight: 'bold', margin: '1px 0' }}>
                                14 септември 2026
                            </p>
                            <p className="serif" style={{ fontSize: '0.45rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '1px' }}>
                                Резиденция Тера
                            </p>
                        </div>
                    </div>

                    {/* Back Flap / Inside Pocket of Envelope */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 100%)',
                        borderRadius: '8px',
                        zIndex: 1,
                        pointerEvents: 'none'
                    }}></div>

                    {/* Inner Lining pocket */}
                    <div style={{
                        position: 'absolute',
                        inset: '5px',
                        borderRadius: '5px',
                        zIndex: 1,
                        overflow: 'hidden',
                        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(197,160,89,0.15)',
                        transform: 'translateZ(1px)'
                    }}>
                        <svg width="100%" height="100%" style={{ display: 'block' }}>
                            <rect width="100%" height="100%" fill="#2b0505" />
                            <rect width="100%" height="100%" fill="url(#demoGoldDamask)" />
                        </svg>
                    </div>

                    {/* Left and Right Front Flaps */}
                    <svg viewBox="0 0 450 300" style={{ position: 'absolute', inset: 0, zIndex: 3, width: '100%', height: '100%', pointerEvents: 'none', transform: 'translateZ(3px)' }}>
                        <path d="M 0 0 L 225 150 L 0 300 Z" fill="url(#demoEnvelopeGrad)" opacity="0.98" filter="drop-shadow(3px 0 6px rgba(0,0,0,0.1))" />
                        <path d="M 450 0 L 225 150 L 450 300 Z" fill="url(#demoEnvelopeGrad)" opacity="0.98" filter="drop-shadow(-3px 0 6px rgba(0,0,0,0.1))" />
                        <path d="M 0 300 L 225 150 L 450 300 Z" fill="url(#demoEnvelopeGrad)" filter="drop-shadow(0 -4px 8px rgba(0,0,0,0.12))" />
                        <path d="M 0 0 L 225 150" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                        <path d="M 450 0 L 225 150" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                        <path d="M 0 300 L 225 150 L 450 300" stroke="rgba(0,0,0,0.2)" strokeWidth="1.8" fill="none" transform="translate(0, -1)" />
                        <path d="M 0 0 L 225 150" stroke="url(#demoGoldGradient)" strokeWidth="1" fill="none" opacity="0.8" />
                        <path d="M 450 0 L 225 150" stroke="url(#demoGoldGradient)" strokeWidth="1" fill="none" opacity="0.8" />
                        <path d="M 0 300 L 225 150 L 450 300" stroke="url(#demoGoldGradient)" strokeWidth="1.2" fill="none" />
                    </svg>

                    {/* Top Flap (flips open) */}
                    <div className={`demo-envelope-flap ${isOpened ? 'open' : ''}`} style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '50%',
                        transformOrigin: 'top',
                        transition: 'transform 1.0s cubic-bezier(0.4, 0, 0.2, 1)',
                        transformStyle: 'preserve-3d',
                        transform: 'rotateX(0deg) translateZ(4px)',
                        zIndex: flapFlipped ? 1 : 4,
                    }}>
                        <svg viewBox="0 0 450 150" style={{ width: '100%', height: '100%', display: 'block', filter: isOpened ? 'drop-shadow(0 -3px 4px rgba(0,0,0,0.1))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.18))', transition: 'filter 1.0s' }}>
                            <path d="M 0 0 L 225 150 L 450 0 Z" fill="url(#demoEnvelopeGrad)" />
                            <path d="M 0 0 L 225 150 L 450 0" stroke="rgba(0,0,0,0.2)" strokeWidth="1.8" fill="none" transform="translate(0, 1.2)" />
                            <path d="M 0 0 L 225 150 L 450 0" stroke="url(#demoGoldGradient)" strokeWidth="1.2" fill="none" />
                        </svg>
                    </div>

                    {/* Paper texture overlay */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'var(--paper-texture)',
                        opacity: 0.12,
                        zIndex: 4,
                        pointerEvents: 'none',
                        mixBlendMode: 'multiply',
                        borderRadius: '8px'
                    }}></div>

                    {/* Left Half of Wax Seal */}
                    <div className={`demo-seal-half demo-seal-left ${isOpened ? 'broken' : ''}`} style={{
                        position: 'absolute',
                        top: 'calc(50% - 40px)',
                        left: 'calc(50% - 40px)',
                        width: '40px',
                        height: '80px',
                        overflow: 'hidden',
                        zIndex: 5,
                        transform: 'translateZ(5px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                        <WaxSealSVG isLeft={true} monogram="A & S" />
                    </div>

                    {/* Right Half of Wax Seal */}
                    <div className={`demo-seal-half demo-seal-right ${isOpened ? 'broken' : ''}`} style={{
                        position: 'absolute',
                        top: 'calc(50% - 40px)',
                        left: '50%',
                        width: '40px',
                        height: '80px',
                        overflow: 'hidden',
                        zIndex: 5,
                        transform: 'translateZ(5px)',
                        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}>
                        <WaxSealSVG isLeft={false} monogram="A & S" />
                    </div>
                </div>
            </div>

            {/* Looping Status Text underneath */}
            <p className="serif" style={{
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '2px',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                marginTop: '1.5rem',
                opacity: 0.8,
                textAlign: 'center',
                minHeight: '20px'
            }}>
                {!isOpened 
                    ? "Запечатване на поканата..." 
                    : isZoomed 
                        ? "Преглед на съдържанието" 
                        : "Отваряне на плика..."}
            </p>

            <style>{`
                .demo-envelope-card.emerged {
                    transform: translateY(-70%) scale(1.05) translateZ(2px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.25), inset 0 0 10px rgba(197,160,89,0.08);
                    transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1) 0.8s;
                }

                .demo-envelope-card.zoomed {
                    transform: translateY(-28%) scale(1.3) translateZ(60px);
                    box-shadow: 0 35px 70px rgba(0,0,0,0.4), inset 0 0 15px rgba(197,160,89,0.1);
                    z-index: 100;
                    transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1), z-index 0s linear;
                }

                .demo-envelope-flap.open {
                    transform: rotateX(180deg) translateZ(1px);
                    z-index: 1;
                }

                .demo-seal-left.broken {
                    transform: translate(-30px, 15px) rotate(-20deg) scale(0.8) translateZ(5px);
                    opacity: 0;
                }

                .demo-seal-right.broken {
                    transform: translate(30px, 15px) rotate(20deg) scale(0.8) translateZ(5px);
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default EnvelopeDemo;
