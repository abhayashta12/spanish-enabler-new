"use client"

import { useRef, useState, useEffect } from "react"

// PhoneVideo Component
function PhoneVideo({ videoSrc, title, client, delay = 0 }) {
  const [isInView, setIsInView] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold: 0.5,
      },
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      if (isInView) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error)
        })
      } else {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return (
    <div className="relative min-h-[700px]">
      <div className="sticky top-24">
        <div
          className="phone-frame mx-auto"
          style={{
            opacity: 0,
            transform: "translateY(20px)",
            animation: `fadeIn 0.5s ${delay}s forwards, slideUp 0.5s ${delay}s forwards`,
          }}
        >
          <div className="phone-notch"></div>
          <div className="phone-screen">
            <video ref={videoRef} muted loop playsInline className="w-full h-full object-cover">
              <source src={videoSrc} type="video/mp4" />
            </video>
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

function YoutubeIcon() {
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
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
      <path d="m10 15 5-3-5-3z"></path>
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
    >
      <path d="M5 12h14"></path>
      <path d="m12 5 7 7-7 7"></path>
    </svg>
  )
}

function PlayIcon() {
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
      <polygon points="5 3 19 12 5 21 5 3"></polygon>
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
  const heroRef = useRef(null)

  const workItems = [
    {
      id: 1,
      title: "Brand Campaign",
      client: "Fashion Brand",
      type: "video",
      category: "fashion",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      id: 2,
      title: "Product Launch",
      client: "Tech Company",
      type: "video",
      category: "tech",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      id: 3,
      title: "Travel Series",
      client: "Travel App",
      type: "video",
      category: "travel",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      id: 4,
      title: "Lifestyle Content",
      client: "Wellness Brand",
      type: "photo",
      category: "lifestyle",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      id: 5,
      title: "Social Campaign",
      client: "Food Delivery",
      type: "video",
      category: "food",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
    {
      id: 6,
      title: "Brand Photography",
      client: "Apparel Company",
      type: "photo",
      category: "fashion",
      thumbnail: "/placeholder.svg?height=600&width=400",
    },
  ]

  const filteredItems =
    activeTab === "all" ? workItems : workItems.filter((item) => item.type === activeTab || item.category === activeTab)

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
      <div ref={heroRef} className="h-screen relative flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-black/5 z-0" />
        <div className="container mx-auto px-4 md:px-6 z-10">
          <div className="max-w-3xl animate-fadeIn animate-slideUp">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6">CONTENT CREATOR</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-xl">
              Specialized in creating authentic UGC that feels real and delivers measurable results.
            </p>
            <div className="flex items-center gap-6 mb-8">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full border-black hover:bg-black hover:text-white transition-all duration-300"
              >
                View Portfolio
              </Button>
              <div className="flex gap-4">
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <TikTokIcon />
                </a>
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <InstagramIcon />
                </a>
                <a href="#" className="hover:scale-110 transition-transform duration-300">
                  <YoutubeIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowRightIcon className="w-6 h-6 rotate-90" />
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Yes, that's me!</h2>
              <p className="text-lg mb-6">
                I'm your go-to for multilingual UGC that feels real and delivers results. With over 5 years of
                experience creating content that converts, I help brands connect with their audience through authentic
                storytelling.
              </p>
              <p className="text-lg mb-8">
                My content has helped brands increase engagement by an average of 45% and conversion rates by 30%.
              </p>
              <div className="flex gap-4">
                <div>
                  <div className="text-3xl font-bold">500K+</div>
                  <div className="text-sm text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">200+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-sm text-gray-400">Brands</div>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] w-full animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <img
                src="/placeholder.svg?height=1000&width=800"
                alt="Portrait"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">WORK SAMPLES</h2>
            <p className="text-lg max-w-2xl mx-auto">
              A selection of my best UGC work across various industries and platforms.
            </p>
          </div>

          <div className="flex justify-center mb-12 overflow-x-auto pb-4">
            <div className="flex gap-2 md:gap-4">
              {["all", "video", "photo", "tech", "fashion", "travel", "food", "lifestyle"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "primary" : "outline"}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full text-sm capitalize ${
                    activeTab === tab
                      ? "bg-black text-white"
                      : "border-black text-black hover:bg-black hover:text-white"
                  }`}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {/* Phone Frame Videos - These stay fixed while scrolling */}
            <PhoneVideo
              videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"
              title="Tech Product Demo"
              client="Tech Company"
            />

            {/* Second Phone Frame */}
            <PhoneVideo
              videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
              title="Fashion Campaign"
              client="Apparel Brand"
              delay={0.1}
            />
          </div>

          {/* Additional Portfolio Items */}
          <div className="mt-32">
            <h3 className="text-3xl font-bold mb-12 text-center animate-fadeIn" style={{ animationDelay: "0.2s" }}>
              More Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer animate-fadeIn"
                  style={{ animationDelay: `${0.1 * item.id}s` }}
                >
                  <div className="relative aspect-video overflow-hidden mb-4">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {item.type === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/70 rounded-full p-4">
                          <PlayIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-gray-600">{item.client}</p>
                  <div className="mt-2 inline-block text-sm bg-gray-100 px-3 py-1 rounded-full capitalize">
                    {item.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16 animate-fadeIn" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-6">CLIENTS</h2>
            <p className="text-lg max-w-2xl mx-auto">Trusted by leading brands across various industries.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="flex items-center justify-center h-24 animate-fadeIn"
                style={{ animationDelay: `${0.1 * i}s` }}
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold">Logo {i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fadeIn" style={{ animationDelay: "0.1s" }}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Work Together</h2>
              <p className="text-lg mb-8">
                Ready to create content that converts? Get in touch to discuss your project.
              </p>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg">
                Contact Me
              </Button>
            </div>
            <div className="bg-gray-100 p-8 rounded-lg animate-fadeIn" style={{ animationDelay: "0.3s" }}>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
                  ></textarea>
                </div>
                <Button className="w-full bg-black text-white hover:bg-gray-800">Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold">CONTENT CREATOR</h3>
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform duration-300">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Content Creator. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default UGCPortfolio
