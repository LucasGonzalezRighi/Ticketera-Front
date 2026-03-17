# Plan de Limpieza y Unificación de Estilos

Este documento audita el repositorio (front-end y back-end de referencia) y propone una hoja de ruta para eliminar duplicados, consolidar rutas y homologar estilos a un solo design system (shadcn/ui + Aura background).

## 1) Páginas reales en `src/app` y posibles “legacy/duplicadas”

- UI
  - `/` → redirige a `/dashboard` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/page.tsx))
  - `/dashboard` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/dashboard/page.tsx))
  - `/dashboard/tickets` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/dashboard/tickets/page.tsx))
  - `/events/[id]` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/events/%5Bid%5D/page.tsx))
  - `/validate` ([page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/validate/page.tsx))
  - Grupo `(auth)`
    - `/login` ([login/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/(auth)/login/page.tsx))
    - `/register` ([register/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/(auth)/register/page.tsx))
  - Rutas “experimentales” (duplicadas de auth)
    - `/new-login` ([new-login/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-login/page.tsx)) → Duplicada de `(auth)/login`
    - `/new-register` ([new-register/page.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-register/page.tsx)) → Duplicada de `(auth)/register`

- Observaciones de duplicación
  - Login: `(auth)/login` vs `new-login`.
  - Register: `(auth)/register` vs `new-register`.
  - Tickets: existía `/my-tickets` legacy; la “fuente de verdad” actual es `/dashboard/tickets` (ver [routes.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/constants/routes.ts)).

## 2) Endpoints reales en `src/app/api` y duplicados

- Auth
  - `POST /api/auth/login` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/login/route.ts))
  - `POST /api/auth/register` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/register/route.ts))
  - `GET /api/auth/me` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/auth/me/route.ts))
- Events
  - `GET /api/events` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/events/route.ts))
  - `GET /api/events/[id]` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/events/%5Bid%5D/route.ts))
- Tickets
  - `POST /api/tickets/purchase` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/purchase/route.ts))
  - `GET /api/tickets/my-tickets` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/my-tickets/route.ts))
  - `POST /api/tickets/validate` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/tickets/validate/route.ts))
- Infra
  - `GET /api/backend-health` ([route.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/api/backend-health/route.ts))

- Duplicados
  - No hay `proxy/[...path]`. No se detectan duplicados de handlers; todos los handlers reenvián a los endpoints de back-end definidos en [lib/config/api.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/lib/config/api.ts).

## 3) Componentes duplicados o solapados

- Autenticación
  - Login
    - `components/presentation/molecules/LoginForm` ([LoginForm.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/presentation/molecules/LoginForm.tsx)) → shadcn/ui + AuthContext.
    - `components/auth-v2/LoginForm` ([LoginForm.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/auth-v2/LoginForm.tsx)) → UI Aura + `useLoginV2` mock.
  - Register
    - `components/presentation/molecules/RegisterForm` ([RegisterForm.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/presentation/molecules/RegisterForm.tsx)) → usa hooks reales (`useRegister`) y atoms heredados.
    - `components/auth-v2/RegisterContainer` + `RegisterForm` ([RegisterContainer.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/auth-v2/RegisterContainer.tsx), [RegisterForm.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/auth-v2/RegisterForm.tsx)) → ahora migrados a shadcn/ui pero con lógica mock.
- Campos/Input
  - `components/ui/fields/*` (EmailField, PasswordField) → wrappers shadcn.
  - `components/ui/atoms/*` (Button, TextField, PasswordField) → sistema anterior. Usados en `presentation/molecules/RegisterForm`. Solapan con `components/ui/button.tsx` y `components/ui/input.tsx`.
- Layouts
  - `AuthLayout` ([AuthLayout.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/presentation/layout/AuthLayout.tsx)) vs `auth-v2/*Container`.

## 4) Hooks/servicios duplicados

- Hooks
  - `useLogin` ([useLogin.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/hooks/useLogin.ts)) → real, usa `AuthContext`.
  - `useLoginV2` ([useLoginV2.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/hooks/useLoginV2.ts)) → mock para auth-v2.
  - `useRegister` ([useRegister.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/hooks/useRegister.ts)) → real.
  - `useMyTickets`, `useValidateTicket`, `usePurchaseTicket` → reales, usan `ticketsApi`.
- Servicios/almacenamiento
  - `authApi`, `ticketsApi` ([auth.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/api/auth.ts), [tickets.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/api/tickets.ts)) → cliente hacia `/api/*` de Next.
  - `utils/storage.ts` ([storage.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/utils/storage.ts)) y `lib/auth/token.ts` ([token.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/lib/auth/token.ts)) → ambos tocan localStorage (token/usuario). No estrictamente duplicados, pero se puede consolidar en uno solo.
  - `lib/tickets/storage.ts` ([storage.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/lib/tickets/storage.ts)) → almacenamiento local de compras (MVP anterior). Debe retirarse en favor de `ticketsApi.getMyTickets()` (ya migrado).
  - `lib/auth-v2/mockApi.ts` ([mockApi.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/lib/auth-v2/mockApi.ts)) → mock temporal.

## 5) Qué se puede borrar con seguridad y qué NO (estado actual)

- Candidatos a ELIMINAR tras migración
  - Rutas duplicadas de auth
    - `/new-login` ([file](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-login/page.tsx)) y `/new-register` ([file](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/app/new-register/page.tsx)).
      - Razón: `(auth)/login` y `(auth)/register` cubren los flujos, integran el design system y tienen mejores enlaces contextuales.
      - Requisito previo: confirmar que todos los enlaces apunten a `(auth)/login` y `(auth)/register` y que no existan referencias a `new-*` en UI.
  - `components/auth-v2/LoginForm.tsx` y contenedor asociado si no se usa desde ninguna ruta oficial.
    - Razón: Duplicado funcional del `presentation/molecules/LoginForm`.
  - `components/ui/atoms/*` (Button, TextField, PasswordField) una vez migrados sus usos a shadcn/ui (ver [presentation/molecules/RegisterForm.tsx](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/front-end/src/components/presentation/molecules/RegisterForm.tsx)).
    - Razón: Duplican `components/ui/button.tsx` y `components/ui/input.tsx`.
  - `lib/tickets/storage.ts` (después de verificar no-uso).
    - Razón: Datos ahora vienen de backend vía `ticketsApi.getMyTickets()`.
  - `lib/auth-v2/mockApi.ts` y `useLoginV2` cuando la UI auth-v2 quede totalmente reemplazada por los componentes finales.

- NO borrar por ahora
  - `(auth)/login` + `presentation/molecules/LoginForm` (fuente de verdad de login real, integrado a AuthContext).
  - `(auth)/register` + `auth-v2/RegisterContainer` mientras se termina de alinear la lógica real de registro.
  - `authApi`, `ticketsApi`, `utils/storage.ts`, `lib/auth/token.ts` (en uso directo por AuthContext y flujos principales).
  - Cualquier archivo referenciado por imports activos (verificar con búsquedas antes de remover).

## 6) Back-end (contexto de referencia)

El front-end apunta a estos endpoints Express del back-end:

- `/auth/*` ([auth.routes.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/back-end/src/auth/auth.routes.ts))
- `/events/*` ([app.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/back-end/src/app.ts))
- `/tickets/*` ([tickets.routes.ts](file:///c:/Users/lucas/OneDrive/Escritorio/TICKETERA/back-end/src/tickets/tickets.routes.ts))

Esto valida la coherencia con los handlers en `src/app/api/*` de Next.

## 7) Compilación (`npm run build`)

- Resultado: Éxito (exit code 0). El comando reportó build OK con Next.js.
- Notas: El `lint` sí reporta errores actuales (tipado `any` en algunos archivos y una advertencia de `react/no-unescaped-entities`). No bloquea el build, pero conviene limpiarlos antes de CI/CD.

## 8) Recomendaciones de siguiente paso

- Elegir fuente de verdad de auth:
  - Mantener `(auth)/login` y `(auth)/register` como rutas oficiales.
  - Retirar `new-login`/`new-register` tras actualizar todos los enlaces internos.
- Consolidar design system:
  - Migrar formularios legacy que usan `components/ui/atoms/*` a `components/ui/*` y `components/ui/fields/*`.
  - Eliminar los atoms heredados cuando no tengan referencias.
- Unificar helpers de storage/token:
  - Centralizar lectura/escritura de token y user en un único módulo (`utils/storage` o `lib/auth/token`).

