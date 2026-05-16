document.addEventListener('DOMContentLoaded', () => {
    // Determine base path
    let basePath = './';
    const path = window.location.pathname;
    if (path.includes('/pages/') || path.includes('/servicios/') || path.includes('/proyectos/')) {
        basePath = '../';
    }

    const headerTemplate = `
<div class="container">
    <a href="${basePath}index.html" class="logo">
        <img src="${basePath}assets/images/branding/LOGO MYR PROYECTOS OK.JPG" alt="MYR Proyectos Logo" onerror="this.src=''; this.alt='MYR Proyectos'; this.style.fontSize='1.5rem'; this.style.fontWeight='bold'; this.style.color='#fff';">
    </a>
    
    <nav class="nav-menu">
        <a href="${basePath}index.html" class="nav-link">Inicio</a>
        <a href="${basePath}pages/proyectos.html" class="nav-link">Proyectos</a>
        <div class="dropdown">
            <a href="${basePath}pages/servicios.html" class="nav-link">Servicios</a>
            <div class="dropdown-content">
                <a href="${basePath}servicios/remodelaciones.html">Remodelaciones</a>
                <a href="${basePath}servicios/construccion.html">Construcción</a>
                <a href="${basePath}servicios/urbanisticos.html">Proyectos Urbanísticos</a>
                <a href="${basePath}servicios/acabados.html">Acabados y Carpintería</a>
            </div>
        </div>
        <a href="${basePath}pages/nosotros.html" class="nav-link">Nosotros</a>
    </nav>

    <div class="menu-toggle">
        <span></span>
        <span></span>
        <span></span>
    </div>
</div>
`;

    const footerTemplate = `
<div class="container">
    <div class="footer-grid">
        <div class="footer-brand">
            <a href="${basePath}index.html" class="footer-logo">
                <img src="${basePath}assets/images/branding/LOGO MYR PROYECTOS OK.JPG" alt="MYR Proyectos Logo" style="height: 50px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);" onerror="this.style.display='none'">
            </a>
            <h3 style="color: #ffffff; font-size: 1.1rem; margin: 0;">MYR Proyectos y Construcciones SAS</h3>
        </div>
        
        <div class="footer-info">
            <div style="display: flex; gap: 20px; align-items: center;">
                <p style="margin: 0; line-height: 1.4; white-space: nowrap;">📍 Cra 2 A sur 75 B - 25 Local S101<br>Edificio Alto de Rincón de Varsovia<br>Ibagué, Tolima</p>
                <div class="social-icons" style="margin-left: 20px;">
                    <a href="https://wa.me/573188749076" target="_blank" aria-label="WhatsApp">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    </a>
                    <a href="https://www.facebook.com/p/MYR-Proyectos-y-Construcciones-100054053153405/?locale=es_LA" target="_blank" aria-label="Facebook">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="mailto:myrproyectosyconstrucciones@gmail.com" aria-label="Email">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="footer-bottom">
        <p>&copy; 2026 MYR Proyectos y Construcciones SAS. Todos los derechos reservados.</p>
        <div class="footer-links" style="margin-top: 0;">
            <a href="${basePath}pages/terminos.html">Términos y condiciones</a>
            <a href="${basePath}pages/politica-datos.html">Políticas de privacidad</a>
        </div>
    </div>
</div>
`;

    // ── CHAT WIDGET POPUP ────────────────────────────────────────────────
    const chatWidgetHTML = `
<style>
  #myr-chat-widget {
    position: fixed;
    bottom: 90px;
    right: 24px;
    width: 370px;
    max-height: 560px;
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    z-index: 9999;
    transform: scale(0.85) translateY(20px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    font-family: 'Inter', sans-serif;
    border: 1px solid rgba(44, 44, 42, 0.1);
  }
  #myr-chat-widget.open {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: all;
  }
  #myr-chat-header {
    background: #2c2c2a;
    padding: 16px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }
  #myr-chat-header .chat-avatar {
    width: 38px; height: 38px;
    background: #f76205;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; font-weight: 700; color: #ffffff;
  }
  #myr-chat-header .chat-info { flex: 1; }
  #myr-chat-header .chat-info strong { color: #ffffff; font-size: 0.95rem; display: block; }
  #myr-chat-header .chat-info span { color: #f5f0e8; opacity: 0.7; font-size: 0.78rem; }
  #myr-chat-close {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.6); font-size: 1.4rem; line-height: 1;
    padding: 4px; border-radius: 6px; transition: color 0.2s;
  }
  #myr-chat-close:hover { color: #ffffff; }
  #myr-chat-logs {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #f5f0e8;
    min-height: 300px;
    max-height: 380px;
  }
  #myr-chat-logs .msg-bot {
    background: #2c2c2a; color: #ffffff;
    padding: 10px 14px; border-radius: 14px 14px 14px 4px;
    max-width: 88%; align-self: flex-start;
    font-size: 0.88rem; line-height: 1.5;
  }
  #myr-chat-logs .msg-user {
    background: #ffffff; color: #2c2c2a;
    padding: 10px 14px; border-radius: 14px 14px 4px 14px;
    max-width: 88%; align-self: flex-end;
    font-size: 0.88rem; font-weight: 500; line-height: 1.5;
    border: 1px solid rgba(44, 44, 42, 0.05);
  }
  #myr-chat-input-area {
    padding: 12px 14px;
    border-top: 1px solid rgba(44, 44, 42, 0.1);
    background: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }
  .myr-opciones { display: flex; flex-wrap: wrap; gap: 6px; }
  .myr-btn-opcion {
    background: #2d6a4f; color: #ffffff;
    border: none; padding: 8px 14px;
    border-radius: 18px; cursor: pointer;
    font-size: 0.82rem; font-weight: 600;
    font-family: 'Inter', sans-serif;
    transition: background 0.2s, transform 0.1s;
  }
  .myr-btn-opcion:hover { background: #1e4d38; transform: scale(1.02); }
  .myr-input-row { display: flex; gap: 8px; }
  .myr-input-texto {
    flex: 1; padding: 10px 12px;
    border: 1px solid rgba(44, 44, 42, 0.2); border-radius: 8px;
    font-size: 0.88rem; font-family: 'Inter', sans-serif;
    outline: none;
    color: #2c2c2a;
  }
  .myr-input-texto:focus { border-color: #f76205; }
  .myr-btn-send {
    background: #f76205; color: #ffffff;
    border: none; padding: 10px 16px;
    border-radius: 8px; cursor: pointer;
    font-weight: 600; font-family: 'Inter', sans-serif;
    font-size: 0.88rem; transition: background 0.2s;
  }
  .myr-btn-send:hover { background: #e05504; }
  #myr-float-btn {
    position: fixed;
    bottom: 24px; right: 24px;
    width: 56px; height: 56px;
    background: #f76205;
    border-radius: 50%;
    box-shadow: 0 8px 24px rgba(247, 98, 5, 0.35);
    cursor: pointer;
    z-index: 9998;
    display: flex; align-items: center; justify-content: center;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 3px solid rgba(255,255,255,0.15);
  }
  #myr-float-btn:hover { transform: scale(1.1); box-shadow: 0 12px 32px rgba(247, 98, 5, 0.45); }
  #myr-float-btn img { width: 30px; height: 30px; object-fit: contain; }
  #myr-float-btn .myr-badge {
    position: absolute; top: -4px; right: -4px;
    width: 14px; height: 14px;
    background: #2d6a4f; border-radius: 50%;
    border: 2px solid #ffffff;
  }
  @media (max-width: 480px) {
    #myr-chat-widget {
      width: calc(100vw - 20px);
      right: 10px;
      bottom: 80px;
      max-height: 70vh;
    }
  }
</style>

<div id="myr-float-btn">
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    <line x1="9" y1="10" x2="15" y2="10"></line>
    <line x1="9" y1="14" x2="15" y2="14"></line>
  </svg>
  <span class="myr-badge"></span>
</div>

<div id="myr-chat-widget">
  <div id="myr-chat-header">
    <div class="chat-avatar">M</div>
    <div class="chat-info">
      <strong>MYR Proyectos</strong>
      <span>⬤ En línea — Respondemos rápido</span>
    </div>
    <button id="myr-chat-close">✕</button>
  </div>
  <div id="myr-chat-logs"></div>
  <div id="myr-chat-input-area"></div>
</div>
`;

    // Load Header
    const headerPlaceholder = document.getElementById('main-header');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerTemplate;
        initMenu();
    }

    // Load Footer
    const footerPlaceholder = document.getElementById('main-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerTemplate;
    }

    // Inject chat widget
    if (!document.getElementById('myr-chat-widget')) {
        document.body.insertAdjacentHTML('beforeend', chatWidgetHTML);
        initChatWidget();
    }

    function initMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                const spans = menuToggle.querySelectorAll('span');
                if (navMenu.classList.contains('active')) {
                    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            });
        }
    }

    // ── SERVICE CTA buttons → abren el popup ──────────────────────────────
    setTimeout(() => {
        const ctaButtons = document.querySelectorAll('.tally-trigger');
        ctaButtons.forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openChatWidget();
            });
        });
    }, 800);

    // ── CHAT WIDGET LOGIC ─────────────────────────────────────────────────
    function openChatWidget() {
        const widget = document.getElementById('myr-chat-widget');
        const floatBtn = document.getElementById('myr-float-btn');
        
        if (widget && !widget.classList.contains('open')) {
            if (floatBtn) floatBtn.click();
        }
    }

    function initChatWidget() {
        const floatBtn = document.getElementById('myr-float-btn');
        const widget = document.getElementById('myr-chat-widget');
        const closeBtn = document.getElementById('myr-chat-close');
        const chatLogs = document.getElementById('myr-chat-logs');
        const inputArea = document.getElementById('myr-chat-input-area');

        if (!floatBtn || !widget) return;

        floatBtn.addEventListener('click', () => {
            widget.classList.toggle('open');
            if (widget.classList.contains('open') && chatLogs.children.length === 0) {
                startChat();
            }
        });

        closeBtn.addEventListener('click', () => widget.classList.remove('open'));

        // ── Firebase setup (CDN compat mode, no ES modules) ───────────────
        function getFirestore() { return window._myrDb; }

        function initFirebase() {
            return new Promise((resolve) => {
                if (window._myrDb) return resolve();
                const fbApp = document.createElement('script');
                fbApp.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js';
                fbApp.onload = () => {
                    const fbFs = document.createElement('script');
                    fbFs.src = 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore-compat.js';
                    fbFs.onload = () => {
                        if (!firebase.apps.length) {
                            firebase.initializeApp({
                                apiKey: "AIzaSyAsoU-fVdJKq-w4tCJk7rYC1lzDaMv-jTM",
                                authDomain: "constructora-myr.firebaseapp.com",
                                projectId: "constructora-myr",
                                storageBucket: "constructora-myr.firebasestorage.app",
                                messagingSenderId: "270011059674",
                                appId: "1:270011059674:web:5fd43d64861dfe456d44e3"
                            });
                        }
                        window._myrDb = firebase.firestore();
                        resolve();
                    };
                    document.head.appendChild(fbFs);
                };
                document.head.appendChild(fbApp);
            });
        }

        // ── Chat flow ─────────────────────────────────────────────────────
        let formData = {};
        let currentFlow = '';
        let currentStepIndex = 0;

        const flowConfig = {
            start: {
                botMsg: '¡Hola! 👋 Bienvenido a MYR Proyectos. ¿En qué te podemos ayudar?',
                type: 'options',
                options: ['Remodelación', 'Construcción de vivienda', 'Proyectos urbanísticos', 'Acabados y carpintería']
            },
            'Remodelación': [
                { key: 'spaceToRemodel', botMsg: '¿Qué espacio quieres remodelar? (Ej. Cocina, baño, sala...)', type: 'text' },
                { key: 'problemToSolve', botMsg: '¿Qué problema principal quieres solucionar?', type: 'text' },
                { key: 'approxArea', botMsg: '¿Cuál es el área aproximada a remodelar en m²?', type: 'text' }
            ],
            'Construcción de vivienda': [
                { key: 'hasLot', botMsg: '¿Cuentas con un lote?', type: 'options', options: ['Sí', 'No'] },
                { key: 'constructionArea', botMsg: '¿Cuál es el área aproximada que deseas construir?', type: 'text' },
                { key: 'currentStage', botMsg: '¿En qué etapa está tu proyecto? (Ej. Solo idea, con planos...)', type: 'text' }
            ],
            'Proyectos urbanísticos': [
                { key: 'hasLand', botMsg: '¿Cuentas con el terreno para el proyecto?', type: 'options', options: ['Sí', 'No'] },
                { key: 'whatToDevelop', botMsg: '¿Qué proyecto te gustaría desarrollar? (Ej. Condominio, loteo...)', type: 'text' },
                { key: 'mainObjective', botMsg: '¿Cuál es el objetivo principal? (Vender, rentar, uso propio...)', type: 'text' },
                { key: 'landSize', botMsg: '¿Cuál es el tamaño aproximado del terreno?', type: 'text' }
            ],
            'Acabados y carpintería': [
                { key: 'whatNeed', botMsg: '¿Qué tipo de acabados o carpintería necesitas?', type: 'text' },
                { key: 'problemToSolveAcabados', botMsg: '¿Qué necesidad buscas resolver?', type: 'text' },
                { key: 'spaceSize', botMsg: '¿Cuál es el tamaño del espacio a intervenir?', type: 'text' }
            ],
            final: [
                { key: 'fullName', botMsg: '¡Perfecto! ¿Cuál es tu nombre completo?', type: 'text' },
                { key: 'contactNumber', botMsg: '¿A qué número de WhatsApp te contactamos?', type: 'text' },
                { key: 'acceptHabeasData', botMsg: 'Al continuar, aceptas nuestros Términos y Condiciones y Política de Privacidad (Habeas Data Colombia). ¿Aceptas?', type: 'options', options: ['Sí, acepto'] }
            ]
        };

        function addBotMsg(msg) {
            const d = document.createElement('div');
            d.className = 'msg-bot';
            d.textContent = msg;
            chatLogs.appendChild(d);
            chatLogs.scrollTop = chatLogs.scrollHeight;
        }

        function addUserMsg(msg) {
            const d = document.createElement('div');
            d.className = 'msg-user';
            d.textContent = msg;
            chatLogs.appendChild(d);
            chatLogs.scrollTop = chatLogs.scrollHeight;
        }

        function renderInput(step) {
            inputArea.innerHTML = '';
            if (step.type === 'options') {
                const wrap = document.createElement('div');
                wrap.className = 'myr-opciones';
                step.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'myr-btn-opcion';
                    btn.textContent = opt;
                    btn.onclick = () => handleInput(opt, step.key);
                    wrap.appendChild(btn);
                });
                inputArea.appendChild(wrap);
            } else {
                const row = document.createElement('div');
                row.className = 'myr-input-row';
                const inp = document.createElement('input');
                inp.type = 'text';
                inp.className = 'myr-input-texto';
                inp.placeholder = 'Escribe tu respuesta...';
                const btn = document.createElement('button');
                btn.className = 'myr-btn-send';
                btn.textContent = '→';
                const submit = () => { if (inp.value.trim()) handleInput(inp.value.trim(), step.key); };
                btn.onclick = submit;
                inp.onkeypress = e => { if (e.key === 'Enter') submit(); };
                row.appendChild(inp);
                row.appendChild(btn);
                inputArea.appendChild(row);
                inp.focus();
            }
        }

        function handleInput(val, key) {
            addUserMsg(val);
            if (currentFlow === '') {
                formData.serviceType = val;
                currentFlow = val;
                currentStepIndex = 0;
            } else {
                formData[key] = val;
                currentStepIndex++;
            }
            nextStep();
        }

        async function nextStep() {
            const steps = flowConfig[currentFlow] || [];
            if (currentStepIndex < steps.length) {
                setTimeout(() => {
                    addBotMsg(steps[currentStepIndex].botMsg);
                    renderInput(steps[currentStepIndex]);
                }, 300);
            } else {
                const fi = currentStepIndex - steps.length;
                const finalSteps = flowConfig.final;
                if (fi < finalSteps.length) {
                    setTimeout(() => {
                        addBotMsg(finalSteps[fi].botMsg);
                        renderInput(finalSteps[fi]);
                    }, 300);
                } else {
                    inputArea.innerHTML = '<p style="font-size:0.85rem;color:#64748b;margin:0;text-align:center;">Enviando tu solicitud...</p>';
                    try {
                        await initFirebase();
                        formData.createdAt = new Date();
                        formData.source = 'widget_popup';
                        await firebase.firestore().collection('leads_clientes').add(formData);
                        setTimeout(() => {
                            addBotMsg('✅ ¡Gracias! Hemos recibido tu información. Te responderemos en cuanto podamos.');
                            addBotMsg('Si quieres un contacto más directo o inmediato, también puedes hablarnos por WhatsApp.');
                            
                            inputArea.innerHTML = '';

                            // WhatsApp Button
                            const waWrap = document.createElement('div');
                            waWrap.style.marginBottom = '8px';
                            waWrap.style.textAlign = 'center';
                            const waBtn = document.createElement('a');
                            waBtn.href = 'https://wa.me/573188749076';
                            waBtn.target = '_blank';
                            waBtn.className = 'myr-btn-opcion';
                            waBtn.style.display = 'inline-block';
                            waBtn.style.backgroundColor = '#25D366';
                            waBtn.style.textDecoration = 'none';
                            waBtn.textContent = '💬 Hablar por WhatsApp';
                            waWrap.appendChild(waBtn);
                            inputArea.appendChild(waWrap);

                            // Re-enable text input for the illusion of continuous chat
                            const row = document.createElement('div');
                            row.className = 'myr-input-row';
                            const inp = document.createElement('input');
                            inp.type = 'text';
                            inp.className = 'myr-input-texto';
                            inp.placeholder = 'Escribe un mensaje...';
                            const btn = document.createElement('button');
                            btn.className = 'myr-btn-send';
                            btn.textContent = '→';
                            
                            const submit = () => { 
                                if (inp.value.trim()) {
                                    addUserMsg(inp.value.trim());
                                    inp.value = '';
                                    setTimeout(() => {
                                        addBotMsg('¡Gracias! Que tengas un excelente día.');
                                    }, 600);
                                }
                            };
                            
                            btn.onclick = submit;
                            inp.onkeypress = e => { if (e.key === 'Enter') submit(); };
                            
                            row.appendChild(inp);
                            row.appendChild(btn);
                            inputArea.appendChild(row);

                        }, 300);
                    } catch(err) {
                        console.error(err);
                        addBotMsg('Hubo un problema al enviar. Por favor escríbenos directamente al 3188749076.');
                        inputArea.innerHTML = '';
                    }
                }
            }
        }

        function startChat() {
            const s = flowConfig.start;
            addBotMsg(s.botMsg);
            renderInput(s);
        }
    }

    // Scroll Reveal Animation Setup
    const setupScrollReveal = () => {
        const reveals = document.querySelectorAll('.card, .card-horizontal, .project-card, .section-title, .reveal-item');
        
        reveals.forEach(el => {
            if(!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
        });

        const revealOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    };

    // Hero Slider Setup
    const setupHeroSlider = () => {
        const slides = document.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;
        
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    };

    setupScrollReveal();
    setupHeroSlider();
});
