/*!
 * AIsabella Design System v3.1
 * Lenis · GSAP ScrollTrigger · Three.js Synaptic Flow · Magnetic UI · Neon Glow · Text Scramble
 *
 * Dependencies (CDN, load before this file):
 *   - Lenis           lenis@1.1.14/dist/lenis.min.js
 *   - GSAP            gsap@3.12.5
 *   - ScrollTrigger   gsap@3.12.5/dist/ScrollTrigger.min.js
 *   - Three.js        three@0.160.0/build/three.min.js  (index + praxis only)
 *
 * Public API:
 *   window.AIsabellaDS.initTextScramble(['#hero h1'])
 *   window.AIsabellaDS.initThreeHero('hero-canvas')
 */
(function () {
    'use strict';

    /* ── Detection helpers ──────────────────────────────────────────── */
    var isTouch      = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasGSAP      = typeof gsap !== 'undefined';
    var hasST        = typeof ScrollTrigger !== 'undefined';
    var hasLenis     = typeof Lenis !== 'undefined';

    /* ── 1. LENIS SMOOTH SCROLL ────────────────────────────────────────── */
    function initLenis() {
        if (prefersReduced || !hasLenis || !hasGSAP || !hasST) return;
        var lenis = new Lenis({
            lerp:           0.085,   /* silk factor: lower = slower drag  */
            smoothWheel:    true,
            touchMultiplier: 1.2,
            infinite:       false
        });
        /* Critical: feed Lenis RAF into GSAP ticker so ScrollTrigger stays in sync */
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
    }

    /* ── 2. GSAP SCROLL REVEAL ──────────────────────────────────────── */
    function initScrollReveal() {
        if (prefersReduced || !hasGSAP || !hasST) return;
        gsap.registerPlugin(ScrollTrigger);

        /* Kill old IntersectionObserver-based .reveal state so GSAP takes over cleanly */
        document.querySelectorAll('.reveal').forEach(function (el) {
            el.classList.remove('reveal');
            el.classList.add('is-visible');
            el.style.opacity = '';
            el.style.transform = '';
            el.style.transitionDelay = '';
        });

        /* Section headings fade in from below */
        gsap.utils.toArray('main section h1, main section h2').forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                opacity: 0,
                y: 36,
                duration: 0.85,
                ease: 'power3.out'
            });
        });

        /* Section subtext / lead paragraphs */
        gsap.utils.toArray(
            '#philosophy .text-center > p, #offer .text-center > p, ' +
            '#contact > .container > p, .praxis-lead, section .max-w-4xl > .text-left p'
        ).forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 90%', once: true },
                opacity: 0,
                y: 20,
                duration: 0.7,
                ease: 'power2.out',
                delay: 0.08
            });
        });

        /* Staggered card groups — cover both classic space-y and grid layouts */
        [
            '#philosophy .space-y-8 > div',
            '#offer .space-y-8 > div',
            '#faq .space-y-6 > div',
            '.bento-grid > .bento-card'
        ].forEach(function (sel) {
            var els = gsap.utils.toArray(sel);
            if (!els.length) return;
            gsap.from(els, {
                scrollTrigger: {
                    trigger: els[0].closest('section') || els[0].parentElement,
                    start: 'top 82%',
                    once: true
                },
                opacity: 0,
                y: 44,
                duration: 0.75,
                ease: 'power3.out',
                stagger: 0.13
            });
        });

        /* Praxis use-case cards — alternating slide direction */
        gsap.utils.toArray('.praxis-card').forEach(function (el, i) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 86%', once: true },
                opacity: 0,
                x: i % 2 === 0 ? -32 : 32,
                duration: 0.78,
                ease: 'power3.out'
            });
        });

        /* About-section image */
        gsap.utils.toArray('#about img').forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%', once: true },
                opacity: 0,
                scale: 0.92,
                duration: 0.9,
                ease: 'power2.out'
            });
        });

        /* Contact CTA block */
        gsap.utils.toArray('#contact .glass-card').forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                opacity: 0,
                y: 24,
                duration: 0.7,
                ease: 'power2.out',
                delay: 0.2
            });
        });
    }

    /* ── 3. NEON GLOW MOUSE TRACKING ────────────────────────────────── */
    /*  getBoundingClientRect is cached and only refreshed on resize    */
    /*  mousemove is RAF-gated — at most 1 style write per frame        */
    function initNeonGlow() {
        if (isTouch) return;
        document.querySelectorAll('.glass-card').forEach(function (card) {
            var rect    = null;
            var ticking = false;
            var pendingX = 0, pendingY = 0;

            /* cache rect once, refresh on resize */
            function cacheRect() { rect = card.getBoundingClientRect(); }
            cacheRect();
            window.addEventListener('resize', cacheRect, { passive: true });
            window.addEventListener('scroll', cacheRect, { passive: true });

            card.addEventListener('mousemove', function (e) {
                if (!rect) return;
                pendingX = e.clientX - rect.left;
                pendingY = e.clientY - rect.top;
                if (!ticking) {
                    ticking = true;
                    requestAnimationFrame(function () {
                        card.style.background =
                            'radial-gradient(440px circle at ' + pendingX + 'px ' + pendingY + 'px, ' +
                            'rgba(8, 211, 187, 0.09), transparent 46%), rgba(255, 255, 255, 0.05)';
                        ticking = false;
                    });
                }
            }, { passive: true });

            card.addEventListener('mouseleave', function () {
                card.style.background = '';
                ticking = false;
            });
        });
    }

    /* ── 4. MAGNETIC BUTTONS ────────────────────────────────────────── */
    function initMagneticButtons() {
        if (isTouch || prefersReduced) return;
        document.querySelectorAll('.cta-button').forEach(function (btn) {
            /* Wrap to separate hit-area from visual element */
            var wrapper = document.createElement('span');
            wrapper.className = 'magnet-wrapper';
            wrapper.style.cssText = 'display:inline-block;position:relative;';
            btn.parentNode.insertBefore(wrapper, btn);
            wrapper.appendChild(btn);

            var STRENGTH   = 0.32;
            var MAX_DIST   = 95;
            var cachedRect = null;

            /* Cache rect only on mouseenter, not inside every mousemove */
            wrapper.addEventListener('mouseenter', function () {
                cachedRect = wrapper.getBoundingClientRect();
            }, { passive: true });
            window.addEventListener('resize', function () { cachedRect = null; }, { passive: true });

            wrapper.addEventListener('mousemove', function (e) {
                if (!cachedRect) cachedRect = wrapper.getBoundingClientRect();
                var cx = cachedRect.left + cachedRect.width  / 2;
                var cy = cachedRect.top  + cachedRect.height / 2;
                var dx = e.clientX - cx;
                var dy = e.clientY - cy;
                var dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < MAX_DIST) {
                    var tx = dx * STRENGTH;
                    var ty = dy * STRENGTH;
                    if (hasGSAP) {
                        gsap.to(btn, { x: tx, y: ty, duration: 0.4, ease: 'power3.out', overwrite: true });
                    } else {
                        btn.style.transform = 'translate(' + tx + 'px,' + ty + 'px)';
                    }
                }
            }, { passive: true });

            wrapper.addEventListener('mouseleave', function () {
                cachedRect = null;
                if (hasGSAP) {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)', overwrite: true });
                } else {
                    btn.style.transform = '';
                }
            });
        });
    }

    /* ── 5. CUSTOM CURSOR ───────────────────────────────────────────── */
    /*  Performance: transform:translate() only — no left/top writes,    */
    /*  avoids layout-reflow that was blocking the scroll thread.        */
    function initCustomCursor() {
        if (isTouch || prefersReduced) return;

        var dot  = document.createElement('div');
        var ring = document.createElement('div');
        dot.id  = 'ai-cursor-dot';
        ring.id = 'ai-cursor-ring';

        /* Fixed at 0,0; position only via transform */
        dot.style.cssText = [
            'position:fixed;top:0;left:0;pointer-events:none;z-index:99999;',
            'width:8px;height:8px;border-radius:50%;',
            'background:rgba(8,211,187,0.95);opacity:0;',
            'transform:translate(-200px,-200px);',
            'transition:width .22s ease,height .22s ease,opacity .2s ease;',
            'will-change:transform;'
        ].join('');

        ring.style.cssText = [
            'position:fixed;top:0;left:0;pointer-events:none;z-index:99998;',
            'width:36px;height:36px;border-radius:50%;',
            'border:1.5px solid rgba(8,211,187,0.45);opacity:0;',
            'transform:translate(-200px,-200px);',
            'transition:width .25s ease,height .25s ease,opacity .2s ease,border-color .25s ease;',
            'will-change:transform;'
        ].join('');

        document.body.appendChild(dot);
        document.body.appendChild(ring);
        document.documentElement.style.cursor = 'none';
        document.body.style.cursor = 'none';

        var mx = -200, my = -200, rx = -200, ry = -200;
        var dotR = 4, ringR = 18;          /* half-sizes for centering */
        var visible = false;

        document.addEventListener('mousemove', function (e) {
            mx = e.clientX;
            my = e.clientY;
            /* Dot is instant — pure transform, no reflow */
            dot.style.transform = 'translate(' + (mx - dotR) + 'px,' + (my - dotR) + 'px)';
            if (!visible) {
                visible = true;
                ring.style.opacity = '1';
                dot.style.opacity  = '1';
            }
        }, { passive: true });

        /* Smooth ring lag — transform only, GPU-composited */
        (function loop() {
            rx += (mx - rx) * 0.13;
            ry += (my - ry) * 0.13;
            ring.style.transform = 'translate(' + (rx - ringR) + 'px,' + (ry - ringR) + 'px)';
            requestAnimationFrame(loop);
        })();

        /* Hover state */
        document.querySelectorAll('a, button, .cta-button, .glass-card, label[for]').forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                dotR  = 0;
                ringR = 27;
                dot.style.width   = '0px';
                dot.style.height  = '0px';
                ring.style.width  = '54px';
                ring.style.height = '54px';
                ring.style.borderColor = 'rgba(51,177,255,0.8)';
                ring.style.mixBlendMode = 'difference';
            });
            el.addEventListener('mouseleave', function () {
                dotR  = 4;
                ringR = 18;
                dot.style.width   = '8px';
                dot.style.height  = '8px';
                ring.style.width  = '36px';
                ring.style.height = '36px';
                ring.style.borderColor = 'rgba(8,211,187,0.45)';
                ring.style.mixBlendMode = 'normal';
            });
        });

        document.addEventListener('mouseleave', function () {
            ring.style.opacity = '0'; dot.style.opacity = '0';
        });
        document.addEventListener('mouseenter', function () {
            ring.style.opacity = '1'; dot.style.opacity = '1';
        });
    }

    /* ── 6. TEXT SCRAMBLE ───────────────────────────────────────────── */
    function initTextScramble(selectors) {
        if (prefersReduced) return;
        var CHARS = '!<>-_\\/[]{}=+*^#@$%ABCDEFabcdef0123456789';
        var SKIP  = [' ', '.', ',', ':', '!', '?', '\n', '-', '–', '/', '&', '"', '\u201c', '\u201d'];
        var FRAMES = 50;

        /* Recursively collect leaf text-nodes — preserves child elements & inline styles */
        function collectTextNodes(root) {
            var nodes = [];
            root.childNodes.forEach(function (n) {
                if (n.nodeType === 3 && n.textContent.replace(/\s/g, '').length > 0) {
                    nodes.push({ node: n, original: n.textContent });
                } else if (n.nodeType === 1 && n.tagName !== 'SCRIPT' && n.tagName !== 'STYLE') {
                    nodes = nodes.concat(collectTextNodes(n));
                }
            });
            return nodes;
        }

        (selectors || []).forEach(function (sel) {
            var el = document.querySelector(sel);
            if (!el) return;
            var textNodes = collectTextNodes(el);
            if (!textNodes.length) return;

            var frame = 0;
            var tick = function () {
                var progress = frame / FRAMES;
                textNodes.forEach(function (tn) {
                    var chars = tn.original.split('');
                    tn.node.textContent = chars.map(function (ch, i) {
                        if (SKIP.indexOf(ch) !== -1) return ch;
                        var threshold = (i / chars.length) * 0.72 + 0.04;
                        return progress >= threshold
                            ? ch
                            : CHARS[Math.floor(Math.random() * CHARS.length)];
                    }).join('');
                });
                if (++frame <= FRAMES) requestAnimationFrame(tick);
                else textNodes.forEach(function (tn) { tn.node.textContent = tn.original; });
            };
            setTimeout(function () { requestAnimationFrame(tick); }, 150);
        });
    }

    /* ── 7. THREE.JS NEURAL-NET HERO ───────────────────────────────── */
    function initThreeHero(canvasId) {
        if (prefersReduced) return;
        if (isTouch)        return;
        var THREE = window.THREE;
        if (!THREE) return;

        var canvas = document.getElementById(canvasId);
        if (!canvas) return;

        /* pause entirely when hero not visible (IntersectionObserver) */
        var heroVisible = true;
        if (window.IntersectionObserver) {
            new IntersectionObserver(function (entries) {
                heroVisible = entries[0].isIntersecting;
            }, { threshold: 0.01 }).observe(canvas.parentElement || canvas);
        }

        var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        var scene  = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(65, 1, 0.1, 1000);
        camera.position.z = 55;

        var W     = canvas.clientWidth || window.innerWidth;
        var TOTAL = W < 768 ? 0 : W < 1200 ? 60 : 100;
        if (TOTAL === 0) { canvas.style.display = 'none'; return; }

        var HUB_COUNT = Math.floor(TOTAL * 0.18);
        var REG_COUNT = TOTAL - HUB_COUNT;

        /* ─ glow sprite factory ─ */
        function makeGlowSprite(size, coreStop, haloStop) {
            var c = document.createElement('canvas');
            c.width = c.height = size;
            var ctx = c.getContext('2d');
            var half = size / 2;
            var g = ctx.createRadialGradient(half, half, 0, half, half, half);
            g.addColorStop(0,         'rgba(255,255,255,1.0)');
            g.addColorStop(coreStop,  'rgba(255,255,255,0.55)');
            g.addColorStop(haloStop,  'rgba(255,255,255,0.10)');
            g.addColorStop(1,         'rgba(255,255,255,0.0)');
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, size, size);
            return new THREE.CanvasTexture(c);
        }
        var spriteReg  = makeGlowSprite(64,  0.18, 0.55);
        var spriteHub  = makeGlowSprite(128, 0.12, 0.45);
        var spritePulse = makeGlowSprite(96, 0.08, 0.38); /* sharper core for pulse */

        var palette = [
            new THREE.Color('#08D3BB'),
            new THREE.Color('#33B1FF'),
            new THREE.Color('#8A3FFC'),
            new THREE.Color('#33B1FF')
        ];

        var positions  = new Float32Array(TOTAL * 3);
        var velocities = [];
        var colors     = new Float32Array(TOTAL * 3);
        var phase      = new Float32Array(TOTAL);
        var isHub      = [];

        for (var i = 0; i < TOTAL; i++) {
            var hub = i < HUB_COUNT;
            isHub.push(hub);
            positions[i*3]   = (Math.random() - 0.5) * 115;
            positions[i*3+1] = (Math.random() - 0.5) * 68;
            positions[i*3+2] = (Math.random() - 0.5) * 30;
            phase[i]         = Math.random() * Math.PI * 2;
            velocities.push({
                x: (Math.random() - 0.5) * (hub ? 0.009 : 0.017),
                y: (Math.random() - 0.5) * (hub ? 0.006 : 0.012)
            });
            var col = palette[Math.floor(Math.random() * palette.length)];
            colors[i*3] = col.r; colors[i*3+1] = col.g; colors[i*3+2] = col.b;
        }

        /* ─ mouse repulsion state ─ */
        var basePos        = new Float32Array(TOTAL * 3);
        basePos.set(positions);
        var repOffX        = new Float32Array(TOTAL);
        var repOffY        = new Float32Array(TOTAL);
        var REPEL_RADIUS   = 20;
        var REPEL_STRENGTH = 0.32;
        var RETURN_RATE    = 0.038;
        var wmx = 99999, wmy = 99999; /* world-space cursor, starts off-screen */

        /* ─ regular node geometry ─ */
        var regIdx = [];
        for (var r = HUB_COUNT; r < TOTAL; r++) regIdx.push(r);
        var regGeo = new THREE.BufferGeometry();
        var regPos = new Float32Array(REG_COUNT * 3);
        var regCol = new Float32Array(REG_COUNT * 3);
        for (var ri = 0; ri < REG_COUNT; ri++) {
            var sr = regIdx[ri];
            regPos[ri*3] = positions[sr*3]; regPos[ri*3+1] = positions[sr*3+1]; regPos[ri*3+2] = positions[sr*3+2];
            regCol[ri*3] = colors[sr*3];    regCol[ri*3+1] = colors[sr*3+1];    regCol[ri*3+2] = colors[sr*3+2];
        }
        var regPosAttr = new THREE.BufferAttribute(regPos, 3);
        regPosAttr.setUsage(THREE.DynamicDrawUsage);
        regGeo.setAttribute('position', regPosAttr);
        regGeo.setAttribute('color', new THREE.BufferAttribute(regCol, 3));
        scene.add(new THREE.Points(regGeo, new THREE.PointsMaterial({
            size: 2.6, map: spriteReg, vertexColors: true,
            transparent: true, opacity: 0.85, depthWrite: false, alphaTest: 0.002, sizeAttenuation: true
        })));

        /* ─ hub node geometry ─ */
        var hubIdx = [];
        for (var h2 = 0; h2 < HUB_COUNT; h2++) hubIdx.push(h2);
        var hubGeo = new THREE.BufferGeometry();
        var hubPos = new Float32Array(HUB_COUNT * 3);
        var hubCol = new Float32Array(HUB_COUNT * 3);
        for (var hi = 0; hi < HUB_COUNT; hi++) {
            hubPos[hi*3] = positions[hi*3]; hubPos[hi*3+1] = positions[hi*3+1]; hubPos[hi*3+2] = positions[hi*3+2];
            hubCol[hi*3] = colors[hi*3];    hubCol[hi*3+1] = colors[hi*3+1];    hubCol[hi*3+2] = colors[hi*3+2];
        }
        var hubPosAttr = new THREE.BufferAttribute(hubPos, 3);
        hubPosAttr.setUsage(THREE.DynamicDrawUsage);
        hubGeo.setAttribute('position', hubPosAttr);
        hubGeo.setAttribute('color', new THREE.BufferAttribute(hubCol, 3));
        scene.add(new THREE.Points(hubGeo, new THREE.PointsMaterial({
            size: 7.0, map: spriteHub, vertexColors: true,
            transparent: true, opacity: 1.0, depthWrite: false, alphaTest: 0.002, sizeAttenuation: true
        })));

        /* ─ connection lines – lines GROW from A → B, then RETRACT on disconnect ─ */
        var DIST_SQ    = 26 * 26;
        var DIST_MAX   = 26;
        var MAX_LINES  = 220;
        var GROW_RATE   = 0.042;  /* ~24 frames (0.4 s) to reach full length   */
        var SHRINK_RATE = 0.052;  /* ~19 frames (0.32 s) to fully retract       */

        var linePosArr   = new Float32Array(MAX_LINES * 6);
        var lineColArr   = new Float32Array(MAX_LINES * 6);
        var lineGeo      = new THREE.BufferGeometry();
        var linePosAttr2 = new THREE.BufferAttribute(linePosArr, 3);
        var lineColAttr  = new THREE.BufferAttribute(lineColArr, 3);
        linePosAttr2.setUsage(THREE.DynamicDrawUsage);
        lineColAttr.setUsage(THREE.DynamicDrawUsage);
        lineGeo.setAttribute('position', linePosAttr2);
        lineGeo.setAttribute('color', lineColAttr);
        lineGeo.setDrawRange(0, 0);
        scene.add(new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({
            vertexColors: true, transparent: true, opacity: 1.0, depthWrite: false
        })));

        /* per-edge draw progress 0‥1: 0 = line not drawn, 1 = full A→B length */
        var edgeProgress = new Float32Array(TOTAL * TOTAL);
        var liveEdges    = new Set();   /* edges with progress > 0 */
        var frameActive = new Set();  /* reused every frame — no GC alloc */

        /* ─ signal pulses – bright sprites that travel along active connections
           like action potentials firing along axons ─ */
        var MAX_PULSES   = 18;
        var pulseObjs    = [];
        for (var p0 = 0; p0 < MAX_PULSES; p0++) {
            pulseObjs.push({ t: Math.random(), a: -1, b: -1,
                             speed: 0.009 + Math.random() * 0.014 });
        }
        var pulsePosArr  = new Float32Array(MAX_PULSES * 3);
        var pulseColArr  = new Float32Array(MAX_PULSES * 3);
        var pulseGeo     = new THREE.BufferGeometry();
        var pulsePosAttr = new THREE.BufferAttribute(pulsePosArr, 3);
        var pulseColAttr = new THREE.BufferAttribute(pulseColArr, 3);
        pulsePosAttr.setUsage(THREE.DynamicDrawUsage);
        pulseColAttr.setUsage(THREE.DynamicDrawUsage);
        pulseGeo.setAttribute('position', pulsePosAttr);
        pulseGeo.setAttribute('color',    pulseColAttr);
        for (var p1 = 0; p1 < MAX_PULSES; p1++) {  /* park off-screen */
            pulsePosArr[p1*3] = 9999; pulsePosArr[p1*3+1] = 9999; pulsePosArr[p1*3+2] = 9999;
        }
        scene.add(new THREE.Points(pulseGeo, new THREE.PointsMaterial({
            size: 5.5, map: spritePulse, vertexColors: true,
            transparent: true, opacity: 1.0, depthWrite: false, alphaTest: 0.004, sizeAttenuation: true
        })));

        /* packed int list of active edges (a<<16|b) rebuilt each frame – no alloc */
        var activeEdgeList = new Int32Array(MAX_LINES);
        var activeEdgeCount = 0;

        /* ─ mouse parallax + world-space repulsion ─ */
        var pmx = 0, pmy = 0;
        document.addEventListener('mousemove', function (e) {
            pmx = (e.clientX / window.innerWidth  - 0.5) * 2;
            pmy = -(e.clientY / window.innerHeight - 0.5) * 2;
            /* unproject screen → world Z=0 plane */
            var ndc = new THREE.Vector3(
                (e.clientX / window.innerWidth)  * 2 - 1,
               -(e.clientY / window.innerHeight) * 2 + 1,
                0.5
            );
            ndc.unproject(camera);
            var dir  = ndc.sub(camera.position).normalize();
            var tVal = -camera.position.z / dir.z;
            var wp   = camera.position.clone().add(dir.multiplyScalar(tVal));
            wmx = wp.x; wmy = wp.y;
        }, { passive: true });

        function resize() {
            var w = canvas.clientWidth  || window.innerWidth;
            var h = Math.min(canvas.clientHeight || Math.round(w * 0.58), window.innerHeight);
            renderer.setSize(w, h, false);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        }
        resize();
        window.addEventListener('resize', resize);

        function syncSubGeo(srcPos, subArr, indices) {
            for (var k = 0; k < indices.length; k++) {
                var s = indices[k];
                subArr[k*3] = srcPos[s*3]; subArr[k*3+1] = srcPos[s*3+1]; subArr[k*3+2] = srcPos[s*3+2];
            }
        }

        var tick = 0;
        function animate() {
            requestAnimationFrame(animate);
            if (!heroVisible || document.hidden) return;

            tick += 0.008;
            var pos = positions;

            /* ── node movement + mouse repulsion ───────────────────── */
            for (var j = 0; j < TOTAL; j++) {
                /* drift base position */
                basePos[j*3]   += velocities[j].x;
                basePos[j*3+1] += velocities[j].y;
                if (basePos[j*3]   >  57) basePos[j*3]   = -57;
                if (basePos[j*3]   < -57) basePos[j*3]   =  57;
                if (basePos[j*3+1] >  34) basePos[j*3+1] = -34;
                if (basePos[j*3+1] < -34) basePos[j*3+1] =  34;
                /* repulsion force */
                var wx  = basePos[j*3]   + repOffX[j];
                var wy  = basePos[j*3+1] + repOffY[j];
                var ddx = wx - wmx, ddy = wy - wmy;
                var dd2 = ddx*ddx + ddy*ddy;
                if (dd2 < REPEL_RADIUS * REPEL_RADIUS && dd2 > 0.001) {
                    var ddn  = Math.sqrt(dd2);
                    var push = (1.0 - ddn / REPEL_RADIUS) * REPEL_STRENGTH;
                    repOffX[j] += (ddx / ddn) * push;
                    repOffY[j] += (ddy / ddn) * push;
                }
                /* spring return to base */
                repOffX[j] *= (1.0 - RETURN_RATE);
                repOffY[j] *= (1.0 - RETURN_RATE);
                /* write final position (base + repulsion) to GPU array */
                pos[j*3]   = basePos[j*3]   + repOffX[j];
                pos[j*3+1] = basePos[j*3+1] + repOffY[j];
                pos[j*3+2] = Math.sin(tick + phase[j]) * (isHub[j] ? 14 : 8);
            }
            scene.rotation.y = Math.sin(tick * 0.18) * 0.04;
            scene.rotation.x = Math.sin(tick * 0.11) * 0.022;
            syncSubGeo(pos, hubPos, hubIdx); hubPosAttr.needsUpdate = true;
            syncSubGeo(pos, regPos, regIdx); regPosAttr.needsUpdate = true;

            /* ── find active edges this frame (axis-reject fast path) ── */
            frameActive.clear();
            activeEdgeCount = 0;
            for (var a = 0; a < TOTAL - 1; a++) {
                for (var b = a + 1; b < TOTAL; b++) {
                    var dx = pos[a*3] - pos[b*3];
                    if (dx > DIST_MAX || dx < -DIST_MAX) continue;
                    var dy = pos[a*3+1] - pos[b*3+1];
                    if (dy > DIST_MAX || dy < -DIST_MAX) continue;
                    var dz = pos[a*3+2] - pos[b*3+2];
                    if (dx*dx + dy*dy + dz*dz < DIST_SQ) {
                        var ek = a * TOTAL + b;
                        frameActive.add(ek);
                        if (!liveEdges.has(ek)) liveEdges.add(ek);
                        if (activeEdgeCount < MAX_LINES) {
                            activeEdgeList[activeEdgeCount++] = (a << 16) | b;
                        }
                    }
                }
            }

            /* ── grow active edges, retract departing edges ───────── */
            liveEdges.forEach(function (ek) {
                if (frameActive.has(ek)) {
                    edgeProgress[ek] = Math.min(edgeProgress[ek] + GROW_RATE, 1.0);
                } else {
                    edgeProgress[ek] -= SHRINK_RATE;
                    if (edgeProgress[ek] <= 0) { edgeProgress[ek] = 0; liveEdges.delete(ek); }
                }
            });

            /* ── draw lines: endpoint is lerped from A toward B by progress ─ */
            var lp = linePosArr, lc = lineColArr, idx = 0;
            liveEdges.forEach(function (ek) {
                if (idx >= MAX_LINES) return;
                var eb   = ek % TOTAL;
                var ea   = (ek - eb) / TOTAL;
                var prog = edgeProgress[ek];
                if (prog < 0.01) return;

                /* smoothstep easing so growth accelerates then decelerates */
                var s = prog * prog * (3.0 - 2.0 * prog);

                /* interpolated endpoint — line tip travels from A to B */
                var ex = pos[ea*3]   + (pos[eb*3]   - pos[ea*3])   * s;
                var ey = pos[ea*3+1] + (pos[eb*3+1] - pos[ea*3+1]) * s;
                var ez = pos[ea*3+2] + (pos[eb*3+2] - pos[ea*3+2]) * s;

                /* alpha: progress × distance falloff × shimmer */
                var fdx = pos[ea*3] - pos[eb*3];
                var fdy = pos[ea*3+1] - pos[eb*3+1];
                var fdz = pos[ea*3+2] - pos[eb*3+2];
                var distF   = 1.0 - Math.sqrt(fdx*fdx + fdy*fdy + fdz*fdz) / DIST_MAX;
                var shimmer = 0.50 + 0.28 * Math.sin(tick * 1.6 + ea * 0.31 + eb * 0.17);
                var alpha   = prog * distF * shimmer;
                if (alpha < 0.005) return;

                var rA = colors[ea*3], gA = colors[ea*3+1], bA = colors[ea*3+2];
                var rB = colors[eb*3], gB = colors[eb*3+1], bB = colors[eb*3+2];
                lp[idx*6]   = pos[ea*3]; lp[idx*6+1] = pos[ea*3+1]; lp[idx*6+2] = pos[ea*3+2];
                lp[idx*6+3] = ex;        lp[idx*6+4] = ey;           lp[idx*6+5] = ez;
                lc[idx*6]   = rA*alpha; lc[idx*6+1] = gA*alpha; lc[idx*6+2] = bA*alpha;
                lc[idx*6+3] = rB*alpha; lc[idx*6+4] = gB*alpha; lc[idx*6+5] = bB*alpha;
                idx++;
            });
            lineGeo.setDrawRange(0, idx * 2);
            linePosAttr2.needsUpdate = true;
            lineColAttr.needsUpdate  = true;

            /* ── signal pulses — axon-fire effect ───────────────────── */
            for (var pi = 0; pi < MAX_PULSES; pi++) {
                var pu = pulseObjs[pi];
                pu.t += pu.speed;
                /* when pulse completes (or uninitialized) pick a new active edge */
                if (pu.t >= 1.0 || pu.a < 0) {
                    if (activeEdgeCount > 0) {
                        var packed = activeEdgeList[Math.floor(Math.random() * activeEdgeCount)];
                        pu.b = packed & 0xFFFF;
                        pu.a = (packed >>> 16) & 0xFFFF;
                        pu.t = 0;
                        pu.speed = 0.009 + Math.random() * 0.015;
                    } else {
                        /* no active edges yet – wait parked off-screen */
                        pulsePosArr[pi*3] = 9999; pulsePosArr[pi*3+1] = 9999; pulsePosArr[pi*3+2] = 9999;
                        continue;
                    }
                }
                var t  = pu.t;
                var pa = pu.a, pb = pu.b;
                /* bell-curve brightness: peaks at midpoint, invisible at endpoints */
                var bright = Math.sin(t * Math.PI);
                if (bright < 0.06) {
                    /* park almost-invisible pulses to avoid dark sprite artifacts */
                    pulsePosArr[pi*3] = 9999; pulsePosArr[pi*3+1] = 9999; pulsePosArr[pi*3+2] = 9999;
                } else {
                    pulsePosArr[pi*3]   = pos[pa*3]   + (pos[pb*3]   - pos[pa*3])   * t;
                    pulsePosArr[pi*3+1] = pos[pa*3+1] + (pos[pb*3+1] - pos[pa*3+1]) * t;
                    pulsePosArr[pi*3+2] = pos[pa*3+2] + (pos[pb*3+2] - pos[pa*3+2]) * t;
                    /* blend node color toward bright white at peak */
                    var wb = bright * bright; /* extra punch near midpoint */
                    pulseColArr[pi*3]   = colors[pa*3]   * (1.0 - wb * 0.4) + wb * 0.4;
                    pulseColArr[pi*3+1] = colors[pa*3+1] * (1.0 - wb * 0.4) + wb * 0.4;
                    pulseColArr[pi*3+2] = colors[pa*3+2] * (1.0 - wb * 0.4) + wb * 0.4;
                }
            }
            pulsePosAttr.needsUpdate = true;
            pulseColAttr.needsUpdate  = true;

            camera.position.x += (pmx * 3.5 - camera.position.x) * 0.022;
            camera.position.y += (pmy * 2.0 - camera.position.y) * 0.022;

            renderer.render(scene, camera);
        }
        animate();
    }

    /* ── INITIALISATION ─────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initNeonGlow();
        if (!isTouch && !prefersReduced) {
            /* cursor removed — initMagneticButtons still runs */
            initMagneticButtons();
        }
    });

    window.addEventListener('load', function () {
        initLenis();
        initScrollReveal();
    });

    /* Expose public API */
    window.AIsabellaDS = {
        initTextScramble: initTextScramble,
        initScrollReveal: initScrollReveal,
        initNeonGlow:     initNeonGlow,
        initThreeHero:    initThreeHero
    };
})();
