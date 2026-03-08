import React from 'react';

const Dashboard = ({ data, guests = [], onLogout }) => {
    // Mock guest data if none provided
    const mockGuests = [
        { name: "Иван Петров", count: 2, status: "Ще присъства", names: "Иван и Мария" },
        { name: "Елена Колева", count: 1, status: "Ще присъства", names: "" },
        { name: "Георги Иванов", count: 3, status: "Няма да мога", names: "Георги, Соня и малката Ани" },
        { name: "Стефан Димитров", count: 2, status: "Ще присъства", names: "Стефан и Боряна" }
    ];

    const displayGuests = guests.length > 0 ? guests : mockGuests;
    const attendingCount = displayGuests.filter(g => g.status === "Ще присъства").reduce((acc, curr) => acc + curr.count, 0);

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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                    <div>
                        <h1 className="serif" style={{ fontSize: '2rem', color: '#222', letterSpacing: '2px' }}>
                            ВАШЕТО ТАБЛО: {data.groom.toUpperCase()} & {data.bride.toUpperCase()}
                        </h1>
                        <p className="serif" style={{ color: '#666', fontSize: '0.9rem' }}>Проследяване на гости и потвърждения.</p>
                    </div>
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

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
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
                        <p className="serif" style={{ fontSize: '2.5rem', marginTop: '0.5rem', color: '#c0392b' }}>{displayGuests.length - displayGuests.filter(g => g.status === "Ще присъства").length}</p>
                    </div>
                </div>

                <div style={{
                    background: 'white',
                    padding: '2rem',
                    border: '1px solid rgba(197, 160, 89, 0.1)'
                }}>
                    <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: '2rem', borderBottom: '1px solid #f9f9f9', paddingBottom: '1rem' }}>СПИСЪК С ОТГОВОРИ</h2>
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
                                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{guest.name}</td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: guest.status === "Ще присъства" ? '#27ae60' : '#c0392b', fontWeight: 'bold' }}>{guest.status}</td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.9rem' }}>{guest.count}</td>
                                    <td style={{ padding: '1.5rem', fontSize: '0.8rem', color: '#888' }}>{guest.names || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
