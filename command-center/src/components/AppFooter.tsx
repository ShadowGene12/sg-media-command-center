import { Link } from "react-router-dom";

export function AppFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary" />
              <span className="font-bold">SG Media</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Strategic diagnostics and growth infrastructure for SMBs
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Diagnostics</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/diagnostics" className="hover:text-primary transition-colors">All Diagnostics</Link></li>
              <li><Link to="/diagnostics/bottleneck-scanner" className="hover:text-primary transition-colors">Bottleneck Scanner</Link></li>
              <li><Link to="/diagnostics/pillar-scorecards" className="hover:text-primary transition-colors">Pillar Scorecards</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/solutions" className="hover:text-primary transition-colors">All Solutions</Link></li>
              <li><Link to="/solutions/offer-diagnostic" className="hover:text-primary transition-colors">Offer Diagnostic</Link></li>
              <li><Link to="/solutions/growth-infrastructure" className="hover:text-primary transition-colors">Growth Infrastructure</Link></li>
              <li><Link to="/book-call" className="hover:text-primary transition-colors">Strategy Call</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><a href="https://sgmedia.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Main Website</a></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SG Media. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
