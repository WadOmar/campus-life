import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ShieldX } from 'lucide-react';

const AccessDeniedPage = () => {
  const { t } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="rounded-full bg-destructive/10 p-6">
        <ShieldX className="h-16 w-16 text-destructive" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-foreground">
        {t('errors.accessDenied')}
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        {t('errors.accessDeniedMessage')}
      </p>
      <Button asChild className="mt-6">
        <Link to="/dashboard">{t('errors.backHome')}</Link>
      </Button>
    </div>
  );
};

export default AccessDeniedPage;
