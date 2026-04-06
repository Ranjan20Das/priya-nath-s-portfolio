import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="section-container text-center">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-primary" /> by{" "}
          <span className="gradient-text font-semibold">Priya Nath</span>
        </p>
      </div>
    </footer>
  );
};
