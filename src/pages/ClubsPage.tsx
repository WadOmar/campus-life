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
import { Search, Plus, Users, Calendar, Eye, CheckCircle, Clock } from 'lucide-react';
import { clubs as mockClubs } from '@/data/mockData';
import { toast } from 'sonner';

const ClubsPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'validated' | 'pending'>('all');

  const filteredClubs = mockClubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'validated' && club.isValidated) ||
      (filter === 'pending' && !club.isValidated);
    return matchesSearch && matchesFilter;
  });

  const canCreateClub = user?.role === 'club_manager' || user?.role === 'admin';
  const canSeeAllClubs = user?.role === 'admin';

  const handleJoinClub = (clubId: string, clubName: string) => {
    toast.success(`Demande d'adhésion envoyée à ${clubName}`);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{t('clubs.title')}</h1>
            <p className="mt-1 text-muted-foreground">
              {filteredClubs.length} {t('clubs.title').toLowerCase()}
            </p>
          </div>
          {canCreateClub && (
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              {t('clubs.createClub')}
            </Button>
          )}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('clubs.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="validated">{t('clubs.validated')}</TabsTrigger>
              {canSeeAllClubs && (
                <TabsTrigger value="pending">{t('clubs.pending')}</TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* Clubs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.length === 0 ? (
            <Card className="col-span-full">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">{t('clubs.noClubs')}</p>
              </CardContent>
            </Card>
          ) : (
            filteredClubs.map((club) => (
              <Card
                key={club.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="h-32 bg-gradient-to-br from-primary/20 to-accent" />
                <CardHeader className="-mt-8 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="rounded-lg bg-card p-3 shadow-md">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <Badge
                      variant={club.isValidated ? 'default' : 'secondary'}
                      className="gap-1"
                    >
                      {club.isValidated ? (
                        <>
                          <CheckCircle className="h-3 w-3" />
                          {t('clubs.validated')}
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3" />
                          {t('clubs.pending')}
                        </>
                      )}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4 text-xl">{club.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {club.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {club.memberCount} {t('clubs.members')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {club.activityCount} {t('clubs.activities')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{club.category}</Badge>
                    <p className="text-xs text-muted-foreground">
                      {t('clubs.manager')}: {club.managerName}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1" asChild>
                      <Link to={`/clubs/${club.id}`}>
                        <Eye className="h-4 w-4" />
                        {t('clubs.viewDetails')}
                      </Link>
                    </Button>
                    {user?.role === 'student' && club.isValidated && (
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleJoinClub(club.id, club.name)}
                      >
                        {t('clubs.joinClub')}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ClubsPage;
