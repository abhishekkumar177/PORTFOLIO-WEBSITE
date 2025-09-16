import React from 'react';
import DomeGallery from './components/DomeGallery';
import CircularGallery from './components/CircularGallery';
import './index.css';

// Importing images for the new gallery
import art1 from './img/1.jpg';
import art2 from './img/2.jpg';
import art3 from './img/3.jpg';
import art4 from './img/4.jpg';
import art5 from './img/5.jpg';
import art6 from './img/6.jpg';

const galleryItems = [
  {
    image: art1,
    text: "Forest Fire Detection\nProject Link"
  },
  {
    image: art2,
    text: "Database Design Basics\nProject Link"
  },
  {
    image: art3,
    text: "AI RAG Chatbot\nProject Link"
  },
  {
    image: art4,
    text: "Leaping into Action\nProject Link"
  },
  {
    image: art5,
    text: "Into the Spider-Verse\nProject Link"
  },
  {
    image: art6,
    text: "A Colorful World\nProject Link"
  }
];

// This component contains all the portfolio content from the HTML file
const Portfolio = () => {
  return (
    <>
      {/* Header and hero content */}
      <section id="entry-experience" className="hero-section">
        <div className="hero-content">
          <div className="hero-avatar">
            <img src="./src/img/Profile.jpg" alt="Student Avatar" />
          </div>
          <h1 className="tagline">Hey Student! Glad you swung by.</h1>
          <p className="subline">Here’s how my portfolio can inspire your learning journey.</p>
          <div className="hero-video">
            <video src="./vid/Hero.mp4" autoPlay loop muted></video>
          </div>
        </div>
      </section>

      {/* The interactive Dome Gallery placed in the middle */}
      <div style={{ height: '120vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
        <DomeGallery grayscale={false} />
      </div>

      {/* Content below the Dome Gallery */}
      <section id="dialogue-bubbles" className="grid-section">
        <div className="dialogue-bubble">
          <p>Looking for inspiration in projects?</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/project-inspiration"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="dialogue-bubble">
          <p>I share my journey, notes, and real-world projects.</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/student-journey"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="dialogue-bubble">
          <p>From coding basics to advanced AI — find something useful here.</p>
          <div className="video-container-small">
            <iframe
              src="https://www.youtube.com/embed/ai-basics"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* The original carousel-section is replaced with the CircularGallery */}
      <section id="student-features" className="carousel-section">
        <h2>Projects</h2>
        <div style={{ height: '100vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
          <CircularGallery items={galleryItems} textColor="#fff" />
        </div>

        <div className="resources">
          <h2>Study Resources</h2>
          <ul>
            <li><a href="#">GitHub Repos</a></li>
            <li><a href="#">Notes Blog</a></li>
            <li><a href="#">Cheat Sheets</a></li>
          </ul>
          <div className="resource-video">
            <iframe
              src="https://www.youtube.com/embed/resources-overview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <section id="call-to-action" className="centered-section">
        <h2 className="cta-text">Want to learn together? Let’s connect and grow.</h2>
        <a href="#" id="cta-button" className="cta-button">Join Study Circle</a>
        <div className="cta-video">
          <iframe
            src="https://www.youtube.com/embed/call-to-action-intro"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <footer id="student-footer" className="minimal-footer">
        <p className="footer-quote">Knowledge shared = Knowledge multiplied 🚀</p>
        <div className="footer-icons">
          <span className="icon">📚</span>
          <span className="icon">💻</span>
          <span className="icon">💡</span>
        </div>
        <div className="footer-video">
          <iframe
            src="https://www.youtube.com/embed/final-message"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </footer>
    </>
  );
};

export default function App() {
  return (
    <>
      {/* Background video layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden', zIndex: -1 }}>
        <video autoPlay muted loop style={{ minWidth: '100%', minHeight: '100%', width: 'auto', height: 'auto', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <source src="./src/vid/Background.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Main portfolio content layer */}
      <div id="portfolio-container" style={{ position: 'relative', zIndex: 1}}>
        <Portfolio />
      </div>
    </>
  );
}