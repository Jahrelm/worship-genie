
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
