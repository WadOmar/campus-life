import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Plus,
  Calendar,
  MapPin,
  Users,
  Eye,
  UserPlus,
  UserMinus,
} from 'lucide-react';
import { activities as mockActivities } from '@/data/mockData';
import { toast } from 'sonner';

const ActivitiesPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const today = new Date().toISOString().split('T')[0];

  const filteredActivities = mockActivities.filter((activity) => {
    const matchesSearch = activity.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isUpcoming = activity.date >= today;
    const matchesFilter =
      filter === 'all' ||
      (filter === 'upcoming' && isUpcoming) ||
      (filter === 'past' && !isUpcoming);
    return matchesSearch && matchesFilter;
  });

  const canCreateActivity = user?.role === 'club_manager' || user?.role === 'admin';

  const handleRegister = (activityName: string) => {
    toast.success(`Inscription confirmée pour ${activityName}`);
  };

  const handleUnregister = (activityName: string) => {
    toast.success(`Désinscription de ${activityName}`);
  };

  const isRegistered = (activityId: string) => {
    return mockActivities
      .find((a) => a.id === activityId)
      ?.participants.includes(user?.id || '');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('activities.title')}</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredActivities.length} {t('activities.title').toLowerCase()}
            </p>
          </div>
          {canCreateActivity && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t('activities.createActivity')}
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('activities.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="upcoming">{t('activities.upcoming')}</TabsTrigger>
              <TabsTrigger value="past">{t('activities.past')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Activities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredActivities.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">{t('activities.noActivities')}</p>
              </CardContent>
            </Card>
          ) : (
            filteredActivities.map((activity) => {
              const isFull =
                activity.currentParticipants >= activity.maxParticipants;
              const placesLeft =
                activity.maxParticipants - activity.currentParticipants;
              const registered = isRegistered(activity.id);

              return (
                <Card
                  key={activity.id}
                  className="group overflow-hidden transition-all hover:shadow-lg"
                >
                  <div className="h-32 bg-gradient-to-br from-primary/20 to-accent" />
                  <CardHeader className="-mt-8 pb-2">
                    <div className="flex items-start justify-between">
                      <div className="rounded-lg bg-card p-3 shadow-md">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      {isFull ? (
                        <Badge variant="destructive">{t('activities.full')}</Badge>
                      ) : (
                        <Badge variant="secondary">
                          {placesLeft} {t('activities.placesLeft')}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="mt-4 text-xl">{activity.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {activity.date} • {activity.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {activity.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {activity.currentParticipants}/{activity.maxParticipants}{' '}
                        {t('activities.participants')}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{activity.clubName}</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        asChild
                      >
                        <Link to={`/activities/${activity.id}`}>
                          <Eye className="h-4 w-4" />
                          {t('activities.viewDetails')}
                        </Link>
                      </Button>
                      {user?.role === 'student' && (
                        registered ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="flex-1 gap-1"
                            onClick={() => handleUnregister(activity.name)}
                          >
                            <UserMinus className="h-4 w-4" />
                            {t('activities.unregister')}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1 gap-1"
                            disabled={isFull}
                            onClick={() => handleRegister(activity.name)}
                          >
                            <UserPlus className="h-4 w-4" />
                            {t('activities.register')}
                          </Button>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ActivitiesPage;
