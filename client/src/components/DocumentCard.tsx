import { Link } from "wouter";
import { format } from "date-fns";
import { FileText, ArrowRight, Trash2 } from "lucide-react";
import { Document } from "@/hooks/use-documents";
import { UrgencyBadge } from "./UrgencyBadge";
import { Button } from "./ui/button";

interface DocumentCardProps {
  document: Document;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export function DocumentCard({ document, onDelete, isDeleting }: DocumentCardProps) {
  return (
    <div className="group relative bg-card hover:bg-card/50 border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary/10 transition-colors">
          <FileText className="w-6 h-6 text-primary" />
        </div>
        <UrgencyBadge level={document.extractedData.urgency} />
      </div>

      <h3 className="font-display font-semibold text-lg text-foreground line-clamp-1 mb-1">
        {document.title}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Scanned on {format(new Date(document.createdAt), "MMM d, yyyy")}
      </p>

      <p className="text-sm text-foreground/80 line-clamp-2 mb-6 h-10">
        {document.extractedData.summary}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive hover:text-destructive hover:bg-destructive/10 -ml-2 h-8 px-2"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(document.id);
          }}
          disabled={isDeleting}
        >
          <Trash2 className="w-4 h-4" />
        </Button>

        <Link
          href={`/document/${document.id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          View Analysis <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
