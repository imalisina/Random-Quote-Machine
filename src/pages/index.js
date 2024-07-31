// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [quotes, setQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      setQuotes(data);
      if (data.length > 0) {
        setCurrentIndex(Math.floor(Math.random() * data.length));
        setBackground(generateRandomGradient());
      }
    } catch (error) {
      console.error('Error fetching the quotes:', error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleNewQuote = () => {
    if (quotes.length === 0) return;

    // Increment the index and wrap around if necessary
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    setBackground(generateRandomGradient());
  };

  const handleTweet = () => {
    if (quotes.length === 0) return;

    const quote = quotes[currentIndex];
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" — ${quote.author || 'Unknown'}`)}`;
    window.open(tweetUrl, '_blank');
  };

  const generateRandomGradient = () => {
    const colors = [
      ['#FF6F61', '#FFB86C'],
      ['#D3CCE3', '#E9E4F0'],
      ['#FF9A9E', '#FAD0C4'],
      ['#A2C2E2', '#9C90FF'],
      ['#FFC3A0', '#FF677D']
    ];

    const randomColors = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(to right, ${randomColors[0]}, ${randomColors[1]})`;
  };

  const setBackground = (gradient) => {
    document.body.style.transition = 'background 0.5s ease';
    document.body.style.background = gradient;
  };

  const currentQuote = quotes[currentIndex] || {};

  return (
    <div
      id="quote-box"
      className="d-flex flex-column justify-content-center align-items-center p-4 border rounded shadow-lg"
      style={{ height: '100vh' }}
    >
      <div id="text" className="mb-3">
        <blockquote className="blockquote text-center">
          <p className="mb-0">{currentQuote.text || 'Loading...'}</p>
        </blockquote>
      </div>
      <div id="author" className="mb-3">
        <footer className="blockquote-footer">{currentQuote.author || 'Unknown'}</footer>
      </div>
      <div>
        <button id="new-quote" className="btn btn-primary mr-2" onClick={handleNewQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          className="btn btn-secondary"
          href="#!"
          onClick={handleTweet}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}
