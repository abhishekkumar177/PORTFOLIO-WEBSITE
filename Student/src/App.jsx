import React, { useState, useEffect } from 'react';
import DomeGallery from './components/DomeGallery';
import CircularGallery from './components/CircularGallery';
import RollingGallery from './components/RollingGallery';
import ProfileCard from './components/ProfileCard';
import FlowingMenu from './components/FlowingMenu'; // Correct import for FlowingMenu
import './index.css';
import './components/InfoModal.css';

// Importing images for the new gallery
import art1 from './img/1.jpg';
import art2 from './img/2.jpg';
import art3 from './img/3.jpg';
import art4 from './img/4.jpg';
import art5 from './img/5.jpg';
import art6 from './img/6.jpg';

// Importing images for the FlowingMenu
import flowingImg1 from './img/1.png';
import flowingImg2 from './img/2.png';
import flowingImg3 from './img/3.png';

import profileImage from './img/Hero.png';

// Data for the FlowingMenu component
const flowingMenuItems = [
    {
        link: "#",
        text: "GitHub Repos",
        image: flowingImg1
    },
    {
        link: "#",
        text: "Notes Blog",
        image: flowingImg2
    },
    {
        link: "#",
        text: "Cheat Sheets",
        image: flowingImg3
    }
];

const initialGalleryItems = [
  {
    image: art1,
    title: "Forest Fire Detection",
    description: "AI + Satellite Data system",
    tags: ["Python", "TensorFlow", "Keras"],
    link: "https://www.youtube.com/embed/forest-fire-demo"
  },
  {
    image: art2,
    title: "Database Design Basics",
    description: "SQL + ER modeling explained",
    tags: ["SQL", "Schema", "Modeling"],
    link: "https://github.com/abhishekkumar177/Database_Design_MuseumDB"
  },
  {
    image: art3,
    title: "AI RAG Chatbot",
    description: "Context-aware chatbot project",
    tags: ["LangChain", "OpenAI API", "Flask"],
    link: "https://www.youtube.com/embed/rag-chatbot-demo"
  },
  {
    image: art4,
    title: "Image Generation",
    description: "Creating visuals with AI",
    tags: ["Stable Diffusion", "Midjourney", "DALL-E"],
    link: "https://www.youtube.com/embed/image-gen-demo"
  },
  {
    image: art5,
    title: "Web Development",
    description: "Building responsive websites",
    tags: ["React", "Node.js", "CSS"],
    link: "https://www.youtube.com/embed/web-dev-demo"
  },
  {
    image: art6,
    title: "Data Analysis",
    description: "Insights from complex datasets",
    tags: ["Pandas", "Matplotlib", "Python"],
    link: "https://www.youtube.com/embed/data-analysis-demo"
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
        {item.tags && (
          <div className="info-modal-tags">
            {item.tags.map((tag, index) => (
              <span key={index} className="info-modal-tag">{tag}</span>
            ))}
          </div>
        )}
        <div className="info-modal-video">
          <iframe
            src={item.link}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.title}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [modalItem, setModalItem] = useState(null);
  
  // The gallery items are now passed directly without the useEffect hook
  const galleryItems = initialGalleryItems;

  const handleItemClick = (item) => {
    setModalItem(item);
  };
  
  return (
    <>
      {/* Header and hero content */}
      <section id="entry-experience" className="hero-section">
        <div className="hero-content">
          <ProfileCard image={profileImage} handle="@abhishek.dev" status="Student" />
          <h1 filter="invert(1)" style={{ color: 'white' }} className="tagline">Hey Student! Glad you swung by.</h1>
          <h2 className="subtagline">I’m Abhishek, a fellow learner sharing my coding journey.✨ To a Student: Here’s how my portfolio can inspire your learning journey ✨

📚 Learn by Example – Explore real projects that show how ideas transform into solutions.

🛠 Hands-on Inspiration – See tools, workflows, and experiments you can try yourself.

🚀 Growth Mindset – Understand that progress is built step by step, failure is feedback.

🌐 Community & Collaboration – Discover how sharing knowledge helps everyone grow.

🎯 Practical Guidance – Gain insights into skills, resources, and strategies for your journey.</h2>
        </div>
      </section>

      <h1 style={{ textAlign: 'center' }}>Dynamic World</h1>
      
      {/* The interactive Dome Gallery placed in the middle */}
      <div style={{ height: '120vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
        <DomeGallery grayscale={false} />
      </div>

      {/* Replaced the old section with the Rolling Gallery */}
      <section id="works-experience-section" className="rolling-gallery-section">
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Works & Experience :</h1>
        <RollingGallery />
      </section>

      {/* The Projects section with CircularGallery */}
      <section id="student-features" className="carousel-section">
        <h1>Projects</h1>
        <div style={{ height: '100vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
          {/* Pass the correct item data and the click handler */}
          {galleryItems.length > 0 && <CircularGallery items={galleryItems} onItemClick={handleItemClick} />}
        </div>
        
        {/* The Study Resources section with FlowingMenu */}
        <section className="flowing-menu-section">
          <h1 style={{ textAlign: 'center', margin: '40px 0 20px' }}>Study Resources</h1>
          <div style={{ height: '50vh' }}>
            <FlowingMenu items={flowingMenuItems} />
          </div>
        </section>
      </section>

      <section id="call-to-action" className="centered-section">
        <h2 className="cta-text">Want to learn together? Let’s connect and grow.</h2>
        <a href="#" id="cta-button" className="cta-button">Join Study Circle</a>
        <div className="cta-video">
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