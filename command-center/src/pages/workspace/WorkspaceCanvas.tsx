import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Briefcase, CheckSquare, BarChart3, Sparkles, MessageSquare, Plus, CheckCircle2, Circle, ArrowRight, Zap } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

const SLASH_COMMANDS = [
  { id: 'ai', icon: Sparkles, label: 'Ask AI Advisor', desc: 'Generate strategy based on context' },
  { id: 'task', icon: CheckSquare, label: 'Add Action Item', desc: 'Create a new execution task' },
  { id: 'kpi', icon: BarChart3, label: 'Log KPI Metric', desc: 'Update your tracked metric' }
];

export default function WorkspaceCanvas() {
  const { id } = useParams();
  const [notes, setNotes] = useState('We need to increase reply rate from 2% to 5%.\n\nKey angles to test:\n1. Founder-led, extremely short\n2. Case study focus (Drop name of similar client)\n3. Value-add (Loom audit of their landing page)\n\nLet\'s build the sequence below.');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Draft Email 1 (Founder to Founder)', done: true },
    { id: 2, text: 'Draft Email 2 (Bump + Value)', done: false },
    { id: 3, text: 'Setup Apollo triggers', done: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const taskInputRef = useRef<HTMLInputElement>(null);

  // Slash Command State
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashQuery, setSlashQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }]);
      setNewTask('');
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setNotes(val);
    
    const match = val.match(/(?:\s|^)\/([a-zA-Z]*)$/);
    if (match) {
      setShowSlashMenu(true);
      setSlashQuery(match[1].toLowerCase());
      setSelectedIndex(0);
    } else {
      setShowSlashMenu(false);
    }
  };

  const filteredCommands = SLASH_COMMANDS.filter(c => 
    c.id.includes(slashQuery) || c.label.toLowerCase().includes(slashQuery)
  );

  const executeCommand = (commandId: string) => {
    // Remove the trailing /query
    const newNotes = notes.replace(/(?:\s|^)\/[a-zA-Z]*$/, '');
    
    if (commandId === 'ai') {
      setNotes(newNotes);
      setIsGenerating(true);
      setTimeout(() => {
        setNotes(newNotes + '\n\n✨ [AI Draft]: Based on your diagnostic, you should focus on Founder-led outbound. Let me generate a 3-step sequence for you right now...');
        setIsGenerating(false);
      }, 1500);
    } else if (commandId === 'task') {
      setNotes(newNotes);
      taskInputRef.current?.focus();
    } else if (commandId === 'kpi') {
      setNotes(newNotes + '\n\n📊 [KPI Update]: Reply rate improved to 3.2% today.');
    } else {
      setNotes(newNotes);
    }
    
    setShowSlashMenu(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showSlashMenu) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          executeCommand(filteredCommands[selectedIndex].id);
        }
      } else if (e.key === 'Escape') {
        setShowSlashMenu(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 relative">
      <div className="absolute inset-0 bg-skeletal-grid opacity-20 pointer-events-none -z-10" />
      {/* Canvas Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Sequence Builder
            </span>
            <span className="text-sm text-slate-400">ID: {id}</span>
          </div>
          <h1 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Q3 Outbound Engine</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300">
            Save Draft
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] active:scale-95 transition-all duration-200">
            Mark as Active
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Notes & Ideation (Rich Text) */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900/40 border-white/5 shadow-xl h-[600px] flex flex-col relative overflow-visible">
            <CardHeader className="pb-3 border-b border-white/5 bg-slate-900/50 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-400" /> Notes & Ideation
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-mono hidden sm:inline-block border border-white/10 px-2 py-1 rounded bg-black/20">
                  Type '/' for commands
                </span>
                <Button variant="ghost" size="sm" className="h-8 text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10" onClick={() => executeCommand('ai')}>
                  <Sparkles className="w-4 h-4 mr-2" /> AI Draft
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative">
              <Textarea 
                value={notes}
                onChange={handleNotesChange}
                onKeyDown={handleKeyDown}
                className="w-full h-full min-h-full border-0 resize-none bg-transparent focus-visible:ring-0 p-6 text-slate-300 leading-relaxed text-[15px]"
                placeholder="Start typing your strategy here... Type '/' to open the command menu."
              />

              {/* Shimmering Loader Overlay */}
              {isGenerating && (
                <div className="absolute inset-x-6 bottom-6 flex items-center gap-3 bg-slate-900/80 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 bg-indigo-500/20 rounded w-full overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                    </div>
                    <div className="h-2 bg-indigo-500/20 rounded w-3/4 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite_0.2s]" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-indigo-300 uppercase tracking-widest ml-2">Generating</span>
                </div>
              )}

              {/* Slash Command Popover */}
              {showSlashMenu && (
                <div className="absolute left-6 bottom-6 w-64 bg-slate-800 border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2 z-50">
                  <div className="px-3 py-2 bg-slate-900/50 border-b border-white/5 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-300">Command Menu</span>
                  </div>
                  <div className="py-1">
                    {filteredCommands.length > 0 ? (
                      filteredCommands.map((cmd, i) => (
                        <div 
                          key={cmd.id}
                          onClick={() => executeCommand(cmd.id)}
                          onMouseEnter={() => setSelectedIndex(i)}
                          className={`w-full text-left px-3 py-2 flex items-center gap-3 cursor-pointer transition-colors ${
                            i === selectedIndex ? 'bg-indigo-500/20' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className={`p-1.5 rounded-md ${i === selectedIndex ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-700 text-slate-300'}`}>
                            <cmd.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className={`text-sm font-medium ${i === selectedIndex ? 'text-indigo-300' : 'text-slate-200'}`}>
                              {cmd.label}
                            </div>
                            <div className="text-[10px] text-slate-500">{cmd.desc}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-sm text-slate-500 text-center">No commands found.</div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Widgets */}
        <div className="space-y-6">
          {/* KPI Widget */}
          <Card className="bg-slate-900/40 border-white/5">
            <CardHeader className="pb-3 border-b border-white/5 bg-slate-900/50">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-300">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Tracked KPI
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5">
              <div className="text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Reply Rate Target</p>
                <div className="flex items-end justify-center gap-3">
                  <span className="text-4xl font-mono font-bold text-white">5%</span>
                  <span className="text-sm text-slate-500 mb-1">/ 2% baseline</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Plan Kanban/List */}
          <Card className="bg-slate-900/40 border-white/5 flex-1">
            <CardHeader className="pb-3 border-b border-white/5 bg-slate-900/50">
              <CardTitle className="text-sm font-semibold flex items-center gap-2 text-slate-300">
                <CheckSquare className="w-4 h-4 text-blue-400" /> Execution Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                    onClick={() => toggleTask(task.id)}
                  >
                    <div className="mt-0.5">
                      {task.done ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 group-hover:text-slate-400" />
                      )}
                    </div>
                    <span className={`text-sm ${task.done ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="relative mt-4">
                <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input 
                  ref={taskInputRef}
                  placeholder="Add next action..."
                  className="pl-9 bg-black/20 border-white/10 text-sm h-9"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={addTask}
                />
              </div>
            </CardContent>
          </Card>

          {/* Context Links */}
          <Card className="bg-slate-900/40 border-white/5">
            <CardHeader className="pb-3 border-b border-white/5 bg-slate-900/50">
              <CardTitle className="text-sm font-semibold text-slate-300">Connected Context</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <Link to="/library/sop-3" className="flex items-center justify-between p-2 rounded-md bg-white/5 hover:bg-white/10 transition-colors text-xs text-slate-300">
                <span>📚 LinkedIn Outbound SOP</span>
                <ArrowRight className="w-3 h-3 text-slate-500" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
