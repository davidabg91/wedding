import React from 'react';

const ExtraCard = ({ title, description, price, icon, popular }) => (
    <div style={{
        background: 'white',
        padding: '2.5rem',
        borderRadius: '4px',
        border: popular ? '2px solid var(--accent-gold)' : '1px solid rgba(197, 160, 89, 0.2)',
        boxShadow: popular ? '0 15px 40px rgba(197, 160, 89, 0.15)' : '0 10px 30px rgba(0,0,0,0.03)',
        textAlign: 'center',
        position: 'relative',
        transition: 'transform 0.3s ease',
        cursor: 'pointer'
    }} className="extra-card-hover">
        {popular && (
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--accent-gold)',
                color: 'white',
                padding: '5px 15px',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                borderRadius: '20px',
                fontWeight: 'bold'
            }}>ПРЕПОРЪЧАНО</div>
        )}
        <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{icon}</div>
        <h3 className="serif" style={{ fontSize: '1.5rem', color: '#222', marginBottom: '1rem' }}>{title}</h3>
        <p className="serif" style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', minHeight: '80px' }}>{description}</p>
        <div style={{ margin: '2rem 0', height: '1px', background: 'rgba(197, 160, 89, 0.1)' }}></div>
        <div className="serif" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-gold-dark)' }}>{price}</div>
        <button className="lux-btn" style={{ marginTop: '1.5rem', width: '100%', fontSize: '0.8rem' }}>ИЗБЕРИ</button>
    </div>
);

const ExtrasPage = ({ onBack, data, onRegister }) => {
    return (
        <div style={{
            background: 'var(--paper-bg)',
            minHeight: '100vh',
            padding: '6rem 2rem',
            position: 'relative'
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

            <div className="lux-container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 11 }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-gold-dark)',
                        fontSize: '0.8rem',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        marginBottom: '4rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    ← ВРЪЩАНЕ КЪМ ПРЕГЛЕДА
                </button>

                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 className="serif" style={{ fontSize: '3.5rem', color: '#222', marginBottom: '1.5rem', letterSpacing: '4px' }}>
                        ПЕРСОНАЛИЗИРАЙТЕ СВОЯТА ПОКАНА
                    </h1>
                    <p className="serif" style={{ fontSize: '1.1rem', color: '#666', maxWidth: '700px', margin: '0 auto', lineHeight: '1.8' }}>
                        Поздравления! Вашата покана за <strong>{data.groom} & {data.bride}</strong> е готова.
                        Направете я още по-специална с нашите премиум допълнения.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '6rem'
                }}>
                    <ExtraCard
                        icon="📸"
                        title="Жива Галерия"
                        description="Позволете на Вашите гости да качват снимки в реално време през техните телефони директно в поканата в деня на сватбата."
                        price="15.00 лв."
                    />
                    <ExtraCard
                        icon="🌐"
                        title="Персонален Домейн"
                        description={`Вашата покана на собствен интернет адрес, например: ${data.groom.toLowerCase()}-and-${data.bride.toLowerCase()}.com`}
                        price="35.00 лв."
                        popular
                    />
                    <ExtraCard
                        icon="📊"
                        title="RSVP Табло"
                        description="Проследявайте в реално време кои гости са потвърдили, техните имена и брой придружаващи лица в интуитивно табло."
                        price="БЕЗПЛАТНО"
                    />
                </div>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.4)',
                    padding: '5rem',
                    borderRadius: '4px',
                    textAlign: 'center',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.02)',
                    border: '1px solid rgba(197, 160, 89, 0.1)'
                }}>
                    <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>ГОТОВИ ЛИ СТЕ ЗА СЛЕДВАЩАТА СТЪПКА?</h2>
                    <p className="serif" style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem' }}>
                        Регистрирайте се, за да запазите поканата си и да получите достъп до Вашия панел за управление.
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <button onClick={onRegister} className="lux-btn" style={{ minWidth: '250px' }}>РЕГИСТРАЦИЯ</button>
                        <button onClick={onRegister} className="lux-btn" style={{ minWidth: '250px', background: 'none', color: 'var(--accent-gold-dark)' }}>ВХОД</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtrasPage;
