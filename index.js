var Portfolio = /** @class */ (function () {
    function Portfolio() {
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
    Portfolio.prototype.applyGlobalStyles = function () {
        if (!document.head.querySelector("meta[name='viewport']")) {
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(meta);
        }
        document.body.style.cssText = "\n      margin: 0;\n      font-family: 'Ubuntu', monospace;\n      font-size: 16px;\n      background: linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%);\n    ";
        var style = document.createElement('style');
        style.textContent = "\n      html {\n        scroll-behavior: smooth;\n      }\n      ::-webkit-scrollbar {\n        display: none;\n      }\n      body {\n        -ms-overflow-style: none;\n        scrollbar-width: none;\n      }\n      .ide-container {\n        background-color: #252a34;\n        padding: 40px 60px 30px;\n        border-radius: 6px;\n        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);\n        max-width: 1280px;\n        width: 80vw;\n        aspect-ratio: 16 / 9;\n        overflow: auto;\n        margin: 80px auto;\n        border: 1px solid #3a3f51;\n        transition: transform 0.3s ease, box-shadow 0.3s ease;\n        display: flex;\n        flex-direction: column;\n        position: relative;\n      }\n      .ide-container:hover {\n        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);\n      }\n      .ide-header {\n        background: #3a3f51;\n        height: 25px;\n        border-top-left-radius: 0;\n        border-top-right-radius: 0;\n        display: flex;\n        align-items: center;\n        justify-content: flex-end;\n        padding: 0 10px;\n        position: absolute;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 10;\n      }\n      .ide-header div {\n        width: 12px;\n        height: 12px;\n        border-radius: 50%;\n        margin-left: 5px;\n      }\n      .ide-header .close { background-color: #ff5f56; }\n      .ide-header .minimize { background-color: #ffbd2e; }\n      .ide-header .maximize { background-color: #27c93f; }\n      header {\n        border-bottom: 1px solid #3a3f51;\n        padding-bottom: 10px;\n        margin-top: 40px;\n      }\n      header h1, header h2 {\n        color: #d8dee9;\n        margin: 0;\n        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);\n      }\n      header h2 {\n        font-size: 0.85em;\n        color: #8abeb7;\n        margin-top: 5px;\n      }\n      section {\n        margin-bottom: 30px;\n      }\n      section h3 {\n        color: #d8dee9;\n        border-bottom: 1px solid #3a3f51;\n        padding-bottom: 5px;\n        margin-bottom: 15px;\n      }\n      section p {\n        color: #c5c8c6;\n        line-height: 1.5;\n      }\n      .projects-container {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 40px;\n        justify-content: space-around;\n        margin-top: 10px;\n      }\n      .project-card {\n        flex: 1 1 40%;\n        background-color: #2b3240;\n        padding: 10px;\n        border-radius: 4px;\n        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n        transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;\n        border: 1px solid #3a3f51;\n      }\n      .project-card:hover {\n        transform: translateY(-3px) scale(1.03);\n        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);\n        border-color: #8abeb7;\n      }\n      .project-card h4 { color: #8abeb7; margin-bottom: 10px; }\n      .project-card p { font-size: 0.95em; color: #c5c8c6; line-height: 1.4; }\n      .project-details {\n        max-height: 0;\n        overflow: hidden;\n        opacity: 0;\n        transition: max-height 0.5s ease, opacity 0.5s ease;\n        font-size: 0.9em;\n        margin-top: 10px;\n        color: #c5c8c6;\n      }\n      .project-card.expanded .project-details {\n        max-height: 400px;\n        opacity: 1;\n      }\n      .project-details a {\n        color: #81a2be;\n        text-decoration: none;\n      }\n      .project-details a:hover { text-decoration: underline; }\n      .code-snippet {\n        background: #1e1e1e;\n        color: #e6e6e6;\n        border-radius: 4px;\n        padding: 10px;\n        margin-top: 10px;\n        font-family: 'Gill Sans', monospace;\n        font-size: 0.9em;\n        overflow-x: auto;\n      }\n      .code-snippet .keyword { color: #f92672; }\n      .code-snippet .string { color: #e6db74; }\n      .code-snippet .function { color: #a6e22e; }\n      .code-snippet .comment { display: none; }\n      .scroll-element {\n        opacity: 0;\n        transform: translateY(20px);\n      }\n      .animate-appear {\n        animation: fadeIn 0.8s ease forwards;\n      }\n      @keyframes fadeIn {\n        from { opacity: 0; transform: translateY(20px); }\n        to { opacity: 1; transform: translateY(0); }\n      }\n      @keyframes startupAnimation {\n        0% { opacity: 0; transform: scale(0.8) rotateX(10deg); }\n        100% { opacity: 1; transform: scale(1) rotateX(0deg); }\n      }\n      .startup {\n        animation: startupAnimation 1s ease-out forwards;\n      }\n      /* Splash Screen Styles */\n      #splash-screen {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background: linear-gradient(135deg, #1d2b64 0%, #f8cdda 100%);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 9999;\n      }\n      #splash-screen div {\n        font-family: 'Ubuntu', monospace;\n        font-size: 3em;\n        color: #d8dee9;\n      }\n      .splash-out {\n        animation: splashOut 1s ease forwards;\n      }\n      @keyframes splashOut {\n        0% { opacity: 1; transform: scale(1); }\n        100% { opacity: 0; transform: scale(0.9); }\n      }\n      @media (max-width: 600px) {\n        body {\n          font-family: 'Ubuntu', monospace;\n          font-size: 15px;\n        }\n        .ide-container {\n          width: 95vw;\n          padding: 20px 30px;\n          margin: 20px auto;\n          aspect-ratio: auto;\n          box-sizing: border-box;\n        }\n        header h1 {\n          font-size: 1.5em;\n        }\n        header h2 {\n          font-size: 1em;\n        }\n        section h3 {\n          font-size: 1.2em;\n        }\n        .project-card { flex: 1 1 100%; }\n      }\n    ";
        document.head.appendChild(style);
    };
    Portfolio.prototype.showSplashScreen = function () {
        var splash = document.createElement('div');
        splash.id = 'splash-screen';
        var pseudo = document.createElement('div');
        pseudo.textContent = '0xZKnw';
        splash.appendChild(pseudo);
        document.body.appendChild(splash);
        // Après 2 secondes, on lance l'animation de disparition
        setTimeout(function () {
            splash.classList.add('splash-out');
            splash.addEventListener('animationend', function () {
                splash.remove();
            });
        }, 2000);
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
        paragraph.textContent = "Computer science student, passionate about development and blockchains. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";
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
        var Nexa = createCard('Nexa', 'Decentralized messaging service.', "<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>\nmessaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)", "Developed in Python with a team of four. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>");
        var BC_Test = createCard('Test Blockchain in Python', 'Creating a simple blockchain.', "<span class='keyword'>def</span> <span class='function'>create_blockchain</span>():\n    <span class='keyword'>return</span> [<span class='string'>'genesis block'</span>]", "Developed solo in Python. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>");
        var ZKnwMe = createCard('0xZKnw.me', 'This Website', "<span class='keyword'>import</span> axios;\naxios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);", "Developed solo in TypeScript. GitHub: <a href='https://github.com/0xZKnw/0xzknw.me'>0xZKnw.me</a>");
        var PwdMng = createCard('PwdMng', 'A password manager made in Python.', "<span class='keyword'>import</span> cryptography\n<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):\n    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)", 'Developed solo in Python. GitHub: <a href="https://github.com/0xZKnw/PwdMng">PwdMng</a>');
        projectsContainer.append(Nexa, PwdMng, ZKnwMe, BC_Test);
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
        var attention = document.createElement('p');
        attention.textContent = "This site is better viewed on a desktop.";
        contactSection.append(heading, paragraph, attention);
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
