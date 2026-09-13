import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router';
import { Search, X } from 'lucide-react';
import { TOOLS } from '@/app/components/home/tools';
import { cn } from './utils';

interface HeaderSearchProps {
  className?: string;
}

export const HeaderSearch = ({ className }: HeaderSearchProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TOOLS;
    return TOOLS.filter(
      (tool) => tool.title.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => {
          setOpen((o) => !o);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        aria-label="Search tools"
        className={cn(
          'grid h-10 w-10 place-items-center rounded-full bg-secondary/10 text-secondary transition-colors hover:bg-secondary/20',
          open && 'bg-secondary/20'
        )}
      >
        <Search size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="fixed inset-x-4 top-20 z-30 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-primary/90 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2 rounded-xl border border-secondary/15 bg-secondary/5 px-3 py-2">
              <Search size={14} className="shrink-0 text-secondary/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools…"
                className="w-full bg-transparent text-sm text-secondary outline-none placeholder:text-secondary/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="shrink-0 text-secondary/40 transition-colors hover:text-secondary/70"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto">
              {results.length ? (
                results.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.id}
                      to={tool.href}
                      onClick={close}
                      className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-secondary/10"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-secondary/10 text-secondary/70">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-secondary">{tool.title}</span>
                        <span className="block truncate text-xs text-secondary/50">{tool.description}</span>
                      </span>
                    </Link>
                  );
                })
              ) : (
                <p className="px-2.5 py-2 text-xs text-secondary/50">No tools match &ldquo;{query}&rdquo;.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
