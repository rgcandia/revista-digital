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
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    function handler() { setMobile(window.innerWidth < 768) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
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
  const mobile = useMobile()
  const totalPages = revistaData.pages.length

  useEffect(() => {
    if (mobile) setAbierto(true)
  }, [mobile])

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 300)
    return () => clearTimeout(timer)
  }, [])

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  function goTo(page: number) {
    flipRef.current?.pageFlip()?.flip(page)
  }

  function next() {
    flipRef.current?.pageFlip()?.flipNext()
  }

  function prev() {
    flipRef.current?.pageFlip()?.flipPrev()
  }

  function handleAbrir() {
    if (mobile) {
      setAbierto(true)
      return
    }
    setAnimando(true)
    setTimeout(() => {
      setAbierto(true)
      setTimeout(() => setAbriendoLibro(true), 400)
    }, 600)
  }

  useEffect(() => {
    if (abriendoLibro && flipRef.current) {
      const timer = setTimeout(() => {
        flipRef.current?.pageFlip()?.flipNext()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [abriendoLibro])

  const portada = revistaData.pages[0]

  return (
    <div className="revista-wrapper">
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

      <div className="revista-container">
        {!mobile && (
          <header className="revista-header">
            <div>
              <h1 className="revista-title">{revistaData.titulo}</h1>
              <p className="revista-meta">{revistaData.edicion} · {revistaData.volumen}</p>
            </div>
            <div className="revista-controls">
              <button onClick={prev} disabled={currentPage <= 0} className="revista-btn">← Anterior</button>
              <span className="revista-page-num">{currentPage + 1} / {totalPages}</span>
              <button onClick={next} disabled={currentPage >= totalPages - 1} className="revista-btn">Siguiente →</button>
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
              maxWidth={1200}
              minHeight={380}
              maxHeight={1400}
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
              swipeDistance={0}
              showPageCorners
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

        {mobile && (
          <div className="revista-mobile-controls">
            <button onClick={prev} disabled={currentPage <= 0} className="revista-btn">←</button>
            <span className="revista-page-num">{currentPage + 1} / {totalPages}</span>
            <button onClick={next} disabled={currentPage >= totalPages - 1} className="revista-btn">→</button>
          </div>
        )}

        <nav className="revista-thumbnails">
          {revistaData.pages.map((page: Page, i: number) => (
            <button key={page.id} onClick={() => goTo(i)}
              className={`revista-thumb ${currentPage === i ? 'revista-thumb--active' : ''}`} title={page.label}>
              <img src={page.file} alt={page.label} />
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
