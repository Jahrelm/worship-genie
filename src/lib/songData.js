
export const songsData = [
  {
    id: 'amazing-grace',
    title: 'Amazing Grace',
    author: 'John Newton',
    key: 'G',
    tempo: 'Moderate',
    timeSignature: '3/4',
    sections: [
      {
        type: 'verse',
        content: 'Amazing grace! How sweet the sound\nThat saved a wretch like me!\nI once was lost, but now am found;\nWas blind, but now I see.'
      },
      {
        type: 'verse',
        content: "'Twas grace that taught my heart to fear,\nAnd grace my fears relieved;\nHow precious did that grace appear\nThe hour I first believed."
      },
      {
        type: 'verse',
        content: "Through many dangers, toils and snares,\nI have already come;\n'Tis grace hath brought me safe thus far,\nAnd grace will lead me home."
      },
      {
        type: 'verse',
        content: "When we've been there ten thousand years,\nBright shining as the sun,\nWe've no less days to sing God's praise\nThan when we'd first begun."
      }
    ]
  },
  {
    id: 'how-great-is-our-god',
    title: 'How Great Is Our God',
    author: 'Chris Tomlin, Jesse Reeves, Ed Cash',
    key: 'C',
    tempo: 'Moderate',
    timeSignature: '4/4',
    sections: [
      {
        type: 'verse',
        content: 'The splendor of the King\nClothed in majesty\nLet all the earth rejoice\nAll the earth rejoice'
      },
      {
        type: 'verse',
        content: 'He wraps Himself in light\nAnd darkness tries to hide\nAnd trembles at His voice\nAnd trembles at His voice'
      },
      {
        type: 'chorus',
        content: 'How great is our God\nSing with me\nHow great is our God\nAnd all will see how great\nHow great is our God'
      },
      {
        type: 'verse',
        content: 'And age to age He stands\nAnd time is in His hands\nBeginning and the End\nBeginning and the End'
      },
      {
        type: 'verse',
        content: 'The Godhead three in one\nFather Spirit Son\nThe Lion and the Lamb\nThe Lion and the Lamb'
      },
      {
        type: 'chorus',
        content: 'How great is our God\nSing with me\nHow great is our God\nAnd all will see how great\nHow great is our God'
      },
      {
        type: 'bridge',
        content: 'Name above all names\nWorthy of all praise\nMy heart will sing\nHow great is our God'
      }
    ]
  },
  {
    id: '10000-reasons',
    title: '10,000 Reasons (Bless the Lord)',
    author: 'Matt Redman, Jonas Myrin',
    key: 'G',
    tempo: 'Moderate',
    timeSignature: '4/4',
    sections: [
      {
        type: 'chorus',
        content: 'Bless the Lord oh my soul\nOh my soul\nWorship His Holy name\nSing like never before\nOh my soul\nI\'ll worship Your Holy name'
      },
      {
        type: 'verse',
        content: 'The sun comes up\nIt\'s a new day dawning\nIt\'s time to sing Your song again\nWhatever may pass\nAnd whatever lies before me\nLet me be singing\nWhen the evening comes'
      },
      {
        type: 'chorus',
        content: 'Bless the Lord oh my soul\nOh my soul\nWorship His Holy name\nSing like never before\nOh my soul\nI\'ll worship Your Holy name'
      },
      {
        type: 'verse',
        content: 'You\'re rich in love\nAnd You\'re slow to anger\nYour name is great\nAnd Your heart is kind\nFor all Your goodness\nI will keep on singing\nTen thousand reasons\nFor my heart to find'
      },
      {
        type: 'verse',
        content: 'And on that day\nWhen my strength is failing\nThe end draws near\nAnd my time has come\nStill my soul will\nSing Your praise unending\nTen thousand years\nAnd then forevermore'
      }
    ]
  }
];

export const getAllSongs = () => {
  return songsData.map(song => ({
    id: song.id,
    title: song.title,
    author: song.author,
    key: song.key
  }));
};

export const getSong = (songId) => {
  return songsData.find(song => song.id === songId);
};

export const formatSongForPresentation = (song, slideSize = 4) => {
  if (!song) return [];
  
  const slides = [];
  let currentSlide = [];
  let lineCount = 0;
  
  song.sections.forEach(section => {
    // Add section title slide for choruses, bridges, etc.
    if (section.type !== 'verse') {
      if (currentSlide.length > 0) {
        slides.push([...currentSlide]);
        currentSlide = [];
      }
      slides.push([{
        type: 'section-title',
        content: section.type.charAt(0).toUpperCase() + section.type.slice(1)
      }]);
    }
    
    const lines = section.content.split('\n');
    
    lines.forEach(line => {
      currentSlide.push({ type: section.type, content: line });
      lineCount++;
      
      if (lineCount >= slideSize) {
        slides.push([...currentSlide]);
        currentSlide = [];
        lineCount = 0;
      }
    });
    
    // Create a new slide after each section
    if (currentSlide.length > 0) {
      slides.push([...currentSlide]);
      currentSlide = [];
      lineCount = 0;
    }
  });
  
  return slides;
};
