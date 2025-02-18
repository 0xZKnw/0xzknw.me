var Portfolio = /** @class */ (function () {
    function Portfolio() {
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
    Portfolio.prototype.applyGlobalStyles = function () {
        document.body.style.background =
            'linear-gradient(135deg, #0d1117 0%, #010409 100%)';
        document.body.style.margin = '0';
        document.body.style.fontFamily = '"Fira Code", Consolas, "Courier New", monospace';
        document.body.style.fontSize = '16px';
        document.documentElement.style.scrollBehavior = 'smooth';
        var style = document.createElement('style');
        style.textContent = "\n      html {\n        scroll-behavior: smooth;\n      }\n      body::-webkit-scrollbar {\n        display: none;\n      }\n      body {\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n      }\n      .ide-container::-webkit-scrollbar {\n        display: none;\n      }\n      .ide-container {\n        background-color: #1e1e1e;\n        padding: 40px 60px 30px;\n        border-radius: 6px;\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n        max-width: 1280px;\n        width: 80vw;\n        aspect-ratio: 16 / 9;\n        overflow: auto;\n        margin: 80px auto;\n        border: 1px solid #333;\n        transition: transform 0.3s ease;\n        display: flex;\n        flex-direction: column;\n        position: relative;\n      }\n      .ide-header {\n        background: #333;\n        height: 25px;\n        border-top-left-radius: 6px;\n        border-top-right-radius: 6px;\n        display: flex;\n        align-items: center;\n        padding: 0 10px;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 10;\n      }\n      .ide-header div {\n        width: 12px;\n        height: 12px;\n        border-radius: 50%;\n        margin-right: 5px;\n      }\n      .ide-header .close {\n        background-color: #FF5F56;\n      }\n      .ide-header .minimize {\n        background-color: #FFBD2E;\n      }\n      .ide-header .maximize {\n        background-color: #27C93F;\n      }\n      header {\n        border-bottom: 1px solid #333;\n        padding-bottom: 10px;\n        margin-top: 40px;\n      }\n      header h1, header h2 {\n        color: #c5c8c6;\n        margin: 0;\n      }\n      header h2 {\n        font-size: 0.85em;\n        color: #8abeb7;\n        margin-top: 5px;\n      }\n      section {\n        margin-bottom: 30px;\n      }\n      section h3 {\n        color: #c5c8c6;\n        border-bottom: 1px solid #333;\n        padding-bottom: 5px;\n        margin-bottom: 15px;\n      }\n      section p {\n        color: #c5c8c6;\n        line-height: 1.5;\n      }\n      .project-card {\n        flex: 1 1 45%;\n        background-color: #2d2d2d;\n        padding: 20px;\n        border-radius: 4px;\n        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n        border: 1px solid #333;\n      }\n      .project-card:hover {\n        transform: scale(1.03);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);\n      }\n      .project-card h4 {\n        color: #8abeb7;\n        margin: 0 0 10px 0;\n      }\n      .project-card p {\n        font-size: 0.95em;\n        color: #c5c8c6;\n        line-height: 1.4;\n      }\n      .project-details {\n        max-height: 0;\n        overflow: hidden;\n        opacity: 0;\n        transition: max-height 0.5s ease, opacity 0.5s ease;\n        font-size: 0.9em;\n        margin-top: 10px;\n        color: #c5c8c6;\n      }\n      .project-card.expanded .project-details {\n        max-height: 400px;\n        opacity: 1;\n      }\n      .project-details a {\n        color: #81a2be;\n        text-decoration: none;\n      }\n      .project-details a:hover {\n        text-decoration: underline;\n      }\n      .code-snippet {\n        background: #1e1e1e;\n        border-radius: 4px;\n        padding: 10px;\n        margin-top: 10px;\n        font-family: \"Fira Code\", monospace;\n        font-size: 0.9em;\n        overflow-x: auto;\n      }\n      .code-snippet .keyword { color: #569cd6; }\n      .code-snippet .string { color: #ce9178; }\n      .code-snippet .function { color: #dcdcaa; }\n      .code-snippet .comment { color: #6a9955; }\n      .scroll-element {\n        opacity: 0;\n        transform: translateY(20px);\n      }\n      .animate-appear {\n        animation: fadeIn 0.8s ease forwards;\n      }\n      @keyframes fadeIn {\n        from {\n          opacity: 0;\n          transform: translateY(20px);\n        }\n        to {\n          opacity: 1;\n          transform: translateY(0);\n        }\n      }\n      @keyframes startupAnimation {\n        0% {\n          opacity: 0;\n          transform: scale(0.8) rotateX(10deg);\n        }\n        100% {\n          opacity: 1;\n          transform: scale(1) rotateX(0deg);\n        }\n      }\n      .startup {\n        animation: startupAnimation 1s ease-out forwards;\n      }\n      @media (max-width: 600px) {\n        .ide-container {\n          width: 95vw;\n          aspect-ratio: auto;\n          min-height: auto;\n          max-height: none;\n          padding: 20px 30px;\n          margin: 20px auto;\n        }\n        .project-card {\n          flex: 1 1 100%;\n        }\n      }\n    ";
        document.head.appendChild(style);
    };
    Portfolio.prototype.createContainer = function () {
        var _this = this;
        this.container = document.createElement('div');
        this.container.classList.add('ide-container');
        var ideHeader = document.createElement('div');
        ideHeader.classList.add('ide-header');
        ['close', 'minimize', 'maximize'].forEach(function (type) {
            var circle = document.createElement('div');
            circle.classList.add(type);
            ideHeader.appendChild(circle);
        });
        this.container.appendChild(ideHeader);
        this.container.addEventListener('mouseenter', function () {
            _this.container.style.transform = 'scale(1.02)';
        });
        this.container.addEventListener('mouseleave', function () {
            _this.container.style.transform = 'scale(1)';
        });
    };
    Portfolio.prototype.addHeader = function () {
        var header = document.createElement('header');
        header.classList.add('scroll-element');
        var title = document.createElement('h1');
        title.textContent = '0xZKnw';
        var subtitle = document.createElement('h2');
        subtitle.textContent = 'Developper | Blockchain Enthusiast';
        header.appendChild(title);
        header.appendChild(subtitle);
        this.container.appendChild(header);
    };
    Portfolio.prototype.addAboutSection = function () {
        var aboutSection = document.createElement('section');
        aboutSection.classList.add('scroll-element');
        aboutSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'About me :';
        var paragraph = document.createElement('p');
        paragraph.textContent = "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";
        aboutSection.appendChild(heading);
        aboutSection.appendChild(paragraph);
        this.container.appendChild(aboutSection);
    };
    Portfolio.prototype.addProjectsSection = function () {
        var projectsSection = document.createElement('section');
        projectsSection.classList.add('scroll-element');
        projectsSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'My Projects :';
        var projectsContainer = document.createElement('div');
        projectsContainer.style.display = 'flex';
        projectsContainer.style.flexWrap = 'wrap';
        projectsContainer.style.gap = '60px';
        projectsContainer.style.justifyContent = 'space-around';
        projectsContainer.style.marginTop = '10px';
        var projectCard = document.createElement('div');
        projectCard.classList.add('project-card');
        var projectTitle = document.createElement('h4');
        projectTitle.textContent = 'Nexa';
        var projectDesc = document.createElement('p');
        projectDesc.textContent = "Decentralized messaging service.";
        var projectDetails = document.createElement('div');
        projectDetails.classList.add('project-details');
        projectDetails.innerHTML = "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>";
        var codeSnippet = document.createElement('pre');
        codeSnippet.classList.add('code-snippet');
        codeSnippet.innerHTML = "<span class='comment'>// Initializing the messaging service</span>\n<span class='keyword'>const</span> messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>);";
        projectCard.appendChild(projectTitle);
        projectCard.appendChild(projectDesc);
        projectCard.appendChild(codeSnippet);
        projectCard.appendChild(projectDetails);
        projectCard.addEventListener('click', function () {
            projectCard.classList.toggle('expanded');
        });
        projectsContainer.appendChild(projectCard);
        var projectCard2 = document.createElement('div');
        projectCard2.classList.add('project-card');
        var projectTitle2 = document.createElement('h4');
        projectTitle2.textContent = 'Test Blockchain in Python';
        var projectDesc2 = document.createElement('p');
        projectDesc2.textContent = "Creating a simple blockchain.";
        var projectDetails2 = document.createElement('div');
        projectDetails2.classList.add('project-details');
        projectDetails2.innerHTML = "Developed solo. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>";
        var codeSnippet2 = document.createElement('pre');
        codeSnippet2.classList.add('code-snippet');
        codeSnippet2.innerHTML = "<span class='comment'># Initializing the blockchain</span>\n<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():\n    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]";
        projectCard2.appendChild(projectTitle2);
        projectCard2.appendChild(projectDesc2);
        projectCard2.appendChild(codeSnippet2);
        projectCard2.appendChild(projectDetails2);
        projectCard2.addEventListener('click', function () {
            projectCard2.classList.toggle('expanded');
        });
        projectsContainer.appendChild(projectCard2);
        projectsSection.appendChild(heading);
        projectsSection.appendChild(projectsContainer);
        this.container.appendChild(projectsSection);
    };
    Portfolio.prototype.addContactSection = function () {
        var contactSection = document.createElement('section');
        contactSection.classList.add('scroll-element');
        contactSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'Contact';
        var paragraph = document.createElement('p');
        paragraph.textContent = "Discord: 0xZKnw  |  GitHub: 0xZKnw  |  Twitter: 0xZKnw";
        contactSection.appendChild(heading);
        contactSection.appendChild(paragraph);
        this.container.appendChild(contactSection);
    };
    Portfolio.prototype.initScrollAnimations = function () {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-appear');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        document.querySelectorAll('.scroll-element').forEach(function (element) {
            observer.observe(element);
        });
    };
    return Portfolio;
}());
new Portfolio();
