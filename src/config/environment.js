const env = import.meta.env;

const numberFromEnv = (value, fallback) => {
  const parsedValue = Number.parseInt(value, 10);
  return Number.isFinite(parsedValue) ? parsedValue : fallback;
};

const normalizePhoneHref = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
const normalizeEmailHref = (email) => `mailto:${email}`;
const googleMapsEmbedUrl = (query) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;

export const environment = {
  appEnv: env.VITE_APP_ENV ?? env.MODE,
  appUrl: env.VITE_APP_URL ?? "http://localhost:5173",
  siteName: env.VITE_SITE_NAME ?? "Dr. Alejandro Varela",
  contactEmail: env.VITE_CONTACT_EMAIL ?? "consulta@dravarela.mx",
  contactPhone: env.VITE_CONTACT_PHONE ?? "+528112345678",
  mapsQuery: env.VITE_MAPS_QUERY ?? "Monterrey, Nuevo León, México",
  carouselIntervalMs: numberFromEnv(env.VITE_CAROUSEL_INTERVAL_MS, 4200),
  formMinSubmitMs: numberFromEnv(env.VITE_FORM_MIN_SUBMIT_MS, 3000),
};

export const contactLinks = {
  email: normalizeEmailHref(environment.contactEmail),
  phone: normalizePhoneHref(environment.contactPhone),
};

export const mapConfig = {
  embedUrl: googleMapsEmbedUrl(environment.mapsQuery),
  title: `Ubicación en ${environment.mapsQuery}`,
};
