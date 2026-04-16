import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import CreatorForm from './CreatorForm';
import IntroVideo from './IntroVideo';
import InvitationCard from './InvitationCard';
import ExtrasPage from './ExtrasPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import { saveEvent, getEvent, logoutUser } from './firebaseService';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [eventData, setEventData] = useState(null);
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastCreatedEventId, setLastCreatedEventId] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Listen for Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Ensure we scroll to top on every route transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleCreate = (data) => {
    setEventData(data);
    navigate('/video');
  };

  const handleVideoFinish = () => {
    navigate('/card');
  };

  const handleAuthSuccess = async (authUser) => {
    setIsSaving(true);
    try {
      setUser(authUser);
      
      // If we have unsaved event data (from the creation flow), save it now
      if (eventData) {
        const eventId = await saveEvent(eventData, authUser.uid);
        setLastCreatedEventId(eventId);
        setEventData(null); // Clear after saving
        console.log("Event saved successfully with ID:", eventId);
      }
      
      navigate('/dashboard');
    } catch (error) {
      alert("Грешка при записване на поканата. Моля, проверете лога.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (authLoading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper-bg)' }}><div className="serif">Зареждане на профил...</div></div>;

  return (
    <div className="App">
      {/* ... (isSaving loading overlay) ... */}
      {isSaving && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 10000,
          background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexDirection: 'column', gap: '1rem'
        }}>
          <div className="serif" style={{ fontSize: '1.5rem', color: 'var(--accent-gold-dark)' }}>Запазваме Вашата покана...</div>
          <div style={{ width: '50px', height: '50px', border: '3px solid #eee', borderTopColor: 'var(--accent-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <Routes>
        <Route 
          path="/" 
          element={
            <CreatorForm
              onSubmit={handleCreate}
              onLogin={() => navigate('/register')}
              onRegister={() => navigate('/register')}
            />
          } 
        />

        <Route 
          path="/video" 
          element={<IntroVideo data={eventData} onFinish={handleVideoFinish} />} 
        />

        <Route 
          path="/card" 
          element={
            eventData ? (
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
                      onClick={() => navigate('/extras')}
                      className="lux-btn"
                      style={{ minWidth: '220px' }}
                    >
                      СЪЗДАЙ ПОКАНАТА
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="lux-btn"
                      style={{ minWidth: '220px', background: 'none', color: 'var(--accent-gold-dark)', border: '1px solid var(--accent-gold)' }}
                    >
                      РЕДАКТИРАЙ ПОКАНАТА
                    </button>
                  </div>
                </div>
              </>
            ) : <div style={{ padding: '5rem', textAlign: 'center' }}><button onClick={() => navigate('/')} className="lux-btn">СЪЗДАЙ ПОКАНА</button></div>
          } 
        />

        <Route 
          path="/extras" 
          element={
            eventData ? (
              <ExtrasPage
                data={eventData}
                onBack={() => navigate('/card')}
                onRegister={() => navigate('/register')}
              />
            ) : <div style={{ padding: '5rem', textAlign: 'center' }}><button onClick={() => navigate('/')} className="lux-btn">СЪЗДАЙ ПОКАНА</button></div>
          } 
        />

        <Route 
          path="/register" 
          element={
            <RegisterPage
              onBack={() => navigate('/extras')}
              onRegister={handleAuthSuccess}
            />
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            user ? (
              <Dashboard
                data={eventData}
                eventId={lastCreatedEventId}
                onLogout={handleLogout}
              />
            ) : <div style={{ padding: '5rem', textAlign: 'center' }}><h3 className="serif">Моля, влезте в профила си</h3><button onClick={() => navigate('/register')} className="lux-btn">ВХОД</button></div>
          } 
        />

        <Route 
          path="/invitation/:id" 
          element={<PublicInvitation />} 
        />
      </Routes>

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

function PublicInvitation() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const event = await getEvent(id);
        setData(event);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Зареждане на поканата...</div>;
  if (!data) return <div style={{ padding: '5rem', textAlign: 'center' }}>Поканата не е намерена.</div>;

  return <InvitationCard data={data} eventId={id} />;
}

export default App;
