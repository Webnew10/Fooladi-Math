import React from 'react';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', dark = false }) => {
  return (
    <section id={id} className={`py-16 md:py-24 ${dark ? 'bg-slate-900 text-white' : 'bg-transparent text-slate-900'} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-extrabold mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-lg max-w-2xl mx-auto ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              {subtitle}
            </p>
          )}
          <div className={`w-24 h-1.5 rounded-full mx-auto mt-6 ${dark ? 'bg-accent-500' : 'bg-primary-600'}`}></div>
        </div>
        {children}
      </div>
    </section>
  );
};