export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          booking_date: string
          client_id: string
          created_at: string
          id: string
          professional_id: string
          service_id: string
          status: string
        }
        Insert: {
          booking_date: string
          client_id: string
          created_at?: string
          id?: string
          professional_id: string
          service_id: string
          status?: string
        }
        Update: {
          booking_date?: string
          client_id?: string
          created_at?: string
          id?: string
          professional_id?: string
          service_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          client_id: string
          created_at: string
          id: string
          professional_id: string
          updated_at: string
        }
        Insert: {
          client_id: string
          created_at?: string
          id?: string
          professional_id: string
          updated_at?: string
        }
        Update: {
          client_id?: string
          created_at?: string
          id?: string
          professional_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      job_requests: {
        Row: {
          budget: number | null
          category: string
          client_id: string
          created_at: string
          description: string
          id: string
          location: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          budget?: number | null
          category: string
          client_id: string
          created_at?: string
          description: string
          id?: string
          location?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          budget?: number | null
          category?: string
          client_id?: string
          created_at?: string
          description?: string
          id?: string
          location?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_requests_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          is_read: boolean | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      professionals: {
        Row: {
          availability: string | null
          category: string
          daily_pay_available: boolean | null
          emergency_available: boolean | null
          hourly_rate: number | null
          id: string
          specialties: string[] | null
          verification_badge: boolean | null
          years_experience: number | null
        }
        Insert: {
          availability?: string | null
          category: string
          daily_pay_available?: boolean | null
          emergency_available?: boolean | null
          hourly_rate?: number | null
          id: string
          specialties?: string[] | null
          verification_badge?: boolean | null
          years_experience?: number | null
        }
        Update: {
          availability?: string | null
          category?: string
          daily_pay_available?: boolean | null
          emergency_available?: boolean | null
          hourly_rate?: number | null
          id?: string
          specialties?: string[] | null
          verification_badge?: boolean | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "professionals_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          is_professional: boolean | null
          last_name: string | null
          location: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          is_professional?: boolean | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          is_professional?: boolean | null
          last_name?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          completion_date: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          is_featured: boolean | null
          professional_id: string
          title: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          professional_id: string
          title: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          is_featured?: boolean | null
          professional_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          created_at: string
          estimated_days: number | null
          id: string
          job_request_id: string
          message: string | null
          price: number
          professional_id: string
          status: string | null
        }
        Insert: {
          created_at?: string
          estimated_days?: number | null
          id?: string
          job_request_id: string
          message?: string | null
          price: number
          professional_id: string
          status?: string | null
        }
        Update: {
          created_at?: string
          estimated_days?: number | null
          id?: string
          job_request_id?: string
          message?: string | null
          price?: number
          professional_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quotes_job_request_id_fkey"
            columns: ["job_request_id"]
            isOneToOne: false
            referencedRelation: "job_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quotes_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          client_id: string
          comment: string | null
          created_at: string
          id: string
          professional_id: string
          rating: number
        }
        Insert: {
          client_id: string
          comment?: string | null
          created_at?: string
          id?: string
          professional_id: string
          rating: number
        }
        Update: {
          client_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          professional_id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string
          duration: number
          id: string
          price: number
          professional_id: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          duration: number
          id?: string
          price: number
          professional_id: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          duration?: number
          id?: string
          price?: number
          professional_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "professionals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
