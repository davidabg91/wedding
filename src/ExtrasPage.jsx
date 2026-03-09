import React, { useState } from 'react';

const EXTRAS_DATA = [
    {
        id: 'rsvp',
        icon: '📊',
        title: 'RSVP Табло',
        description: 'Проследявайте в реално време кои гости са потвърдили, техните имена и брой придружаващи лица в интуитивно табло.',
        price: 0,
        priceLabel: '0.00 €'
    },
    {
        id: 'domain',
        icon: '🌐',
        title: 'Персонален Домейн',
        description: 'Вашата покана на собствен интернет адрес, например: ivan-and-maria.wedding',
        price: 18,
        priceLabel: '18.00 €',
        popular: true
    },
    {
        id: 'gallery',
        icon: '📸',
        title: 'Жива Галерия',
        description: 'Позволете на Вашите гости да качват снимки в реално време през техните телефони директно в поканата в деня на сватбата.',
        price: 8,
        priceLabel: '8.00 €'
    },
    {
        id: 'guestbook',
        icon: '✍️',
        title: 'Дигитална Книга',
        description: 'Съберете най-милите пожелания и видео-поздрави от Вашите гости в стилна дигитална книга за спомен.',
        price: 8,
        priceLabel: '8.00 €'
    },
    {
        id: 'seating',
        icon: '📍',
        title: 'Карта на Масите',
        description: 'Помогнете на гостите да намерят мястото си веднага чрез интерактивен план на масите в ресторанта.',
        price: 12,
        priceLabel: '12.00 €'
    },
    {
        id: 'countdown',
        icon: '⏳',
        title: 'Таймер за Обратно Броене',
        description: 'Добавете вълнение с динамичен таймер, броящ дните и минутите до началото на Вашия магичен ден.',
        price: 3,
        priceLabel: '3.00 €'
    },
    {
        id: 'music',
        icon: '🎻',
        title: 'Музикален Фон',
        description: 'Изберете любимата си песен, която да свири нежно при отваряне на поканата за пълно сетивно преживяване.',
        price: 5,
        priceLabel: '5.00 €'
    },
    {
        id: 'qr',
        icon: '📲',
        title: 'Луксозен QR Код',
        description: 'Стилен дизайн на QR код за Вашите печатни материали, осигуряващ незабавен достъп до дигиталната покана.',
        price: 3,
        priceLabel: '3.00 €'
    },
    {
        id: 'video',
        icon: '🎥',
        title: 'VIP Видео Поздрав',
        description: 'Лично видео обръщение от Вас към Вашите гости, което се появява веднага при отваряне на поканата.',
        price: 8,
        priceLabel: '8.00 €'
    }
];

const ExtraCard = ({ id, title, description, priceLabel, icon, popular, isSelected, onToggle }) => (
    <div
        onClick={() => onToggle(id)}
        style={{
            background: 'white',
            padding: '2.5rem',
            borderRadius: '4px',
            border: isSelected ? '2px solid var(--accent-gold)' : (popular ? '2px solid rgba(197, 160, 89, 0.4)' : '1px solid rgba(197, 160, 89, 0.2)'),
            boxShadow: isSelected ? '0 15px 45px rgba(197, 160, 89, 0.25)' : (popular ? '0 15px 40px rgba(197, 160, 89, 0.15)' : '0 10px 30px rgba(0,0,0,0.03)'),
            textAlign: 'center',
            position: 'relative',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            transform: isSelected ? 'scale(1.02)' : 'none'
        }} className="extra-card-hover">
        {popular && !isSelected && (
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
        {isSelected && (
            <div style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--accent-gold-dark)',
                color: 'white',
                padding: '5px 15px',
                fontSize: '0.7rem',
                letterSpacing: '2px',
                borderRadius: '20px',
                fontWeight: 'bold'
            }}>ИЗБРАНО ✅</div>
        )}
        <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', filter: isSelected ? 'none' : 'grayscale(0.5)', opacity: isSelected ? 1 : 0.8 }}>{icon}</div>
        <h3 className="serif" style={{ fontSize: '1.5rem', color: '#222', marginBottom: '1rem' }}>{title}</h3>
        <p className="serif" style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6', minHeight: '80px' }}>{description}</p>
        <div style={{ margin: '2rem 0', height: '1px', background: 'rgba(197, 160, 89, 0.1)' }}></div>
        <div className="serif" style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--accent-gold-dark)' }}>{priceLabel}</div>
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggle(id);
            }}
            className="lux-btn"
            style={{
                marginTop: '1.5rem',
                width: '100%',
                fontSize: '0.8rem',
                background: isSelected ? '#e74c3c' : 'var(--accent-gold)',
                borderColor: isSelected ? '#e74c3c' : 'var(--accent-gold)',
                color: 'white',
                cursor: 'pointer'
            }}
        >
            {isSelected ? 'ПРЕМАХНИ' : 'ИЗБЕРИ'}
        </button>
    </div>
);

const ExtrasPage = ({ onBack, data, onRegister }) => {
    const [selectedExtraIds, setSelectedExtraIds] = useState(['rsvp']);

    const toggleExtra = (id) => {
        setSelectedExtraIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    const selectedList = EXTRAS_DATA.filter(extra => selectedExtraIds.includes(extra.id));
    const finalTotal = selectedList.reduce((acc, curr) => acc + curr.price, 0);

    return (
        <div style={{
            background: 'var(--paper-bg)',
            minHeight: '100vh',
            padding: 'clamp(2rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
            position: 'relative'
        }}>
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

            <div className="lux-container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 11 }}>
                <button
                    onClick={onBack}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-gold-dark)',
                        fontSize: '0.8rem',
                        letterSpacing: '2px',
                        cursor: 'pointer',
                        marginBottom: 'clamp(2rem, 5vw, 4rem)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}
                >
                    ← ВРЪЩАНЕ КЪМ ПРЕГЛЕДА
                </button>

                <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 10vw, 6rem)' }}>
                    <h1 className="serif" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', color: '#222', marginBottom: '1.5rem', letterSpacing: 'clamp(1px, 1vw, 4px)' }}>
                        ПЕРСОНАЛИЗИРАЙТЕ СВОЯТА ПОКАНА
                    </h1>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: 'clamp(4rem, 10vw, 8rem)'
                }}>
                    {EXTRAS_DATA.map(extra => (
                        <ExtraCard
                            key={extra.id}
                            {...extra}
                            isSelected={selectedExtraIds.includes(extra.id)}
                            onToggle={toggleExtra}
                        />
                    ))}
                </div>

                {/* Summary Section */}
                <div style={{
                    background: '#fffdf9',
                    padding: 'clamp(2rem, 8vw, 4rem)',
                    borderRadius: '8px',
                    boxShadow: '0 40px 80px rgba(197, 160, 89, 0.1)',
                    border: '2px solid rgba(197, 160, 89, 0.3)',
                    maxWidth: '800px',
                    margin: '0 auto clamp(3rem, 8vw, 6rem) auto',
                    textAlign: 'center'
                }}>
                    <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: 'var(--accent-gold-dark)', marginBottom: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '3px' }}>
                        ОБОБЩЕНИЕ НА ИЗБРАНОТО
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: 'clamp(2rem, 6vw, 4rem)' }}>
                        {selectedList.map(extra => (
                            <div key={extra.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(197, 160, 89, 0.1)', paddingBottom: '1.2rem', gap: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span style={{ fontSize: '1.5rem' }}>{extra.icon}</span>
                                    <span className="serif" style={{ fontSize: '1rem', color: '#333', textAlign: 'left' }}>{extra.title}</span>
                                </div>
                                <span className="serif" style={{ fontSize: '1rem', fontWeight: 'bold', color: extra.price === 0 ? '#27ae60' : 'var(--accent-gold-dark)', whiteSpace: 'nowrap' }}>
                                    {extra.priceLabel}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'clamp(10px, 4vw, 25px)', flexWrap: 'wrap' }}>
                        <span className="serif" style={{ fontSize: '1.2rem', color: '#7a7a7a', letterSpacing: '2px' }}>ФИНАЛНА СУМА:</span>
                        <span className="serif" style={{ fontSize: 'clamp(2.5rem, 10vw, 4rem)', fontWeight: 'bold', color: 'var(--accent-gold-dark)' }}>
                            {finalTotal.toFixed(2)} €
                        </span>
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <button onClick={onRegister} className="lux-btn" style={{ width: 'min(350px, 100%)', padding: '1.5rem' }}>
                        РЕГИСТРАЦИЯ И ЗАПАЗВАНЕ (Checkout)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExtrasPage;
