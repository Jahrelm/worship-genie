
import React, { useState, useEffect } from 'react';
import { ArrowRight, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

// Daily verses data with book IDs for navigation
const dailyVerses = [
  {
    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
    reference: "John 3:16",
    bookId: "john",
    chapter: 3
  },
  {
    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    bookId: "romans",
    chapter: 8
  },
  {
    text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God, who loved me and gave himself for me.",
    reference: "Galatians 2:20",
    bookId: "galatians",
    chapter: 2
  },
  {
    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
    reference: "Philippians 4:6",
    bookId: "philippians",
    chapter: 4
  },
  {
    text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    bookId: "jeremiah",
    chapter: 29
  }
];

const DailyVerse = () => {
  const [verse, setVerse] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    // Choose a verse based on the day of year (so it changes daily)
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    const verseIndex = dayOfYear % dailyVerses.length;
    setVerse(dailyVerses[verseIndex]);
  }, []);

  const handleShareVerse = () => {
    if (!verse) return;
    
    const shareText = `"${verse.text}" — ${verse.reference}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Daily Bible Verse',
        text: shareText,
      }).catch(err => {
        console.error('Error sharing:', err);
        copyToClipboard();
      });
    } else {
      copyToClipboard();
    }
    
    function copyToClipboard() {
      navigator.clipboard.writeText(shareText).then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Verse copied to clipboard for sharing",
        });
      });
    }
  };

  if (!verse) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-600/90 to-amber-700/90 text-white py-8 px-4">
      <div className="container mx-auto text-center max-w-2xl">
        <div className="absolute right-4 top-4 flex space-x-2">
          <button 
            onClick={handleShareVerse}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Share verse"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button 
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Save verse"
          >
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
        
        <h3 className="text-lg font-medium mb-2">Today's Verse</h3>
        <p className="text-xl italic mb-4">"{verse.text}"</p>
        <p className="mt-2 font-medium">— {verse.reference}</p>
        
        <Link 
          to={`/bible/${verse.bookId}/${verse.chapter}`}
          className="inline-flex items-center mt-4 text-amber-200 hover:text-white transition-colors"
        >
          <span className="mr-2">Read in context</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default DailyVerse;
