import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Search,
  Eye,
  Lock,
  Unlock,
  User,
  Users,
  ShieldCheck,
} from 'lucide-react';
import { students as mockStudents } from '@/data/mockData';
import { toast } from 'sonner';

const UsersPage = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'blocked'>('all');
  const [studentsList, setStudentsList] = useState(mockStudents);

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !student.isBlocked) ||
      (filter === 'blocked' && student.isBlocked);
    return matchesSearch && matchesFilter;
  });

  const handleBlockToggle = (studentId: string, isBlocked: boolean) => {
    setStudentsList((prev) =>
      prev.map((s) =>
        s.id === studentId ? { ...s, isBlocked: !isBlocked } : s
      )
    );
    toast.success(isBlocked ? 'Compte débloqué' : 'Compte bloqué');
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const stats = {
    total: studentsList.length,
    active: studentsList.filter((s) => !s.isBlocked).length,
    blocked: studentsList.filter((s) => s.isBlocked).length,
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('users.title')}</h1>
          <p className="mt-1 text-muted-foreground">
            {stats.total} {t('users.allUsers').toLowerCase()}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('users.allUsers')}</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-chart-2/20 p-3">
                <ShieldCheck className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('users.active')}</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-lg bg-destructive/10 p-3">
                <Lock className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t('users.blocked')}</p>
                <p className="text-2xl font-bold">{stats.blocked}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t('users.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <TabsList>
              <TabsTrigger value="all">{t('common.all')}</TabsTrigger>
              <TabsTrigger value="active">{t('users.active')}</TabsTrigger>
              <TabsTrigger value="blocked">{t('users.blocked')}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Users Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {t('common.name')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {t('common.email')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {t('profile.program')}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      {t('common.status')}
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-muted-foreground">
                      {t('common.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                        {t('common.noResults')}
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className="border-b border-border transition-colors hover:bg-muted/30"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                {getInitials(student.firstName, student.lastName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {student.firstName} {student.lastName}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {t('profile.year')} {student.year}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {student.email}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline">{student.program}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={student.isBlocked ? 'destructive' : 'default'}
                          >
                            {student.isBlocked ? t('users.blocked') : t('users.active')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <Eye className="h-4 w-4" />
                              {t('users.viewProfile')}
                            </Button>
                            <Button
                              variant={student.isBlocked ? 'outline' : 'destructive'}
                              size="sm"
                              className="gap-1"
                              onClick={() =>
                                handleBlockToggle(student.id, student.isBlocked)
                              }
                            >
                              {student.isBlocked ? (
                                <>
                                  <Unlock className="h-4 w-4" />
                                  {t('users.unblock')}
                                </>
                              ) : (
                                <>
                                  <Lock className="h-4 w-4" />
                                  {t('users.block')}
                                </>
                              )}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UsersPage;
