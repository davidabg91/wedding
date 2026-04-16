import React, { useState, useEffect } from 'react';
import { getAllEvents } from './firebaseService';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalInvitations: 0, totalUsers: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const allEvents = await getAllEvents();
                setEvents(allEvents);
                
                // Calculate unique users
                const uniqueUsers = new Set(allEvents.map(e => e.userId)).size;
                setStats({
                    totalInvitations: allEvents.length,
                    totalUsers: uniqueUsers
                });
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching admin data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--paper-bg)' }}>
            <div className="serif">Зареждане на Админ Панел...</div>
        </div>
    );

    return (
        <div style={{ background: 'var(--paper-bg)', minHeight: '100vh', padding: '4rem 2rem' }}>
            <div className="lux-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <h1 className="serif" style={{ fontSize: '3rem', color: 'var(--accent-gold-dark)', marginBottom: '1rem' }}>АДМИН ПАНЕЛ</h1>
                <p className="serif" style={{ color: '#666', marginBottom: '4rem' }}>Преглед на цялата активност в PokaniPro</p>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                        <p className="serif" style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px' }}>ОБЩО ПОКАНИ</p>
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{stats.totalInvitations}</p>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.1)' }}>
                        <p className="serif" style={{ fontSize: '0.8rem', opacity: 0.6, letterSpacing: '2px' }}>УНИКАЛНИ ПОТРЕБИТЕЛИ</p>
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{stats.totalUsers}</p>
                    </div>
                </div>

                {/* Invitations Table */}
                <div style={{ background: 'white', padding: '2rem', border: '1px solid rgba(197, 160, 89, 0.1)', overflowX: 'auto' }}>
                    <h2 className="serif" style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>ВСИЧКИ ПОКАНИ</h2>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f9f9f9', background: '#fcfcfc' }}>
                                <th style={{ padding: '1.5rem', fontSize: '0.8rem' }}>ТИП</th>
                                <th style={{ padding: '1.5rem', fontSize: '0.8rem' }}>ИМЕНА / ЗАГЛАВИЕ</th>
                                <th style={{ padding: '1.5rem', fontSize: '0.8rem' }}>ДАТА СЪБИТИЕ</th>
                                <th style={{ padding: '1.5rem', fontSize: '0.8rem' }}>СЪЗДАДЕНА НА</th>
                                <th style={{ padding: '1.5rem', fontSize: '0.8rem' }}>ДЕЙСТВИЯ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event) => (
                                <tr key={event.id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontSize: '0.9rem', textTransform: 'capitalize' }}>
                                        {event.eventType === 'wedding' ? '💍 Сватба' : 
                                         event.eventType === 'christening' ? '🕊️ Кръщене' : 
                                         event.eventType === 'birthday' ? '🎂 РД' : '🎊 Юбилей'}
                                    </td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.9rem', fontWeight: 'bold' }}>
                                        {event.eventType === 'wedding' ? `${event.groom} & ${event.bride}` : 
                                         event.childName || event.birthdayPerson || event.jubileePerson || '—'}
                                    </td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{event.date || '—'}</td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#999' }}>
                                        {event.createdAt ? new Date(event.createdAt).toLocaleDateString('bg-BG') : '—'}
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button 
                                                onClick={() => window.open(`/wedding/invitation/${event.id}`, '_blank')}
                                                style={{ padding: '5px 10px', fontSize: '0.7rem', cursor: 'pointer', background: 'none', border: '1px solid #ccc' }}
                                            >
                                                ПРЕГЛЕД
                                            </button>
                                            <button 
                                                onClick={() => navigate(`/dashboard`, { state: { adminEventId: event.id } })}
                                                style={{ padding: '5px 10px', fontSize: '0.7rem', cursor: 'pointer', background: 'var(--accent-gold)', color: 'white', border: 'none' }}
                                            >
                                                ТАБЛО (RSVP)
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminPanel;
