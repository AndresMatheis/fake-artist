import React from 'react';

export function SetupScreen({ onStart, onCategoryChange, onSimpleChange }) {
    const [count, setCount] = React.useState(5);

    return (
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
                <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Fake Artist</h1>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>Goes to New York</p>
            </div>

            <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Number of Players: <span style={{ color: 'var(--primary-glow)' }}>{count}</span>
                </label>
                <input
                    type="range"
                    min="3"
                    max="10"
                    value={count}
                    onChange={(e) => setCount(Number(e.target.value))}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.9rem' }}>
                    <span>3</span>
                    <span>10</span>
                </div>
            </div>

            <div style={{ textAlign: 'left' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold' }}>
                    Category:
                </label>
                <select
                    onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '12px',
                        border: '1px solid var(--glass-border)',
                        background: 'rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        fontSize: '1rem',
                        outline: 'none',
                        cursor: 'pointer'
                    }}
                >
                    <option style={{ color: 'black' }} value="random">Random</option>
                    <option style={{ color: 'black' }} value="animals">Animals</option>
                    <option style={{ color: 'black' }} value="transportation">Transportation</option>
                    <option style={{ color: 'black' }} value="music">Music</option>
                    <option style={{ color: 'black' }} value="science">Science</option>
                    <option style={{ color: 'black' }} value="food">Food</option>
                    <option style={{ color: 'black' }} value="places">Places</option>
                    <option style={{ color: 'black' }} value="sports">Sports</option>
                    <option style={{ color: 'black' }} value="technology">Technology</option>
                </select>
            </div>

            <div style={{ textAlign: 'left', display: 'flex', alignItems: 'center' }}>
                <input
                    type="checkbox"
                    id="simpleWords"
                    onChange={(e) => onSimpleChange && onSimpleChange(e.target.checked)}
                    style={{
                        width: '20px',
                        height: '20px',
                        accentColor: 'var(--primary-color)',
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                />
                <label htmlFor="simpleWords" style={{ cursor: 'pointer', fontSize: '1rem' }}>
                    Use Simple Words Only
                </label>
            </div>

            <button onClick={() => onStart(count)}>
                Start Game
            </button>
        </div>
    );
}
