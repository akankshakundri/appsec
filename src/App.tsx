import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Lock, 
  Bug, 
  Search, 
  BookOpen, 
  Code2, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  Sparkles
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { VULNERABILITIES, SECURE_PRACTICES, TESTING_METHODS } from './constants';
import { Vulnerability, SecurePractice, TestingMethod } from './types';
import { cn } from './types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Section = 'vulnerabilities' | 'secure-coding' | 'testing' | 'image-gen';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('vulnerabilities');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');

  const generateImage = async (customPrompt?: string) => {
    setIsGenerating(true);
    try {
      const prompt = customPrompt || `A professional, high-tech conceptual illustration representing ${activeSection.replace('-', ' ')} in application security. Cyberpunk aesthetic, clean lines, neon accents, 3D isometric style.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setGeneratedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#F8F9FA] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 text-indigo-600">
            <Shield className="w-8 h-8" />
            <h1 className="font-serif text-xl font-bold tracking-tight text-gray-900">AppSec Academy</h1>
          </div>
          <p className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-widest">Intern Training Portal</p>
        </div>

        <nav className="flex-1 py-6">
          <NavItem 
            icon={<Bug className="w-5 h-5" />} 
            label="Vulnerabilities" 
            active={activeSection === 'vulnerabilities'} 
            onClick={() => setActiveSection('vulnerabilities')} 
          />
          <NavItem 
            icon={<Code2 className="w-5 h-5" />} 
            label="Secure Coding" 
            active={activeSection === 'secure-coding'} 
            onClick={() => setActiveSection('secure-coding')} 
          />
          <NavItem 
            icon={<Search className="w-5 h-5" />} 
            label="Security Testing" 
            active={activeSection === 'testing'} 
            onClick={() => setActiveSection('testing')} 
          />
          <div className="mt-8 px-6">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">AI Tools</p>
            <NavItem 
              icon={<ImageIcon className="w-5 h-5" />} 
              label="Visualizer" 
              active={activeSection === 'image-gen'} 
              onClick={() => setActiveSection('image-gen')} 
            />
          </div>
        </nav>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              AI
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Security Intern</p>
              <p className="text-xs text-gray-500">Level 1 Trainee</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-12">
          <AnimatePresence mode="wait">
            {activeSection === 'vulnerabilities' && (
              <motion.div
                key="vulnerabilities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <header className="mb-12">
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 italic">Common Vulnerabilities</h2>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Understanding the "How" and "Why" behind common security flaws is the first step in building resilient applications.
                  </p>
                </header>

                <div className="mb-12 bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="w-6 h-6" />
                      Intern's Daily Checklist
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Morning</p>
                        <p className="text-sm">Review latest OWASP Top 10 updates and security advisories.</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Afternoon</p>
                        <p className="text-sm">Perform manual code review on recent PRs for common patterns.</p>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                        <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-2">Evening</p>
                        <p className="text-sm">Update threat models for upcoming feature releases.</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20" />
                </div>

                <div className="grid gap-8">
                  {VULNERABILITIES.map((vuln) => (
                    <VulnerabilityCard key={vuln.id} vuln={vuln} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'secure-coding' && (
              <motion.div
                key="secure-coding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <header className="mb-12">
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 italic">Secure Coding Practices</h2>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Security is not a feature; it's a mindset. These practices should be integrated into every line of code you write.
                  </p>
                </header>

                <div className="grid gap-8">
                  {SECURE_PRACTICES.map((practice) => (
                    <PracticeCard key={practice.id} practice={practice} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'testing' && (
              <motion.div
                key="testing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <header className="mb-12">
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 italic">Security Testing Methods</h2>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    How do we verify our security? Different testing methodologies offer different perspectives on an application's security posture.
                  </p>
                </header>

                <div className="grid gap-8">
                  {TESTING_METHODS.map((method) => (
                    <TestingCard key={method.id} method={method} />
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === 'image-gen' && (
              <motion.div
                key="image-gen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <header className="mb-12">
                  <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 italic">Security Visualizer</h2>
                  <p className="text-lg text-gray-600 max-w-2xl">
                    Generate conceptual artwork for security concepts. Use these for presentations, documentation, or to better understand abstract threats.
                  </p>
                </header>

                <div className="glass-card rounded-2xl p-8">
                  <div className="flex gap-4 mb-8">
                    <input 
                      type="text" 
                      placeholder="e.g., A digital fortress being attacked by shadow hackers..."
                      className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                      value={imagePrompt}
                      onChange={(e) => setImagePrompt(e.target.value)}
                    />
                    <button 
                      onClick={() => generateImage(imagePrompt)}
                      disabled={isGenerating}
                      className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      Generate
                    </button>
                  </div>

                  <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden border border-gray-200 flex items-center justify-center relative">
                    {generatedImage ? (
                      <img 
                        src={generatedImage} 
                        alt="Generated Security Concept" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="text-center p-12">
                        <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-400">Enter a prompt and click generate to visualize security concepts.</p>
                      </div>
                    )}
                    {isGenerating && (
                      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
                          <p className="font-medium text-indigo-900">Synthesizing Visual Concept...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-4 px-6 py-4 text-sm font-medium transition-all border-r-4 border-transparent",
        active ? "bg-indigo-50 text-indigo-700 border-indigo-600" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      )}
    >
      {icon}
      {label}
      {active && <ChevronRight className="w-4 h-4 ml-auto" />}
    </button>
  );
}

function VulnerabilityCard({ vuln }: { vuln: Vulnerability }) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:shadow-lg transition-all">
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-serif font-bold text-gray-900">{vuln.title}</h3>
          <span className={cn(
            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
            vuln.impact === 'Critical' ? "bg-red-100 text-red-700" :
            vuln.impact === 'High' ? "bg-orange-100 text-orange-700" :
            "bg-yellow-100 text-yellow-700"
          )}>
            {vuln.impact} Impact
          </span>
        </div>
        
        <p className="text-gray-600 mb-8 leading-relaxed">{vuln.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Remediation
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">{vuln.remediation}</p>
          </div>
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Terminal className="w-4 h-4 text-indigo-500" />
              Example / Payload
            </h4>
            <div className="code-block">
              {vuln.example}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PracticeCard({ practice }: { practice: SecurePractice }) {
  return (
    <div className="glass-card rounded-2xl p-8 hover:shadow-lg transition-all">
      <div className="flex items-start gap-6">
        <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
          <Lock className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{practice.title}</h3>
          <p className="text-gray-600 mb-6">{practice.description}</p>
          <ul className="space-y-3">
            {practice.tips.map((tip, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TestingCard({ method }: { method: TestingMethod }) {
  return (
    <div className="glass-card rounded-2xl p-8 hover:shadow-lg transition-all">
      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4">{method.title}</h3>
      <p className="text-gray-600 mb-8">{method.description}</p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-emerald-50/50 rounded-xl p-6">
          <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">Advantages</h4>
          <ul className="space-y-2">
            {method.pros.map((pro, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-red-50/50 rounded-xl p-6">
          <h4 className="text-xs font-bold text-red-700 uppercase tracking-widest mb-4">Limitations</h4>
          <ul className="space-y-2">
            {method.cons.map((con, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-red-800">
                <AlertTriangle className="w-4 h-4" />
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
