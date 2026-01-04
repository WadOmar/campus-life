import { useQuery } from "@tanstack/react-query";
import { activities, students } from "@/data/mockData";

export const useActivities = () => {
  return useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      return activities;
    },
  });
};

export const useActivity = (id: string) => {
    return useQuery({
        queryKey: ["activity", id],
        queryFn: async () => {
            const activity = activities.find(a => a.id === id);
            if (!activity) throw new Error("Activity not found");
            return activity;
        },
        enabled: !!id
    });
};

export const useActivityParticipants = (activityId: string) => {
    return useQuery({
        queryKey: ["activity-participants", activityId],
        queryFn: async () => {
            const activity = activities.find(a => a.id === activityId);
            if (!activity) return [];

            const participants = activity.participants.map(pId => {
                const student = students.find(s => s.id === pId);
                if (!student) return null;
                
                // Return a Shape compatible with User or what the UI expects
                return {
                    id: student.id,
                    email: student.email,
                    firstName: student.firstName,
                    lastName: student.lastName,
                    role: 'student',
                    program: student.program,
                    avatar: student.avatar
                };
            }).filter(Boolean) as any[];

            return participants;
        },
        enabled: !!activityId
    });
};
