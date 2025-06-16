const express = require('express');
const cors = require('cors');
const app = express();
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// === Configuración ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Supabase ===
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// === RUTAS ===

// 🔹 Prueba de vida
app.get('/', (req, res) => {
  res.send('🛍️ Backend Perfumarket 2.0 activo');
});
app.get('/api/status', (req, res) => {
  res.json({ status: 'Servidor funcionando correctamente 🟢' });
});


// 🔹 Cargar nuevo producto
app.post('/api/cargar-producto', async (req, res) => {
  const producto = req.body;
  const { data, error } = await supabase.from('productos').insert([producto]);
  if (error) return res.status(400).json({ error });
  res.json({ ok: true, data });
});

// 🔹 Obtener lista de productos
app.get('/api/productos', async (req, res) => {
  const { data, error } = await supabase.from('productos').select('*').order('creado_en', { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// 🔹 Registrar venta
app.post('/api/venta', async (req, res) => {
  const { usuario_id, carrito, total } = req.body;
  const { data: venta, error: errVenta } = await supabase
    .from('ventas')
    .insert([{ usuario_id, total }])
    .select()
    .single();

  if (errVenta) return res.status(400).json({ error: errVenta });

  const venta_id = venta.id;
  const detalles = carrito.map(item => ({
    venta_id,
    producto_id: item.producto_id,
    cantidad: item.cantidad,
    precio_unitario: item.precio
  }));

  const { error: errDetalle } = await supabase.from('ventas_detalle').insert(detalles);
  if (errDetalle) return res.status(400).json({ error: errDetalle });

  res.json({ ok: true, venta_id });
});

// 🔹 Obtener resumen de ventas
app.get('/api/ventas', async (req, res) => {
  const { data, error } = await supabase.from('ventas').select('*').order('fecha', { ascending: false });
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// === Puerto dinámico para Render ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Servidor backend corriendo en puerto ${PORT}`);
});
