import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { clubs, activities, students, Club, Activity } from "@/data/mockData";
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

type CreateClubData = Omit<Club, 'id' | 'createdAt' | 'memberCount' | 'activityCount' | 'members' | 'isValidated' | 'managerName'> & { managerName?: string };

export const useCreateClub = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newClub: CreateClubData) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const club: Club = {
        ...newClub,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        memberCount: 1, // Manager
        activityCount: 0,
        members: [newClub.managerId],
        isValidated: false, // Default to pending
        managerName: newClub.managerName || 'Unknown', // Fallback or ensure it's passed
      };
      
      clubs.push(club);
      return club;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
  });
};

type CreateActivityData = Omit<Activity, 'id' | 'currentParticipants' | 'participants'>;

export const useCreateActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newActivity: CreateActivityData) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const activity: Activity = {
        ...newActivity,
        id: Math.random().toString(36).substr(2, 9),
        currentParticipants: 0,
        participants: [],
      };
      
      activities.push(activity);
      
      // Update club activity count
      const club = clubs.find(c => c.id === newActivity.clubId);
      if (club) {
        club.activityCount += 1;
      }
      
      return activity;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["club-activities", variables.clubId] });
      queryClient.invalidateQueries({ queryKey: ["club", variables.clubId] }); // Update count
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

export interface ClubMember {
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
      }).filter(Boolean) as ClubMember[]; 

      return members;
    },
    enabled: !!clubId
  });
};
