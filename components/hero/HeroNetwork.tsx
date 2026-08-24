'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface Node {
  id: string;
  cx: number; // 0–1 relative to canvas
  cy: number;
  r: number;
  label: string;
  align: 'left' | 'right' | 'center';
  hub?: boolean;
}

interface Edge { a: string; b: string; }
interface Packet { edge: number; t: number; speed: number; }

const NODES: Node[] = [
  { id: 'hub',   cx: 0.50, cy: 0.46, r: 13, label: '',       align: 'center', hub: true },
  { id: 'erp',   cx: 0.16, cy: 0.20, r:  6, label: 'ERP',    align: 'right'  },
  { id: 'iot',   cx: 0.84, cy: 0.20, r:  6, label: 'IoT',    align: 'left'   },
  { id: 'cloud', cx: 0.88, cy: 0.60, r:  6, label: 'Cloud',  align: 'left'   },
  { id: 'gov',   cx: 0.50, cy: 0.88, r:  6, label: 'Gov',    align: 'center' },
  { id: 'fleet', cx: 0.12, cy: 0.60, r:  6, label: 'Fleet',  align: 'right'  },
  { id: 'api',   cx: 0.67, cy: 0.33, r:  5, label: 'API',    align: 'right'  },
  { id: 'db',    cx: 0.33, cy: 0.33, r:  5, label: 'DB',     align: 'left'   },
];

const EDGES: Edge[] = [
  { a: 'hub',   b: 'erp'   },
  { a: 'hub',   b: 'iot'   },
  { a: 'hub',   b: 'cloud' },
  { a: 'hub',   b: 'gov'   },
  { a: 'hub',   b: 'fleet' },
  { a: 'hub',   b: 'api'   },
  { a: 'hub',   b: 'db'    },
  { a: 'erp',   b: 'db'    },
  { a: 'iot',   b: 'api'   },
  { a: 'cloud', b: 'gov'   },
];

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, startTs = 0;

    // Spawn two packets per hub edge, one per secondary edge
    const packets: Packet[] = [];
    EDGES.forEach((_, i) => {
      packets.push({ edge: i, t: Math.random(), speed: 0.0022 + Math.random() * 0.002 });
      if (i < 7) packets.push({ edge: i, t: (Math.random() + 0.5) % 1, speed: 0.0016 + Math.random() * 0.002 });
    });

    const nodeMap = new Map(NODES.map(n => [n.id, n]));
    const pos = (id: string) => ({ x: nodeMap.get(id)!.cx * w, y: nodeMap.get(id)!.cy * h });

    function resize() {
      const rect = canvas!.parentElement!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.style.width  = `${w}px`;
      canvas!.style.height = `${h}px`;
      canvas!.width  = w * dpr;
      canvas!.height = h * dpr;
    }

    function tick(ts: number) {
      if (!startTs) startTs = ts;
      const elapsed = (ts - startTs) / 1000;
      const fadeIn = Math.min(1, elapsed / 1.4);

      const ctx = canvas!.getContext('2d')!;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.globalAlpha = fadeIn;

      // ── Edges ──────────────────────────────────────────────
      EDGES.forEach(e => {
        const a = pos(e.a), b = pos(e.b);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = 'rgba(22,193,114,0.16)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // ── Packets ─────────────────────────────────────────────
      packets.forEach(p => {
        p.t = (p.t + p.speed) % 1;
        const e = EDGES[p.edge];
        const a = pos(e.a), b = pos(e.b);
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;

        // Soft glow trail
        const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
        grd.addColorStop(0, 'rgba(62,232,156,0.70)');
        grd.addColorStop(1, 'rgba(62,232,156,0)');
        ctx.beginPath();
        ctx.arc(px, py, 8, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = '#3EE89C';
        ctx.fill();
      });

      // ── Nodes ───────────────────────────────────────────────
      NODES.forEach(node => {
        const nx = node.cx * w, ny = node.cy * h;

        if (node.hub) {
          // Breathing outer ring
          const breathe = 0.55 + 0.45 * Math.sin(elapsed * 1.7);
          const outerR = node.r * 2.6 * breathe;
          const grd = ctx.createRadialGradient(nx, ny, node.r, nx, ny, outerR + 12);
          grd.addColorStop(0, `rgba(22,193,114,${0.3 * breathe})`);
          grd.addColorStop(1, 'rgba(22,193,114,0)');
          ctx.beginPath();
          ctx.arc(nx, ny, outerR + 12, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Hub disc — green gradient
          const disc = ctx.createRadialGradient(nx - 3, ny - 4, 0, nx, ny, node.r);
          disc.addColorStop(0, '#3EE89C');
          disc.addColorStop(1, '#0E8A4F');
          ctx.beginPath();
          ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
          ctx.fillStyle = disc;
          ctx.fill();

          // "NT" initials
          ctx.font = 'bold 9px monospace';
          ctx.fillStyle = '#fff';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('NT', nx, ny);
          ctx.textBaseline = 'alphabetic';

          // Hub label below
          ctx.font = '500 10px monospace';
          ctx.fillStyle = '#5B655E';
          ctx.textAlign = 'center';
          ctx.fillText('NeaveTech', nx, ny + node.r + 15);
        } else {
          // Subtle ambient glow
          const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, node.r * 2.8);
          grd.addColorStop(0, 'rgba(22,193,114,0.10)');
          grd.addColorStop(1, 'rgba(22,193,114,0)');
          ctx.beginPath();
          ctx.arc(nx, ny, node.r * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // White circle with green border
          ctx.beginPath();
          ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.strokeStyle = '#16C172';
          ctx.lineWidth = 1.5;
          ctx.fill();
          ctx.stroke();

          // Label
          const pad = node.r + 8;
          ctx.font = '500 11px monospace';
          ctx.fillStyle = '#5B655E';
          if (node.align === 'right') {
            ctx.textAlign = 'left';
            ctx.fillText(node.label, nx + pad, ny + 4);
          } else if (node.align === 'left') {
            ctx.textAlign = 'right';
            ctx.fillText(node.label, nx - pad, ny + 4);
          } else {
            ctx.textAlign = 'center';
            ctx.fillText(node.label, nx, ny + pad + 6);
          }
        }
      });

      ctx.restore();
      raf = requestAnimationFrame(tick);
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <div className="absolute inset-0 grid place-items-center opacity-50">
        <div className="w-28 h-28 rounded-full border border-brand/30 bg-brand/5 grid place-items-center">
          <span className="font-mono text-[10px] text-brand-deep uppercase tracking-eyebrow">Network</span>
        </div>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden />;
}
