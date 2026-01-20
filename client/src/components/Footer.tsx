import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Nyaya Setu</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} Nyaya Setu. Making Justice Accessible.</p>
            <p className="mt-1 text-xs">AI-generated content should be verified by a legal professional.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
