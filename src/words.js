
// Fallback words in case API fails
const FALLBACK_WORDS = [
    "Apple", "Bicycle", "Clock", "Dragon", "Elephant", "Fire", "Guitar", "House", "Island", "Jellyfish",
    "Kite", "Lemon", "Mountain", "Notebook", "Ocean", "Piano", "Queen", "Rainbow", "Snake", "Train"
];

const getRandomFallback = () => {
    return FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];
};

export const fetchRandomWord = async (topic = null, simple = false) => {
    try {
        // Query for common nouns
        // 'ml' (means like) is robust for finding related words

        const letters = "abcdefghijklmnopqrstuvwxyz";
        const randomLetter = letters[Math.floor(Math.random() * letters.length)];

        // md=pf requests Part-of-speech (p) and Frequency (f)
        // Frequency is a number (occurrences per million)
        let url = `https://api.datamuse.com/words?md=pf&max=50`;

        if (topic && topic !== 'random') {
            url += `&ml=${topic}`;
        } else {
            url += `&sp=${randomLetter}*`;
        }

        console.log("Fetching URL:", url); // Debugging
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("API Response sample:", data.slice(0, 3)); // Debugging

        // Filter for nouns (n) and remove obscure/short words if needed
        // If simple is true, filter by frequency tag 'f:...'
        // The tags look like ["n", "f:0.56"]

        const filtered = data.filter(item => {
            const isNoun = item.tags && item.tags.includes('n');
            const isLongEnough = item.word.length > 3;
            if (!isNoun || !isLongEnough) return false;

            if (simple) {
                // Find frequency tag
                const freqTag = item.tags.find(t => t.startsWith('f:'));
                if (!freqTag) return false;
                const freq = parseFloat(freqTag.split(':')[1]);
                // Threshold: > 5 occurrences per million is usually a common word
                return freq > 5;
            }
            return true;
        });

        if (filtered.length === 0) {
            console.log("No nouns found in data (after filtering)");
            return { word: getRandomFallback(), source: 'fallback' };
        }

        const randomNoun = filtered[Math.floor(Math.random() * filtered.length)];
        return { word: randomNoun.word, source: 'api' };

    } catch (error) {
        console.error("Failed to fetch word:", error);
        console.log("Using Fallback word");
        return { word: getRandomFallback(), source: 'fallback' };
    }
};
