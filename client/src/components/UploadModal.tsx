import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UploadCloud, File, X } from "lucide-react";
import { useUploadDocument } from "@/hooks/use-documents";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState("English");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const { mutate: upload, isPending } = useUploadDocument();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!file) return;

    upload(
      { file, language },
      {
        onSuccess: (data) => {
          toast({
            title: "Success!",
            description: "Document processed successfully.",
          });
          onOpenChange(false);
          setFile(null);
          setLocation(`/document/${data.id}`);
        },
        onError: (error) => {
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 overflow-hidden rounded-2xl">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-display text-center">Scan New Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Drop Zone */}
          <div
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
              ${file ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"}
            `}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
            />

            {file ? (
              <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-3">
                  <File className="w-6 h-6 text-primary" />
                </div>
                <p className="font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-4 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="w-4 h-4 mr-2" /> Remove File
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center cursor-pointer">
                <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                  <UploadCloud className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium text-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF or Images (JPG, PNG) up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Language Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Simplify Output Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="Marathi">Marathi</SelectItem>
                <SelectItem value="Gujarati">Gujarati</SelectItem>
                <SelectItem value="Tamil">Tamil</SelectItem>
                <SelectItem value="Telugu">Telugu</SelectItem>
                <SelectItem value="Kannada">Kannada</SelectItem>
                <SelectItem value="Bengali">Bengali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full h-11 text-base font-semibold shadow-lg shadow-primary/20"
            disabled={!file || isPending}
            onClick={handleSubmit}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Decoding with AI...
              </>
            ) : (
              "Process Document"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
