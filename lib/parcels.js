// lib/parcels.js

export const parcels = Array.from({ length: 90 }, (_, i) => ({
  id: i + 1,
  size: Math.floor(Math.random() * 100) + 50, // terület négyzetméter
  price: Math.floor(Math.random() * 5000) + 1000, // ár USD-ben
  x: 0, // pozíció a térképen (frontend generálja)
  y: 0,
  holder: null, // ha már megvették, ide kerül a név
}));
