
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Book } from 'lucide-react';
import { getAllBooks, getBook, getChapter } from '../lib/bibleData.jsx';
import Navigation from './Navigation';

const BibleReader = () => {
  const { bookId, chapter } = useParams();
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const allBooks = getAllBooks();
    setBooks(allBooks);
    
    if (bookId) {
      const book = getBook(bookId);
      setCurrentBook(book);
      
      if (chapter && book) {
        const chapterData = getChapter(bookId, chapter);
        setCurrentChapter(chapterData);
      }
    }
  }, [bookId, chapter]);
  
  const handleBookSelect = (selectedBookId) => {
    setIsBookDropdownOpen(false);
    navigate(`/bible/${selectedBookId}/1`);
  };
  
  const handleChapterSelect = (chapterNum) => {
    setIsChapterDropdownOpen(false);
    navigate(`/bible/${bookId}/${chapterNum}`);
  };
  
  const getNextNavigation = () => {
    if (!currentBook || !currentChapter) return null;
    
    const chapterNum = currentChapter.number;
    
    if (chapterNum < currentBook.chapters.length) {
      return `/bible/${bookId}/${chapterNum + 1}`;
    }
    
    const currentBookIndex = books.findIndex(b => b.id === bookId);
    
    if (currentBookIndex < books.length - 1) {
      return `/bible/${books[currentBookIndex + 1].id}/1`;
    }
    
    return null;
  };
  
  const getPrevNavigation = () => {
    if (!currentBook || !currentChapter) return null;
    
    const chapterNum = currentChapter.number;
    
    if (chapterNum > 1) {
      return `/bible/${bookId}/${chapterNum - 1}`;
    }
    
    const currentBookIndex = books.findIndex(b => b.id === bookId);
    
    if (currentBookIndex > 0) {
      const prevBook = books[currentBookIndex - 1];
      return `/bible/${prevBook.id}/${prevBook.chapterCount}`;
    }
    
    return null;
  };
  
  if (!currentBook || !currentChapter) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-16 h-screen flex items-center justify-center">
        <div className="text-center animate-pulse-gentle">
          <Book className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium">Select a book to start reading</h2>
          <p className="text-muted-foreground mt-2">Navigate to a specific passage in the Bible</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 space-y-4 md:space-y-0">
          <div className="relative">
            <button
              onClick={() => setIsBookDropdownOpen(!isBookDropdownOpen)}
              className="flex items-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-standard"
            >
              <span className="font-medium">{currentBook.name}</span>
              {isBookDropdownOpen ? (
                <ChevronUp className="ml-2 w-4 h-4" />
              ) : (
                <ChevronDown className="ml-2 w-4 h-4" />
              )}
            </button>
            
            {isBookDropdownOpen && (
              <div className="absolute z-10 mt-2 max-h-96 overflow-y-auto w-64 bg-white border border-border rounded-md shadow-lg animate-scale-in">
                <ul className="py-1">
                  {books.map(book => (
                    <li key={book.id}>
                      <button
                        onClick={() => handleBookSelect(book.id)}
                        className={`w-full text-left px-4 py-2 hover:bg-muted transition-standard ${
                          book.id === bookId ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {book.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setIsChapterDropdownOpen(!isChapterDropdownOpen)}
              className="flex items-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-standard"
            >
              <span className="font-medium">Chapter {currentChapter.number}</span>
              {isChapterDropdownOpen ? (
                <ChevronUp className="ml-2 w-4 h-4" />
              ) : (
                <ChevronDown className="ml-2 w-4 h-4" />
              )}
            </button>
            
            {isChapterDropdownOpen && (
              <div className="absolute z-10 mt-2 max-h-96 overflow-y-auto w-32 bg-white border border-border rounded-md shadow-lg animate-scale-in">
                <ul className="grid grid-cols-4 gap-1 p-2">
                  {Array.from({ length: currentBook.chapters.length }, (_, i) => i + 1).map(num => (
                    <li key={num}>
                      <button
                        onClick={() => handleChapterSelect(num)}
                        className={`w-full text-center px-2 py-1 rounded-md hover:bg-muted transition-standard ${
                          num === currentChapter.number ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {num}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        <Navigation 
          prevLink={getPrevNavigation()} 
          nextLink={getNextNavigation()} 
          title={`${currentBook.name} ${currentChapter.number}`}
        />
        
        <div className="mt-8">
          <h1 className="chapter-number">{currentChapter.number}</h1>
          
          <div className="bible-paragraph">
            {currentChapter.verses.map((verse, index) => (
              <span key={verse.number}>
                <span className="verse-number">{verse.number}</span>
                {verse.text}
                {index < currentChapter.verses.length - 1 ? ' ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleReader;
