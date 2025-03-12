class Portfolio {
  private container: HTMLDivElement;
  private contentArea: HTMLDivElement;

  constructor() {
    this.applyGlobalStyles();
    this.showSplashScreen();
    this.createContainer();
    this.addHeader();
    this.addAboutSection();
    this.addProjectsSection();
    this.addContactSection();
    document.body.appendChild(this.container);
    this.container.classList.add('startup');
    this.initScrollAnimations();
  }

  private applyGlobalStyles(): void {
    if (!document.head.querySelector("meta[name='viewport']")) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0';
      document.head.appendChild(meta);
    }

    document.body.style.cssText = `
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
      font-size: 16px;
      background: #0a0a0a;
      color: #e2e6ea;
      overflow: hidden;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    const style = document.createElement('style');
    style.textContent = `
      :root {
        --background-color: #0a0a0a;
        --text-color: #e2e6ea;
        --container-bg: #181818;
        --container-border: #333333;
        --container-hover-border: #444444;
        --snippet-bg: #121212;
        --snippet-text: #adbac7;
        --keyword-color: #ff7b72;
        --string-color: #a5d6ff;
        --function-color: #d2a8ff;
        --header-bg: #232323;
      }

      html {
        scroll-behavior: smooth;
        background: var(--background-color);
        height: 100%;
        overflow: hidden;
      }
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
        font-size: 16px;
        background: var(--background-color);
        color: var(--text-color);
        height: 100%;
        overflow: hidden;
      }

      .ide-container {
        background-color: var(--container-bg);
        padding: 0;
        border-radius: 8px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        max-width: 1280px;
        width: 85vw;
        height: 85vh;
        overflow-y: auto;
        overflow-x: hidden;
        margin: 0;
        border: 1px solid var(--container-border);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        position: relative;
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      
      /* Hide scrollbar for Chrome, Safari and Opera */
      .ide-container::-webkit-scrollbar {
        display: none;
      }
      
      .ide-container:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        border-color: var(--container-hover-border);
      }
      
      .ide-header {
        background: var(--header-bg);
        height: 80px !important; /* Forcer la hauteur à 80px */
        display: flex;
        align-items: center;
        padding: 0;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      }
      
      .traffic-lights {
        display: flex;
        margin-left: 12px;
        margin-right: auto;
        margin-top: 4px;
        margin-bottom: 4px;
        align-items: center;
        height: 100%;
      }
      
      .traffic-light {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        margin-right: 8px;
        position: relative;
        /* Create shadow effect for more depth */
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) inset;
      }
      
      .traffic-light.close {
        background-color: #ff5f57;
        border: 0.5px solid #e0443e;
      }
      
      .traffic-light.minimize {
        background-color: #ffbd2e;
        border: 0.5px solid #dea123;
      }
      
      .traffic-light.maximize {
        background-color: #28c940;
        border: 0.5px solid #1aab29;
      }
      
      .traffic-light:hover::before {
        content: "";
        position: absolute;
        top: 3.5px;
        left: 3.5px;
        width: 5px;
        height: 5px;
        opacity: 0.7;
      }
      
      .traffic-light.close:hover::before {
        content: "×";
        font-size: 10px;
        line-height: 1px;
        text-align: center;
        color: #4d0000;
        opacity: 0.7;
      }
      
      .traffic-light.minimize:hover::before {
        content: "";
        background: #975500;
        height: 1px;
        width: 8px;
        top: 5.5px;
        left: 2px;
      }
      
      .traffic-light.maximize:hover::before {
        content: "";
        background: #006500;
        height: 1px;
        width: 8px;
        top: 5.5px;
        left: 2px;
        box-shadow: 0 -3px 0 #006500, 0 3px 0 #006500;
      }
      
      .title-bar {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        color: #aaa;
        font-size: 13px;
        font-weight: 400;
        pointer-events: none;
        user-select: none;
      }
      
      .content-area {
        padding: 40px 60px 30px;
        flex: 1;
      }
      
      header {
        border-bottom: 1px solid var(--container-border);
        padding-bottom: 10px;
        margin-top: 10px;
      }
      header h1, header h2 {
        color: var(--text-color);
        margin: 0;
      }
      header h2 {
        font-size: 0.85em;
        color: #8b949e;
        margin-top: 5px;
      }
      section {
        margin-bottom: 30px;
      }
      section h3 {
        color: var(--text-color);
        border-bottom: 1px solid var(--container-border);
        padding-bottom: 5px;
        margin-bottom: 15px;
      }
      section p {
        color: #8b949e;
        line-height: 1.5;
      }
      .projects-container {
        display: flex;
        flex-wrap: wrap;
        gap: 40px;
        justify-content: space-around;
        margin-top: 10px;
      }
      .project-card {
        flex: 1 1 40%;
        background-color: var(--container-bg);
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;
        border: 1px solid var(--container-border);
      }
      .project-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.4);
        border-color: var(--container-hover-border);
      }
      .project-card h4 { color: var(--function-color); margin-bottom: 10px; }
      .project-card p { font-size: 0.95em; color: #8b949e; line-height: 1.4; }
      .project-details {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.5s ease, opacity 0.5s ease;
        font-size: 0.9em;
        margin-top: 10px;
      }
      .project-card.expanded .project-details {
        max-height: 400px;
        opacity: 1;
      }
      .project-details a {
        color: var(--function-color);
        text-decoration: none;
      }
      .project-details a:hover { text-decoration: underline; }
      .code-snippet {
        background: var(--snippet-bg);
        color: #f8f8f2;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        font-family: "JetBrains Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace;
        font-size: 0.9em;
        overflow-x: auto;
        border: 1px solid var(--container-border);
      }
      .code-snippet .keyword { color: #f92672; }
      .code-snippet .string { color: #e6db74; }
      .code-snippet .function { color: #a6e22e; }
      .code-snippet .comment { color: #75715e; }
      .scroll-element {
        opacity: 0;
        transform: translateY(20px);
      }
      .animate-appear {
        animation: fadeIn 0.8s ease forwards;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes startupAnimation {
        0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
        100% { opacity: 1; transform: translateY(0) scale(1); }
      }
      .startup {
        animation: startupAnimation 1s ease-out forwards;
      }
      /* Splash Screen Styles with a slightly enhanced gradient */
      #splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, var(--background-color) 0%, #0d0d0d 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      #splash-screen div {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        font-size: 3em;
        color: var(--text-color);
        font-weight: bold;
      }
      .splash-out {
        animation: splashOut 1s ease forwards;
      }
      @keyframes splashOut {
        0% { opacity: 1; transform: scale(1); }
        100% { opacity: 0; transform: scale(0.9); }
      }
      @media (max-width: 600px) {
        body {
          font-size: 15px;
          align-items: flex-start !important;
          justify-content: flex-start !important;
          padding-top: 10px;
        }
        .ide-container {
          width: 95vw;
          
          
          box-sizing: border-box;
          height: 83vh !important;
        }
        header h1 {
          font-size: 1.5em;
        }
        header h2 {
          font-size: 1em;
        }
        section h3 {
          font-size: 1.2em;
        }
        .ide-header {
          height: 60px !important;
          top: 0px !important;
        }
      }

      @media (max-width: 400px) {
        header h1 {
          font-size: 1.3em;
        }
        header h2 {
          font-size: 0.9em;
        }
        .content-area {
          padding: 20px 30px 20px;
        }
        .ide-header {
          height: 50px !important;
          top: 0px !important;
        }
      }

      @media (max-width: 600px) {
        .ide-header {
          height: 50px !important;
          top: 0px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  private showSplashScreen(): void {
    const splash = document.createElement('div');
    splash.id = 'splash-screen';

    const pseudoContainer = document.createElement('div');
    const pseudo = document.createElement('span');
    pseudoContainer.appendChild(pseudo);
    splash.appendChild(pseudoContainer);
    document.body.appendChild(splash);

    const finalText = '0xZKnw';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
    let iteration = 0;
    const totalIterations = 40;
    
    // Add the scramble animation styles
    const style = document.createElement('style');
    style.textContent = `
      @keyframes textGlow {
        0% { text-shadow: 0 0 8px rgba(226, 230, 234, 0.7); }
        50% { text-shadow: 0 0 16px rgba(226, 230, 234, 0.9); }
        100% { text-shadow: 0 0 8px rgba(226, 230, 234, 0.7); }
      }
      
      #splash-screen span {
        font-family: monospace;
        animation: textGlow 2s infinite;
        letter-spacing: 0.2em;
        font-weight: bold;
      }
    `;
    document.head.appendChild(style);

    // Scramble animation function
    const scrambleText = () => {
      // Determine how many characters should be finalized
      const finalizedCount = Math.floor((iteration / totalIterations) * finalText.length);
      
      let result = '';
      
      // Add finalized characters (they won't change anymore)
      for (let i = 0; i < finalizedCount; i++) {
        result += finalText[i];
      }
      
      // Add scrambled characters for the rest
      for (let i = finalizedCount; i < finalText.length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      
      // Update the text
      pseudo.textContent = result;
      
      // Slow down the animation over time
      const delay = Math.pow(iteration / totalIterations, 2) * 100 + 30;
      
      iteration++;
      
      // Continue scrambling if not done
      if (iteration <= totalIterations) {
        setTimeout(scrambleText, delay);
      } else {
        // When scramble is done, wait a bit before fading out
        setTimeout(() => {
          splash.classList.add('splash-out');
          splash.addEventListener('animationend', () => splash.remove());
        }, 1000);
      }
    };

    // Start the scramble animation
    setTimeout(scrambleText, 500);
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.classList.add('ide-container');

    // Create the macOS title bar
    const ideHeader = document.createElement('div');
    ideHeader.classList.add('ide-header');
    
    // Add traffic light buttons (close, minimize, maximize)
    const trafficLights = document.createElement('div');
    trafficLights.classList.add('traffic-lights');
    
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('traffic-light', 'close');
    
    const minimizeBtn = document.createElement('div');
    minimizeBtn.classList.add('traffic-light', 'minimize');
    
    const maximizeBtn = document.createElement('div');
    maximizeBtn.classList.add('traffic-light', 'maximize');
    
    trafficLights.append(closeBtn, minimizeBtn, maximizeBtn);
    
    // Add empty title bar (no text)
    const titleBar = document.createElement('div');
    titleBar.classList.add('title-bar');
    // No text content set
    
    ideHeader.append(trafficLights, titleBar);
    this.container.appendChild(ideHeader);
    
    // Create a content area div to hold all the other content
    const contentArea = document.createElement('div');
    contentArea.classList.add('content-area');
    this.container.appendChild(contentArea);
    
    // Store the content area for later use
    this.contentArea = contentArea;

    // Modified hover effect to avoid pushing content out of view
    this.container.addEventListener('mouseenter', () => {
      this.container.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
      this.container.style.borderColor = 'var(--container-hover-border)';
    });
    this.container.addEventListener('mouseleave', () => {
      this.container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
      this.container.style.borderColor = 'var(--container-border)';
    });
  }

  private addHeader(): void {
    const header = document.createElement('header');
    header.classList.add('scroll-element');

    const title = document.createElement('h1');
    title.textContent = '0xZKnw';

    const subtitle = document.createElement('h2');
    subtitle.textContent = 'Developper | Blockchain Enthusiast';

    header.append(title, subtitle);
    this.contentArea.appendChild(header);
  }

  private addAboutSection(): void {
    const aboutSection = document.createElement('section');
    aboutSection.classList.add('scroll-element');
    aboutSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'About me:';

    const paragraph = document.createElement('p');
    paragraph.textContent = "Computer science student passionate about blockchain, cryptography and developpement. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";

    aboutSection.append(heading, paragraph);
    this.contentArea.appendChild(aboutSection);
  }

  private addProjectsSection(): void {
    const projectsSection = document.createElement('section');
    projectsSection.classList.add('scroll-element');
    projectsSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'My Projects:';

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
      card.addEventListener('click', () => card.classList.toggle('expanded'));

      return card;
    };

    const Nexa = createCard(
      'Nexa',
      'Decentralized messaging service with sockets.',
      `<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>
messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)`,
      "Developed with a team of four in Python. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>"
    );

    const anovlt = createCard(
      'AnoVlt',
      'Encrypt your messages asymmetrically.',
      `<span class='keyword'>import</span> <span class='string'>'eciesgo'</span>
<span class='keyword'>func</span> <span class='function'>anovlt</span>(pub <span class='keyword'>string</span>) *<span class='function'>eciesgo</span>.secrets {
    <span class='keyword'>return</span> eciesgo.<span class='function'>Encrypt</span>(pub, <span class='string'>'secrets.zip'</span>)
}`,
      "Developed solo in Python. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>"
    );

    const ZKnwMe = createCard(
      '0xZKnw.me',
      'This Website.',
      `<span class='keyword'>import</span> axios;
axios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);`,
      "Developed solo in TypeScript. GitHub: <a href='https://github.com/0xZKnw/0xzknw.me'>0xZKnw.me</a>"
    );

    const PwdMng = createCard(
      'PwdMng',
      'A password manager with ecies encryption.',
      `<span class='keyword'>import</span> cryptography
<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):
    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)`,
      'Developed solo in Python. GitHub: <a href="https://github.com/0xZKnw/PwdMng">PwdMng</a>'
    );

    projectsContainer.append(Nexa, PwdMng, ZKnwMe, anovlt);
    projectsSection.append(heading, projectsContainer);
    this.contentArea.appendChild(projectsSection);
  }

  private addContactSection(): void {
    const contactSection = document.createElement('section');
    contactSection.classList.add('scroll-element');
    contactSection.style.textAlign = 'center';

    const heading = document.createElement('h3');
    heading.textContent = 'Contact';

    const iconsContainer = document.createElement('div');
    iconsContainer.style.display = 'flex';
    iconsContainer.style.justifyContent = 'center';
    iconsContainer.style.gap = '20px';
    iconsContainer.style.marginTop = '10px';

    const createIconLink = (href: string, imgSrc: string, altText: string): HTMLAnchorElement => {
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';

      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = altText;
      img.style.width = '32px';
      img.style.height = '32px';
      img.classList.add('social-icon');

      link.appendChild(img);
      return link;
    };

    const discordIcon = createIconLink('https://discord.com/users/0xZKnw', './img/discord.svg', 'Discord');
    const githubIcon = createIconLink('https://github.com/0xZKnw', './img/github.svg', 'GitHub');
    const twitterIcon = createIconLink('https://twitter.com/0xZKnw', './img/x.svg', 'Twitter');
    const linkedinIcon = createIconLink('https://www.linkedin.com/in/justin-olivier-1a6b0a31a/', './img/linkedin.svg', 'LinkedIn');

    iconsContainer.append(discordIcon, githubIcon, twitterIcon, linkedinIcon);
    contactSection.append(heading, iconsContainer);
    this.contentArea.appendChild(contactSection);
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-appear');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.scroll-element').forEach(element => {
      observer.observe(element);
    });
  }
}

new Portfolio();