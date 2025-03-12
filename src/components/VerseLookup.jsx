
import React, { useState, useEffect } from 'react';
import { Search, Book, X } from 'lucide-react';
import { fetchAllBooks } from '../services/bibleApi';
import { useNavigate } from 'react-router-dom';

const VerseLookup = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await fetchAllBooks();
      setBooks(allBooks);
    };
    
    loadBooks();
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = books.filter(book => 
        book.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBooks(filtered);
      setIsDropdownOpen(true);
    } else {
      setFilteredBooks([]);
      setIsDropdownOpen(false);
    }
  }, [query, books]);

  const handleBookSelect = (bookId, chapter = 1) => {
    navigate(`/bible/${bookId}/${chapter}`);
    setQuery('');
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple regex to match common Bible reference formats
    // Example: "John 3:16" or "John 3" or "John"
    const referenceRegex = /^(\w+)(?:\s+(\d+))?(?::(\d+))?$/;
    const match = query.match(referenceRegex);
    
    if (match) {
      const [, bookName, chapter, verse] = match;
      const book = books.find(b => b.name.toLowerCase().startsWith(bookName.toLowerCase()));
      
      if (book) {
        handleBookSelect(book.id, chapter || 1);
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bible..."
            className="pl-10 pr-10 py-2 rounded-full border border-amber-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none w-full bg-white/90"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </form>
      
      {isDropdownOpen && filteredBooks.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredBooks.map(book => (
              <li key={book.id}>
                <button
                  onClick={() => handleBookSelect(book.id)}
                  className="flex items-center w-full text-left px-4 py-2 hover:bg-amber-50"
                >
                  <Book className="mr-2 h-4 w-4 text-amber-600" />
                  <span>{book.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VerseLookup;
