import React from 'react';
import { PlayerCard } from './PlayerCard';

export function GameScreen({ players, onReset, wordSource }) {
    // local state to track which card is currently being viewed?
    // Actually, usually in Pass & Play, only one should be open at a time to prevent accidental peeking?
    // Or we let them handle it. Let's start with local state in card or parent?
    // The plan said "Tap to hide".
    // Let's manage revealed state here to enforce "only one open at a time" if we want, or just let them be independent.
    // Independent is easier for now, but "Pass & Play" usually implies safety.
    // Let's implement independent for simplicity, but maybe add a "Hide All" button? 
    // Actually, parent `App` or here should track it. The `App` keeps the `players` data, but `isRevealed` could be local unless we want to persist it.
    // Wait, `players` prop passed here probably has the static data (role, word). 
    // We need state for `revealed`.

    const [revealedId, setRevealedId] = React.useState(null);

    const handleToggle = (id) => {
        if (revealedId === id) {
            setRevealedId(null); // Hide if clicking same
        } else {
            setRevealedId(id); // Reveal this one, hiding others implicitly
        }
    };

    return (
        <div style={{ width: '100%', paddingBottom: '80px', position: 'relative' }}>
            {/* Source Indicator */}
            <div style={{
                marginBottom: '20px',
                fontSize: '0.8rem',
                color: wordSource === 'api' ? '#4ade80' : '#f87171',
                background: 'rgba(0,0,0,0.3)',
                display: 'inline-block',
                padding: '4px 12px',
                borderRadius: '20px',
                border: `1px solid ${wordSource === 'api' ? '#4ade80' : '#f87171'}`
            }}>
                {wordSource === 'api' ? '⚡ Fetched from API' : '⚠️ Offline/Fallback Word'}
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '15px',
                marginBottom: '30px'
            }}>
                {players.map((p) => (
                    <PlayerCard
                        key={p.id}
                        playerNumber={p.id}
                        role={p.role}
                        word={p.word}
                        isRevealed={revealedId === p.id}
                        onToggle={() => handleToggle(p.id)}
                    />
                ))}
            </div>

            <div style={{
                position: 'fixed',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 10
            }}>
                <button
                    onClick={onReset}
                    style={{
                        background: 'rgba(15, 23, 42, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '1rem',
                        padding: '12px 24px'
                    }}
                >
                    Reset Game
                </button>
            </div>
        </div>
    );
}
