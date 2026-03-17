# TICKETERA (Front-end)

Cliente Next.js para la plataforma de venta de tickets.

## 🚀 Requisitos Previos

1.  **Node.js** (v18 o superior)
2.  **Backend** corriendo en puerto `4000` (Docker o local).

## 🛠️ Configuración

1.  Copia el archivo de variables de entorno:
    ```bash
    cp .env.example .env.local
    ```

2.  Asegúrate de que `.env.local` tenga la URL correcta del backend:
    ```ini
    # URL pública (navegador)
    NEXT_PUBLIC_API_URL=http://localhost:4000/api
    
    # URL interna del servidor (para SSR y Proxy)
    BACKEND_URL=http://localhost:4000
    ```

## 💻 Desarrollo

1.  Instala dependencias:
    ```bash
    npm install
    ```

2.  Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

3.  Abre [http://localhost:3000](http://localhost:3000).

## 🔗 Proxy API

El front-end utiliza un patrón de **Proxy** para comunicarse con el backend y evitar problemas de CORS/SSL en producción, además de manejar errores de conexión.

-   **Endpoint Frontend**: `/api/events`
-   **Endpoint Backend**: `$BACKEND_URL/events`

Si el backend no está disponible, el endpoint `/api/events` responderá con **503 Service Unavailable** y un JSON seguro:
```json
{
  "success": false,
  "message": "Backend no disponible",
  "data": null
}
```

## 🔐 Auth Flow

El sistema de autenticación utiliza un **Proxy Seguro** + **JWT en LocalStorage** (MVP) con validación estricta de sesión.

### Flujo de Datos
1.  **Login**: `POST /api/auth/login` → Proxy → Backend.
    -   Recibe `{ token, user }`.
    -   Guarda en `localStorage` (via `tokenHelper`).
2.  **Persistencia**:
    -   Al recargar, `AuthContext` lee storage (carga optimista).
    -   Valida en segundo plano con `GET /api/auth/me`.
    -   Si falla (401), limpia sesión y redirige a `/login?reason=session_expired`.
3.  **Protección**:
    -   `AuthGuard` bloquea rutas privadas (`/dashboard`).
    -   Muestra `Loader` mientras `isLoading` es true.
    -   Redirige a `/login` si no hay sesión.

### Checklist de Pruebas Manuales
- [ ] **Register**: Crear cuenta → Redirección automática a Dashboard (si devuelve token) o Login.
- [ ] **Login**: Credenciales OK → Redirección a Dashboard.
- [ ] **Refresh**: F5 en Dashboard → Se mantiene sesión (sin parpadeo de login).
- [ ] **Logout**: Click en Logout → Limpia storage → Redirige a Login.
- [ ] **Protección**: Intentar entrar a `/dashboard` en incógnito → Redirige a Login.
- [ ] **Expiración**: Borrar token de localStorage manualmente → F5 → Redirige a Login con alerta "Sesión Expirada".
- [ ] **Errores UI**:
    -   Credenciales mal: Alerta "Credenciales incorrectas".
    -   Backend caído: Alerta "Backend no disponible".

## 🎨 Estilos

-   **Tailwind CSS** v4
-   **Shadcn/UI** para componentes
-   **Aurora Background** (WebGL) global en `src/components/presentation/backgrounds`
