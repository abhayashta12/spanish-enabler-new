"use client"

import { useState } from "react"
import "./verbsGuide.css"
import spanishVerbs from '../../assets/spanishverbs.png';


function VerbsGuidePage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // handle the form submission
    //sending the data to your email service
    console.log({ name, email })
    setIsSubmitted(true)
  }

  const currentYear = new Date().getFullYear()

  return (
    <div className="page-container">

      {/* Main Content */}
      <main className="main-content">
        <div className="container">
          <div className="content-wrapper">
            <div className="text-center subtitle-container">
            <br /><br /><br /><br /> <br /><br /><br /><br /><br /><h2 className="subtitle">Want to kick-start your Spanish?</h2>
            </div>

            <div className="text-center title-container">
             <h1 className="main-title">
                Get The Top 50 Spanish Verbs
                <br />
                <span className="title-second-line">for Beginners for FREE</span>
              </h1>
            </div>

            <div className="two-column-grid">
              <div className="left-column">
                <div className="features-section">
                  <h3 className="section-title">In this FREE guide, you'll discover:</h3>
                  <ul className="features-list">
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Top 50 most-used verbs in Spanish</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Examples on how to use them</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Simple pronunciation guide</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Conjugation patterns for present tense</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Practice exercises to reinforce learning</span>
                    </li>
                  </ul>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Grab it here now 👇</h3>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="signup-form">
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="form-input"
                      />
                      <input
                        type="email"
                        placeholder="Your best email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="form-input"
                      />
                      <button type="submit" className="submit-button">
                        Download for FREE Now
                      </button>
                    </form>
                  ) : (
                    <div className="success-message">
                      <h3 className="success-title">¡Gracias! Thank you!</h3>
                      <p className="success-text">
                        Check your email for your Spanish Verbs Guide. If you don't see it, please check your spam
                        folder.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="right-column">
                <div className="guide-preview">
                  <img
                    src= {spanishVerbs}
                    alt="50 Essential Spanish Verbs Guide"
                    className="guide-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="copyright">© {currentYear} The Spanish Enabler. All rights reserved.</p>
            <p className="footer-links">
              <a href="/privacy" className="footer-link">
                Privacy Policy
              </a>{" "}
              |
              <a href="/terms" className="footer-link">
                Terms of Service
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default VerbsGuidePage
