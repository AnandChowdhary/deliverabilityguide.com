'use client'

import { useEffect, useRef, useState } from 'react'

type Heading = { id: string; title: string; level: number; chapterId: string }
type Chapter = { id: string; title: string }
type ReadingMode = 'full' | 'tldr'

export function GuideReader({ html, chapters, outline }: {
  html: string
  chapters: Chapter[]
  outline: Heading[]
}) {
  const [mode, setMode] = useState<ReadingMode>('full')
  const [ready, setReady] = useState(false)
  const [activeId, setActiveId] = useState(outline[0].id)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const readerRef = useRef<HTMLElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const contentsButtonRef = useRef<HTMLButtonElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const pendingSection = useRef<string | null>(null)
  const activeHeading = outline.find(heading => heading.id === activeId) ?? outline[0]
  const chapterIndex = chapters.findIndex(chapter => chapter.id === activeHeading.chapterId)
  const normalizedQuery = query.trim().toLocaleLowerCase()
  const matches = outline.filter(heading => heading.title.toLocaleLowerCase().includes(normalizedQuery))

  useEffect(() => {
    const toolbar = toolbarRef.current
    const reader = readerRef.current
    if (!toolbar || !reader) return
    function measureToolbar() {
      const height = Math.ceil(toolbar!.getBoundingClientRect().height)
      reader!.style.setProperty('--reader-toolbar-height', `${height}px`)
      reader!.style.setProperty('--reader-offset', `${height + 24}px`)
    }
    measureToolbar()
    const observer = new ResizeObserver(measureToolbar)
    observer.observe(toolbar)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let initial: ReadingMode = 'full'
    const params = new URLSearchParams(window.location.search)
    try {
      if (localStorage.getItem('guide-reading-mode') === 'tldr') initial = 'tldr'
    } catch { /* Reading still works when browser storage is unavailable. */ }
    if (params.get('view') === 'tldr') initial = 'tldr'
    if (params.get('view') === 'full') initial = 'full'
    if (window.location.hash) {
      try { pendingSection.current = decodeURIComponent(window.location.hash.slice(1)) } catch { /* Ignore malformed hashes. */ }
    }
    setMode(initial)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    try { localStorage.setItem('guide-reading-mode', mode) } catch { /* Optional preference. */ }
    const target = pendingSection.current
    if (target) {
      pendingSection.current = null
      requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: 'start', behavior: 'instant' }))
    }
  }, [mode, ready])

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      const threshold = (toolbarRef.current?.offsetHeight ?? 88) + 32
      let current = outline[0].id
      for (const heading of outline) {
        const element = document.getElementById(heading.id)
        if (element && element.getBoundingClientRect().top <= threshold) current = heading.id
        else break
      }
      setActiveId(current)
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      cancelAnimationFrame(frame)
    }
  }, [outline, mode])

  useEffect(() => {
    navRef.current?.querySelectorAll<HTMLDetailsElement>('details').forEach(chapter => {
      chapter.open = Boolean(normalizedQuery) || chapter.dataset.chapter === activeHeading.chapterId
    })
  }, [activeHeading.chapterId, normalizedQuery])

  useEffect(() => {
    if (!menuOpen) return
    searchRef.current?.focus()
    function dismiss(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        contentsButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', dismiss)
    return () => document.removeEventListener('keydown', dismiss)
  }, [menuOpen])

  function changeMode(nextMode: ReadingMode, section?: string) {
    if (nextMode === mode) return
    // Keep the current reading position instead of jumping as the book changes length.
    if (section) pendingSection.current = section
    else if ((readerRef.current?.getBoundingClientRect().top ?? 1) <= 0) pendingSection.current = activeId
    const url = new URL(window.location.href)
    url.searchParams.set('view', nextMode)
    window.history.replaceState(null, '', url)
    setMode(nextMode)
  }

  function followSection(id: string) {
    setMenuOpen(false)
    setActiveId(id)
    requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
  }

  return (
    <main id="guide" ref={readerRef} className="guide-reader" data-mode={mode} data-ready={ready}>
      <noscript><style>{'.reader-navigation{display:block!important}.reader-navigation-inner{position:static!important}.reader-interactive{display:none!important}'}</style></noscript>
      <div className="reader-toolbar" ref={toolbarRef}>
        <div className="reader-toolbar-inner">
          <a href="#guide" className="reader-title">The field guide<span>Cold outbound, from setup to replies.</span></a>
          <div className="reader-mode reader-interactive" role="group" aria-label="Reading mode">
            <button type="button" aria-pressed={mode === 'full'} onClick={() => changeMode('full')}>Full guide</button>
            <button type="button" aria-pressed={mode === 'tldr'} onClick={() => changeMode('tldr')}>TL;DR only</button>
          </div>
          <div className="reader-mobile-row">
            <button ref={contentsButtonRef} type="button" className="reader-contents-button reader-interactive" aria-expanded={menuOpen} aria-controls="contents" onClick={() => setMenuOpen(!menuOpen)}>
              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
              {menuOpen ? 'Close contents' : 'Contents'}
            </button>
            <span className="reader-location">{String(chapterIndex + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}<span>{chapters[chapterIndex].title}</span></span>
          </div>
        </div>
      </div>
      <div className="reader-layout">
        <aside id="contents" className={`reader-navigation${menuOpen ? ' is-open' : ''}`}>
          <div className="reader-navigation-inner">
            <div className="reader-nav-heading">Inside the guide <span>{chapters.length} chapters</span></div>
            <div className="reader-search reader-interactive">
              <label htmlFor="guide-topic-search" className="sr-only">Find a topic in the contents</label>
              <input ref={searchRef} id="guide-topic-search" type="search" placeholder="Find a topic…" value={query} onChange={event => setQuery(event.target.value)} />
            </div>
            <nav ref={navRef} aria-label="Table of contents">
              {chapters.map((chapter, index) => {
                const chapterMatches = chapter.title.toLocaleLowerCase().includes(normalizedQuery)
                const children = outline.filter(heading => heading.chapterId === chapter.id && heading.level > 2 && (!normalizedQuery || chapterMatches || matches.includes(heading)))
                if (normalizedQuery && !chapterMatches && !children.length) return null
                return (
                  <details key={chapter.id} data-chapter={chapter.id} open={Boolean(normalizedQuery) || chapter.id === activeHeading.chapterId} className={chapter.id === activeHeading.chapterId ? 'is-active-chapter' : ''}>
                    <summary><span className="reader-chapter-number">{String(index + 1).padStart(2, '0')}</span><span>{chapter.title}</span><span className="reader-chevron" aria-hidden="true">⌄</span></summary>
                    <ul>
                      <li><a href={`#${chapter.id}`} aria-current={activeId === chapter.id ? 'location' : undefined} onClick={() => followSection(chapter.id)}>{chapter.title === 'Tracking' ? 'Tracking overview' : 'Chapter overview'}</a></li>
                      {children.map(heading => <li key={heading.id} data-level={heading.level}><a href={`#${heading.id}`} aria-current={activeId === heading.id ? 'location' : undefined} onClick={() => followSection(heading.id)}>{heading.title}</a></li>)}
                    </ul>
                  </details>
                )
              })}
              {normalizedQuery && !matches.length && <p className="reader-no-results" role="status">No matching topics. Try “DNS”, “warming”, or “replies”.</p>}
            </nav>
            <a className="reader-back-top" href="#guide" onClick={() => setMenuOpen(false)}>Back to the beginning <span aria-hidden="true">↑</span></a>
          </div>
        </aside>
        <div className="reader-body">
          <div className="reader-intro" aria-live="polite">
            <p className="reader-eyebrow">{mode === 'full' ? 'THE COMPLETE PLAYBOOK' : 'THE ESSENTIALS'}</p>
            <p>{mode === 'full' ? 'Read from the beginning or pick the topic you need. The TL;DR view gives you the key advice from every section.' : 'The key advice from every section. Open any section for the full reasoning, examples, and setup instructions.'}</p>
          </div>
          <article className="prose guide-prose" aria-label={mode === 'full' ? 'Full deliverability guide' : 'Deliverability guide summaries'} onClick={event => {
            const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-read-section]')
            if (!button?.dataset.readSection) return
            const id = button.dataset.readSection
            changeMode('full', id)
            requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }))
          }} dangerouslySetInnerHTML={{ __html: html }} />
          <div className="reader-end"><p>You’ve reached the end of the guide.</p><a href="#guide">Back to the beginning ↑</a></div>
        </div>
      </div>
    </main>
  )
}
