// --- PRELOADER ---
(function() {
    const steps = Array.from(document.querySelectorAll('.pre-step'));
    const fill = document.getElementById('preBarFill');
    const pctEl = document.getElementById('prePct');
    const loader = document.getElementById('preloader');
    const stepDuration = 320;
    function activateStep(i) {
        if (i >= steps.length) {
            setTimeout(() => { loader.classList.add('hidden'); }, 400);
            return;
        }
        if (i > 0) steps[i - 1].classList.remove('active');
        if (i > 0) steps[i - 1].classList.add('done');
        steps[i].classList.add('active');
        const pct = Math.round(((i + 1) / steps.length) * 100);
        fill.style.width = pct + '%';
        pctEl.textContent = pct + '%';
        setTimeout(() => activateStep(i + 1), stepDuration);
    }
    setTimeout(() => activateStep(0), 200);
})();

// --- Fondo de bajo nivel: matriz de bytes hexadecimales ---
(function() {
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    let W, H, drops = [];
    const fontSize = 12;
    const chars = '0123456789ABCDEF';
    const colors = ['rgba(123,94,167,', 'rgba(56,189,248,', 'rgba(201,255,59,'];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        const cols = Math.ceil(W / fontSize);
        drops = Array.from({ length: cols }, () => Math.random() * -100);
    }

    function draw() {
        ctx.fillStyle = 'rgba(6,6,13,0.08)';
        ctx.fillRect(0, 0, W, H);
        ctx.font = fontSize + 'px monospace';

        drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const alpha = Math.random() * 0.4 + 0.2;
            
            ctx.fillStyle = color + alpha + ')';
            ctx.fillText(char, i * fontSize, y * fontSize);

            if (y * fontSize > H && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        });
    }

    resize();
    window.addEventListener('resize', resize);
    setInterval(draw, 50);
})();

// --- Generar bytes hexadecimales flotantes ---
(function() {
    const container = document.getElementById('hexFloats');
    const hexChars = '0123456789ABCDEF';

    function generateHex() {
        let hex = '';
        for (let i = 0; i < 8; i++) {
            hex += hexChars[Math.floor(Math.random() * hexChars.length)];
        }
        return hex;
    }

    function createFloat() {
        const el = document.createElement('span');
        el.className = 'hex-float';
        el.textContent = `0x${generateHex()}`;
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (Math.random() * 15 + 10) + 's';
        el.style.animationDelay = (Math.random() * 5) + 's';
        container.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 25000);
    }

    for (let i = 0; i < 20; i++) {
        setTimeout(() => createFloat(), i * 500);
    }

    setInterval(createFloat, 3000);
})();

// --- Línea de código en movimiento ---
(function() {
    const line = document.getElementById('codeLine');
    line.textContent = '> mov eax, [ebx+ecx*4] | xor edx, edx | syscall | malloc(0x1F) | while(true) { optimize(); } | low_level_tweak.exe --aggressive';
})();

// --- TYPING EFFECT ---
(function() {
    const lines = ["System Optimizer for gaming", "Windows Specialist & Enthusiast", "Ex-Partner at Rhideops", "Low-Level Tweaking Professional", "PC Enthusiast & Benchmarker", "Latency hunter since day one"];
    let li = 0, ci = 0, deleting = false;
    const el = document.getElementById('typingText');
    function tick() {
        const full = lines[li];
        if (!deleting) {
            el.textContent = full.slice(0, ++ci);
            if (ci === full.length) { deleting = true; return setTimeout(tick, 2200); }
            setTimeout(tick, 80 + Math.random() * 40);
        } else {
            el.textContent = full.slice(0, --ci);
            if (ci === 0) { deleting = false; li = (li + 1) % lines.length; return setTimeout(tick, 480); }
            setTimeout(tick, 38);
        }
    }
    setTimeout(tick, 1200);
})();

// --- NAVEGACIÓN ---
(function() {
    const header = document.getElementById('site-header');
    const links = document.querySelectorAll('.nav-links a');
    const toggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navLinks');
    const icon = document.getElementById('menuIcon');
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 40);
        let current = '';
        document.querySelectorAll('section[id], .hero[id]').forEach(sec => { if (window.scrollY >= sec.offsetTop - 160) current = sec.id; });
        links.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + current); });
    });
    toggle.addEventListener('click', () => { const open = navList.classList.toggle('open'); icon.className = open ? 'fas fa-times' : 'fas fa-bars'; });
    navList.querySelectorAll('a').forEach(a => { a.addEventListener('click', () => { navList.classList.remove('open'); icon.className = 'fas fa-bars'; }); });
})();

// --- ANIMACIONES REVEAL ---
(function() {
    const revealObs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    const barObs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { const w = e.target.getAttribute('data-width'); e.target.style.width = w + '%'; barObs.unobserve(e.target); } }); }, { threshold: 0.5 });
    document.querySelectorAll('.skill-fill').forEach(b => barObs.observe(b));
})();

// --- BACK TO TOP ---
(function() {
    const btn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// --- Carga dinámica de aplicaciones desde GitHub ---
(function() {
    const API_URL = 'https://api.github.com/repos/TazxT/TazxT.github.io/contents/Install';
    const grid = document.getElementById('installGrid');

    function getIcon(filename) {
        const ext = filename.split('.').pop().toLowerCase();
        const icons = {
            bat: 'fa-terminal',
            ps1: 'fa-cogs',
            reg: 'fa-database',
            exe: 'fa-cloud-download-alt',
            msi: 'fa-box',
            zip: 'fa-file-archive',
            rar: 'fa-file-archive',
            '7z': 'fa-file-archive',
            txt: 'fa-file-alt',
            pdf: 'fa-file-pdf',
            png: 'fa-image',
            jpg: 'fa-image',
            svg: 'fa-image',
            default: 'fa-file-code'
        };
        return icons[ext] || icons.default;
    }

    async function loadInstallApps() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al obtener la lista de archivos');
            const files = await response.json();

            grid.innerHTML = '';

            files.forEach(file => {
                if (file.type !== 'file') return;

                const filename = file.name;
                const downloadUrl = `https://raw.githubusercontent.com/TazxT/TazxT.github.io/main/Install/${filename}`;
                const iconClass = getIcon(filename);
                const sizeKB = (file.size / 1024).toFixed(1);

                const card = document.createElement('div');
                card.className = 'install-card reveal';
                card.innerHTML = `
                    <div class="install-icon"><i class="fas ${iconClass}"></i></div>
                    <h3>${filename}</h3>
                    <p>Tamaño: ${sizeKB} KB</p>
                    <a href="${downloadUrl}" class="btn btn-primary" download>
                        <i class="fas fa-download"></i> Descargar
                    </a>
                `;
                grid.appendChild(card);

                const revealObs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                            revealObs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.12 });
                revealObs.observe(card);
            });

            if (grid.children.length === 0) {
                grid.innerHTML = '<div class="install-loading">No se encontraron aplicaciones.</div>';
            }
        } catch (error) {
            console.error(error);
            grid.innerHTML = '<div class="install-loading" style="color:var(--rose);">Error al cargar las apps. Revisa la consola.</div>';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadInstallApps);
    } else {
        loadInstallApps();
    }
})();


