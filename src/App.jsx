import { useEffect, useRef, useState } from "react";
import { contactLinks, environment, mapConfig } from "./config/environment";

const highlights = [
  { value: "18+", label: "años de experiencia" },
  { value: "6,200", label: "procedimientos realizados" },
  { value: "24h", label: "seguimiento postoperatorio" },
];

const services = [
  {
    title: "Cirugía laparoscópica avanzada",
    detail:
      "Procedimientos de mínima invasión con incisiones pequeñas, menor dolor postoperatorio y recuperación más rápida cuando el caso lo permite.",
  },
  {
    title: "Cirugía de vesícula y hernias",
    detail:
      "Valoración, planeación quirúrgica y reparación de padecimientos frecuentes como cálculos biliares, hernias inguinales, umbilicales o incisionales.",
  },
  {
    title: "Cirugía digestiva y pared abdominal",
    detail:
      "Manejo de enfermedades del aparato digestivo y reconstrucción de pared abdominal con enfoque en seguridad, función y retorno gradual a la actividad.",
  },
  {
    title: "Valoración preoperatoria integral",
    detail:
      "Revisión clínica, estudios, riesgos, medicamentos y preparación previa para llegar al quirófano con un plan claro y personalizado.",
  },
];

const timeline = [
  {
    year: "2006",
    title: "Médico cirujano",
    detail: "Universidad Nacional Autónoma de México.",
    achievements: [
      "Completó su formación médica con enfoque en diagnóstico clínico, anatomía quirúrgica y atención integral del paciente.",
      "Participó en rotaciones hospitalarias de urgencias, medicina interna y cirugía, consolidando criterio para casos complejos.",
    ],
    goals: [
      "Construir una base clínica sólida para tomar decisiones seguras en quirófano.",
      "Orientar su práctica hacia una comunicación clara con pacientes y familiares.",
    ],
  },
  {
    year: "2011",
    title: "Especialidad en cirugía general",
    detail: "Hospital de Alta Especialidad, Ciudad de México.",
    achievements: [
      "Desarrolló experiencia en cirugía abdominal, manejo perioperatorio y resolución de urgencias quirúrgicas.",
      "Participó en equipos multidisciplinarios para optimizar seguridad, tiempos quirúrgicos y recuperación hospitalaria.",
    ],
    goals: [
      "Dominar procedimientos de cirugía general con estándares hospitalarios de alta especialidad.",
      "Fortalecer protocolos de valoración preoperatoria y seguimiento postoperatorio.",
    ],
  },
  {
    year: "2017",
    title: "Fellowship en mínima invasión",
    detail: "Entrenamiento avanzado en técnicas laparoscópicas.",
    achievements: [
      "Perfeccionó técnicas laparoscópicas para reducir trauma quirúrgico, dolor y tiempos de recuperación.",
      "Integró tecnología y planeación quirúrgica avanzada en procedimientos digestivos y de pared abdominal.",
    ],
    goals: [
      "Ofrecer alternativas mínimamente invasivas cuando el caso clínico lo permite.",
      "Impulsar una recuperación más cómoda, segura y acompañada para cada paciente.",
    ],
  },
];

const appointments = [
  "Lunes a viernes: 9:00 - 18:00",
  "Sábado: 9:00 - 13:00",
  "Urgencias quirúrgicas: disponibilidad coordinada",
];

const clinicSlides = [
  {
    src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
    alt: "Consultorio médico moderno con sillones y luz natural",
  },
  {
    src: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?auto=format&fit=crop&w=1200&q=85",
    alt: "Sala clínica luminosa con equipo médico",
  },
  {
    src: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=85",
    alt: "Área de consulta médica contemporánea",
  },
];

function App() {
  const contactBandRef = useRef(null);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedTimeline, setExpandedTimeline] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [formStatus, setFormStatus] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [formStartedAt] = useState(Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % clinicSlides.length);
    }, environment.carouselIntervalMs);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const contactBand = contactBandRef.current;

    if (!contactBand) {
      return undefined;
    }

    let animationFrame = 0;

    const updateScrollParallax = () => {
      const rect = contactBand.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      const scrollProgress = (viewportCenter - sectionCenter) / viewportCenter;
      const clampedProgress = Math.max(-1, Math.min(1, scrollProgress));
      const scrollOffset = Math.round(clampedProgress * 42);

      contactBand.style.setProperty(
        "--meadow-scroll-y",
        `${scrollOffset}px`
      );
      contactBand.style.setProperty(
        "--meadow-bg-y",
        `${Math.round(clampedProgress * 24)}px`
      );
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateScrollParallax);
    };

    updateScrollParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleService = (title) => {
    setExpandedService((currentService) =>
      currentService === title ? null : title
    );
  };

  const toggleTimeline = (year) => {
    setExpandedTimeline((currentYear) => (currentYear === year ? null : year));
  };

  const handleContactPointerMove = (event) => {
    const contactBand = contactBandRef.current;

    if (!contactBand) {
      return;
    }

    const rect = contactBand.getBoundingClientRect();
    const pointerX = (event.clientX - rect.left) / rect.width - 0.5;
    const pointerY = (event.clientY - rect.top) / rect.height - 0.5;

    contactBand.style.setProperty(
      "--meadow-pointer-x",
      `${Math.round(pointerX * 34)}px`
    );
    contactBand.style.setProperty(
      "--meadow-pointer-y",
      `${Math.round(pointerY * 24)}px`
    );
    contactBand.style.setProperty(
      "--meadow-bg-x",
      `${Math.round(pointerX * 28)}px`
    );
  };

  const handleContactPointerLeave = () => {
    const contactBand = contactBandRef.current;

    if (!contactBand) {
      return;
    }

    contactBand.style.setProperty("--meadow-pointer-x", "0px");
    contactBand.style.setProperty("--meadow-pointer-y", "0px");
    contactBand.style.setProperty("--meadow-bg-x", "0px");
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());
    const errors = {};
    const elapsedTime = Date.now() - formStartedAt;

    if (values.website) {
      setFormStatus("spam");
      return;
    }

    if (elapsedTime < environment.formMinSubmitMs) {
      setFormStatus("spam");
      return;
    }

    if (!values.name.trim()) {
      errors.name = "Escribe tu nombre.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      errors.email = "Escribe un correo válido.";
    }

    if (!/^[0-9+\s()-]{8,}$/.test(values.phone.trim())) {
      errors.phone = "Escribe un teléfono válido.";
    }

    if (!values.message.trim() || values.message.trim().length < 12) {
      errors.message = "Cuéntanos brevemente el motivo de tu consulta.";
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setFormStatus("error");
      return;
    }

    setFormStatus("success");
    form.reset();
  };

  return (
    <main className="page-shell">
      <nav className="topbar" aria-label="Navegación principal">
        <a className="brand" href="#inicio" aria-label="Inicio">
          <span className="brand-mark">AV</span>
          <span>Dr. Alejandro Varela</span>
        </a>
        <div className="nav-links">
          <a href="#servicios">Servicios</a>
          <a href="#trayectoria">Trayectoria</a>
          <a href="#contacto">Contacto</a>
        </div>
        <a className="header-action" href={contactLinks.phone}>
          Agendar
        </a>
      </nav>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow">Cirugía general y laparoscópica</p>
          <h1>Atención quirúrgica precisa, clara y humana.</h1>
          <p className="intro">
            Perfil profesional enfocado en diagnóstico oportuno, planeación
            quirúrgica segura y recuperación acompañada de principio a fin.
          </p>
          <div className="hero-actions" aria-label="Acciones principales">
            <a className="primary-action" href={contactLinks.phone}>
              Agendar valoración
            </a>
            <a className="secondary-action" href="#trayectoria">
              Ver credenciales
            </a>
          </div>
        </div>
        <aside className="clinic-carousel" aria-label="Consultorios médicos">
          {clinicSlides.map((slide, index) => (
            <img
              className={index === activeSlide ? "active" : ""}
              src={slide.src}
              alt={slide.alt}
              key={slide.src}
            />
          ))}
        </aside>
      </section>

      <section className="stats" aria-label="Indicadores profesionales">
        {highlights.map((item) => (
          <div className="stat" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="content-band split" id="servicios">
        <div>
          <p className="eyebrow">Especialidades</p>
          <h2>Procedimientos con enfoque mínimamente invasivo.</h2>
          <p>
            Cada caso se revisa con estudios, riesgos, alternativas y tiempos de
            recuperación explicados en lenguaje claro para tomar decisiones con
            tranquilidad.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <button
                className="service-toggle"
                type="button"
                aria-expanded={expandedService === service.title}
                aria-label={
                  expandedService === service.title
                    ? `Ocultar información de ${service.title}`
                    : `Mostrar información de ${service.title}`
                }
                onClick={() => toggleService(service.title)}
              >
                {expandedService === service.title ? "-" : "+"}
              </button>
              <h3>{service.title}</h3>
              {expandedService === service.title && (
                <p className="service-detail">{service.detail}</p>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="content-band timeline-section" id="trayectoria">
        <div className="section-heading">
          <p className="eyebrow">Trayectoria</p>
          <h2>Formación, práctica hospitalaria y actualización continua.</h2>
        </div>
        <div className="timeline">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.year}>
              <button
                className="timeline-trigger"
                type="button"
                aria-expanded={expandedTimeline === item.year}
                aria-controls={`timeline-${item.year}`}
                onClick={() => toggleTimeline(item.year)}
              >
                <span className="timeline-year">{item.year}</span>
                <span className="timeline-summary">
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </span>
                <span className="timeline-icon" aria-hidden="true">
                  {expandedTimeline === item.year ? "-" : "+"}
                </span>
              </button>
              <div
                className="timeline-details"
                id={`timeline-${item.year}`}
                aria-hidden={expandedTimeline !== item.year}
              >
                <div className="timeline-details-inner">
                  <div>
                    <h3>Logros</h3>
                    <ul>
                      {item.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3>Metas logradas</h3>
                    <ul>
                      {item.goals.map((goal) => (
                        <li key={goal}>{goal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="contact-band"
        id="contacto"
        ref={contactBandRef}
        onPointerMove={handleContactPointerMove}
        onPointerLeave={handleContactPointerLeave}
      >
        <div>
          <p className="eyebrow">Consulta</p>
          <h2>Agenda una valoración quirúrgica.</h2>
          <p>
            Coordinación directa para consulta, segunda opinión, preparación
            preoperatoria y seguimiento después del alta.
          </p>
        </div>
        <div className="contact-card">
          <h3>Disponibilidad</h3>
          {appointments.map((item) => (
            <p key={item}>{item}</p>
          ))}
          <a className="primary-action full" href={contactLinks.email}>
            {environment.contactEmail}
          </a>
        </div>
      </section>

      <section className="contact-tools" aria-label="Mapa y formulario">
        <div className="map-panel">
          <iframe
            title={mapConfig.title}
            src={mapConfig.embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <form className="contact-form" onSubmit={handleContactSubmit} noValidate>
          <div className="form-heading">
            <p className="eyebrow">Contacto</p>
            <h2>Envíanos tu caso.</h2>
          </div>

          <label>
            Nombre completo
            <input
              type="text"
              name="name"
              autoComplete="name"
              aria-invalid={Boolean(formErrors.name)}
            />
            {formErrors.name && <span>{formErrors.name}</span>}
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              autoComplete="email"
              aria-invalid={Boolean(formErrors.email)}
            />
            {formErrors.email && <span>{formErrors.email}</span>}
          </label>

          <label>
            Teléfono
            <input
              type="tel"
              name="phone"
              autoComplete="tel"
              aria-invalid={Boolean(formErrors.phone)}
            />
            {formErrors.phone && <span>{formErrors.phone}</span>}
          </label>

          <label className="spam-field" aria-hidden="true">
            Sitio web
            <input type="text" name="website" tabIndex="-1" autoComplete="off" />
          </label>

          <label>
            Motivo de consulta
            <textarea
              name="message"
              rows="5"
              aria-invalid={Boolean(formErrors.message)}
            />
            {formErrors.message && <span>{formErrors.message}</span>}
          </label>

          {formStatus === "error" && (
            <p className="form-status error">
              Revisa los campos marcados antes de enviar.
            </p>
          )}
          {formStatus === "spam" && (
            <p className="form-status error">
              No pudimos procesar el envío. Inténtalo de nuevo en unos segundos.
            </p>
          )}
          {formStatus === "success" && (
            <p className="form-status success">
              Gracias. Tu mensaje está listo para ser enviado por el equipo de
              atención.
            </p>
          )}

          <button className="primary-action full" type="submit">
            Enviar solicitud
          </button>
        </form>
      </section>
    </main>
  );
}

export default App;
