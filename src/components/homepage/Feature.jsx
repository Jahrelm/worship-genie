
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

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

export default Feature;
