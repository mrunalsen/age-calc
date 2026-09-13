import { Link } from 'react-router';
import { Sparkles } from 'lucide-react';
import { BackgroundPicker } from '@/components/ui/background-picker';
import { HeaderSearch } from '@/components/ui/header-search';
import type { BubbleBackgroundOption } from '@/components/ui/bubble-backgrounds';

interface HeaderProps {
  background: BubbleBackgroundOption;
  onBackgroundChange: (option: BubbleBackgroundOption) => void;
}

const Header = ({ background, onBackgroundChange }: HeaderProps) => {
  return (
    <header className="fixed inset-x-4 top-4 z-30 mx-auto max-w-2xl rounded-2xl border border-white/10 bg-primary/60 shadow-lg shadow-black/20 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2 text-secondary">
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 text-white">
            <Sparkles size={16} />
          </span>
          <h2 className="text-base font-semibold tracking-tight">Pocket Tools</h2>
        </Link>
        <div className="flex items-center gap-2">
          <HeaderSearch />
          <BackgroundPicker value={background} onChange={onBackgroundChange} />
        </div>
      </div>
    </header>
  );
};

export default Header;
