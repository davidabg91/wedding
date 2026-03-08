import React, { useState } from 'react';

const CreatorForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    groom: '',
    bride: '',
    date: '',
    time: '',
    location: '',
    locationLink: '',
    message: '',
    photos: [],
    venuePhoto: null,
    showProgram: true,
    program: [
      { time: '13:00', activity: 'Подготовка на булката и младоженеца' },
      { time: '15:00', activity: 'Взимана на кумове и крадене на булката' },
      { time: '16:00', activity: 'Църковен ритуал' },
      { time: '17:00', activity: 'Сватбена фотосесия' },
      { time: '17:30', activity: 'Граждански ритуал' },
      { time: '19:00', activity: 'Вечеря и празнуване' }
    ]
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newPhotos] }));
  };

  const handleVenuePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, venuePhoto: URL.createObjectURL(file) }));
    }
  };

  const handleProgramChange = (index, field, value) => {
    const newProgram = [...formData.program];
    newProgram[index][field] = value;
    setFormData(prev => ({ ...prev, program: newProgram }));
  };

  const addProgramItem = () => {
    setFormData(prev => ({
      ...prev,
      program: [...prev.program, { time: '', activity: '' }]
    }));
  };

  const removeProgramItem = (index) => {
    setFormData(prev => ({
      ...prev,
      program: prev.program.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="lux-container" style={{ maxWidth: '850px', marginTop: '3rem' }}>
      <div className="paper-surface" style={{ padding: '5rem 4rem', border: '1px solid rgba(197, 160, 89, 0.2)', borderRadius: '2px' }}>
        <h2 className="serif" style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--accent-gold-dark)', fontSize: '2.8rem', letterSpacing: '4px' }}>ДИЗАЙНЕР НА ПОКАНАТА</h2>

        <form onSubmit={handleSubmit}>
          {/* Main Info */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>МЛАДОЖЕНЕЦ</label>
              <input type="text" name="groom" className="lux-input" placeholder="Име..." value={formData.groom} onChange={handleChange} required />
            </div>
            <div>
              <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>БУЛКА</label>
              <input type="text" name="bride" className="lux-input" placeholder="Име..." value={formData.bride} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '1rem' }}>
            <div>
              <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ДАТА</label>
              <input type="date" name="date" className="lux-input" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ЧАС</label>
              <input type="time" name="time" className="lux-input" value={formData.time} onChange={handleChange} required />
            </div>
          </div>

          <div style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            <label className="serif" style={{ color: 'var(--accent-gold-dark)', fontSize: '0.9rem', letterSpacing: '2px' }}>ЛОКАЦИЯ (РЕСТОРАНТ)</label>
            <input type="text" name="location" className="lux-input" placeholder="напр. Резиденция..." value={formData.location} onChange={handleChange} required />
          </div>

          {/* Program Toggle & Editor */}
          <div style={{ margin: '2rem 0', padding: '2rem', border: '1px solid rgba(197, 160, 89, 0.2)', background: 'rgba(255,255,255,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: formData.showProgram ? '2rem' : '0' }}>
              <input
                type="checkbox"
                name="showProgram"
                id="showProgram"
                checked={formData.showProgram}
                onChange={handleChange}
                style={{ width: '20px', height: '20px', cursor: 'pointer', accentColor: 'var(--accent-gold)' }}
              />
              <label htmlFor="showProgram" className="serif" style={{ fontSize: '1.2rem', color: 'var(--accent-gold-dark)', cursor: 'pointer', fontWeight: 'bold' }}>
                Включи официална програма за деня
              </label>
            </div>

            {formData.showProgram && (
              <div style={{ paddingLeft: '2.5rem' }}>
                {formData.program.map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '15px', marginBottom: '1.5rem', alignItems: 'center' }}>
                    <input
                      type="time"
                      value={item.time}
                      onChange={(e) => handleProgramChange(index, 'time', e.target.value)}
                      className="lux-input"
                      style={{ width: '130px', margin: 0 }}
                    />
                    <input
                      type="text"
                      value={item.activity}
                      onChange={(e) => handleProgramChange(index, 'activity', e.target.value)}
                      placeholder="Дейност..."
                      className="lux-input"
                      style={{ flex: 1, margin: 0 }}
                    />
                    <button
                      type="button"
                      onClick={() => removeProgramItem(index)}
                      style={{ background: 'none', border: 'none', color: '#ff4d4d', cursor: 'pointer', fontSize: '1.2rem' }}
                    >✕</button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProgramItem}
                  className="lux-btn"
                  style={{ fontSize: '0.8rem', padding: '0.5rem 1.5rem', marginTop: '1rem' }}
                >+ Добави час</button>
              </div>
            )}
          </div>

          {/* Photo Management */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
            <div style={{ border: '1px dashed var(--accent-gold)', padding: '2rem', textAlign: 'center' }}>
              <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} id="photo-upload" />
              <p className="serif" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--accent-gold-dark)' }}>Снимки на двойката</p>
              <label htmlFor="photo-upload" className="lux-btn" style={{ cursor: 'pointer', fontSize: '0.7rem' }}>Добави снимки</label>

              {/* Photo Preview Added Back - FIX for "not working" */}
              {formData.photos.length > 0 && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  {formData.photos.map((url, i) => (
                    <div key={i} style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--accent-gold)' }}>
                      <img src={url} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ border: '1px dashed var(--accent-gold)', padding: '2rem', textAlign: 'center' }}>
              <input type="file" accept="image/*" onChange={handleVenuePhotoUpload} style={{ display: 'none' }} id="venue-upload" />
              <p className="serif" style={{ fontSize: '0.8rem', marginBottom: '1rem', color: 'var(--accent-gold-dark)' }}>Снимка на ресторанта</p>
              <label htmlFor="venue-upload" className="lux-btn" style={{ cursor: 'pointer', fontSize: '0.7rem' }}>Качи снимка</label>
              {formData.venuePhoto && (
                <div style={{ marginTop: '15px' }}>
                  <img src={formData.venuePhoto} alt="venue preview" style={{ width: '60px', height: '40px', objectFit: 'cover', border: '1px solid var(--accent-gold)' }} />
                  <p style={{ fontSize: '0.6rem', color: 'green', marginTop: '5px' }}>Качена ✓</p>
                </div>
              )}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="lux-btn" style={{ minWidth: '300px' }}>Виж готовата покана</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatorForm;
