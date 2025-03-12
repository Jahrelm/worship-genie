
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book, Music, ChevronRight } from 'lucide-react';
import { getPopularPassages } from '../../services/bibleApi';
import { getAllSongs } from '../../lib/songData';

const QuickAccessSection = () => {
  const [popularPassages, setPopularPassages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const recentSongs = getAllSongs().slice(0, 3);
  
  useEffect(() => {
    const loadPopularPassages = async () => {
      try {
        setIsLoading(true);
        const passages = await getPopularPassages();
        setPopularPassages(passages);
      } catch (error) {
        console.error("Error loading popular passages:", error);
        setPopularPassages([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPopularPassages();
  }, []);

  return (
    <section className="py-16 px-6 bg-amber-50/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Popular Bible Passages */}
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800">
              <Book className="w-5 h-5 mr-2 text-amber-600" />
              Popular Passages
            </h2>
            <div className="border border-amber-200 rounded-lg overflow-hidden bg-white/80">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-pulse text-amber-600">Loading passages...</div>
                </div>
              ) : (
                <ul className="divide-y divide-amber-100">
                  {popularPassages.map(passage => (
                    <li key={passage.id}>
                      <Link 
                        to={`/bible/${passage.bookId}/${passage.chapter}`}
                        className="block px-6 py-4 hover:bg-amber-50 transition-standard"
                      >
                        <span className="font-medium">{passage.reference}</span>
                        <ChevronRight className="w-4 h-4 float-right mt-1 text-amber-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Recent Songs */}
          <div className="glass-card p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800">
              <Music className="w-5 h-5 mr-2 text-amber-600" />
              Worship Songs
            </h2>
            <div className="border border-amber-200 rounded-lg overflow-hidden bg-white/80">
              <ul className="divide-y divide-amber-100">
                {recentSongs.map(song => (
                  <li key={song.id}>
                    <Link 
                      to={`/songs/${song.id}`}
                      className="block px-6 py-4 hover:bg-amber-50 transition-standard"
                    >
                      <span className="font-medium">{song.title}</span>
                      <span className="text-sm text-muted-foreground ml-2">({song.key})</span>
                      <ChevronRight className="w-4 h-4 float-right mt-1 text-amber-600" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickAccessSection;
