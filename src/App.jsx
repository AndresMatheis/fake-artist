import React, { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { fetchRandomWord } from './words';
import './App.css'; // Leaving this but will clear the file content or minimal

function App() {
  const [gameState, setGameState] = useState('SETUP'); // 'SETUP', 'PLAYING'
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState('random');
  const [isSimple, setIsSimple] = useState(false);
  const [wordSource, setWordSource] = useState(null); // 'api' or 'fallback'

  const handleStartGame = async (count) => {
    setIsLoading(true);
    const result = await fetchRandomWord(category, isSimple); // Pass simple flag
    setIsLoading(false);

    setWordSource(result.source);

    const fakeArtistIndex = Math.floor(Math.random() * count);

    const newPlayers = Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      role: i === fakeArtistIndex ? 'FAKE' : 'ARTIST',
      word: result.word,
    }));

    setPlayers(newPlayers);
    setGameState('PLAYING');
  };

  const handleReset = () => {
    setGameState('SETUP');
    setPlayers([]);
  };

  return (
    <div className="App">
      {/* Simple Loading Overlay */}
      {isLoading && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 100
        }}>
          <div style={{ color: 'white', fontSize: '1.5rem' }}>Fetching Word...</div>
        </div>
      )}

      {gameState === 'SETUP' && (
        <SetupScreen
          onStart={handleStartGame}
          onCategoryChange={setCategory}
          onSimpleChange={setIsSimple}
        />
      )}
      {gameState === 'PLAYING' && (
        <GameScreen players={players} onReset={handleReset} wordSource={wordSource} />
      )}

      <footer style={{
        marginTop: '40px',
        padding: '20px',
        fontSize: '0.75rem',
        opacity: 0.6,
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p>Unofficial Helper for "Hidden Artist" style games.</p>
        <p>Not affiliated with Oink Games Inc. "A Fake Artist Goes to New York" is a trademark of Oink Games.</p>
      </footer>
    </div>
  );
}

export default App;
