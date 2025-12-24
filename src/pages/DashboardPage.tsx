import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building2, Calendar, ClipboardList, TrendingUp, ArrowRight } from 'lucide-react';
import { dashboardStats, activities, clubs } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DashboardPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

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

  const upcomingActivities = activities.slice(0, 4);
  const popularClubs = clubs.filter((c) => c.isValidated).slice(0, 4);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('dashboard.welcome')}, {user?.firstName}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            {new Date().toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="relative overflow-hidden">
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
                        <span className="text-muted-foreground">
                          {t('dashboard.thisMonth')}
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

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Registration Evolution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('dashboard.evolution')}</CardTitle>
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

          {/* Activity Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t('dashboard.distribution')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardStats.activityCategories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="count"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {dashboardStats.activityCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Sections */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upcoming Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('dashboard.upcomingEvents')}</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/activities" className="gap-1">
                  {t('common.view')} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{activity.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.clubName} • {activity.date}
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {activity.currentParticipants}/{activity.maxParticipants}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Clubs */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{t('dashboard.popularClubs')}</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/clubs" className="gap-1">
                  {t('common.view')} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularClubs.map((club) => (
                  <div
                    key={club.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{club.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {club.memberCount} {t('clubs.members')} • {club.activityCount}{' '}
                        {t('clubs.activities')}
                      </p>
                    </div>
                    <Badge>{club.category}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clubs by Category Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('dashboard.stats')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardStats.clubsByCategory}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: 'var(--radius)',
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
