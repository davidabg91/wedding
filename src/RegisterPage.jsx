import React from 'react';

const RegisterPage = ({ onBack, onRegister }) => {
    return (
        <div style={{
            background: 'var(--paper-bg)',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="paper-surface" style={{
                maxWidth: '500px',
                width: '100%',
                padding: '4rem',
                textAlign: 'center',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                borderRadius: '2px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.05)'
            }}>
                <h2 className="serif" style={{ fontSize: '2.5rem', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>РЕГИСТРАЦИЯ</h2>
                <p className="serif" style={{ color: '#666', marginBottom: '3rem', fontSize: '0.9rem' }}>Запазете Вашия проект и следете отговорите на гостите в реално време.</p>

                <form onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                        <div>
                            <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ЕЛЕКТРОННА ПОЩА</label>
                            <input type="email" className="lux-input" required placeholder="email@example.com" />
                        </div>
                        <div>
                            <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ПАРОЛА</label>
                            <input type="password" className="lux-input" required placeholder="••••••••" />
                        </div>
                        <div>
                            <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ПОТВЪРДИ ПАРОЛА</label>
                            <input type="password" className="lux-input" required placeholder="••••••••" />
                        </div>
                    </div>

                    <button type="submit" className="lux-btn" style={{ width: '100%', marginTop: '3rem' }}>СЪЗДАЙ ПРОФИЛ</button>
                </form>

                <button
                    onClick={onBack}
                    style={{ background: 'none', border: 'none', color: '#999', marginTop: '2rem', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                    Отказ
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
