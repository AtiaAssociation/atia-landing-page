"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { EventStatus } from "@prisma/client";
import Link from "next/link";

interface Event {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  attendees?: string;
  imageUrl?: string;
  public_id?: string;
  link?: string;
  featured: boolean;
  gradient?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  status: EventStatus;
}

const gradientOptions = [
  {
    value: "from-blue-600 via-indigo-600 to-purple-600",
    label: "Bleu → Violet",
  },
  { value: "from-green-600 via-teal-600 to-blue-600", label: "Vert → Bleu" },
  { value: "from-purple-600 via-pink-600 to-red-600", label: "Violet → Rouge" },
  { value: "from-orange-600 via-red-600 to-pink-600", label: "Orange → Rose" },
  { value: "from-teal-600 via-cyan-600 to-blue-600", label: "Teal → Cyan" },
];

export default function AdminEventsPage() {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    attendees: "",
    imageUrl: "",
    public_id: "",
    link: "",
    featured: false,
    gradient: "from-blue-600 via-indigo-600 to-purple-600",
    published: false,
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch events
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/events");
      if (!response.ok) throw new Error("Failed to fetch events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.title.trim()) errors.title = "Le titre est requis";
    if (!formData.description.trim())
      errors.description = "La description est requise";
    if (!formData.startDate) errors.startDate = "La date de début est requise";
    if (!formData.location.trim()) errors.location = "Le lieu est requis";

    if (
      formData.endDate &&
      formData.startDate &&
      formData.endDate < formData.startDate
    ) {
      errors.endDate = "La date de fin doit être après la date de début";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Image upload function
  const handleImageUpload = async (file: File) => {
    if (!file) return;

    // Validate file
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError(
        "Format d'image non supporté. Utilisez JPG, PNG, WebP ou GIF."
      );
      toast({
        title: "Format non supporté",
        description:
          "Format d'image non supporté. Utilisez JPG, PNG, WebP ou GIF.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setUploadError("L'image ne doit pas dépasser 5MB.");
      toast({
        title: "Fichier trop volumineux",
        description: "L'image ne doit pas dépasser 5MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadLoading(true);
      setUploadError(null);
      setUploadSuccess(null);

      const formData = new FormData();
      formData.append("file", file);

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();

      console.log("data", data);

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.url,
        public_id: data.public_id,
      }));
      setUploadSuccess("Image uploadée avec succès!");

      toast({
        title: "Image uploadée",
        description: "L'image a été uploadée avec succès!",
        variant: "default",
      });

      setTimeout(() => {
        setUploadSuccess(null);
        setUploadProgress(0);
      }, 3000);
    } catch (error: any) {
      setUploadError(
        error.message || "Erreur lors de l'upload. Veuillez réessayer."
      );
      setUploadProgress(0);

      toast({
        title: "Erreur d'upload",
        description:
          error.message || "Erreur lors de l'upload. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setUploadLoading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  // Redirect if not admin
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!session || session.user.role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Accès non autorisé
          </h1>
          <p className="text-gray-600 mb-4">
            Vous devez être administrateur pour accéder à cette page.
          </p>
          <Link href="/auth/signin">
            <Button className="bg-primary hover:bg-primary/80 text-white cursor-pointer">
              Authentifier
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setCreateLoading(true);
    try {
      const url = editingEvent
        ? `/api/events/${editingEvent.id}`
        : "/api/events";
      const method = editingEvent ? "PUT" : "POST";

      console.log("formData", formData);

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save event");
      await fetchEvents();

      toast({
        title: editingEvent ? "Événement mis à jour" : "Événement créé",
        description: editingEvent
          ? "L'événement a été mis à jour avec succès!"
          : "L'événement a été créé avec succès!",
        variant: "default",
      });

      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description:
          error.message || "Erreur lors de l'enregistrement de l'événement.",
        variant: "destructive",
      });
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eventToDelete) return;

    setDeleteLoading(true);
    try {
      const response = await fetch(`/api/events/${eventToDelete.id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete event");
      await fetchEvents();

      toast({
        title: "Événement supprimé",
        description: "L'événement a été supprimé avec succès!",
        variant: "default",
      });

      setDeleteDialogOpen(false);
      setEventToDelete(null);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'événement.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      attendees: "",
      imageUrl: "",
      public_id: "",
      link: "",
      featured: false,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      published: false,
    });
    setFormErrors({});
    setEditingEvent(null);
    setUploadError(null);
    setUploadSuccess(null);
    setUploadProgress(0);
  };

  const openEditDialog = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      subtitle: event.subtitle || "",
      description: event.description,
      startDate: event.startDate.split("T")[0],
      endDate: event.endDate ? event.endDate.split("T")[0] : "",
      location: event.location,
      attendees: event.attendees || "",
      imageUrl: event.imageUrl || "",
      public_id: event.public_id || "",
      link: event.link || "",
      featured: event.featured,
      gradient: event.gradient || "from-blue-600 via-indigo-600 to-purple-600",
      published: event.published,
    });
    setFormErrors({});
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR");
  };

  const removeImage = async () => {
    if (formData.public_id) {
      await deleteImageFromCloudinary(formData.public_id);
    }

    setFormData((prev) => ({ ...prev, imageUrl: "", public_id: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      title: "Image supprimée",
      description: "L'image a été supprimée avec succès!",
      variant: "default",
    });
  };

  const openCreateDialog = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      subtitle: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      attendees: "",
      imageUrl: "",
      public_id: "",
      link: "",
      featured: false,
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      published: false,
    });
    setFormErrors({});
    setUploadError(null);
    setUploadSuccess(null);
    setUploadProgress(0);
  };

  const deleteImageFromCloudinary = async (public_id: string) => {
    try {
      const response = await fetch("/api/upload/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id }),
      });

      if (!response.ok) {
        console.error("Failed to delete image from Cloudinary");
      }
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="container py-28 mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Gestion des Événements
              </h1>
              <p className="text-gray-600 mt-2">
                Gérez les événements de l'organisation ATIA
              </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={openCreateDialog}
                  className="bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel Événement
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingEvent
                      ? "Modifier l'événement"
                      : "Créer un nouvel événement"}
                  </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Informations de base
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="title">Titre *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className={`mt-1 ${
                            formErrors.title ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.title && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.title}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="subtitle">Sous-titre</Label>
                        <Input
                          id="subtitle"
                          value={formData.subtitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subtitle: e.target.value,
                            })
                          }
                          className="mt-1"
                          placeholder="Ajoutez un sous-titre descriptif (optionnel)"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          rows={4}
                          className={`mt-1 ${
                            formErrors.description ? "border-red-500" : ""
                          }`}
                          placeholder="Décrivez votre événement en détail..."
                        />
                        {formErrors.description && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Date and Location */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Date et lieu</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Date de début *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={formData.startDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              startDate: e.target.value,
                            })
                          }
                          className={`mt-1 ${
                            formErrors.startDate ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.startDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.startDate}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="endDate">Date de fin</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={formData.endDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              endDate: e.target.value,
                            })
                          }
                          className={`mt-1 ${
                            formErrors.endDate ? "border-red-500" : ""
                          }`}
                        />
                        {formErrors.endDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.endDate}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="location">Lieu *</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          className={`mt-1 ${
                            formErrors.location ? "border-red-500" : ""
                          }`}
                          placeholder="Adresse complète ou nom du lieu"
                        />
                        {formErrors.location && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors.location}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="attendees">Participants attendus</Label>
                        <Input
                          id="attendees"
                          value={formData.attendees}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              attendees: e.target.value,
                            })
                          }
                          placeholder="ex: 200+ participants"
                          className="mt-1"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="link">Lien vers plus de détails</Label>
                        <Input
                          id="link"
                          type="url"
                          value={formData.link}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              link: e.target.value,
                            })
                          }
                          placeholder="https://example.com/event-details"
                          className="mt-1"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                          Lien optionnel vers une page avec plus d'informations
                          sur l'événement
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Image de l'événement
                    </h3>

                    <div className="space-y-4">
                      {!formData.imageUrl ? (
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                          <div className="space-y-2">
                            <p className="text-gray-600">
                              Glissez-déposez une image ou cliquez pour
                              parcourir
                            </p>
                            <p className="text-sm text-gray-500">
                              JPG, PNG, WebP ou GIF (max. 5MB)
                            </p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadLoading}
                            className="mt-4"
                          >
                            {uploadLoading ? (
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                              <Upload className="w-4 h-4 mr-2" />
                            )}
                            Choisir une image
                          </Button>
                        </div>
                      ) : (
                        <div className="relative">
                          <img
                            src={formData.imageUrl}
                            alt="Preview"
                            className="w-full h-48 object-fill rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            onClick={removeImage}
                            className="absolute top-2 right-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {uploadLoading && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Upload en cours...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <Progress value={uploadProgress} className="w-full" />
                        </div>
                      )}

                      {uploadError && (
                        <Alert className="border-red-200 bg-red-50">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                          <AlertDescription className="text-red-700">
                            {uploadError}
                          </AlertDescription>
                        </Alert>
                      )}

                      {uploadSuccess && (
                        <Alert className="border-green-200 bg-green-50">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-700">
                            {uploadSuccess}
                          </AlertDescription>
                        </Alert>
                      )}

                      <div>
                        <Label htmlFor="imageUrl">
                          Ou entrez une URL d'image
                        </Label>
                        <Input
                          id="imageUrl"
                          type="url"
                          value={formData.imageUrl}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              imageUrl: e.target.value,
                            })
                          }
                          placeholder="https://example.com/image.jpg"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Styling and Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Style et paramètres</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gradient">Couleur de fond</Label>
                        <Select
                          value={formData.gradient}
                          onValueChange={(value) =>
                            setFormData({ ...formData, gradient: value })
                          }
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {gradientOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center space-x-2">
                                  <div
                                    className={`w-4 h-4 rounded bg-gradient-to-r ${option.value}`}
                                  />
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Switch
                            id="featured"
                            checked={formData.featured}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, featured: checked })
                            }
                          />
                          <Label htmlFor="featured">Événement principal</Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch
                            id="published"
                            checked={formData.published}
                            onCheckedChange={(checked) =>
                              setFormData({ ...formData, published: checked })
                            }
                          />
                          <Label htmlFor="published">Publié</Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="flex justify-end space-x-2 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      className="bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
                      disabled={createLoading}
                    >
                      {createLoading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : null}
                      {editingEvent ? "Mettre à jour" : "Créer l'événement"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                <AlertDialogDescription>
                  Êtes-vous sûr de vouloir supprimer l'événement "
                  {eventToDelete?.title}" ? Cette action est irréversible et
                  supprimera définitivement toutes les données associées.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-600 hover:bg-red-700"
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Supprimer définitivement
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          {/* Events Table */}
          <Card>
            <CardHeader>
              <CardTitle>Liste des Événements ({events.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Chargement...
                </div>
              ) : events.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">
                    Aucun événement trouvé
                  </p>
                  <p className="text-gray-400 mb-4">
                    Créez votre premier événement pour commencer
                  </p>
                  <Button
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(true);
                    }}
                    className="bg-secondary hover:bg-secondary/80 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Créer un événement
                  </Button>
                </div>
              ) : (
                <div className="w-full">
                  <div className="hidden lg:block overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Événement</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Lieu</TableHead>
                          <TableHead>Participants</TableHead>
                          <TableHead>Statut</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {events.map((event) => (
                          <TableRow key={event.id} className="hover:bg-gray-50">
                            <TableCell>
                              {event.imageUrl ? (
                                <div className="flex items-center space-x-3">
                                  <img
                                    src={event.imageUrl}
                                    alt={event.title}
                                    className="w-12 h-12 rounded-lg object-cover"
                                  />
                                  <div>
                                    <div className="font-medium text-gray-900">
                                      {event.title}
                                    </div>
                                    {event.subtitle && (
                                      <div className="text-sm text-gray-500">
                                        {event.subtitle}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div
                                  className={`flex items-center space-x-3 w-full h-14 `}
                                >
                                  <div
                                    className={`flex items-center justify-center w-12 h-12 bg-gradient-to-r ${event.gradient} rounded-lg  p-2`}
                                  >
                                    <Calendar className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <div className="font-medium ">
                                      {event.title}
                                    </div>
                                    {event.subtitle && (
                                      <div className="text-sm ">
                                        {event.subtitle}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm text-gray-600">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(event.startDate)}
                                {event.endDate &&
                                  event.endDate !== event.startDate && (
                                    <span className="ml-1">
                                      - {formatDate(event.endDate)}
                                    </span>
                                  )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center text-sm text-gray-600">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span className="truncate max-w-32">
                                  {event.location}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {event.attendees && (
                                <div className="flex items-center text-sm text-gray-600">
                                  <Users className="w-4 h-4 mr-1" />
                                  {event.attendees}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col space-y-1">
                                {event.published ? (
                                  <Badge className="bg-green-100 text-green-800 w-fit">
                                    Publié
                                  </Badge>
                                ) : (
                                  <Badge className="bg-gray-100 text-gray-800 w-fit">
                                    Brouillon
                                  </Badge>
                                )}
                                {event.featured && (
                                  <Badge className="bg-orange-100 text-orange-800 w-fit">
                                    Principal
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => openEditDialog(event)}
                                  className="hover:bg-blue-50 hover:border-blue-300"
                                >
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                                  onClick={() => handleDeleteClick(event)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="lg:hidden flex flex-col gap-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-3">
                          {event.imageUrl ? (
                            <img
                              src={event.imageUrl}
                              alt={event.title}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                          ) : (
                            <div
                              className={`w-14 h-14 rounded-lg bg-gradient-to-r ${event.gradient} flex items-center justify-center`}
                            >
                              <Calendar className="w-7 h-7 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {event.title}
                            </div>
                            {event.subtitle && (
                              <div className="text-sm text-gray-500">
                                {event.subtitle}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEditDialog(event)}
                              className="hover:bg-blue-50 hover:border-blue-300"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                              onClick={() => handleDeleteClick(event)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-600 mt-2">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(event.startDate)}
                            {event.endDate &&
                              event.endDate !== event.startDate && (
                                <span className="ml-1">
                                  - {formatDate(event.endDate)}
                                </span>
                              )}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {event.location}
                          </div>
                          {event.attendees && (
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {event.attendees}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 mt-2">
                          {event.published ? (
                            <Badge className="bg-green-100 text-green-800 w-fit">
                              Publié
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 w-fit">
                              Brouillon
                            </Badge>
                          )}
                          {event.featured && (
                            <Badge className="bg-orange-100 text-orange-800 w-fit">
                              Principal
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
