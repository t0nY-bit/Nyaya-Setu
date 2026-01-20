import { Link } from "wouter";
import { ArrowRight, FileText, Globe, ShieldCheck, Scale, Lock } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Nyaya Setu</span>
          </div>
          
          <a href="/api/login">
            <Button variant="default" className="font-semibold shadow-lg shadow-primary/25">
              Login with Replit
            </Button>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-8 animate-in slide-in-from-left duration-700 fade-in">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-secondary/10 text-secondary-foreground border border-secondary/20 text-sm font-medium">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2"></span>
                AI-Powered Legal Assistant
              </div>
              
              <h1 className="font-display font-bold text-5xl sm:text-6xl leading-[1.1] tracking-tight text-foreground">
                Simplify Complex <br/>
                <span className="text-primary relative">
                  Legal Jargon
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-balance">
                Don't let complicated legal notices intimidate you. Upload any document, 
                and our AI will translate it into simple language and actionable steps 
                in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/api/login">
                  <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/30 w-full sm:w-auto">
                    Start Decoding Free <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700 fade-in delay-200">
              {/* Decorative elements */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-50" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-50" />

              {/* Card stack visualization */}
              <div className="relative z-10 bg-card border rounded-2xl p-6 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 premium-shadow max-w-md mx-auto">
                <div className="flex items-center gap-3 mb-6 border-b pb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Legal Notice.pdf</h3>
                    <p className="text-xs text-muted-foreground">Uploaded just now</p>
                  </div>
                  <div className="ml-auto px-2 py-1 bg-red-50 text-red-600 text-xs font-bold rounded uppercase">
                    Urgent
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                    <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="text-sm font-medium text-primary mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4" /> AI Summary
                    </p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      This is a demand notice for unpaid rent of ₹45,000. 
                      You have <span className="font-bold text-foreground bg-yellow-100 px-1 rounded">15 days</span> to respond 
                      before legal action is initiated.
                    </p>
                  </div>

                  <Button className="w-full mt-2" variant="outline">
                    View Action Plan
                  </Button>
                </div>
              </div>
            </div>

          </div>

          {/* Features Grid */}
          <div className="mt-32 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Instant OCR",
                desc: "Upload clear PDFs or photos of documents. Our system extracts text accurately in seconds."
              },
              {
                icon: Globe,
                title: "Vernacular Support",
                desc: "Get summaries in 8 Indian languages including Hindi, Marathi, Tamil, and Telugu."
              },
              {
                icon: Lock,
                title: "Secure & Private",
                desc: "Your documents are processed securely and deleted if you choose. We value your privacy."
              }
            ].map((feature, i) => (
              <div key={i} className="bg-card p-6 rounded-2xl border hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center mb-4 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
