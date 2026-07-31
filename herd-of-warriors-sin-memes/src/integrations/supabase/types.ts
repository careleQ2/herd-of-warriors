export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      events: {
        Row: {
          cartelera: Json
          combate_principal: string | null
          created_at: string
          donde_verlo: string | null
          fecha: string
          id: string
          nombre: string
          organization_id: string | null
          poster_url: string | null
          ubicacion: string | null
        }
        Insert: {
          cartelera?: Json
          combate_principal?: string | null
          created_at?: string
          donde_verlo?: string | null
          fecha: string
          id?: string
          nombre: string
          organization_id?: string | null
          poster_url?: string | null
          ubicacion?: string | null
        }
        Update: {
          cartelera?: Json
          combate_principal?: string | null
          created_at?: string
          donde_verlo?: string | null
          fecha?: string
          id?: string
          nombre?: string
          organization_id?: string | null
          poster_url?: string | null
          ubicacion?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      fighter_follows: {
        Row: {
          created_at: string
          fighter_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          fighter_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          fighter_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fighter_follows_fighter_id_fkey"
            columns: ["fighter_id"]
            isOneToOne: false
            referencedRelation: "fighters"
            referencedColumns: ["id"]
          },
        ]
      }
      fighter_suggestions: {
        Row: {
          created_at: string
          disciplina: string | null
          estado: string
          id: string
          nombre: string
          organizacion: string | null
          url_perfil: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          disciplina?: string | null
          estado?: string
          id?: string
          nombre: string
          organizacion?: string | null
          url_perfil?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          disciplina?: string | null
          estado?: string
          id?: string
          nombre?: string
          organizacion?: string | null
          url_perfil?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      fighters: {
        Row: {
          altura_cm: number | null
          apodo: string | null
          biografia: string | null
          categoria_peso: string | null
          created_at: string
          descripcion_fisica: string | null
          disciplinas: string[]
          estado: string
          estilo_pelea: string | null
          fecha_actualizacion: string
          fecha_nacimiento: string | null
          foto_url: string | null
          fuente_datos: string | null
          id: string
          logros_principales: string[]
          metodo_victorias_decision: number
          metodo_victorias_ko: number
          metodo_victorias_sub: number
          nombre: string
          organizacion: string | null
          organizaciones_historial: string[]
          pais: string | null
          peso_kg: number | null
          record_derrotas: number
          record_empates: number
          record_nc: number
          record_victorias: number
          seguidores_count: number
          trayectoria: Json
          ultima_pelea_fecha: string | null
          ultima_pelea_resultado: string | null
          ultima_pelea_rival: string | null
          url_perfil_externo: string | null
        }
        Insert: {
          altura_cm?: number | null
          apodo?: string | null
          biografia?: string | null
          categoria_peso?: string | null
          created_at?: string
          descripcion_fisica?: string | null
          disciplinas?: string[]
          estado?: string
          estilo_pelea?: string | null
          fecha_actualizacion?: string
          fecha_nacimiento?: string | null
          foto_url?: string | null
          fuente_datos?: string | null
          id?: string
          logros_principales?: string[]
          metodo_victorias_decision?: number
          metodo_victorias_ko?: number
          metodo_victorias_sub?: number
          nombre: string
          organizacion?: string | null
          organizaciones_historial?: string[]
          pais?: string | null
          peso_kg?: number | null
          record_derrotas?: number
          record_empates?: number
          record_nc?: number
          record_victorias?: number
          seguidores_count?: number
          trayectoria?: Json
          ultima_pelea_fecha?: string | null
          ultima_pelea_resultado?: string | null
          ultima_pelea_rival?: string | null
          url_perfil_externo?: string | null
        }
        Update: {
          altura_cm?: number | null
          apodo?: string | null
          biografia?: string | null
          categoria_peso?: string | null
          created_at?: string
          descripcion_fisica?: string | null
          disciplinas?: string[]
          estado?: string
          estilo_pelea?: string | null
          fecha_actualizacion?: string
          fecha_nacimiento?: string | null
          foto_url?: string | null
          fuente_datos?: string | null
          id?: string
          logros_principales?: string[]
          metodo_victorias_decision?: number
          metodo_victorias_ko?: number
          metodo_victorias_sub?: number
          nombre?: string
          organizacion?: string | null
          organizaciones_historial?: string[]
          pais?: string | null
          peso_kg?: number | null
          record_derrotas?: number
          record_empates?: number
          record_nc?: number
          record_victorias?: number
          seguidores_count?: number
          trayectoria?: Json
          ultima_pelea_fecha?: string | null
          ultima_pelea_resultado?: string | null
          ultima_pelea_rival?: string | null
          url_perfil_externo?: string | null
        }
        Relationships: []
      }
      gyms: {
        Row: {
          ciudad: string | null
          created_at: string
          descripcion: string | null
          direccion: string
          disciplinas: string[]
          fotos: string[]
          horarios: string | null
          id: string
          latitud: number
          longitud: number
          nombre: string
          precio_mensual: number | null
          telefono: string | null
          updated_at: string
          web: string | null
        }
        Insert: {
          ciudad?: string | null
          created_at?: string
          descripcion?: string | null
          direccion: string
          disciplinas?: string[]
          fotos?: string[]
          horarios?: string | null
          id?: string
          latitud: number
          longitud: number
          nombre: string
          precio_mensual?: number | null
          telefono?: string | null
          updated_at?: string
          web?: string | null
        }
        Update: {
          ciudad?: string | null
          created_at?: string
          descripcion?: string | null
          direccion?: string
          disciplinas?: string[]
          fotos?: string[]
          horarios?: string | null
          id?: string
          latitud?: number
          longitud?: number
          nombre?: string
          precio_mensual?: number | null
          telefono?: string | null
          updated_at?: string
          web?: string | null
        }
        Relationships: []
      }
      meme_likes: {
        Row: {
          created_at: string
          meme_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          meme_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          meme_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "meme_likes_meme_id_fkey"
            columns: ["meme_id"]
            isOneToOne: false
            referencedRelation: "memes"
            referencedColumns: ["id"]
          },
        ]
      }
      memes: {
        Row: {
          autor: string
          caption: string | null
          comments_count: number
          created_at: string
          disciplina: string
          id: string
          likes_count: number
          media_type: string
          media_url: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          autor: string
          caption?: string | null
          comments_count?: number
          created_at?: string
          disciplina: string
          id?: string
          likes_count?: number
          media_type: string
          media_url: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          autor?: string
          caption?: string | null
          comments_count?: number
          created_at?: string
          disciplina?: string
          id?: string
          likes_count?: number
          media_type?: string
          media_url?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      news_translations: {
        Row: {
          created_at: string
          lang: string
          snippet: string | null
          title: string
          url: string
        }
        Insert: {
          created_at?: string
          lang: string
          snippet?: string | null
          title: string
          url: string
        }
        Update: {
          created_at?: string
          lang?: string
          snippet?: string | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      organization_follows: {
        Row: {
          created_at: string
          id: string
          organization_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          organization_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          organization_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "organization_follows_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          abreviatura: string | null
          created_at: string
          descripcion: string | null
          disciplinas: string[]
          id: string
          logo_url: string | null
          nombre: string
          pais: string | null
        }
        Insert: {
          abreviatura?: string | null
          created_at?: string
          descripcion?: string | null
          disciplinas?: string[]
          id?: string
          logo_url?: string | null
          nombre: string
          pais?: string | null
        }
        Update: {
          abreviatura?: string | null
          created_at?: string
          descripcion?: string | null
          disciplinas?: string[]
          id?: string
          logo_url?: string | null
          nombre?: string
          pais?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          disciplines: string[]
          display_name: string | null
          id: string
          language: string
          organizations: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          disciplines?: string[]
          display_name?: string | null
          id: string
          language?: string
          organizations?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          disciplines?: string[]
          display_name?: string | null
          id?: string
          language?: string
          organizations?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      saved_news: {
        Row: {
          created_at: string
          image_url: string | null
          published_at: string | null
          snippet: string | null
          source: string
          title: string
          url: string
          user_id: string
        }
        Insert: {
          created_at?: string
          image_url?: string | null
          published_at?: string | null
          snippet?: string | null
          source: string
          title: string
          url: string
          user_id: string
        }
        Update: {
          created_at?: string
          image_url?: string | null
          published_at?: string | null
          snippet?: string | null
          source?: string
          title?: string
          url?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
