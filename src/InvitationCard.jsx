import React, { useEffect, useState, useRef } from 'react';

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

const Section = ({ children, className = "", delay = "0s" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) setIsVisible(true);
            });
        }, { threshold: 0.1 });

        observer.observe(domRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={domRef}
            className={`reveal ${isVisible ? 'active' : ''} ${className}`}
            style={{ padding: '3rem 2rem', textAlign: 'center', transitionDelay: delay }}
        >
            {children}
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

const ProgramItem = ({ time, activity }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '30px', margin: '2rem 0', textAlign: 'left' }}>
        <div style={{ minWidth: '80px', borderRight: '1px solid var(--accent-gold)', paddingRight: '20px', textAlign: 'right' }}>
            <p className="serif" style={{ fontSize: '1.2rem', color: 'var(--accent-gold-dark)', fontWeight: '600' }}>{time}</p>
        </div>
        <div>
            <p className="serif" style={{ fontSize: '1.1rem', color: '#444', letterSpacing: '0.5px' }}>{activity}</p>
        </div>
    </div>
);

const InvitationCard = ({ data }) => {
    const [submitted, setSubmitted] = useState(false);
    const [guests, setGuests] = useState(1);
    const [guestNames, setGuestNames] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const photos = data.photos || [];
    const venuePhoto = data.venuePhoto || "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000";
    const program = data.program || [];

    // First photo is Hero
    const heroPhoto = photos[0];
    // Remaining photos for distribution
    const remainingPhotos = photos.slice(1);

    return (
        <div style={{
            background: 'var(--paper-bg)',
            minHeight: '100vh',
            position: 'relative',
            padding: '4rem 0'
        }}>

            {/* Texture Overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: 'var(--paper-texture)',
                opacity: 0.4,
                pointerEvents: 'none',
                zIndex: 10
            }}></div>

            <div className="lux-container" style={{ maxWidth: '850px', margin: '0 auto', position: 'relative', zIndex: 11 }}>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <SwirlOrnament style={{ marginBottom: '1.5rem' }} />
                    <h2 className="serif" style={{ fontSize: '1.1rem', letterSpacing: '12px', opacity: 0.6, marginBottom: '1rem', textTransform: 'uppercase' }}>Wedding Invitation</h2>
                    <BaroqueOrnament />
                    <h1 className="serif" style={{ fontSize: '4rem', marginTop: '2rem', letterSpacing: '5px', fontWeight: '400', color: '#222' }}>
                        ПОКАНА ЗА СВАТБА
                    </h1>
                    <div style={{ height: '1px', width: '100px', background: 'var(--accent-gold)', margin: '1.5rem auto', opacity: 0.4 }}></div>
                    <h2 className="script" style={{ fontSize: '7rem', color: 'var(--accent-gold-dark)', marginTop: '0.5rem', lineHeight: '0.8' }}>
                        {data.groom} & {data.bride}
                    </h2>
                </div>

                {/* Introduction Section */}
                <Section>
                    <p className="serif" style={{ fontSize: '1.5rem', color: '#333', maxWidth: '650px', margin: '0 auto', lineHeight: '2', fontStyle: 'italic' }}>
                        "Най-красивото в живота е да намериш човек, който вижда в теб всичко, от което ти се страхува някой да бъдеш."
                    </p>

                    {/* Hero Photo Section - Moved here, under the quote */}
                    {heroPhoto && (
                        <div style={{ padding: '2rem 1rem' }}>
                            <MaskedImage src={heroPhoto} alt="Hero" height="550px" ornate={true} />
                        </div>
                    )}

                    <BaroqueOrnament style={{ marginTop: '2rem', transform: 'scaleY(-1)' }} />
                </Section>

                {/* Dynamic Program Section */}
                {data.showProgram && program.length > 0 && (
                    <Section title="ПРОГРАМА">
                        <h3 className="serif" style={{ fontSize: '2.5rem', color: 'var(--accent-gold-dark)', marginBottom: '4rem', letterSpacing: '4px' }}>СВАТБЕНА ПРОГРАМА</h3>

                        <div style={{ background: 'rgba(197, 160, 89, 0.02)', padding: '4rem 3rem', borderRadius: '4px', border: '1px solid rgba(197, 160, 89, 0.05)', maxWidth: '600px', margin: '0 auto' }}>
                            {program.map((item, index) => (
                                <ProgramItem key={index} time={item.time} activity={item.activity} />
                            ))}
                        </div>

                        {/* Distributed Heart 1 (Was photo index 1) */}
                        {remainingPhotos[0] && <HeartImage src={remainingPhotos[0]} size="220px" />}

                        <SwirlOrnament style={{ marginTop: '4rem' }} />
                    </Section>
                )}

                {/* Location & Details Section */}
                <Section>
                    <h3 className="serif" style={{ letterSpacing: '6px', fontSize: '1.1rem', color: 'var(--accent-gold-dark)', marginBottom: '2rem', opacity: 0.7 }}>КЪДЕ ЩЕ СЕ СЛУЧИ МАГИЯТА</h3>
                    <p className="serif" style={{ fontSize: '3rem', color: '#222', marginBottom: '1.5rem' }}>{data.location}</p>

                    <MaskedImage src={venuePhoto} alt="Restaurant" height="400px" />

                    <p className="serif" style={{ fontSize: '1.1rem', opacity: 0.7, maxWidth: '550px', margin: '2rem auto' }}>
                        За нас е чест да Ви поканим в изисканата атмосфера на {data.location}, където заедно ще поставим началото на нашия съвместен път.
                    </p>

                    {/* Distributed Heart 2 (Was photo index 2) */}
                    {remainingPhotos[1] && <HeartImage src={remainingPhotos[1]} size="220px" />}

                    {data.locationLink && (
                        <a href={data.locationLink} target="_blank" rel="noreferrer" className="lux-btn" style={{ marginTop: '3rem', display: 'inline-block' }}>Карта & Упътване</a>
                    )}
                </Section>

                {/* Footer Heart (If enough photos) */}
                {remainingPhotos[2] && (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <HeartImage src={remainingPhotos[2]} size="220px" />
                    </div>
                )}

                {/* Remaining Photos Distribution (If more than 4 total photos) */}
                {remainingPhotos.length > 3 && (
                    <div style={{ textAlign: 'center', padding: '2rem 10%' }}>
                        {remainingPhotos.slice(3).map((src, i) => (
                            <HeartImage key={i} src={src} size="180px" />
                        ))}
                    </div>
                )}

                <div style={{ textAlign: 'center', padding: '3rem 0' }}><BaroqueOrnament /></div>

                {/* RSVP Section */}
                <Section className="rsvp-section">
                    <div style={{ padding: '6rem 3rem', background: 'rgba(255, 255, 255, 0.4)', boxShadow: '0 20px 50px rgba(0,0,0,0.03)', borderRadius: '4px', position: 'relative' }}>
                        <h3 className="serif" style={{ fontSize: '2.8rem', color: 'var(--accent-gold-dark)', marginBottom: '3rem' }}>Потвърждение</h3>
                        {!submitted ? (
                            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                                <p className="serif" style={{ marginBottom: '3rem', fontStyle: 'italic', color: '#777' }}>Моля, потвърдете Вашето присъствие до 15-ти Април.</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px', margin: '0 auto' }}>
                                    <input type="text" placeholder="Вашето име..." className="lux-input" style={{ textAlign: 'center' }} required />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                                        <p className="serif" style={{ fontSize: '0.9rem', opacity: 0.6 }}>Брой гости (включително Вас):</p>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                            <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))} style={{ background: 'none', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>-</button>
                                            <span className="serif" style={{ fontSize: '1.4rem' }}>{guests}</span>
                                            <button type="button" onClick={() => setGuests(guests + 1)} style={{ background: 'none', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', width: '30px', height: '30px', cursor: 'pointer', borderRadius: '50%' }}>+</button>
                                        </div>
                                    </div>
                                    {guests > 1 && (
                                        <textarea placeholder="Имена на Вашите спътници..." className="lux-input" style={{ textAlign: 'center', height: '100px', resize: 'none', paddingTop: '1rem' }} value={guestNames} onChange={(e) => setGuestNames(e.target.value)} />
                                    )}
                                </div>
                                <div style={{ display: 'flex', gap: '50px', justifyContent: 'center', margin: '3rem 0' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '1.1rem', color: '#444' }}>
                                        <input type="radio" name="rsvp" defaultChecked style={{ accentColor: 'var(--accent-gold)' }} /> Ще присъствам
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '1.1rem', color: '#444' }}>
                                        <input type="radio" name="rsvp" style={{ accentColor: 'var(--accent-gold)' }} /> Няма да мога
                                    </label>
                                </div>
                                <button type="submit" className="lux-btn" style={{ minWidth: '280px' }}>ИЗПРАТИ ОТГОВОР</button>
                            </form>
                        ) : (
                            <div style={{ padding: '3rem 0', animation: 'fadeIn 2s' }}>
                                <h3 className="script" style={{ fontSize: '5rem', color: 'var(--accent-gold-dark)' }}>Благодарим Ви!</h3>
                                <p className="serif" style={{ marginTop: '2rem', fontSize: '1.2rem', opacity: 0.6 }}>Очакваме Ви с нетърпение в състав от {guests} човека.</p>
                            </div>
                        )}
                        <SwirlOrnament style={{ position: 'absolute', top: '20px', left: '20px', opacity: 0.1 }} />
                        <SwirlOrnament style={{ position: 'absolute', bottom: '20px', right: '20px', opacity: 0.1 }} />
                    </div>
                </Section>

                {/* Footer */}
                <div style={{ textAlign: 'center', padding: '10rem 0 4rem 0' }}>
                    <BaroqueOrnament style={{ marginBottom: '3rem' }} />
                    <p className="serif" style={{ fontSize: '1rem', letterSpacing: '8px', opacity: 0.4 }}>{data.groom.toUpperCase()} & {data.bride.toUpperCase()}</p>
                    <p className="serif" style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', marginTop: '2rem', letterSpacing: '4px' }}>2026</p>
                </div>

            </div>
        </div>
    );
};

export default InvitationCard;
