class Portfolio {
  private contentWrapper: HTMLDivElement;
  private observer: IntersectionObserver | null = null;

  constructor() {
      this.applyGlobalStyles();
      this.showSplashScreen();
  }

  private initPortfolio(): void {
      this.createContentWrapper();
      this.addHeaderContent();
      this.addAboutSection();
      this.addProjectsSection();
      this.addContactSection();
      document.body.appendChild(this.contentWrapper);

      requestAnimationFrame(() => {
          this.contentWrapper.classList.add('startup');
      });

      this.initScrollAnimations();
      this.initInteractiveElements(); // Added mouse follow effect here
  }

  private applyGlobalStyles(): void {
      if (!document.head.querySelector("meta[name='viewport']")) {
          const meta = document.createElement('meta');
          meta.name = 'viewport';
          meta.content = 'width=device-width, initial-scale=1.0';
          document.head.appendChild(meta);
      }

      const fontLink = document.createElement('link');
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap';
      fontLink.rel = 'stylesheet';
      document.head.appendChild(fontLink);

      document.body.style.cssText = `
          margin: 0;
          padding: 0;
          background-color: var(--background-color, #080a10);
          color: var(--text-color, #cccccc);
          font-family: var(--font-body, 'Inter', sans-serif);
          overflow-x: hidden;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          position: relative; /* Needed for pseudo-element positioning */
      `;

      const style = document.createElement('style');
      style.textContent = `
          :root {
              --background-color: #080a10;
              --primary-accent: #00c6ff;
              --secondary-accent: #a04cff;
              --gradient-start: #0d3a5c;
              --gradient-end: #1a1f36;
              --text-color: #d1d5db;
              --text-heading-color: #ffffff;
              --text-muted-color: #8a94a6;
              --card-bg: rgba(26, 31, 54, 0.5);
              --card-border: rgba(160, 76, 255, 0.15);
              --card-hover-bg: rgba(36, 41, 64, 0.7);
              --card-hover-border: rgba(0, 198, 255, 0.3);
              --code-bg: #111827;
              --code-text: #c5c8c6;
              --code-scrollbar-track: #161e2b;
              --code-scrollbar-thumb: #374151;
              --code-scrollbar-thumb-hover: #4b5563;
              --keyword-color: #569cd6;
              --string-color: #ce9178;
              --function-color: #dcdcaa;
              --comment-color: #6a9955; /* Still needed for snippet syntax */
              --font-body: 'Inter', sans-serif;
              --font-code: 'Roboto Mono', monospace;
              --section-padding: 80px 0;
              --container-max-width: 1100px;
              /* CSS variables for mouse position */
              --mouse-x: 50%;
              --mouse-y: 50%;
          }

          html {
              scroll-behavior: smooth;
              scrollbar-width: none;
          }

          body {
              font-family: var(--font-body);
              background: var(--background-color) linear-gradient(180deg, var(--gradient-start) 0%, var(--background-color) 30%);
              color: var(--text-color);
              line-height: 1.7;
              overflow-x: hidden;
              &::-webkit-scrollbar {
                  display: none;
              }
               -ms-overflow-style: none;
          }

          /* Mouse Follow Effect */
          body::after {
              content: '';
              position: fixed; /* Use fixed to cover viewport */
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              pointer-events: none; /* Allow clicking through */
              background: radial-gradient(
                  circle at var(--mouse-x) var(--mouse-y),
                  rgba(0, 198, 255, 0.06) 0%, /* Subtle cyan glow */
                  transparent 20% /* Adjust size of glow */
              );
              z-index: 999; /* Ensure it's above background but below content */
              transition: background 0.1s ease-out; /* Smooth transition */
          }


          .content-wrapper {
              max-width: var(--container-max-width);
              margin: 0 auto;
              padding: 0 20px;
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.6s ease-out, transform 0.6s ease-out;
              position: relative; /* Ensure content is above the body::after glow */
              z-index: 1;
          }
          .content-wrapper.startup {
               opacity: 1;
               transform: translateY(0);
          }

          section {
              padding: var(--section-padding);
              opacity: 0;
              transform: translateY(40px);
              transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
              will-change: opacity, transform;
              border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }
           section:last-of-type {
               border-bottom: none;
           }
          section.visible {
              opacity: 1;
              transform: translateY(0);
          }

          h1, h2, h3, h4 {
              color: var(--text-heading-color);
              margin: 0 0 15px 0;
              font-weight: 600;
              letter-spacing: 0.3px;
          }
           h1 {
               font-size: clamp(2.5em, 5vw, 3.5em);
               font-weight: 700;
               background: linear-gradient(90deg, var(--text-heading-color), var(--primary-accent));
               -webkit-background-clip: text;
               -webkit-text-fill-color: transparent;
               margin-bottom: 10px;
           }
           h2 {
               font-size: clamp(1.1em, 2.5vw, 1.4em);
               color: var(--text-muted-color);
               font-weight: 400;
               margin-bottom: 40px;
               letter-spacing: 0.5px;
               max-width: 600px;
               margin-left: auto;
               margin-right: auto;
           }
          h3 {
              font-size: clamp(1.8em, 4vw, 2.5em);
              margin-bottom: 40px;
              position: relative;
              display: inline-block;
          }
          h3::after {
              content: '';
              position: absolute;
              bottom: -8px; left: 0;
              width: 50px; height: 3px;
              background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));
              border-radius: 2px;
          }

          p {
              color: var(--text-color);
              line-height: 1.7;
              margin-bottom: 20px;
              max-width: 750px;
          }
           p strong {
               color: var(--text-heading-color);
               font-weight: 500;
           }

          a {
              color: var(--primary-accent);
              text-decoration: none;
              font-weight: 500;
              transition: color 0.3s ease;
          }
          a:hover {
              color: var(--secondary-accent);
          }

          .portfolio-header {
              text-align: center;
              padding: 60px 0;
              min-height: 50vh;
              display: flex;
              flex-direction: column;
              justify-content: center;
              border-bottom: none;
          }

          .projects-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
              gap: 35px;
              margin-top: 30px;
          }
          .project-card {
              background-color: var(--card-bg);
              padding: 30px;
              border-radius: 10px;
              border: 1px solid var(--card-border);
              cursor: pointer;
              position: relative;
              overflow: hidden;
              transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;
              will-change: transform, border-color;
          }
          .project-card:hover {
              transform: translateY(-6px);
              border-color: var(--card-hover-border);
              background-color: var(--card-hover-bg);
          }
          .project-card h4 {
              color: var(--text-heading-color);
              margin-bottom: 12px;
              font-size: 1.3em;
              font-weight: 600;
          }
          .project-card p {
              font-size: 0.98em;
              color: var(--text-muted-color);
              line-height: 1.6;
              margin-bottom: 15px;
          }

          .code-snippet {
              background: var(--code-bg);
              color: var(--code-text);
              border-radius: 8px;
              padding: 15px 20px;
              margin-top: 20px;
              font-family: var(--font-code);
              font-size: 0.9em;
              border: 1px solid rgba(255, 255, 255, 0.1);
              line-height: 1.6;
              white-space: pre;
              overflow-x: auto;
              scrollbar-width: thin;
              scrollbar-color: var(--code-scrollbar-thumb) var(--code-scrollbar-track);
          }
          .code-snippet::-webkit-scrollbar {
              height: 8px;
              background-color: var(--code-scrollbar-track);
              border-radius: 6px;
          }
          .code-snippet::-webkit-scrollbar-thumb {
              background-color: var(--code-scrollbar-thumb);
              border-radius: 6px;
              border: 2px solid var(--code-scrollbar-track);
          }
          .code-snippet::-webkit-scrollbar-thumb:hover {
              background-color: var(--code-scrollbar-thumb-hover);
          }

           /* Syntax highlighting classes (kept for user's snippets) */
           .code-snippet .keyword { color: var(--keyword-color); }
           .code-snippet .string { color: var(--string-color); }
           .code-snippet .function { color: var(--function-color); }
           .code-snippet .comment { color: var(--comment-color); font-style: italic; }

          .project-details {
              max-height: 0;
              overflow: hidden;
              opacity: 0;
              transition: max-height 0.4s ease-out, opacity 0.4s ease-out, margin-top 0.4s ease-out, padding-top 0.4s ease-out;
              font-size: 0.95em;
              margin-top: 0;
              border-top: 1px solid rgba(255, 255, 255, 0.1);
              padding-top: 0;
          }
          .project-card.expanded .project-details {
              max-height: 450px;
              opacity: 1;
              margin-top: 20px;
              padding-top: 20px;
          }
          .project-details p {
               margin-bottom: 10px;
               color: var(--text-color);
          }
           .project-details strong {
               color: var(--primary-accent);
           }
           .project-details a {
               font-weight: 600;
           }

          .contact-section {
              text-align: center;
          }
          .contact-section p {
              margin-left: auto;
              margin-right: auto;
          }
          .icons-container {
              display: flex;
              justify-content: center;
              gap: 35px;
              margin-top: 30px;
              flex-wrap: wrap;
          }
          .social-icon-link {
              display: inline-block;
              transition: transform 0.2s ease-out;
          }
          .social-icon-link:hover {
              transform: scale(1.1);
          }
          .social-icon {
              width: 32px;
              height: 32px;
              filter: grayscale(70%) opacity(0.7);
              transition: filter 0.3s ease, transform 0.3s ease;
          }
          .social-icon-link:hover .social-icon {
              filter: grayscale(0%) opacity(1);
          }

          #splash-screen {
              position: fixed;
              top: 0; left: 0;
              width: 100vw; height: 100vh;
              background: var(--background-color);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
              opacity: 1;
              transition: opacity 0.8s ease-out, transform 0.8s ease-out;
          }
          #splash-screen.splash-out {
              opacity: 0;
              transform: scale(0.95);
              pointer-events: none;
          }
          #splash-text {
              font-family: var(--font-code);
              font-size: clamp(2em, 6vw, 4em);
              color: var(--primary-accent);
              font-weight: 500;
              text-shadow: 0 0 10px rgba(0, 198, 255, 0.5);
              letter-spacing: 0.1em;
              white-space: nowrap;
          }

          @media (max-width: 768px) {
              :root { --section-padding: 60px 0; }
              body { font-size: 15px; }
              h1 { font-size: clamp(2em, 8vw, 2.8em); }
              h2 { font-size: clamp(1em, 4vw, 1.2em); }
              h3 { font-size: clamp(1.5em, 6vw, 2em); margin-bottom: 30px;}
              .projects-container { grid-template-columns: 1fr; gap: 25px; }
               .code-snippet { font-size: 0.85em; }
          }
          @media (max-width: 480px) {
              :root { --section-padding: 50px 0; }
              body { font-size: 14px; }
              .content-wrapper { padding: 0 15px; }
              h1 { font-size: clamp(1.8em, 10vw, 2.4em); }
              h2 { font-size: clamp(0.9em, 5vw, 1.1em); margin-bottom: 30px;}
              h3 { font-size: clamp(1.3em, 7vw, 1.8em); }
              .project-card { padding: 25px; }
              .icons-container { gap: 25px; }
              .social-icon { width: 28px; height: 28px; }
              #splash-text { letter-spacing: 0.05em; }
               .code-snippet { font-size: 0.8em; }
          }
      `;
      document.head.appendChild(style);

      requestAnimationFrame(() => {
           document.body.style.opacity = '1';
      });
  }

  private showSplashScreen(): void {
      const splash = document.createElement('div');
      splash.id = 'splash-screen';

      const pseudo = document.createElement('span');
      pseudo.id = 'splash-text';
      splash.appendChild(pseudo);
      document.body.appendChild(splash);

      const finalText = '0xZKnw';
      const chars = '!<>-_\\/[]{}—=+*^?#________';
      let iteration = 0;
      const totalIterations = finalText.length * 6;
      let interval: number | null = null;

      const scrambleText = () => {
          pseudo.textContent = finalText
              .split('')
              .map((_letter, index) => {
                  if (index < iteration / 6) {
                      return finalText[index];
                  }
                  return chars[Math.floor(Math.random() * chars.length)];
              })
              .join('');

          iteration++;

          if (iteration > totalIterations) {
              if (interval) clearInterval(interval);
              pseudo.textContent = finalText;

              setTimeout(() => {
                  splash.classList.add('splash-out');
                  splash.addEventListener('transitionend', () => {
                       splash.remove();
                       this.initPortfolio();
                  }, { once: true });
              }, 400);
          }
      };

      let lastTime = 0;
      const frameDuration = 40;

      const animate = (currentTime: number) => {
           if(!lastTime) lastTime = currentTime;
           const elapsed = currentTime - lastTime;

          if (elapsed >= frameDuration) {
               scrambleText();
               lastTime = currentTime - (elapsed % frameDuration);
          }
           if (iteration <= totalIterations) {
               requestAnimationFrame(animate);
           }
      }
      requestAnimationFrame(animate);
  }

  private createContentWrapper(): void {
      this.contentWrapper = document.createElement('div');
      this.contentWrapper.classList.add('content-wrapper');
  }

   private addHeaderContent(): void {
       const headerSection = document.createElement('section');
       headerSection.classList.add('portfolio-header', 'scroll-element');
       headerSection.style.borderBottom = 'none';

       const title = document.createElement('h1');
       title.textContent = '0xZKnw';

       const subtitle = document.createElement('h2');
       subtitle.textContent = 'Developer | Blockchain Enthusiast | Crypto Explorer';

       headerSection.append(title, subtitle);
       this.contentWrapper.appendChild(headerSection);
   }

  private addAboutSection(): void {
      const aboutSection = document.createElement('section');
      aboutSection.id = 'about';
      aboutSection.classList.add('scroll-element');

      const heading = document.createElement('h3');
      heading.textContent = `About Me`;

      const paragraph = document.createElement('p');
      paragraph.textContent = "Passionate computer science student diving deep into the world of blockchain, cryptography, and decentralized systems. Always learning and building with technologies like Python, Go, and exploring the frontiers of Web3.";

      const skillsParagraph = document.createElement('p');
      skillsParagraph.innerHTML = `<strong>Skills:</strong> Python, Go, Java, C, TypeScript (Learning), Solidity (Learning), Rust (Learning), HTML/CSS.`;

      aboutSection.append(heading, paragraph, skillsParagraph);
      this.contentWrapper.appendChild(aboutSection);
  }

  private addProjectsSection(): void {
      const projectsSection = document.createElement('section');
      projectsSection.id = 'projects';
      projectsSection.classList.add('scroll-element');

      const heading = document.createElement('h3');
      heading.textContent = `Projects`;

      const projectsContainer = document.createElement('div');
      projectsContainer.classList.add('projects-container');

      const createCard = (
          titleText: string,
          descText: string,
          codeHTML: string,
          detailsHTML: string
      ): HTMLDivElement => {
          const card = document.createElement('div');
          card.classList.add('project-card');

          const title = document.createElement('h4');
          title.textContent = titleText;

          const desc = document.createElement('p');
          desc.textContent = descText;

          const codeSnippet = document.createElement('pre');
          codeSnippet.classList.add('code-snippet');
          codeSnippet.innerHTML = codeHTML;

          const details = document.createElement('div');
          details.classList.add('project-details');
          details.innerHTML = detailsHTML;

          card.append(title, desc, codeSnippet, details);

          card.addEventListener('click', (e) => {
               if (e.target instanceof HTMLElement && e.target.closest('a')) {
                   return;
               }
               card.classList.toggle('expanded');
          });

          return card;
      };

       const Nexa = createCard(
           'Nexa',
           'Decentralized messaging service with websockets.',
           `<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>\nmessaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)`,
           "<p>Collaborative project focused on secure, decentralized communication.</p><p><strong>Tech:</strong> Python, Websockets </p><p><a href='https://github.com/val-005/Nexa' target='_blank' rel='noopener noreferrer'>View on GitHub &rarr;</a></p>"
       );
       const anovlt = createCard(
           'AnoVlt',
           'Encrypt your files asymmetrically.',
           `<span class='keyword'>import</span> <span class='string'>'eciesgo'</span>\n<span class='keyword'>func</span> <span class='function'>anovlt</span>(pub <span class='keyword'>string</span>) *<span class='function'>eciesgo</span>.secrets {\n    <span class='keyword'>return</span> eciesgo.<span class='function'>Encrypt</span>(pub, <span class='string'>'secrets.zip'</span>)\n}`,
           "<p>Experimentation with ECIES for secure file handling.</p><p><strong>Tech:</strong> Go, ECIES Library</p><p><a href='https://github.com/0xZKnw/Bc_Test' target='_blank' rel='noopener noreferrer'>Related Exploration &rarr;</a></p>"
       );
       const ZKnwMe = createCard(
           '0xZKnw.me',
           'This Website.',
           `<span class='keyword'>import</span> axios;\naxios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);`,
           "<p>The website you're currently viewing ! Built using TypeScript.</p><p><strong>Tech:</strong> TypeScript, HTML, CSS</p><p><a href='https://github.com/0xZKnw/0xzknw.me' target='_blank' rel='noopener noreferrer'>View Source &rarr;</a></p>"
       );
       const PwdMng = createCard(
           'PwdMng',
           'A password manager with ecies encryption.',
           `<span class='keyword'>import</span> cryptography\n<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):\n    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)`,
           "<p>A secure password manager using asymetric encryption (ECIES).</p><p><strong>Tech:</strong> Python, ECIES Libraries </p><p><a href='https://github.com/0xZKnw/PwdMng' target='_blank' rel='noopener noreferrer'>View on GitHub &rarr;</a></p>"
       );

      projectsContainer.append(Nexa, PwdMng, ZKnwMe, anovlt);
      projectsSection.append(heading, projectsContainer);
      this.contentWrapper.appendChild(projectsSection);
  }

  private addContactSection(): void {
      const contactSection = document.createElement('section');
      contactSection.id = 'contact';
      contactSection.classList.add('contact-section', 'scroll-element');

      const heading = document.createElement('h3');
      heading.textContent = `Get In Touch`;

      const paragraph = document.createElement('p');
       paragraph.textContent = "Interested in collaborating or discussing tech, blockchain, and crypto? Feel free to reach out.";
       paragraph.style.maxWidth = '600px';
       paragraph.style.margin = '0 auto 30px auto';

      const iconsContainer = document.createElement('div');
      iconsContainer.classList.add('icons-container');

      const createIconLink = (href: string, imgSrc: string, altText: string): HTMLAnchorElement => {
          const link = document.createElement('a');
          link.href = href;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.classList.add('social-icon-link');
          link.setAttribute('aria-label', altText);

          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = altText;
          img.classList.add('social-icon');
           img.onerror = () => {
               img.style.display = 'none';
               const fallbackText = document.createElement('span');
               fallbackText.textContent = altText;
               fallbackText.style.color = 'var(--text-muted-color)';
               fallbackText.style.fontSize = '0.8em';
               link.appendChild(fallbackText);
           };

          link.appendChild(img);
          return link;
      };

      const discordIcon = createIconLink('https://discord.com/users/0xZKnw', './img/discord.svg', 'Discord');
      const githubIcon = createIconLink('https://github.com/0xZKnw', './img/github.svg', 'GitHub');
      const twitterIcon = createIconLink('https://twitter.com/0xZKnw', './img/x.svg', 'Twitter');
      const linkedinIcon = createIconLink('https://www.linkedin.com/in/justin-olivier-1a6b0a31a/', './img/linkedin.svg', 'LinkedIn');

      iconsContainer.append(discordIcon, githubIcon, twitterIcon, linkedinIcon);
      contactSection.append(heading, paragraph, iconsContainer);
      this.contentWrapper.appendChild(contactSection);
  }

  private initScrollAnimations(): void {
      if (this.observer) {
          this.observer.disconnect();
      }

      this.observer = new IntersectionObserver(
          (entries, observerInstance) => {
              entries.forEach(entry => {
                  const delay = (entry.target.getAttribute('data-scroll-delay') || 0) + 'ms';
                  if (entry.isIntersecting) {
                      entry.target.classList.add('visible');
                      (entry.target as HTMLElement).style.transitionDelay = delay;
                      observerInstance.unobserve(entry.target);
                  }
              });
          },
          {
              root: null,
              threshold: 0.1,
              rootMargin: "0px 0px -5% 0px"
          }
      );

      this.contentWrapper.querySelectorAll('.scroll-element').forEach((element, index) => {
          this.observer?.observe(element);
      });
  }

   private initInteractiveElements(): void {
       document.body.addEventListener('mousemove', (e) => {
           const x = e.clientX / window.innerWidth;
           const y = e.clientY / window.innerHeight;
           document.body.style.setProperty('--mouse-x', `${x * 100}%`);
           document.body.style.setProperty('--mouse-y', `${y * 100}%`);
       });
   }
}

document.addEventListener('DOMContentLoaded', () => {
  new Portfolio();
});
