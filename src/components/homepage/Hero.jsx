
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Music } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-black/30 backdrop-blur-sm">
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-accent/80 text-accent-foreground rounded-full text-sm font-medium mb-6 animate-fade-in">
            Biblical Wisdom & Worship
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in text-white">
            Worship <span className="text-amber-300">Genie</span>
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in">
            A beautiful, scripture-focused application with powerful song formatting and presentation tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link 
              to="/bible/john/3" 
              className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-standard flex items-center"
            >
              <Book className="w-5 h-5 mr-2" />
              Open Bible
            </Link>
            <Link 
              to="/songs" 
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-md hover:bg-white/30 transition-standard flex items-center"
            >
              <Music className="w-5 h-5 mr-2" />
              Format Songs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
