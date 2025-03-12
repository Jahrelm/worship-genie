
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';

const Navigation = ({ prevLink, nextLink, title }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-border mb-6">
      <button
        onClick={() => prevLink ? navigate(prevLink) : navigate('/')}
        className="flex items-center px-4 py-2 rounded-md hover:bg-muted transition-standard"
        aria-label={prevLink ? "Previous page" : "Go home"}
      >
        {prevLink ? (
          <>
            <ChevronLeft className="w-4 h-4 mr-2" />
            <span>Previous</span>
          </>
        ) : (
          <>
            <Home className="w-4 h-4 mr-2" />
            <span>Home</span>
          </>
        )}
      </button>
      
      {title && (
        <h2 className="text-lg font-medium text-center hidden md:block">{title}</h2>
      )}
      
      {nextLink && (
        <button
          onClick={() => navigate(nextLink)}
          className="flex items-center px-4 py-2 rounded-md hover:bg-muted transition-standard"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4 ml-2" />
        </button>
      )}
      
      {!nextLink && <div className="w-24" />}
    </div>
  );
};

export default Navigation;
