import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCreateActivity } from '@/hooks/useClubs';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const activitySchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  date: z.string({ required_error: 'Date requise' }),
  time: z.string({ required_error: 'Heure requise' }),
  location: z.string().min(3, 'Lieu requis'),
  maxParticipants: z.string().transform((val) => parseInt(val, 10)).pipe(
    z.number().min(1, 'Au moins 1 participant')
  ),
  category: z.string({ required_error: 'Veuillez sélectionner une catégorie' }),
  imageUrl: z.string().url('URL invalide').optional().or(z.literal('')),
});

interface CreateActivityDialogProps {
  children: React.ReactNode;
  clubId: string;
  clubName: string;
}

const CreateActivityDialog = ({ children, clubId, clubName }: CreateActivityDialogProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const createActivity = useCreateActivity();

  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      time: '',
      location: '',
      maxParticipants: 0,
      category: '',
      imageUrl: '',
    },
  });

  const onSubmit = (values: z.infer<typeof activitySchema>) => {
    createActivity.mutate(
      {
        ...values,
        clubId,
        clubName,
      },
      {
        onSuccess: () => {
          toast.success('Activité créée avec succès !');
          setOpen(false);
          form.reset();
        },
        onError: () => {
          toast.error('Erreur lors de la création de l\'activité');
        },
      }
    );
  };

  const categories = [
    'Autre',
    'Sport',
    'Arts',
    'Technologie',
    'Environnement',
    'Social',
    'Compétition',
    'Atelier',
    'Concert',
    'Spectacle',
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('activities.create') || 'Créer une activité'}</DialogTitle>
          <DialogDescription>
            Ajoutez une nouvelle activité pour le club {clubName}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.name') || 'Nom'}</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de l'activité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('common.date') || 'Date'}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>{t('common.time') || 'Heure'}</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.location') || 'Lieu'}</FormLabel>
                  <FormControl>
                    <Input placeholder="Lieu de l'activité" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4">
                <FormField
                control={form.control}
                name="maxParticipants"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormLabel>Max Participants</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                 <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem className="flex-1">
                    <FormLabel>{t('common.category') || 'Catégorie'}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Catégorie" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                            {category}
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.description') || 'Description'}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description de l'activité"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL (Optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                {t('common.cancel') || 'Annuler'}
              </Button>
              <Button type="submit" disabled={createActivity.isPending}>
                {createActivity.isPending ? 'Création...' : t('common.create') || 'Créer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateActivityDialog;
