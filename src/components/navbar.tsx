import {
  Activity,
  FilePenLine,
  Headset,
  HelpCircle,
  MenuIcon,
  ScrollText,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import clsx from "clsx";

export default function Navbar() {
  return (
    <nav className="bg-primary flex h-12 items-center space-x-2 px-4 text-white">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="h-6 w-6 p-1" variant="default">
            <MenuIcon className="text-sm" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-primary border-none text-white">
          <SheetHeader className="text-left">
            <SheetTitle className="flex items-center gap-2 font-mono text-white">
              <Activity size={20} />
              Loanify
            </SheetTitle>
          </SheetHeader>
          <Button
            variant="outline"
            className="mt-4 flex h-auto w-full items-center justify-start gap-2 bg-gray-700 py-1.5"
          >
            <FilePenLine size={16} />
            Instant Loan
          </Button>
          <nav className="mt-4 grid gap-2">
            {[
              {
                title: "Track Application",
                icon: <ScrollText size={16} />,
                isActive: true,
              },
              { title: "FAQs", icon: <HelpCircle size={16} /> },
              { title: "Contact Us", icon: <Headset size={16} /> },
            ].map((link) => (
              <div
                key={link.title}
                className={clsx(
                  "flex items-center gap-2 rounded-md px-4 py-1.5 text-sm hover:bg-gray-700",
                  { "bg-primary-foreground/30 font-semibold": link.isActive },
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
