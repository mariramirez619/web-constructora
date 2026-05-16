import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAsoU-fVdJKq-w4tCJk7rYC1lzDaMv-jTM",
  authDomain: "constructora-myr.firebaseapp.com",
  projectId: "constructora-myr",
  storageBucket: "constructora-myr.firebasestorage.app",
  messagingSenderId: "270011059674",
  appId: "1:270011059674:web:5fd43d64861dfe456d44e3",
  measurementId: "G-EDWCXGF60D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatLogs = document.getElementById('chat-logs');
const chatInputArea = document.getElementById('chat-input-area');

let formData = {};
let currentFlow = "";
let currentStepIndex = 0;

const flowConfig = {
    start: {
        botMsg: "¡Hola! Bienvenido a MYR Proyectos y Construcciones. ¿En qué te podemos ayudar hoy?",
        type: "options",
        options: [
            "Remodelación",
            "Construcción de vivienda",
            "Proyectos urbanísticos",
            "Acabados y carpintería"
        ]
    },
    "Remodelación": [
        { key: "spaceToRemodel", botMsg: "¿Qué espacio te gustaría remodelar? (Ej. Cocina, baño, casa completa...)", type: "text" },
        { key: "problemToSolve", botMsg: "¿Qué problema principal quieres solucionar con esta remodelación?", type: "text" },
        { key: "approxArea", botMsg: "¿Cuál es el área aproximada a remodelar? (en metros cuadrados)", type: "text" }
    ],
    "Construcción de vivienda": [
        { key: "hasLot", botMsg: "¿Cuentas con un lote para la construcción?", type: "options", options: ["Sí", "No"] },
        { key: "constructionArea", botMsg: "¿Cuál es el área aproximada que deseas construir?", type: "text" },
        { key: "currentStage", botMsg: "¿En qué etapa se encuentra tu proyecto? (Ej. Solo idea, con planos, listo para iniciar...)", type: "text" }
    ],
    "Proyectos urbanísticos": [
        { key: "hasLand", botMsg: "¿Cuentas con el terreno para el proyecto?", type: "options", options: ["Sí", "No"] },
        { key: "whatToDevelop", botMsg: "¿Qué tipo de proyecto te gustaría desarrollar? (Ej. Condominio, loteo, locales...)", type: "text" },
        { key: "mainObjective", botMsg: "¿Cuál es el objetivo principal del proyecto? (Ej. Vender, rentar, uso propio...)", type: "text" },
        { key: "landSize", botMsg: "¿Cuál es el tamaño aproximado del terreno?", type: "text" }
    ],
    "Acabados y carpintería": [
        { key: "whatNeed", botMsg: "¿Qué tipo de acabados o carpintería necesitas? (Ej. Closets, puertas, pisos...)", type: "text" },
        { key: "problemToSolveAcabados", botMsg: "¿Qué necesidad buscas resolver con esto?", type: "text" },
        { key: "spaceSize", botMsg: "¿Cuál es el tamaño del espacio a intervenir?", type: "text" }
    ],
    final: [
        { key: "fullName", botMsg: "¡Perfecto! Ya casi terminamos. Por favor, indícanos tu nombre completo.", type: "text" },
        { key: "contactNumber", botMsg: "¿A qué número de teléfono o WhatsApp nos podemos comunicar contigo?", type: "text" },
        { key: "acceptHabeasData", botMsg: "Para poder contactarte, necesitamos que aceptes nuestros Términos y Condiciones y Política de Privacidad (Normativa Habeas Data en Colombia). ¿Aceptas?", type: "options", options: ["Sí, acepto"] }
    ]
};

function addBotMessage(msg) {
    const div = document.createElement('div');
    div.className = 'msg-bot';
    div.textContent = msg;
    chatLogs.appendChild(div);
    chatLogs.scrollTop = chatLogs.scrollHeight;
}

function addUserMessage(msg) {
    const div = document.createElement('div');
    div.className = 'msg-user';
    div.textContent = msg;
    chatLogs.appendChild(div);
    chatLogs.scrollTop = chatLogs.scrollHeight;
}

function renderInput(stepConfig) {
    chatInputArea.innerHTML = '';
    if (stepConfig.type === 'options') {
        const container = document.createElement('div');
        container.className = 'opciones-container';
        stepConfig.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-chat-opcion';
            btn.textContent = opt;
            btn.onclick = () => handleUserInput(opt, stepConfig.key);
            container.appendChild(btn);
        });
        chatInputArea.appendChild(container);
    } else if (stepConfig.type === 'text') {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'input-chat-texto';
        input.placeholder = 'Escribe tu respuesta...';
        
        const btn = document.createElement('button');
        btn.className = 'btn-chat-enviar';
        btn.textContent = 'Enviar';
        
        const submit = () => {
            const val = input.value.trim();
            if (val) handleUserInput(val, stepConfig.key);
        };
        
        btn.onclick = submit;
        input.onkeypress = (e) => { if (e.key === 'Enter') submit(); };
        
        chatInputArea.appendChild(input);
        chatInputArea.appendChild(btn);
        input.focus();
    }
}

function handleUserInput(value, key) {
    addUserMessage(value);
    
    if (currentFlow === "") {
        formData.serviceType = value;
        currentFlow = value;
        currentStepIndex = 0;
        nextStep();
    } else {
        formData[key] = value;
        currentStepIndex++;
        nextStep();
    }
}

async function nextStep() {
    let steps = [];
    if (currentFlow !== "") {
        steps = flowConfig[currentFlow];
    }
    
    if (currentStepIndex < steps.length) {
        const step = steps[currentStepIndex];
        addBotMessage(step.botMsg);
        renderInput(step);
    } else {
        const finalSteps = flowConfig.final;
        const finalIndex = currentStepIndex - steps.length;
        
        if (finalIndex < finalSteps.length) {
            const step = finalSteps[finalIndex];
            addBotMessage(step.botMsg);
            renderInput(step);
        } else {
            chatInputArea.innerHTML = '<p style="margin:0; font-size: 0.95rem; color: #64748b;">Enviando información...</p>';
            
            try {
                formData.createdAt = new Date();
                await addDoc(collection(db, "leads_clientes"), formData);
                addBotMessage("¡Gracias! Hemos recibido tu información exitosamente. Nos pondremos en contacto contigo muy pronto.");
                chatInputArea.innerHTML = '';
            } catch (e) {
                console.error("Error adding document: ", e);
                addBotMessage("Hubo un error al enviar tu información. Por favor, intenta más tarde o comunícate directamente a nuestro teléfono.");
                chatInputArea.innerHTML = '';
            }
        }
    }
}

// Inicializa el chat después de cargar
setTimeout(() => {
    addBotMessage(flowConfig.start.botMsg);
    renderInput(flowConfig.start);
}, 500);
