import React, { useState, useEffect, useRef } from 'react';

const IntroVideo = ({ data, onFinish }) => {
    const [videoEnded, setVideoEnded] = useState(false);
    const [showNames, setShowNames] = useState(false);
    const videoRef = useRef(null);

    const handleFinish = () => {
        setVideoEnded(true);
        setTimeout(onFinish, 1000);
    };

    useEffect(() => {
        const timer = setTimeout(() => setShowNames(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const getIntroTheme = () => {
        switch (data.eventType) {
            case 'christening':
                const isGirl = data.childGender === 'girl';
                return {
                    label: 'ПОКАНА ЗА СВЕТО КРЪЩЕНИЕ',
                    names: data.childName ? data.childName.toUpperCase() : 'ВАШЕТО ДЕТЕ',
                    overlay: isGirl ? 'rgba(217, 136, 128, 0.4)' : 'rgba(127, 179, 213, 0.4)'
                };
            case 'birthday':
                return {
                    label: 'ПОКАНА ЗА РОЖДЕН ДЕН',
                    names: data.birthdayPerson ? data.birthdayPerson.toUpperCase() : 'РОЖДЕНИК',
                    overlay: 'rgba(255, 87, 51, 0.3)'
                };
            case 'jubilee':
                return {
                    label: 'ПОКАНА ЗА ЮБИЛЕЙ',
                    names: data.jubileePerson ? data.jubileePerson.toUpperCase() : 'ЮБИЛЯР',
                    overlay: 'rgba(197, 160, 89, 0.3)'
                };
            default: // wedding
                return {
                    label: 'ПОКАНА ЗА СВАТБА',
                    names: `${data.groom || 'МЛАДОЖЕНЕЦ'} & ${data.bride || 'БУЛКА'}`,
                    overlay: 'rgba(197, 160, 89, 0.2)'
                };
        }
    };

    const theme = getIntroTheme();

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#000',
            zIndex: 2000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 1s ease',
            opacity: videoEnded ? 0 : 1
        }}>
            {/* Dynamic Color Overlay */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: theme.overlay,
                zIndex: 1,
                pointerEvents: 'none',
                mixBlendMode: 'overlay'
            }}></div>

            <video
                ref={videoRef}
                src="https://assets.mixkit.co/videos/preview/mixkit-top-view-of-a-wedding-invitation-being-opened-34346-large.mp4"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onEnded={handleFinish}
                playsInline
                muted
                autoPlay
            />

            {/* Personalized Names Overlay */}
            {showNames && !videoEnded && (
                <div style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    animation: 'nameAppear 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                    width: '100%',
                    zIndex: 2
                }}>
                    <p className="serif" style={{ color: 'white', letterSpacing: '10px', fontSize: '1.2rem', marginBottom: '1.5rem', opacity: 0.9 }}>{theme.label}</p>
                    <h2 className="script" style={{
                        color: 'white',
                        fontSize: 'min(5.5rem, 12vw)',
                        textShadow: '0 10px 30px rgba(0,0,0,0.6)',
                        margin: '1rem 0'
                    }}>
                        {theme.names}
                    </h2>
                    <div style={{ height: '2px', width: '150px', background: 'white', margin: '2rem auto', opacity: 0.6 }}></div>
                </div>
            )}

            {/* Cinematic Local Date Hint */}
            {showNames && !videoEnded && (
                <div style={{
                    position: 'absolute',
                    bottom: '20%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: 0,
                    animation: 'fadeIn 2s 1s forwards',
                    zIndex: 2
                }}>
                    <p className="serif" style={{ color: 'white', letterSpacing: '4px', fontSize: '1.1rem', fontWeight: '300' }}>
                        {data.date ? new Date(data.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase() : ''}
                    </p>
                </div>
            )}

            {!videoEnded && (
                <div style={{ position: 'absolute', bottom: '8%', textAlign: 'center', zIndex: 10 }}>
                    <button
                        className="lux-btn"
                        onClick={handleFinish}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: 'white',
                            borderColor: 'white',
                            backdropFilter: 'blur(15px)',
                            fontSize: '0.8rem',
                            padding: '1rem 2.5rem',
                            letterSpacing: '4px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        ОТВОРИ ПОКАНА
                    </button>
                </div>
            )}

            <style>{`
        @keyframes nameAppear {
          0% { opacity: 0; transform: translate(-50%, -40%) scale(0.9); filter: blur(10px); }
          100% { opacity: 1; transform: translate(-50%, -50%) scale(1); filter: blur(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .lux-btn:hover {
            background: white !important;
            color: black !important;
            transform: translateY(-2px);
        }
      `}</style>
        </div>
    );
};

export default IntroVideo;
