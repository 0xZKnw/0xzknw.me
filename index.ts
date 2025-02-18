class Portfolio {
  private container: HTMLDivElement;

  constructor() {
    this.applyGlobalStyles();
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
    // Styles appliqués directement au body
    document.body.style.cssText = `
      margin: 0;
      font-family: "Fira Code", Consolas, "Courier New", monospace;
      font-size: 16px;
      background: linear-gradient(135deg, #0d1117 0%, #010409 100%);
    `;

    // Injection d'un bloc de styles globaux
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      /* Masquer la scrollbar */
      ::-webkit-scrollbar {
        display: none;
      }
      body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .ide-container {
        background-color: #1e1e1e;
        padding: 40px 60px 30px;
        border-radius: 6px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        max-width: 1280px;
        width: 80vw;
        aspect-ratio: 16 / 9;
        overflow: auto;
        margin: 80px auto;
        border: 1px solid #333;
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .ide-header {
        background: #333;
        height: 25px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
        display: flex;
        align-items: center;
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
        margin-right: 5px;
      }
      .ide-header .close { background-color: #FF5F56; }
      .ide-header .minimize { background-color: #FFBD2E; }
      .ide-header .maximize { background-color: #27C93F; }
      header {
        border-bottom: 1px solid #333;
        padding-bottom: 10px;
        margin-top: 40px;
      }
      header h1, header h2 {
        color: #c5c8c6;
        margin: 0;
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
        color: #c5c8c6;
        border-bottom: 1px solid #333;
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
        background-color: #2d2d2d;
        padding: 10px; /* padding réduit pour une hauteur moindre */
        border-radius: 4px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        border: 1px solid #333;
      }
      .project-card:hover {
        transform: scale(1.03);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
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
        background: #272822;
        color: #F8F8F2;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
        overflow-x: auto;
      }
      .code-snippet .keyword { color: #F92672; }
      .code-snippet .string { color: #E6DB74; }
      .code-snippet .function { color: #A6E22E; }
      .code-snippet .comment { color: #75715E; }
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
      @media (max-width: 600px) {
        .ide-container {
          width: 95vw;
          aspect-ratio: auto;
          min-height: auto;
          max-height: none;
          padding: 20px 30px;
          margin: 20px auto;
        }
        .project-card { flex: 1 1 100%; }
      }
    `;
    document.head.appendChild(style);
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

    // Effet de survol
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
    paragraph.textContent =
      "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";

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

    // Projet Nexa
    const card1 = createCard(
      'Nexa',
      'Decentralized messaging service.',
      `<span class='comment'>// Initializing Nexa</span>
<span class='keyword'>const</span> messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>);`,
      "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>"
    );

    // Projet Test Blockchain in Python
    const card2 = createCard(
      'Test Blockchain in Python',
      'Creating a simple blockchain.',
      `<span class='comment'># Initializing the blockchain</span>
<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():
    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]`,
      "Developed solo. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>"
    );

    // Projet Template (nouveau projet)
    const card3 = createCard(
      '0xZKnw.me',
      'This Website',
      `<span class='comment'>// Initializing 0xZKnw.me</span>
<span class='keyword'>import</span> <span>axios</span>;
<span>axios</span>.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);`,
      "Template project developed for demonstration purposes. GitHub: <a href='#'>TemplateRepo</a>"
    );

    projectsContainer.append(card1, card2, card3);
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

    contactSection.append(heading, paragraph);
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
