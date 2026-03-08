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
        const video = videoRef.current;
        if (video) {
            // Trigger names reveal half-way through the video
            const timer = setTimeout(() => setShowNames(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

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
                    width: '100%'
                }}>
                    <p className="serif" style={{ color: 'white', letterSpacing: '10px', fontSize: '1.2rem', marginBottom: '1.5rem', opacity: 0.8 }}>ПОКАНА ЗА СВАТБА</p>
                    <h2 className="script" style={{
                        color: 'white',
                        fontSize: '5.5rem',
                        textShadow: '0 10px 30px rgba(0,0,0,0.6)',
                        margin: '1rem 0'
                    }}>
                        {data.groom} & {data.bride}
                    </h2>
                    <div style={{ height: '1px', width: '200px', background: 'white', margin: '2rem auto', opacity: 0.4 }}></div>
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
                    animation: 'fadeIn 2s 1s forwards'
                }}>
                    <p className="serif" style={{ color: 'white', letterSpacing: '4px', fontSize: '0.9rem' }}>
                        {new Date(data.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                </div>
            )}

            {!videoEnded && (
                <div style={{ position: 'absolute', bottom: '8%', textAlign: 'center' }}>
                    <button
                        className="lux-btn"
                        onClick={handleFinish}
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'white',
                            borderColor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(10px)',
                            fontSize: '0.7rem',
                            letterSpacing: '3px'
                        }}
                    >
                        ОТВОРИ МАГИЯТА
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
      `}</style>
        </div>
    );
};

export default IntroVideo;
