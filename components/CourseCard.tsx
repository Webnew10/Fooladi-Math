import React from 'react';
import { Course } from '../types';
import { Star, Video, Gamepad2, Users, ArrowLeft } from 'lucide-react';
import { Button } from './Button';

interface CourseCardProps {
  course: Course;
  onBuy: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onBuy }) => {
  const getIcon = () => {
    switch(course.type) {
      case 'game': return <Gamepad2 className="w-5 h-5" />;
      case 'live': return <Users className="w-5 h-5" />;
      default: return <Video className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-primary-900/10 overflow-hidden transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-slate-100 flex flex-col h-full group relative">
      <div className="relative h-52 overflow-hidden">
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
        />
        
        <div className="absolute top-3 right-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-primary-700 shadow-sm flex items-center gap-1.5">
          {getIcon()}
          <span>{course.type === 'game' ? 'بازی' : course.type === 'live' ? 'آنلاین' : 'ویدیو'}</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col relative z-20">
        <div className="flex justify-between items-start mb-3">
          <span className="text-[11px] font-bold text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg tracking-wide">
            {course.level}
          </span>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-slate-700 text-xs font-bold pt-0.5">{course.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-black text-slate-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {course.title}
        </h3>
        
        <p className="text-slate-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-50">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 mb-0.5">قیمت دوره:</span>
            <span className="text-lg font-black text-slate-800">
              {course.price.toLocaleString('fa-IR')} <span className="text-xs text-slate-500 font-medium">تومان</span>
            </span>
          </div>
          <Button 
            size="sm" 
            onClick={() => onBuy(course)} 
            className="group-hover:bg-primary-600 group-hover:shadow-primary-500/50 transition-all duration-300"
          >
            خرید دوره
            <ArrowLeft className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};