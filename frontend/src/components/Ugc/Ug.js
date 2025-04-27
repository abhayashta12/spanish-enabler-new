"use client"

import { useRef, useState, useEffect } from "react"
import "./styles.css"
import TajMahal from "../../assets/tajmahal.png";
import DavidPhoto from "../../assets/gelato.png";

// PhoneVideo Component
function PhoneVideo({ videoSrc, title, client, delay = 0 }) {
  const [isInView, setIsInView] = useState(false)
  const containerRef = useRef(null)
  const iframeRef = useRef(null)

  // Check if the video URL is a Loom URL
  const isLoomVideo = videoSrc.includes("loom.com")

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      },
    )

    if (containerRef.current) {
     }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  // Handle Loom video playback
  useEffect(() => {
    if (isLoomVideo && iframeRef.current && isInView) {
    }
  }, [isInView, isLoomVideo])

  // Determine appropriate sticky top position based on screen size
  const getStickyTopPosition = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth <= 360) return "1rem"
      if (window.innerWidth <= 576) return "2rem"
      if (window.innerWidth <= 768) return "3rem"
      return "6rem"
    }
    return "6rem" // Default
  }

  // Convert a regular Loom URL to an embed URL if needed
  const getLoomEmbedUrl = (url) => {
    if (url.includes("/embed/")) {
      return url
    }

    // Handle different Loom URL formats
    if (url.includes("/share/")) {
      return url.replace("/share/", "/embed/")
    }

    // Extract the video ID from the URL
    const matches = url.match(/loom\.com\/([\w-]+\/)+([a-zA-Z0-9]+)/)
    if (matches && matches[2]) {
      return `https://www.loom.com/embed/${matches[2]}`
    }

    return url
  }

  return (
    <div ref={containerRef} className="min-h-700 relative">
      <div className="sticky" style={{ top: getStickyTopPosition() }}>
        <div
          className="phone-frame"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            animation: `fadeIn 0.5s ${delay}s forwards, slideUp 0.5s ${delay}s forwards`,
          }}
        >
          <div className="phone-notch"></div>
          <div className="phone-screen">
            {isLoomVideo ? (
              <iframe
                ref={iframeRef}
                src={getLoomEmbedUrl(videoSrc)}
                frameBorder="0"
                allowFullScreen
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ width: "100%", height: "100%" }}
              ></iframe>
            ) : (
              <video
                autoPlay={isInView}
                loop
                playsInline
                className="w-full h-full object-cover"
                poster="/placeholder.svg?height=600&width=400"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
          <div className="phone-home-button"></div>
        </div>
        <div
          className="mt-6 text-center"
          style={{
            opacity: 0,
            animation: `fadeIn 0.5s ${delay + 0.2}s forwards`,
          }}
        >
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-gray-600">{client}</p>
        </div>
      </div>
    </div>
  )
}

// Social Media Icons
function TikTokIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"></path>
      <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"></path>
      <path d="M15 2v20"></path>
      <path d="M9 16v6"></path>
      <path d="M9 12V8c0-2.2 1.8-4 4-4"></path>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="rotate-90"
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  )
}



// Button Component
function Button({ children, className, variant = "primary", size = "md", onClick }) {
  const baseClass = "btn"
  const variantClass = variant === "outline" ? "btn-outline" : "btn-primary"
  const sizeClass = size === "lg" ? "btn-lg" : ""
  const roundClass = className?.includes("rounded-full") ? "btn-round" : ""

  return (
    <button className={`${baseClass} ${variantClass} ${sizeClass} ${roundClass} ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  )
}

// Main Portfolio Component
function UGCPortfolio() {
  const [activeTab, setActiveTab] = useState("all")
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200)
  const heroRef = useRef(null)

  // Track window size for responsive adjustments
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY
        const heroHeight = heroRef.current.offsetHeight
        const opacity = 1 - Math.min(1, scrollPosition / heroHeight)
        const scale = 1 - Math.min(0.2, scrollPosition / heroHeight)

        heroRef.current.style.opacity = opacity
        heroRef.current.style.transform = `scale(${scale})`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Hero Section */}
      <div ref={heroRef} className="hero-section"
      style={{
        backgroundImage:`url(${DavidPhoto})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

        <div className="hero-overlay"></div>
        <div className="container">
          <div className="max-w-3xl animate-fadeIn animate-slideUp">
            <h1 className="text-6xl md-text-8xl font-bold tracking-tighter mb-6">DAVID MENDOZA</h1>
            <p className="fancy-type mb-8">
            The Gen X guy that makes content that converts?
            </p>
            <div className="hero-actions">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-black hover-bg-black hover-text-white transition-all duration-300"
                onClick ={() => {
                  const el =document.getElementById("portfolio");
                  if (el) el.scrollIntoView({behavior: "smooth"});
                }} >
                View Portfolio
              </Button>
              <div className="hero-social">
                <a href="https://www.tiktok.com/@thespanishenabler" className="hover-scale transition-transform duration-300">
                  <TikTokIcon />
                </a>
                <a href="https://www.instagram.com/thespanishenabler/" className="hover-scale transition-transform duration-300">
                  <InstagramIcon />
                </a>

              </div>
            </div>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <ArrowRightIcon />
        </div>
      </div>

      {/* About Section */}
      {/* <section className="about-section">
        <div className="container">
          <div className="grid md-grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn delay-100">
              <h2 className="text-4xl md-text-5xl font-bold mb-6">Yes, that's me!</h2>
              <p className="text-lg mb-6">
                I'm your go-to for multilingual UGC that feels real and delivers results. With over 5 years of
                experience creating content that converts, I help brands connect with their audience through authentic
                storytelling.
              </p>
              <p className="text-lg mb-8">
                My content has helped brands increase engagement by an average of 45% and conversion rates by 30%.
              </p>
              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat-value">500K+</div>
                  <div className="about-stat-label">Followers</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-value">200+</div>
                  <div className="about-stat-label">Projects</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-value">50+</div>
                  <div className="about-stat-label">Brands</div>
                </div>
              </div>
            </div>
            <div className="about-image animate-fadeIn delay-300">
              <img
                src={TajMahal}
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* Portfolio Section */}
      <section section id = "portfolio" className="portfolio-section">
        <div className="container">
          <div className="portfolio-header animate-fadeIn delay-100">
            <h2 className="portfolio-title">"YES, THAT'S ME!"</h2>
            <h1>I’m your go-to for multilingual UGC
            that feels real and delivers results.</h1>
          </div>

          <div className="portfolio-filters">
            <div className="filter-buttons">
              {["ed-tech", "cooking", "tech", "fashion", "travel", "food"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "primary" : "outline"}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full text-sm capitalize`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid lg-grid-cols-2 gap-16 md-gap-20">
            {/* Phone Frame Videos - Using Loom videos instead of MP4 */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/04bbe2a860244d34a53a751a73e65eaf?sid=11120b96-fcd7-4c05-9d1b-da30aff141ab"
              title="TECH AND TRAVEL"
              client="Saily"
            />

            {/* Second Phone Frame */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/da9fce235b704d3cb68b74c8a299ea5d?sid=e53ef0c0-63b5-4be6-a409-01630e623c43"
              title="TRAVEL"
              client="Airback"
              delay={0.1}
            />


            {/* Third Phone Frame */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/7253692db2e64bbc8c214181e94fb2bf?sid=29a23625-6117-4d4a-9dd8-80e4a39dcf37"
              title="TECH"
              client="Meeting.ai"
              delay={0.2}
            />


            {/* Fourth Phone Frame */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/5d1ce3d098f24cceaa0a36d018eab142?sid=0b06191e-ccfa-4b92-848d-4f99dfafbe6c"
              title="ED-TECH"
              client="Unacademy"
              delay={0.3}
            />



            {/* Fifth Phone Frame */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/7253692db2e64bbc8c214181e94fb2bf?sid=5505e830-1a23-4106-9cc2-d02982bcc43f"
              title="Fashion"
              client="Pardo"
              delay={0.4}
            />



            {/* Sixth Phone Frame */}
            <PhoneVideo
              videoSrc="https://www.loom.com/share/f848b06d46524212b68866f9076a8875?sid=26db4076-86fa-4d00-b884-6cddb1dd6709"
              title="COOKING"
              client="Ventray"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="grid md-grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn delay-100">
              <h2 className="text-4xl md-text-5xl font-bold mb-6">WHY ME ?</h2>
              <p className="text-lg mb-6">
              I know how to get people to stop scrolling — and take action.
              I’ve helped professionals and language learners tell better stories, speak with confidence, and build an online presence that increases their visibility and gets results.
              </p>
              <p className="text-lg mb-8">
              With over 500K followers across platforms — all grown organically —    I know what makes content click. And convert.
              </p>
              <p className="text-lg mb-6">
              Brands in the language, food, fashion, travel, and lifestyle space trust me to create UGC that feels authentic, fun, and worth watching. And if you're in a different niche, I'm game!
              </p>
              <p className="text-lg mb-6">
              Let’s make your brand stand out with videos that feel real, speak your customer’s language, and sprinkle in just the right amount of humour.
              </p>
              <p className="text-lg mb-6">
              I create content in English and Spanish, and I can confidently work in Portuguese for conversational or semi-scripted content.
              </p>
              
              <div className="about-stats">
                <div className="about-stat">
                  <div className="about-stat-value">500K+</div>
                  <div className="about-stat-label">Followers</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-value">200+</div>
                  <div className="about-stat-label">Projects</div>
                </div>
                <div className="about-stat">
                  <div className="about-stat-value">50+</div>
                  <div className="about-stat-label">Brands</div>
                </div>
              </div>
            </div>
            <div className="about-image animate-fadeIn delay-300">
              <img
                src={TajMahal}
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      
      {/* Clients Section */}
      <section className="clients-section">
        <div className="container">
          <div className="clients-header animate-fadeIn delay-100">
            <h2 className="clients-title">CLIENTS</h2>
            <p className="clients-description">Trusted by leading brands across various industries.</p>
          </div>

          <div className="clients-grid md-grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="client-logo animate-fadeIn" style={{ animationDelay: `${0.1 * i}s` }}>
                <div className="client-logo-inner">
                  <span className="client-logo-text">Logo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="grid md-grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn delay-100">
              <h2 className="text-4xl md-text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-lg mb-8">
                Ready to create content that converts? Get in touch to discuss your project.
              </p>
              <Button className="bg-black text-white hover-bg-gray-800 rounded-full px-8 py-6 text-lg">
                Contact Me
              </Button>
            </div>
            <div className="contact-form animate-fadeIn delay-300">
              <form className="space-y-6">
                <div className="form-group">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  ></textarea>
                </div>
                <Button className="w-full bg-black text-white hover-bg-gray-800">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo mb-6 md-mb-0">
              <h3 className="text-2xl font-bold">DAVID MENDOZA</h3>
            </div>
            <div className="footer-social">
              <a href="https://www.tiktok.com/@thespanishenabler" className="hover-scale transition-transform duration-300">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/thespanishenabler/?hl=en" className="hover-scale transition-transform duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="footer-copyright">© {new Date().getFullYear()} David Mendoza. All rights reserved.</div>
        </div>
      </footer>
    </div>
  )
}

export default UGCPortfolio
