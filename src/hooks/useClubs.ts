import { useQuery } from "@tanstack/react-query";
import { clubs, activities, students } from "@/data/mockData";
import { transformUser } from "@/lib/adapters"; // Keeping for type consistency if needed, but likely rewriting logic inline

export const useClubs = () => {
  return useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      // Simulate API delay
      // await new Promise(resolve => setTimeout(resolve, 300));
      return clubs;
    },
  });
};

export const useClub = (id: string) => {
    return useQuery({
        queryKey: ["club", id],
        queryFn: async () => {
            const club = clubs.find(c => c.id === id);
            if (!club) throw new Error("Club not found");
            return club;
        },
        enabled: !!id
    });
};

export const useClubActivities = (clubId: string) => {
  return useQuery({
    queryKey: ["club-activities", clubId],
    queryFn: async () => {
      return activities.filter(a => a.clubId === clubId);
    },
    enabled: !!clubId
  });
};

interface ClubMember {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string; // 'member' | 'admin' etc
    joinedAt: string;
    program?: string;
    avatar?: string;
}

export const useClubMembers = (clubId: string) => {
  return useQuery({
    queryKey: ["club-members", clubId],
    queryFn: async () => {
      const club = clubs.find(c => c.id === clubId);
      if (!club) return [];

      // Map member IDs to student objects
      const members = club.members.map(memberId => {
          const student = students.find(s => s.id === memberId);
          if (!student) return null;
          
          return {
              id: student.id,
              email: student.email,
              firstName: student.firstName,
              lastName: student.lastName,
              role: 'member', // Default for now
              joinedAt: '2023-01-01', // Mock date
              program: student.program,
              avatar: student.avatar
          };
      }).filter(Boolean) as any[]; // using any to match previous return type expectations roughly, or compatible User type

      return members;
    },
    enabled: !!clubId
  });
};
