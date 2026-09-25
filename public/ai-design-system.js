/*!
 * AIsabella Design System v3.2
 * Lenis · GSAP ScrollTrigger · Magnetic UI · Neon Glow · Text Scramble
 *
 * Dependencies (lokal unter /libs, vor dieser Datei laden):
 *   - Lenis           lenis.min.js
 *   - GSAP            gsap.min.js
 *   - ScrollTrigger   ScrollTrigger.min.js
 *
 * Public API:
 *   window.AIsabellaDS.initTextScramble(['#err-heading'])   (404-Seite)
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
    /*  Nur Legal-Seiten (Impressum, Datenschutz, 404): Überschriften im   */
    /*  <main> blenden beim Scrollen ein. Die Hauptseite nutzt eigene      */
    /*  .scroll-reveal-Logik (BaseLayout) und hat seit dem Skip-Link ein   */
    /*  <main> – daher bewusst auf body.legal-page begrenzt.               */
    function initScrollReveal() {
        if (prefersReduced || !hasGSAP || !hasST) return;
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('body.legal-page main section h1, body.legal-page main section h2').forEach(function (el) {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                opacity: 0,
                y: 36,
                duration: 0.85,
                ease: 'power3.out'
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
                    gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'power3.out', overwrite: true });
                } else {
                    btn.style.transform = '';
                }
            });
        });
    }

    /* ── 6. TEXT SCRAMBLE ───────────────────────────────────────────── */
    function initTextScramble(selectors) {
        if (prefersReduced) return;
        /* Mobile deaktivieren: Scramble-Zeichen haben unterschiedliche Breiten
           und können auf kleinen Viewports die H1-Höhe verändern → CLS-Sprung */
        if (window.innerWidth < 768) return;
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

    /* ── INITIALISATION ─────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        initNeonGlow();
        if (!isTouch && !prefersReduced) {
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
        initNeonGlow:     initNeonGlow
    };
})();
