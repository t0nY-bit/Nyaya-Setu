import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

// Define the shape of the document response based on the schema
export interface Document {
  id: number;
  userId: string;
  title: string;
  fileUrl: string;
  originalName: string;
  mimeType: string;
  extractedData: {
    summary: string;
    keyPoints: string[];
    actionPlan: string;
    extractedFields: {
      sender?: string;
      receiver?: string;
      date?: string;
      deadline?: string;
      subject?: string;
      demands?: string[];
    };
    detectedDocType: string;
    categoryTag: string;
    urgency: "Low" | "Medium" | "High";
  };
  originalText: string | null;
  createdAt: string;
}

export function useDocuments() {
  return useQuery({
    queryKey: [api.documents.list.path],
    queryFn: async () => {
      const res = await fetch(api.documents.list.path, { credentials: "include" });
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch documents");
      return (await res.json()) as Document[];
    },
  });
}

export function useDocument(id: number) {
  return useQuery({
    queryKey: [api.documents.get.path, id],
    enabled: !isNaN(id),
    queryFn: async () => {
      const url = buildUrl(api.documents.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (res.status === 401) throw new Error("Unauthorized");
      if (!res.ok) throw new Error("Failed to fetch document");
      return (await res.json()) as Document;
    },
  });
}

export function useUploadDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ file, language }: { file: File; language: string }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("language", language);

      const res = await fetch(api.documents.upload.path, {
        method: api.documents.upload.method,
        body: formData,
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Unauthorized");
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to upload document");
      }
      
      return (await res.json()) as Document;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.documents.list.path] });
    },
  });
}

export function useDeleteDocument() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.documents.delete.path, { id });
      const res = await fetch(url, { 
        method: api.documents.delete.method, 
        credentials: "include" 
      });
      
      if (!res.ok) {
        if (res.status === 404) throw new Error("Document not found");
        if (res.status === 401) throw new Error("Unauthorized");
        throw new Error("Failed to delete document");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.documents.list.path] });
    },
  });
}
