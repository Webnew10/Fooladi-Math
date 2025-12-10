import React, { useState } from 'react';
import { Menu, X, Calculator, MonitorPlay, Users, Phone, Facebook, Twitter, Instagram, ChevronRight, CheckCircle2, PlayCircle, PenTool, Gamepad2, MessageCircle, HelpCircle, ChevronDown, ChevronUp, Video, CreditCard, Copy, Percent, Star, AlertTriangle, Send } from 'lucide-react';
import { Button } from './components/Button';
import { Section } from './components/Section';
import { CourseCard } from './components/CourseCard';
import { GeminiChat } from './components/GeminiChat';
import { Modal } from './components/Modal';
import { COURSES, REVIEWS, FAQS } from './constants';
import { Course } from './types';

const StarIcon: React.FC<{ filled: boolean }> = ({ filled }) => (
  <Star className={`w-4 h-4 ${filled ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} />
);

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  // Modal States
  const [paymentStep, setPaymentStep] = useState<'input' | 'payment'>('input');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isHazratMasoumehStudent, setIsHazratMasoumehStudent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const resetModalState = () => {
    setPaymentStep('input');
    setPhoneNumber('');
    setErrorMessage('');
  };

  const handleBuyClick = (course: Course) => {
    setSelectedCourse(course);
    setIsHazratMasoumehStudent(false); // Reset for standard buy flow
    setPaymentStep('input');
    setPhoneNumber('');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleGeneralRegister = () => {
    setSelectedCourse(null);
    setIsHazratMasoumehStudent(false);
    resetModalState();
    setIsModalOpen(true);
  };

  const handleDiscountSelect = (courseId: number) => {
    const course = COURSES.find(c => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
      setIsHazratMasoumehStudent(true);
      setIsDiscountModalOpen(false); // Close discount panel
      setPaymentStep('input');
      setPhoneNumber('');
      setErrorMessage('');
      setIsModalOpen(true); // Open registration panel
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const validateAndProceed = () => {
    const iranMobileRegex = /^09[0-9]{9}$/;
    if (!iranMobileRegex.test(phoneNumber)) {
      setErrorMessage('لطفاً یک شماره موبایل معتبر وارد کنید (مثال: ۰۹۱۲۳۴۵۶۷۸۹)');
      return;
    }
    setErrorMessage('');
    setPaymentStep('payment');
  };

  const calculateFinalPrice = () => {
    if (!selectedCourse) return 0;
    
    // Discount Logic
    if (isHazratMasoumehStudent) {
      if (selectedCourse.id === 1) return 150000; // Start from Zero Class
      if (selectedCourse.id === 3) return 300000; // VIP Class
    }
    
    return selectedCourse.price;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('شماره کارت کپی شد!');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 selection:bg-primary-200 selection:text-primary-900">
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <Calculator className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-slate-800 tracking-tight">
                  آکادمی ریاضی فولادی
                </span>
                <span className="text-xs text-slate-500">آموزش تخصصی ریاضیات</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">خانه</a>
              <a href="#courses" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">دوره‌ها و بازی‌ها</a>
              <a href="#reviews" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">نظرات</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">سوالات متداول</a>
              <a href="#booking" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">رزرو کلاس</a>
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="primary" size="sm" onClick={handleGeneralRegister}>شروع یادگیری</Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600">خانه</a>
              <a href="#courses" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600">دوره‌ها</a>
              <a href="#reviews" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600">نظرات</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600">سوالات متداول</a>
              <a href="#booking" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-2 rounded-lg text-base font-medium text-slate-700 hover:bg-primary-50 hover:text-primary-600">رزرو کلاس</a>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Button className="w-full justify-center" onClick={() => { setMobileMenuOpen(false); handleGeneralRegister(); }}>ورود / ثبت نام</Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        
        {/* Hero Section */}
        <section id="home" className="relative pt-24 pb-24 md:pt-36 md:pb-36 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/4 w-96 h-96 bg-primary-200/50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-1/4 w-96 h-96 bg-accent-200/50 rounded-full blur-3xl opacity-50"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="lg:w-1/2 text-center lg:text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-base font-bold mb-8">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-primary-600 animate-pulse"></span>
                  «یادگیری ریاضی، آسان‌تر از همیشه»
                </div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 leading-tight mb-8 tracking-tight">
                   آکادمی ریاضی
                  <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-indigo-600">
                    فولادی
                  </span>
                </h1>
                <p className="text-2xl text-slate-700 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-bold">
                  با <span className="text-primary-600">بهترین متد آموزشی</span> و مدرس مجرب، ریاضی را مفهومی یاد بگیرید و در امتحانات بدرخشید.
                </p>

                {/* Discount Banner on Main Panel */}
                <div 
                   onClick={() => setIsDiscountModalOpen(true)}
                   className="mb-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-1 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform cursor-pointer group"
                >
                   <div className="bg-white rounded-xl p-4 flex items-center gap-4 justify-between group-hover:bg-rose-50 transition-colors">
                      <div className="flex items-center gap-3">
                         <div className="bg-rose-100 p-2 rounded-full">
                            <Percent className="w-8 h-8 text-rose-600" />
                         </div>
                         <div className="text-right">
                            <p className="font-black text-slate-900 text-lg md:text-xl">تخفیف ویژه دانش‌آموزان حضرت معصومه</p>
                            <p className="text-rose-600 text-sm font-bold mt-1">تا ۸۵٪ تخفیف اختصاصی</p>
                         </div>
                      </div>
                      <Button size="sm" className="bg-rose-600 hover:bg-rose-700 shadow-rose-200">
                         دریافت تخفیف
                      </Button>
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4" onClick={() => document.getElementById('courses')?.scrollIntoView({behavior: 'smooth'})}>مشاهده دوره‌ها</Button>
                  
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 text-lg px-8 py-4" onClick={handleGeneralRegister}>
                      <PlayCircle className="w-6 h-6" />
                      کلاس شروع از صفر
                  </Button>
                </div>
                
                <div className="mt-14 flex items-center justify-center lg:justify-start gap-10 text-slate-500 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-50 rounded-lg">
                      <Users className="w-6 h-6 text-accent-500" />
                    </div>
                    <span>تدریس تخصصی</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Gamepad2 className="w-6 h-6 text-green-500" />
                    </div>
                    <span>یادگیری تعاملی</span>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white bg-slate-100">
                   <img 
                    src="https://picsum.photos/seed/mathstudy/800/600" 
                    alt="آموزش ریاضی آکادمی فولادی" 
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                  />
                  {/* Floating Cards */}
                  <div className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-slate-100 animate-bounce-slow hidden md:block">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary-100 p-3 rounded-xl text-primary-600">
                        <Calculator className="w-8 h-8" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-500">حل تمرین و تست</p>
                        <p className="text-2xl font-bold text-slate-800">نامحدود</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features/Stats Section */}
        <div className="bg-slate-900 py-16 border-y border-slate-800">
            <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                <div className="space-y-3">
                    <p className="text-5xl font-black text-white">۶+</p>
                    <p className="text-slate-400 font-medium">سال سابقه درخشان</p>
                </div>
                <div className="space-y-3">
                    <p className="text-5xl font-black text-white">۹۱٪</p>
                    <p className="text-slate-400 font-medium">قبولی در آزمون‌ها</p>
                </div>
                <div className="space-y-3">
                    <p className="text-5xl font-black text-white">۲۴/۷</p>
                    <p className="text-slate-400 font-medium">پشتیبانی آنلاین</p>
                </div>
                <div className="space-y-3">
                    <p className="text-5xl font-black text-white">۳۰۰+</p>
                    <p className="text-slate-400 font-medium">دانش‌آموز موفق</p>
                </div>
            </div>
        </div>

        {/* Courses Section */}
        <Section id="courses" title="دوره‌های آموزشی و پکیج‌ها" subtitle="مسیر موفقیت خود را انتخاب کنید">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COURSES.map(course => (
              <CourseCard key={course.id} course={course} onBuy={handleBuyClick} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" className="gap-2" onClick={handleGeneralRegister}>
              مشاهده همه محصولات <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Section>

        {/* Booking Section */}
        <Section id="booking" title="رزرو کلاس آنلاین" subtitle="همین حالا وقت خود را تنظیم کنید" className="bg-white">
          <div className="bg-slate-50 rounded-3xl shadow-lg border border-slate-100 overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-900/40 mix-blend-multiply"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-6">چرا کلاس‌های فولادی؟</h3>
                    <ul className="space-y-5 mb-8">
                        <li className="flex items-start gap-4">
                            <div className="p-1 bg-accent-500 rounded-full mt-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-lg block">کلاس شروع از صفر</span>
                                <span className="text-primary-100 text-sm">یادگیری پایه ای با هزینه ۱ میلیون تومان</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-1 bg-accent-500 rounded-full mt-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-lg block">کلاس VIP (۱.۵ ساعت)</span>
                                <span className="text-primary-100 text-sm">تدریس خصوصی و رفع اشکال کامل</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="p-1 bg-accent-500 rounded-full mt-1">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="font-bold text-lg block">تضمین کیفیت</span>
                                <span className="text-primary-100 text-sm">بازگشت وجه در صورت عدم رضایت از جلسه اول</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="md:w-1/2 p-8 md:p-12">
                <div className="mb-6">
                    <h4 className="text-xl font-bold text-slate-800">فرم درخواست مشاوره و ثبت نام</h4>
                    <p className="text-slate-500 text-sm mt-1">اطلاعات خود را وارد کنید تا با شما تماس بگیریم.</p>
                </div>
                <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleGeneralRegister(); }}>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">نام و نام خانوادگی</label>
                        <input type="text" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-slate-900" placeholder="مثلا: علی رضایی" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">مقطع تحصیلی</label>
                        <select className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-slate-900">
                            <option>متوسطه اول (۷، ۸، ۹)</option>
                            <option>متوسطه دوم (۱۰، ۱۱، ۱۲)</option>
                            <option>کنکوری</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">شماره تماس</label>
                        <input type="tel" dir="ltr" className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-slate-900" placeholder="0912..." />
                    </div>
                    <Button className="w-full" size="lg" type="submit">ثبت رایگان درخواست</Button>
                </form>
            </div>
          </div>
        </Section>

        {/* Reviews Section */}
        <Section id="reviews" title="نظرات دانش‌آموزان" subtitle="تجربه یادگیری در آکادمی فولادی">
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.slice(0, 6).map((review) => (
              <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-slate-50" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="font-bold text-slate-900">{review.name}</h4>
                            <p className="text-xs text-slate-500">{review.role}</p>
                        </div>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <StarIcon key={i} filled={i < review.rating} />
                            ))}
                        </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">
                  "{review.comment}"
                </p>
                
                {/* Teacher Response */}
                {review.response && (
                    <div className="mt-4 bg-primary-50 p-4 rounded-xl border border-primary-100 relative">
                        <div className="absolute -top-2 right-6 w-4 h-4 bg-primary-50 transform rotate-45 border-t border-l border-primary-100"></div>
                        <div className="flex items-center gap-2 mb-2 text-primary-700 font-bold text-xs">
                            <MessageCircle className="w-3 h-3" />
                            پاسخ مدرس:
                        </div>
                        <p className="text-slate-700 text-xs leading-relaxed">
                            {review.response}
                        </p>
                    </div>
                )}
              </div>
            ))}
          </div>
        </Section>
        
        {/* FAQ Section */}
        <Section id="faq" title="سوالات متداول" subtitle="پاسخ به پرسش‌های رایج شما" className="bg-slate-50">
          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-right focus:outline-none hover:bg-slate-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-bold text-slate-800 flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary-500" />
                    {faq.question}
                  </span>
                  {openFaqIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 mt-2 bg-slate-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-4 text-white">
                        <Calculator className="w-6 h-6" />
                        <span className="text-xl font-black">آکادمی ریاضی فولادی</span>
                    </div>
                    <p className="text-sm leading-relaxed max-w-sm mb-4">
                        ارائه دهنده خدمات آموزشی ریاضی با بالاترین کیفیت. زیر نظر خانم سعدیه فولادی.
                    </p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">
                        <PenTool className="w-3 h-3" />
                        <span>خانم سعدیه فولادی - طراح سوال رسمی</span>
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">لینک‌های مفید</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-primary-400 transition-colors">درباره ما</a></li>
                        <li><a href="#" className="hover:text-primary-400 transition-colors">کلاس‌های آنلاین</a></li>
                        <li><a href="#" className="hover:text-primary-400 transition-colors">پکیج‌های کنکوری</a></li>
                        <li><a href="#" className="hover:text-primary-400 transition-colors">بازی‌های ریاضی</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">ارتباط با ما</h4>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> ۰۲۱-۸۸۸۸۸۸۸۸</li>
                        <li className="flex items-center gap-2"><MonitorPlay className="w-4 h-4" /> info@mathfouladi.com</li>
                        <li className="flex gap-4 mt-4">
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Instagram className="w-5 h-5" /></a>
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="bg-slate-800 p-2 rounded-lg hover:bg-primary-600 transition-colors"><Facebook className="w-5 h-5" /></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-center text-xs">
                © ۱۴۰۳ تمامی حقوق برای آکادمی ریاضی فولادی محفوظ است.
            </div>
        </div>
      </footer>

      {/* Interactive Components */}
      <GeminiChat />
      
      {/* Discount Selection Modal */}
      <Modal 
        isOpen={isDiscountModalOpen} 
        onClose={() => setIsDiscountModalOpen(false)}
        title="تخفیف ویژه دانش‌آموزان حضرت معصومه"
      >
         <div className="space-y-4">
            <p className="text-slate-600 text-sm mb-4">
               دانش‌آموز عزیز، لطفاً دوره مورد نظر خود را با تخفیف ویژه انتخاب کنید:
            </p>
            
            <div className="space-y-3">
               {/* Start from Zero Card */}
               <div 
                  className="border-2 border-slate-100 hover:border-rose-500 bg-white rounded-xl p-4 cursor-pointer transition-all hover:shadow-md group"
                  onClick={() => handleDiscountSelect(1)}
               >
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-slate-800">کلاس شروع از صفر</span>
                     <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-bold">۸۵٪ تخفیف</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-slate-400 line-through text-sm">۱,۰۰۰,۰۰۰</span>
                     <span className="text-rose-600 font-black text-xl">۱۵۰,۰۰۰ <span className="text-xs font-normal text-slate-500">تومان</span></span>
                  </div>
                  <div className="mt-3 w-full bg-slate-50 text-slate-500 text-center py-2 rounded-lg text-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                     انتخاب و ثبت‌نام
                  </div>
               </div>

               {/* VIP Card */}
               <div 
                  className="border-2 border-slate-100 hover:border-rose-500 bg-white rounded-xl p-4 cursor-pointer transition-all hover:shadow-md group"
                  onClick={() => handleDiscountSelect(3)}
               >
                  <div className="flex justify-between items-center mb-2">
                     <span className="font-bold text-slate-800">کلاس مرور و VIP</span>
                     <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full font-bold">۸۰٪ تخفیف</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-slate-400 line-through text-sm">۱,۵۰۰,۰۰۰</span>
                     <span className="text-rose-600 font-black text-xl">۳۰۰,۰۰۰ <span className="text-xs font-normal text-slate-500">تومان</span></span>
                  </div>
                  <div className="mt-3 w-full bg-slate-50 text-slate-500 text-center py-2 rounded-lg text-sm group-hover:bg-rose-600 group-hover:text-white transition-colors">
                     انتخاب و ثبت‌نام
                  </div>
               </div>
            </div>
         </div>
      </Modal>

      {/* Registration/Purchase Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={selectedCourse ? `خرید: ${selectedCourse.title}` : 'ثبت نام در آکادمی'}
      >
        <div className="space-y-4">
           {/* Course Summary */}
           {selectedCourse && (
             <div className="bg-slate-50 p-3 rounded-lg flex items-center gap-3 border border-slate-100">
                <div className="bg-white p-2 rounded-md border border-slate-200">
                  {selectedCourse.type === 'game' ? <Gamepad2 className="w-6 h-6 text-green-500"/> : <Video className="w-6 h-6 text-primary-500"/>}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">{selectedCourse.title}</p>
                  <div className="flex items-center gap-2">
                     <p className="text-primary-600 font-bold text-sm">
                        {calculateFinalPrice().toLocaleString('fa-IR')} تومان
                     </p>
                     {isHazratMasoumehStudent && (
                        <span className="text-xs text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md">با تخفیف ویژه</span>
                     )}
                  </div>
                </div>
             </div>
           )}

           {paymentStep === 'input' ? (
             <>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-2">شماره موبایل جهت احراز هویت</label>
                   <div className="relative">
                      <input 
                         type="tel" 
                         dir="ltr"
                         autoFocus
                         placeholder="09..."
                         className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all text-black placeholder:text-slate-400 text-lg tracking-wide"
                         value={phoneNumber}
                         onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
                      />
                      <Phone className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                   </div>
                   {errorMessage && (
                     <p className="text-red-500 text-xs mt-2 animate-pulse">{errorMessage}</p>
                   )}
                </div>
                <Button className="w-full py-3" onClick={validateAndProceed}>
                   تایید و ادامه
                </Button>
             </>
           ) : (
             <div className="text-center animate-fade-in space-y-4">
                {/* Warning Alert */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-right">
                   <AlertTriangle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                   <div>
                      <p className="text-amber-800 font-bold text-sm">درگاه پرداخت آنلاین موقتاً غیرفعال است</p>
                      <p className="text-amber-700 text-xs mt-1">لطفاً وجه را به صورت کارت به کارت واریز کرده و رسید آن را ارسال نمایید.</p>
                   </div>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                   <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-slate-500">شماره کارت مقصد:</span>
                   </div>
                   <p className="text-lg sm:text-xl font-mono text-slate-800 tracking-wider dir-ltr text-left font-bold my-2 select-all">
                      6037 9981 6878 9708
                   </p>
                   <p className="text-xs text-slate-500 mt-2 text-center bg-white rounded-full py-1 border border-slate-100 inline-block px-4 mb-4">به نام: <span className="font-bold text-slate-800">سعدیه فولادی</span></p>
                   
                   <Button variant="outline" className="w-full gap-2 border-dashed border-2 hover:border-solid hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50" onClick={() => copyToClipboard('6037998168789708')}>
                      <Copy className="w-5 h-5" />
                      کپی شماره کارت
                   </Button>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                   <div className="mx-auto bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mb-2">
                      <Send className="w-5 h-5 text-blue-600" />
                   </div>
                   <p className="text-blue-900 font-bold text-sm mb-1">ثبت نهایی:</p>
                   <p className="text-blue-800 text-xs leading-relaxed">
                      پس از پرداخت، تصویر رسید را به شماره <span className="font-bold dir-ltr inline-block">09931113909</span> در ایتا، تلگرام یا واتساپ ارسال کنید.
                   </p>
                </div>

                <div className="flex gap-3 pt-2">
                   <Button variant="outline" className="flex-1" onClick={() => setPaymentStep('input')}>بازگشت</Button>
                   <Button className="flex-1 bg-slate-300 text-slate-500 cursor-not-allowed" disabled>پرداخت آنلاین (غیرفعال)</Button>
                </div>
             </div>
           )}
        </div>
      </Modal>

    </div>
  );
};

export default App;