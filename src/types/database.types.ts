export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      activities: {
        Row: {
          id: string
          club_id: string
          name: string
          description: string | null
          category: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social' | 'Compétition' | 'Atelier' | 'Concert' | 'Spectacle' // Combined likely enums from mock data + schema default
          date: string
          location: string
          max_participants: number | null
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          club_id: string
          name: string
          description?: string | null
          category?: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social' | 'Compétition' | 'Atelier' | 'Concert' | 'Spectacle'
          date: string
          location: string
          max_participants?: number | null
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          club_id?: string
          name?: string
          description?: string | null
          category?: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social' | 'Compétition' | 'Atelier' | 'Concert' | 'Spectacle'
          date?: string
          location?: string
          max_participants?: number | null
          image_url?: string | null
          created_at?: string
        }
      }
      activity_participants: {
        Row: {
          activity_id: string
          student_id: string
          registered_at: string
        }
        Insert: {
          activity_id: string
          student_id: string
          registered_at?: string
        }
        Update: {
          activity_id?: string
          student_id?: string
          registered_at?: string
        }
      }
      club_members: {
        Row: {
          club_id: string
          student_id: string
          joined_at: string
          role: string | null
        }
        Insert: {
          club_id: string
          student_id: string
          joined_at?: string
          role?: string | null
        }
        Update: {
          club_id?: string
          student_id?: string
          joined_at?: string
          role?: string | null
        }
      }
      clubs: {
        Row: {
          id: string
          name: string
          description: string | null
          category: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social'
          image_url: string | null
          manager_id: string | null
          is_validated: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category?: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social'
          image_url?: string | null
          manager_id?: string | null
          is_validated?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: 'Autre' | 'Sport' | 'Arts' | 'Technologie' | 'Environnement' | 'Social'
          image_url?: string | null
          manager_id?: string | null
          is_validated?: boolean | null
          created_at?: string
        }
      }
      students: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          program: string
          year: number | null
          avatar_url: string | null
          is_blocked: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          program: string
          year?: number | null
          avatar_url?: string | null
          is_blocked?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          program?: string
          year?: number | null
          avatar_url?: string | null
          is_blocked?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
