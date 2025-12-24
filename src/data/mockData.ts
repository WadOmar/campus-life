export interface Club {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  managerId: string;
  managerName: string;
  memberCount: number;
  activityCount: number;
  isValidated: boolean;
  createdAt: string;
  members: string[];
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  clubId: string;
  clubName: string;
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  participants: string[];
  image?: string;
  category: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  program: string;
  year: number;
  avatar?: string;
  isBlocked: boolean;
  clubs: string[];
  activities: string[];
  createdAt: string;
}

export const clubs: Club[] = [
  {
    id: '1',
    name: 'Club Informatique',
    description: 'Le club dédié aux passionnés de programmation, développement web, IA et nouvelles technologies. Nous organisons des hackathons, des workshops et des conférences.',
    category: 'Technologie',
    managerId: '2',
    managerName: 'Pierre Martin',
    memberCount: 45,
    activityCount: 12,
    isValidated: true,
    createdAt: '2023-09-01',
    members: ['3', '4', '5', '6', '7'],
  },
  {
    id: '2',
    name: 'Club Théâtre',
    description: 'Venez exprimer votre talent artistique ! Le club théâtre vous propose des ateliers d\'improvisation, de mise en scène et des représentations tout au long de l\'année.',
    category: 'Arts',
    managerId: '8',
    managerName: 'Émilie Rousseau',
    memberCount: 28,
    activityCount: 8,
    isValidated: true,
    createdAt: '2023-09-15',
    members: ['9', '10', '11'],
  },
  {
    id: '3',
    name: 'Club Sports Extrêmes',
    description: 'Adrénaline garantie ! Escalade, parachutisme, rafting... Rejoignez-nous pour des aventures inoubliables.',
    category: 'Sport',
    managerId: '2',
    managerName: 'Pierre Martin',
    memberCount: 32,
    activityCount: 15,
    isValidated: true,
    createdAt: '2023-10-01',
    members: ['12', '13', '14', '15'],
  },
  {
    id: '4',
    name: 'Club Écologie',
    description: 'Engagez-vous pour la planète ! Actions de sensibilisation, projets durables et initiatives vertes sur le campus.',
    category: 'Environnement',
    managerId: '16',
    managerName: 'Léa Dubois',
    memberCount: 56,
    activityCount: 10,
    isValidated: true,
    createdAt: '2023-08-20',
    members: ['3', '17', '18', '19'],
  },
  {
    id: '5',
    name: 'Club Photo',
    description: 'Capturez l\'instant ! Workshops photo, sorties shooting et expositions vous attendent.',
    category: 'Arts',
    managerId: '20',
    managerName: 'Thomas Leroy',
    memberCount: 22,
    activityCount: 6,
    isValidated: false,
    createdAt: '2024-01-10',
    members: ['21', '22'],
  },
  {
    id: '6',
    name: 'Club Musique',
    description: 'Pour les mélomanes et musiciens. Jam sessions, concerts et cours de musique entre passionnés.',
    category: 'Arts',
    managerId: '23',
    managerName: 'Julie Moreau',
    memberCount: 38,
    activityCount: 9,
    isValidated: true,
    createdAt: '2023-09-05',
    members: ['24', '25', '26'],
  },
];

export const activities: Activity[] = [
  {
    id: '1',
    name: 'Hackathon 2024',
    description: '48h de coding intensif pour créer des solutions innovantes. Prix à gagner et networking avec des entreprises tech.',
    clubId: '1',
    clubName: 'Club Informatique',
    date: '2024-03-15',
    time: '09:00',
    location: 'Amphi A - Bâtiment Central',
    maxParticipants: 100,
    currentParticipants: 78,
    participants: ['3', '4', '5', '6'],
    category: 'Compétition',
  },
  {
    id: '2',
    name: 'Atelier Improvisation',
    description: 'Découvrez les bases de l\'impro théâtrale dans une ambiance conviviale et bienveillante.',
    clubId: '2',
    clubName: 'Club Théâtre',
    date: '2024-02-20',
    time: '18:00',
    location: 'Salle de spectacle - Maison des Étudiants',
    maxParticipants: 25,
    currentParticipants: 25,
    participants: ['9', '10', '11'],
    category: 'Atelier',
  },
  {
    id: '3',
    name: 'Sortie Escalade',
    description: 'Journée escalade en salle avec initiation pour les débutants et voies pour tous niveaux.',
    clubId: '3',
    clubName: 'Club Sports Extrêmes',
    date: '2024-02-25',
    time: '10:00',
    location: 'Mur d\'escalade - Centre Sportif',
    maxParticipants: 20,
    currentParticipants: 15,
    participants: ['12', '13', '3'],
    category: 'Sport',
  },
  {
    id: '4',
    name: 'Nettoyage du Campus',
    description: 'Action collective pour rendre notre campus plus propre. Matériel fourni, bonne humeur exigée !',
    clubId: '4',
    clubName: 'Club Écologie',
    date: '2024-02-28',
    time: '14:00',
    location: 'Point de rendez-vous - Entrée principale',
    maxParticipants: 50,
    currentParticipants: 32,
    participants: ['3', '17', '18'],
    category: 'Action',
  },
  {
    id: '5',
    name: 'Workshop IA & Machine Learning',
    description: 'Introduction pratique à l\'intelligence artificielle avec des exercices sur Python et TensorFlow.',
    clubId: '1',
    clubName: 'Club Informatique',
    date: '2024-03-05',
    time: '14:00',
    location: 'Salle Info 201',
    maxParticipants: 30,
    currentParticipants: 28,
    participants: ['3', '4', '5'],
    category: 'Atelier',
  },
  {
    id: '6',
    name: 'Concert de Printemps',
    description: 'Les talents du club musique se produisent sur scène pour célébrer l\'arrivée du printemps.',
    clubId: '6',
    clubName: 'Club Musique',
    date: '2024-03-20',
    time: '20:00',
    location: 'Grande Salle - Maison des Étudiants',
    maxParticipants: 200,
    currentParticipants: 145,
    participants: ['24', '25', '26', '3'],
    category: 'Concert',
  },
  {
    id: '7',
    name: 'Représentation Théâtrale',
    description: 'Pièce de fin de semestre : "Le Malade Imaginaire" de Molière, revisité par notre troupe.',
    clubId: '2',
    clubName: 'Club Théâtre',
    date: '2024-04-10',
    time: '19:30',
    location: 'Théâtre du Campus',
    maxParticipants: 150,
    currentParticipants: 89,
    participants: ['9', '10', '11'],
    category: 'Spectacle',
  },
  {
    id: '8',
    name: 'Rafting Weekend',
    description: 'Deux jours d\'aventure en rafting. Transport et hébergement inclus.',
    clubId: '3',
    clubName: 'Club Sports Extrêmes',
    date: '2024-04-20',
    time: '07:00',
    location: 'Départ parking campus',
    maxParticipants: 24,
    currentParticipants: 18,
    participants: ['12', '13', '14'],
    category: 'Sport',
  },
];

export const students: Student[] = [
  {
    id: '3',
    firstName: 'Sophie',
    lastName: 'Bernard',
    email: 'sophie.bernard@campus.edu',
    program: 'Informatique',
    year: 3,
    isBlocked: false,
    clubs: ['1', '4'],
    activities: ['1', '3', '4', '5', '6'],
    createdAt: '2022-09-01',
  },
  {
    id: '4',
    firstName: 'Lucas',
    lastName: 'Petit',
    email: 'lucas.petit@campus.edu',
    program: 'Informatique',
    year: 2,
    isBlocked: false,
    clubs: ['1'],
    activities: ['1', '5'],
    createdAt: '2023-09-01',
  },
  {
    id: '5',
    firstName: 'Emma',
    lastName: 'Robert',
    email: 'emma.robert@campus.edu',
    program: 'Data Science',
    year: 1,
    isBlocked: false,
    clubs: ['1'],
    activities: ['1', '5'],
    createdAt: '2024-09-01',
  },
  {
    id: '9',
    firstName: 'Alexandre',
    lastName: 'Durand',
    email: 'alexandre.durand@campus.edu',
    program: 'Lettres Modernes',
    year: 2,
    isBlocked: false,
    clubs: ['2'],
    activities: ['2', '7'],
    createdAt: '2023-09-01',
  },
  {
    id: '12',
    firstName: 'Marine',
    lastName: 'Lambert',
    email: 'marine.lambert@campus.edu',
    program: 'STAPS',
    year: 3,
    isBlocked: false,
    clubs: ['3'],
    activities: ['3', '8'],
    createdAt: '2022-09-01',
  },
  {
    id: '17',
    firstName: 'Nicolas',
    lastName: 'Girard',
    email: 'nicolas.girard@campus.edu',
    program: 'Sciences Environnementales',
    year: 2,
    isBlocked: true,
    clubs: ['4'],
    activities: ['4'],
    createdAt: '2023-09-01',
  },
  {
    id: '24',
    firstName: 'Camille',
    lastName: 'Bonnet',
    email: 'camille.bonnet@campus.edu',
    program: 'Musicologie',
    year: 1,
    isBlocked: false,
    clubs: ['6'],
    activities: ['6'],
    createdAt: '2024-09-01',
  },
];

// Dashboard statistics
export const dashboardStats = {
  totalStudents: 1245,
  totalClubs: 28,
  totalActivities: 156,
  totalRegistrations: 3420,
  monthlyGrowth: {
    students: 12,
    clubs: 3,
    activities: 8,
    registrations: 15,
  },
  registrationsByMonth: [
    { month: 'Sep', count: 450 },
    { month: 'Oct', count: 520 },
    { month: 'Nov', count: 480 },
    { month: 'Dec', count: 320 },
    { month: 'Jan', count: 580 },
    { month: 'Feb', count: 620 },
  ],
  activityCategories: [
    { name: 'Sport', count: 45, color: 'hsl(var(--chart-1))' },
    { name: 'Arts', count: 38, color: 'hsl(var(--chart-2))' },
    { name: 'Tech', count: 32, color: 'hsl(var(--chart-3))' },
    { name: 'Social', count: 25, color: 'hsl(var(--chart-4))' },
    { name: 'Autre', count: 16, color: 'hsl(var(--chart-5))' },
  ],
  clubsByCategory: [
    { name: 'Sport', count: 8 },
    { name: 'Arts', count: 7 },
    { name: 'Technologie', count: 5 },
    { name: 'Environnement', count: 4 },
    { name: 'Social', count: 4 },
  ],
};
