
import { useQuery } from '@tanstack/react-query';
import { students } from '@/data/mockData';
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Layout, Calendar, TrendingUp, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { dashboardStats as mockStats, activities, clubs } from '@/data/mockData';
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

  // Admin Stats
  const { data: adminStats } = useQuery({
    queryKey: ['dashboard-stats-admin'],
    queryFn: async () => {
      return mockStats;
    },
    enabled: user?.role === 'admin',
    initialData: mockStats 
  });

  // Club Manager Stats
  const { data: managerStats } = useQuery({
    queryKey: ['dashboard-stats-manager', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Get clubs managed by use from mock data
      const myClubs = clubs.filter(c => c.managerId === user.id);

      const totalMembers = myClubs.reduce((acc, club) => acc + (club.memberCount || 0), 0);
      const totalActivities = myClubs.reduce((acc, club) => acc + (club.activityCount || 0), 0);
      
      return {
        myClubs,
        totalMembers,
        totalActivities,
        clubsCount: myClubs.length
      };
    },
    enabled: user?.role === 'club_manager'
  });

  // Student Stats
  const { data: studentStats } = useQuery({
    queryKey: ['dashboard-stats-student', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;

      // Calculate simple stats from mock data
      // In mock data, students have 'clubs' array and 'activities' array
      
      const me = React.useMemo(() => {
          // In a real mock usage, we might re-find the student to get latest arrays, 
          // or just rely on what's in 'user' context if it's rich enough. 
          // But our Auth 'user' might be light.
          // Let's rely on finding them in the 'students' array for the full arrays.
           return (import('@/data/mockData').then(m => m.students.find(s => s.id === user.id)));
      }, [user.id]);
      
      const myProfile = await me;
      
      return {
        activitiesJoined: myProfile?.activities.length || (user.clubs?.length || 0), // Fallback
        clubsJoined: myProfile?.clubs.length || 0
      };
    },
    enabled: user?.role === 'student'
  });

  const upcomingActivities = activities.slice(0, 4);
  const popularClubs = clubs.filter((c) => c.isValidated).slice(0, 4);

  const renderAdminDashboard = () => (
    <>
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link to="/users">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.students')}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">
                +{adminStats.monthlyGrowth.students}%
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/clubs">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.clubs')}
              </CardTitle>
              <Layout className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalClubs}</div>
              <p className="text-xs text-muted-foreground">
                +{adminStats.monthlyGrowth.clubs}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/activities">
          <Card className="hover:bg-accent/50 transition-colors cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t('dashboard.activities')}
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{adminStats.totalActivities}</div>
              <p className="text-xs text-muted-foreground">
                +{adminStats.monthlyGrowth.activities}
              </p>
            </CardContent>
          </Card>
        </Link>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('dashboard.registrations')}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adminStats.totalRegistrations}</div>
            <p className="text-xs text-muted-foreground">
              +{adminStats.monthlyGrowth.registrations}%
            </p>
          </CardContent>
        </Card>
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
                <LineChart data={adminStats.registrationsByMonth}>
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
                    data={adminStats.activityCategories}
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
                    {adminStats.activityCategories.map((entry: any, index: number) => (
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
    </>
  );

  const renderManagerDashboard = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('dashboard.clubs')}</CardTitle>
          <ShieldCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{managerStats?.clubsCount || 0}</div>
          <p className="text-xs text-muted-foreground">Clubs gérés</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('common.members')}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{managerStats?.totalMembers || 0}</div>
          <p className="text-xs text-muted-foreground">Total membres inscrits</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('nav.activities')}</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{managerStats?.totalActivities || 0}</div>
          <p className="text-xs text-muted-foreground">Activités organisées</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudentDashboard = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('nav.clubs')}</CardTitle>
          <Layout className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentStats?.clubsJoined || 0}</div>
          <p className="text-xs text-muted-foreground">Clubs rejoints</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('nav.activities')}</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{studentStats?.activitiesJoined || 0}</div>
          <p className="text-xs text-muted-foreground">Activités participées</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Succès</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">Badges obtenus</p>
        </CardContent>
      </Card>
    </div>
  );

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

        {user?.role === 'admin' && renderAdminDashboard()}
        {user?.role === 'club_manager' && renderManagerDashboard()}
        {user?.role === 'student' && renderStudentDashboard()}

        {/* Bottom Sections (Common for all, or maybe hide for students?) */}
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
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
