
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Music, ChevronRight, Search, Coffee, Heart, Users, Calendar } from 'lucide-react';
import { getPopularPassages } from '../lib/bibleData.jsx';
import { getAllSongs } from '../lib/songData';

const Feature = ({ icon, title, description, link, linkText }) => (
  <div className="p-6 bg-white/80 rounded-lg shadow-sm border border-border hover:shadow-md transition-standard">
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
    <div className="min-h-screen bg-[url('https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=2000&q=80')] bg-fixed bg-cover bg-center">
      {/* Hero Section with overlay */}
      <div className="bg-black/30 backdrop-blur-sm">
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto text-center">
            <span className="inline-block px-3 py-1 bg-accent/80 text-accent-foreground rounded-full text-sm font-medium mb-6 animate-fade-in">
              Biblical Wisdom & Worship
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight animate-fade-in text-white">
              Worship <span className="text-amber-300">Genie</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8 animate-fade-in">
              A beautiful, scripture-focused application with powerful song formatting and presentation tools.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in">
              <Link 
                to="/bible/john/3" 
                className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-standard flex items-center"
              >
                <Book className="w-5 h-5 mr-2" />
                Open Bible
              </Link>
              <Link 
                to="/songs" 
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-md hover:bg-white/30 transition-standard flex items-center"
              >
                <Music className="w-5 h-5 mr-2" />
                Format Songs
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* Daily Verse Banner */}
      <div className="bg-amber-600/90 text-white py-6 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-lg font-medium mb-2">Today's Verse</h3>
          <p className="text-xl italic">"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</p>
          <p className="mt-2 font-medium">— John 3:16</p>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white/90">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">How We Can Help You</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Worship Genie provides tools to help you connect with scripture and prepare for worship services</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Feature 
              icon={<Book className="w-6 h-6 text-amber-600" />}
              title="Bible Reader"
              description="Read the Bible with a clean, modern interface. Navigate easily between books and chapters."
              link="/bible/genesis/1"
              linkText="Start reading"
            />
            <Feature 
              icon={<Music className="w-6 h-6 text-amber-600" />}
              title="Song Formatter"
              description="Format worship songs for presentation with customizable slides and layouts."
              link="/songs"
              linkText="Format songs"
            />
            <Feature 
              icon={<Search className="w-6 h-6 text-amber-600" />}
              title="Scripture Search"
              description="Find specific verses, keywords, or themes throughout the Bible to deepen your understanding."
              link="/bible"
              linkText="Search scripture"
            />
            <Feature 
              icon={<Heart className="w-6 h-6 text-amber-600" />}
              title="Devotionals"
              description="Daily devotionals to guide your spiritual journey and encourage consistent Bible reading."
              link="/bible"
              linkText="Coming soon"
            />
            <Feature 
              icon={<Users className="w-6 h-6 text-amber-600" />}
              title="Group Worship"
              description="Tools for leading worship in small groups or church services with synchronized displays."
              link="/songs"
              linkText="Coming soon"
            />
            <Feature 
              icon={<Calendar className="w-6 h-6 text-amber-600" />}
              title="Service Planning"
              description="Plan your church services with integrated scripture readings and worship songs."
              link="/songs"
              linkText="Coming soon"
            />
          </div>
        </div>
      </section>

      {/* Quick Access Section with glass effect */}
      <section className="py-16 px-6 bg-amber-50/80 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Popular Bible Passages */}
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800">
                <Book className="w-5 h-5 mr-2 text-amber-600" />
                Popular Passages
              </h2>
              <div className="border border-amber-200 rounded-lg overflow-hidden bg-white/80">
                <ul className="divide-y divide-amber-100">
                  {popularPassages.map(passage => (
                    <li key={passage.id}>
                      <Link 
                        to={`/bible/${passage.bookId}/${passage.chapter}`}
                        className="block px-6 py-4 hover:bg-amber-50 transition-standard"
                      >
                        <span className="font-medium">{passage.reference}</span>
                        <ChevronRight className="w-4 h-4 float-right mt-1 text-amber-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recent Songs */}
            <div className="glass-card p-6 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 flex items-center text-amber-800">
                <Music className="w-5 h-5 mr-2 text-amber-600" />
                Worship Songs
              </h2>
              <div className="border border-amber-200 rounded-lg overflow-hidden bg-white/80">
                <ul className="divide-y divide-amber-100">
                  {recentSongs.map(song => (
                    <li key={song.id}>
                      <Link 
                        to={`/songs/${song.id}`}
                        className="block px-6 py-4 hover:bg-amber-50 transition-standard"
                      >
                        <span className="font-medium">{song.title}</span>
                        <span className="text-sm text-muted-foreground ml-2">({song.key})</span>
                        <ChevronRight className="w-4 h-4 float-right mt-1 text-amber-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 px-6 bg-amber-700 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <p className="text-3xl italic font-light mb-6">"Your word is a lamp for my feet, a light on my path."</p>
          <p className="text-xl">— Psalm 119:105</p>
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
                <Heart className="w-5 h-5" />
                <span className="text-sm">and Faith</span>
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
