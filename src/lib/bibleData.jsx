
// Simple Bible data structure for demo purposes
export const bibleData = {
  books: [
    {
      id: 'genesis',
      name: 'Genesis',
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: 'In the beginning God created the heavens and the earth.' },
            { number: 2, text: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.' },
            { number: 3, text: 'And God said, "Let there be light," and there was light.' },
            { number: 4, text: 'God saw that the light was good, and he separated the light from the darkness.' },
            { number: 5, text: 'God called the light "day," and the darkness he called "night." And there was evening, and there was morning—the first day.' },
            // Add more verses as needed
          ]
        },
        {
          number: 2,
          verses: [
            { number: 1, text: 'Thus the heavens and the earth were completed in all their vast array.' },
            { number: 2, text: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.' },
            { number: 3, text: 'Then God blessed the seventh day and made it holy, because on it he rested from all the work of creating that he had done.' },
            // Add more verses as needed
          ]
        }
      ]
    },
    {
      id: 'psalms',
      name: 'Psalms',
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: 'Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,' },
            { number: 2, text: 'but whose delight is in the law of the LORD, and who meditates on his law day and night.' },
            { number: 3, text: 'That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.' },
            // Add more verses as needed
          ]
        },
        {
          number: 23,
          verses: [
            { number: 1, text: 'The LORD is my shepherd, I lack nothing.' },
            { number: 2, text: 'He makes me lie down in green pastures, he leads me beside quiet waters,' },
            { number: 3, text: 'he refreshes my soul. He guides me along the right paths for his name\'s sake.' },
            { number: 4, text: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.' },
            // Add more verses as needed
          ]
        }
      ]
    },
    {
      id: 'john',
      name: 'John',
      chapters: [
        {
          number: 1,
          verses: [
            { number: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
            { number: 2, text: 'He was with God in the beginning.' },
            { number: 3, text: 'Through him all things were made; without him nothing was made that has been made.' },
            { number: 4, text: 'In him was life, and that life was the light of all mankind.' },
            // Add more verses as needed
          ]
        },
        {
          number: 3,
          verses: [
            { number: 16, text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.' },
            { number: 17, text: 'For God did not send his Son into the world to condemn the world, but to save the world through him.' },
            // Add more verses as needed
          ]
        }
      ]
    }
  ]
};

export const getAllBooks = () => {
  return bibleData.books.map(book => ({
    id: book.id,
    name: book.name,
    chapterCount: book.chapters.length
  }));
};

export const getBook = (bookId) => {
  return bibleData.books.find(book => book.id === bookId);
};

export const getChapter = (bookId, chapterNumber) => {
  const book = getBook(bookId);
  if (!book) return null;
  
  return book.chapters.find(chapter => chapter.number === parseInt(chapterNumber));
};

export const getPopularPassages = () => {
  return [
    { id: 'john-3-16', reference: 'John 3:16', bookId: 'john', chapter: 3, verse: 16 },
    { id: 'psalm-23-1', reference: 'Psalm 23:1', bookId: 'psalms', chapter: 23, verse: 1 },
    { id: 'genesis-1-1', reference: 'Genesis 1:1', bookId: 'genesis', chapter: 1, verse: 1 },
  ];
};
