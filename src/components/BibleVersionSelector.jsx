
import React, { useState } from 'react';
import { ChevronDown, Book } from 'lucide-react';

const BIBLE_VERSIONS = [
  { id: 'esv', name: 'English Standard Version (ESV)' },
  { id: 'kjv', name: 'King James Version (KJV)' },
  { id: 'niv', name: 'New International Version (NIV)' },
  { id: 'nlt', name: 'New Living Translation (NLT)' },
  { id: 'msg', name: 'The Message (MSG)' }
];

const BibleVersionSelector = ({ onVersionChange, currentVersion = 'esv' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState(
    BIBLE_VERSIONS.find(v => v.id === currentVersion) || BIBLE_VERSIONS[0]
  );

  const handleVersionSelect = (version) => {
    setSelectedVersion(version);
    setIsOpen(false);
    if (onVersionChange) {
      onVersionChange(version.id);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border border-amber-300 rounded-md bg-white/90 hover:bg-amber-50 transition-colors"
      >
        <Book className="mr-2 h-4 w-4 text-amber-600" />
        <span className="mr-2">{selectedVersion.name}</span>
        <ChevronDown className={`h-4 w-4 text-amber-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg">
          <ul className="py-1">
            {BIBLE_VERSIONS.map(version => (
              <li key={version.id}>
                <button
                  onClick={() => handleVersionSelect(version)}
                  className={`w-full text-left px-4 py-2 hover:bg-amber-50 ${
                    selectedVersion.id === version.id ? 'bg-amber-100 font-medium' : ''
                  }`}
                >
                  {version.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BibleVersionSelector;
