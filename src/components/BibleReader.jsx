
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Book, List, Bookmark, Copy, Share, Settings, Layout } from 'lucide-react';
import { fetchAllBooks, fetchBook, fetchBiblePassage } from '../services/bibleApi';
import Navigation from './Navigation';
import { useToast } from "@/components/ui/use-toast";
import VerseLookup from './VerseLookup';
import BibleVersionSelector from './BibleVersionSelector';

const BibleReader = () => {
  const { bookId, chapter } = useParams();
  const [books, setBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [isBookDropdownOpen, setIsBookDropdownOpen] = useState(false);
  const [isChapterDropdownOpen, setIsChapterDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentVersion, setCurrentVersion] = useState('esv');
  const [selectedVerses, setSelectedVerses] = useState([]);
  const [presentationMode, setPresentationMode] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const verseRefs = useRef({});
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const loadBibleData = async () => {
      try {
        setIsLoading(true);
        
        const allBooks = await fetchAllBooks();
        setBooks(allBooks);
        
        if (bookId) {
          const book = await fetchBook(bookId);
          setCurrentBook(book);
          
          if (chapter && book) {
            const chapterData = await fetchBiblePassage(bookId, chapter);
            setCurrentChapter(chapterData);
          }
        }
      } catch (error) {
        console.error("Error loading Bible data:", error);
        toast({
          title: "Error",
          description: "There was a problem loading the Bible content.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBibleData();
  }, [bookId, chapter, toast, currentVersion]);
  
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

  const handleVerseSelect = (verseNumber) => {
    if (selectedVerses.includes(verseNumber)) {
      setSelectedVerses(selectedVerses.filter(v => v !== verseNumber));
    } else {
      setSelectedVerses([...selectedVerses, verseNumber].sort((a, b) => a - b));
    }
  };

  const handleCopyVerses = () => {
    if (!currentChapter || selectedVerses.length === 0) return;
    
    const versesToCopy = selectedVerses
      .map(verseNumber => {
        const verse = currentChapter.verses.find(v => v.number === verseNumber);
        return verse ? `${verseNumber}. ${verse.text}` : '';
      })
      .filter(text => text)
      .join('\n\n');
    
    const reference = `${currentBook.name} ${currentChapter.number}:${selectedVerses.join(',')}`;
    const textToCopy = `${reference}\n\n${versesToCopy}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
      toast({
        title: "Copied to Clipboard",
        description: `${reference} has been copied.`,
      });
    });
  };

  const handleEnterPresentationMode = () => {
    setPresentationMode(true);
  };

  const handleExitPresentationMode = () => {
    setPresentationMode(false);
  };

  const handleVersionChange = (versionId) => {
    setCurrentVersion(versionId);
    toast({
      title: "Bible Version Changed",
      description: `Now reading in ${BIBLE_VERSIONS.find(v => v.id === versionId)?.name || versionId}.`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-16 h-screen flex items-center justify-center">
        <div className="text-center animate-pulse">
          <Book className="w-12 h-12 mx-auto mb-4 text-amber-600/70" />
          <h2 className="text-xl font-medium">Loading Bible content...</h2>
        </div>
      </div>
    );
  }
  
  if (!currentBook || !currentChapter) {
    return (
      <div className="container mx-auto px-6 pt-24 pb-16 h-screen flex items-center justify-center">
        <div className="text-center">
          <Book className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium">Select a book to start reading</h2>
          <p className="text-muted-foreground mt-2">Navigate to a specific passage in the Bible</p>
        </div>
      </div>
    );
  }

  if (presentationMode) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900 flex flex-col items-center justify-center">
        <button
          onClick={handleExitPresentationMode}
          className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="max-w-4xl w-full px-8">
          <h1 className="text-white text-4xl font-bold mb-6 text-center">
            {currentBook.name} {currentChapter.number}
            {selectedVerses.length > 0 && `:${selectedVerses.join(',')}`}
          </h1>
          
          <div className="text-white text-3xl leading-relaxed">
            {selectedVerses.length > 0 ? (
              selectedVerses.map(verseNumber => {
                const verse = currentChapter.verses.find(v => v.number === verseNumber);
                return verse ? (
                  <p key={verse.number} className="mb-6 animate-fade-in">
                    <span className="text-amber-400 mr-2">{verse.number}</span>
                    {verse.text}
                  </p>
                ) : null;
              })
            ) : (
              currentChapter.verses.map(verse => (
                <p key={verse.number} className="mb-6">
                  <span className="text-amber-400 mr-2">{verse.number}</span>
                  {verse.text}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-6 pt-24 pb-16">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col space-y-4 mb-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-4">
            <VerseLookup />
            <BibleVersionSelector 
              currentVersion={currentVersion} 
              onVersionChange={handleVersionChange} 
            />
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
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
                <div className="absolute z-10 mt-2 max-h-96 overflow-y-auto w-64 bg-white border border-border rounded-md shadow-lg animate-scale-in">
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
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <Navigation 
            prevLink={getPrevNavigation()} 
            nextLink={getNextNavigation()} 
            title={`${currentBook.name} ${currentChapter.number}`}
          />
          
          <div className="flex space-x-2">
            <button
              onClick={handleCopyVerses}
              disabled={selectedVerses.length === 0}
              className={`p-2 rounded-md ${
                selectedVerses.length > 0 
                  ? 'text-amber-600 hover:bg-amber-50' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
              title="Copy selected verses"
            >
              <Copy className="w-5 h-5" />
            </button>
            
            <button
              onClick={handleEnterPresentationMode}
              className="p-2 rounded-md text-amber-600 hover:bg-amber-50"
              title="Enter presentation mode"
            >
              <Layout className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-md text-amber-600 hover:bg-amber-50"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-8">
          <h1 className="text-3xl font-bold mb-6">{currentBook.name} {currentChapter.number}</h1>
          
          <div className="bible-text space-y-4">
            {currentChapter.verses.map((verse) => (
              <div 
                key={verse.number}
                ref={el => verseRefs.current[verse.number] = el}
                className={`verse-container ${
                  selectedVerses.includes(verse.number) 
                    ? 'bg-amber-100 -mx-2 px-2 py-1 rounded-md' 
                    : ''
                }`}
              >
                <button 
                  onClick={() => handleVerseSelect(verse.number)}
                  className="verse-number inline-flex items-center justify-center text-sm font-semibold mr-2 text-amber-600 hover:bg-amber-100 rounded-full w-6 h-6"
                >
                  {verse.number}
                </button>
                <span className="verse-text">{verse.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BibleReader;
