import React, { useState, useEffect } from 'react';
import DomeGallery from './components/DomeGallery';
import CircularGallery from './components/CircularGallery';
import ProfileCard from './components/ProfileCard';
import './index.css';
import './components/InfoModal.css'; // Import the InfoModal CSS

// Importing images for the new gallery
import art1 from './img/1.jpg';
import art2 from './img/2.jpg';
import art3 from './img/3.jpg';
import art4 from './img/4.jpg';
import art5 from './img/5.jpg';
import art6 from './img/6.jpg';

import profileImage from './img/Profile.jpg';

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
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const generateTextTextures = async () => {
      const texturedItems = await Promise.all(
        initialGalleryItems.map(async (item) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const padding = 20; // Padding around the text

          // Measure text to determine canvas size
          ctx.font = 'bold 36px Arial';
          const titleMetrics = ctx.measureText(item.title);
          let maxWidth = titleMetrics.width;

          ctx.font = '24px Arial';
          const descriptionMetrics = ctx.measureText(item.description);
          maxWidth = Math.max(maxWidth, descriptionMetrics.width);

          ctx.font = '20px Arial';
          const tagsText = item.tags ? item.tags.join('   ') : '';
          const tagsMetrics = ctx.measureText(tagsText);
          maxWidth = Math.max(maxWidth, tagsMetrics.width);

          // Set canvas dimensions
          canvas.width = maxWidth + padding * 2;
          canvas.height = 180; // Fixed height to ensure enough space for text

          // Apply background gradient
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Add border to the canvas (optional, matching card border)
          ctx.strokeStyle = 'rgba(0, 114, 255, 0.8)'; // Blueish border
          ctx.lineWidth = 4;
          ctx.strokeRect(0, 0, canvas.width, canvas.height);


          ctx.fillStyle = '#FFFFFF'; // White text
          ctx.textAlign = 'left';

          let yPos = padding + 36; // Initial Y position for title

          // Draw Title
          ctx.font = 'bold 36px Arial';
          ctx.fillText(item.title, padding, yPos);
          yPos += 30; // Line height for title

          // Draw Description
          ctx.font = '24px Arial';
          ctx.fillText(item.description, padding, yPos);
          yPos += 30; // Line height for description

          // Draw Tags
          if (item.tags && item.tags.length > 0) {
            ctx.font = '20px Arial';
            ctx.fillStyle = '#BBBBBB'; // Slightly lighter color for tags
            ctx.fillText(tagsText, padding, yPos);
          }

          return { ...item, textCanvas: canvas };
        })
      );
      setGalleryItems(texturedItems);
    };

    generateTextTextures();
  }, []); // Run once on component mount

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
          <h2 className="subtagline">I’m Abhishek, a fellow learner sharing my coding journey.✨ To a Student: Here’s how my portfolio can inspire your learning journey ✨

📚 Learn by Example – Explore real projects that show how ideas transform into solutions.

🛠 Hands-on Inspiration – See tools, workflows, and experiments you can try yourself.

🚀 Growth Mindset – Understand that progress is built step by step, failure is feedback.

🌐 Community & Collaboration – Discover how sharing knowledge helps everyone grow.

🎯 Practical Guidance – Gain insights into skills, resources, and strategies for your journey.</h2>
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
              title="Project Inspiration"
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
              title="Student Journey"
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
              title="AI Basics"
            ></iframe>
          </div>
        </div>
      </section>

      {/* The Projects section with CircularGallery */}
      <section id="student-features" className="carousel-section">
        <h1>Projects</h1>
        <div style={{ height: '100vh', width: '100%', padding: '20px 0', overflow: 'hidden' }}>
          {galleryItems.length > 0 && <CircularGallery items={galleryItems} onItemClick={handleItemClick} />}
        </div>

        <div className="resources">
          <h1>Study Resources</h1>
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
              title="Resources Overview"
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
            title="Call to Action Intro"
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
            title="Final Message"
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