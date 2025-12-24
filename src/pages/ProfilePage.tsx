import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Edit2, Camera, Building2, Calendar } from 'lucide-react';
import { clubs, activities } from '@/data/mockData';
import { toast } from 'sonner';

const ProfilePage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    program: user?.program || '',
    year: user?.year?.toString() || '',
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const userClubs = clubs.filter((club) =>
    user?.clubs?.includes(club.id)
  );

  const userActivities = activities.filter((activity) =>
    activity.participants.includes(user?.id || '')
  );

  const handleSave = () => {
    setIsEditing(false);
    toast.success(t('common.save'));
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">{t('profile.title')}</h1>
        </div>

        {/* Profile Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 text-2xl">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user && getInitials(user.firstName, user.lastName)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <p className="text-muted-foreground">{user?.email}</p>
                    <Badge className="mt-2" variant="secondary">
                      {user && t(`roles.${user.role}`)}
                    </Badge>
                  </div>
                  <Button
                    variant={isEditing ? 'default' : 'outline'}
                    onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                    className="gap-2"
                  >
                    <Edit2 className="h-4 w-4" />
                    {isEditing ? t('common.save') : t('profile.editProfile')}
                  </Button>
                </div>

                {/* Editable Form */}
                {isEditing && (
                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t('profile.firstName')}</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t('profile.lastName')}</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('profile.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    {user?.role === 'student' && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="program">{t('profile.program')}</Label>
                          <Input
                            id="program"
                            value={formData.program}
                            onChange={(e) =>
                              setFormData({ ...formData, program: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="year">{t('profile.year')}</Label>
                          <Input
                            id="year"
                            type="number"
                            value={formData.year}
                            onChange={(e) =>
                              setFormData({ ...formData, year: e.target.value })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Info Display */}
                {!isEditing && user?.role === 'student' && (
                  <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>
                      <strong>{t('profile.program')}:</strong> {user.program}
                    </span>
                    <span>
                      <strong>{t('profile.year')}:</strong> {user.year}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs for Clubs and Activities */}
        <Tabs defaultValue="clubs">
          <TabsList>
            <TabsTrigger value="clubs" className="gap-2">
              <Building2 className="h-4 w-4" />
              {t('profile.myClubs')} ({userClubs.length})
            </TabsTrigger>
            <TabsTrigger value="activities" className="gap-2">
              <Calendar className="h-4 w-4" />
              {t('profile.myActivities')} ({userActivities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clubs" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userClubs.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {t('clubs.noClubs')}
                  </CardContent>
                </Card>
              ) : (
                userClubs.map((club) => (
                  <Card key={club.id} className="overflow-hidden">
                    <CardHeader className="bg-accent/50">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Building2 className="h-5 w-5 text-primary" />
                        {club.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {club.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant="outline">{club.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {club.memberCount} {t('clubs.members')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {userActivities.length === 0 ? (
                <Card className="col-span-full">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {t('activities.noActivities')}
                  </CardContent>
                </Card>
              ) : (
                userActivities.map((activity) => (
                  <Card key={activity.id} className="overflow-hidden">
                    <CardHeader className="bg-accent/50">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calendar className="h-5 w-5 text-primary" />
                        {activity.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                        <p>
                          <strong>{t('activities.date')}:</strong> {activity.date}
                        </p>
                        <p>
                          <strong>{t('activities.location')}:</strong> {activity.location}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <Badge variant="outline">{activity.clubName}</Badge>
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

export default ProfilePage;
