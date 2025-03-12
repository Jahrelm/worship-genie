
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Music, ChevronRight, Search, Coffee } from 'lucide-react';
import { getPopularPassages } from '../lib/bibleData';
import { getAllSongs } from '../lib/songData';

const Feature = ({ icon, title, description, link, linkText }) => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-border hover:shadow-md transition-standard">
    <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-medium mb-2">{title}</h3>
    <p className="text-muted-foreground mb-4">{description}</p>
    <Link 
      to={link} 
      className="inline-flex items-center text-primary font-medium hover:underline"
    >
      {linkText}
      <ChevronRight className="w-4 h-4 ml-1" />
    </Link>
  </div>
);

const Index = () => {
  const popularPassages = getPopularPassages();
  const recentSongs = getAllSongs().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <span className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-6 animate-fade-in">
            Modern Bible Application
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in">
            Worship <span className="text-primary">Genie</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in">
            A beautiful, modern Bible application with powerful song formatting and presentation tools.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
            <Link 
              to="/bible/john/3" 
              className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-standard flex items-center"
            >
              <Book className="w-5 h-5 mr-2" />
              Open Bible
            </Link>
            <Link 
              to="/songs" 
              className="px-6 py-3 border border-border rounded-md hover:bg-accent hover:text-accent-foreground transition-standard flex items-center"
            >
              <Music className="w-5 h-5 mr-2" />
              Format Songs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-accent/30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={<Book className="w-6 h-6 text-accent-foreground" />}
              title="Bible Reader"
              description="Read the Bible with a clean, modern interface. Navigate easily between books and chapters."
              link="/bible/genesis/1"
              linkText="Start reading"
            />
            <Feature 
              icon={<Music className="w-6 h-6 text-accent-foreground" />}
              title="Song Formatter"
              description="Format worship songs for presentation with customizable slides and layouts."
              link="/songs"
              linkText="Format songs"
            />
            <Feature 
              icon={<Search className="w-6 h-6 text-accent-foreground" />}
              title="Search Scripture"
              description="Coming soon! Search the Bible for specific verses, keywords, or themes."
              link="/coming-soon"
              linkText="Learn more"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Popular Bible Passages */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Book className="w-5 h-5 mr-2" />
                Popular Passages
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <ul className="divide-y divide-border">
                  {popularPassages.map(passage => (
                    <li key={passage.id}>
                      <Link 
                        to={`/bible/${passage.bookId}/${passage.chapter}`}
                        className="block px-6 py-4 hover:bg-accent transition-standard"
                      >
                        <span className="font-medium">{passage.reference}</span>
                        <ChevronRight className="w-4 h-4 float-right mt-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Songs */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Recent Songs
              </h2>
              <div className="border border-border rounded-lg overflow-hidden">
                <ul className="divide-y divide-border">
                  {recentSongs.map(song => (
                    <li key={song.id}>
                      <Link 
                        to={`/songs/${song.id}`}
                        className="block px-6 py-4 hover:bg-accent transition-standard"
                      >
                        <span className="font-medium">{song.title}</span>
                        <span className="text-sm text-muted-foreground ml-2">({song.key})</span>
                        <ChevronRight className="w-4 h-4 float-right mt-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold">Worship Genie</h2>
              <p className="text-primary-foreground/70 mt-2">A beautiful Bible application</p>
            </div>

            <div className="flex flex-col">
              <p className="text-primary-foreground/70 mb-2">Built with</p>
              <div className="flex space-x-2">
                <Coffee className="w-5 h-5" />
                <span className="text-sm">and Code</span>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Worship Genie. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
