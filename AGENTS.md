# AGENTS.md

## Instrucción obligatoria para Codex

Antes de realizar cualquier cambio en este proyecto, Codex debe revisar este archivo `AGENTS.md` y ejecutar sus instrucciones aplicables. Esta revisión es siempre el primer paso de trabajo: leer reglas, confirmar comandos relevantes y respetar las especificaciones aquí descritas antes de editar, compilar, commitear o hacer push.

## Propósito del sitio

Este proyecto es una web app en React JS para el perfil profesional de un médico cirujano. El sitio debe sentirse moderno, clínico, sobrio y confiable, con contenido en español correcto.

## Stack

- React para UI e interacciones.
- Vite para desarrollo, build y preview.
- CSS plano en `src/App.css`.
- Google Maps embebido en contacto.
- Imágenes remotas para el carrusel de consultorios.

## Comandos

Instalar dependencias:

```bash
npm install
```

Iniciar desarrollo:

```bash
npm run dev
```

Iniciar staging local:

```bash
npm run dev:staging
```

URL local esperada:

```text
http://localhost:5173/
```

Build de producción:

```bash
npm run build
```

Builds por ambiente:

```bash
npm run build:staging
npm run build:production
```

Preview del build:

```bash
npm run preview
```

## Archivos principales

- `src/App.jsx`: contenido, datos, estado e interacciones.
- `src/App.css`: estilos, layout responsive y estados visuales.
- `src/config/environment.js`: lectura centralizada de variables de ambiente.
- `src/main.jsx`: montaje de React.
- `index.html`: metadata base.
- `README.md`: documentación general del sitio y ambientes.
- `AGENTS.md`: reglas obligatorias para agentes.

## Ambientes

El proyecto debe conservar dos ambientes formales:

- `staging`: revisión previa a producción.
- `production`: build final desde `main`.

El desarrollo local se hace con `npm run dev`, pero no es un ambiente formal de despliegue.

Solo usar variables públicas con prefijo `VITE_`. Nunca guardar secretos, tokens, llaves privadas o credenciales en archivos `.env` que se suban al repo, porque Vite expone esas variables al navegador.

Variables actuales:

```text
VITE_APP_ENV
VITE_APP_URL
VITE_SITE_NAME
VITE_CONTACT_EMAIL
VITE_CONTACT_PHONE
VITE_MAPS_QUERY
VITE_CAROUSEL_INTERVAL_MS
VITE_FORM_MIN_SUBMIT_MS
```

Reglas:

- Mantener `.env.example` como plantilla.
- Mantener todos los archivos `.env` reales ignorados por Git.
- Agregar nuevas variables primero a `.env.example` y después al ambiente correspondiente en GitHub Actions.
- Consumir variables desde `src/config/environment.js`, no directamente en componentes.

## CI/CD

El workflow principal vive en:

```text
.github/workflows/ci-cd.yml
```

Reglas del pipeline:

- Pull requests hacia `staging` deben ejecutar build de staging.
- Pull requests hacia `main` deben ejecutar build de production.
- Push a `staging` usa el ambiente de GitHub Actions `staging`.
- Push a `main` usa el ambiente de GitHub Actions `production`.
- Los jobs deben usar `npm ci` y subir `dist/` como artifact.
- No agregar secretos al workflow ni a variables `VITE_`.
- Si se conecta un proveedor de hosting, agregar el despliegue dentro del job del ambiente correspondiente.

## Reglas de edición

- Mantener el contenido en español con acentos correctos.
- Ejecutar `npm run build` antes de finalizar cambios.
- Para cambios de ambiente, ejecutar también `npm run build:staging` y `npm run build:production`.
- Mantener cambios de UI en `src/App.jsx` y `src/App.css` salvo que el requerimiento pida otra cosa.
- No subir ni editar manualmente `node_modules/` o `dist/`.
- No reemplazar el stack actual sin una razón explícita.
- Mantener datos editables como arreglos cerca de la parte superior de `src/App.jsx`.

## Diseño

- Estética clínica, moderna, limpia y profesional.
- Usar bordes de `8px` en tarjetas, botones y paneles.
- Evitar fondos decorativos innecesarios.
- Priorizar legibilidad, contraste y navegación clara.
- No usar layouts tipo landing genérica si se pide funcionalidad concreta.
- El header debe conservar marca, navegación y CTA de agendar.
- El hero debe mantener mensaje principal y carrusel visual.

## Tipografía

Fuente base:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

No hay import externo de fuentes. Si se agrega uno, debe justificarse y mantenerse liviano.

## Paleta

Colores principales usados en CSS:

```css
#0e6b61  /* verde principal */
#10211d  /* verde oscuro */
#15231f  /* texto principal */
#52625e  /* texto secundario */
#f5f1ea  /* fondo */
#fffdf9  /* panel */
#dbe9e6  /* fondo suave */
#c66a3a  /* acento cálido */
#b33a2f  /* error */
```

Si se expande el sistema visual, mover colores a variables CSS en `:root`.

## Carrusel

- El carrusel vive en `clinicSlides` dentro de `src/App.jsx`.
- Debe mostrar solo slides de imágenes de consultorios médicos.
- No agregar texto, controles, badges ni overlays encima de las imágenes salvo petición explícita.
- Mantener `alt` descriptivo.
- La rotación actual ocurre cada `4200ms`.

## Servicios

- Cada servicio debe tener `title` y `detail`.
- El botón `+` expande la información dentro de la misma tarjeta.
- Solo una tarjeta debe estar abierta a la vez.
- Mantener `aria-expanded` y `aria-label` en el botón.

## Contacto

La sección de contacto incluye:

- Disponibilidad y correo.
- Google Maps embebido con ubicación en Monterrey, México.
- Formulario de contacto.

El formulario debe mantener:

- Validación de nombre.
- Validación de correo.
- Validación de teléfono.
- Validación de mensaje.
- Mensajes de error por campo.
- Honeypot antispam llamado `website`.
- Tiempo mínimo antes de aceptar envío.

Importante: actualmente el formulario no envía datos a backend. Solo valida en cliente y muestra estados.

## Google Maps

Mapa actual:

```text
https://www.google.com/maps?q=Monterrey,%20Nuevo%20Le%C3%B3n,%20M%C3%A9xico&output=embed
```

Si se solicita una dirección exacta, reemplazar la query por la dirección codificada.

## Responsive

Breakpoints actuales:

- `820px`: layouts principales pasan a una columna y se ocultan links de navegación.
- `520px`: ajustes compactos de header, hero y botones.

Reglas:

- Usar `grid`, `clamp()` y media queries existentes.
- No permitir solapamientos de texto o controles.
- Revisar móvil cuando se cambien secciones con grids o tarjetas.

## Accesibilidad

- Mantener `aria-label` en controles no descriptivos.
- Mantener `aria-expanded` en tarjetas expansibles.
- Mantener `aria-invalid` en campos con error.
- Mantener `title` descriptivo en el iframe de Google Maps.
- Mantener contraste suficiente entre texto y fondo.

## Git

Remoto:

```text
git@github.com:ramiross89/testdoc.git
```

Rama principal:

```text
main
```

Antes de push:

```bash
npm run build
npm run build:staging
git status
```

## Criterios de finalización

Un cambio está listo cuando:

- Compila con `npm run build`.
- No rompe responsive básico.
- Conserva ortografía y acentos.
- Mantiene accesibilidad básica.
- El estado de Git refleja solo cambios relacionados con la tarea.
