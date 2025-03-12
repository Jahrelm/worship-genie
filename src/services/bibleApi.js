
import { toast } from "@/components/ui/use-toast";

// Using the ESV API as an example, but you can replace with any Bible API
const ESV_API_KEY = "your-api-key"; // You'll need to get an API key
const ESV_API_URL = "https://api.esv.org/v3/passage/text/";

export const fetchBiblePassage = async (bookId, chapter) => {
  try {
    // For demo purposes, if no API key, use the local data
    if (ESV_API_KEY === "your-api-key") {
      console.log("Using local Bible data as no API key is provided");
      // Import the local data dynamically
      const { getChapter } = await import('../lib/bibleData.jsx');
      return getChapter(bookId, chapter);
    }
    
    // Format the passage query (e.g., "John 3")
    const passage = `${bookId} ${chapter}`;
    
    const response = await fetch(`${ESV_API_URL}?q=${encodeURIComponent(passage)}`, {
      headers: {
        'Authorization': `Token ${ESV_API_KEY}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch passage: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Transform the API response to match our expected format
    // This will need to be adjusted based on the actual API response structure
    return {
      number: parseInt(chapter),
      verses: data.passages[0].split('\n')
        .filter(line => line.trim() !== '')
        .map((line, index) => {
          const verseNumber = index + 1;
          return {
            number: verseNumber,
            text: line.replace(/^\[\d+\]\s/, '') // Remove verse numbers if they exist
          };
        })
    };
  } catch (error) {
    console.error("Error fetching Bible passage:", error);
    toast({
      title: "Error",
      description: "Failed to load Bible passage. Using offline data instead.",
      variant: "destructive"
    });
    
    // Fallback to local data
    const { getChapter } = await import('../lib/bibleData.jsx');
    return getChapter(bookId, chapter);
  }
};

export const fetchAllBooks = async () => {
  try {
    // For demo purposes, if no API key, use the local data
    if (ESV_API_KEY === "your-api-key") {
      console.log("Using local Bible data as no API key is provided");
      const { getAllBooks } = await import('../lib/bibleData.jsx');
      return getAllBooks();
    }
    
    // This would be replaced with an actual API call to get all books
    // Since ESV API doesn't have a direct endpoint for this, we'd need to use another API
    // or maintain this list ourselves
    
    // Fallback to local data for now
    const { getAllBooks } = await import('../lib/bibleData.jsx');
    return getAllBooks();
  } catch (error) {
    console.error("Error fetching Bible books:", error);
    toast({
      title: "Error",
      description: "Failed to load Bible books. Using offline data instead.",
      variant: "destructive"
    });
    
    // Fallback to local data
    const { getAllBooks } = await import('../lib/bibleData.jsx');
    return getAllBooks();
  }
};

export const fetchBook = async (bookId) => {
  try {
    // For demo purposes, if no API key, use the local data
    if (ESV_API_KEY === "your-api-key") {
      console.log("Using local Bible data as no API key is provided");
      const { getBook } = await import('../lib/bibleData.jsx');
      return getBook(bookId);
    }
    
    // This would be replaced with an actual API call to get book details
    // Since ESV API doesn't have a direct endpoint for this, we'd need to use another API
    // or maintain this information ourselves
    
    // Fallback to local data for now
    const { getBook } = await import('../lib/bibleData.jsx');
    return getBook(bookId);
  } catch (error) {
    console.error("Error fetching Bible book:", error);
    toast({
      title: "Error",
      description: "Failed to load Bible book. Using offline data instead.",
      variant: "destructive"
    });
    
    // Fallback to local data
    const { getBook } = await import('../lib/bibleData.jsx');
    return getBook(bookId);
  }
};

export const getPopularPassages = async () => {
  try {
    // For simplicity, we'll use the local data for popular passages
    const { getPopularPassages } = await import('../lib/bibleData.jsx');
    return getPopularPassages();
  } catch (error) {
    console.error("Error fetching popular passages:", error);
    return [];
  }
};
