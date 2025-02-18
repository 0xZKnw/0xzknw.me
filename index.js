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
        // Styles appliqués directement au body
        document.body.style.cssText = "\n      margin: 0;\n      font-family: \"Fira Code\", Consolas, \"Courier New\", monospace;\n      font-size: 16px;\n      background: linear-gradient(135deg, #0d1117 0%, #010409 100%);\n    ";
        // Injection d'un bloc de styles globaux
        var style = document.createElement('style');
        style.textContent = "\n      html {\n        scroll-behavior: smooth;\n      }\n      /* Masquer la scrollbar */\n      ::-webkit-scrollbar {\n        display: none;\n      }\n      body {\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n      }\n      .ide-container {\n        background-color: #1e1e1e;\n        padding: 40px 60px 30px;\n        border-radius: 6px;\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);\n        max-width: 1280px;\n        width: 80vw;\n        aspect-ratio: 16 / 9;\n        overflow: auto;\n        margin: 80px auto;\n        border: 1px solid #333;\n        transition: transform 0.3s ease;\n        display: flex;\n        flex-direction: column;\n        position: relative;\n      }\n      .ide-header {\n        background: #333;\n        height: 25px;\n        border-top-left-radius: 6px;\n        border-top-right-radius: 6px;\n        display: flex;\n        align-items: center;\n        padding: 0 10px;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 10;\n      }\n      .ide-header div {\n        width: 12px;\n        height: 12px;\n        border-radius: 50%;\n        margin-right: 5px;\n      }\n      .ide-header .close { background-color: #FF5F56; }\n      .ide-header .minimize { background-color: #FFBD2E; }\n      .ide-header .maximize { background-color: #27C93F; }\n      header {\n        border-bottom: 1px solid #333;\n        padding-bottom: 10px;\n        margin-top: 40px;\n      }\n      header h1, header h2 {\n        color: #c5c8c6;\n        margin: 0;\n      }\n      header h2 {\n        font-size: 0.85em;\n        color: #8abeb7;\n        margin-top: 5px;\n      }\n      section {\n        margin-bottom: 30px;\n      }\n      section h3 {\n        color: #c5c8c6;\n        border-bottom: 1px solid #333;\n        padding-bottom: 5px;\n        margin-bottom: 15px;\n      }\n      section p {\n        color: #c5c8c6;\n        line-height: 1.5;\n      }\n      .projects-container {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 40px;\n        justify-content: space-around;\n        margin-top: 10px;\n      }\n      .project-card {\n        flex: 1 1 40%;\n        background-color: #2d2d2d;\n        padding: 10px; /* padding r\u00E9duit pour une hauteur moindre */\n        border-radius: 4px;\n        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n        border: 1px solid #333;\n      }\n      .project-card:hover {\n        transform: scale(1.03);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);\n      }\n      .project-card h4 { color: #8abeb7; margin-bottom: 10px; }\n      .project-card p { font-size: 0.95em; color: #c5c8c6; line-height: 1.4; }\n      .project-details {\n        max-height: 0;\n        overflow: hidden;\n        opacity: 0;\n        transition: max-height 0.5s ease, opacity 0.5s ease;\n        font-size: 0.9em;\n        margin-top: 10px;\n        color: #c5c8c6;\n      }\n      .project-card.expanded .project-details {\n        max-height: 400px;\n        opacity: 1;\n      }\n      .project-details a {\n        color: #81a2be;\n        text-decoration: none;\n      }\n      .project-details a:hover { text-decoration: underline; }\n      .code-snippet {\n        background: #272822;\n        color: #F8F8F2;\n        border-radius: 4px;\n        padding: 10px;\n        margin-top: 10px;\n        font-family: \"Fira Code\", monospace;\n        font-size: 0.9em;\n        overflow-x: auto;\n      }\n      .code-snippet .keyword { color: #F92672; }\n      .code-snippet .string { color: #E6DB74; }\n      .code-snippet .function { color: #A6E22E; }\n      .code-snippet .comment { color: #75715E; }\n      .scroll-element {\n        opacity: 0;\n        transform: translateY(20px);\n      }\n      .animate-appear {\n        animation: fadeIn 0.8s ease forwards;\n      }\n      @keyframes fadeIn {\n        from { opacity: 0; transform: translateY(20px); }\n        to { opacity: 1; transform: translateY(0); }\n      }\n      @keyframes startupAnimation {\n        0% { opacity: 0; transform: scale(0.8) rotateX(10deg); }\n        100% { opacity: 1; transform: scale(1) rotateX(0deg); }\n      }\n      .startup {\n        animation: startupAnimation 1s ease-out forwards;\n      }\n      @media (max-width: 600px) {\n        .ide-container {\n          width: 95vw;\n          aspect-ratio: auto;\n          min-height: auto;\n          max-height: none;\n          padding: 20px 30px;\n          margin: 20px auto;\n        }\n        .project-card { flex: 1 1 100%; }\n      }\n    ";
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
        // Effet de survol
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
        subtitle.textContent = 'Developer | Blockchain Enthusiast';
        header.append(title, subtitle);
        this.container.appendChild(header);
    };
    Portfolio.prototype.addAboutSection = function () {
        var aboutSection = document.createElement('section');
        aboutSection.classList.add('scroll-element');
        aboutSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'About me:';
        var paragraph = document.createElement('p');
        paragraph.textContent =
            "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";
        aboutSection.append(heading, paragraph);
        this.container.appendChild(aboutSection);
    };
    Portfolio.prototype.addProjectsSection = function () {
        var projectsSection = document.createElement('section');
        projectsSection.classList.add('scroll-element');
        projectsSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'My Projects:';
        var projectsContainer = document.createElement('div');
        projectsContainer.classList.add('projects-container');
        var createCard = function (titleText, descText, codeHTML, detailsHTML) {
            var card = document.createElement('div');
            card.classList.add('project-card');
            var title = document.createElement('h4');
            title.textContent = titleText;
            var desc = document.createElement('p');
            desc.textContent = descText;
            var codeSnippet = document.createElement('pre');
            codeSnippet.classList.add('code-snippet');
            codeSnippet.innerHTML = codeHTML;
            var details = document.createElement('div');
            details.classList.add('project-details');
            details.innerHTML = detailsHTML;
            card.append(title, desc, codeSnippet, details);
            card.addEventListener('click', function () { return card.classList.toggle('expanded'); });
            return card;
        };
        // Projet Nexa
        var card1 = createCard('Nexa', 'Decentralized messaging service.', "<span class='comment'>// Initializing Nexa</span>\n<span class='keyword'>const</span> messaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>);", "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>");
        // Projet Test Blockchain in Python
        var card2 = createCard('Test Blockchain in Python', 'Creating a simple blockchain.', "<span class='comment'># Initializing the blockchain</span>\n<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():\n    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]", "Developed solo. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>");
        // Projet Template (nouveau projet)
        var card3 = createCard('0xZKnw.me', 'This Website', "<span class='comment'>// Initializing 0xZKnw.me</span>\n<span class='keyword'>import</span> <span>axios</span>;\n<span>axios</span>.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);", "Template project developed for demonstration purposes. GitHub: <a href='#'>TemplateRepo</a>");
        projectsContainer.append(card1, card2, card3);
        projectsSection.append(heading, projectsContainer);
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
        contactSection.append(heading, paragraph);
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
