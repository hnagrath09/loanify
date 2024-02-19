import {
  Activity,
  FilePenLine,
  Headset,
  HelpCircle,
  MenuIcon,
  ScrollText,
} from 'lucide-react';

import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import clsx from 'clsx';

export default function Navbar() {
  return (
    <nav className="flex items-center h-12 px-4 space-x-2 text-white bg-primary">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-6 h-6 p-1" variant="default">
            <MenuIcon className="text-sm" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="text-white border-none bg-primary">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2 font-mono text-white">
              <Activity size={20} />
              Loanify
            </SheetTitle>
          </SheetHeader>
          <Button
            variant="outline"
            className="w-full flex items-center gap-2 h-auto py-1.5 bg-gray-700 mt-4 justify-start"
          >
            <FilePenLine size={16} />
            Instant Loan
          </Button>
          <nav className="grid gap-2 mt-4">
            {[
              {
                title: 'Track Application',
                icon: <ScrollText size={16} />,
                isActive: true,
              },
              { title: 'FAQs', icon: <HelpCircle size={16} /> },
              { title: 'Contact Us', icon: <Headset size={16} /> },
            ].map((link) => (
              <div
                className={clsx(
                  'flex items-center gap-2 px-4 text-sm py-1.5 rounded-md hover:bg-gray-700',
                  { 'bg-primary-foreground/30 font-semibold': link.isActive }
                )}
              >
                <span>{link.icon}</span>
                <span>{link.title}</span>
              </div>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <Activity size={16} />
      <p className="font-mono font-bold">Loanify</p>
    </nav>
  );
}
