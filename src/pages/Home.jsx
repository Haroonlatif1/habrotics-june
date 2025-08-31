import React, { useState, useEffect } from 'react';

const HabroticsAI = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [animatedElements, setAnimatedElements] = useState(new Set());
  const [showContactForm, setShowContactForm] = useState(false);
  const [showConsultationForm, setShowConsultationForm] = useState(false);
  const [consultationResult, setConsultationResult] = useState("");

  useEffect(() => {
    // Smooth scrolling for navigation links
    const handleClick = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
        }
        // Close mobile menu after navigation
        setMobileMenuOpen(false);
      }
    };

    // Navbar scroll effect
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      // Scroll animations
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          const elementId = element.getAttribute('data-animate-id');
          if (elementId && !animatedElements.has(elementId)) {
            setAnimatedElements(prev => new Set([...prev, elementId]));
            element.classList.add('animated');
          }
        }
      });
    };

    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSurprise = () => {
    setShowSurprise(!showSurprise);
  };

  const openFooterModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeFooterModal = () => {
    setActiveModal(null);
  };

  const openContactInfo = () => {
    setShowContactForm(true);
  };

  const closeContactInfo = () => {
    setShowContactForm(false);
  };

  const openConsultationForm = () => {
    setShowConsultationForm(true);
  };

  const closeConsultationForm = () => {
    setShowConsultationForm(false);
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setConsultationResult("Sending....");
    
            const formData = new FormData(e.target);
        formData.append("access_key", import.meta.env.VITE_WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setConsultationResult("Form Submitted Successfully! We will contact you soon.");
        e.target.reset();
        setTimeout(() => {
          closeConsultationForm();
          setConsultationResult("");
        }, 3000);
      } else {
        console.log("Error", data);
        setConsultationResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setConsultationResult("Network error. Please check your connection and try again.");
    }
  };

  const footerModalData = {
    solutions: {
      title: "AI Solutions",
      content: {
        "AI-Powered Robotics": {
          description: "Advanced robotic systems with artificial intelligence for industrial automation, healthcare assistance, and smart manufacturing.",
          features: ["Autonomous navigation", "Machine learning integration", "Real-time decision making", "Human-robot collaboration", "Predictive maintenance"]
        },
        "Industrial Automation": {
          description: "Comprehensive automation solutions that streamline manufacturing processes and increase operational efficiency.",
          features: ["Process optimization", "Quality control systems", "Supply chain automation", "IoT integration", "Performance analytics"]
        },
        "Predictive Analytics": {
          description: "Data-driven insights and forecasting capabilities to optimize business decisions and prevent issues before they occur.",
          features: ["Pattern recognition", "Risk assessment", "Trend forecasting", "Anomaly detection", "Performance optimization"]
        },
        "Computer Vision": {
          description: "Advanced visual recognition systems for quality control, security, and automated inspection processes.",
          features: ["Object detection", "Image classification", "Facial recognition", "Quality inspection", "Real-time monitoring"]
        },
        "Process Automation": {
          description: "End-to-end automation solutions that eliminate manual tasks and improve workflow efficiency.",
          features: ["Workflow automation", "Document processing", "Data extraction", "Task scheduling", "Integration capabilities"]
        }
      }
    },
    industries: {
      title: "Industries We Serve",
      content: {
        "Manufacturing": {
          description: "Revolutionizing production with intelligent automation, predictive maintenance, and quality control systems.",
          features: ["Smart factory solutions", "Predictive maintenance", "Quality assurance", "Supply chain optimization", "Energy efficiency"]
        },
        "Healthcare": {
          description: "Transforming patient care with AI-powered diagnostics, robotic surgery, and healthcare management systems.",
          features: ["Medical imaging analysis", "Diagnostic assistance", "Patient monitoring", "Drug discovery", "Healthcare automation"]
        },
        "Automotive": {
          description: "Driving innovation in autonomous vehicles, smart manufacturing, and connected car technologies.",
          features: ["Autonomous driving", "Manufacturing automation", "Predictive maintenance", "Connected vehicles", "Safety systems"]
        },
        "Smart Cities": {
          description: "Building intelligent urban infrastructure with IoT integration and sustainable resource management.",
          features: ["Traffic optimization", "Energy management", "Public safety", "Environmental monitoring", "Infrastructure management"]
        },
        "Agriculture": {
          description: "Revolutionizing farming with precision agriculture, crop monitoring, and automated harvesting systems.",
          features: ["Precision farming", "Crop monitoring", "Automated harvesting", "Weather prediction", "Resource optimization"]
        }
      }
    },
    resources: {
      title: "Resources & Documentation",
      content: {
        "Case Studies": {
          description: "Real-world examples of how our AI solutions have transformed businesses across various industries.",
          features: ["Success stories", "ROI analysis", "Implementation details", "Technical specifications", "Client testimonials"]
        },
        "White Papers": {
          description: "In-depth technical documentation and research papers on AI technologies and industry applications.",
          features: ["Technical insights", "Industry analysis", "Best practices", "Implementation guides", "Research findings"]
        },
        "Webinars": {
          description: "Educational sessions and demonstrations of our latest AI technologies and solutions.",
          features: ["Live demonstrations", "Expert presentations", "Q&A sessions", "Product updates", "Industry insights"]
        },
        "Documentation": {
          description: "Comprehensive technical documentation for developers and technical teams implementing our solutions.",
          features: ["API documentation", "Integration guides", "User manuals", "Troubleshooting", "Code examples"]
        },
        "API Reference": {
          description: "Complete API documentation with endpoints, parameters, and integration examples.",
          features: ["RESTful APIs", "SDK documentation", "Authentication", "Rate limiting", "Error handling"]
        }
      }
    },
    company: {
      title: "About Our Company",
      content: {
        "About Us": {
          description: "Learn about our mission, values, and commitment to advancing AI technology for a better future.",
          features: ["Company history", "Mission & vision", "Core values", "Leadership team", "Global presence"]
        },
        "Careers": {
          description: "Join our team of AI experts and innovators working on cutting-edge technology solutions.",
          features: ["Open positions", "Company culture", "Benefits & perks", "Career growth", "Application process"]
        },
        "Partnerships": {
          description: "Strategic partnerships with leading technology companies and industry leaders worldwide.",
          features: ["Technology partners", "Industry alliances", "Channel partners", "Integration partners", "Certification programs"]
        },
        "News & Events": {
          description: "Stay updated with the latest news, product launches, and industry events featuring our solutions.",
          features: ["Press releases", "Product announcements", "Industry events", "Awards & recognition", "Media coverage"]
        },
        "Contact": {
          description: "Get in touch with our team for consultations, support, or partnership opportunities.",
          features: ["Sales inquiries", "Technical support", "Partnership opportunities", "General inquiries", "Office locations"]
        }
      }
    },
    legal: {
      title: "Legal & Compliance",
      content: {
        "Privacy Policy": {
          description: "Our commitment to protecting your privacy and handling your data responsibly and securely.",
          features: ["Data collection", "Data usage", "Data protection", "User rights", "Contact information"]
        },
        "Terms of Service": {
          description: "Terms and conditions governing the use of our services and products.",
          features: ["Service terms", "User obligations", "Intellectual property", "Limitation of liability", "Dispute resolution"]
        },
        "Cookie Policy": {
          description: "Information about how we use cookies and similar technologies on our website.",
          features: ["Cookie types", "Usage purposes", "Opt-out options", "Third-party cookies", "Cookie management"]
        },
        "Security": {
          description: "Our comprehensive security measures to protect your data and ensure system integrity.",
          features: ["Data encryption", "Access controls", "Security audits", "Incident response", "Compliance standards"]
        },
        "Accessibility": {
          description: "Our commitment to making our products and services accessible to all users.",
          features: ["WCAG compliance", "Screen reader support", "Keyboard navigation", "Color contrast", "Assistive technologies"]
        }
      }
    }
  };

  const tabData = [
    {
      icon: 'fas fa-robot',
      title: 'AI-Powered Robotics',
      content: {
        title: 'AI-Powered Robotics',
        description: 'Autonomous robotic systems for industrial automation, healthcare, and smart cities. Our solutions leverage advanced machine learning to create adaptable, intelligent robotic systems that work seamlessly alongside human operators.',
        features: [
          'Machine learning integration with real-time adaptation',
          'Real-time decision making with 99.9% accuracy',
          'Adaptive learning algorithms that improve over time',
          'Safe human-robot collaboration protocols',
          'Predictive maintenance reducing downtime by 40%'
        ],
        image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
      }
    },
    {
      icon: 'fas fa-cogs',
      title: 'Industrial Automation',
      content: {
        title: 'Industrial Automation',
        description: 'Comprehensive automation solutions for manufacturing and industrial processes. Streamline operations with intelligent systems that adapt and optimize performance while reducing costs and improving safety standards.',
        features: [
          'Process optimization increasing efficiency by 35%',
          'AI-powered quality control systems',
          'Predictive maintenance scheduling',
          'End-to-end supply chain automation',
          'Real-time monitoring with IoT integration'
        ],
        image: 'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
      }
    },
    {
      icon: 'fas fa-brain',
      title: 'AI Software Solutions',
      content: {
        title: 'AI Software Solutions',
        description: 'Custom AI software development for businesses looking to integrate intelligence into their operations. From intelligent chatbots to recommendation systems, we create tailored solutions that drive business growth.',
        features: [
          'Custom AI development for specific business needs',
          'Advanced natural language processing',
          'Intelligent recommendation engines',
          'Multi-lingual chatbots with sentiment analysis',
          'Comprehensive data analytics platforms'
        ],
        image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
      }
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Data Intelligence',
      content: {
        title: 'Data Intelligence',
        description: 'Transform raw data into actionable insights with our advanced analytics and business intelligence solutions powered by artificial intelligence. Make data-driven decisions with confidence.',
        features: [
          'Predictive analytics with 95% accuracy',
          'Real-time business intelligence dashboards',
          'Interactive data visualization tools',
          'Automated insights generation',
          'Custom reporting and alert systems'
        ],
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80'
      }
    }
  ];

  return (
    <div style={{ 
      backgroundColor: '#020617',
      color: '#F8FAFC',
      fontFamily: "'Poppins', sans-serif",
      overflowX: 'hidden',
      lineHeight: '1.6'
    }} role="main" itemScope itemType="https://schema.org/WebPage">
      
      {/* Schema.org BreadcrumbList */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://habrotics.com"
          }
        ]
      })}
      </script>
      
      {/* FAQ Schema */}
      <script type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What AI solutions does HABROTICS SOLUTIONS offer in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "HABROTICS SOLUTIONS, based in Lahore, Pakistan, offers comprehensive AI solutions including machine learning, automation, digital transformation, business intelligence, data analytics, and custom AI development for various industries across Pakistan and beyond."
            }
          },
          {
            "@type": "Question",
            "name": "Which industries does HABROTICS SOLUTIONS serve in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve multiple industries in Pakistan including manufacturing, healthcare, automotive, smart cities, agriculture, finance, retail, and logistics with tailored AI solutions designed for the Pakistani market."
            }
          },
          {
            "@type": "Question",
            "name": "How can I get started with HABROTICS SOLUTIONS in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You can get started by contacting us at +92 324 8423974 or emailing contact@habrotics.com. We offer free initial consultations to understand your needs and provide customized AI solutions for your business in Pakistan."
            }
          },
          {
            "@type": "Question",
            "name": "Where is HABROTICS SOLUTIONS located in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "HABROTICS SOLUTIONS is located in Lahore, Punjab, Pakistan. We serve clients across Pakistan and internationally, providing cutting-edge AI solutions and technology consulting services."
            }
          }
        ]
      })}
      </script>
      <style>{`
        :root {
          --primary: #4F46E5;
          --primary-dark: #3730A3;
          --secondary: #8B5CF6;
          --accent: #06B6D4;
          --dark: #0F172A;
          --darker: #020617;
          --light: #F8FAFC;
          --gray: #94A3B8;
          --gradient: linear-gradient(135deg, var(--primary), var(--secondary));
          --card-bg: rgba(15, 23, 42, 0.7);
          --card-border: rgba(148, 163, 184, 0.2);
          --glow: 0 0 20px rgba(79, 70, 229, 0.3);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        h1, h2, h3, h4, h5 {
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .btn {
          padding: 14px 32px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          text-decoration: none;
          display: inline-block;
          text-align: center;
        }

        .btn-primary {
          background: var(--gradient);
          color: white;
          box-shadow: var(--glow);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(79, 70, 229, 0.4);
        }

        .btn-secondary {
          background: transparent;
          color: var(--light);
          border: 2px solid var(--primary);
        }

        .btn-secondary:hover {
          background: rgba(79, 70, 229, 0.1);
        }

        .section {
          padding: 100px 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .section-header h2 {
          font-size: 2.8rem;
          margin-bottom: 20px;
        }

        .section-header h2 span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-header p {
          font-size: 1.2rem;
          color: var(--gray);
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 5%;
          z-index: 1000;
          background: rgba(2, 6, 23, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          min-height: 70px;
        }

        .navbar.scrolled {
          background: rgba(2, 6, 23, 0.98);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }

        .logo {
          font-size: 1.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          z-index: 1001;
          gap: 10px;
          height: 100%;
        }

        .logo img {
          height: 70px;
          width: auto;
          object-fit: contain;
          max-height: 100%;
        }

        .logo span {
          color: var(--accent);
        }

        .nav-links {
          display: flex;
          gap: 25px;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-links a {
          color: var(--gray);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 0;
          white-space: nowrap;
        }

        .nav-links a:hover {
          color: var(--light);
        }

        .nav-links a:hover:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 100%;
          height: 2px;
          background: var(--gradient);
          border-radius: 2px;
        }

        .nav-links .btn {
          padding: 10px 20px;
          font-size: 0.95rem;
          white-space: nowrap;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: var(--light);
          font-size: 1.5rem;
          cursor: pointer;
          z-index: 1001;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin-left: 15px;
        }

        .mobile-menu-btn:hover {
          background: rgba(79, 70, 229, 0.1);
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          right: -100%;
          width: 100%;
          max-width: 320px;
          height: 100vh;
          background: rgba(2, 6, 23, 0.98);
          backdrop-filter: blur(20px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 25px;
          transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-left: 1px solid rgba(255, 255, 255, 0.1);
          z-index: 999;
          padding: 20px;
        }

        .mobile-menu.open {
          right: 0;
        }

        .mobile-menu a {
          color: var(--gray);
          text-decoration: none;
          font-weight: 500;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          padding: 12px 25px;
          border-radius: 8px;
          width: 100%;
          text-align: center;
          white-space: nowrap;
        }

        .mobile-menu a:hover {
          color: var(--light);
          background: rgba(79, 70, 229, 0.1);
          transform: translateX(10px);
        }

        .mobile-menu .btn {
          margin-top: 10px;
          padding: 12px 25px;
          font-size: 1rem;
          font-weight: 600;
          color: white;
        }

        .mobile-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.7);
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 998;
        }

        .mobile-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        /* Hero Section */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding-top: 100px;
          background: 
            linear-gradient(135deg, rgba(2, 6, 23, 0.9), rgba(15, 23, 42, 0.8)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><radialGradient id="grad1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%234F46E5;stop-opacity:0.1" /><stop offset="100%" style="stop-color:transparent" /></radialGradient><pattern id="circuit" patternUnits="userSpaceOnUse" width="100" height="100"><circle cx="50" cy="50" r="2" fill="%234F46E5" opacity="0.3"/><line x1="50" y1="50" x2="100" y2="50" stroke="%234F46E5" stroke-width="0.5" opacity="0.2"/><line x1="50" y1="50" x2="50" y2="100" stroke="%234F46E5" stroke-width="0.5" opacity="0.2"/><line x1="20" y1="20" x2="80" y2="80" stroke="%238B5CF6" stroke-width="0.3" opacity="0.15"/></pattern></defs><rect width="100%" height="100%" fill="url(%23circuit)"/><circle cx="200" cy="200" r="100" fill="url(%23grad1)"/><circle cx="800" cy="300" r="150" fill="url(%23grad1)"/><circle cx="300" cy="700" r="120" fill="url(%23grad1)"/></svg>');
          background-size: cover, 100% 100%;
          background-position: center, center;
          background-attachment: fixed;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 40% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 60%);
          z-index: 0;
        }

        .hero-content {
          display: flex;
          align-items: center;
          gap: 60px;
          position: relative;
          z-index: 1;
        }

        .hero-text {
          flex: 1;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 24px;
          line-height: 1.2;
        }

        .hero p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: var(--gray);
          max-width: 600px;
          line-height: 1.7;
        }

        .hero-cta {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .hero-visual {
          flex: 1;
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .robot-container {
          position: relative;
          width: 100%;
          height: 100%;
          max-width: 400px;
          margin: 0 auto;
        }

        .robot-arm {
          position: absolute;
          background: linear-gradient(45deg, var(--primary), var(--secondary));
          width: 8px;
          border-radius: 10px;
          transform-origin: top center;
          animation: arm-move 4s ease-in-out infinite;
          box-shadow: 0 0 10px rgba(79, 70, 229, 0.4);
        }

        .arm-1 {
          height: 150px;
          top: 35%;
          left: 35%;
          animation-delay: 0s;
        }

        .arm-2 {
          height: 120px;
          top: 40%;
          left: 65%;
          animation-delay: 0.5s;
        }

        .robot-body {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 50px rgba(79, 70, 229, 0.5);
          animation: body-glow 3s ease-in-out infinite;
        }

        .robot-face {
          width: 120px;
          height: 120px;
          background: var(--darker);
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          border: 2px solid rgba(6, 182, 212, 0.3);
        }

        .robot-eye {
          position: absolute;
          width: 30px;
          height: 30px;
          background: var(--accent);
          border-radius: 50%;
          top: 40px;
          box-shadow: 0 0 15px var(--accent);
          animation: eye-glow 2s ease-in-out infinite;
        }

        .eye-left {
          left: 25px;
        }

        .eye-right {
          right: 25px;
        }

        .robot-mouth {
          position: absolute;
          width: 60px;
          height: 10px;
          background: var(--accent);
          border-radius: 10px;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 8px var(--accent);
        }

        /* About Section */
        .about {
          background: 
            linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.9)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><defs><pattern id="about-pattern" patternUnits="userSpaceOnUse" width="60" height="60"><rect width="60" height="60" fill="none"/><path d="M30,15 Q40,10 50,15 Q55,25 50,35 Q40,40 30,35 Q25,25 30,15" fill="none" stroke="%234F46E5" stroke-width="0.5" opacity="0.1"/><circle cx="15" cy="45" r="2" fill="%236366F1" opacity="0.15"/><circle cx="45" cy="15" r="1.5" fill="%238B5CF6" opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="url(%23about-pattern)"/></svg>');
          background-size: cover, 120px 120px;
          position: relative;
        }

        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .about-text h2 {
          font-size: 2.5rem;
          margin-bottom: 30px;
          color: var(--light);
        }

        .about-text h2 span {
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .about-text p {
          font-size: 1.1rem;
          color: var(--gray);
          margin-bottom: 20px;
          line-height: 1.8;
        }

        .about-features {
          margin-top: 30px;
        }

        .about-features ul {
          list-style: none;
          padding: 0;
        }

        .about-features li {
          padding: 10px 0;
          color: var(--gray);
          position: relative;
          padding-left: 30px;
        }

        .about-features li:before {
          content: "🚀";
          position: absolute;
          left: 0;
          top: 10px;
        }

        .about-visual {
          position: relative;
          height: 400px;
          background: var(--card-bg);
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid var(--card-border);
        }

        .about-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .stats {
          background: 
            linear-gradient(135deg, var(--dark), var(--darker)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse"><path d="M 50 0 L 0 0 0 50" fill="none" stroke="%234F46E5" stroke-width="0.5" opacity="0.1"/><circle cx="25" cy="25" r="1" fill="%236366F1" opacity="0.2"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
          background-size: cover, 100px 100px;
          position: relative;
          overflow: hidden;
        }

        .stats::after {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 800px;
          height: 800px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: stats-float 20s ease-in-out infinite;
          z-index: 0;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 1;
        }

        .stat-card {
          text-align: center;
          padding: 50px 30px;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6));
          border-radius: 20px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.2);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.1), transparent);
          transition: left 0.6s ease;
        }

        .stat-card:hover::before {
          left: 100%;
        }

        .stat-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: var(--primary);
          box-shadow: 0 20px 40px rgba(79, 70, 229, 0.3);
        }

        .stat-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: block;
        }

        .stat-value {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 15px;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          z-index: 1;
        }

        .stat-label {
          font-size: 1.2rem;
          color: var(--gray);
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        .stat-description {
          font-size: 0.95rem;
          color: var(--gray);
          margin-top: 10px;
          opacity: 0.8;
          position: relative;
          z-index: 1;
        }

        /* Services Section */
        .services-tabs {
          max-width: 1200px;
          margin: 0 auto;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: var(--glow);
          position: relative;
        }

        .services-tabs::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><pattern id="tech-pattern" patternUnits="userSpaceOnUse" width="40" height="40"><rect width="40" height="40" fill="none"/><circle cx="20" cy="20" r="1.5" fill="%234F46E5" opacity="0.15"/><path d="M20,15 L25,20 L20,25 L15,20 Z" fill="none" stroke="%238B5CF6" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23tech-pattern)"/></svg>');
          opacity: 0.3;
          pointer-events: none;
          z-index: 0;
        }

        .tabs-header {
          display: flex;
          background: rgba(15, 23, 42, 0.8);
          border-bottom: 1px solid var(--card-border);
          flex-wrap: wrap;
        }

        .tab-btn {
          flex: 1;
          padding: 20px;
          background: transparent;
          border: none;
          color: var(--gray);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          min-width: 250px;
        }

        .tab-btn:hover, .tab-btn.active {
          color: var(--light);
          background: rgba(79, 70, 229, 0.1);
        }

        .tab-btn.active {
          border-bottom: 3px solid var(--primary);
        }

        .tab-icon {
          font-size: 1.5rem;
        }

        .tabs-content {
          padding: 40px;
          min-height: 400px;
          position: relative;
          z-index: 1;
        }

        .service-details {
          display: flex;
          gap: 40px;
          align-items: center;
        }

        .service-info {
          flex: 1;
        }

        .service-info h3 {
          font-size: 2rem;
          margin-bottom: 20px;
          color: var(--light);
        }

        .service-info p {
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 25px;
          color: var(--gray);
        }

        .service-info ul {
          margin-bottom: 30px;
          padding-left: 20px;
        }

        .service-info li {
          margin-bottom: 10px;
          color: var(--gray);
          position: relative;
        }

        .service-info li:before {
          content: "✓";
          color: var(--accent);
          margin-right: 10px;
        }

        .service-visual {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-image {
          width: 100%;
          max-width: 400px;
          height: auto;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 1px solid var(--card-border);
        }

        /* Technologies Section */
        .technologies {
          background: 
            linear-gradient(135deg, var(--darker), var(--dark)), 
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs><pattern id="brain-pattern" patternUnits="userSpaceOnUse" width="80" height="80"><rect width="80" height="80" fill="none"/><path d="M40,20 Q50,10 60,20 Q70,30 60,40 Q50,50 40,40 Q30,30 40,20" fill="none" stroke="%236366F1" stroke-width="0.8" opacity="0.08"/><circle cx="40" cy="40" r="3" fill="%234F46E5" opacity="0.1"/><line x1="20" y1="60" x2="60" y2="20" stroke="%238B5CF6" stroke-width="0.4" opacity="0.06"/></pattern></defs><rect width="100%" height="100%" fill="url(%23brain-pattern)"/></svg>');
          background-size: cover, 200px 200px;
          position: relative;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 25px;
        }

        .tech-card {
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }

        .tech-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: var(--glow);
        }

        .tech-icon {
          font-size: 3rem;
          margin-bottom: 20px;
          color: var(--accent);
        }

        .tech-card h3 {
          font-size: 1.3rem;
          color: var(--light);
          margin-bottom: 15px;
        }

        .tech-card p {
          color: var(--gray);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Testimonials */
        .testimonials {
          background: 
            var(--dark),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><pattern id="testimonial-pattern" patternUnits="userSpaceOnUse" width="60" height="60"><rect width="60" height="60" fill="none"/><path d="M15,15 Q30,5 45,15 Q35,30 30,30 Q25,30 15,15" fill="%234F46E5" opacity="0.05"/><circle cx="45" cy="45" r="2" fill="%2306B6D4" opacity="0.1"/><path d="M10,50 Q30,40 50,50" fill="none" stroke="%238B5CF6" stroke-width="0.3" opacity="0.08"/></pattern></defs><rect width="100%" height="100%" fill="url(%23testimonial-pattern)"/></svg>');
          background-size: cover, 150px 150px;
          position: relative;
        }

        .testimonials::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 40%, rgba(79, 70, 229, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(139, 92, 246, 0.06) 0%, transparent 50%);
          z-index: 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 30px;
          position: relative;
          z-index: 1;
        }

        .testimonial-card {
          padding: 30px;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          position: relative;
          transition: all 0.3s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          border-color: var(--primary);
          box-shadow: var(--glow);
        }

        .testimonial-content p {
          font-style: italic;
          margin-bottom: 25px;
          position: relative;
          padding-left: 30px;
          line-height: 1.7;
          color: var(--gray);
        }

        .testimonial-content p:before {
          content: """;
          position: absolute;
          top: -20px;
          left: 0;
          font-size: 4rem;
          color: var(--primary);
          opacity: 0.2;
          font-family: serif;
          line-height: 1;
        }

        .client-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .client-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: var(--gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .client-details h4 {
          margin-bottom: 5px;
          color: var(--light);
        }

        .client-details p {
          color: var(--gray);
          font-size: 0.9rem;
        }

        /* Industries Section */
        .industries {
          background: 
            linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(2, 6, 23, 0.9)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"><defs><pattern id="industry-pattern" patternUnits="userSpaceOnUse" width="100" height="100"><rect width="100" height="100" fill="none"/><circle cx="50" cy="50" r="3" fill="%234F46E5" opacity="0.1"/><rect x="40" y="40" width="20" height="20" fill="none" stroke="%236366F1" stroke-width="0.5" opacity="0.08"/><path d="M25,25 L75,75 M75,25 L25,75" stroke="%238B5CF6" stroke-width="0.3" opacity="0.06"/></pattern></defs><rect width="100%" height="100%" fill="url(%23industry-pattern)"/></svg>');
          background-size: cover, 200px 200px;
        }

        .industries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .industry-card {
          padding: 40px 30px;
          background: var(--card-bg);
          backdrop-filter: blur(15px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          text-align: center;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .industry-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 4px;
          background: var(--gradient);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .industry-card:hover::before {
          transform: scaleX(1);
        }

        .industry-card:hover {
          transform: translateY(-15px);
          border-color: var(--primary);
          box-shadow: 0 15px 35px rgba(79, 70, 229, 0.25);
        }

        .industry-icon {
          font-size: 3.5rem;
          margin-bottom: 25px;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .industry-card h3 {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--light);
        }

        .industry-card p {
          color: var(--gray);
          line-height: 1.7;
          margin-bottom: 25px;
        }

        .industry-stats {
          display: flex;
          justify-content: space-around;
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid var(--card-border);
        }

        .industry-stat {
          text-align: center;
        }

        .industry-stat-value {
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent);
          display: block;
        }

        .industry-stat-label {
          font-size: 0.8rem;
          color: var(--gray);
          margin-top: 5px;
        }

        /* CTA Section */
        .cta {
          background: 
            linear-gradient(135deg, var(--primary-dark), var(--darker)),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600"><defs><pattern id="cta-pattern" patternUnits="userSpaceOnUse" width="80" height="80"><rect width="80" height="80" fill="none"/><circle cx="40" cy="40" r="2" fill="%23F8FAFC" opacity="0.1"/><path d="M20,60 Q40,40 60,60" fill="none" stroke="%236366F1" stroke-width="0.5" opacity="0.08"/></pattern></defs><rect width="100%" height="100%" fill="url(%23cta-pattern)"/></svg>');
          background-size: cover, 160px 160px;
          position: relative;
          overflow: hidden;
        }

        .cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
          z-index: 0;
        }

        .cta-container {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cta h2 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: var(--light);
        }

        .cta p {
          font-size: 1.2rem;
          margin-bottom: 40px;
          color: var(--gray);
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.7;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Footer */
        .footer {
          background: 
            var(--darker),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><defs><pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="100" height="50"><rect width="100" height="50" fill="none"/><line x1="0" y1="25" x2="100" y2="25" stroke="%234F46E5" stroke-width="0.3" opacity="0.1"/><circle cx="50" cy="25" r="1" fill="%234F46E5" opacity="0.15"/><circle cx="20" cy="10" r="0.5" fill="%238B5CF6" opacity="0.1"/><circle cx="80" cy="40" r="0.5" fill="%2306B6D4" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23footer-pattern)"/></svg>');
          background-size: cover, 200px 100px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding: 60px 0 30px;
          position: relative;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
        }

        .footer-brand h3 {
          font-size: 1.8rem;
          margin-bottom: 15px;
          background: var(--gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-brand p {
          color: var(--gray);
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-links a:hover {
          background: var(--primary);
          transform: translateY(-5px);
        }

        .footer-links h4 {
          margin-bottom: 20px;
          font-size: 1.2rem;
          color: var(--light);
        }

        .footer-links ul {
          list-style: none;
        }

        .footer-links li {
          margin-bottom: 12px;
        }

        .footer-links a {
          color: var(--gray);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--light);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          padding-top: 20px;
          text-align: center;
          color: var(--gray);
          font-size: 0.9rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        }

        .legal-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .legal-links a {
          color: var(--gray);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .legal-links a:hover {
          color: var(--light);
        }

        /* Animations */
        @keyframes arm-move {
          0%, 100% { transform: rotate(-15deg); }
          50% { transform: rotate(15deg); }
        }

        @keyframes body-glow {
          0%, 100% { 
            box-shadow: 0 0 50px rgba(79, 70, 229, 0.5);
            transform: translate(-50%, -50%) scale(1);
          }
          50% { 
            box-shadow: 0 0 80px rgba(79, 70, 229, 0.7);
            transform: translate(-50%, -50%) scale(1.02);
          }
        }

        @keyframes eye-glow {
          0%, 100% { 
            box-shadow: 0 0 15px var(--accent);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 30px var(--accent);
            transform: scale(1.1);
          }
        }

        @keyframes node-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, 20px) scale(1.1); }
          50% { transform: translate(20px, -20px) scale(0.9); }
          75% { transform: translate(-20px, 10px) scale(1.05); }
        }

        @keyframes connect-glow {
          0%, 100% { 
            box-shadow: 0 0 5px var(--accent);
            opacity: 0.6;
          }
          50% { 
            box-shadow: 0 0 20px var(--accent);
            opacity: 1;
          }
        }

        @keyframes stats-float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-100px, -50px) rotate(120deg); }
          66% { transform: translate(100px, 50px) rotate(240deg); }
        }

        /* Scroll Animation Classes */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease;
        }

        .animate-on-scroll.animated {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-on-scroll.fade-left {
          transform: translateX(-50px);
        }

        .animate-on-scroll.fade-right {
          transform: translateX(50px);
        }

        .animate-on-scroll.fade-up {
          transform: translateY(50px);
        }

        .animate-on-scroll.fade-down {
          transform: translateY(-50px);
        }

        .animate-on-scroll.scale-in {
          transform: scale(0.8);
        }

        .animate-on-scroll.scale-in.animated {
          transform: scale(1);
        }

        .animate-on-scroll.slide-in-left {
          transform: translateX(-100px);
        }

        .animate-on-scroll.slide-in-right {
          transform: translateX(100px);
        }

        .animate-on-scroll.rotate-in {
          transform: rotate(-10deg) scale(0.9);
        }

        .animate-on-scroll.rotate-in.animated {
          transform: rotate(0deg) scale(1);
        }

        /* Staggered animations for multiple elements */
        .animate-on-scroll.stagger-1 { transition-delay: 0.1s; }
        .animate-on-scroll.stagger-2 { transition-delay: 0.2s; }
        .animate-on-scroll.stagger-3 { transition-delay: 0.3s; }
        .animate-on-scroll.stagger-4 { transition-delay: 0.4s; }
        .animate-on-scroll.stagger-5 { transition-delay: 0.5s; }

        /* Contact and Consultation Form Styles */
        .form-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .form-modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .form-modal {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          transform: scale(0.8);
          transition: transform 0.3s ease;
          position: relative;
        }

        .form-modal-overlay.show .form-modal {
          transform: scale(1);
        }

        .form-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--card-border);
        }

        .form-modal-header h2 {
          font-size: 1.8rem;
          color: var(--light);
          margin: 0;
        }

        .form-modal-close {
          background: none;
          border: none;
          color: var(--gray);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .form-modal-close:hover {
          color: var(--light);
          background: rgba(79, 70, 229, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--light);
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 12px 16px;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid var(--card-border);
          border-radius: 8px;
          color: var(--light);
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .form-submit {
          width: 100%;
          padding: 14px 24px;
          background: var(--gradient);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 20px;
        }

        .form-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.3);
        }

        /* Surprise Element */
        .surprise-container {
          position: fixed;
          bottom: 30px;
          right: 30px;
          z-index: 1000;
        }

        .surprise-btn {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
          border: none;
        }

        .surprise-btn:hover {
          transform: scale(1.1) rotate(15deg);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
        }

        .surprise-content {
          position: absolute;
          bottom: 80px;
          right: 0;
          width: 300px;
          background: var(--card-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--card-border);
          border-radius: 16px;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transform: scale(0);
          transform-origin: bottom right;
          transition: transform 0.3s ease;
          opacity: 0;
        }

        .surprise-content.show {
          transform: scale(1);
          opacity: 1;
        }

        /* Footer Modal Styles */
        .footer-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .footer-modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .footer-modal {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid var(--card-border);
          border-radius: 20px;
          padding: 40px;
          max-width: 600px;
          width: 90%;
          max-height: 80vh;
          overflow-y: auto;
          transform: scale(0.8);
          transition: transform 0.3s ease;
          position: relative;
        }

        .footer-modal-overlay.show .footer-modal {
          transform: scale(1);
        }

        .footer-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--card-border);
        }

        .footer-modal-header h2 {
          font-size: 2rem;
          color: var(--light);
          margin: 0;
        }

        .footer-modal-close {
          background: none;
          border: none;
          color: var(--gray);
          font-size: 1.5rem;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .footer-modal-close:hover {
          color: var(--light);
          background: rgba(79, 70, 229, 0.1);
        }

        .footer-modal-content {
          color: var(--gray);
          line-height: 1.7;
        }

        .footer-modal-content h3 {
          color: var(--light);
          margin-bottom: 15px;
          font-size: 1.3rem;
        }

        .footer-modal-content p {
          margin-bottom: 20px;
        }

        .footer-modal-content ul {
          list-style: none;
          padding: 0;
        }

        .footer-modal-content li {
          padding: 8px 0;
          border-bottom: 1px solid rgba(148, 163, 184, 0.1);
        }

        .footer-modal-content li:last-child {
          border-bottom: none;
        }

        .footer-modal-content a {
          color: var(--accent);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-modal-content a:hover {
          color: var(--light);
        }

        .surprise-content h3 {
          margin-bottom: 10px;
          color: var(--light);
        }

        .surprise-content p {
          color: var(--gray);
          margin-bottom: 15px;
          font-size: 0.9rem;
        }

        .surprise-image {
          width: 100%;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .hero-content {
            gap: 40px;
          }
          
          .hero-visual {
            height: 450px;
          }
          
          .robot-container {
            max-width: 350px;
          }
        }

        @media (max-width: 1024px) {
          .hero-content {
            flex-direction: column;
            text-align: center;
            gap: 50px;
          }
          
          .hero-cta {
            justify-content: center;
          }
          
          .service-details {
            flex-direction: column;
            gap: 30px;
          }

          .about-content {
            grid-template-columns: 1fr;
            gap: 40px;
            text-align: center;
          }

          .nav-links {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .hero-visual {
            height: 400px;
            order: -1;
          }

          .robot-container {
            max-width: 320px;
            display: none; /* Remove robot in mobile view */
          }

          .about-visual {
            height: 300px;
          }
        }

        @media (max-width: 900px) {
          .nav-links {
            gap: 20px;
          }

          .nav-links a {
            font-size: 0.9rem;
          }

          .nav-links .btn {
            padding: 8px 16px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            padding: 12px 4%;
          }

          .logo {
            font-size: 1.5rem;
          }

          .logo img {
            height: 65px;
          }
          
          .hero h1 {
            font-size: 2.5rem;
          }
          
          .hero p {
            font-size: 1.1rem;
          }
          
          .hero-cta {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }

          .hero-cta .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .cta-buttons {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }

          .cta-buttons .btn {
            width: 100%;
            max-width: 280px;
          }
          
          .section-header h2 {
            font-size: 2.2rem;
          }

          .section {
            padding: 80px 0;
          }

          .stats-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .stat-card {
            padding: 40px 25px;
          }

          .stat-value {
            font-size: 3rem;
          }

          .hero-visual {
            height: 320px;
          }

          .tabs-header {
            flex-direction: column;
          }

          .tab-btn {
            min-width: 100%;
            border-bottom: 1px solid var(--card-border);
          }

          .tab-btn.active {
            border-bottom: 1px solid var(--primary);
            border-left: 3px solid var(--primary);
          }

          .tabs-content {
            padding: 30px 20px;
          }

          .service-image {
            max-width: 100%;
          }
        }



        @media (max-width: 480px) {
          .container {
            padding: 0 15px;
          }

          .navbar {
            padding: 10px 3%;
          }

          .logo {
            font-size: 1.3rem;
          }

          .logo img {
            height: 50px;
          }

          .mobile-menu-btn {
            padding: 6px;
            font-size: 1.3rem;
          }

          .hero h1 {
            font-size: 2rem;
            line-height: 1.3;
          }
          
          .hero p {
            font-size: 1rem;
          }
          
          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .industries-grid {
            grid-template-columns: 1fr;
          }

          .mobile-menu {
            width: 100%;
            max-width: 100%;
            padding: 15px;
          }

          .mobile-menu a {
            font-size: 1rem;
            padding: 10px 20px;
          }

          .hero-visual {
            height: 280px;
          }

          .section-header h2 {
            font-size: 1.8rem;
          }

          .section-header p {
            font-size: 1rem;
          }

          .stat-card {
            padding: 30px 20px;
          }

          .stat-value {
            font-size: 2.5rem;
          }

          .stat-icon {
            font-size: 2.5rem;
          }

          .tech-card, .testimonial-card, .industry-card {
            padding: 25px 20px;
          }

          .footer-content {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }

          .legal-links {
            flex-direction: column;
            gap: 10px;
          }

          .surprise-container {
            bottom: 20px;
            right: 20px;
          }

          .surprise-btn {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .surprise-content {
            width: 250px;
          }
        }

        /* Fix for hero section button overlap */
        @media (max-width: 1024px) {
          .hero {
            padding-top: 100px;
            padding-bottom: 50px;
          }
          
          .hero-visual {
            margin-bottom: 30px;
          }
        }

        @media (max-width: 768px) {
          .hero {
            padding-top: 120px;
            padding-bottom: 40px;
          }
          
          .hero-content {
            gap: 30px;
          }
        }

        @media (max-width: 480px) {
          .hero {
            padding-top: 100px;
            min-height: auto;
          }
          
          .hero-visual {
            margin-bottom: 20px;
          }
        }
      `}</style>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Orbitron:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Navbar */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="navbar-container">
          <div className="logo">
            <a href="/" aria-label="HABROTICS SOLUTIONS Home">
              <img src="/habrotics-logo.png" alt="HABROTICS SOLUTIONS Logo" />
            </a>
          </div>
          
          <div className="nav-links" role="menubar">
            <a href="#about" role="menuitem">About</a>
            <a href="#solutions" role="menuitem">Solutions</a>
            <a href="#services" role="menuitem">Services</a>
            <a href="#technologies" role="menuitem">Technologies</a>
            <a href="#industries" role="menuitem">Industries</a>
            <a href="#testimonials" role="menuitem">Testimonials</a>
            <a href="#contact" role="menuitem">Contact</a>
            <a href="#contact" className="btn btn-primary" role="menuitem">Get Started</a>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={mobileMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-overlay ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
        ></div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#about">About</a>
          <a href="#solutions">Solutions</a>
          <a href="#services">Services</a>
          <a href="#technologies">Technologies</a>
          <a href="#industries">Industries</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
          <a href="#contact" className="btn btn-primary">Get Started</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" role="banner" aria-labelledby="hero-title">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 id="hero-title">Transforming Industry with Intelligent Robotics</h1>
              <h2 lang="ar" dir="rtl">تحويل الصناعة باستخدام الروبوتات الذكية</h2>
              <p>Pioneering AI-driven automation solutions for the future of manufacturing, healthcare, and smart cities. We combine cutting-edge artificial intelligence with advanced robotics to create solutions that revolutionize how industries operate.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '1rem', marginTop: '15px' }} lang="ar" dir="rtl">نقود مستقبل الذكاء الاصطناعي والروبوتات المتقدمة لتحويل الصناعات وبناء عالم أفضل</p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary" aria-label="Request a demo of our AI solutions">Request Demo</a>
                <a href="#solutions" className="btn btn-secondary" aria-label="Explore our AI solutions and services">Explore Solutions</a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="robot-container">
                <div className="robot-arm arm-1"></div>
                <div className="robot-arm arm-2"></div>
                <div className="robot-body">
                  <div className="robot-face">
                    <div className="robot-eye eye-left"></div>
                    <div className="robot-eye eye-right"></div>
                    <div className="robot-mouth"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section" role="region" aria-labelledby="about-title">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 id="about-title">Leading the Future of <span>AI Innovation</span></h2>
              <p>At HABROTICS SOLUTIONS, we are at the forefront of artificial intelligence and robotics innovation. With over a decade of experience, our team of world-class engineers and researchers develops cutting-edge solutions that transform industries and improve lives.</p>
              <p>Our mission is to bridge the gap between human creativity and machine intelligence, creating systems that enhance human capabilities rather than replace them. We believe in responsible AI development that prioritizes safety, efficiency, and sustainability.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.95rem', marginTop: '20px', textAlign: 'center' }} lang="ar" dir="rtl">نحن في طليعة الابتكار في الذكاء الاصطناعي والروبوتات، ملتزمون ببناء مستقبل تقني مستدام</p>
              <div className="about-features">
                <ul role="list">
                  <li>10+ years of AI and robotics expertise</li>
                  <li>Award-winning research and development team</li>
                  <li>ISO 9001:2015 certified quality management</li>
                  <li>Global partnerships with leading technology companies</li>
                  <li>Commitment to ethical AI and sustainable practices</li>
                </ul>
              </div>
            </div>
            <div className="about-visual">
              <img 
                src="https://images.unsplash.com/photo-1677442135136-760c813a743e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
                alt="AI and Robotics Innovation" 
                className="about-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section">
        <div className="container">
          <div className="stats-container">
            <div className="stat-card animate-on-scroll stagger-1" data-animate-id="stat-1">
              <div className="stat-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <div className="stat-value">500+</div>
              <div className="stat-label">Projects Completed</div>
              <div className="stat-description">Successfully delivered AI solutions across various industries worldwide</div>
              <div style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.8rem', marginTop: '8px' }}>مشروع مكتمل</div>
            </div>
            <div className="stat-card animate-on-scroll stagger-2" data-animate-id="stat-2">
              <div className="stat-icon">
                <i className="fas fa-smile"></i>
              </div>
              <div className="stat-value">99.2%</div>
              <div className="stat-label">Client Satisfaction</div>
              <div className="stat-description">Exceptional service quality and customer experience ratings</div>
              <div style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.8rem', marginTop: '8px' }}>رضا العملاء</div>
            </div>
            <div className="stat-card animate-on-scroll stagger-3" data-animate-id="stat-3">
              <div className="stat-icon">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-value">150+</div>
              <div className="stat-label">Industry Experts</div>
              <div className="stat-description">Skilled professionals dedicated to AI innovation and excellence</div>
              <div style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.8rem', marginTop: '8px' }}>خبير في الصناعة</div>
            </div>
            <div className="stat-card animate-on-scroll stagger-4" data-animate-id="stat-4">
              <div className="stat-icon">
                <i className="fas fa-globe-americas"></i>
              </div>
              <div className="stat-value">25+</div>
              <div className="stat-label">Countries Served</div>
              <div className="stat-description">Global reach with localized AI solutions and support</div>
              <div style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.8rem', marginTop: '8px' }}>دولة نخدمها</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="solutions" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="animate-on-scroll" data-animate-id="services-title">Our <span>AI Solutions</span></h2>
            <p className="animate-on-scroll stagger-1" data-animate-id="services-description">Cutting-edge artificial intelligence services transforming industries through innovation and excellence</p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>حلول الذكاء الاصطناعي المتطورة لتحويل الصناعات</p>
          </div>
          
          <div className="services-tabs">
            <div className="tabs-header">
              {tabData.map((tab, index) => (
                <button 
                  key={index}
                  className={`tab-btn ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <span className="tab-icon"><i className={tab.icon}></i></span>
                  {tab.title}
                </button>
              ))}
            </div>
            
            <div className="tabs-content">
              <div className="service-details">
                <div className="service-info">
                  <h3>{tabData[activeTab].content.title}</h3>
                  <p>{tabData[activeTab].content.description}</p>
                  <ul>
                    {tabData[activeTab].content.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <a href="#contact" className="btn btn-primary">Learn More</a>
                </div>
                <div className="service-visual">
                  <img 
                    src={tabData[activeTab].content.image} 
                    alt={tabData[activeTab].content.title} 
                    className="service-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="technologies section">
        <div className="container">
          <div className="section-header">
            <h2 className="animate-on-scroll" data-animate-id="tech-title">Advanced <span>Technologies</span></h2>
            <p className="animate-on-scroll stagger-1" data-animate-id="tech-description">Harnessing the latest innovations in artificial intelligence and machine learning</p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>استغلال أحدث الابتكارات في الذكاء الاصطناعي والتعلم الآلي</p>
          </div>
          
          <div className="tech-grid">
            <div className="tech-card animate-on-scroll stagger-1" data-animate-id="tech-1">
              <div className="tech-icon"><i className="fas fa-brain"></i></div>
              <h3>Machine Learning</h3>
              <p>Advanced algorithms that enable systems to learn and improve from experience without explicit programming, delivering intelligent automation solutions.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-2" data-animate-id="tech-2">
              <div className="tech-icon"><i className="fas fa-eye"></i></div>
              <h3>Computer Vision</h3>
              <p>Sophisticated systems that can identify, process, and analyze visual data from the physical world with human-level accuracy and speed.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-3" data-animate-id="tech-3">
              <div className="tech-icon"><i className="fas fa-project-diagram"></i></div>
              <h3>Neural Networks</h3>
              <p>Deep learning architectures modeled after the human brain for advanced pattern recognition and complex decision-making processes.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-4" data-animate-id="tech-4">
              <div className="tech-icon"><i className="fas fa-globe"></i></div>
              <h3>AI Web Solutions</h3>
              <p>Intelligent web applications powered by artificial intelligence to create enhanced user experiences and streamlined digital interactions.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-5" data-animate-id="tech-5">
              <div className="tech-icon"><i className="fas fa-robot"></i></div>
              <h3>AI Automation</h3>
              <p>End-to-end automation solutions that leverage artificial intelligence to optimize business processes and increase operational efficiency.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-1" data-animate-id="tech-6">
              <div className="tech-icon"><i className="fas fa-cloud"></i></div>
              <h3>Cloud AI</h3>
              <p>Scalable artificial intelligence solutions deployed on secure cloud infrastructure for maximum flexibility and global accessibility.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-2" data-animate-id="tech-7">
              <div className="tech-icon"><i className="fas fa-comments"></i></div>
              <h3>Natural Language Processing</h3>
              <p>Advanced systems that understand, interpret, and generate human language for seamless human-computer interaction.</p>
            </div>
            <div className="tech-card animate-on-scroll stagger-3" data-animate-id="tech-8">
              <div className="tech-icon"><i className="fas fa-chart-bar"></i></div>
              <h3>Predictive Analytics</h3>
              <p>Powerful statistical techniques and machine learning models to forecast future outcomes and trends based on historical data patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section id="industries" className="industries section">
        <div className="container">
          <div className="section-header">
            <h2 className="animate-on-scroll" data-animate-id="industries-title">Industries We <span>Transform</span></h2>
            <p className="animate-on-scroll stagger-1" data-animate-id="industries-description">Delivering specialized AI solutions across diverse sectors with measurable impact</p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>تقديم حلول الذكاء الاصطناعي المتخصصة عبر قطاعات متنوعة</p>
          </div>
          
          <div className="industries-grid">
            <div className="industry-card animate-on-scroll stagger-1" data-animate-id="industry-1">
              <div className="industry-icon">
                <i className="fas fa-industry"></i>
              </div>
              <h3>Manufacturing</h3>
              <p>Revolutionizing production lines with intelligent automation, predictive maintenance, and quality control systems that reduce costs and improve efficiency.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">45%</span>
                  <span className="industry-stat-label">Cost Reduction</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">60%</span>
                  <span className="industry-stat-label">Efficiency Gain</span>
                </div>
              </div>
            </div>
            
            <div className="industry-card animate-on-scroll stagger-2" data-animate-id="industry-2">
              <div className="industry-icon">
                <i className="fas fa-heartbeat"></i>
              </div>
              <h3>Healthcare</h3>
              <p>Transforming patient care with AI-powered diagnostic tools, robotic surgery assistance, and intelligent healthcare management systems.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">95%</span>
                  <span className="industry-stat-label">Accuracy</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">40%</span>
                  <span className="industry-stat-label">Time Saved</span>
                </div>
              </div>
            </div>
            
            <div className="industry-card animate-on-scroll stagger-3" data-animate-id="industry-3">
              <div className="industry-icon">
                <i className="fas fa-car"></i>
              </div>
              <h3>Automotive</h3>
              <p>Driving innovation in autonomous vehicles, smart manufacturing, and predictive maintenance for the next generation of transportation.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">80%</span>
                  <span className="industry-stat-label">Safety Improvement</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">35%</span>
                  <span className="industry-stat-label">Production Speed</span>
                </div>
              </div>
            </div>
            
            <div className="industry-card animate-on-scroll stagger-4" data-animate-id="industry-4">
              <div className="industry-icon">
                <i className="fas fa-building"></i>
              </div>
              <h3>Smart Cities</h3>
              <p>Building intelligent urban infrastructure with IoT integration, traffic optimization, and sustainable resource management systems.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">50%</span>
                  <span className="industry-stat-label">Energy Savings</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">30%</span>
                  <span className="industry-stat-label">Traffic Reduction</span>
                </div>
              </div>
            </div>
            
            <div className="industry-card animate-on-scroll stagger-5" data-animate-id="industry-5">
              <div className="industry-icon">
                <i className="fas fa-seedling"></i>
              </div>
              <h3>Agriculture</h3>
              <p>Revolutionizing farming with precision agriculture, crop monitoring, and automated harvesting systems for sustainable food production.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">70%</span>
                  <span className="industry-stat-label">Yield Increase</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">25%</span>
                  <span className="industry-stat-label">Water Savings</span>
                </div>
              </div>
            </div>
            
            <div className="industry-card animate-on-scroll stagger-1" data-animate-id="industry-6">
              <div className="industry-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Finance</h3>
              <p>Enhancing financial services with fraud detection, algorithmic trading, risk assessment, and personalized customer experiences.</p>
              <div className="industry-stats">
                <div className="industry-stat">
                  <span className="industry-stat-value">99%</span>
                  <span className="industry-stat-label">Fraud Detection</span>
                </div>
                <div className="industry-stat">
                  <span className="industry-stat-value">85%</span>
                  <span className="industry-stat-label">Process Speed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials section">
        <div className="container">
          <div className="section-header">
            <h2 className="animate-on-scroll" data-animate-id="testimonials-title">Trusted by <span>Industry Leaders</span></h2>
            <p className="animate-on-scroll stagger-1" data-animate-id="testimonials-description">Hear from our clients about their transformative experiences with our AI solutions</p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>موثوق به من قادة الصناعة حول العالم</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card animate-on-scroll stagger-1" data-animate-id="testimonial-1">
              <div className="testimonial-content">
                <p>"The AI solutions implemented by HabroticsAI have revolutionized our manufacturing process, reducing downtime by 42% and increasing overall efficiency. Their team's expertise and dedication are unmatched in the industry."</p>
                <div className="client-info">
                  <div className="client-avatar">SJ</div>
                  <div className="client-details">
                    <h4>Sarah Johnson</h4>
                    <p>CTO, TechManufacturing Inc.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card animate-on-scroll stagger-2" data-animate-id="testimonial-2">
              <div className="testimonial-content">
                <p>"Your predictive analytics platform has given us unprecedented insights into our supply chain, saving millions in operational costs annually. The ROI was evident within the first quarter of implementation."</p>
                <div className="client-info">
                  <div className="client-avatar">MC</div>
                  <div className="client-details">
                    <h4>Michael Chen</h4>
                    <p>Operations Director, Global Logistics</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card animate-on-scroll stagger-3" data-animate-id="testimonial-3">
              <div className="testimonial-content">
                <p>"The computer vision system developed for our quality control has achieved 99.8% accuracy, far surpassing our expectations. It's transformed how we ensure product excellence and customer satisfaction."</p>
                <div className="client-info">
                  <div className="client-avatar">ER</div>
                  <div className="client-details">
                    <h4>Emma Rodriguez</h4>
                    <p>Head of Production, Precision Devices</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll stagger-4" data-animate-id="testimonial-4">
              <div className="testimonial-content">
                <p>"Working with HabroticsAI on our smart city initiative has been exceptional. Their IoT integration and traffic optimization systems have reduced congestion by 30% and improved citizen satisfaction significantly."</p>
                <div className="client-info">
                  <div className="client-avatar">DK</div>
                  <div className="client-details">
                    <h4>David Kim</h4>
                    <p>Smart City Director, Metro City Council</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll stagger-5" data-animate-id="testimonial-5">
              <div className="testimonial-content">
                <p>"The healthcare AI solutions have transformed our diagnostic capabilities. Patient outcomes have improved dramatically, and our medical staff can focus more on patient care rather than administrative tasks."</p>
                <div className="client-info">
                  <div className="client-avatar">AL</div>
                  <div className="client-details">
                    <h4>Dr. Amanda Lewis</h4>
                    <p>Chief Medical Officer, Regional Health Network</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card animate-on-scroll stagger-1" data-animate-id="testimonial-6">
              <div className="testimonial-content">
                <p>"Their financial AI systems have revolutionized our risk assessment and fraud detection capabilities. We've seen a 99% accuracy rate in fraud detection and significant improvements in customer trust."</p>
                <div className="client-info">
                  <div className="client-avatar">RT</div>
                  <div className="client-details">
                    <h4>Robert Thompson</h4>
                    <p>VP of Technology, SecureBank</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="cta section">
        <div className="container">
          <div className="cta-container">
            <h2 className="animate-on-scroll" data-animate-id="cta-title">Ready to Transform Your Business with AI?</h2>
            <p className="animate-on-scroll stagger-1" data-animate-id="cta-description">Schedule a consultation with our AI experts to discover how our innovative solutions can drive growth, efficiency, and innovation for your organization. Join the hundreds of companies already benefiting from our cutting-edge technology.</p>
            <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.9rem', marginTop: '10px' }}>هل أنت مستعد لتحويل عملك باستخدام الذكاء الاصطناعي؟</p>
            <div className="cta-buttons animate-on-scroll stagger-2" data-animate-id="cta-buttons">
              <button onClick={openContactInfo} className="btn btn-primary">Get Started Today</button>
              <button onClick={openConsultationForm} className="btn btn-secondary">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>HABROTICS SOLUTIONS</h3>
              <p>Pioneering the Future of Intelligent Automation. We are committed to developing AI solutions that enhance human capabilities and create a better tomorrow for all.</p>
              <p style={{ fontStyle: 'italic', color: 'var(--accent)', fontSize: '0.85rem', marginTop: '10px' }}>نقود مستقبل الأتمتة الذكية لبناء غد أفضل للجميع</p>
              <div className="social-links">
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" aria-label="GitHub"><i className="fab fa-github"></i></a>
                <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Solutions</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('solutions'); }}>AI-Powered Robotics</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('solutions'); }}>Industrial Automation</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('solutions'); }}>Predictive Analytics</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('solutions'); }}>Computer Vision</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('solutions'); }}>Process Automation</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>Industries</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('industries'); }}>Manufacturing</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('industries'); }}>Healthcare</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('industries'); }}>Automotive</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('industries'); }}>Smart Cities</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('industries'); }}>Agriculture</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>Resources</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('resources'); }}>Case Studies</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('resources'); }}>White Papers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('resources'); }}>Webinars</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('resources'); }}>Documentation</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('resources'); }}>API Reference</a></li>
              </ul>
            </div>
            
            <div className="footer-links">
              <h4>Company</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('company'); }}>About Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('company'); }}>Careers</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('company'); }}>Partnerships</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('company'); }}>News & Events</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('company'); }}>Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>© 2024 HABROTICS SOLUTIONS. All rights reserved.</p>
            <div className="legal-links">
              <a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('legal'); }}>Privacy Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('legal'); }}>Terms of Service</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('legal'); }}>Cookie Policy</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('legal'); }}>Security</a>
              <a href="#" onClick={(e) => { e.preventDefault(); openFooterModal('legal'); }}>Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Surprise Element */}
      <div className="surprise-container">
        <button className="surprise-btn" onClick={toggleSurprise}>
          <i className="fas fa-gift"></i>
        </button>
        <div className={`surprise-content ${showSurprise ? 'show' : ''}`}>
          <h3>Special Offer!</h3>
          <img 
            src="https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80" 
            alt="Special AI Offer" 
            className="surprise-image"
          />
          <p>Get 20% off your first AI implementation project when you sign up this month!</p>
          <a href="#contact" className="btn btn-primary" style={{width: '100%'}}>Claim Offer</a>
        </div>
      </div>

      {/* Footer Modal */}
      <div className={`footer-modal-overlay ${activeModal ? 'show' : ''}`} onClick={closeFooterModal}>
        <div className="footer-modal" onClick={(e) => e.stopPropagation()}>
          {activeModal && (
            <>
              <div className="footer-modal-header">
                <h2>{footerModalData[activeModal].title}</h2>
                <button className="footer-modal-close" onClick={closeFooterModal}>
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="footer-modal-content">
                {Object.entries(footerModalData[activeModal].content).map(([key, item]) => (
                  <div key={key}>
                    <h3>{key}</h3>
                    <p>{item.description}</p>
                    <ul>
                      {item.features.map((feature, index) => (
                        <li key={index}>
                          <i className="fas fa-check" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Contact Information Modal */}
      <div className={`form-modal-overlay ${showContactForm ? 'show' : ''}`} onClick={closeContactInfo}>
        <div className="form-modal" onClick={(e) => e.stopPropagation()}>
          <div className="form-modal-header">
            <h2>Contact Information</h2>
            <button className="form-modal-close" onClick={closeContactInfo}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <div style={{ color: 'var(--gray)', lineHeight: '1.8' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--light)', marginBottom: '15px', fontSize: '1.3rem' }}>
                <i className="fas fa-envelope" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Email
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '5px' }}>contact@habrotics.com</p>
              <p style={{ fontSize: '1.1rem' }}>info@habrotics.com</p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--light)', marginBottom: '15px', fontSize: '1.3rem' }}>
                <i className="fas fa-phone" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Phone
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '5px' }}>+92 324 8423974</p>
              <p style={{ fontSize: '1.1rem' }}>WhatsApp: +92 324 8423974</p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--light)', marginBottom: '15px', fontSize: '1.3rem' }}>
                <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Office Address
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
                HABROTICS SOLUTIONS<br />
                Technology Hub<br />
                Lahore, Punjab, Pakistan<br />
                South Asia
              </p>
            </div>
            
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ color: 'var(--light)', marginBottom: '15px', fontSize: '1.3rem' }}>
                <i className="fas fa-clock" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Business Hours
              </h3>
              <p style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Monday - Friday: 9:00 AM - 6:00 PM PKT</p>
              <p style={{ fontSize: '1.1rem', marginBottom: '5px' }}>Saturday: 10:00 AM - 4:00 PM PKT</p>
              <p style={{ fontSize: '1.1rem' }}>Sunday: Closed</p>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ color: 'var(--light)', marginBottom: '15px', fontSize: '1.3rem' }}>
                <i className="fas fa-globe" style={{ color: 'var(--accent)', marginRight: '10px' }}></i>
                Social Media
              </h3>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <i className="fab fa-linkedin" style={{ marginRight: '5px' }}></i>LinkedIn
                </a>
                <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <i className="fab fa-twitter" style={{ marginRight: '5px' }}></i>Twitter
                </a>
                <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <i className="fab fa-github" style={{ marginRight: '5px' }}></i>GitHub
                </a>
                <a href="#" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '1.1rem' }}>
                  <i className="fab fa-youtube" style={{ marginRight: '5px' }}></i>YouTube
                </a>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(79, 70, 229, 0.1)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid rgba(79, 70, 229, 0.2)',
              marginTop: '30px'
            }}>
              <p style={{ 
                color: 'var(--light)', 
                fontSize: '1rem', 
                margin: '0',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                <i className="fas fa-info-circle" style={{ color: 'var(--accent)', marginRight: '8px' }}></i>
                For immediate assistance, please call our support line or schedule a consultation using the button below.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Form Modal */}
      <div className={`form-modal-overlay ${showConsultationForm ? 'show' : ''}`} onClick={closeConsultationForm}>
        <div className="form-modal" onClick={(e) => e.stopPropagation()}>
          <div className="form-modal-header">
            <h2>Schedule Consultation</h2>
            <button className="form-modal-close" onClick={closeConsultationForm}>
              <i className="fas fa-times"></i>
            </button>
          </div>
          <form onSubmit={handleConsultationSubmit}>
            {/* Honeypot Spam Protection */}
            <input type="checkbox" name="botcheck" style={{ display: 'none' }} />
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="consultFirstName">First Name *</label>
                <input type="text" id="consultFirstName" name="firstName" required />
              </div>
              <div className="form-group">
                <label htmlFor="consultLastName">Last Name *</label>
                <input type="text" id="consultLastName" name="lastName" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="consultEmail">Email Address *</label>
              <input type="email" id="consultEmail" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="consultPhone">Phone Number *</label>
              <input type="tel" id="consultPhone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="consultCompany">Company Name *</label>
              <input type="text" id="consultCompany" name="company" required />
            </div>
            <div className="form-group">
              <label htmlFor="consultService">Service of Interest</label>
              <select id="consultService" name="service">
                <option value="">Select Service</option>
                <option value="ai-robotics">AI-Powered Robotics</option>
                <option value="industrial-automation">Industrial Automation</option>
                <option value="predictive-analytics">Predictive Analytics</option>
                <option value="computer-vision">Computer Vision</option>
                <option value="process-automation">Process Automation</option>
                <option value="custom-solution">Custom AI Solution</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="consultDate">Preferred Date</label>
              <input type="date" id="consultDate" name="preferredDate" min={new Date().toISOString().split('T')[0]} />
            </div>
            <div className="form-group">
              <label htmlFor="consultTime">Preferred Time</label>
              <select id="consultTime" name="preferredTime">
                <option value="">Select Time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="consultMessage">Project Details</label>
              <textarea id="consultMessage" name="message" placeholder="Please describe your project requirements, challenges, and goals..."></textarea>
            </div>
            
            {/* Result Message */}
            {consultationResult && (
              <div style={{
                padding: '12px 16px',
                borderRadius: '8px',
                marginBottom: '20px',
                textAlign: 'center',
                fontWeight: '500',
                backgroundColor: consultationResult.includes('Successfully') 
                  ? 'rgba(34, 197, 94, 0.1)' 
                  : 'rgba(239, 68, 68, 0.1)',
                color: consultationResult.includes('Successfully') 
                  ? '#22c55e' 
                  : '#ef4444',
                border: `1px solid ${consultationResult.includes('Successfully') 
                  ? 'rgba(34, 197, 94, 0.2)' 
                  : 'rgba(239, 68, 68, 0.2)'}`
              }}>
                {consultationResult}
              </div>
            )}
            
            <button 
              type="submit" 
              className="form-submit"
              disabled={consultationResult === "Sending...."}
            >
              {consultationResult === "Sending...." ? "Sending..." : "Schedule Consultation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HabroticsAI;