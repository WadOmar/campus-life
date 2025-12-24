import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Users,
  Calendar,
  User,
  CheckCircle,
  Clock,
  Edit2,
} from 'lucide-react';
import { clubs, activities, students } from '@/data/mockData';
import { toast } from 'sonner';

const ClubDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();

  const club = clubs.find((c) => c.id === id);
  const clubActivities = activities.filter((a) => a.clubId === id);
  const clubMembers = students.filter((s) => s.clubs.includes(id || ''));

  if (!club) {
    return (
      <MainLayout>
        <div className="text-center">
          <p className="text-muted-foreground">{t('clubs.noClubs')}</p>
          <Button asChild className="mt-4">
            <Link to="/clubs">{t('common.back')}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const isManager = user?.id === club.managerId || user?.role === 'admin';
  const isMember = user?.clubs?.includes(club.id);

  const handleJoin = () => {
    toast.success(`Demande d'adhésion envoyée à ${club.name}`);
  };

  const handleLeave = () => {
    toast.success(`Vous avez quitté ${club.name}`);
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/clubs">
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Link>
        </Button>

        {/* Club Header */}
        <Card>
          <div className="h-40 bg-gradient-to-br from-primary/20 to-accent" />
          <CardContent className="-mt-16 pb-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <div className="rounded-xl bg-card p-4 shadow-lg">
                  <Users className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                      {club.name}
                    </h1>
                    <Badge variant={club.isValidated ? 'default' : 'secondary'}>
                      {club.isValidated ? (
                        <>
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {t('clubs.validated')}
                        </>
                      ) : (
                        <>
                          <Clock className="mr-1 h-3 w-3" />
                          {t('clubs.pending')}
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{club.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {isManager && (
                  <Button variant="outline" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    {t('common.edit')}
                  </Button>
                )}
                {user?.role === 'student' && !isMember && club.isValidated && (
                  <Button onClick={handleJoin}>{t('clubs.joinClub')}</Button>
                )}
                {user?.role === 'student' && isMember && (
                  <Button variant="destructive" onClick={handleLeave}>
                    {t('clubs.leaveClub')}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Club Info */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('common.description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{club.description}</p>
              <div className="mt-6 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>{t('clubs.manager')}:</strong> {club.managerName}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.stats')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('common.members')}</span>
                <span className="text-xl font-bold">{club.memberCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t('activities.title')}</span>
                <span className="text-xl font-bold">{club.activityCount}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="activities">
          <TabsList>
            <TabsTrigger value="activities" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t('activities.title')} ({clubActivities.length})
            </TabsTrigger>
            <TabsTrigger value="members" className="gap-2">
              <Users className="h-4 w-4" />
              {t('common.members')} ({clubMembers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {clubActivities.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {t('activities.noActivities')}
                  </CardContent>
                </Card>
              ) : (
                clubActivities.map((activity) => (
                  <Card key={activity.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">{activity.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {activity.date} • {activity.time}
                        </span>
                        <Badge variant="secondary">
                          {activity.currentParticipants}/{activity.maxParticipants}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {clubMembers.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {t('common.noResults')}
                  </CardContent>
                </Card>
              ) : (
                clubMembers.map((member) => (
                  <Card key={member.id}>
                    <CardContent className="flex items-center gap-4 p-4">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(member.firstName, member.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">
                          {member.firstName} {member.lastName}
                        </p>
                        <p className="text-sm text-muted-foreground">{member.program}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default ClubDetailPage;
