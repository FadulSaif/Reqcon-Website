import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ZoomIn, ZoomOut, Maximize2, FileText } from 'lucide-react';

export const DocumentViewer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [zoom, setZoom] = useState(1);
  const [activePage, setActivePage] = useState(1);
  const page1Ref = useRef<HTMLDivElement>(null);
  const page2Ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Zoom handlers
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.1, 1.4));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.1, 0.7));
  const handleResetZoom = () => setZoom(1);

  // Detect active page on scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const p1 = page1Ref.current;
      const p2 = page2Ref.current;
      if (!p1 || !p2) return;

      const containerRect = container.getBoundingClientRect();
      const p2Rect = p2.getBoundingClientRect();

      // If Page 2 top is past the middle of the container, switch to Page 2
      if (p2Rect.top <= containerRect.top + containerRect.height / 2) {
        setActivePage(2);
      } else {
        setActivePage(1);
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Title Header */}
      <div className="flex justify-between items-center max-w-4xl mx-auto w-full px-2">
        <h3 className="text-xl md:text-2xl font-black text-text-primary uppercase tracking-tight flex items-center gap-3">
          <FileText className="w-6 h-6 text-brand-secondary" />
          {i18n.language === 'sv' ? 'Läs vår personalpolicy' : 'Read our personnel policy'}
        </h3>
        
        {/* Open PDF Popout */}
        <a 
          href="/REQCON-Personalpolicy.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-bold text-brand-secondary hover:text-brand-primary transition-colors py-1.5 px-3 rounded-lg border border-border-custom hover:border-brand-secondary/40 bg-bg-surface"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>{i18n.language === 'sv' ? 'Öppna i ny flik' : 'Open in new tab'}</span>
        </a>
      </div>

      {/* Reader Box Wrapper */}
      <div className="relative w-full max-w-4xl mx-auto border border-border-custom rounded-3xl bg-slate-100 dark:bg-zinc-900/60 p-4 md:p-8 overflow-hidden shadow-inner flex flex-col items-center">
        
        {/* Pages Scroll Area */}
        <div 
          ref={containerRef}
          className="w-full overflow-y-auto max-h-[600px] flex flex-col items-center gap-8 py-4 scroll-smooth pr-1"
        >
          {/* Zoom Scaled Wrapper */}
          <div 
            className="flex flex-col gap-8 transition-transform duration-200 origin-top"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* --- PAGE 1 --- */}
            <div 
              ref={page1Ref}
              className="bg-white text-slate-800 shadow-xl border border-slate-200 w-[595px] min-h-[842px] p-12 md:p-16 flex flex-col gap-8 text-left relative leading-relaxed font-sans"
            >
              {/* Top Envelope ID */}
              <div className="text-[8px] font-mono text-slate-400 absolute top-4 left-6 select-none">
                Docusign Envelope ID: 0E3D7155-B38D-48C3-9393-C5186A76E440
              </div>

              {/* Logo block */}
              <div className="flex items-center gap-2 mt-2">
                <img src="/images/logo.png" alt="REQCON Logo" className="h-8 object-contain" />
              </div>

              {/* Document Title Header */}
              <div className="flex flex-col gap-2 mt-4">
                <h1 className="text-3xl font-black text-[#004B6E] tracking-tight">{t('careers.policy.title')}</h1>
                <div className="h-[2px] bg-[#008CBA] w-full" />
              </div>

              {/* Page 1 Sections */}
              <div className="flex flex-col gap-6 text-[13px] text-slate-700">
                {/* Section 1 */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.1.title')}</h3>
                  <p>{t('careers.policy.sections.1.text')}</p>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.2.title')}</h3>
                  <p>{t('careers.policy.sections.2.text')}</p>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.3.title')}</h3>
                  <p>{t('careers.policy.sections.3.text')}</p>
                </div>

                {/* Section 4 */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.4.title')}</h3>
                  <p>{t('careers.policy.sections.4.text')}</p>
                  <ul className="flex flex-col gap-2.5 pl-4 border-l-2 border-[#008CBA]/30 mt-1">
                    {[0, 1, 2, 3, 4].map((bulletIdx) => (
                      <li key={bulletIdx}>
                        <span dangerouslySetInnerHTML={{ __html: t(`careers.policy.sections.4.bullets.${bulletIdx}`) }} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Section 5 */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.5.title')}</h3>
                  <p dangerouslySetInnerHTML={{ __html: t('careers.policy.sections.5.text') }} />
                </div>
              </div>
            </div>

            {/* --- PAGE 2 --- */}
            <div 
              ref={page2Ref}
              className="bg-white text-slate-800 shadow-xl border border-slate-200 w-[595px] min-h-[842px] p-12 md:p-16 flex flex-col gap-8 text-left relative leading-relaxed font-sans"
            >
              {/* Top Envelope ID */}
              <div className="text-[8px] font-mono text-slate-400 absolute top-4 left-6 select-none">
                Docusign Envelope ID: 0E3D7155-B38D-48C3-9393-C5186A76E440
              </div>

              {/* Logo block */}
              <div className="flex items-center gap-2 mt-2">
                <img src="/images/logo.png" alt="REQCON Logo" className="h-8 object-contain" />
              </div>

              {/* Page 2 Sections */}
              <div className="flex flex-col gap-6 text-[13px] text-slate-700 mt-6">
                {[6, 7, 8, 9, 10, 11].map((num) => (
                  <div key={num} className="flex flex-col gap-1.5">
                    <h3 className="font-bold text-[#006897] text-sm">{t(`careers.policy.sections.${num}.title`)}</h3>
                    <p dangerouslySetInnerHTML={{ __html: t(`careers.policy.sections.${num}.text`) }} />
                  </div>
                ))}

                {/* Section 12 */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-bold text-[#006897] text-sm">{t('careers.policy.sections.12.title')}</h3>
                  <p>{t('careers.policy.sections.12.text')}</p>
                </div>
              </div>

              {/* Signature Blocks */}
              <div className="mt-auto border-t border-slate-200 pt-6 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-8 text-[11px] text-slate-500">
                  {/* CEO Signature Block */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <span>Namn: <span className="font-bold text-slate-800">Fadi Rabah</span></span>
                      <span>Titel: <span className="font-bold text-slate-800">{t('careers.policy.ceo')}</span></span>
                    </div>
                    {/* DocuSign Frame Box */}
                    <div className="p-3 rounded-lg border border-blue-200 bg-blue-50/20 flex flex-col items-center gap-1 w-full max-w-[210px] relative overflow-hidden select-none">
                      <div className="absolute top-0.5 left-1 text-[6px] font-bold text-blue-500 uppercase tracking-widest">{t('careers.policy.docusigned')}</div>
                      <span className="font-serif italic font-extrabold text-lg text-blue-600 my-0.5 transform -rotate-1">Fadi Rabah</span>
                      <div className="text-[5px] font-mono text-blue-400 uppercase tracking-tighter">8AD93820CB55443...</div>
                    </div>
                  </div>

                  {/* Manager Signature Block */}
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <span>Namn: <span className="font-bold text-slate-800">Anel Pasic</span></span>
                      <span>Titel: <span className="font-bold text-slate-800">{t('careers.policy.manager')}</span></span>
                    </div>
                    {/* Signed Frame Box */}
                    <div className="p-3 rounded-lg border border-purple-200 bg-purple-50/20 flex flex-col items-center gap-1 w-full max-w-[210px] relative overflow-hidden select-none">
                      <div className="absolute top-0.5 left-1 text-[6px] font-bold text-purple-500 uppercase tracking-widest">{t('careers.policy.signed')}</div>
                      <span className="font-serif italic font-extrabold text-lg text-purple-600 my-0.5 transform -rotate-1">Anel Pasic</span>
                      <div className="text-[5px] font-mono text-purple-400 uppercase tracking-tighter">DE7160BBD22D419...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Controls Toolbar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-950/85 backdrop-blur-md text-white rounded-full px-5 py-2.5 flex items-center gap-5 shadow-xl border border-white/10 z-20 text-xs font-semibold select-none">
          {/* Page Display */}
          <div className="flex items-center gap-1.5 border-r border-white/15 pr-4">
            <span>{i18n.language === 'sv' ? 'Sida' : 'Page'}</span>
            <span className="bg-white/15 px-2 py-0.5 rounded font-bold">{activePage}</span>
            <span>/</span>
            <span>2</span>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={handleZoomOut} 
              disabled={zoom <= 0.7}
              className="p-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            
            <button 
              onClick={handleResetZoom}
              className="px-2 py-0.5 rounded hover:bg-white/10 transition-colors text-[10px]"
              title="Reset Zoom"
            >
              {Math.round(zoom * 100)}%
            </button>

            <button 
              onClick={handleZoomIn} 
              disabled={zoom >= 1.4}
              className="p-1 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
