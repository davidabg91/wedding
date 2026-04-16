import React, { useState } from 'react';
import { registerUser, loginUser } from './firebaseService';

const RegisterPage = ({ onBack, onRegister }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (!isLogin && password !== confirmPassword) {
                throw new Error("Паролите не съвпадат!");
            }

            if (isLogin) {
                const userCredential = await loginUser(email, password);
                onRegister(userCredential.user);
            } else {
                const userCredential = await registerUser(email, password);
                onRegister(userCredential.user);
            }
        } catch (err) {
            console.error(err);
            let message = "Възникна грешка.";
            if (err.code === 'auth/email-already-in-use') message = "Този имейл вече се използва.";
            if (err.code === 'auth/weak-password') message = "Паролата е твърде слаба.";
            if (err.code === 'auth/invalid-credential') message = "Грешен имейл или парола.";
            if (err.message === "Паролите не съвпадат!") message = err.message;
            
            setError(message);
        } finally {
            setLoading(false);
        }
    };

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
                padding: 'clamp(2rem, 8vw, 4rem)',
                textAlign: 'center',
                border: '1px solid rgba(197, 160, 89, 0.2)',
                borderRadius: '2px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.05)',
                position: 'relative'
            }}>
                <h2 className="serif" style={{ fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>
                    {isLogin ? 'ВХОД' : 'РЕГИСТРАЦИЯ'}
                </h2>
                <p className="serif" style={{ color: '#666', marginBottom: '3rem', fontSize: '0.9rem' }}>
                    {isLogin ? 'Добре дошли отново във вашия проект.' : 'Запазете Вашия проект и следете отговорите на гостите в реално време.'}
                </p>

                {error && (
                    <div style={{ background: '#fff5f5', color: '#e74c3c', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.85rem', border: '1px solid #ff000022' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
                        <div>
                            <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ЕЛЕКТРОННА ПОЩА</label>
                            <input 
                                type="email" 
                                className="lux-input" 
                                required 
                                placeholder="email@example.com" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ПАРОЛА</label>
                            <input 
                                type="password" 
                                className="lux-input" 
                                required 
                                placeholder="••••••••" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {!isLogin && (
                            <div>
                                <label className="serif" style={{ fontSize: '0.8rem', color: 'var(--accent-gold-dark)', letterSpacing: '1px' }}>ПОТВЪРДИ ПАРОЛА</label>
                                <input 
                                    type="password" 
                                    className="lux-input" 
                                    required 
                                    placeholder="••••••••" 
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className="lux-btn" 
                        disabled={loading}
                        style={{ width: '100%', marginTop: '3rem', opacity: loading ? 0.7 : 1 }}
                    >
                        {loading ? 'ОБРАБОТКА...' : (isLogin ? 'ВЛЕЗ В ПРОФИЛА' : 'СЪЗДАЙ ПРОФИЛ')}
                    </button>
                </form>

                <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(197, 160, 89, 0.1)', paddingTop: '2rem' }}>
                    <p className="serif" style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
                        {isLogin ? 'Нямате профил?' : 'Вече имате профил?'}
                    </p>
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        style={{
                            background: 'none',
                            border: '1px solid var(--accent-gold)',
                            color: 'var(--accent-gold-dark)',
                            padding: '10px 20px',
                            cursor: 'pointer',
                            fontSize: '0.7rem',
                            letterSpacing: '2px',
                            width: '100%'
                        }}
                    >
                        {isLogin ? 'РЕГИСТРИРАЙ СЕ' : 'ВЛЕЗ В ПРОФИЛА'}
                    </button>
                </div>

                <button
                    onClick={onBack}
                    style={{ background: 'none', border: 'none', color: '#999', marginTop: '3rem', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                    Връщане назад
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
