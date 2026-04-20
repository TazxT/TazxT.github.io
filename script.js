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

(function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], mouse = { x: -999, y: -999 };
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    class Dot {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.vx = (Math.random() - .5) * .4;
            this.vy = (Math.random() - .5) * .4;
            this.r = Math.random() * 1.5 + .5;
            const palette = ['rgba(123,94,167,.5)', 'rgba(193,73,90,.4)', 'rgba(201,255,59,.35)'];
            this.color = palette[Math.floor(Math.random() * palette.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > W) this.vx *= -1;
            if (this.y < 0 || this.y > H) this.vy *= -1;
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 90) { this.x -= dx * .018; this.y -= dy * .018; }
        }
        draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.color; ctx.fill(); }
    }
    function init() { const count = Math.min(80, Math.floor((W * H) / 12000)); particles = Array.from({ length: count }, () => new Dot()); }
    function loop() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const d = Math.hypot(dx, dy);
                if (d < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(123,94,167,${.15 * (1 - d / 110)})`;
                    ctx.lineWidth = .5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(loop);
    }
    window.addEventListener('resize', () => { resize(); init(); });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
    resize(); init(); loop();
})();

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

(function() {
    const revealObs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } }); }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
    const barObs = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { const w = e.target.getAttribute('data-width'); e.target.style.width = w + '%'; barObs.unobserve(e.target); } }); }, { threshold: 0.5 });
    document.querySelectorAll('.skill-fill').forEach(b => barObs.observe(b));
})();

let metrics = { cpu: 0, mem: 0, io: 0, cache: 0 };
function runDemo() {
    const out = document.getElementById('consoleOut');
    out.innerHTML = '';
    const msgs = [
        { text: 'Iniciando TazxPerformance Check...', cls: 'c-line' }, { text: 'Analizando configuración del sistema...', cls: 'c-line' },
        { text: 'Verificando optimizaciones de CPU...', cls: 'c-line' }, { text: 'Chequeando gestión de memoria...', cls: 'c-line' },
        { text: 'Analizando rendimiento de disco...', cls: 'c-line' }, { text: '=== RESULTADOS ===', cls: 'c-head' },
        { text: '[CPU_Optimization]   Optimal', cls: 'c-ok' }, { text: '[Memory_Management]  Optimal', cls: 'c-ok' },
        { text: '[Disk_Performance]   Good', cls: 'c-warn' }, { text: '[Network_Latency]    Optimal', cls: 'c-ok' },
        { text: '[Power_Settings]     Tuned', cls: 'c-ok' }, { text: '', cls: 'c-line' },
        { text: 'Overall System Score: 94/100', cls: 'c-head' }, { text: 'Status: OPTIMIZED ✓', cls: 'c-ok' }, { text: '_', cls: 'c-line' }
    ];
    let i = 0;
    function next() { if (i >= msgs.length) return; const d = document.createElement('div'); d.className = msgs[i].cls; d.textContent = msgs[i].text; out.appendChild(d); out.scrollTop = out.scrollHeight; i++; setTimeout(next, 220); }
    next();
    updateMetrics();
}
function updateMetrics() {
    const rand = (base, spread) => Math.min(100, Math.max(5, base + (Math.random() * spread - spread / 2)));
    metrics.cpu = rand(metrics.cpu || 45, 12); metrics.mem = rand(metrics.mem || 70, 8); metrics.io = rand(metrics.io || 15, 8); metrics.cache = rand(metrics.cache || 82, 6);
    document.getElementById('statCpu').textContent = metrics.cpu.toFixed(1) + '%'; document.getElementById('statMem').textContent = metrics.mem.toFixed(1) + '%';
    document.getElementById('statIo').textContent = metrics.io.toFixed(1) + 'ms'; document.getElementById('statCache').textContent = metrics.cache.toFixed(1) + '%';
    const score = ((metrics.cpu + metrics.mem + (100 - metrics.io / .5) + metrics.cache) / 4).toFixed(1);
    document.getElementById('perfScore').textContent = score + '%';
}
setInterval(updateMetrics, 3000);
updateMetrics();