import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  fr: {
    common: {
      search: 'Rechercher',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      view: 'Voir',
      back: 'Retour',
      loading: 'Chargement...',
      noResults: 'Aucun résultat',
      actions: 'Actions',
      confirm: 'Confirmer',
      yes: 'Oui',
      no: 'Non',
      all: 'Tous',
      status: 'Statut',
      date: 'Date',
      name: 'Nom',
      email: 'Email',
      members: 'Membres',
      participants: 'Participants',
      details: 'Détails',
      description: 'Description',
      places: 'Places',
      available: 'disponibles',
    },
    nav: {
      dashboard: 'Tableau de bord',
      profile: 'Mon profil',
      clubs: 'Clubs',
      activities: 'Activités',
      users: 'Utilisateurs',
      admin: 'Administration',
      calendar: 'Calendrier',
      logout: 'Déconnexion',
    },
    auth: {
      login: 'Connexion',
      logout: 'Déconnexion',
      email: 'Adresse email',
      password: 'Mot de passe',
      forgotPassword: 'Mot de passe oublié ?',
      loginButton: 'Se connecter',
      welcome: 'Bienvenue sur Campus Life',
      subtitle: 'Connectez-vous pour accéder à votre espace',
      errors: {
        invalid_credentials: 'Email ou mot de passe incorrect',
        required_email: 'L\'email est requis',
        required_password: 'Le mot de passe est requis',
        invalid_email: 'Email invalide',
      },
    },
    dashboard: {
      title: 'Tableau de bord',
      welcome: 'Bienvenue',
      students: 'Étudiants',
      clubs: 'Clubs',
      activities: 'Activités',
      registrations: 'Inscriptions',
      recentActivities: 'Activités récentes',
      popularClubs: 'Clubs populaires',
      upcomingEvents: 'Événements à venir',
      stats: 'Statistiques',
      thisMonth: 'Ce mois',
      thisWeek: 'Cette semaine',
      evolution: 'Évolution des inscriptions',
      distribution: 'Répartition par type',
    },
    profile: {
      title: 'Mon profil',
      personalInfo: 'Informations personnelles',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      program: 'Filière',
      year: 'Année',
      myClubs: 'Mes clubs',
      myActivities: 'Mes activités',
      editProfile: 'Modifier le profil',
      changePhoto: 'Changer la photo',
    },
    clubs: {
      title: 'Clubs',
      createClub: 'Créer un club',
      allClubs: 'Tous les clubs',
      myClubs: 'Mes clubs',
      validated: 'Validé',
      pending: 'En attente',
      members: 'membres',
      activities: 'activités',
      joinClub: 'Rejoindre',
      leaveClub: 'Quitter',
      viewDetails: 'Voir détails',
      manager: 'Responsable',
      joinRequests: 'Demandes d\'adhésion',
      approve: 'Approuver',
      reject: 'Rejeter',
      noClubs: 'Aucun club trouvé',
      searchPlaceholder: 'Rechercher un club...',
      filterValidated: 'Clubs validés',
      filterPending: 'Clubs en attente',
    },
    activities: {
      title: 'Activités',
      createActivity: 'Créer une activité',
      allActivities: 'Toutes les activités',
      myActivities: 'Mes activités',
      upcoming: 'À venir',
      past: 'Passées',
      register: 'S\'inscrire',
      unregister: 'Se désinscrire',
      viewDetails: 'Voir détails',
      date: 'Date',
      time: 'Heure',
      location: 'Lieu',
      organizer: 'Organisateur',
      participants: 'participants',
      placesLeft: 'places restantes',
      full: 'Complet',
      noActivities: 'Aucune activité trouvée',
      searchPlaceholder: 'Rechercher une activité...',
      exportPdf: 'Exporter PDF',
      exportCsv: 'Exporter CSV',
    },
    users: {
      title: 'Gestion des utilisateurs',
      allUsers: 'Tous les utilisateurs',
      students: 'Étudiants',
      managers: 'Responsables',
      admins: 'Administrateurs',
      active: 'Actif',
      blocked: 'Bloqué',
      block: 'Bloquer',
      unblock: 'Débloquer',
      viewProfile: 'Voir profil',
      searchPlaceholder: 'Rechercher un utilisateur...',
    },
    admin: {
      title: 'Administration',
      platformStats: 'Statistiques de la plateforme',
      pendingClubs: 'Clubs en attente',
      validateClub: 'Valider',
      deleteClub: 'Supprimer',
      reportedActivities: 'Activités signalées',
      systemSettings: 'Paramètres système',
    },
    errors: {
      accessDenied: 'Accès refusé',
      accessDeniedMessage: 'Vous n\'avez pas les permissions nécessaires pour accéder à cette page.',
      pageNotFound: 'Page introuvable',
      pageNotFoundMessage: 'La page que vous recherchez n\'existe pas.',
      backHome: 'Retour à l\'accueil',
    },
    roles: {
      student: 'Étudiant',
      club_manager: 'Responsable de club',
      admin: 'Administrateur',
    },
  },
  en: {
    common: {
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      view: 'View',
      back: 'Back',
      loading: 'Loading...',
      noResults: 'No results',
      actions: 'Actions',
      confirm: 'Confirm',
      yes: 'Yes',
      no: 'No',
      all: 'All',
      status: 'Status',
      date: 'Date',
      name: 'Name',
      email: 'Email',
      members: 'Members',
      participants: 'Participants',
      details: 'Details',
      description: 'Description',
      places: 'Places',
      available: 'available',
    },
    nav: {
      dashboard: 'Dashboard',
      profile: 'My Profile',
      clubs: 'Clubs',
      activities: 'Activities',
      users: 'Users',
      admin: 'Administration',
      calendar: 'Calendar',
      logout: 'Logout',
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      email: 'Email address',
      password: 'Password',
      forgotPassword: 'Forgot password?',
      loginButton: 'Sign in',
      welcome: 'Welcome to Campus Life',
      subtitle: 'Sign in to access your space',
      errors: {
        invalid_credentials: 'Invalid email or password',
        required_email: 'Email is required',
        required_password: 'Password is required',
        invalid_email: 'Invalid email',
      },
    },
    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      students: 'Students',
      clubs: 'Clubs',
      activities: 'Activities',
      registrations: 'Registrations',
      recentActivities: 'Recent Activities',
      popularClubs: 'Popular Clubs',
      upcomingEvents: 'Upcoming Events',
      stats: 'Statistics',
      thisMonth: 'This month',
      thisWeek: 'This week',
      evolution: 'Registration Evolution',
      distribution: 'Distribution by Type',
    },
    profile: {
      title: 'My Profile',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      program: 'Program',
      year: 'Year',
      myClubs: 'My Clubs',
      myActivities: 'My Activities',
      editProfile: 'Edit Profile',
      changePhoto: 'Change Photo',
    },
    clubs: {
      title: 'Clubs',
      createClub: 'Create Club',
      allClubs: 'All Clubs',
      myClubs: 'My Clubs',
      validated: 'Validated',
      pending: 'Pending',
      members: 'members',
      activities: 'activities',
      joinClub: 'Join',
      leaveClub: 'Leave',
      viewDetails: 'View Details',
      manager: 'Manager',
      joinRequests: 'Join Requests',
      approve: 'Approve',
      reject: 'Reject',
      noClubs: 'No clubs found',
      searchPlaceholder: 'Search for a club...',
      filterValidated: 'Validated clubs',
      filterPending: 'Pending clubs',
    },
    activities: {
      title: 'Activities',
      createActivity: 'Create Activity',
      allActivities: 'All Activities',
      myActivities: 'My Activities',
      upcoming: 'Upcoming',
      past: 'Past',
      register: 'Register',
      unregister: 'Unregister',
      viewDetails: 'View Details',
      date: 'Date',
      time: 'Time',
      location: 'Location',
      organizer: 'Organizer',
      participants: 'participants',
      placesLeft: 'places left',
      full: 'Full',
      noActivities: 'No activities found',
      searchPlaceholder: 'Search for an activity...',
      exportPdf: 'Export PDF',
      exportCsv: 'Export CSV',
    },
    users: {
      title: 'User Management',
      allUsers: 'All Users',
      students: 'Students',
      managers: 'Managers',
      admins: 'Administrators',
      active: 'Active',
      blocked: 'Blocked',
      block: 'Block',
      unblock: 'Unblock',
      viewProfile: 'View Profile',
      searchPlaceholder: 'Search for a user...',
    },
    admin: {
      title: 'Administration',
      platformStats: 'Platform Statistics',
      pendingClubs: 'Pending Clubs',
      validateClub: 'Validate',
      deleteClub: 'Delete',
      reportedActivities: 'Reported Activities',
      systemSettings: 'System Settings',
    },
    errors: {
      accessDenied: 'Access Denied',
      accessDeniedMessage: 'You do not have permission to access this page.',
      pageNotFound: 'Page Not Found',
      pageNotFoundMessage: 'The page you are looking for does not exist.',
      backHome: 'Back to Home',
    },
    roles: {
      student: 'Student',
      club_manager: 'Club Manager',
      admin: 'Administrator',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('campus_life_lang');
    return (stored as Language) || 'fr';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('campus_life_lang', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: string | Translations = translations[language];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
