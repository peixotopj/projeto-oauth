import { createClient } from
  "https://esm.sh/@supabase/supabase-js@2";

// Substitua pelos dados do seu projeto
const supabaseUrl = "https://SEU_PROJETO.supabase.co";
const supabaseKey = "SUA_CHAVE_PUBLICA";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);
