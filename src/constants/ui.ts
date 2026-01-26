export const TICKET_STATUS = {
  PAID: 'PAID',
  USED: 'USED',
  CANCELLED: 'CANCELLED',
} as const;

export const UI_LABELS = {
  LOADING: 'Cargando...',
  ERROR_GENERIC: 'Ocurrió un error inesperado',
  VALIDATION: {
    VALID: 'Ticket Válido',
    USED: 'Ticket Ya Usado',
    INVALID: 'Ticket Inválido',
    WAITING: 'Validando Ticket...',
  },
  BUTTONS: {
    LOGIN: 'Iniciar Sesión',
    REGISTER: 'Registrarse',
    BUY: 'Comprar Ticket',
    VALIDATE: 'Validar',
  },
};
