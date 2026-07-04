document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const isDark = document.body.classList.contains('dark-theme');
      themeToggle.innerHTML = isDark ? '☀️' : '🌙';
    });
  }

  // Mobile Nav Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.querySelector('.nav-links');
  
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinksList.classList.toggle('active');
      const isExpanded = navLinksList.classList.contains('active');
      navToggle.setAttribute('aria-expanded', isExpanded);
      navToggle.innerHTML = isExpanded ? '✕' : '☰';
    });
  }

  // Close mobile nav when clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksList.classList.contains('active')) {
        navLinksList.classList.remove('active');
        if (navToggle) navToggle.innerHTML = '☰';
      }
    });
  });

  // Header Scroll Effect & Scroll Progress Tracker
  const header = document.querySelector('header');
  const scrollIndicator = document.getElementById('scroll-indicator');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollIndicator) {
      scrollIndicator.style.width = scrolled + '%';
    }
  });

  // Active Link on Scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 10) {
      current = sections[sections.length - 1].getAttribute('id');
    } else {
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
          current = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Canvas Neural Network Background
  const canvas = document.getElementById('bg-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const colors = ['#ff3333', '#b30000', '#4d4d4d'];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 16000), 70);
      particlesArray = [];
      for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
      }
    }

    function handleResize() {
      resizeCanvas();
      init();
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 130) {
            ctx.strokeStyle = `rgba(255, 51, 51, ${0.12 - (distance / 130) * 0.12})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Typewriter Effect for Hero Subtitle
  const subroles = [
    "Security Data Scientist",
    "LLMOps Specialist",
    "Cyber Security Knowledge Graph Architect",
    "Agentic Systems Engineer",
    "RAG Practitioner",
    "Context Graph Architect"
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const subtitleEl = document.getElementById('typing-role');
  
  function typeRole() {
    if (!subtitleEl) return;
    const currentRole = subroles[roleIndex];
    
    if (isDeleting) {
      subtitleEl.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitleEl.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let typingSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2200; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % subroles.length;
      typingSpeed = 300; // Small delay before next word
    }

    setTimeout(typeRole, typingSpeed);
  }
  
  if (subtitleEl) {
    typeRole();
  }

  // Interactive Terminal Widget Interpreter
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  if (terminalInput && terminalBody) {
    document.getElementById('terminal-widget-container').addEventListener('click', () => {
      terminalInput.focus();
    });

    const commands = {
      help: () => `Available commands:
  <span class="cyan-text">about</span>       - Focus area overview
  <span class="cyan-text">skills</span>      - Tech stack mapping
  <span class="cyan-text">experience</span>  - Prevalent AI tenure highlights
  <span class="cyan-text">contact</span>     - Direct contact values
  <span class="cyan-text">hack</span>        - Scan Knowledge Graph connectivity
  <span class="cyan-text">clear</span>       - Clear workspace console`,
      
      about: () => `<span class="white-text">Nizamudheen T I</span>
Security Data Scientist specializing in:
  - Cyber Security Knowledge Graphs & Context Graphs
  - LLMOps pipelines & Guardrail architectures
  - Agentic Systems & Advanced RAG frameworks`,

      skills: () => `Expertise Core:
  - <span class="violet-text">LLMOps / RAG</span>  : LangChain, LangGraph, MCP, PEFT, vLLM, LangFuse
  - <span class="violet-text">Data / Graphs</span> : Knowledge Graphs, Context Graphs, Milvus, FAISS
  - <span class="violet-text">Security ML</span>  : Anomaly Detection, Injection Defense, SQL log analytics`,

      experience: () => `Roles at <span class="white-text">Prevalent AI</span>:
  - <span class="cyan-text">Data Scientist</span> (July 2023 - Present)
    PoC Agentic Data Fabric, SLM optimization, RAG monitoring.
  - <span class="cyan-text">Junior Data Scientist</span> (July 2022 - July 2023)
    Cybersecurity synthetic data, temporal log topic modeling.`,

      contact: () => `Connect:
  - <span class="cyan-text">Email</span>    : nizamudma@gmail.com
  - <span class="cyan-text">LinkedIn</span> : linkedin.com/in/nizamudheenti
  - <span class="cyan-text">Phone</span>    : +91-8157876001`,

      hack: () => {
        let count = 0;
        terminalInput.disabled = true;
        const interval = setInterval(() => {
          const lines = [
            "Querying cybersecurity knowledge graph nodes...",
            "Validating contextual graph edges...",
            "Loading LLMOps metrics dashboard...",
            "Checking Agentic agent validation keys...",
            "Injecting dummy RAG queries for guardrail check...",
            "STATUS: OPTIMAL. Threat landscape context mapped successfully.",
            "Welcome, Admin Nizamudheen."
          ];
          if (count < lines.length) {
            appendOutput(lines[count], count === lines.length - 1 ? 'cyan-text' : 'violet-text');
            count++;
          } else {
            clearInterval(interval);
            terminalInput.disabled = false;
            terminalInput.focus();
          }
        }, 300);
        return "Mapping security graph pathways...";
      }
    };

    function appendOutput(text, cssClass = '') {
      const p = document.createElement('p');
      p.className = 'terminal-output';
      if (cssClass) {
        p.innerHTML = `<span class="${cssClass}">${text}</span>`;
      } else {
        p.innerHTML = text;
      }
      terminalBody.insertBefore(p, terminalBody.lastElementChild);
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function executeCommand(cmdValue) {
      const echoLine = document.createElement('p');
      echoLine.className = 'terminal-output';
      echoLine.innerHTML = `<span class="cyan-text">nizam@cyber-agent:~</span>$ ${cmdValue}`;
      terminalBody.insertBefore(echoLine, terminalBody.lastElementChild);

      if (cmdValue === '') {
        terminalBody.scrollTop = terminalBody.scrollHeight;
        return;
      }

      if (cmdValue === 'clear') {
        const outputs = terminalBody.querySelectorAll('.terminal-output');
        outputs.forEach(node => node.remove());
      } else if (commands[cmdValue]) {
        const result = commands[cmdValue]();
        if (result) {
          appendOutput(result);
        }
      } else {
        appendOutput(`Command not found: ${cmdValue}. Type <span class="cyan-text">help</span> for a list of commands.`, 'gray-text');
      }

      terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmdValue = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        executeCommand(cmdValue);
      }
    });

    // Chip command triggers
    const chips = document.querySelectorAll('.terminal-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const cmd = chip.getAttribute('data-cmd');
        executeCommand(cmd);
      });
    });
  }
  // Scroll Reveal
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.timeline-item, .skill-card, .edu-item, .cert-card, .contact-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    revealObserver.observe(el);
  });
});
