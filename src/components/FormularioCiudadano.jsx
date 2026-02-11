import React, { useState, useEffect } from "react";
import "../styles/formulario.css";
import bannerImg from "../assets/cc2.webp";
import { enviarEmailBienvenida } from "../services/email";

export default function FormularioCiudadano() {
    const [form, setForm] = useState({
        nombre: "",
        cedula: "",
        email: "",
        telefono: "",
        municipio: "",
        municipioFull: "",
        zonaPopayan: [],
        barrio: "",
        profesion: "",
        interes: "",
        vehiculo: "",
        roles: [],
        frecuencia: "",
        redes: "",
        comentario: "",
        datos: false,
        referido: ""
    });


    const [showReferido, setShowReferido] = useState(false);

    /* ================= HANDLERS ================= */
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox" && Array.isArray(form[name])) {
            setForm({
                ...form,
                [name]: checked
                    ? [...form[name], value]
                    : form[name].filter((v) => v !== value),
            });
        } else if (type === "checkbox") {
            setForm({ ...form, [name]: checked });
        } else {
            // ------------- 🚀 CONCANTENAR MUNICIPIO -------------
            if (name === "municipioSelect") {
                const valueConCauca = `${value}, Cauca, Colombia`;

                setForm({
                    ...form,
                    municipio: value,
                    municipioFull: valueConCauca,
                    ...(value !== "Popayan" ? { zonaPopayan: [] } : {})
                });

                return;
            }


            setForm({
                ...form,
                [name]: value,
            });
        }
    };



    const handleSubmit = async (e) => {
        e.target.submit();

        await enviarEmailBienvenida({
            cedula: form.cedula,
            celular: form.telefono,
            correoDestino: form.email,
            municipio: form.municipioFull,
            nombre: form.nombre,
            textoConsecutivo: `formulario-vinculacion-4f870.web.app?referido=${form.cedula}`,
            zonaPopayan: form.zonaPopayan.length ? form.zonaPopayan.join(", ") : "N/A"

        })
    };


    /* ================= USEEFFECT PARA REFERIDO ================= */
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const referido = params.get("referido");
        if (referido) {
            setForm((prev) => ({ ...prev, referido }));
            setShowReferido(true);
        }
    }, []);

    /* ================= OPCIONES ================= */
    const municipios = [
        { label: "Popayán", value: "Popayan" },
        { label: "Almaguer", value: "Almaguer" },
        { label: "Argelia", value: "Argelia" },
        { label: "Balboa", value: "Balboa" },
        { label: "Bolívar", value: "Bolivar" },
        { label: "Buenos Aires", value: "Buenos Aires" },
        { label: "Cajibío", value: "Cajibio" },
        { label: "Caldono", value: "Caldono" },
        { label: "Caloto", value: "Caloto" },
        { label: "Corinto", value: "Corinto" },
        { label: "El Tambo", value: "El Tambo" },
        { label: "Florencia", value: "Florencia" },
        { label: "Guachené", value: "Guachene" },
        { label: "Guapi", value: "Guapi" },
        { label: "Inzá", value: "Inza" },
        { label: "Jambaló", value: "Jambalo" },
        { label: "La Sierra", value: "La Sierra" },
        { label: "La Vega", value: "La Vega" },
        { label: "López de Micay", value: "Lopez de Micay" },
        { label: "Mercaderes", value: "Mercaderes" },
        { label: "Miranda", value: "Miranda" },
        { label: "Morales", value: "Morales" },
        { label: "Padilla", value: "Padilla" },
        { label: "Páez", value: "Paez" },
        { label: "Patía", value: "Patia" },
        { label: "Piamonte", value: "Piamonte" },
        { label: "Piendamó", value: "Piendamo" },
        { label: "Puerto Tejada", value: "Puerto Tejada" },
        { label: "Puracé", value: "Purace" },
        { label: "Rosas", value: "Rosas" },
        { label: "San Sebastián", value: "San Sebastian" },
        { label: "Santa Rosa", value: "Santa Rosa" },
        { label: "Santander de Quilichao", value: "Santander de Quilichao" },
        { label: "Silvia", value: "Silvia" },
        { label: "Sotará", value: "Sotara" },
        { label: "Suárez", value: "Suarez" },
        { label: "Sucre", value: "Sucre" },
        { label: "Timbío", value: "Timbio" },
        { label: "Timbiquí", value: "Timbiki" },
        { label: "Toribío", value: "Toribio" },
        { label: "Totoró", value: "Totoro" },
        { label: "Villa Rica", value: "Villa Rica" }
    ];


    const zonasPopayan = [
        "Comuna 1", "Comuna 2", "Comuna 3", "Comuna 4", "Comuna 5", "Comuna 6", "Comuna 7",
        "Comuna 8", "Comuna 9"
    ];

    const rolesOpciones = [
        "Logística, Organización de Eventos y Avanzada",
        "Instalación de publicidad (Afiches, pasacalles)",
        "Manejo de Redes Sociales y Contenido Digital",
        "Distribución de Material Publicitario (Volanteo, Pegatinas) y acompañamiento en caminatas",
        "Trabajo Comunitario/Barrial y generar convocatorias a reuniones",
        "Conducción y Transporte (si cuenta con vehículo)",
        "Servicios legales, administrativos o contables",
        "Call Center/Contacto Telefónico/Whatsapp",
        "Sólo votaré por el y recomendaré a allegados",
        "Quiero ser testigo el día de la votación",
        "Otro (Especifique al final del formulario)"
    ];

    const interesOpciones = [
  "🔥 Soy líder, promuevo a César Cristian y quiero trabajar más activamente",
  "Trabajo activamente por César Cristian y quiero pertenecer a su estructura",
  "Hago parte de la estructura de campaña de César Cristian",
  "Conozco a César Cristian y quiero hacer parte de la campaña",
  "Sigo a César Cristian en redes sociales y me interesa promoverlo",
  "No conozco a César Cristian pero me interesa conocer su causa"
];


    return (
        <div className="contenedor">

            {/* ================= HERO ================= */}
            <section className="hero">
                <div className="hero-content">

                    <div className="hero-text">
                        <h1>
                            REGISTRO OFICIAL DE LIDERAZGO

                        </h1>

                        <p style={{ fontWeight: "bold", marginTop: "10px" }}>
                            “Organicemos la casa para ganar”
                        </p>

                        <p>
                            Este equipo se construye con organización, no improvisación.
                        </p>

                        <p className="warning">
                            ⚠️ El que no se registra, no existe en el sistema.
                        </p>


                        <p className="nota">
                            ✔ Registra tus datos reales<br />
                            ✔ Obtén tu <strong>Link Único de Líder</strong><br />
                            ✔ Comparte y fortalece tu equipo
                        </p>

                        <p style={{ fontStyle: "italic", marginTop: "12px" }}>
                            “Reviso personalmente el crecimiento de cada equipo.”
                            <br />
                            — César Cristian Gómez Castro
                        </p>
                    </div>

                    <img
                        src={bannerImg}
                        alt="Candidato"
                        className="hero-img"
                        loading="lazy"
                        decoding="async"
                    />

                </div>
            </section>


            {/* ================= CARD FORM ================= */}
            <div className="card">
                <form
                    action="https://script.google.com/macros/s/AKfycbw1so1eBCleKt42WMarFduI06sEiONRIZW_t0D3ZHy8pW6qnbVN2nurGv0z879gMjQ3/exec"
                    method="POST"
                    target="_blank"
                    onSubmit={handleSubmit}
                >

                    {/* 👤 DATOS PERSONALES */}
                    <h2 className="section full">
                        👤 Datos personales
                        {showReferido && (
                            <span style={{ marginLeft: "15px", fontWeight: "normal", fontSize: "16px", color: "#555" }}>
                                — Referido por: C.C {form.referido}
                            </span>
                        )}
                    </h2>

                    {showReferido && (
                        <input type="hidden" name="referido" value={form.referido} />
                    )}

                    <label>Nombre Completo *</label>
                    <input
                        name="nombre"
                        value={form.nombre || ""}
                        required
                        onChange={handleChange}
                    />

                    <label>Número de Cédula de Ciudadanía (Obligatorio) POR FAVOR SIN PUNTOS NI COMAS *</label>
                    <input
                        name="cedula"
                        value={form.cedula || ""}
                        required
                        onChange={handleChange}
                    />

                    <label>Correo Electrónico *</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email || ""}
                        required
                        onChange={handleChange}
                    />

                    <label>Número de Teléfono Celular *</label>
                    <input
                        name="telefono"
                        value={form.telefono || ""}
                        required
                        onChange={handleChange}
                    />


                    {/* 📍 UBICACIÓN */}
                    <h2 className="section full">📍 Ubicación</h2>

                    <label>¿En qué municipio del Cauca reside actualmente? *</label>
                    <select
                        name="municipioSelect"
                        value={form.municipio || ""}
                        required
                        onChange={handleChange}
                    >
                        <option value="">Seleccione</option>
                        {municipios.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>

                    {/* CAMPO OCULTO PARA ENVIAR "Municipio, Cauca, Colombia" */}
                    <input type="hidden" name="municipio" value={form.municipioFull} />



                    {form.municipio === "Popayan" && (
                        <>
                            <label className="full">
                                Opcional ¿Si eres de Popayán en que zonas tienes influencia? (Vives, trabajas o haces trabajo social) SI NO ERES DE POPAYÁN OMITE ESTA PREGUNTA.
                            </label>

                            <div className="checkbox-group full">
                                {zonasPopayan.map((z) => (
                                    <label key={z} className="checkbox">
                                        <input
                                            type="checkbox"
                                            name="zonaPopayan"
                                            value={z}
                                            checked={form.zonaPopayan.includes(z)}
                                            onChange={handleChange}
                                        />
                                        <span>{z}</span>
                                    </label>
                                ))}
                            </div>
                        </>
                    )}




                    <label>¿En que barrio o vereda vives? *</label>
                    <input name="barrio" value={form.barrio || ""} required onChange={handleChange} />

                    <label>¿Qué profesión u oficio tienes?</label>
                    <input name="profesion" value={form.profesion || ""} onChange={handleChange} />

                    {/* ❤️ PARTICIPACIÓN */}
                    <h2 className="section full">❤️ Participación</h2>
                    <label className="full">¿Cuál es su nivel de interés para apoyar la campaña? *</label>
                    <div className="radio-group full">
                        {interesOpciones.map((op) => (
                            <label key={op} className="radio">
                                <input type="radio" name="interes" value={op} checked={form.interes === op} required onChange={handleChange} />
                                <span>{op}</span>
                            </label>
                        ))}
                    </div>

                    <label>¿Tienes vehículo y quieres instalar microperforado en tu carro? *</label>
                    <select name="vehiculo" value={form.vehiculo || ""} required onChange={handleChange}>
                        <option value="">Seleccione</option>
                        <option value="Sí">Sí</option>
                        <option value="No">No</option>
                    </select>

                    {/* 🛠 ROLES */}
                    <h2 className="section full">🛠 Colaboración</h2>
                    <label className="full">¿En qué áreas o roles le gustaría colaborar? *</label>
                    <div className="checkbox-group full">
                        {rolesOpciones.map((r) => (
                            <label key={r} className="checkbox">
                                <input type="checkbox" name="roles" value={r} checked={form.roles.includes(r)} onChange={handleChange} />
                                <span>{r}</span>
                            </label>
                        ))}
                    </div>

                    {/* ⏰ DISPONIBILIDAD */}
                    <h2 className="section full">⏰ Disponibilidad</h2>
                    <label>¿Con qué frecuencia podría dedicar tiempo a la campaña? *</label>
                    <select name="frecuencia" value={form.frecuencia || ""} required onChange={handleChange}>
                        <option value="">Seleccione una opción</option>
                        <option value="Ocasional">Ocasionalmente (Eventos puntuales)</option>
                        <option value="Semanal">Algunas horas a la semana</option>
                        <option value="Parcial">Tiempo parcial (Algunos días)</option>
                        <option value="Completo">Tiempo completo</option>
                    </select>

                    <label>Por favor, califique su experiencia o habilidad en el uso de Redes Sociales (Facebook, Instagram, WhatsApp, etc.) para fines políticos o de difusión. *</label>
                    <select name="redes" value={form.redes || ""} required onChange={handleChange}>
                        <option value="">Seleccione una calificación</option>
                        <option value="1">1 - Baja o nula</option>
                        <option value="2">2 - Básica</option>
                        <option value="3">3 - Intermedia</option>
                        <option value="4">4 - Buena</option>
                        <option value="5">5 - Experto / Muy hábil</option>
                    </select>

                    {/* 💬 COMENTARIOS */}
                    <h2 className="section full">💬 Comentarios</h2>
                    <label className="full">¿Desea especificar algún comentario adicional o indicar otra forma de apoyo no mencionada?</label>
                    <textarea className="full" name="comentario" value={form.comentario || ""} onChange={handleChange} />

                    <label className="checkbox full">
                        <input type="checkbox" name="datos" checked={form.datos} required onChange={handleChange} />
                        <span>
                            Acepto el tratamiento de mis datos personales para fines relacionados con la campaña política de César Cristian Representante a la Cámara por El Cauca. He leído y entendido la Política de Tratamiento de Datos Personales disponible en www.cesarcristian.com.
                        </span>
                    </label>

                    <button type="submit" className="btn-submit">
    🔴 UNIRME AL EQUIPO Y REGISTRARME
</button>


                </form>
            </div>
        </div>
    );
}

