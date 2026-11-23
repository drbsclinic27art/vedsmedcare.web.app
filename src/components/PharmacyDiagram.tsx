import React from 'react';

interface PharmacyDiagramProps {
  diagramKey: string;
  caption?: string;
}

export function PharmacyDiagram({ diagramKey, caption }: PharmacyDiagramProps) {
  if (diagramKey === 'pharmacokinetics-adme') {
    return (
      <figure className="bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl p-5">
        <svg viewBox="0 0 720 170" className="w-full h-auto" role="img" aria-label="Pharmacokinetics ADME Flow Diagram">
          {[
            { x: 18, title: '1. Absorption', sub: 'GI / IM / IV → Blood' },
            { x: 196, title: '2. Distribution', sub: 'Plasma → Tissues' },
            { x: 374, title: '3. Metabolism', sub: 'Hepatic Phase I & II' },
            { x: 552, title: '4. Excretion', sub: 'Renal / Biliary' },
          ].map((box, i) => (
            <g key={box.title}>
              <rect x={box.x} y="34" width="150" height="92" rx="10" fill="#FFFFFF" stroke="#102A43" strokeWidth="1.5" />
              <rect x={box.x} y="34" width="150" height="26" rx="10" fill="#102A43" />
              <rect x={box.x} y="48" width="150" height="12" fill="#102A43" />
              <text x={box.x + 75} y="51" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="600">
                {box.title}
              </text>
              <text x={box.x + 75} y="92" textAnchor="middle" fill="#334E68" fontSize="11">
                {box.sub}
              </text>
              {i < 3 && (
                <path
                  d={`M ${box.x + 154} 80 L ${box.x + 174} 80 M ${box.x + 168} 74 L ${box.x + 174} 80 L ${box.x + 168} 86`}
                  stroke="#15966A"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </g>
          ))}
        </svg>
        {caption && <figcaption className="mt-2 text-xs text-[#486581] text-center">{caption}</figcaption>}
      </figure>
    );
  }

  if (diagramKey === 'nephron-filtration') {
    return (
      <figure className="bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl p-5">
        <svg viewBox="0 0 720 175" className="w-full h-auto" role="img" aria-label="Nephron Urine Formation Diagram">
          {[
            { x: 20, label: 'Glomerulus', detail: 'Ultrafiltration (~125 mL/min)' },
            { x: 196, label: 'PCT', detail: 'Glucose & H2O Reabsorption' },
            { x: 372, label: 'Loop of Henle', detail: 'Concentration Gradient' },
            { x: 548, label: 'DCT & Collecting', detail: 'Secretion & Final Urine' },
          ].map((s, idx) => (
            <g key={s.label}>
              <rect x={s.x} y="36" width="152" height="94" rx="10" fill="#FFFFFF" stroke="#15966A" strokeWidth="1.5" />
              <text x={s.x + 76} y="68" textAnchor="middle" fill="#102A43" fontSize="12.5" fontWeight="700">
                {s.label}
              </text>
              <text x={s.x + 76} y="98" textAnchor="middle" fill="#486581" fontSize="10.5">
                {s.detail}
              </text>
              {idx < 3 && (
                <path
                  d={`M ${s.x + 156} 83 L ${s.x + 172} 83 M ${s.x + 167} 78 L ${s.x + 172} 83 L ${s.x + 167} 88`}
                  stroke="#102A43"
                  strokeWidth="2"
                  fill="none"
                />
              )}
            </g>
          ))}
        </svg>
        {caption && <figcaption className="mt-2 text-xs text-[#486581] text-center">{caption}</figcaption>}
      </figure>
    );
  }

  if (diagramKey === 'dispensing-workflow') {
    return (
      <figure className="bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl p-5">
        <svg viewBox="0 0 720 165" className="w-full h-auto" role="img" aria-label="Good Pharmacy Dispensing Workflow">
          {[
            { x: 14, step: '01', name: 'Receive Rx' },
            { x: 155, step: '02', name: 'Verify & Screen' },
            { x: 296, step: '03', name: 'Select & Label' },
            { x: 437, step: '04', name: 'Double-Check' },
            { x: 578, step: '05', name: 'Counsel Patient' },
          ].map((node, idx) => (
            <g key={node.step}>
              <rect x={node.x} y="38" width="124" height="84" rx="10" fill="#FFFFFF" stroke="#D9E2EC" strokeWidth="1.5" />
              <text x={node.x + 62} y="66" textAnchor="middle" fill="#15966A" fontSize="12" fontWeight="700">
                {node.step}
              </text>
              <text x={node.x + 62} y="94" textAnchor="middle" fill="#102A43" fontSize="12" fontWeight="600">
                {node.name}
              </text>
              {idx < 4 && (
                <line x1={node.x + 126} y1="80" x2={node.x + 140} y2="80" stroke="#15966A" strokeWidth="2" />
              )}
            </g>
          ))}
        </svg>
        {caption && <figcaption className="mt-2 text-xs text-[#486581] text-center">{caption}</figcaption>}
      </figure>
    );
  }

  // Default: tablet-granulation
  return (
    <figure className="bg-[#F5F8FA] border border-[#D9E2EC] rounded-xl p-5">
      <svg viewBox="0 0 720 165" className="w-full h-auto" role="img" aria-label="Wet Granulation Tablet Manufacturing Flow">
        {[
          { x: 14, name: 'Weighing & Sifting' },
          { x: 155, name: 'Wet Mixing (Binder)' },
          { x: 296, name: 'Drying & Screening' },
          { x: 437, name: 'Lubrication' },
          { x: 578, name: 'Compression & QC' },
        ].map((node, idx) => (
          <g key={node.name}>
            <rect x={node.x} y="38" width="126" height="82" rx="10" fill="#FFFFFF" stroke="#102A43" strokeWidth="1.4" />
            <text x={node.x + 63} y="83" textAnchor="middle" fill="#102A43" fontSize="11" fontWeight="600">
              {node.name}
            </text>
            {idx < 4 && (
              <path
                d={`M ${node.x + 128} 79 L ${node.x + 140} 79`}
                stroke="#15966A"
                strokeWidth="2"
              />
            )}
          </g>
        ))}
      </svg>
      {caption && <figcaption className="mt-2 text-xs text-[#486581] text-center">{caption}</figcaption>}
    </figure>
  );
}
