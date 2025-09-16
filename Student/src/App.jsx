import React, { useState } from 'react';
import DomeGallery from './components/DomeGallery';
import CircularGallery from './components/CircularGallery';
import ProfileCard from './components/ProfileCard';
import './index.css';

// Importing images for the new gallery
import art1 from './img/1.jpg';
import art2 from './img/2.jpg';
import art3 from './img/3.jpg';
import art4 from './img/4.jpg';
import art5 from './img/5.jpg';
import art6 from './img/6.jpg';

import profileImage from './img/Profile.jpg';

const galleryItems = [
  {
    image: art1,
    title: "Forest Fire Detection",
    description: "AI + Satellite Data system",
    link: "https://www.youtube.com/embed/forest-fire-demo"
  },
  {
    image: art2,
    title: "Database Design Basics",
    description: "SQL + ER modeling explained",
    link: "https://www.youtube.com/embed/sql-basics"
  },
  {
    image: art3,
    title: "AI RAG Chatbot",
    description: "Context-aware chatbot project",
    link: "https://www.youtube.com/embed/rag-chatbot-demo"
  },
  {
    image: art4,
    title: "Project Alpha",
    description: "A fun personal project.",
    link: "https://www.youtube.com/embed/project-alpha-demo"
  },
  {
    image: art5,
    title: "Project Beta",
    description: "A showcase of a new technology.",
    link: "https://www.youtube.com/embed/project-beta-demo"
  },
  {
    image: art6,
    title: "Project Gamma",
    description: "A colorful world.",
    link: "https://www.youtube.com/embed/project-gamma-demo"
  }
];

const InfoModal = ({ item, onClose }) => {
  if (!item) return null;
  return (
    <div className="info-modal-overlay">
      <div className="info-modal-content">
        <button className="info-modal-close" onClick={onClose}>&times;</button>
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <div className="info-modal-video">
          <iframe
            src={item.link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [modalItem, setModalItem] = useState(null);

  const handleItemClick = (item) => {
    setModalItem(item);
  };

  return (
    <>
      {/* Header and hero content */}
      <section id="entry-experience" className="hero-section">
        <div className="hero-content">
          <ProfileCard image={profileImage} handle="@abhishek.dev" status="Student" />
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
          <CircularGallery items={galleryItems} onItemClick={handleItemClick} />
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
      <InfoModal item={modalItem} onClose={() => setModalItem(null)} />
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