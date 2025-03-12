
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Music, ChevronLeft, ChevronRight, Presentation, Edit, Eye } from 'lucide-react';
import { getAllSongs, getSong, formatSongForPresentation } from '../lib/songData';
import Navigation from './Navigation';

const SongFormatter = () => {
  const { songId } = useParams();
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [presentationMode, setPresentationMode] = useState(false);
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [slideSize, setSlideSize] = useState(4);
  const navigate = useNavigate();

  useEffect(() => {
    const allSongs = getAllSongs();
    setSongs(allSongs);
    
    if (songId) {
      const song = getSong(songId);
      setCurrentSong(song);
      
      if (song) {
        const formattedSlides = formatSongForPresentation(song, slideSize);
        setSlides(formattedSlides);
        setCurrentSlideIndex(0);
      }
    }
  }, [songId, slideSize]);

  const handleSongSelect = (selectedSongId) => {
    navigate(`/songs/${selectedSongId}`);
  };

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const togglePresentationMode = () => {
    setPresentationMode(!presentationMode);
    setCurrentSlideIndex(0);
  };

  const handleKeyDown = (e) => {
    if (presentationMode) {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        setPresentationMode(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlideIndex, slides, presentationMode]);

  if (!currentSong) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-16 h-screen flex items-center justify-center">
        <div className="text-center animate-pulse-gentle">
          <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium">Select a song to start formatting</h2>
          <p className="text-muted-foreground mt-2">Browse through songs or create a new one</p>
          
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {songs.map(song => (
              <button
                key={song.id}
                onClick={() => handleSongSelect(song.id)}
                className="p-6 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-standard"
              >
                <h3 className="font-medium">{song.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{song.author}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (presentationMode) {
    return (
      <div 
        className="fixed inset-0 z-50 bg-background flex items-center justify-center"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        <button
          onClick={togglePresentationMode}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-standard text-foreground"
          aria-label="Exit presentation mode"
        >
          <X className="w-6 h-6" />
        </button>
        
        <button
          onClick={prevSlide}
          disabled={currentSlideIndex === 0}
          className={`absolute left-4 p-4 rounded-full ${
            currentSlideIndex === 0 
              ? 'opacity-30 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20 cursor-pointer'
          } transition-standard`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          disabled={currentSlideIndex >= slides.length - 1}
          className={`absolute right-4 p-4 rounded-full ${
            currentSlideIndex >= slides.length - 1 
              ? 'opacity-30 cursor-not-allowed' 
              : 'bg-white/10 hover:bg-white/20 cursor-pointer'
          } transition-standard`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlideIndex(index)}
              className={`w-2 h-2 rounded-full transition-standard ${
                index === currentSlideIndex ? 'bg-primary w-4' : 'bg-muted-foreground'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <div className="max-w-3xl mx-auto px-6 text-center">
          {slides[currentSlideIndex]?.map((line, idx) => {
            if (line.type === 'section-title') {
              return (
                <h2 key={idx} className="text-3xl font-medium mb-6 text-primary animate-fade-in">
                  {line.content}
                </h2>
              );
            }
            
            return (
              <p 
                key={idx}
                className={`text-3xl mb-4 animate-fade-in ${
                  line.type === 'chorus' ? 'font-medium text-primary-foreground' : 'text-foreground'
                }`}
              >
                {line.content}
              </p>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <Navigation 
          prevLink="/songs" 
          title="Song Formatter"
        />
        
        <div className="mt-8">
          <h1 className="song-title">{currentSong.title}</h1>
          <p className="song-author">By {currentSong.author}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="px-3 py-1 bg-accent rounded-full text-xs font-medium">
              Key: {currentSong.key}
            </div>
            <div className="px-3 py-1 bg-accent rounded-full text-xs font-medium">
              Tempo: {currentSong.tempo}
            </div>
            <div className="px-3 py-1 bg-accent rounded-full text-xs font-medium">
              Time: {currentSong.timeSignature}
            </div>
            
            <div className="ml-auto flex items-center space-x-2">
              <label htmlFor="lines-per-slide" className="text-sm font-medium">
                Lines per slide:
              </label>
              <select
                id="lines-per-slide"
                value={slideSize}
                onChange={(e) => setSlideSize(parseInt(e.target.value))}
                className="px-2 py-1 border border-border rounded-md text-sm"
              >
                {[2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-8 flex justify-between">
            <button
              onClick={togglePresentationMode}
              className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-standard"
            >
              <Presentation className="w-4 h-4 mr-2" />
              Present
            </button>
            
            <div className="flex space-x-2">
              <button
                onClick={() => navigate(`/songs/edit/${songId}`)}
                className="flex items-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-standard"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
            </div>
          </div>
          
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-muted">
              <h2 className="font-medium flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                Preview ({slides.length} slides)
              </h2>
            </div>
            
            <div className="divide-y divide-border">
              {slides.map((slide, slideIdx) => (
                <div key={slideIdx} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">
                      Slide {slideIdx + 1} of {slides.length}
                    </span>
                  </div>
                  
                  {slide.map((line, lineIdx) => {
                    if (line.type === 'section-title') {
                      return (
                        <h3 key={lineIdx} className="text-xl font-medium mb-4 text-primary">
                          {line.content}
                        </h3>
                      );
                    }
                    
                    return (
                      <p 
                        key={lineIdx}
                        className={`text-lg mb-2 ${
                          line.type === 'chorus' ? 'pl-4 border-l-2 border-accent italic' : ''
                        }`}
                      >
                        {line.content}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongFormatter;
