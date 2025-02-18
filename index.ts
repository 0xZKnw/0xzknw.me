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
    document.body.style.background =
      'linear-gradient(135deg, #0d1117 0%, #010409 100%)';
    document.body.style.margin = '0';
    document.body.style.fontFamily = '"Fira Code", Consolas, "Courier New", monospace';
    document.body.style.fontSize = '16px';
    document.documentElement.style.scrollBehavior = 'smooth';

    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      body::-webkit-scrollbar {
        display: none;
      }
      body {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .ide-container::-webkit-scrollbar {
        display: none;
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
      .ide-header .close {
        background-color: #FF5F56;
      }
      .ide-header .minimize {
        background-color: #FFBD2E;
      }
      .ide-header .maximize {
        background-color: #27C93F;
      }
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
      .project-card {
        flex: 1 1 45%;
        background-color: #2d2d2d;
        padding: 20px;
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
      .project-card h4 {
        color: #8abeb7;
        margin: 0 0 10px 0;
      }
      .project-card p {
        font-size: 0.95em;
        color: #c5c8c6;
        line-height: 1.4;
      }
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
      .project-details a:hover {
        text-decoration: underline;
      }
      .code-snippet {
        background: #1e1e1e;
        border-radius: 4px;
        padding: 10px;
        margin-top: 10px;
        font-family: "Fira Code", monospace;
        font-size: 0.9em;
        overflow-x: auto;
      }
      .code-snippet .keyword { color: #569cd6; }
      .code-snippet .string { color: #ce9178; }
      .code-snippet .function { color: #dcdcaa; }
      .code-snippet .comment { color: #6a9955; }
      .scroll-element {
        opacity: 0;
        transform: translateY(20px);
      }
      .animate-appear {
        animation: fadeIn 0.8s ease forwards;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes startupAnimation {
        0% {
          opacity: 0;
          transform: scale(0.8) rotateX(10deg);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotateX(0deg);
        }
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
        .project-card {
          flex: 1 1 100%;
        }
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
    subtitle.textContent = 'Developper | Blockchain Enthusiast';

    header.appendChild(title);
    header.appendChild(subtitle);
    this.container.appendChild(header);
  }

  private addAboutSection(): void {
    const aboutSection = document.createElement('section');
    aboutSection.classList.add('scroll-element');
    aboutSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'About me :';

    const paragraph = document.createElement('p');
    paragraph.textContent = "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";

    aboutSection.appendChild(heading);
    aboutSection.appendChild(paragraph);
    this.container.appendChild(aboutSection);
  }

  private addProjectsSection(): void {
    const projectsSection = document.createElement('section');
    projectsSection.classList.add('scroll-element');
    projectsSection.style.textAlign = 'left';

    const heading = document.createElement('h3');
    heading.textContent = 'My Projects :';

    const projectsContainer = document.createElement('div');
    projectsContainer.style.display = 'flex';
    projectsContainer.style.flexWrap = 'wrap';
    projectsContainer.style.gap = '60px';
    projectsContainer.style.justifyContent = 'space-around';
    projectsContainer.style.marginTop = '10px';

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');

    const projectTitle = document.createElement('h4');
    projectTitle.textContent = 'Nexa';

    const projectDesc = document.createElement('p');
    projectDesc.textContent = "Decentralized messaging service.";

    const projectDetails = document.createElement('div');
    projectDetails.classList.add('project-details');
    projectDetails.innerHTML = "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>";

    const codeSnippet = document.createElement('pre');
    codeSnippet.classList.add('code-snippet');
    codeSnippet.innerHTML = "<span class='comment'>// Initializing the messaging service</span>\n<span class='keyword'>const</span> messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>);";

    projectCard.appendChild(projectTitle);
    projectCard.appendChild(projectDesc);
    projectCard.appendChild(codeSnippet);
    projectCard.appendChild(projectDetails);

    projectCard.addEventListener('click', () => {
      projectCard.classList.toggle('expanded');
    });
    projectsContainer.appendChild(projectCard);

    const projectCard2 = document.createElement('div');
    projectCard2.classList.add('project-card');

    const projectTitle2 = document.createElement('h4');
    projectTitle2.textContent = 'Test Blockchain in Python';

    const projectDesc2 = document.createElement('p');
    projectDesc2.textContent = "Creating a simple blockchain.";

    const projectDetails2 = document.createElement('div');
    projectDetails2.classList.add('project-details');
    projectDetails2.innerHTML = "Developed solo. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>";

    const codeSnippet2 = document.createElement('pre');
    codeSnippet2.classList.add('code-snippet');
    codeSnippet2.innerHTML = "<span class='comment'># Initializing the blockchain</span>\n<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():\n    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]";

    projectCard2.appendChild(projectTitle2);
    projectCard2.appendChild(projectDesc2);
    projectCard2.appendChild(codeSnippet2);
    projectCard2.appendChild(projectDetails2);

    projectCard2.addEventListener('click', () => {
      projectCard2.classList.toggle('expanded');
    });
    projectsContainer.appendChild(projectCard2);

    projectsSection.appendChild(heading);
    projectsSection.appendChild(projectsContainer);
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

    contactSection.appendChild(heading);
    contactSection.appendChild(paragraph);
    this.container.appendChild(contactSection);
  }

  private initScrollAnimations(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-appear');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.scroll-element').forEach(element => {
      observer.observe(element);
    });
  }
}

new Portfolio();
