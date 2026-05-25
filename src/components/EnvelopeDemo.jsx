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
    const [phase, setPhase] = useState(0);
    const [typedName, setTypedName] = useState('');
    const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
    const [showDashboardRow, setShowDashboardRow] = useState(false);
    const [confirmedCount, setConfirmedCount] = useState(82);

    const [sealBroken, setSealBroken] = useState(false);
    const [flapOpen, setFlapOpen] = useState(false);
    const [flapFlipped, setFlapFlipped] = useState(false);
    const [cardOut, setCardOut] = useState(false);
    const [cardZoomed, setCardZoomed] = useState(false);

    useEffect(() => {
        let isMounted = true;
        let typingTimeout;

        const runCycle = () => {
            if (!isMounted) return;

            // Reset all states
            setPhase(0);
            setTypedName('');
            setRsvpSubmitted(false);
            setShowDashboardRow(false);
            setConfirmedCount(82);
            setSealBroken(false);
            setFlapOpen(false);
            setFlapFlipped(false);
            setCardOut(false);
            setCardZoomed(false);

            // Phase 1: Envelope opening sequence begins (Starts at 2.0s)
            setTimeout(() => {
                if (!isMounted) return;
                setPhase(1);
                setSealBroken(true);
            }, 2000);

            // 2.5s: Flap starts opening (takes 1.0s)
            setTimeout(() => {
                if (!isMounted) return;
                setFlapOpen(true);
            }, 2500);

            // 3.4s: Flip flap z-index
            setTimeout(() => {
                if (!isMounted) return;
                setFlapFlipped(true);
            }, 3400);

            // 3.5s: Flap is open. Card starts sliding out (takes 1.2s)
            setTimeout(() => {
                if (!isMounted) return;
                setCardOut(true);
            }, 3500);

            // 4.8s: Card is out. Zoom card (takes 1.0s)
            setTimeout(() => {
                if (!isMounted) return;
                setCardZoomed(true);
            }, 4800);

            // Phase 2: RSVP Auto-fill Demo (Starts at 5.5s, after card is fully zoomed)
            setTimeout(() => {
                if (!isMounted) return;
                setPhase(2);
                
                // Animate typing "Мария & Георги" letter-by-letter
                const name = "Мария & Георги";
                let currentText = "";
                let charIndex = 0;
                
                const type = () => {
                    if (!isMounted) return;
                    if (charIndex < name.length) {
                        currentText += name[charIndex];
                        setTypedName(currentText);
                        charIndex++;
                        typingTimeout = setTimeout(type, 80);
                    }
                };
                type();
            }, 5500);

            // Phase 3: RSVP Submit & Success (Starts at 8.2s)
            setTimeout(() => {
                if (!isMounted) return;
                setPhase(3);
                setRsvpSubmitted(true);
            }, 8200);

            // Phase 4: Admin Panel transitions in (Starts at 10.8s)
            setTimeout(() => {
                if (!isMounted) return;
                setPhase(4);
                
                // Reset envelope states while it is fading out
                setCardZoomed(false);
                setCardOut(false);
                setFlapOpen(false);
                setFlapFlipped(false);
                setSealBroken(false);
                
                // Show dashboard new guest row after a delay
                setTimeout(() => {
                    if (!isMounted) return;
                    setShowDashboardRow(true);
                    setConfirmedCount(84); // live counter increases by 2
                }, 1500);
            }, 10800);

            // Phase 5: Fade out and prepare to restart (Starts at 16.5s)
            setTimeout(() => {
                if (!isMounted) return;
                setPhase(5);
            }, 16500);
        };

        // Start cycle immediately
        runCycle();

        // Run in loop every 18.5 seconds
        const interval = setInterval(runCycle, 18500);

        return () => {
            isMounted = false;
            clearInterval(interval);
            clearTimeout(typingTimeout);
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

            {/* VIEW 1: ENVELOPE & INVITATION (Phases 0, 1, 2, 3) */}
            <div className="demo-view-container" style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: (phase >= 0 && phase <= 3) ? 1 : 0,
                transform: (phase >= 0 && phase <= 3) ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(-30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                pointerEvents: (phase >= 0 && phase <= 3) ? 'auto' : 'none',
                position: (phase >= 0 && phase <= 3) ? 'relative' : 'absolute'
            }}>
                {/* Envelope 3D Container */}
                <div className="demo-envelope-wrapper" style={{
                    transform: cardZoomed ? 'translate3d(0, 15px, 0) scale(0.95)' : 'none',
                    transition: 'transform 1.2s ease-in-out'
                }}>
                    <div className="demo-envelope" style={{
                        background: 'url(#demoEnvelopeGrad)',
                        backgroundColor: '#ebdcb8'
                    }}>
                        
                        {/* The Card inside the envelope */}
                        <div className={`demo-envelope-card ${cardOut ? 'emerged' : ''} ${cardZoomed ? 'zoomed' : ''}`}>
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

                                {/* Dynamic Content based on current phase */}
                                {phase < 2 ? (
                                    /* Cover / Invitation Invitation View */
                                    <>
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
                                    </>
                                ) : phase === 2 ? (
                                    /* Interactive RSVP Form Typing Demonstration */
                                    <div style={{ width: '100%', padding: '0 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeIn 0.3s' }}>
                                        <h4 className="serif" style={{ fontSize: '0.65rem', letterSpacing: '1.5px', color: 'var(--accent-gold-dark)', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                                            Присъствие (RSVP)
                                        </h4>
                                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                            {/* Mock Input Field with typing text */}
                                            <div style={{
                                                background: 'rgba(0,0,0,0.02)',
                                                border: '1px solid var(--accent-gold)',
                                                borderRadius: '3px',
                                                padding: '4px 6px',
                                                fontSize: '0.55rem',
                                                fontFamily: 'inherit',
                                                textAlign: 'left',
                                                minHeight: '18px',
                                                color: '#333',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                {typedName}
                                                <span className="blinking-cursor" style={{ marginLeft: '1px', fontWeight: 'bold', color: 'var(--accent-gold-dark)' }}>|</span>
                                            </div>

                                            {/* Mock Guests Count Counter */}
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.45rem', opacity: 0.8 }}>
                                                <span>Брой гости:</span>
                                                <span style={{ fontWeight: 'bold', border: '1px solid rgba(197,160,89,0.3)', padding: '1px 8px', borderRadius: '10px' }}>2</span>
                                            </div>

                                            {/* Radio status selector */}
                                            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '4px 0', fontSize: '0.45rem' }}>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--accent-gold-dark)', fontWeight: 'bold' }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-gold-dark)', display: 'inline-block' }}></span>
                                                    Ще присъствам
                                                </span>
                                                <span style={{ display: 'flex', alignItems: 'center', gap: '3px', opacity: 0.5 }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', border: '1px solid #777', display: 'inline-block' }}></span>
                                                    Няма да мога
                                                </span>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="demo-btn-mock" style={{
                                                width: '100%',
                                                background: 'var(--accent-gold-dark)',
                                                color: 'white',
                                                fontSize: '0.5rem',
                                                textAlign: 'center',
                                                padding: '4px 0',
                                                borderRadius: '30px',
                                                letterSpacing: '1px',
                                                fontWeight: 'bold',
                                                marginTop: '4px',
                                                animation: typedName.length >= 14 ? 'demoButtonPulse 1s infinite alternate' : 'none'
                                            }}>
                                                ИЗПРАТИ ОТГОВОР
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    /* RSVP Success Screen */
                                    <div style={{ textAlign: 'center', padding: '0 10px', animation: 'fadeIn 0.4s ease' }}>
                                        <div style={{
                                            width: '28px',
                                            height: '28px',
                                            borderRadius: '50%',
                                            border: '1.5px solid var(--accent-gold)',
                                            color: 'var(--accent-gold)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 10px auto',
                                            fontSize: '1rem',
                                            animation: 'scaleUpCheck 0.5s ease forwards'
                                        }}>
                                            ✓
                                        </div>
                                        <h3 className="serif" style={{ fontSize: '0.85rem', color: 'var(--accent-gold-dark)', margin: '0 0 6px 0' }}>
                                            Благодарим Ви!
                                        </h3>
                                        <p className="serif" style={{ fontSize: '0.55rem', opacity: 0.7, fontStyle: 'italic', lineHeight: '1.4' }}>
                                            Вашият отговор е изпратен успешно. Очакваме Ви! 🥂
                                        </p>
                                    </div>
                                )}
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

                        {/* Left, Right and Bottom Front Flaps */}
                        <svg viewBox="0 0 450 300" style={{ position: 'absolute', inset: -0.5, zIndex: 3, width: 'calc(100% + 1px)', height: 'calc(100% + 1px)', pointerEvents: 'none', transform: 'translate3d(0, 0, 4px)', transformStyle: 'preserve-3d' }}>
                            <path d="M -1.5 -1.5 L 226.5 150 L -1.5 301.5 Z" fill="url(#demoEnvelopeGrad)" opacity="0.98" filter="drop-shadow(3px 0 6px rgba(0,0,0,0.08))" />
                            <path d="M 451.5 -1.5 L 223.5 150 L 451.5 301.5 Z" fill="url(#demoEnvelopeGrad)" opacity="0.98" filter="drop-shadow(-3px 0 6px rgba(0,0,0,0.08))" />
                            <path d="M -1.5 301.5 L 225 148.5 L 451.5 301.5 Z" fill="url(#demoEnvelopeGrad)" filter="drop-shadow(0 -4px 8px rgba(0,0,0,0.1))" />
                            
                            <path d="M 0 0 L 225 150" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                            <path d="M 450 0 L 225 150" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" fill="none" transform="translate(0, 1.2)" />
                            <path d="M 0 300 L 225 150 L 450 300" stroke="rgba(0,0,0,0.18)" strokeWidth="1.8" fill="none" transform="translate(0, -1)" />
                            <path d="M 0 0 L 225 150" stroke="url(#demoGoldGradient)" strokeWidth="1" fill="none" opacity="0.8" />
                            <path d="M 450 0 L 225 150" stroke="url(#demoGoldGradient)" strokeWidth="1" fill="none" opacity="0.8" />
                            <path d="M 0 300 L 225 150 L 450 300" stroke="url(#demoGoldGradient)" strokeWidth="1.2" fill="none" />
                        </svg>

                        {/* Top Flap (flips open) */}
                        <div className={`demo-envelope-flap ${flapOpen ? 'open' : ''}`} style={{
                            zIndex: flapFlipped ? 1 : 4,
                        }}>
                            <svg viewBox="0 0 450 150" style={{ width: '100%', height: '100%', display: 'block', filter: flapOpen ? 'drop-shadow(0 -3px 4px rgba(0,0,0,0.1))' : 'drop-shadow(0 4px 6px rgba(0,0,0,0.15))', transition: 'filter 1.0s' }}>
                                <path d="M -1.5 -1.5 L 225 151.5 L 451.5 -1.5 Z" fill="url(#demoEnvelopeGrad)" />
                                <path d="M 0 0 L 225 150 L 450 0" stroke="rgba(0,0,0,0.18)" strokeWidth="1.8" fill="none" transform="translate(0, 1.2)" />
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
                        <div className={`demo-seal-half demo-seal-left ${sealBroken ? 'broken' : ''}`}>
                            <WaxSealSVG isLeft={true} monogram="A & S" />
                        </div>

                        {/* Right Half of Wax Seal */}
                        <div className={`demo-seal-half demo-seal-right ${sealBroken ? 'broken' : ''}`}>
                            <WaxSealSVG isLeft={false} monogram="A & S" />
                        </div>
                    </div>
                </div>

                {/* Status Text under the envelope */}
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
                    {phase === 0 ? "Получаване на поканата..." :
                     phase === 1 ? "Отваряне на плика..." :
                     phase === 2 ? "Гостът Мария попълва RSVP..." :
                     "Потвърждаване на присъствието!"}
                </p>
            </div>

            {/* VIEW 2: ORGANIZER DASHBOARD PANEL (Phases 4, 5) */}
            <div className="demo-dashboard" style={{
                width: 'min(350px, 95vw)',
                background: 'rgba(25, 23, 20, 0.98)',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                borderRadius: '16px',
                padding: '1.25rem 1.1rem',
                color: 'white',
                fontFamily: "'Cormorant Garamond', serif",
                transformStyle: 'preserve-3d',
                opacity: (phase >= 4) ? 1 : 0,
                transform: (phase >= 4) ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                pointerEvents: (phase >= 4) ? 'auto' : 'none',
                position: (phase >= 4) ? 'relative' : 'absolute',
                backgroundImage: 'var(--paper-texture)',
                boxSizing: 'border-box'
            }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(197,160,89,0.2)', paddingBottom: '8px', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '1rem' }}>📊</span>
                        <h4 className="serif" style={{ margin: 0, fontSize: '0.85rem', letterSpacing: '2px', color: 'var(--accent-gold)', textTransform: 'uppercase', fontWeight: 'bold' }}>
                            Организатор Панел
                        </h4>
                    </div>
                    <span style={{ fontSize: '0.55rem', background: 'rgba(197,160,89,0.15)', color: 'var(--accent-gold)', padding: '2px 8px', borderRadius: '10px', letterSpacing: '0.5px' }}>
                        СЪБИТИЕ: СВАТБА
                    </span>
                </div>

                {/* Dashboard Stats */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(197,160,89,0.1)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.5rem', opacity: 0.6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ПОТВЪРДИЛИ</span>
                        <span className="serif" style={{ fontSize: '1.25rem', color: 'var(--accent-gold)', fontWeight: 'bold', display: 'block', transition: 'all 0.5s' }}>
                            {confirmedCount} души
                        </span>
                    </div>
                    <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(197,160,89,0.1)', padding: '6px', borderRadius: '6px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.5rem', opacity: 0.6, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>ОТКАЗАЛИ</span>
                        <span className="serif" style={{ fontSize: '1.25rem', color: '#ff7b7b', fontWeight: 'bold', display: 'block' }}>5 души</span>
                    </div>
                </div>

                {/* Guest Table */}
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '6px', padding: '6px', marginBottom: '12px' }}>
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.55rem', opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase' }}>
                        Списък с Гости (Последно записани)
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', maxHeight: '115px', overflow: 'hidden' }}>
                        
                        {/* Interactive popping Guest Row (Maria & Georgi) */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            background: showDashboardRow ? 'rgba(197,160,89,0.12)' : 'transparent',
                            border: showDashboardRow ? '1px dashed var(--accent-gold)' : '1px solid transparent',
                            borderRadius: '4px',
                            padding: '4px 6px',
                            fontSize: '0.65rem',
                            opacity: showDashboardRow ? 1 : 0,
                            maxHeight: showDashboardRow ? '30px' : '0px',
                            transform: showDashboardRow ? 'translateY(0)' : 'translateY(-10px)',
                            transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
                            overflow: 'hidden'
                        }}>
                            <span style={{ fontWeight: 'bold', color: 'var(--accent-gold)' }}>Мария & Георги</span>
                            <span>2 гости</span>
                            <span style={{ color: '#88e088', fontWeight: 'bold' }}>Присъстват ✓</span>
                        </div>

                        {/* Static Rows for realism */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '4px 6px', fontSize: '0.65rem', opacity: 0.9 }}>
                            <span>Иван Петров</span>
                            <span>1 гост</span>
                            <span style={{ color: '#88e088', fontWeight: 'bold' }}>Присъства ✓</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '4px 6px', fontSize: '0.65rem', opacity: 0.9 }}>
                            <span>Стефан & Анна</span>
                            <span>2 гости</span>
                            <span style={{ color: '#88e088', fontWeight: 'bold' }}>Присъстват ✓</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '4px 6px', fontSize: '0.65rem', opacity: 0.6 }}>
                            <span>Елена Колева</span>
                            <span>1 гост</span>
                            <span style={{ color: '#ff7b7b' }}>Няма да успее ✕</span>
                        </div>
                    </div>
                </div>

                {/* Music Background / Tracking features panel */}
                <div style={{ borderTop: '1px dashed rgba(197,160,89,0.2)', paddingTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.55rem' }}>
                        <span style={{ opacity: 0.6 }}>🎵 Музикален фон:</span>
                        <span style={{ color: 'var(--accent-gold)' }}>Включен (Вашето аудио)</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.55rem' }}>
                        <span style={{ opacity: 0.6 }}>📍 Навигация:</span>
                        <span style={{ color: 'var(--accent-gold)' }}>Google Maps GPS Активен</span>
                    </div>
                </div>
            </div>

            {/* Status explanation label under dashboard */}
            {phase >= 4 && (
                <p className="serif" style={{
                    color: 'rgba(255,255,255,0.7)',
                    letterSpacing: '2px',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    marginTop: '1.5rem',
                    opacity: 0.8,
                    textAlign: 'center',
                    minHeight: '20px',
                    animation: 'fadeIn 0.5s'
                }}>
                    {!showDashboardRow ? "Отваряне на Организатор Панела..." : "Отговорът е получен и записан в реално време!"}
                </p>
            )}

            <style>{`
                .blinking-cursor {
                    animation: blinkCursor 0.8s infinite;
                }

                @keyframes blinkCursor {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }

                @keyframes demoButtonPulse {
                    0% { transform: scale(1); box-shadow: 0 0 0 rgba(197,160,89,0); }
                    100% { transform: scale(1.03); box-shadow: 0 0 10px rgba(197,160,89,0.5); }
                }

                @keyframes scaleUpCheck {
                    0% { transform: scale(0.6); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                .demo-envelope-wrapper {
                    position: relative;
                    width: min(320px, 90%);
                    height: 213px; /* 3:2 ratio */
                    perspective: 1000px;
                    z-index: 10;
                    transition: transform 1.2s ease-in-out;
                }

                .demo-envelope {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3), inset 0 0 20px rgba(0,0,0,0.08);
                    transform-style: preserve-3d;
                }

                .demo-envelope-card {
                    position: absolute;
                    top: 9%;
                    left: 7%;
                    width: 86%;
                    height: 82%;
                    background: #fdfaf5;
                    border: 1px solid rgba(197,160,89,0.3);
                    border-radius: 4px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.08);
                    z-index: 2;
                    transform: translate3d(0, 0, 2px);
                    padding: 10px 8px;
                    box-sizing: border-box;
                    background-image: var(--paper-texture);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    transform-style: preserve-3d;
                    transition: transform 1.2s cubic-bezier(0.25, 1, 0.5, 1);
                    will-change: transform;
                    backface-visibility: hidden;
                }

                .demo-envelope-card.emerged {
                    transform: translate3d(0, -70%, 2px) scale(1.05);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.25), inset 0 0 10px rgba(197,160,89,0.08);
                    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .demo-envelope-card.zoomed {
                    transform: translate3d(0, -28%, 60px) scale(1.35);
                    box-shadow: 0 35px 70px rgba(0,0,0,0.4), inset 0 0 15px rgba(197,160,89,0.1);
                    z-index: 100;
                    transition: transform 1.0s cubic-bezier(0.25, 1, 0.5, 1), z-index 0s linear;
                }

                .demo-envelope-flap {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 50%;
                    transform-origin: top;
                    transition: transform 1.0s cubic-bezier(0.4, 0, 0.2, 1);
                    transform-style: preserve-3d;
                    transform: rotateX(0deg) translate3d(0, 0, 4.02px); /* flush with front flaps but distinct in Z */
                    will-change: transform;
                    backface-visibility: hidden;
                }

                .demo-envelope-flap.open {
                    transform: rotateX(180deg) translate3d(0, 0, 1px); /* flips flat behind card */
                }

                .demo-seal-half {
                    position: absolute;
                    top: calc(50% - 40px);
                    width: 40px;
                    height: 80px;
                    overflow: hidden;
                    z-index: 5;
                    transform: translate3d(0, 0, 4.05px); /* sits on top of closed top flap */
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                    backface-visibility: hidden;
                }

                .demo-seal-left {
                    left: calc(50% - 40px);
                }

                .demo-seal-right {
                    left: 50%;
                }

                .demo-seal-left.broken {
                    transform: translate3d(-30px, 15px, 4.05px) rotate(-20deg) scale(0.8);
                    opacity: 0;
                }

                .demo-seal-right.broken {
                    transform: translate3d(30px, 15px, 4.05px) rotate(20deg) scale(0.8);
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default EnvelopeDemo;
