import { useRef, useState, useEffect, useCallback } from 'react'
import HTMLFlipBook from 'react-pageflip'
import revistaData from '../data/revista.json'

interface Page {
  id: number
  file: string
  type: string
  label: string
}

function useMobile() {
  const [mobile, setMobile] = useState(
    window.matchMedia('(max-width: 767px)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return mobile
}

export default function RevistaDigital() {
  const flipRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [ready, setReady] = useState(false)
  const [abierto, setAbierto] = useState(false)
  const [animando, setAnimando] = useState(false)
  const [abriendoLibro, setAbriendoLibro] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [cargando, setCargando] = useState(true)
  const mobile = useMobile()
  const totalPages = revistaData.pages.length

  useEffect(() => {
    const loadImages = revistaData.pages.map(
      (page: Page) =>
        new Promise<void>((resolve) => {
          const img = new Image()
          img.onload = () => resolve()
          img.onerror = () => resolve()
          img.src = page.file
        })
    )
    const minTime = new Promise<void>((resolve) => setTimeout(resolve, 2000))
    Promise.all([Promise.all(loadImages), minTime]).then(() => {
      setCargando(false)
    })
  }, [])

  useEffect(() => {
    if (abierto) {
      setFullscreen(true)
    }
  }, [abierto])

  useEffect(() => {
    if (!cargando) {
      const timer = setTimeout(() => setReady(true), 100)
      return () => clearTimeout(timer)
    }
  }, [cargando])

  useEffect(() => {
    if (flipRef.current) {
      const timer = setTimeout(() => {
        flipRef.current?.pageFlip()?.update()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [fullscreen])

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const goTo = useCallback((page: number) => {
    flipRef.current?.pageFlip()?.flip(page)
  }, [])

  const next = useCallback(() => {
    flipRef.current?.pageFlip()?.flipNext()
  }, [])

  const prev = useCallback(() => {
    flipRef.current?.pageFlip()?.flipPrev()
  }, [])

  function handleAbrir() {
    setAnimando(true)
    const duration = mobile ? 400 : 600
    setTimeout(() => {
      setAbierto(true)
      setTimeout(() => setAbriendoLibro(true), mobile ? 200 : 400)
    }, duration)
  }

  useEffect(() => {
    if (abriendoLibro && flipRef.current) {
      const timer = setTimeout(() => {
        flipRef.current?.pageFlip()?.flipNext()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [abriendoLibro])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreen) {
        setFullscreen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [fullscreen])

  function toggleMenu() {
    setFullscreen((prev) => !prev)
  }

  const portada = revistaData.pages[0]

  if (cargando) {
    return (
      <div className="revista-splash">
        <div className="revista-splash-content">
          <div className="revista-splash-spinner" />
          <p className="revista-splash-text">Cargando revista...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`revista-wrapper ${fullscreen ? 'revista-wrapper--fullscreen' : ''}`}>
      {!abierto && (
        <div
          className={`revista-portada-layer ${animando ? 'revista-portada--moviendo' : ''}`}
          onClick={animando ? undefined : handleAbrir}
        >
          <div className="revista-portada-tapa">
            <img src={portada.file} alt={portada.label} draggable={false} />
          </div>
        </div>
      )}

      {fullscreen && (
        <button
          className="revista-fs-menu-btn"
          onClick={toggleMenu}
          title="Menú"
          aria-label="Abrir menú de navegación"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      <div className={`revista-container ${fullscreen ? 'revista-container--fullscreen' : ''}`}>
        {!mobile && !fullscreen && (
          <header className="revista-header">
            <div>
              <h1 className="revista-title">{revistaData.titulo}</h1>
              <p className="revista-meta">{revistaData.edicion} · {revistaData.volumen}</p>
            </div>
            <div className="revista-controls">
              <button onClick={prev} disabled={currentPage <= 0} className="revista-btn">← Anterior</button>
              <span className="revista-page-num">{currentPage + 1} / {totalPages}</span>
              <button onClick={next} disabled={currentPage >= totalPages - 1} className="revista-btn">Siguiente →</button>
              <button onClick={toggleMenu} className="revista-btn revista-fs-toggle-btn" title="Pantalla completa">
                ⛶
              </button>
            </div>
          </header>
        )}

        <div className="revista-flip-wrapper">
          {ready && (
            <HTMLFlipBook
              key={mobile ? 'mobile' : 'desktop'}
              width={595}
              height={842}
              size="stretch"
              minWidth={280}
              maxWidth={fullscreen ? 2000 : 1200}
              minHeight={360}
              maxHeight={fullscreen ? 1200 : 1400}
              drawShadow
              flippingTime={600}
              usePortrait={mobile}
              startZIndex={0}
              autoSize
              maxShadowOpacity={0.5}
              showCover
              mobileScrollSupport
              clickEventForward
              useMouseEvents
              swipeDistance={mobile ? 30 : 10}
              showPageCorners={!mobile}
              disableFlipByClick={false}
              startPage={0}
              onFlip={onFlip}
              ref={flipRef}
              className="revista-flipbook"
              style={{}}
            >
              {revistaData.pages.map((page: Page) => (
                <div key={page.id} className="revista-page">
                  <img src={page.file} alt={page.label} className="revista-page-img" draggable={false} />
                </div>
              ))}
            </HTMLFlipBook>
          )}
          {!ready && <div className="revista-loading">Cargando revista...</div>}
        </div>

        {mobile && !fullscreen && (
          <div className="revista-mobile-controls">
            <button onClick={prev} disabled={currentPage <= 0} className="revista-btn">←</button>
            <span className="revista-page-num">{currentPage + 1} / {totalPages}</span>
            <button onClick={next} disabled={currentPage >= totalPages - 1} className="revista-btn">→</button>
          </div>
        )}

        {!fullscreen && (
          <nav className="revista-thumbnails">
            {revistaData.pages.map((page: Page, i: number) => (
              <button key={page.id} onClick={() => goTo(i)}
                className={`revista-thumb ${currentPage === i ? 'revista-thumb--active' : ''}`} title={page.label}>
                <img src={page.file} alt={page.label} />
              </button>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
