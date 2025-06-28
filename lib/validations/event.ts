import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .max(200, "Le titre est trop long"),
  subtitle: z.string().max(300, "Le sous-titre est trop long").optional(),
  description: z
    .string()
    .min(10, "La description doit contenir au moins 10 caractères"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Date de début invalide",
  }),
  endDate: z
    .string()
    .optional()
    .refine((date) => !date || !isNaN(Date.parse(date)), {
      message: "Date de fin invalide",
    }),
  location: z
    .string()
    .min(1, "Le lieu est requis")
    .max(200, "Le lieu est trop long"),
  attendees: z
    .string()
    .max(100, "Le champ participants est trop long")
    .optional(),
  imageUrl: z.string().url("URL d'image invalide").optional().or(z.literal("")),
  public_id: z.string().optional(),
  link: z.string().url("URL invalide").optional().or(z.literal("")),
  featured: z.boolean().default(false),
  gradient: z.string().optional(),
  published: z.boolean().default(false),
});

export type EventFormData = z.infer<typeof eventSchema>;
