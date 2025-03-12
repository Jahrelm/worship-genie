
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Array of inspiring Bible quotes
const quotes = [
  {
    text: "Your word is a lamp for my feet, a light on my path.",
    reference: "Psalm 119:105",
    bookId: "psalms",
    chapter: 119
  },
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    bookId: "john",
    chapter: 3
  },
  {
    text: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    bookId: "philippians",
    chapter: 4
  },
  {
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    bookId: "joshua",
    chapter: 1
  },
  {
    text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    bookId: "proverbs",
    chapter: 3
  }
];

const QuoteSection = () => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    // Change quote every 10 seconds with a fade effect
    const timer = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
        setFadeIn(true);
      }, 500);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-amber-700 to-amber-800 text-white">
      <div className="container mx-auto text-center max-w-3xl">
        <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-3xl italic font-light mb-6">"{currentQuote.text}"</p>
          <p className="text-xl">— {currentQuote.reference}</p>
          
          <Link to={`/bible/${currentQuote.bookId}/${currentQuote.chapter}`} className="inline-flex items-center mt-8 text-amber-200 hover:text-white transition-colors">
            <span className="mr-2">Read in context</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
