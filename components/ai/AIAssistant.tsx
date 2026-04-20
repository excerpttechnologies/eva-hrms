'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { askAI, AIMessage } from '@/lib/ai/mockAI';
import {
  RiRobot2Line, RiCloseLine, RiSendPlaneLine, RiSparklingLine,
  RiRefreshLine, RiThumbUpLine, RiThumbDownLine, RiClipboardLine,
} from 'react-icons/ri';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  suggestions?: string[];
  timestamp: Date;
  streaming?: boolean;
}

const QUICK_PROMPTS = [
  'Show attendance anomalies',
  'Top performers this quarter',
  'Attrition risks',
  'Generate monthly report',
  'Hiring recommendations',
];

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: "👋 Hi! I'm **NexusAI**, your intelligent HR assistant.\n\nI'm context-aware — ask me anything about your current page or any HR topic. Try a quick prompt below!",
      suggestions: QUICK_PROMPTS.slice(0, 3),
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streamText, setStreamText] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamText]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setStreamText('');

    const history: AIMessage[] = messages.map(m => ({ role: m.role, content: m.content }));
    history.push({ role: 'user', content: text });

    let streamed = '';
    try {
      const response = await askAI(history, pathname, (chunk) => {
        streamed += chunk;
        setStreamText(streamed);
      });
      setStreamText('');
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        suggestions: response.suggestions,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '⚠️ AI service temporarily unavailable. Please try again.',
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
      setStreamText('');
    }
  }, [messages, loading, pathname]);

  const renderMarkdown = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <div key={i} style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{line.slice(2, -2)}</div>;
        }
        if (line.startsWith('- ') || line.match(/^\d+\./)) {
          return <div key={i} style={{ paddingLeft: 12, marginBottom: 2 }}>{line}</div>;
        }
        if (line === '') return <div key={i} style={{ height: 6 }} />;
        // inline bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <div key={i} style={{ marginBottom: 2 }}>
            {parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}
          </div>
        );
      });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 999,
          width: 52, height: 52, borderRadius: '50%',
          background: open ? '#1d4ed8' : 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(59,130,246,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.25s',
        }}
      >
        {open ? <RiCloseLine size={22} color="white" /> : <RiRobot2Line size={22} color="white" />}
        {!open && (
          <span style={{ position: 'absolute', top: -2, right: -2, width: 12, height: 12, borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-secondary)' }} />
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 998,
          width: 380, height: 560, borderRadius: 16,
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <RiRobot2Line size={18} color="white" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: 'white' }}>NexusAI</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Context-aware · {pathname?.split('/').pop() || 'dashboard'}
              </div>
            </div>
            <button onClick={() => setMessages(msgs => [msgs[0]])} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 4 }} title="Clear chat">
              <RiRefreshLine size={14} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', gap: 8, alignItems: 'flex-start' }}>
                {msg.role === 'assistant' && (
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <RiSparklingLine size={12} color="white" />
                  </div>
                )}
                <div style={{ maxWidth: '80%' }}>
                  <div style={{
                    padding: '10px 13px', borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '2px 12px 12px 12px',
                    background: msg.role === 'user' ? '#3b82f6' : 'var(--bg-tertiary)',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    fontSize: 12, lineHeight: 1.55,
                  }}>
                    {renderMarkdown(msg.content)}
                  </div>
                  {msg.role === 'assistant' && (
                    <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }} onClick={() => navigator.clipboard?.writeText(msg.content)}>
                        <RiClipboardLine size={11} />
                      </button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}><RiThumbUpLine size={11} /></button>
                      <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 2 }}><RiThumbDownLine size={11} /></button>
                    </div>
                  )}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 8 }}>
                      {msg.suggestions.map(s => (
                        <button key={s} onClick={() => sendMessage(s)} style={{ padding: '4px 10px', borderRadius: 20, border: '1px solid var(--border)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: 11, cursor: 'pointer', fontWeight: 500, transition: 'all 0.15s' }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Streaming message */}
            {streamText && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RiSparklingLine size={12} color="white" />
                </div>
                <div style={{ maxWidth: '80%', padding: '10px 13px', borderRadius: '2px 12px 12px 12px', background: 'var(--bg-tertiary)', fontSize: 12, lineHeight: 1.55, color: 'var(--text-primary)' }}>
                  {streamText}
                  <span style={{ display: 'inline-block', width: 8, height: 14, background: '#3b82f6', marginLeft: 2, borderRadius: 2, animation: 'blink 1s step-end infinite' }}>
                    <style>{`@keyframes blink { 50% { opacity: 0 } }`}</style>
                  </span>
                </div>
              </div>
            )}

            {/* Loading dots */}
            {loading && !streamText && (
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <RiSparklingLine size={12} color="white" />
                </div>
                <div style={{ display: 'flex', gap: 4, padding: '10px 14px', background: 'var(--bg-tertiary)', borderRadius: '2px 12px 12px 12px' }}>
                  {[0, 1, 2].map(i => (
                    <span key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6', animation: `bounce 1.2s ${i * 0.2}s infinite`, display: 'inline-block' }}>
                      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick prompts */}
          <div style={{ padding: '0 14px 8px', display: 'flex', gap: 5, overflowX: 'auto' }}>
            {QUICK_PROMPTS.map(p => (
              <button key={p} onClick={() => sendMessage(p)} style={{ flexShrink: 0, padding: '4px 10px', borderRadius: 20, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 10, cursor: 'pointer', fontWeight: 500, whiteSpace: 'nowrap' }}>
                {p}
              </button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '10px 14px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <input
              ref={inputRef}
              className="input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage(input))}
              placeholder="Ask NexusAI anything..."
              style={{ flex: 1, fontSize: 12, padding: '9px 12px' }}
              disabled={loading}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              style={{ width: 36, height: 36, borderRadius: 10, background: input.trim() && !loading ? '#3b82f6' : 'var(--bg-tertiary)', border: 'none', cursor: input.trim() && !loading ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', flexShrink: 0 }}
            >
              <RiSendPlaneLine size={15} color={input.trim() && !loading ? 'white' : 'var(--text-muted)'} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
