import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateClub } from '@/hooks/useClubs';
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

const clubSchema = z.object({
  name: z.string().min(3, 'Le nom doit contenir au moins 3 caractères'),
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  category: z.string({ required_error: 'Veuillez sélectionner une catégorie' }),
  imageUrl: z.string().url('URL invalide').optional().or(z.literal('')),
});

interface CreateClubDialogProps {
  children: React.ReactNode;
}

const CreateClubDialog = ({ children }: CreateClubDialogProps) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const createClub = useCreateClub();

  const form = useForm<z.infer<typeof clubSchema>>({
    resolver: zodResolver(clubSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      imageUrl: '',
    },
  });

  const onSubmit = (values: z.infer<typeof clubSchema>) => {
    if (!user) return;

    createClub.mutate(
      {
        ...values,
        managerId: user.id,
        managerName: `${user.firstName} ${user.lastName}`,
      },
      {
        onSuccess: () => {
          toast.success('Club créé avec succès ! Il est en attente de validation.');
          setOpen(false);
          form.reset();
        },
        onError: () => {
          toast.error('Erreur lors de la création du club');
        },
      }
    );
  };

  const categories = [
    'Sport',
    'Arts',
    'Technologie',
    'Environnement',
    'Social',
    'Autre',
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('clubs.createClub') || 'Créer un club'}</DialogTitle>
          <DialogDescription>
            Remplissez les informations ci-dessous pour créer votre club.
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
                    <Input placeholder="Nom du club" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.category') || 'Catégorie'}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('common.description') || 'Description'}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description du club"
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
              <Button type="submit" disabled={createClub.isPending}>
                {createClub.isPending ? 'Création...' : t('common.create') || 'Créer'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateClubDialog;
