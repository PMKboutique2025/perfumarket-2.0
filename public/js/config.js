// ✅ config.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

export const supabase = createClient(
  'https://lourpqpgiqfyixrvyfuo.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdXJwcXBnaXFmeWl4cnZ5ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzgwMzIsImV4cCI6MjA2NTUxNDAzMn0.rHjuYs2WX0eBBjpwM5XM0CZ2-JICe3BCKYTn1flnqBY'
);

// 🌐 Backend desplegado en Render
export const API_BASE = 'https://perfumarket-backend.onrender.com';

// 🔒 Verifica sesión activa (opcional para vistas privadas)
export async function verificarSesion(oRedireccionar = true) {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (!session && oRedireccionar) {
    window.location.href = "login.html";
  }
  return session;
}
