// ========== 1. CORAZÓN PRINCIPAL INTERACTIVO ==========
const corazon = document.getElementById('corazonAnimado');
const lluviaDiv = document.getElementById('lluviaCorazones');

function crearLluviaCorazones(x, y) {
    for (let i = 0; i < 15; i++) {
        const corazoncito = document.createElement('div');
        corazoncito.classList.add('corazon-flotante');
        corazoncito.innerHTML = ['❤️', '💖', '💗', '💓', '💘', '💝'][Math.floor(Math.random() * 6)];
        corazoncito.style.left = (x + (Math.random() - 0.5) * 100) + 'px';
        corazoncito.style.top = (y + (Math.random() - 0.5) * 80) + 'px';
        corazoncito.style.animationDuration = (1.5 + Math.random()) + 's';
        lluviaDiv.appendChild(corazoncito);
        setTimeout(() => corazoncito.remove(), 2000);
    }
}

corazon.addEventListener('click', (e) => {
    corazon.style.animation = 'none';
    corazon.style.transform = 'scale(0.8)';
    setTimeout(() => {
        corazon.style.animation = 'latidoSuave 1.2s infinite';
        corazon.style.transform = 'scale(1)';
    }, 150);
    
    const rect = corazon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    crearLluviaCorazones(centerX, centerY);
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            crearLluviaCorazones(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }, i * 40);
    }
});

// ========== 2. MODO OSCURO ==========
const botonModoOscuro = document.getElementById('modoOscuroBtn');
let modoOscuroActivo = false;

botonModoOscuro.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    modoOscuroActivo = document.body.classList.contains('dark-mode');
    
    if (modoOscuroActivo) {
        botonModoOscuro.textContent = '☀️ Modo claro';
        botonModoOscuro.style.background = '#ff9f43';
    } else {
        botonModoOscuro.textContent = '🌙 Modo oscuro';
        botonModoOscuro.style.background = '#2c3e50';
    }
    
    localStorage.setItem('modoOscuro', modoOscuroActivo);
});

if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
    botonModoOscuro.textContent = '☀️ Modo claro';
    botonModoOscuro.style.background = '#ff9f43';
    modoOscuroActivo = true;
}

// ========== 3. CONTADOR DE TIEMPO ==========
// CAMBIA ESTA FECHA POR LA DE SU ANIVERSARIO (año, mes-1, día)
const fechaInicio = new Date(2021, 6, 28);

function actualizarContador() {
    const ahora = new Date();
    const diff = ahora - fechaInicio;
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
    const meses = Math.floor(dias / 30.44);
    const años = Math.floor(meses / 12);
    
    const contadorDiv = document.getElementById('contadorTiempo');
    if (contadorDiv) {
        if (años > 0) {
            contadorDiv.innerHTML = `${años} año${años > 1 ? 's' : ''} · ${meses % 12} meses · ${dias % 30} días`;
        } else if (meses > 0) {
            contadorDiv.innerHTML = `${meses} mes${meses > 1 ? 'es' : ''} · ${dias % 30} días`;
        } else {
            contadorDiv.innerHTML = `${dias} día${dias > 1 ? 's' : ''} de amor`;
        }
    }
}
actualizarContador();
setInterval(actualizarContador, 86400000);

// ========== 4. FRASES ROMÁNTICAS ==========
const frases = [
    "Eres el sueño del que no quiero despertar 💭",
    "Contigo, cada día es San Valentín 🌹",
    "Eres mi persona favorita en este universo",
    "Gracias por llenar mi vida de color 🎨",
    "Te amo más que a las estrellas del cielo ⭐",
    "Eres mi hogar, mi paz, mi todo 🏠",
    "Nada tiene sentido si no estás tú",
    "Eres la mejor decisión de mi vida ❤️",
    "Cada día me enamoro más de ti",
    "Tu sonrisa ilumina mis días"
];

const fraseDiv = document.getElementById('fraseAleatoria');
const btnFrase = document.getElementById('btnFrase');

btnFrase.addEventListener('click', () => {
    const random = Math.floor(Math.random() * frases.length);
    fraseDiv.style.opacity = '0';
    setTimeout(() => {
        fraseDiv.textContent = frases[random];
        fraseDiv.style.opacity = '1';
    }, 200);
});

// ========== 5. MÚSICA ==========
const musica = document.getElementById('musicaFondo');
const botonMusica = document.getElementById('controlMusica');
let musicaActivada = false;

botonMusica.addEventListener('click', () => {
    if (!musicaActivada) {
        musica.play().then(() => {
            musicaActivada = true;
            botonMusica.textContent = '🎵 Música activa 🔇';
        }).catch(e => console.log("Error:", e));
    } else {
        if (musica.paused) {
            musica.play();
            botonMusica.textContent = '🎵 Música activa 🔇';
        } else {
            musica.pause();
            botonMusica.textContent = '🎵 Activar música';
        }
    }
});

corazon.addEventListener('click', () => {
    if (!musicaActivada) {
        musica.play().then(() => {
            musicaActivada = true;
            botonMusica.textContent = '🎵 Música activa 🔇';
        }).catch(() => {});
    }
});

// ========== 6. JUEGO: ATRAPA CORAZONES ==========
let puntos = 0;
let tiempoRestante = 30;
let juegoActivo = false;
let intervaloJuego = null;
let intervaloCorazones = null;

const puntosSpan = document.getElementById('puntos');
const tiempoSpan = document.getElementById('tiempo');
const areaJuego = document.getElementById('areaJuego');
const btnIniciar = document.getElementById('iniciarJuego');
const mensajeFinalDiv = document.getElementById('mensajeFinal');

function crearCorazon() {
    if (!juegoActivo) return;
    
    const corazonJuego = document.createElement('div');
    corazonJuego.classList.add('corazon-juego');
    corazonJuego.innerHTML = ['❤️', '💖', '💗', '💓'][Math.floor(Math.random() * 4)];
    
    const maxX = areaJuego.clientWidth - 70;
    const maxY = areaJuego.clientHeight - 70;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    corazonJuego.style.left = Math.max(10, x) + 'px';
    corazonJuego.style.top = Math.max(10, y) + 'px';
    corazonJuego.style.position = 'absolute';
    
    corazonJuego.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!juegoActivo) return;
        puntos++;
        puntosSpan.textContent = puntos;
        corazonJuego.remove();
        crearLluviaCorazones(e.clientX, e.clientY);
    });
    
    areaJuego.appendChild(corazonJuego);
    
    setTimeout(() => {
        if (corazonJuego.parentNode) corazonJuego.remove();
    }, 2000);
}

function iniciarJuego() {
    if (intervaloJuego) clearInterval(intervaloJuego);
    if (intervaloCorazones) clearInterval(intervaloCorazones);
    
    puntos = 0;
    tiempoRestante = 30;
    puntosSpan.textContent = puntos;
    tiempoSpan.textContent = tiempoRestante;
    mensajeFinalDiv.innerHTML = '';
    mensajeFinalDiv.className = 'mensaje-final';
    areaJuego.innerHTML = '';
    juegoActivo = true;
    
    intervaloCorazones = setInterval(() => {
        if (juegoActivo) crearCorazon();
    }, 800);
    
    intervaloJuego = setInterval(() => {
        if (tiempoRestante > 0) {
            tiempoRestante--;
            tiempoSpan.textContent = tiempoRestante;
        }
        
        if (tiempoRestante <= 0) {
            finalizarJuego();
        }
    }, 1000);
}

function finalizarJuego() {
    juegoActivo = false;
    clearInterval(intervaloJuego);
    clearInterval(intervaloCorazones);
    
    areaJuego.innerHTML = '';
    
    mensajeFinalDiv.innerHTML = '💖 ¡TE AMO! 💖';
    mensajeFinalDiv.classList.add('grande');
    mensajeFinalDiv.style.fontSize = '4rem';
    mensajeFinalDiv.style.animation = 'brillar 1s infinite';
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            crearLluviaCorazones(x, y);
        }, i * 30);
    }
    
    setTimeout(() => {
        mensajeFinalDiv.style.animation = 'none';
    }, 5000);
}

btnIniciar.addEventListener('click', iniciarJuego);

window.addEventListener('resize', () => {
    if (juegoActivo) {
        const corazones = document.querySelectorAll('.corazon-juego');
        corazones.forEach(c => {
            const maxX = areaJuego.clientWidth - 70;
            const maxY = areaJuego.clientHeight - 70;
            let left = parseFloat(c.style.left);
            let top = parseFloat(c.style.top);
            if (left > maxX) c.style.left = maxX + 'px';
            if (top > maxY) c.style.top = maxY + 'px';
        });
    }
});

setInterval(() => {
    if (!juegoActivo) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        crearLluviaCorazones(x, y);
    }
}, 10000);

// ========== 7. BUZÓN DE CARTAS ==========
const buzonBtn = document.getElementById('buzonBtn');
const cartasContainer = document.getElementById('cartasContainer');
let cartasVisibles = false;

buzonBtn.addEventListener('click', () => {
    cartasVisibles = !cartasVisibles;
    
    if (cartasVisibles) {
        cartasContainer.style.display = 'grid';
        const rect = buzonBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                crearLluviaCorazones(centerX + (Math.random() - 0.5) * 100, centerY + (Math.random() - 0.5) * 100);
            }, i * 50);
        }
    } else {
        cartasContainer.style.display = 'none';
    }
});

const cartas = document.querySelectorAll('.carta-contenido');
cartas.forEach((carta, index) => {
    carta.addEventListener('dblclick', function(e) {
        e.stopPropagation();
        const textoActual = this.innerText;
        const nuevoTexto = prompt(`✏️ Edita el texto de la Carta ${index + 1}:`, textoActual);
        if (nuevoTexto !== null && nuevoTexto.trim() !== '') {
            this.innerHTML = nuevoTexto.replace(/\n/g, '<br>');
            localStorage.setItem(`carta${index + 1}`, this.innerHTML);
        }
    });
    
    const guardado = localStorage.getItem(`carta${index + 1}`);
    if (guardado) {
        carta.innerHTML = guardado;
    }
});

const cartasItems = document.querySelectorAll('.carta-item');
cartasItems.forEach(carta => {
    carta.addEventListener('click', (e) => {
        if (e.target.classList.contains('carta-contenido') || e.target.classList.contains('carta-titulo')) return;
        const rect = carta.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                crearLluviaCorazones(centerX + (Math.random() - 0.5) * 80, centerY + (Math.random() - 0.5) * 80);
            }, i * 40);
        }
    });
});