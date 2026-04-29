# Especificaciones del sitio

## Resumen

Web app en React JS para el perfil profesional de un médico cirujano. El sitio usa Vite como servidor de desarrollo y empaquetador, con estilos escritos en CSS plano dentro de `src/App.css`.

## Stack

- React: interfaz y estado de componentes.
- Vite: servidor local, build y preview.
- CSS plano: sistema visual y responsive.
- Google Maps embed: mapa en la sección de contacto.
- Imágenes remotas de Unsplash: carrusel de consultorios médicos.

## Estructura

```text
.
├── index.html
├── package.json
├── package-lock.json
├── src
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
└── SPECIFICATIONS.md
```

## Instalación

Instalar dependencias:

```bash
npm install
```

## Iniciar el sitio

Servidor de desarrollo:

```bash
npm run dev
```

Por configuración, Vite escucha en:

```text
http://localhost:5173/
```

También se expone a la red local porque el script usa:

```bash
vite --host 0.0.0.0
```

## Build de producción

Generar archivos finales:

```bash
npm run build
```

La salida se crea en:

```text
dist/
```

Verificar el build localmente:

```bash
npm run preview
```

## Secciones del sitio

- Header: navegación principal, marca del médico y CTA de agendar.
- Hero: mensaje principal, acciones y carrusel de consultorios médicos.
- Indicadores: experiencia, procedimientos y seguimiento.
- Servicios: tarjetas expansibles con información adicional al hacer clic en `+`.
- Trayectoria: formación y experiencia profesional.
- Contacto: disponibilidad, correo, Google Maps y formulario.

## Reglas de diseño

- Mantener una estética clínica, moderna y sobria.
- Usar esquinas de `8px` para tarjetas, botones y contenedores.
- Evitar fondos decorativos innecesarios; priorizar claridad, aire visual y jerarquía.
- No usar texto superpuesto sobre el carrusel del hero; debe contener solo slides de imágenes.
- Mantener el contenido legible en móvil y desktop.
- Usar layout responsive con `grid`, `clamp()` y media queries.

## Paleta principal

```css
--verde-principal: #0e6b61;
--verde-oscuro: #10211d;
--texto: #15231f;
--texto-secundario: #52625e;
--fondo: #f5f1ea;
--panel: #fffdf9;
--fondo-suave: #dbe9e6;
--acento-calido: #c66a3a;
--error: #b33a2f;
```

Actualmente los colores están declarados directamente en `src/App.css`. Si el sitio crece, conviene moverlos a variables CSS dentro de `:root`.

## Tipografía

La fuente base es:

```css
Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
```

No hay import externo de Google Fonts. El diseño usa la fuente del sistema si `Inter` no está disponible.

## Componentes y comportamiento

### Carrusel

- Definido en `src/App.jsx` como `clinicSlides`.
- Cambia automáticamente cada `4200ms`.
- Solo debe mostrar imágenes de consultorios médicos.
- No agregar texto, botones o indicadores encima de las imágenes salvo que se solicite explícitamente.

### Servicios expansibles

- Cada servicio tiene `title` y `detail`.
- El botón `+` muestra más información dentro de la misma tarjeta.
- Al abrir una tarjeta, se cierra la anterior.
- Mantener `aria-expanded` y `aria-label` para accesibilidad.

### Formulario de contacto

Validaciones actuales:

- Nombre requerido.
- Correo con formato válido.
- Teléfono con mínimo de 8 caracteres permitidos.
- Mensaje requerido con mínimo de 12 caracteres.

Antispam actual:

- Campo honeypot oculto llamado `website`.
- Tiempo mínimo de 3 segundos antes de aceptar el envío.

Importante: el formulario no envía datos a un backend todavía. Solo valida y muestra estados en cliente.

## Google Maps

El mapa se inserta con un `iframe` usando:

```text
https://www.google.com/maps?q=Monterrey,%20Nuevo%20Le%C3%B3n,%20M%C3%A9xico&output=embed
```

Si se requiere una dirección exacta, reemplazar la query por la dirección completa codificada en URL.

## Imágenes

El carrusel usa URLs remotas de Unsplash. Reglas:

- Usar imágenes de consultorios, clínicas, salas médicas o espacios hospitalarios.
- Evitar imágenes oscuras, borrosas o genéricas.
- Mantener `alt` descriptivo para accesibilidad.
- Usar `object-fit: cover` para preservar un recorte limpio.

## Responsive

Breakpoints actuales:

- `820px`: el layout pasa a una columna y se ocultan links de navegación.
- `520px`: ajustes compactos para hero, header y botones.

Reglas:

- No usar tamaños de fuente basados directamente en viewport sin límites.
- Usar `clamp()` para tamaños grandes.
- Evitar que botones o tarjetas cambien de tamaño de forma brusca por contenido dinámico.

## Accesibilidad

- Los botones deben tener `aria-label` cuando el texto visible no describa toda la acción.
- El carrusel debe conservar `alt` en cada imagen.
- Campos inválidos usan `aria-invalid`.
- El mapa debe mantener un `title` descriptivo.
- Mantener contraste suficiente entre texto y fondo.

## Git y despliegue

Repositorio remoto:

```text
git@github.com:ramiross89/testdoc.git
```

Rama principal:

```text
main
```

Comandos habituales:

```bash
git status
git add src/App.jsx src/App.css SPECIFICATIONS.md
git commit -m "Update site documentation"
git push origin main
```

## Archivos ignorados

`.gitignore` excluye:

```text
node_modules/
dist/
.DS_Store
```

No subir `node_modules` ni `dist` salvo que cambie la estrategia de despliegue.

## Reglas para futuros cambios

- Mantener el contenido en español con acentos correctos.
- Evitar mezclar lógica compleja en CSS; la interacción debe vivir en React.
- Mantener cambios visuales dentro de `src/App.css`.
- Mantener datos editables como arreglos en la parte superior de `src/App.jsx`.
- Ejecutar `npm run build` antes de hacer commit.
- Probar visualmente en desktop y móvil cuando se cambien layouts.
