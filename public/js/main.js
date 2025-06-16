// ✅ Conexión a Supabase
const SUPABASE_URL = 'https://lourpqpgiqfyixrvyfuo.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdXJwcXBnaXFmeWl4cnZ5ZnVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5MzgwMzIsImV4cCI6MjA2NTUxNDAzMn0.rHjuYs2WX0eBBjpwM5XM0CZ2-JICe3BCKYTn1flnqBY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🧪 Test de conexión
console.log("Supabase conectado:", supabase);

// ⏳ Comprobación de sesión activa (opcional para login persistente)
async function verificarSesion() {
  const { data: { session }, error } = await supabase.auth.getSession();

  if (session) {
    console.log("Sesión activa:", session.user.email);
    // Aquí puedes redirigir a home o dashboard según el rol
  } else {
    console.log("Sin sesión activa.");
  }
}

// Inicializar
document.addEventListener("DOMContentLoaded", () => {
  verificarSesion();
});

document.addEventListener('click', function (e) {
  const target = e.target.closest('button, .btn-principal, .eliminar-btn');
  if (!target) return;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.left = `${e.offsetX}px`;
  ripple.style.top = `${e.offsetY}px`;
  ripple.style.position = 'absolute';
  ripple.style.width = ripple.style.height = '100px';
  ripple.style.marginLeft = ripple.style.marginTop = '-50px';
  ripple.style.borderRadius = '50%';
  ripple.style.background = 'rgba(255,255,255,0.5)';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple 0.6s linear';
  target.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});


