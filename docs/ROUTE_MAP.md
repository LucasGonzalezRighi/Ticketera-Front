# Mapa de Rutas y Navegación

## UI (App Router)

- `/` → redirige a `/dashboard` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/page.tsx))
- `/dashboard` ([dashboard/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/dashboard/page.tsx))
  - Navega a: `/events/[id]`
- `/events/[id]` ([events/[id]/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/events/%5Bid%5D/page.tsx))
  - Acciones: compra (ticketsApi.purchase) → éxito muestra estado y lleva al usuario a `/dashboard/tickets`
- `/dashboard/tickets` ([dashboard/tickets/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/dashboard/tickets/page.tsx))
  - Carga: tickets del usuario (ticketsApi.getMyTickets)
  - Navega a: `/events/[id]` (ver evento), modal de QR dentro de la página
- `/validate` ([validate/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/validate/page.tsx))
  - Carga: `useValidateTicket` → `/api/tickets/validate`
- Grupo `(auth)`
  - `/login` ([login/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/(auth)/login/page.tsx))
    - Form: `presentation/molecules/LoginForm` → `useLogin` → `authApi.login`
    - Enlace footer: a `/register`
    - Redirección tras login: `/dashboard`
  - `/register` ([register/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/(auth)/register/page.tsx))
    - Contenedor: `auth-v2/RegisterContainer` (Card shadcn + efectos)
    - Form interno actual: `auth-v2/RegisterForm` (UI unificada; lógica mock)
    - Enlace dentro del contenedor: a `/new-login` (pendiente de alinear a `/login`)
- Rutas experimentales (duplicadas de auth)
  - `/new-login` ([new-login/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-login/page.tsx)) → versión Aura animada
  - `/new-register` ([new-register/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-register/page.tsx)) → duplicada (misma UI que `(auth)/register`)

## API (Route Handlers en `/api`)

- Auth
  - `POST /api/auth/login` ([auth/login/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/login/route.ts))
  - `POST /api/auth/register` ([auth/register/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/register/route.ts))
  - `GET /api/auth/me` ([auth/me/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/me/route.ts))
- Events
  - `GET /api/events` ([events/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/events/route.ts))
  - `GET /api/events/[id]` ([events/[id]/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/events/%5Bid%5D/route.ts))
- Tickets
  - `POST /api/tickets/purchase` ([tickets/purchase/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/purchase/route.ts))
  - `GET /api/tickets/my-tickets` ([tickets/my-tickets/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/my-tickets/route.ts))
  - `POST /api/tickets/validate` ([tickets/validate/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/validate/route.ts))
- Infra
  - `GET /api/backend-health` ([backend-health/route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/backend-health/route.ts))

## Flujo de navegación principal

- Ingreso
  - `/login` → submit → `/dashboard`
  - Enlace a registro desde login → `/register`
- Registro
  - `/register` → submit (actual: mock UI) → objetivo: login automático y `/dashboard` vía `AuthContext`
- Eventos
  - `/dashboard` → click evento → `/events/[id]`
  - `/events/[id]` → comprar → confirmación → “Mis Entradas” (`/dashboard/tickets`)
- Validación
  - `/validate` → ingresar código → `POST /api/tickets/validate`

## Observaciones

- Fuente de verdad recomendada
  - UI auth: `/login` y `/register` (grupo `(auth)`) como rutas oficiales.
  - Eliminar `new-login`/`new-register` tras alinear enlaces y lógica.
  - Homologar los forms para usar shadcn/ui + `AuthContext` (sin mocks).

