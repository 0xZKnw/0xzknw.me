class Portfolio {
  private container: HTMLDivElement;

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
      font-family: 'Ubuntu', monospace;
      font-size: 16px;
      background: linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%);
    `;

    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      ::-webkit-scrollbar {
        display: none;
      }
      body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .ide-container {
        background-color: #252a34;
        padding: 40px 60px 30px;
        border-radius: 6px;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
        max-width: 1280px;
        width: 80vw;
        aspect-ratio: 16 / 9;
        overflow: auto;
        margin: 80px auto;
        border: 1px solid #3a3f51;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .ide-container:hover {
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
      }
      .ide-header {
        background: #3a3f51;
        height: 25px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 10px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 10;
      }
      .ide-header div {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-left: 5px;
      }
      .ide-header .close { background-color: #ff5f56; }
      .ide-header .minimize { background-color: #ffbd2e; }
      .ide-header .maximize { background-color: #27c93f; }
      header {
        border-bottom: 1px solid #3a3f51;
        padding-bottom: 10px;
        margin-top: 40px;
      }
      header h1, header h2 {
        color: #d8dee9;
        margin: 0;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
      }
      header h2 {
        font-size: 0.85em;
        color: #8abeb7;
        margin-top: 5px;
      }
      section {
        margin-bottom: 30px;
      }
      section h3 {
        color: #d8dee9;
        border-bottom: 1px solid #3a3f51;
        padding-bottom: 5px;
        margin-bottom: 15px;
      }
      section p {
        color: #c5c8c6;
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
        background-color: #2b3240;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
        border: 1px solid #3a3f51;
      }
      .project-card:hover {
        transform: translateY(-3px) scale(1.03);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
        border-color: #8abeb7;
      }
      .project-card h4 { color: #8abeb7; margin-bottom: 10px; }
      .project-card p { font-size: 0.95em; color: #c5c8c6; line-height: 1.4; }
      .project-details {
        max-height: 0;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.5s ease, opacity 0.5s ease;
        font-size: 0.9em;
        margin-top: 10px;
        color: #c5c8c6;
      }
      .project-card.expanded .project-details {
        max-height: 400px;
        opacity: 1;
      }
      .project-details a {
        color: #81a2be;
        text-decoration: none;
      }
      .project-details a:hover { text-decoration: underline; }
      .code-snippet {
        background: #1e1e1e;
        color: #e6e6e6;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        font-family: 'Gill Sans', monospace;
        font-size: 0.9em;
        overflow-x: auto;
      }
      .code-snippet .keyword { color: #f92672; }
      .code-snippet .string { color: #e6db74; }
      .code-snippet .function { color: #a6e22e; }
      .code-snippet .comment { display: none; }
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
        0% { opacity: 0; transform: scale(0.8) rotateX(10deg); }
        100% { opacity: 1; transform: scale(1) rotateX(0deg); }
      }
      .startup {
        animation: startupAnimation 1s ease-out forwards;
      }
      /* Splash Screen Styles */
      #splash-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
      }
      #splash-screen div {
        font-family: 'Ubuntu', monospace;
        font-size: 3em;
        color: #d8dee9;
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
          font-family: 'Ubuntu', monospace;
          font-size: 15px;
        }
        .ide-container {
          width: 95vw;
          padding: 20px 30px;
          margin: 20px auto;
          aspect-ratio: auto;
          box-sizing: border-box;
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
        .project-card { flex: 1 1 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  private showSplashScreen(): void {
    const splash = document.createElement('div');
    splash.id = 'splash-screen';

    const pseudo = document.createElement('div');
    pseudo.textContent = '0xZKnw';

    splash.appendChild(pseudo);
    document.body.appendChild(splash);

    // Après 2 secondes, on lance l'animation de disparition
    setTimeout(() => {
      splash.classList.add('splash-out');
      splash.addEventListener('animationend', () => {
        splash.remove();
      });
    }, 2000);
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.classList.add('ide-container');

    const ideHeader = document.createElement('div');
    ideHeader.classList.add('ide-header');
    ['close', 'minimize', 'maximize'].forEach(type => {
      const circle = document.createElement('div');
      circle.classList.add(type);
      ideHeader.appendChild(circle);
    });
    this.container.appendChild(ideHeader);

    this.container.addEventListener('mouseenter', () => {
      this.container.style.transform = 'scale(1.02)';
    });
    this.container.addEventListener('mouseleave', () => {
      this.container.style.transform = 'scale(1)';
    });
  }

  private addHeader(): void {
    const header = document.createElement('header');
    header.classList.add('scroll-element');

    const title = document.createElement('h1');
    title.textContent = '0xZKnw';

    const subtitle = document.createElement('h2');
    subtitle.textContent = 'Developer | Blockchain Enthusiast';

    header.append(title, subtitle);
    this.container.appendChild(header);
  }

  private addAboutSection(): void {
    const aboutSection = document.createElement('section');
    aboutSection.classList.add('scroll-element');
    aboutSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'About me:';

    const paragraph = document.createElement('p');
    paragraph.textContent = "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";

    aboutSection.append(heading, paragraph);
    this.container.appendChild(aboutSection);
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
      'Decentralized messaging service.',
      `<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>
messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)`,
      "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>"
    );

    const BC_Test = createCard(
      'Test Blockchain in Python',
      'Creating a simple blockchain.',
      `<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():
    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]`,
      "Developed solo in Python. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>"
    );

    const ZKnwMe = createCard(
      '0xZKnw.me',
      'This Website',
      `<span class='keyword'>import</span> axios;
axios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);`,
      "Developed solo in TypeScript. GitHub: <a href='https://github.com/0xZKnw/0xzknw.me'>0xZKnw.me</a>"
    );

    const PwdMng = createCard(
      'PwdMng',
      'A password manager made in Python.',
      `<span class='keyword'>import</span> cryptography
<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):
    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)`,
      'Developed solo in Python. GitHub: <a href="https://github.com/0xZKnw/PwdMng">PwdMng</a>'
    );

    projectsContainer.append(Nexa, PwdMng, ZKnwMe, BC_Test);
    projectsSection.append(heading, projectsContainer);
    this.container.appendChild(projectsSection);
  }

  private addContactSection(): void {
    const contactSection = document.createElement('section');
    contactSection.classList.add('scroll-element');
    contactSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'Contact';

    const paragraph = document.createElement('p');
    paragraph.textContent = "Discord: 0xZKnw  |  GitHub: 0xZKnw  |  Twitter: 0xZKnw";

    const attention = document.createElement('p');
    attention.textContent = "This site is better viewed on a desktop.";

    contactSection.append(heading, paragraph, attention);
    this.container.appendChild(contactSection);
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