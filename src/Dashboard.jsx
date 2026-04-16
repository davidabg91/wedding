import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { getEvent } from './firebaseService';

const Dashboard = ({ data: initialData, eventId, onLogout }) => {
    const [guests, setGuests] = useState([]);
    const [eventData, setEventData] = useState(initialData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let unsubscribe;
        const fetchData = async () => {
            if (!eventId) {
                setLoading(false);
                return;
            }

            try {
                // 1. Fetch event data if missing
                if (!eventData) {
                    const fetchedEvent = await getEvent(eventId);
                    setEventData(fetchedEvent);
                }

                // 2. Setup real-time listener for RSVPs
                const rsvpRef = collection(db, "events", eventId, "rsvps");
                const q = query(rsvpRef, orderBy("timestamp", "desc"));

                unsubscribe = onSnapshot(q, (snapshot) => {
                    const guestList = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setGuests(guestList);
                    setLoading(false);
                }, (error) => {
                    console.error("Error fetching RSVPs:", error);
                    setLoading(false);
                });

            } catch (error) {
                console.error("Error in Dashboard fetchData:", error);
                setLoading(false);
            }
        };

        fetchData();
        return () => unsubscribe && unsubscribe();
    }, [eventId, eventData]);

    const displayGuests = (guests.length === 0 && !eventId) ? [
        { name: "Демо Гост", count: 2, status: "Ще присъствам", names: "Демо", timestamp: new Date().toISOString() }
    ] : guests;
    
    const attendingCount = displayGuests.filter(g => g.status === "Ще присъствам").reduce((acc, curr) => acc + (Number(curr.count) || 1), 0);
    const declinedCount = displayGuests.filter(g => g.status === "Няма да мога").length;

    if (loading) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper-bg)' }}><div className="serif">Зареждане на данни...</div></div>;
    
    if (!eventData) return <div style={{ padding: '5rem', textAlign: 'center' }}><h2 className="serif">Нямате активни покани</h2><button onClick={() => window.location.href='/'} className="lux-btn">СЪЗДАЙ ПЪРВАТА СИ ПОКАНА</button></div>;

    const namesLabel = (eventData.groom && eventData.bride) ? `${eventData.groom.toUpperCase()} & ${eventData.bride.toUpperCase()}` : (eventData.childName ? eventData.childName.toUpperCase() : "ВАШАТА ПОКАНА");

    return (
        <div style={{
            background: 'var(--paper-bg)',
            minHeight: '100vh',
            padding: '4rem 2rem',
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

            <div className="lux-container" style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 11 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h1 className="serif" style={{ fontSize: 'clamp(1.3rem, 5vw, 2rem)', color: '#222', letterSpacing: '1px', lineHeight: '1.2', marginBottom: '0.5rem' }}>
                            ВАШЕТО ТАБЛО: {namesLabel}
                        </h1>
                        <p className="serif" style={{ color: '#666', fontSize: '0.85rem' }}>Проследяване на гости и потвърждения в реално време.</p>
                        {eventId && <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold-dark)', marginTop: '0.5rem' }}>ID: {eventId}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {eventId && (
                            <button
                                onClick={() => {
                                    const url = window.location.origin + '/invitation/' + eventId;
                                    navigator.clipboard.writeText(url);
                                    alert('Линкът е копиран!');
                                }}
                                className="lux-btn"
                                style={{ fontSize: '0.7rem', padding: '10px 20px', background: 'var(--accent-gold)' }}
                            >
                                КОПИРАЙ ЛИНК
                            </button>
                        )}
                        <button
                            onClick={onLogout}
                            style={{
                                background: 'none',
                                border: '1px solid var(--accent-gold)',
                                color: 'var(--accent-gold-dark)',
                                padding: '10px 20px',
                                fontSize: '0.7rem',
                                letterSpacing: '2px',
                                cursor: 'pointer'
                            }}
                        >
                            ИЗХОД
                        </button>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    <div style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                        <p className="serif" style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px' }}>ОБЩО ОТГОВОРИ</p>
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{displayGuests.length}</p>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                        <p className="serif" style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px', color: '#2ecc71' }}>ЩЕ ПРИСЪСТВАТ</p>
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: '#27ae60' }}>{attendingCount}</p>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                        <p className="serif" style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px', color: '#e74c3c' }}>ОТКАЗАЛИ</p>
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: '#c0392b' }}>{declinedCount}</p>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    padding: 'clamp(1rem, 4vw, 2rem)',
                    border: '1px solid rgba(197, 160, 89, 0.1)',
                    overflowX: 'auto'
                }}>
                    <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: '2rem', borderBottom: '1px solid #f9f9f9', paddingBottom: '1rem' }}>СПИСЪК С ОТГОВОРИ</h2>
                    <div style={{ minWidth: '600px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ background: '#fcfcfc' }}>
                                    <th style={{ padding: '1.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>ИМЕ</th>
                                    <th style={{ padding: '1.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>СТАТУС</th>
                                    <th style={{ padding: '1.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>ГОСТИ</th>
                                    <th style={{ padding: '1.5rem', fontSize: '0.8rem', letterSpacing: '1px' }}>ОПИСАНИЕ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayGuests.map((guest, idx) => (
                                    <tr key={guest.id || idx} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{guest.name}</td>
                                        <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: guest.status === "Ще присъствам" ? '#27ae60' : '#c0392b', fontWeight: 'bold' }}>{guest.status}</td>
                                        <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{guest.count}</td>
                                        <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#888' }}>{guest.names || "—"}</td>
                                    </tr>
                                ))}
                                {displayGuests.length === 0 && (
                                    <tr>
                                        <td colSpan="4" style={{ padding: '3rem', textAlign: 'center', color: '#aaa' }}>Все още няма получени отговори.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
