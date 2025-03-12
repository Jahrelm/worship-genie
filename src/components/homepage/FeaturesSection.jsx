
import React from 'react';
import { Book, Music, Search, Heart, Users, Calendar } from 'lucide-react';
import Feature from './Feature';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
