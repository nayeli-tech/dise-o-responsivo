/**
 * APSTI Dashboard - JavaScript Interactivo
 * Funcionalidades: Formulario de contacto, Toast notifications,
 * Tarjetas interactivas, Galería, Calculadora de breakpoints,
 * Notas rápidas, Reloj en tiempo real, Modales
 */

// ============================================
// UTILIDADES
// ============================================

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'warning', 'info'
 * @param {string} title - Título opcional
 */
function showToast(message, type = 'info', title = '') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const titles = {
        success: 'Éxito',
        error: 'Error',
        warning: 'Advertencia',
        info: 'Información'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title || titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
        <div class="toast-progress"></div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'toastSlideOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }
    }, 4000);

    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.animation = 'toastSlideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    });
}

/**
 * Muestra u oculta el overlay de carga
 */
function toggleLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    overlay.style.display = show ? 'flex' : 'none';
}

/**
 * Abre un modal
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Cierra un modal
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// MENÚ RESPONSIVE
// ============================================

function initMenuToggle() {
    const toggle = document.getElementById('menuToggle');
    const nav = document.getElementById('mainNav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isHidden = nav.style.display === 'none';

        nav.style.display = isHidden ? 'block' : 'none';
        toggle.classList.toggle('active', isHidden);
        toggle.querySelector('.toggle-text').textContent =
            isHidden ? 'Cerrar' : 'Menú';
    });

    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 600) {
                nav.style.display = 'none';
                toggle.classList.remove('active');
                toggle.querySelector('.toggle-text').textContent = 'Menú';
            }
        });
    });
}

// ============================================
// NAVEGACIÓN ACTIVA
// ============================================

function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const section = link.dataset.section;

            showToast(
                `Navegando a: ${link.textContent.trim()}`,
                'info'
            );
        });
    });
}

// ============================================
// TARJETAS INTERACTIVAS
// ============================================

function initCards() {
    const cards = document.querySelectorAll('.card');

    const cardDetails = {
        grid: {
            title: 'CSS Grid Layout',
            content: `
                <p><strong>CSS Grid Layout</strong> es un sistema de diseño bidimensional que maneja tanto filas como columnas simultáneamente.</p>

                <h4>Propiedades clave:</h4>
                <ul>
                    <li><code>display: grid</code></li>
                    <li><code>grid-template-columns</code></li>
                    <li><code>grid-template-rows</code></li>
                    <li><code>gap</code></li>
                    <li><code>grid-area</code></li>
                </ul>

                <p><strong>Uso ideal:</strong> Dashboards, galerías y layouts complejos.</p>
            `
        },

        flexbox: {
            title: 'CSS Flexbox',
            content: `
                <p><strong>CSS Flexbox</strong> es un modelo de layout unidimensional.</p>

                <h4>Propiedades clave:</h4>
                <ul>
                    <li><code>display: flex</code></li>
                    <li><code>justify-content</code></li>
                    <li><code>align-items</code></li>
                    <li><code>flex-wrap</code></li>
                    <li><code>flex: 1</code></li>
                </ul>

                <p><strong>Uso ideal:</strong> Navegación, tarjetas y componentes.</p>
            `
        },

        media: {
            title: 'Media Queries',
            content: `
                <p><strong>Media Queries</strong> permiten adaptar estilos según el dispositivo.</p>

                <ul>
                    <li>@media (min-width: 600px)</li>
                    <li>@media (min-width: 1024px)</li>
                    <li>@media (max-width: 599px)</li>
                </ul>
            `
        },

        mobile: {
            title: 'Mobile First',
            content: `
                <p><strong>Mobile First</strong> prioriza el diseño para móviles.</p>

                <ul>
                    <li>Mejor rendimiento</li>
                    <li>Mejor SEO</li>
                    <li>Contenido prioritario</li>
                    <li>Escalabilidad</li>
                </ul>
            `
        }
    };

    cards.forEach(card => {
        const cardKey = card.dataset.card;
        const actions = card.querySelectorAll('.btn-card-action');

        actions.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();

                const action = btn.dataset.action;

                switch (action) {

                    case 'details':

                        if (cardDetails[cardKey]) {

                            document.getElementById('modalTitle').textContent =
                                cardDetails[cardKey].title;

                            document.getElementById('modalBody').innerHTML =
                                cardDetails[cardKey].content;

                            openModal('detailModal');
                        }

                        break;

                    case 'copy':

                        const codeSnippets = {

                            grid:
`.container{
 display:grid;
 grid-template-columns:repeat(3,1fr);
 gap:1rem;
}`,

                            flexbox:
`.container{
 display:flex;
 justify-content:center;
 align-items:center;
 gap:1rem;
}`
                        };

                        if (navigator.clipboard) {

                            navigator.clipboard
                                .writeText(codeSnippets[cardKey] || '')
                                .then(() => {

                                    showToast(
                                        'Código copiado al portapapeles',
                                        'success',
                                        'Copiado'
                                    );
                                });
                        }

                        break;
                }
            });
        });
    });
}
// ============================================
// GALERÍA INTERACTIVA
// ============================================

function initGallery() {

    const galleryItems =
        document.querySelectorAll('.gallery-item');

    const techInfo = {

        html5: {
            name: 'HTML5',
            desc: 'Lenguaje de marcado para estructurar contenido web.',
            year: '2014'
        },

        css3: {
            name: 'CSS3',
            desc: 'Hojas de estilo para diseño visual.',
            year: '2011'
        },

        grid: {
            name: 'CSS Grid',
            desc: 'Sistema de layout bidimensional.',
            year: '2017'
        },

        flexbox: {
            name: 'Flexbox',
            desc: 'Modelo de layout unidimensional.',
            year: '2009'
        },

        media: {
            name: 'Media Queries',
            desc: 'Adaptación de estilos según dispositivo.',
            year: '2010'
        },

        rem: {
            name: 'Rem / Em',
            desc: 'Unidades relativas escalables.',
            year: 'CSS2'
        }
    };

    galleryItems.forEach(item => {

        const tech = item.dataset.tech;
        const info = techInfo[tech];

        item.addEventListener('click', () => {

            if (!info) return;

            document.getElementById('modalTitle').textContent =
                info.name;

            document.getElementById('modalBody').innerHTML = `
                <p><strong>${info.name}</strong></p>

                <p>${info.desc}</p>

                <p>
                    <strong>Año:</strong>
                    ${info.year}
                </p>

                <div style="
                    margin-top:1rem;
                    padding:1rem;
                    background:var(--gris-claro);
                    border-radius:var(--radio-sm);
                ">
                    <p style="margin:0;">
                        Tecnología utilizada en el Dashboard APSTI.
                    </p>
                </div>
            `;

            openModal('detailModal');
        });

        const btnInfo =
            item.querySelector('.btn-gallery-info');

        if (btnInfo) {

            btnInfo.addEventListener('click', (e) => {

                e.stopPropagation();

                showToast(
                    `${info.name}: ${info.desc}`,
                    'info',
                    info.name
                );

            });
        }

    });

}

// ============================================
// CALCULADORA DE BREAKPOINTS
// ============================================

function initBreakpointCalculator() {

    const input =
        document.getElementById('breakpointInput');

    const btn =
        document.getElementById('calcBreakpoint');

    const result =
        document.getElementById('breakpointResult');

    if (!input || !btn || !result) return;

    function calculate() {

        const width =
            parseInt(input.value);

        if (isNaN(width) || width < 0) {

            result.className =
                'breakpoint-result show error';

            result.innerHTML = `
                <i class="fas fa-exclamation-circle"></i>
                Ingresa un valor válido.
            `;

            result.style.background =
                'var(--rojo-error-claro)';

            result.style.color =
                'var(--rojo-error)';

            return;
        }

        let type;
        let icon;
        let message;

        if (width < 600) {

            type = 'mobile';
            icon = 'fa-mobile-alt';

            message = `
                <strong>
                    <i class="fas ${icon}"></i>
                    Mobile Layout
                </strong>

                <br>

                Layout de una sola columna.

                <br>

                <code>
                    grid-template-columns:1fr;
                </code>
            `;

        } else if (width < 1024) {

            type = 'tablet';
            icon = 'fa-tablet-alt';

            message = `
                <strong>
                    <i class="fas ${icon}"></i>
                    Tablet Layout
                </strong>

                <br>

                Layout de 2 columnas.

                <br>

                <code>
                    grid-template-columns:
                    200px 1fr;
                </code>
            `;

        } else {

            type = 'desktop';
            icon = 'fa-desktop';

            message = `
                <strong>
                    <i class="fas ${icon}"></i>
                    Desktop Layout
                </strong>

                <br>

                Layout de 3 columnas.

                <br>

                <code>
                    grid-template-columns:
                    240px 1fr 300px;
                </code>
            `;
        }

        result.className =
            `breakpoint-result show ${type}`;

        result.innerHTML = message;

        result.style.background = '';
        result.style.color = '';
    }

    btn.addEventListener(
        'click',
        calculate
    );

    input.addEventListener(
        'keypress',
        (e) => {

            if (e.key === 'Enter') {
                calculate();
            }

        }
    );

}
// ============================================
// FORMULARIO DE CONTACTO
// ============================================

function initContactForm() {

    const form =
        document.getElementById('contactForm');

    const btnSubmit =
        document.getElementById('btnSubmit');

    const btnReset =
        document.getElementById('btnReset');

    const btnNewMessage =
        document.getElementById('btnNewMessage');

    const successMessage =
        document.getElementById('successMessage');

    const charCount =
        document.getElementById('charCount');

    const mensaje =
        document.getElementById('mensaje');

    if (!form) return;

    // ========================================
    // CONTADOR DE CARACTERES
    // ========================================

    if (mensaje && charCount) {

        mensaje.addEventListener('input', () => {

            const len =
                mensaje.value.length;

            charCount.textContent = len;

            if (len >= 450) {

                charCount.style.color =
                    'var(--rojo-error)';

            } else if (len >= 400) {

                charCount.style.color =
                    'var(--naranja-advertencia)';

            } else {

                charCount.style.color =
                    'var(--gris-texto)';
            }

        });

    }

    // ========================================
    // VALIDACIÓN EN TIEMPO REAL
    // ========================================

    const fields = [
        'nombre',
        'email',
        'asunto',
        'mensaje'
    ];

    fields.forEach(fieldId => {

        const field =
            document.getElementById(fieldId);

        if (!field) return;

        field.addEventListener(
            'blur',
            () => validateField(field)
        );

        field.addEventListener(
            'input',
            () => {

                const group =
                    field.closest('.form-group');

                if (
                    group &&
                    group.classList.contains('error')
                ) {
                    validateField(field);
                }

            }
        );

    });

    // ========================================
    // VALIDAR CAMPO
    // ========================================

    function validateField(field) {

        const group =
            field.closest('.form-group');

        if (!group) return true;

        let isValid = true;

        const value =
            field.value.trim();

        group.classList.remove(
            'error',
            'success'
        );

        switch (field.id) {

            case 'nombre':

                isValid =
                    value.length >= 2;

                break;

            case 'email':

                isValid =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(value);

                break;

            case 'asunto':

                isValid =
                    value !== '';

                break;

            case 'mensaje':

                isValid =
                    value.length >= 10;

                break;
        }

        if (value === '') {
            isValid = false;
        }

        if (!isValid && value !== '') {

            group.classList.add('error');

        } else if (isValid && value !== '') {

            group.classList.add('success');

        }

        return isValid;
    }

    // ========================================
    // VALIDAR FORMULARIO COMPLETO
    // ========================================

    function validateForm() {

        let isValid = true;

        fields.forEach(fieldId => {

            const field =
                document.getElementById(fieldId);

            if (
                field &&
                !validateField(field)
            ) {
                isValid = false;
            }

        });

        const privacidad =
            document.getElementById(
                'privacidad'
            );

        const privGroup =
            privacidad?.closest(
                '.form-group'
            );

        if (privacidad && privGroup) {

            privGroup.classList.remove(
                'error'
            );

            if (!privacidad.checked) {

                privGroup.classList.add(
                    'error'
                );

                isValid = false;
            }
        }

        return isValid;
    }

    // ========================================
    // ENVÍO DEL FORMULARIO
    // ========================================

    form.addEventListener(
        'submit',
        async (e) => {

            e.preventDefault();

            if (!validateForm()) {

                showToast(
                    'Corrige los errores del formulario',
                    'error',
                    'Validación'
                );

                const firstError =
                    form.querySelector(
                        '.error'
                    );

                if (firstError) {

                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });

                }

                return;
            }

            btnSubmit.disabled = true;

            btnSubmit.querySelector(
                '.btn-text'
            ).style.display = 'none';

            btnSubmit.querySelector(
                '.btn-loading'
            ).style.display = 'flex';

            // Simulación de envío

            await new Promise(
                resolve =>
                    setTimeout(resolve, 1500)
            );

            const formData = {

                nombre:
                    document.getElementById(
                        'nombre'
                    ).value,

                email:
                    document.getElementById(
                        'email'
                    ).value,

                asunto:
                    document.getElementById(
                        'asunto'
                    )
                    .options[
                        document.getElementById(
                            'asunto'
                        ).selectedIndex
                    ].text,

                mensaje:
                    document
                        .getElementById(
                            'mensaje'
                        )
                        .value
                        .substring(0, 100) + '...'
            };
            // ====================================
            // RESUMEN DE ENVÍO
            // ====================================

            document.getElementById(
                'successDetails'
            ).innerHTML = `

                <p>
                    <strong>
                        <i class="fas fa-user"></i>
                        De:
                    </strong>
                    ${formData.nombre}
                </p>

                <p>
                    <strong>
                        <i class="fas fa-envelope"></i>
                        Email:
                    </strong>
                    ${formData.email}
                </p>

                <p>
                    <strong>
                        <i class="fas fa-tag"></i>
                        Asunto:
                    </strong>
                    ${formData.asunto}
                </p>

                <p>
                    <strong>
                        <i class="fas fa-comment"></i>
                        Mensaje:
                    </strong>
                    ${formData.mensaje}
                </p>

            `;

            // ====================================
            // MOSTRAR MENSAJE DE ÉXITO
            // ====================================

            form.style.display = 'none';

            successMessage.style.display =
                'block';

            showToast(
                'Mensaje enviado correctamente',
                'success',
                '¡Enviado!'
            );

            // ====================================
            // RESTAURAR BOTÓN
            // ====================================

            btnSubmit.disabled = false;

            btnSubmit.querySelector(
                '.btn-text'
            ).style.display = 'flex';

            btnSubmit.querySelector(
                '.btn-loading'
            ).style.display = 'none';

        }
    );

    // ========================================
    // RESET DEL FORMULARIO
    // ========================================

    btnReset?.addEventListener(
        'click',
        () => {

            form.querySelectorAll(
                '.form-group'
            ).forEach(group => {

                group.classList.remove(
                    'error',
                    'success'
                );

            });

            if (charCount) {

                charCount.textContent = '0';

                charCount.style.color =
                    'var(--gris-texto)';
            }

        }
    );

    // ========================================
    // NUEVO MENSAJE
    // ========================================

    btnNewMessage?.addEventListener(
        'click',
        () => {

            form.reset();

            form.querySelectorAll(
                '.form-group'
            ).forEach(group => {

                group.classList.remove(
                    'error',
                    'success'
                );

            });

            if (charCount) {

                charCount.textContent = '0';

                charCount.style.color =
                    'var(--gris-texto)';
            }

            form.style.display = 'flex';

            successMessage.style.display =
                'none';

        }
    );

} // FIN initContactForm()
// ============================================
// RELOJ EN TIEMPO REAL
// ============================================

function initClock() {

    const timeEl =
        document.getElementById('systemTime');

    const dateEl =
        document.getElementById('systemDate');

    if (!timeEl || !dateEl) return;

    function updateClock() {

        const now = new Date();

        timeEl.textContent =
            now.toLocaleTimeString(
                'es-ES',
                {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }
            );

        dateEl.textContent =
            now.toLocaleDateString(
                'es-ES',
                {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            );

    }

    updateClock();

    setInterval(
        updateClock,
        1000
    );

}

// ============================================
// NOTAS RÁPIDAS
// ============================================

function initNotes() {

    const input =
        document.getElementById(
            'noteInput'
        );

    const btnAdd =
        document.getElementById(
            'btnAddNote'
        );

    const list =
        document.getElementById(
            'notesList'
        );

    if (!input || !btnAdd || !list)
        return;

    // ========================================
    // CARGAR NOTAS GUARDADAS
    // ========================================

    const savedNotes =
        JSON.parse(
            localStorage.getItem(
                'apsti_notes'
            ) || '[]'
        );

    savedNotes.forEach(note =>
        addNoteToDOM(note)
    );

    // ========================================
    // AGREGAR NOTA AL DOM
    // ========================================

    function addNoteToDOM(text) {

        const li =
            document.createElement('li');

        li.className = 'note-item';

        li.innerHTML = `
            <span class="note-text">
                ${escapeHtml(text)}
            </span>

            <button
                class="btn-delete-note"
                title="Eliminar nota">

                <i class="fas fa-times"></i>

            </button>
        `;

        li.querySelector(
            '.btn-delete-note'
        ).addEventListener(
            'click',
            () => {

                li.style.animation =
                    'fadeIn 0.2s ease reverse forwards';

                setTimeout(() => {

                    li.remove();

                    saveNotes();

                    showToast(
                        'Nota eliminada',
                        'info'
                    );

                }, 200);

            }
        );

        list.appendChild(li);

    }

    // ========================================
    // GUARDAR NOTAS
    // ========================================

    function saveNotes() {

        const notes = [];

        list.querySelectorAll(
            '.note-text'
        ).forEach(el => {

            notes.push(
                el.textContent
            );

        });

        localStorage.setItem(
            'apsti_notes',
            JSON.stringify(notes)
        );

    }

    // ========================================
    // AGREGAR NOTA
    // ========================================

    function addNote() {

        const text =
            input.value.trim();

        if (!text) {

            showToast(
                'Escribe algo antes de agregar',
                'warning'
            );

            return;
        }

        addNoteToDOM(text);

        saveNotes();

        input.value = '';

        input.focus();

        showToast(
            'Nota agregada',
            'success'
        );

    }

    btnAdd.addEventListener(
        'click',
        addNote
    );

    input.addEventListener(
        'keypress',
        (e) => {

            if (e.key === 'Enter') {
                addNote();
            }

        }
    );

}

// ============================================
// ESCAPAR HTML
// ============================================

function escapeHtml(text) {

    const div =
        document.createElement('div');

    div.textContent = text;

    return div.innerHTML;

}
// ============================================
// RECORDATORIOS DE SESIONES
// ============================================

function initReminders() {

    const reminderBtns =
        document.querySelectorAll(
            '.btn-reminder'
        );

    reminderBtns.forEach(btn => {

        btn.addEventListener(
            'click',
            () => {

                const isActive =
                    btn.classList.contains(
                        'active'
                    );

                const sessionItem =
                    btn.closest(
                        '.session-item'
                    );

                const sessionTitle =
                    sessionItem
                        ?.querySelector(
                            '.session-title'
                        )
                        ?.textContent ||
                    'Sesión';

                if (isActive) {

                    btn.classList.remove(
                        'active'
                    );

                    btn.innerHTML =
                        '<i class="far fa-bell"></i>';

                    showToast(
                        `Recordatorio eliminado para: ${sessionTitle}`,
                        'info'
                    );

                } else {

                    btn.classList.add(
                        'active'
                    );

                    btn.innerHTML =
                        '<i class="fas fa-bell"></i>';

                    showToast(
                        `Recordatorio activado para: ${sessionTitle}`,
                        'success',
                        'Recordatorio'
                    );

                }

            }
        );

    });

}

// ============================================
// MODALES DEL FOOTER
// ============================================

function initFooterModals() {

    const footerLinks =
        document.querySelectorAll(
            '.footer-link[data-modal]'
        );

    footerLinks.forEach(link => {

        link.addEventListener(
            'click',
            (e) => {

                e.preventDefault();

                const modalType =
                    link.dataset.modal;

                switch (modalType) {

                    case 'politicas':

                        openModal(
                            'policyModal'
                        );

                        break;

                    case 'terminos':

                        showToast(
                            'Términos y condiciones: uso educativo del dashboard.',
                            'info',
                            'Términos'
                        );

                        break;

                    case 'contacto':

                        document
                            .getElementById(
                                'contactForm'
                            )
                            ?.scrollIntoView({
                                behavior: 'smooth'
                            });

                        showToast(
                            'Desplázate al formulario de contacto',
                            'info'
                        );

                        break;

                    case 'soporte':

                        showToast(
                            'Soporte técnico disponible de lunes a viernes de 9am a 6pm.',
                            'info',
                            'Soporte'
                        );

                        break;

                }

            }
        );

    });

    // ========================================
    // BOTONES DE CIERRE
    // ========================================

    document.getElementById(
        'modalClose'
    )?.addEventListener(
        'click',
        () => closeModal(
            'detailModal'
        )
    );

    document.getElementById(
        'btnModalClose'
    )?.addEventListener(
        'click',
        () => closeModal(
            'detailModal'
        )
    );

    document.getElementById(
        'policyModalClose'
    )?.addEventListener(
        'click',
        () => closeModal(
            'policyModal'
        )
    );

    document.getElementById(
        'btnPolicyClose'
    )?.addEventListener(
        'click',
        () => closeModal(
            'policyModal'
        )
    );

    // ========================================
    // CERRAR AL HACER CLICK FUERA
    // ========================================

    document
        .querySelectorAll('.modal')
        .forEach(modal => {

            modal.addEventListener(
                'click',
                (e) => {

                    if (e.target === modal) {
                        closeModal(modal.id);
                    }

                }
            );

        });

    // ========================================
    // CERRAR CON ESC
    // ========================================

    document.addEventListener(
        'keydown',
        (e) => {

            if (e.key === 'Escape') {

                document
                    .querySelectorAll(
                        '.modal.active'
                    )
                    .forEach(modal => {

                        closeModal(
                            modal.id
                        );

                    });

            }

        }
    );

    // ========================================
    // POLÍTICA DE PRIVACIDAD
    // ========================================

    document
        .querySelector(
            '.link-privacidad'
        )
        ?.addEventListener(
            'click',
            (e) => {

                e.preventDefault();

                openModal(
                    'policyModal'
                );

            }
        );

}

// ============================================
// ANIMACIONES DE SCROLL
// ============================================

function initScrollAnimations() {

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            '1';

                        entry.target.style.transform =
                            'translateY(0)';

                    }

                });

            },
            {
                threshold: 0.1
            }
        );

    document
        .querySelectorAll(
            '.card, .gallery-item, .session-item'
        )
        .forEach(element => {

            element.style.opacity = '0';

            element.style.transform =
                'translateY(20px)';

            element.style.transition =
                'opacity 0.5s ease, transform 0.5s ease';

            observer.observe(element);

        });

}

// ============================================
// INICIALIZACIÓN GENERAL
// ============================================

document.addEventListener(
    'DOMContentLoaded',
    () => {

        initMenuToggle();

        initNavigation();

        initCards();

        initGallery();

        initBreakpointCalculator();

        initContactForm();

        initClock();

        initNotes();

        initReminders();

        initFooterModals();

        initScrollAnimations();

        // ===============================
        // TOAST DE BIENVENIDA
        // ===============================

        setTimeout(() => {

            showToast(
                'Bienvenido al Dashboard APSTI. Explora las funcionalidades interactivas.',
                'info',
                'Bienvenido'
            );

        }, 800);

    }
);