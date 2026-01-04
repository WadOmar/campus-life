import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Building2,
  Download,
  UserPlus,
  UserMinus,
  Edit2,
} from 'lucide-react';
import { useActivity, useActivityParticipants } from '@/hooks/useActivities';
import { toast } from 'sonner';

const ActivityDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { t } = useLanguage();

  const { data: activity, isLoading } = useActivity(id || '');
  const { data: participants } = useActivityParticipants(id || '');

  if (isLoading) return <div className="p-8 text-center">{t('common.loading')}</div>;
  if (!activity) {
    return (
      <MainLayout>
        <div className="text-center">
          <p className="text-muted-foreground">{t('activities.noActivities')}</p>
          <Button asChild className="mt-4">
            <Link to="/activities">{t('common.back')}</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  const isFull = activity.currentParticipants >= activity.maxParticipants;
  const placesLeft = activity.maxParticipants - activity.currentParticipants;
  const isRegistered = activity.participants.includes(user?.id || '');
  const isManager = user?.role === 'club_manager' || user?.role === 'admin';

  const handleRegister = () => {
    toast.success(`Inscription confirmée pour ${activity.name}`);
  };

  const handleUnregister = () => {
    toast.success(`Désinscription de ${activity.name}`);
  };

  const participantsList = participants || [];

  const handleExportCsv = () => {
    const headers = ['Prénom', 'Nom', 'Email', 'Filière'];
    const rows = participantsList.map((p) => [
      p.firstName,
      p.lastName,
      p.email,
      p.program,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${activity.name}-participants.csv`;
    link.click();
    toast.success('Export CSV téléchargé');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Back button */}
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/activities">
            <ArrowLeft className="h-4 w-4" />
            {t('common.back')}
          </Link>
        </Button>

        {/* Activity Header */}
        <Card>
          <div className="h-48 bg-gradient-to-br from-primary/20 to-accent" />
          <CardContent className="-mt-16 pb-6">
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex items-end gap-4">
                <div className="rounded-xl bg-card p-4 shadow-lg">
                  <Calendar className="h-12 w-12 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                      {activity.name}
                    </h1>
                    {isFull ? (
                      <Badge variant="destructive">{t('activities.full')}</Badge>
                    ) : (
                      <Badge variant="secondary">
                        {placesLeft} {t('activities.placesLeft')}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground">{activity.category}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {isManager && (
                  <Button variant="outline" className="gap-2">
                    <Edit2 className="h-4 w-4" />
                    {t('common.edit')}
                  </Button>
                )}
                {user?.role === 'student' && (
                  isRegistered ? (
                    <Button variant="destructive" onClick={handleUnregister} className="gap-2">
                      <UserMinus className="h-4 w-4" />
                      {t('activities.unregister')}
                    </Button>
                  ) : (
                    <Button onClick={handleRegister} disabled={isFull} className="gap-2">
                      <UserPlus className="h-4 w-4" />
                      {t('activities.register')}
                    </Button>
                  )
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Details */}
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{t('common.description')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{activity.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('common.details')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('activities.date')}</p>
                  <p className="font-medium">{activity.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('activities.time')}</p>
                  <p className="font-medium">{activity.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('activities.location')}</p>
                  <p className="font-medium">{activity.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('activities.organizer')}</p>
                  <p className="font-medium">{activity.clubName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t('common.participants')}</p>
                  <p className="font-medium">
                    {activity.currentParticipants}/{activity.maxParticipants}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {t('common.participants')} ({participantsList.length})
            </CardTitle>
            {isManager && participantsList.length > 0 && (
              <Button variant="outline" size="sm" onClick={handleExportCsv} className="gap-2">
                <Download className="h-4 w-4" />
                {t('activities.exportCsv')}
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {participantsList.length === 0 ? (
              <p className="text-center text-muted-foreground">{t('common.noResults')}</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {participantsList.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center gap-3 rounded-lg border border-border p-3"
                  >
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {getInitials(participant.firstName, participant.lastName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate font-medium">
                        {participant.firstName} {participant.lastName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {participant.program}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ActivityDetailPage;
