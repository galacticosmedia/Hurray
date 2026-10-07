import { useEffect, useRef, useState } from 'react'
import womanSrc from '../assets/woman.png'

const TALL_QUERY = '(max-aspect-ratio: 11/10)'
const VIEWBOX_WIDE = '0 0 1600 900'
const VIEWBOX_TALL = '560 0 1040 900' // crops to the woman + circles on portrait screens

const lineBase = 'block whitespace-nowrap opacity-0 animate-in-left'

export default function Hero() {
  const heroRef = useRef(null)
  const [viewBox, setViewBox] = useState(VIEWBOX_WIDE)

  // Swap the SVG viewBox on portrait / near-square screens
  useEffect(() => {
    const mq = window.matchMedia(TALL_QUERY)
    const update = () => setViewBox(mq.matches ? VIEWBOX_TALL : VIEWBOX_WIDE)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Subtle mouse parallax (only on devices with a real pointer)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return
    const groups = heroRef.current.querySelectorAll('[data-p]')
    const onMove = (e) => {
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      groups.forEach((g) => {
        const p = Number(g.dataset.p)
        g.style.translate = `${x * p}px ${y * p}px`
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const px = 'transition-[translate] duration-500 ease-out'
  const shape = "[transform-box:fill-box] opacity-0"

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-cream h-[calc(100dvh-env(safe-area-inset-top,0px)-env(safe-area-inset-bottom,0px))] tall:flex tall:flex-col"
    >
      {/* ---------- Sunlight (anchored to the screen's top-left) ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-[15vmax] -top-[15vmax] size-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.9),rgba(255,255,255,0)_68%)] animate-glow" />
        {[
          { left: '6%', width: '14%', delay: '0s' },
          { left: '24%', width: '9%', delay: '-3.5s' },
          { left: '-4%', width: '7%', delay: '-7s' },
        ].map((r, i) => (
          <div
            key={i}
            className="absolute -top-[10%] h-[120%] skew-x-[15deg] blur-[14px] opacity-0 animate-ray bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.8),rgba(255,255,255,0))]"
            style={{ left: r.left, width: r.width, animationDelay: r.delay }}
          />
        ))}
      </div>

      {/* ---------- Scene: circles + woman, one SVG so everything scales together ---------- */}
      <div className="absolute inset-0 tall:relative tall:inset-auto tall:flex-1 tall:min-h-0 tall:w-full">
        <svg
          viewBox={viewBox}
          preserveAspectRatio="xMaxYMax meet"
          aria-hidden="true"
          className="block h-full w-full"
        >
          <defs>
            <linearGradient id="tealGrad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#5CC2C2" />
              <stop offset=".6" stopColor="#2AA3A8" />
            </linearGradient>
          </defs>

          <g data-p="-22" className={px}>
            <path
              className={`${shape} origin-top-right animate-coral`}
              d="M1410 -3000L1410 -40C1398 120 1432 225 1505 292C1545 330 1580 380 1700 430L1700 -3000Z"
              fill="#FF6B4A"
            />
          </g>
          <g data-p="28" className={px}>
            <circle className={`${shape} origin-center animate-yellow`} cx="1100" cy="650" r="480" fill="#FBC84B" />
          </g>
          <g data-p="-34" className={px}>
            <circle className={`${shape} origin-center animate-teal-right`} cx="1660" cy="1000" r="560" fill="#2AA3A8" />
          </g>
          <g data-p="18" className={px}>
            <ellipse className={`${shape} origin-center animate-teal-left`} cx="850" cy="1450" rx="780" ry="775" fill="url(#tealGrad)" />
          </g>

          {/* Woman: slides in once from the right, then stays still */}
          <g className="opacity-0 animate-in-right">
            <image href={womanSrc} x="574" y="41" width="1114" height="859" preserveAspectRatio="none" />
          </g>
        </svg>
      </div>

      {/* ---------- Copy ---------- */}
      <div className="absolute left-[6.7%] top-[14%] z-10 max-w-[46%] short:top-[8%] tall:relative tall:left-auto tall:top-auto tall:order-first tall:max-w-none tall:flex-none tall:px-[7vw] tall:pt-[max(4svh,28px)]">
        <div
          className="block opacity-0 animate-in-left font-semibold leading-[.92] tracking-[-.025em] text-[length:min(3.5vw,6.2vh)] tall:text-[length:min(6.4vw,3.4svh)]"
          style={{ animationDelay: '.1s' }}
        >
          Hurray<br />Wellness
        </div>

        <h1 className="mt-[min(5vw,9vh)] mb-[min(4.2vw,7.5vh)] font-bold leading-none tracking-[-.04em] text-[length:min(6.6vw,11.7vh)] tall:mt-[min(5vw,2.6svh)] tall:mb-[min(4.5vw,2.4svh)] tall:text-[length:min(14vw,7.4svh)]">
          <span className={lineBase} style={{ animationDelay: '.3s' }}>A New</span>
          <span className="block whitespace-nowrap opacity-0 animate-wellness text-transparent bg-clip-text bg-[linear-gradient(100deg,#FF6B4A_35%,#FFA06A_50%,#FF6B4A_65%)] bg-[length:250%_100%]">
            Wellness
          </span>
          <span className={lineBase} style={{ animationDelay: '.75s' }}>Is Coming</span>
        </h1>

        <div className="h-0.5 w-0 bg-ink animate-grow [--lw:min(5.4vw,9.6vh)] tall:[--lw:min(18vw,9svh)]" />

        <p
          className="mt-[min(2vw,3.6vh)] whitespace-nowrap font-normal uppercase tracking-[.42em] opacity-0 animate-in-left text-[length:min(1.5vw,2.7vh)] tall:mt-[min(3vw,1.6svh)] tall:tracking-[.36em] tall:text-[length:min(3.3vw,1.8svh)]"
          style={{ animationDelay: '1.2s' }}
        >
          Stay Tuned
        </p>
      </div>
    </section>
  )
}
