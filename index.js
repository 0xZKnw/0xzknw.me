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
        document.body.style.cssText = "\n      margin: 0;\n      font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\";\n      font-size: 16px;\n      background: #0a0a0a;\n      color: #e2e6ea;\n      overflow: hidden;\n      height: 100vh;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n    ";
        var style = document.createElement('style');
        style.textContent = "\n      :root {\n        --background-color: #0a0a0a;\n        --text-color: #e2e6ea;\n        --container-bg: #181818;\n        --container-border: #333333;\n        --container-hover-border: #444444;\n        --snippet-bg: #121212;\n        --snippet-text: #adbac7;\n        --keyword-color: #ff7b72;\n        --string-color: #a5d6ff;\n        --function-color: #d2a8ff;\n        --header-bg: #232323;\n      }\n\n      html {\n        scroll-behavior: smooth;\n        background: var(--background-color);\n        height: 100%;\n        overflow: hidden;\n      }\n      body {\n        margin: 0;\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\";\n        font-size: 16px;\n        background: var(--background-color);\n        color: var(--text-color);\n        height: 100%;\n        overflow: hidden;\n      }\n\n      .ide-container {\n        background-color: var(--container-bg);\n        padding: 0;\n        border-radius: 8px;\n        box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n        max-width: 1280px;\n        width: 85vw;\n        height: 85vh;\n        overflow-y: auto;\n        overflow-x: hidden;\n        margin: 0;\n        border: 1px solid var(--container-border);\n        transition: transform 0.2s ease, box-shadow 0.2s ease;\n        display: flex;\n        flex-direction: column;\n        position: relative;\n        scrollbar-width: none;\n        -ms-overflow-style: none;\n      }\n      \n      /* Hide scrollbar for Chrome, Safari and Opera */\n      .ide-container::-webkit-scrollbar {\n        display: none;\n      }\n      \n      .ide-container:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 4px 8px rgba(0,0,0,0.4);\n        border-color: var(--container-hover-border);\n      }\n      \n      .ide-header {\n        background: var(--header-bg);\n        height: 80px !important; /* Forcer la hauteur \u00E0 80px */\n        display: flex;\n        align-items: center;\n        padding: 0;\n        position: sticky;\n        top: 0;\n        left: 0;\n        right: 0;\n        z-index: 10;\n        border-top-left-radius: 8px;\n        border-top-right-radius: 8px;\n        border-bottom: 1px solid rgba(0, 0, 0, 0.2);\n      }\n      \n      .traffic-lights {\n        display: flex;\n        margin-left: 12px;\n        margin-right: auto;\n        margin-top: 4px;\n        margin-bottom: 4px;\n        align-items: center;\n        height: 100%;\n      }\n      \n      .traffic-light {\n        width: 10px;\n        height: 10px;\n        border-radius: 50%;\n        margin-right: 8px;\n        position: relative;\n        /* Create shadow effect for more depth */\n        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1) inset;\n      }\n      \n      .traffic-light.close {\n        background-color: #ff5f57;\n        border: 0.5px solid #e0443e;\n      }\n      \n      .traffic-light.minimize {\n        background-color: #ffbd2e;\n        border: 0.5px solid #dea123;\n      }\n      \n      .traffic-light.maximize {\n        background-color: #28c940;\n        border: 0.5px solid #1aab29;\n      }\n      \n      .traffic-light:hover::before {\n        content: \"\";\n        position: absolute;\n        top: 3.5px;\n        left: 3.5px;\n        width: 5px;\n        height: 5px;\n        opacity: 0.7;\n      }\n      \n      .traffic-light.close:hover::before {\n        content: \"\u00D7\";\n        font-size: 10px;\n        line-height: 1px;\n        text-align: center;\n        color: #4d0000;\n        opacity: 0.7;\n      }\n      \n      .traffic-light.minimize:hover::before {\n        content: \"\";\n        background: #975500;\n        height: 1px;\n        width: 8px;\n        top: 5.5px;\n        left: 2px;\n      }\n      \n      .traffic-light.maximize:hover::before {\n        content: \"\";\n        background: #006500;\n        height: 1px;\n        width: 8px;\n        top: 5.5px;\n        left: 2px;\n        box-shadow: 0 -3px 0 #006500, 0 3px 0 #006500;\n      }\n      \n      .title-bar {\n        position: absolute;\n        left: 0;\n        right: 0;\n        text-align: center;\n        color: #aaa;\n        font-size: 13px;\n        font-weight: 400;\n        pointer-events: none;\n        user-select: none;\n      }\n      \n      .content-area {\n        padding: 40px 60px 30px;\n        flex: 1;\n      }\n      \n      header {\n        border-bottom: 1px solid var(--container-border);\n        padding-bottom: 10px;\n        margin-top: 10px;\n      }\n      header h1, header h2 {\n        color: var(--text-color);\n        margin: 0;\n      }\n      header h2 {\n        font-size: 0.85em;\n        color: #8b949e;\n        margin-top: 5px;\n      }\n      section {\n        margin-bottom: 30px;\n      }\n      section h3 {\n        color: var(--text-color);\n        border-bottom: 1px solid var(--container-border);\n        padding-bottom: 5px;\n        margin-bottom: 15px;\n      }\n      section p {\n        color: #8b949e;\n        line-height: 1.5;\n      }\n      .projects-container {\n        display: flex;\n        flex-wrap: wrap;\n        gap: 40px;\n        justify-content: space-around;\n        margin-top: 10px;\n      }\n      .project-card {\n        flex: 1 1 40%;\n        background-color: var(--container-bg);\n        padding: 10px;\n        border-radius: 4px;\n        box-shadow: 0 2px 6px rgba(0,0,0,0.3);\n        cursor: pointer;\n        position: relative;\n        overflow: hidden;\n        transition: transform 0.2s ease, box-shadow 0.2s ease, border 0.2s ease;\n        border: 1px solid var(--container-border);\n      }\n      .project-card:hover {\n        transform: translateY(-2px);\n        box-shadow: 0 4px 8px rgba(0,0,0,0.4);\n        border-color: var(--container-hover-border);\n      }\n      .project-card h4 { color: var(--function-color); margin-bottom: 10px; }\n      .project-card p { font-size: 0.95em; color: #8b949e; line-height: 1.4; }\n      .project-details {\n        max-height: 0;\n        overflow: hidden;\n        opacity: 0;\n        transition: max-height 0.5s ease, opacity 0.5s ease;\n        font-size: 0.9em;\n        margin-top: 10px;\n      }\n      .project-card.expanded .project-details {\n        max-height: 400px;\n        opacity: 1;\n      }\n      .project-details a {\n        color: var(--function-color);\n        text-decoration: none;\n      }\n      .project-details a:hover { text-decoration: underline; }\n      .code-snippet {\n        background: var(--snippet-bg);\n        color: #f8f8f2;\n        border-radius: 4px;\n        padding: 10px;\n        margin-top: 10px;\n        font-family: \"JetBrains Mono\", Consolas, \"Liberation Mono\", Menlo, Courier, monospace;\n        font-size: 0.9em;\n        overflow-x: auto;\n        border: 1px solid var(--container-border);\n      }\n      .code-snippet .keyword { color: #f92672; }\n      .code-snippet .string { color: #e6db74; }\n      .code-snippet .function { color: #a6e22e; }\n      .code-snippet .comment { color: #75715e; }\n      .scroll-element {\n        opacity: 0;\n        transform: translateY(20px);\n      }\n      .animate-appear {\n        animation: fadeIn 0.8s ease forwards;\n      }\n      @keyframes fadeIn {\n        from { opacity: 0; transform: translateY(20px); }\n        to { opacity: 1; transform: translateY(0); }\n      }\n      @keyframes startupAnimation {\n        0% { opacity: 0; transform: translateY(-20px) scale(0.9); }\n        100% { opacity: 1; transform: translateY(0) scale(1); }\n      }\n      .startup {\n        animation: startupAnimation 1s ease-out forwards;\n      }\n      /* Splash Screen Styles with a slightly enhanced gradient */\n      #splash-screen {\n        position: fixed;\n        top: 0;\n        left: 0;\n        width: 100vw;\n        height: 100vh;\n        background: linear-gradient(135deg, var(--background-color) 0%, #0d0d0d 100%);\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        z-index: 9999;\n      }\n      #splash-screen div {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Helvetica, Arial, sans-serif;\n        font-size: 3em;\n        color: var(--text-color);\n        font-weight: bold;\n      }\n      .splash-out {\n        animation: splashOut 1s ease forwards;\n      }\n      @keyframes splashOut {\n        0% { opacity: 1; transform: scale(1); }\n        100% { opacity: 0; transform: scale(0.9); }\n      }\n      @media (max-width: 600px) {\n        body {\n          font-size: 15px;\n          align-items: flex-start !important;\n          justify-content: flex-start !important;\n          padding-top: 10px;\n        }\n        .ide-container {\n          width: 95vw;\n          \n          \n          box-sizing: border-box;\n          height: 83vh !important;\n        }\n        header h1 {\n          font-size: 1.5em;\n        }\n        header h2 {\n          font-size: 1em;\n        }\n        section h3 {\n          font-size: 1.2em;\n        }\n        .ide-header {\n          height: 60px !important;\n          top: 0px !important;\n        }\n      }\n\n      @media (max-width: 400px) {\n        header h1 {\n          font-size: 1.3em;\n        }\n        header h2 {\n          font-size: 0.9em;\n        }\n        .content-area {\n          padding: 20px 30px 20px;\n        }\n        .ide-header {\n          height: 50px !important;\n          top: 0px !important;\n        }\n      }\n\n      @media (max-width: 600px) {\n        .ide-header {\n          height: 50px !important;\n          top: 0px !important;\n        }\n      }\n    ";
        document.head.appendChild(style);
    };
    Portfolio.prototype.showSplashScreen = function () {
        var splash = document.createElement('div');
        splash.id = 'splash-screen';
        var pseudoContainer = document.createElement('div');
        var pseudo = document.createElement('span');
        pseudoContainer.appendChild(pseudo);
        splash.appendChild(pseudoContainer);
        document.body.appendChild(splash);
        var finalText = '0xZKnw';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
        var iteration = 0;
        var totalIterations = 40;
        // Add the scramble animation styles
        var style = document.createElement('style');
        style.textContent = "\n      @keyframes textGlow {\n        0% { text-shadow: 0 0 8px rgba(226, 230, 234, 0.7); }\n        50% { text-shadow: 0 0 16px rgba(226, 230, 234, 0.9); }\n        100% { text-shadow: 0 0 8px rgba(226, 230, 234, 0.7); }\n      }\n      \n      #splash-screen span {\n        font-family: monospace;\n        animation: textGlow 2s infinite;\n        letter-spacing: 0.2em;\n        font-weight: bold;\n      }\n    ";
        document.head.appendChild(style);
        // Scramble animation function
        var scrambleText = function () {
            // Determine how many characters should be finalized
            var finalizedCount = Math.floor((iteration / totalIterations) * finalText.length);
            var result = '';
            // Add finalized characters (they won't change anymore)
            for (var i = 0; i < finalizedCount; i++) {
                result += finalText[i];
            }
            // Add scrambled characters for the rest
            for (var i = finalizedCount; i < finalText.length; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
            // Update the text
            pseudo.textContent = result;
            // Slow down the animation over time
            var delay = Math.pow(iteration / totalIterations, 2) * 100 + 30;
            iteration++;
            // Continue scrambling if not done
            if (iteration <= totalIterations) {
                setTimeout(scrambleText, delay);
            }
            else {
                // When scramble is done, wait a bit before fading out
                setTimeout(function () {
                    splash.classList.add('splash-out');
                    splash.addEventListener('animationend', function () { return splash.remove(); });
                }, 1000);
            }
        };
        // Start the scramble animation
        setTimeout(scrambleText, 500);
    };
    Portfolio.prototype.createContainer = function () {
        var _this = this;
        this.container = document.createElement('div');
        this.container.classList.add('ide-container');
        // Create the macOS title bar
        var ideHeader = document.createElement('div');
        ideHeader.classList.add('ide-header');
        // Add traffic light buttons (close, minimize, maximize)
        var trafficLights = document.createElement('div');
        trafficLights.classList.add('traffic-lights');
        var closeBtn = document.createElement('div');
        closeBtn.classList.add('traffic-light', 'close');
        var minimizeBtn = document.createElement('div');
        minimizeBtn.classList.add('traffic-light', 'minimize');
        var maximizeBtn = document.createElement('div');
        maximizeBtn.classList.add('traffic-light', 'maximize');
        trafficLights.append(closeBtn, minimizeBtn, maximizeBtn);
        // Add empty title bar (no text)
        var titleBar = document.createElement('div');
        titleBar.classList.add('title-bar');
        // No text content set
        ideHeader.append(trafficLights, titleBar);
        this.container.appendChild(ideHeader);
        // Create a content area div to hold all the other content
        var contentArea = document.createElement('div');
        contentArea.classList.add('content-area');
        this.container.appendChild(contentArea);
        // Store the content area for later use
        this.contentArea = contentArea;
        // Modified hover effect to avoid pushing content out of view
        this.container.addEventListener('mouseenter', function () {
            _this.container.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
            _this.container.style.borderColor = 'var(--container-hover-border)';
        });
        this.container.addEventListener('mouseleave', function () {
            _this.container.style.boxShadow = '0 2px 6px rgba(0,0,0,0.3)';
            _this.container.style.borderColor = 'var(--container-border)';
        });
    };
    Portfolio.prototype.addHeader = function () {
        var header = document.createElement('header');
        header.classList.add('scroll-element');
        var title = document.createElement('h1');
        title.textContent = '0xZKnw';
        var subtitle = document.createElement('h2');
        subtitle.textContent = 'Developper | Blockchain Enthusiast';
        header.append(title, subtitle);
        this.contentArea.appendChild(header);
    };
    Portfolio.prototype.addAboutSection = function () {
        var aboutSection = document.createElement('section');
        aboutSection.classList.add('scroll-element');
        aboutSection.style.textAlign = 'left';
        var heading = document.createElement('h3');
        heading.textContent = 'About me:';
        var paragraph = document.createElement('p');
        paragraph.textContent = "Computer science student passionate about blockchain, cryptography and developpement. I have experience in Python, Java, C, Go, TypeScript, HTML, and CSS.";
        aboutSection.append(heading, paragraph);
        this.contentArea.appendChild(aboutSection);
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
        var Nexa = createCard('Nexa', 'Decentralized messaging service with sockets.', "<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>\nmessaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)", "Developed with a team of four in Python. GitHub: <a href='https://github.com/val-005/Nexa'>Nexa</a>");
        var anovlt = createCard('AnoVlt', 'Encrypt your files asymmetrically.', "<span class='keyword'>import</span> <span class='string'>'eciesgo'</span>\n<span class='keyword'>func</span> <span class='function'>anovlt</span>(pub <span class='keyword'>string</span>) *<span class='function'>eciesgo</span>.secrets {\n    <span class='keyword'>return</span> eciesgo.<span class='function'>Encrypt</span>(pub, <span class='string'>'secrets.zip'</span>)\n}", "Developed solo in Python. GitHub: <a href='https://github.com/0xZKnw/Bc_Test'>Bc_Test</a>");
        var ZKnwMe = createCard('0xZKnw.me', 'This Website.', "<span class='keyword'>import</span> axios;\naxios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);", "Developed solo in TypeScript. GitHub: <a href='https://github.com/0xZKnw/0xzknw.me'>0xZKnw.me</a>");
        var PwdMng = createCard('PwdMng', 'A password manager with ecies encryption.', "<span class='keyword'>import</span> cryptography\n<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):\n    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)", 'Developed solo in Python. GitHub: <a href="https://github.com/0xZKnw/PwdMng">PwdMng</a>');
        projectsContainer.append(Nexa, PwdMng, ZKnwMe, anovlt);
        projectsSection.append(heading, projectsContainer);
        this.contentArea.appendChild(projectsSection);
    };
    Portfolio.prototype.addContactSection = function () {
        var contactSection = document.createElement('section');
        contactSection.classList.add('scroll-element');
        contactSection.style.textAlign = 'center';
        var heading = document.createElement('h3');
        heading.textContent = 'Contact';
        var iconsContainer = document.createElement('div');
        iconsContainer.style.display = 'flex';
        iconsContainer.style.justifyContent = 'center';
        iconsContainer.style.gap = '20px';
        iconsContainer.style.marginTop = '10px';
        var createIconLink = function (href, imgSrc, altText) {
            var link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            var img = document.createElement('img');
            img.src = imgSrc;
            img.alt = altText;
            img.style.width = '32px';
            img.style.height = '32px';
            img.classList.add('social-icon');
            link.appendChild(img);
            return link;
        };
        var discordIcon = createIconLink('https://discord.com/users/0xZKnw', './img/discord.svg', 'Discord');
        var githubIcon = createIconLink('https://github.com/0xZKnw', './img/github.svg', 'GitHub');
        var twitterIcon = createIconLink('https://twitter.com/0xZKnw', './img/x.svg', 'Twitter');
        var linkedinIcon = createIconLink('https://www.linkedin.com/in/justin-olivier-1a6b0a31a/', './img/linkedin.svg', 'LinkedIn');
        iconsContainer.append(discordIcon, githubIcon, twitterIcon, linkedinIcon);
        contactSection.append(heading, iconsContainer);
        this.contentArea.appendChild(contactSection);
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
