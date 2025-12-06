import React from 'react';

export function PlayerCard({ playerNumber, role, word, isRevealed, onToggle }) {
    // role is 'ARTIST' or 'FAKE'
    // word is the secret word

    const content = isRevealed
        ? (role === 'FAKE' ? "YOU ARE THE FAKE ARTIST" : word)
        : `Player ${playerNumber}`;

    const cardStyle = {
        background: isRevealed
            ? (role === 'FAKE' ? 'linear-gradient(135deg, #ef4444, #b91c1c)' : 'linear-gradient(135deg, #10b981, #059669)')
            : 'var(--glass-bg)',
        color: '#fff',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--card-radius)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        cursor: 'pointer',
        aspectRatio: '1/1',
        userSelect: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        backdropFilter: 'blur(var(--glass-blur))',
        padding: '1rem',
        boxShadow: isRevealed ? '0 10px 25px rgba(0,0,0,0.5)' : 'none',
        transform: isRevealed ? 'scale(1.02)' : 'scale(1)'
    };

    const textStyle = {
        fontSize: isRevealed ? (role === 'FAKE' ? '1.5rem' : '1.8rem') : '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        wordBreak: 'break-word'
    };

    return (
        <div style={cardStyle} onClick={onToggle}>
            <div style={textStyle}>
                {content}
            </div>
            {isRevealed && (
                <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.8 }}>
                    Tap to hide
                </div>
            )}
            {!isRevealed && (
                <div style={{ marginTop: '10px', fontSize: '0.8rem', opacity: 0.5 }}>
                    Tap to reveal
                </div>
            )}
        </div>
    );
}
