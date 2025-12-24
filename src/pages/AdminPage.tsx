import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  Building2,
  Calendar,
  ClipboardList,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  TrendingUp,
} from 'lucide-react';
import { clubs, activities, dashboardStats } from '@/data/mockData';
import { toast } from 'sonner';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const AdminPage = () => {
  const { t } = useLanguage();
  const [clubsList, setClubsList] = useState(clubs);

  const pendingClubs = clubsList.filter((c) => !c.isValidated);

  const handleValidateClub = (clubId: string) => {
    setClubsList((prev) =>
      prev.map((c) => (c.id === clubId ? { ...c, isValidated: true } : c))
    );
    toast.success('Club validé avec succès');
  };

  const handleDeleteClub = (clubId: string) => {
    setClubsList((prev) => prev.filter((c) => c.id !== clubId));
    toast.success('Club supprimé');
  };

  const stats = [
    {
      label: t('dashboard.students'),
      value: dashboardStats.totalStudents.toLocaleString(),
      icon: Users,
      growth: dashboardStats.monthlyGrowth.students,
      color: 'text-chart-1',
      bgColor: 'bg-chart-1/10',
    },
    {
      label: t('dashboard.clubs'),
      value: dashboardStats.totalClubs.toString(),
      icon: Building2,
      growth: dashboardStats.monthlyGrowth.clubs,
      color: 'text-chart-2',
      bgColor: 'bg-chart-2/10',
    },
    {
      label: t('dashboard.activities'),
      value: dashboardStats.totalActivities.toString(),
      icon: Calendar,
      growth: dashboardStats.monthlyGrowth.activities,
      color: 'text-chart-3',
      bgColor: 'bg-chart-3/10',
    },
    {
      label: t('dashboard.registrations'),
      value: dashboardStats.totalRegistrations.toLocaleString(),
      icon: ClipboardList,
      growth: dashboardStats.monthlyGrowth.registrations,
      color: 'text-chart-4',
      bgColor: 'bg-chart-4/10',
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('admin.title')}</h1>
          <p className="mt-1 text-muted-foreground">{t('admin.platformStats')}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="font-medium text-primary">
                          +{stat.growth}%
                        </span>
                      </div>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dashboard.evolution')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dashboardStats.registrationsByMonth}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="pending-clubs">
          <TabsList>
            <TabsTrigger value="pending-clubs" className="gap-2">
              <Building2 className="h-4 w-4" />
              {t('admin.pendingClubs')} ({pendingClubs.length})
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              {t('admin.systemSettings')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending-clubs" className="mt-4">
            <Card>
              <CardContent className="p-0">
                {pendingClubs.length === 0 ? (
                  <div className="p-12 text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                    <p className="mt-4 text-muted-foreground">
                      {t('common.noResults')}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {pendingClubs.map((club) => (
                      <div
                        key={club.id}
                        className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="rounded-lg bg-accent p-3">
                            <Building2 className="h-6 w-6 text-accent-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground">
                              {club.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {t('clubs.manager')}: {club.managerName} •{' '}
                              {club.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleValidateClub(club.id)}
                          >
                            <CheckCircle className="h-4 w-4" />
                            {t('admin.validateClub')}
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleDeleteClub(club.id)}
                          >
                            <XCircle className="h-4 w-4" />
                            {t('admin.deleteClub')}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {t('admin.systemSettings')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Mode maintenance</p>
                    <p className="text-sm text-muted-foreground">
                      Activer le mode maintenance pour bloquer l'accès à la plateforme
                    </p>
                  </div>
                  <Button variant="outline">Désactivé</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Notifications email</p>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des notifications par email aux utilisateurs
                    </p>
                  </div>
                  <Button variant="default">Activé</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Inscriptions automatiques</p>
                    <p className="text-sm text-muted-foreground">
                      Permettre les inscriptions sans validation d'un administrateur
                    </p>
                  </div>
                  <Button variant="default">Activé</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AdminPage;
