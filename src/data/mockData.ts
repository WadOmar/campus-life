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
    id: "1",
    name: "Club AI & Dev",
    description:
      "Le hub des passionnés de Tech au Maroc. Hackathons, workshops sur l'IA et préparation aux compétitions nationales de programmation (MCPC).",
    category: "Technologie",
    managerId: "2",
    managerName: "Amine El Alami",
    memberCount: 65,
    activityCount: 14,
    isValidated: true,
    createdAt: "2023-09-01",
    members: ["3", "4", "5", "6", "7"],
  },
  {
    id: "2",
    name: "Club Théâtre & Culture",
    description:
      "De Molière à Tayeb Saddiki. Rejoignez-nous pour des ateliers d'expression scénique et des spectacles célébrant notre patrimoine culturel.",
    category: "Arts",
    managerId: "8",
    managerName: "Kenza Berrada",
    memberCount: 28,
    activityCount: 8,
    isValidated: true,
    createdAt: "2023-09-15",
    members: ["9", "10", "11"],
  },
  {
    id: "3",
    name: "Atlas Aventures",
    description:
      "Adrénaline 100% marocaine ! Randonnées au Toubkal, surf à Taghazout et escalade. L'aventure commence ici.",
    category: "Sport",
    managerId: "2",
    managerName: "Amine El Alami",
    memberCount: 42,
    activityCount: 15,
    isValidated: true,
    createdAt: "2023-10-01",
    members: ["12", "13", "14", "15"],
  },
  {
    id: "4",
    name: "Green Campus",
    description:
      "Pour un Maroc vert ! Actions de reboisement, sensibilisation au tri sélectif et initiatives durables au sein de l'université.",
    category: "Environnement",
    managerId: "16",
    managerName: "Youssef Chraibi",
    memberCount: 56,
    activityCount: 10,
    isValidated: true,
    createdAt: "2023-08-20",
    members: ["3", "17", "18", "19"],
  },
  {
    id: "5",
    name: "Club Photo & Vidéo",
    description:
      "Capturez la beauté du Royaume. Sorties shooting dans la médina, couverture des événements campus et expositions.",
    category: "Arts",
    managerId: "20",
    managerName: "Karim Tazi",
    memberCount: 22,
    activityCount: 6,
    isValidated: false,
    createdAt: "2024-01-10",
    members: ["21", "22"],
  },
  {
    id: "6",
    name: "Club Musique Fusion",
    description:
      "Quand le Jazz rencontre le Gnawa. Jam sessions, concerts caritatifs et cours de musique pour tous les niveaux.",
    category: "Arts",
    managerId: "23",
    managerName: "Hiba Bennani",
    memberCount: 38,
    activityCount: 9,
    isValidated: true,
    createdAt: "2023-09-05",
    members: ["24", "25", "26"],
  },
];

export const activities: Activity[] = [
  {
    id: "1",
    name: "Hackathon Innov'Maroc",
    description:
      "48h de coding pour digitaliser les PME marocaines. Prix à gagner et networking avec des startups du Technopark.",
    clubId: "1",
    clubName: "Club AI & Dev",
    date: "2024-03-15",
    time: "09:00",
    location: "Amphi Al Khawarizmi - Bâtiment C",
    maxParticipants: 100,
    currentParticipants: 85,
    participants: ["3", "4", "5", "6"],
    category: "Compétition",
  },
  {
    id: "2",
    name: "Atelier Halqa & Impro",
    description:
      "Revisiter l'art du conteur (Al Halqa) avec des techniques d'improvisation modernes. Ambiance conviviale garantie.",
    clubId: "2",
    clubName: "Club Théâtre & Culture",
    date: "2024-02-20",
    time: "18:30",
    location: "Salle Ibn Khaldoun",
    maxParticipants: 30,
    currentParticipants: 25,
    participants: ["9", "10", "11"],
    category: "Atelier",
  },
  {
    id: "3",
    name: "Ascension du Toubkal",
    description:
      "Week-end trekking vers le sommet de l'Afrique du Nord. Guide professionnel et transport inclus.",
    clubId: "3",
    clubName: "Atlas Aventures",
    date: "2024-02-25",
    time: "06:00",
    location: "Départ Parking Principal",
    maxParticipants: 20,
    currentParticipants: 18,
    participants: ["12", "13", "3"],
    category: "Sport",
  },
  {
    id: "4",
    name: "Nettoyage Plage",
    description:
      "Action citoyenne pour nettoyer le littoral. Gants et sacs fournis. Soyons le changement !",
    clubId: "4",
    clubName: "Green Campus",
    date: "2024-02-28",
    time: "10:00",
    location: "Point de rdv : Entrée Campus",
    maxParticipants: 60,
    currentParticipants: 45,
    participants: ["3", "17", "18"],
    category: "Action",
  },
  {
    id: "5",
    name: "Workshop Data & Python",
    description:
      "Introduction à la Data Science. Analyse de datasets réels (Statistiques HCP, Maroc Météo).",
    clubId: "1",
    clubName: "Club AI & Dev",
    date: "2024-03-05",
    time: "14:30",
    location: "Salle Info 2",
    maxParticipants: 35,
    currentParticipants: 30,
    participants: ["3", "4", "5"],
    category: "Atelier",
  },
  {
    id: "6",
    name: "Soirée Chaabi-Fusion",
    description:
      "Grand concert de printemps mêlant rythmes traditionnels et sonorités modernes.",
    clubId: "6",
    clubName: "Club Musique Fusion",
    date: "2024-03-20",
    time: "20:30",
    location: "Grande Salle de Conférences",
    maxParticipants: 250,
    currentParticipants: 180,
    participants: ["24", "25", "26", "3"],
    category: "Concert",
  },
  {
    id: "7",
    name: 'Pièce: "Le Pain Nu"',
    description:
      "Adaptation théâtrale de l'œuvre de Mohamed Choukri. Une plongée émouvante dans la littérature marocaine.",
    clubId: "2",
    clubName: "Club Théâtre & Culture",
    date: "2024-04-10",
    time: "19:00",
    location: "Théâtre Universitaire",
    maxParticipants: 150,
    currentParticipants: 110,
    participants: ["9", "10", "11"],
    category: "Spectacle",
  },
  {
    id: "8",
    name: "Rafting Ouzoud",
    description:
      "Journée sensations fortes aux cascades d'Ouzoud. Déjeuner traditionnel inclus.",
    clubId: "3",
    clubName: "Atlas Aventures",
    date: "2024-04-20",
    time: "07:30",
    location: "Départ Bus - Porte B",
    maxParticipants: 24,
    currentParticipants: 22,
    participants: ["12", "13", "14"],
    category: "Sport",
  },
];

export const students: Student[] = [
  {
    id: "3",
    firstName: "Salma",
    lastName: "Benjelloun",
    email: "salma.benjelloun@campus.ma",
    program: "Génie Informatique",
    year: 3,
    isBlocked: false,
    clubs: ["1", "4"],
    activities: ["1", "3", "4", "5", "6"],
    createdAt: "2022-09-01",
  },
  {
    id: "4",
    firstName: "Omar",
    lastName: "Ait Ahmed",
    email: "omar.aitahmed@campus.ma",
    program: "Développement Web",
    year: 2,
    isBlocked: false,
    clubs: ["1"],
    activities: ["1", "5"],
    createdAt: "2023-09-01",
  },
  {
    id: "5",
    firstName: "Rim",
    lastName: "El Fassi",
    email: "rim.elfassi@campus.ma",
    program: "Data Science & IA",
    year: 1,
    isBlocked: false,
    clubs: ["1"],
    activities: ["1", "5"],
    createdAt: "2024-09-01",
  },
  {
    id: "9",
    firstName: "Mehdi",
    lastName: "Bouanani",
    email: "mehdi.bouanani@campus.ma",
    program: "Littérature Arabe",
    year: 2,
    isBlocked: false,
    clubs: ["2"],
    activities: ["2", "7"],
    createdAt: "2023-09-01",
  },
  {
    id: "12",
    firstName: "Noura",
    lastName: "Cheddadi",
    email: "noura.cheddadi@campus.ma",
    program: "Management du Sport",
    year: 3,
    isBlocked: false,
    clubs: ["3"],
    activities: ["3", "8"],
    createdAt: "2022-09-01",
  },
  {
    id: "17",
    firstName: "Yassine",
    lastName: "Mansouri",
    email: "yassine.mansouri@campus.ma",
    program: "Génie de l'Eau et Env.",
    year: 2,
    isBlocked: true,
    clubs: ["4"],
    activities: ["4"],
    createdAt: "2023-09-01",
  },
  {
    id: "24",
    firstName: "Fatima Zahra",
    lastName: "Alami",
    email: "fz.alami@campus.ma",
    program: "Musicologie",
    year: 1,
    isBlocked: false,
    clubs: ["6"],
    activities: ["6"],
    createdAt: "2024-09-01",
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
    { month: "Sep", count: 450 },
    { month: "Oct", count: 520 },
    { month: "Nov", count: 480 },
    { month: "Dec", count: 320 },
    { month: "Jan", count: 580 },
    { month: "Feb", count: 620 },
  ],
  activityCategories: [
    { name: "Sport", count: 45, color: "hsl(var(--chart-1))" },
    { name: "Arts", count: 38, color: "hsl(var(--chart-2))" },
    { name: "Tech", count: 32, color: "hsl(var(--chart-3))" },
    { name: "Social", count: 25, color: "hsl(var(--chart-4))" },
    { name: "Autre", count: 16, color: "hsl(var(--chart-5))" },
  ],
  clubsByCategory: [
    { name: "Sport", count: 8 },
    { name: "Arts", count: 7 },
    { name: "Technologie", count: 5 },
    { name: "Environnement", count: 4 },
    { name: "Social", count: 4 },
  ],
};
