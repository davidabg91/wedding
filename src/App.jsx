import React, { useState, useEffect } from 'react';
import CreatorForm from './CreatorForm';
import IntroVideo from './IntroVideo';
import InvitationCard from './InvitationCard';
import ExtrasPage from './ExtrasPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';

function App() {
  const [view, setView] = useState('create'); // 'create', 'video', 'card', 'extras', 'register', 'dashboard'
  const [eventData, setEventData] = useState(null);
  const [user, setUser] = useState(null);

  // Ensure we scroll to top on every view transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleCreate = (data) => {
    setEventData(data);
    setView('video');
  };

  const handleVideoFinish = () => {
    setView('card');
  };

  const goToExtras = () => {
    setView('extras');
  };

  const goToEdit = () => {
    setView('create');
  };

  const goToRegister = () => {
    setView('register');
  };

  const handleRegisterSuccess = () => {
    setUser({ email: 'user@example.com' });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('create');
  };

  return (
    <div className="App">
      {view === 'create' && (
        <CreatorForm
          onSubmit={handleCreate}
          onLogin={() => setView('register')}
          onRegister={() => setView('register')}
        />
      )}

      {view === 'video' && (
        <IntroVideo data={eventData} onFinish={handleVideoFinish} />
      )}

      {view === 'card' && eventData && (
        <>
          <InvitationCard data={eventData} />
          <div style={{
            textAlign: 'center',
            padding: '6rem 0',
            background: 'var(--paper-bg)',
            position: 'relative',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}>
            <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
              <button
                onClick={goToExtras}
                className="lux-btn"
                style={{ minWidth: '220px' }}
              >
                СЪЗДАЙ ПОКАНАТА
              </button>
              <button
                onClick={goToEdit}
                className="lux-btn"
                style={{ minWidth: '220px', background: 'none', color: 'var(--accent-gold-dark)', border: '1px solid var(--accent-gold)' }}
              >
                РЕДАКТИРАЙ ПОКАНАТА
              </button>
            </div>
          </div>
        </>
      )}

      {view === 'extras' && eventData && (
        <ExtrasPage
          data={eventData}
          onBack={() => setView('card')}
          onRegister={goToRegister}
        />
      )}

      {view === 'register' && (
        <RegisterPage
          onBack={() => setView('extras')}
          onRegister={handleRegisterSuccess}
        />
      )}

      {view === 'dashboard' && eventData && (
        <Dashboard
          data={eventData}
          onLogout={handleLogout}
        />
      )}

      {/* Subtle Texture Overlay for entire App */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'var(--paper-texture)',
        opacity: 0.1,
        pointerEvents: 'none',
        zIndex: 5000
      }}></div>
    </div>
  );
}

export default App;
