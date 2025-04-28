"use client"

import { useState } from "react"
import "./leadgen.css"
import mistakesImage from '../../assets/mistakes.png';


function MistakesPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    //handle the form submission
    // sending the data to your email service
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
            
            <br /><br /><br /><br /> <br /><br /><br /><br /><br /><h2 className="subtitle">Want to avoid embarassing mistakes?</h2>
            </div>

            <div className="text-center title-container">
              <h1 className="main-title">
                Discover 20 Common Mistakes
                <br />
                <span className="title-second-line">Spanish Learners Make for FREE</span>
              </h1>
            </div>

            <div className="two-column-grid">
              <div className="left-column">
                <div className="features-section">
                  <h3 className="section-title">In this FREE guide, you'll discover:</h3>
                  <ul className="features-list">
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">20 most common mistakes for beginners</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Video lessons on how to avoid them</span>
                    </li>
                    <li className="feature-item">
                      <span className="bullet">•</span>
                      <span className="feature-text">Spanish practice exercises</span>
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
                    src= {mistakesImage}
                    alt="20 Common Mistakes"
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
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default MistakesPage
