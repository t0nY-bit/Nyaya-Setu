import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useDocuments, useDeleteDocument } from "@/hooks/use-documents";
import { Button } from "@/components/ui/button";
import { UploadModal } from "@/components/UploadModal";
import { DocumentCard } from "@/components/DocumentCard";
import { Footer } from "@/components/Footer";
import { Plus, Search, Scale, User, LogOut, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { data: documents, isLoading } = useDocuments();
  const { mutate: deleteDoc, isPending: isDeleting } = useDeleteDocument();
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDocs = documents?.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.extractedData.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
              <Scale className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight hidden sm:inline">Nyaya Setu</span>
          </div>

          <div className="flex items-center gap-4">
            <Button onClick={() => setIsUploadOpen(true)} className="hidden sm:flex shadow-md shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> Scan New
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full border">
                  {user?.profileImageUrl ? (
                    <img 
                      src={user.profileImageUrl} 
                      alt={user.firstName || "User"} 
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display font-bold text-3xl">Your Documents</h1>
              <p className="text-muted-foreground mt-1">Manage and decode your legal notices.</p>
            </div>
            
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search documents..." 
                className="pl-9 bg-card"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading your documents...</p>
            </div>
          ) : filteredDocs && filteredDocs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocs.map((doc) => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onDelete={deleteDoc}
                  isDeleting={isDeleting}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] bg-card rounded-3xl border border-dashed border-muted-foreground/20 p-8 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-6">
                <Plus className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl mb-2">No documents yet</h3>
              <p className="text-muted-foreground max-w-sm mb-8">
                Upload a legal notice or contract to get an instant simplified summary and action plan.
              </p>
              <Button size="lg" onClick={() => setIsUploadOpen(true)} className="shadow-lg shadow-primary/20">
                <Plus className="w-4 h-4 mr-2" /> Upload First Document
              </Button>
            </div>
          )}
        </div>
      </main>

      <UploadModal open={isUploadOpen} onOpenChange={setIsUploadOpen} />
      
      <Footer />

      {/* Mobile FAB */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-xl shadow-primary/30 sm:hidden z-50"
        size="icon"
        onClick={() => setIsUploadOpen(true)}
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
}
