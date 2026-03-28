/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster, toast } from 'sonner';
import { 
  Activity, 
  Flame, 
  Droplets, 
  Footprints, 
  TrendingUp, 
  Target, 
  Brain, 
  ChevronRight, 
  Plus, 
  Moon, 
  Sun, 
  Dumbbell, 
  Timer, 
  Award,
  Instagram,
  Twitter,
  Facebook,
  Mail,
  Menu,
  X
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { cn } from './lib/utils';

// --- Types ---
interface WorkoutPlan {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  calories: string;
  image: string;
  color: string;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// --- Mock Data ---
const WEEKLY_DATA = [
  { name: 'Mon', steps: 8400, calories: 450 },
  { name: 'Tue', steps: 9200, calories: 520 },
  { name: 'Wed', steps: 7800, calories: 380 },
  { name: 'Thu', steps: 10500, calories: 610 },
  { name: 'Fri', steps: 8900, calories: 490 },
  { name: 'Sat', steps: 12000, calories: 750 },
  { name: 'Sun', steps: 9500, calories: 580 },
];

const WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: '1',
    title: 'Full Body Burn',
    level: 'Beginner',
    duration: '30 min',
    calories: '250 kcal',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
    color: 'neon-green'
  },
  {
    id: '2',
    title: 'Core Strength',
    level: 'Intermediate',
    duration: '45 min',
    calories: '400 kcal',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    color: 'neon-blue'
  },
  {
    id: '3',
    title: 'HIIT Mastery',
    level: 'Advanced',
    duration: '60 min',
    calories: '650 kcal',
    image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&q=80',
    color: 'neon-purple'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Yoga Enthusiast',
    content: 'FitPulse transformed my daily routine. The analytics are so detailed and motivating!',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'Mark Thompson',
    role: 'Marathon Runner',
    content: 'The best fitness tracker I have ever used. The UI is stunning and the BMI tool is super handy.',
    avatar: 'https://i.pravatar.cc/150?u=mark'
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    role: 'Fitness Coach',
    content: 'I recommend FitPulse to all my clients. It is intuitive, beautiful, and highly effective.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

// --- Components ---

const Navbar = ({ isDark, toggleTheme }: { isDark: boolean, toggleTheme: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Features', href: '#features' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'Workouts', href: '#workouts' },
    { name: 'BMI', href: '#bmi' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass-dark py-3 shadow-lg" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 bg-neon-green rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)]">
            <Activity className="text-black w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter text-white">FitPulse</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-400 hover:text-neon-green transition-colors font-medium text-sm uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-400" />}
          </button>
          <button 
            onClick={() => toast.success('Welcome to the community!')}
            className="px-6 py-2 bg-neon-green text-black font-bold rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(57,255,20,0.3)]"
          >
            Join Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass-dark p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-white text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { toast.success('Welcome!'); setIsMenuOpen(false); }}
              className="w-full py-3 bg-neon-green text-black font-bold rounded-xl"
            >
              Join Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-glow" />
      
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-neon-green">Live Your Best Life</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] mb-6">
            Track Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple">
              Fitness Journey
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
            Experience the future of fitness tracking. Real-time analytics, AI-powered insights, and a community that pushes you further.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => toast.info('Starting your journey...')}
              className="px-8 py-4 bg-neon-green text-black font-bold rounded-2xl hover:scale-105 transition-transform flex items-center gap-2 group"
            >
              Start Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => toast.info('Exploring plans...')}
              className="px-8 py-4 glass text-white font-bold rounded-2xl hover:bg-white/10 transition-colors"
            >
              Explore Plans
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 animate-float">
            <img 
              src="https://images.unsplash.com/photo-1594381898411-846e7d193883?w=800&q=80" 
              alt="Fitness" 
              className="rounded-[40px] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
            {/* Floating Stats Card */}
            <motion.div 
              initial={{ x: 20, y: 20 }}
              animate={{ y: [20, 0, 20] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-10 -left-10 glass-dark p-6 rounded-3xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-neon-blue/20 rounded-2xl flex items-center justify-center">
                  <Flame className="text-neon-blue w-6 h-6" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase font-bold tracking-widest">Calories</p>
                  <p className="text-white text-2xl font-display font-bold">1,240 kcal</p>
                </div>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-neon-blue h-full w-3/4" />
              </div>
            </motion.div>
          </div>
          
          {/* Decorative Circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 border border-neon-purple/30 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-20 w-64 h-64 bg-neon-blue/5 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Activity className="w-8 h-8 text-neon-green" />,
      title: "Workout Tracking",
      desc: "Log every set, rep, and mile with precision. Get detailed breakdowns of your performance.",
      color: "from-neon-green/20 to-transparent"
    },
    {
      icon: <Flame className="w-8 h-8 text-neon-blue" />,
      title: "Calorie Tracker",
      desc: "Monitor your intake and burn with our extensive database and smart logging tools.",
      color: "from-neon-blue/20 to-transparent"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-neon-purple" />,
      title: "Progress Analytics",
      desc: "Visualize your journey with beautiful charts and deep insights into your fitness trends.",
      color: "from-neon-purple/20 to-transparent"
    },
    {
      icon: <Brain className="w-8 h-8 text-orange-400" />,
      title: "AI Suggestions",
      desc: "Our smart engine learns your habits and provides personalized workout and meal plans.",
      color: "from-orange-400/20 to-transparent"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to reach your peak performance in one sleek package.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={cn(
                "p-8 rounded-[32px] glass border border-white/5 relative overflow-hidden group transition-all",
                "hover:border-white/20"
              )}
            >
              <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500", f.color)} />
              <div className="relative z-10">
                <div className="mb-6 p-4 glass w-fit rounded-2xl group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const stats = [
    { icon: <Footprints className="text-neon-green" />, label: "Steps", value: "8,432", target: "10,000", color: "bg-neon-green" },
    { icon: <Flame className="text-neon-blue" />, label: "Calories", value: "1,240", target: "2,000", color: "bg-neon-blue" },
    { icon: <Droplets className="text-neon-purple" />, label: "Water", value: "1.5L", target: "3.0L", color: "bg-neon-purple" },
  ];

  return (
    <section id="dashboard" className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Your Dashboard</h2>
            <p className="text-gray-400">Real-time overview of your daily performance.</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => toast.info('Viewing daily stats')}
              className="px-4 py-2 glass rounded-xl text-white text-sm font-bold"
            >
              Daily
            </button>
            <button 
              onClick={() => toast.info('Viewing weekly stats')}
              className="px-4 py-2 bg-white/10 rounded-xl text-gray-400 text-sm font-bold"
            >
              Weekly
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {stats.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass p-8 rounded-[32px] border border-white/5"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 glass rounded-xl">{s.icon}</div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Target: {s.target}</span>
              </div>
              <div className="mb-6">
                <p className="text-gray-400 text-sm mb-1">{s.label}</p>
                <p className="text-4xl font-display font-bold text-white">{s.value}</p>
              </div>
              <div className="w-full bg-white/5 h-3 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '70%' }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn("h-full rounded-full", s.color)} 
                />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] border border-white/5 h-[400px]"
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <TrendingUp className="text-neon-green" /> Activity Progress
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={WEEKLY_DATA}>
                <defs>
                  <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#39FF14' }}
                />
                <Area type="monotone" dataKey="steps" stroke="#39FF14" strokeWidth={3} fillOpacity={1} fill="url(#colorSteps)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass p-8 rounded-[32px] border border-white/5 h-[400px]"
          >
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <Flame className="text-neon-blue" /> Calories Burned
            </h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={WEEKLY_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#ffffff05' }}
                  contentStyle={{ background: '#111', border: '1px solid #333', borderRadius: '12px' }}
                />
                <Bar dataKey="calories" radius={[10, 10, 0, 0]}>
                  {WEEKLY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#00F3FF' : '#ffffff10'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WorkoutPlans = () => {
  return (
    <section id="workouts" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Workout Plans</h2>
          <p className="text-gray-400">Choose a plan that fits your current level and goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {WORKOUT_PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-[40px] overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                    plan.level === 'Beginner' ? "bg-neon-green text-black" : 
                    plan.level === 'Intermediate' ? "bg-neon-blue text-black" : "bg-neon-purple text-white"
                  )}>
                    {plan.level}
                  </span>
                </div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">{plan.title}</h3>
                <div className="flex items-center gap-4 text-gray-300 text-sm mb-6">
                  <span className="flex items-center gap-1"><Timer className="w-4 h-4" /> {plan.duration}</span>
                  <span className="flex items-center gap-1"><Flame className="w-4 h-4" /> {plan.calories}</span>
                </div>
                <button 
                  onClick={() => toast.success(`Starting ${plan.title}!`)}
                  className="w-full py-4 bg-white text-black font-bold rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                >
                  Start Workout
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BMICalculator = () => {
  const [weight, setWeight] = useState<string>('70');
  const [height, setHeight] = useState<string>('175');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const result = w / (h * h);
      setBmi(parseFloat(result.toFixed(1)));
      
      if (result < 18.5) setStatus('Underweight');
      else if (result < 25) setStatus('Normal');
      else if (result < 30) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  return (
    <section id="bmi" className="py-24 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">BMI Calculator</h2>
          <p className="text-gray-400 mb-10 leading-relaxed">
            Body Mass Index (BMI) is a simple tool that helps you understand if your weight is in a healthy range for your height.
          </p>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-bold uppercase tracking-widest">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-neon-green transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-sm font-bold uppercase tracking-widest">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-neon-green transition-colors"
                />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="glass p-10 rounded-[40px] border border-white/5 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple" />
          
          <p className="text-gray-400 uppercase font-bold tracking-[0.2em] mb-4">Your BMI Result</p>
          <div className="relative inline-block mb-6">
            <div className="text-8xl font-display font-bold text-white">{bmi}</div>
            <div className={cn(
              "absolute -top-2 -right-12 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
              status === 'Normal' ? "bg-neon-green text-black" : "bg-red-500 text-white"
            )}>
              {status}
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 mt-8">
            {['Under', 'Normal', 'Over', 'Obese'].map((s, i) => (
              <div key={s} className="space-y-2">
                <div className={cn(
                  "h-2 rounded-full",
                  status === s ? "bg-neon-green" : "bg-white/5"
                )} />
                <p className="text-[10px] text-gray-500 font-bold uppercase">{s}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="mb-12">
          <Award className="w-12 h-12 text-neon-purple mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-white">What Our Users Say</h2>
        </div>

        <div className="relative h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <p className="text-2xl md:text-3xl text-gray-300 italic mb-10 leading-relaxed">
                "{TESTIMONIALS[active].content}"
              </p>
              <div className="flex items-center gap-4">
                <img src={TESTIMONIALS[active].avatar} alt={TESTIMONIALS[active].name} className="w-14 h-14 rounded-full border-2 border-neon-purple" />
                <div className="text-left">
                  <p className="text-white font-bold">{TESTIMONIALS[active].name}</p>
                  <p className="text-gray-500 text-sm">{TESTIMONIALS[active].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActive(i)}
              className={cn(
                "w-3 h-3 rounded-full transition-all duration-300",
                active === i ? "bg-neon-purple w-8" : "bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-24 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="text-neon-green w-8 h-8" />
              <span className="text-2xl font-display font-bold text-white">FitPulse</span>
            </div>
            <p className="text-gray-400 max-w-sm mb-8">
              Join thousands of users who have transformed their lives with FitPulse. The ultimate companion for your fitness journey.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-3 glass rounded-xl hover:bg-neon-green hover:text-black transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#" className="hover:text-neon-green transition-colors">Home</a></li>
              <li><a href="#features" className="hover:text-neon-green transition-colors">Features</a></li>
              <li><a href="#dashboard" className="hover:text-neon-green transition-colors">Dashboard</a></li>
              <li><a href="#workouts" className="hover:text-neon-green transition-colors">Workouts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Get the latest fitness tips and updates.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-neon-green"
              />
              <button 
                onClick={() => toast.success('Subscribed to newsletter!')}
                className="absolute right-2 top-2 bottom-2 px-4 bg-neon-green text-black font-bold rounded-lg text-sm"
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">© 2026 FitPulse. All rights reserved.</p>
          <div className="flex gap-8 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingActionButton = () => {
  return (
    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 w-16 h-16 bg-neon-green text-black rounded-full shadow-[0_0_30px_rgba(57,255,20,0.5)] flex items-center justify-center z-40 group"
    >
      <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
    </motion.button>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
    >
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-24 h-24 bg-neon-green rounded-3xl flex items-center justify-center mb-8"
      >
        <Activity className="text-black w-12 h-12" />
      </motion.div>
      <div className="w-48 bg-white/10 h-1 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-full h-full bg-neon-green"
        />
      </div>
    </motion.div>
  );
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    toast.info(`Switched to ${isDark ? 'Light' : 'Dark'} mode`);
  };

  return (
    <div className={cn(
      "min-h-screen font-sans transition-colors duration-500",
      isDark ? "bg-[#0a0a0a] text-white" : "bg-gray-50 text-gray-900"
    )}>
      <Toaster position="top-right" richColors />
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <WorkoutPlans />
        <BMICalculator />
        <Testimonials />
      </main>

      <Footer />
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => toast.success('Activity added!')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-neon-green text-black rounded-full shadow-[0_0_30px_rgba(57,255,20,0.5)] flex items-center justify-center z-40 group"
      >
        <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" />
      </motion.button>

      {/* Background Noise/Texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
