# ZarApp – Web Challenge Smartphones

ZarApp es una aplicación web desarrollada como solución al Zara Web Challenge: Smartphones. Permite visualizar un catálogo de móviles, consultar detalles y gestionar un carrito de compra con persistencia local.

---

## Características principales

- Navegación SSR con búsqueda por marca o nombre
- Carrito funcional con selección de color y almacenamiento
- Selector de color visual y cambio dinámico de imagen
- Cálculo de precio en tiempo real
- Persistencia en localStorage
- Diseño responsive y visual cuidado
- Tests funcionales de componentes y lógica

---

## Tecnologías utilizadas

- Next.js – SSR y generación de rutas
- React – Componentes y estado
- Axios – Peticiones HTTP
- Jest + React Testing Library – Tests
- localStorage – Persistencia de carrito
- next/image – Optimización automática de imágenes

---

## Estructura del proyecto

/src
├── components → Navbar, PhoneCard
├── context → CartContext (gestión de carrito)
├── features/phones → Lógica de productos
├── lib → Axios client
├── pages → index, phone/[id], cart
├── styles → Estilos globales
├── tests → Tests de componentes y páginas

---

## Instalación y ejecución

### Requisitos

- Node.js v18 o superior
- npm

### Pasos

git clone
cd zarapp
npm install

### Añade la KEY al archivo .env

NEXT_PUBLIC_API_KEY=your-api-key-here

### Modo desarrollo

npm run dev

### Modo producción

npm run build
npm start

### Para ejecutar los tests

npm run test
