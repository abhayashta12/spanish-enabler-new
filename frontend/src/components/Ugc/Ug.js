"use client"

import { useState, useEffect } from "react"
import "./styles.css"

export default function UGCLandingPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleFormChange = (e) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", message: "" })
    alert("Thanks for your message! I'll get back to you soon.")
  }

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  // Portfolio data
  const portfolioItems = [
    { title: "Beauty Brand Review", platform: "Instagram", views: "1.2M views" },
    { title: "Tech Product Unboxing", platform: "TikTok", views: "2.5M views" },
    { title: "Fashion Try-On", platform: "YouTube", views: "800K views" },
    { title: "Food Recipe", platform: "Instagram", views: "1.8M views" },
    { title: "Lifestyle Hack", platform: "TikTok", views: "3.2M views" },
    { title: "Travel Essentials", platform: "YouTube", views: "1.5M views" },
  ]

  // Services data
  const services = [
    {
      icon: "💡",
      title: "Authentic Style",
      description: "Content that feels natural to the platform while still highlighting your product's best features.",
    },
    {
      icon: "🔥",
      title: "Proven Results",
      description: "High engagement rates with content designed to drive conversions and build brand loyalty.",
    },
    {
      icon: "🧠",
      title: "Quick Turnaround",
      description: "Fast delivery without sacrificing quality, helping you stay consistent and relevant.",
    },
    {
      icon: "📱",
      title: "Platform Expertise",
      description: "Deep understanding of algorithm preferences and audience behavior across social platforms.",
    },
    {
      icon: "🎯",
      title: "Strategic Approach",
      description: "Content aligned with your marketing goals, not just random videos that look good.",
    },
    {
      icon: "🔄",
      title: "Adaptability",
      description: "Quick to adjust to trend changes and platform updates to keep your content fresh.",
    },
  ]

  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director, BeautyBrand",
      quote:
        "John's content consistently outperforms our other marketing efforts. His authentic approach has helped us connect with our audience in ways we never could before.",
    },
    {
      name: "Michael Chen",
      role: "Founder, TechStartup",
      quote:
        "Working with John was effortless. He understood our product and created content that explained complex features in an engaging, simple way.",
    },
    {
      name: "Emma Williams",
      role: "Social Media Manager, FashionCo",
      quote:
        "The ROI on John's content has been incredible. We've seen a 40% increase in conversion rates from his videos compared to our previous content.",
    },
    {
      name: "David Rodriguez",
      role: "CMO, LifestyleBrand",
      quote:
        "John doesn't just create videos, he creates strategies. His content has become the cornerstone of our social media presence.",
    },
  ]

  return (
    <div className="ugc-landing-page">
      {/* Navigation */}
      <nav className={`main-nav ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <span className="logo">David Mendoza</span>
          <div className="nav-links">
            <button onClick={() => scrollToSection("about")} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection("portfolio")} className="nav-link">
              Portfolio
            </button>
            <button onClick={() => scrollToSection("contact")} className="nav-link">
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className={`hero-content ${isVisible ? "visible" : ""}`}>
          <div className="badge">UGC Creator & Content Specialist</div>
          <div className="avatar">
            <img src="/placeholder.svg?height=128&width=128" alt="David Mendoza" />
            <div className="avatar-fallback">DM</div>
          </div>
          <h1 className="hero-title">David Mendoza?</h1>
          <p className="hero-subtitle">
          The Gen X guy that makes
          content that converts?
          </p>
          <p className="hero-subtitle">
          “Yes, that’s me!”
          </p>
          <button className="primary-button" onClick={() => scrollToSection("portfolio")}>
            Watch My Work
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
              className="arrow-down"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        <div className="scroll-indicator">
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
            className="bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="container">
          <h2 className="brands-title">Trusted by brands like</h2>
          <div className="brands-list">
            {["Saily", "Meeting.ai", "Airback", "Unacademy", "Ventray"].map((brand, index) => (
              <div key={index} className="brand-item">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">About Me</div>
            <h2 className="section-title">
              Creating Content That <span className="highlight">Converts</span>
            </h2>
            <div className="divider"></div>
          </div>

          <div className="about-content">
            <div className="about-image">
              <div className="image-overlay"></div>
              <img src="/placeholder.svg?height=600&width=600" alt="David's Best Video" className="profile-image" />
            </div>

            <div className="about-text">
              <p>
                I specialize in creating short-form content that feels natural and converts. Based in Toronto, I've
                worked with beauty, lifestyle, and tech brands to create high-converting Reels and TikToks.
              </p>
              <p>
                My approach combines authentic storytelling with strategic marketing principles to create content that
                not only engages but drives real business results.
              </p>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>50+</h3>
                  <p>Brands Served</p>
                </div>
                <div className="stat-card">
                  <h3>200+</h3>
                  <p>Videos Created</p>
                </div>
                <div className="stat-card">
                  <h3>15M+</h3>
                  <p>Views Generated</p>
                </div>
                <div className="stat-card">
                  <h3>4.8/5</h3>
                  <p>Client Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Portfolio</div>
            <h2 className="section-title">
              My Recent <span className="highlight">Work</span>
            </h2>
            <p className="section-description">
              A selection of UGC content I've created for various brands across different industries.
            </p>
            <div className="divider"></div>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <div key={index} className="portfolio-item">
                <div className="portfolio-card">
                  <div className="portfolio-image-container">
                    <img
                      src={`/placeholder.svg?height=640&width=360&text=${encodeURIComponent(item.title)}`}
                      alt={item.title}
                      className="portfolio-image"
                    />
                    <div className="portfolio-overlay">
                      <button className="play-button">
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
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="portfolio-content">
                    <h3>{item.title}</h3>
                    <p>
                      {item.platform} • {item.views}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="portfolio-footer">
            <button className="outline-button">
              View Full Portfolio
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
                className="external-link"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Why Work With Me */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Services</div>
            <h2 className="section-title">
              Why Work With <span className="highlight">Me?</span>
            </h2>
            <p className="section-description">I bring a unique blend of creativity and strategy to every project.</p>
            <div className="divider"></div>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Testimonials</div>
            <h2 className="section-title">
              What Clients <span className="highlight">Say</span>
            </h2>
            <div className="divider"></div>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-avatar">
                    <div className="testimonial-avatar-fallback">{testimonial.name.charAt(0)}</div>
                  </div>
                  <div className="testimonial-author">
                    <h4>{testimonial.name}</h4>
                    <p>{testimonial.role}</p>
                  </div>
                </div>
                <p className="testimonial-quote">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <div className="badge">Contact</div>
            <h2 className="section-title">
              Let's Create <span className="highlight">Together</span>
            </h2>
            <p className="section-description">
              Ready to elevate your brand's social media presence? Get in touch and let's discuss your project.
            </p>
            <div className="divider"></div>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <h3>Get In Touch</h3>
              <div className="contact-methods">
                <div className="contact-method">
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
                    className="contact-icon"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:david@thespanishenabler.com">david@thespanishenabler.com</a>
                </div>
                <div className="contact-method">
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
                    className="contact-icon"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <a href="https://instagram.com/thespanishenabler" target="_blank" rel="noreferrer">
                    @thespanishenabler
                  </a>
                </div>
              </div>

              <div className="services-offered">
                <h4>Services Offered:</h4>
                <div className="service-tags">
                  {[
                    "UGC Content",
                    "TikTok Videos",
                    "Instagram Reels",
                    "Product Reviews",
                    "Testimonials",
                    "How-to Videos",
                  ].map((service, index) => (
                    <span key={index} className="service-tag">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleFormChange}
                  placeholder="Tell me about your project"
                  required
                ></textarea>
              </div>
              <button type="submit" className="primary-button full-width">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">© {new Date().getFullYear()} David Mendoza. All rights reserved.</div>
        </div>
      </footer>

      
      {/* Coming Soon Overlay */}
<div className="coming-soon-overlay">
  <div className="coming-soon-content">
    <h1>🚧 Coming Soon</h1>
    <p>We're working on something amazing. Stay tuned!</p>
  </div>
</div>

    </div>
  )
}

