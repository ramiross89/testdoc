import { useState } from "react";

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
  },
  {
    year: "2011",
    title: "Especialidad en cirugía general",
    detail: "Hospital de Alta Especialidad, Ciudad de México.",
  },
  {
    year: "2017",
    title: "Fellowship en mínima invasión",
    detail: "Entrenamiento avanzado en técnicas laparoscópicas.",
  },
];

const appointments = [
  "Lunes a viernes: 9:00 - 18:00",
  "Sábado: 9:00 - 13:00",
  "Urgencias quirúrgicas: disponibilidad coordinada",
];

function App() {
  const [expandedService, setExpandedService] = useState(null);

  const toggleService = (title) => {
    setExpandedService((currentService) =>
      currentService === title ? null : title
    );
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
            <a className="primary-action" href="tel:+528112345678">
              Agendar valoración
            </a>
            <a className="secondary-action" href="#trayectoria">
              Ver credenciales
            </a>
          </div>
        </div>
        <aside className="profile-panel" aria-label="Resumen del médico">
          <img
            src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=900&q=85"
            alt="Médico cirujano con bata en consultorio"
          />
          <div className="profile-info">
            <span>Certificado por consejo</span>
            <strong>Cirujano general</strong>
            <p>Hospital Ángeles Valle Oriente · Monterrey, N.L.</p>
          </div>
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
              <span>{item.year}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-band" id="contacto">
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
          <a className="primary-action full" href="mailto:consulta@dravarela.mx">
            consulta@dravarela.mx
          </a>
        </div>
      </section>
    </main>
  );
}

export default App;
