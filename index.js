var Portfolio = /** @class */ (function () {
    function Portfolio() {
        this.observer = null;
        this.applyGlobalStyles();
        this.showSplashScreen();
    }
    Portfolio.prototype.initPortfolio = function () {
        var _this = this;
        this.createContentWrapper();
        this.addHeaderContent();
        this.addAboutSection();
        this.addProjectsSection();
        this.addContactSection();
        document.body.appendChild(this.contentWrapper);
        requestAnimationFrame(function () {
            _this.contentWrapper.classList.add('startup');
        });
        this.initScrollAnimations();
        this.initInteractiveElements(); // Added mouse follow effect here
    };
    Portfolio.prototype.applyGlobalStyles = function () {
        if (!document.head.querySelector("meta[name='viewport']")) {
            var meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(meta);
        }
        var fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        document.body.style.cssText = "\n          margin: 0;\n          padding: 0;\n          background-color: var(--background-color, #080a10);\n          color: var(--text-color, #cccccc);\n          font-family: var(--font-body, 'Inter', sans-serif);\n          overflow-x: hidden;\n          opacity: 0;\n          transition: opacity 0.5s ease-in-out;\n          position: relative; /* Needed for pseudo-element positioning */\n      ";
        var style = document.createElement('style');
        style.textContent = "\n          :root {\n              --background-color: #080a10;\n              --primary-accent: #00c6ff;\n              --secondary-accent: #a04cff;\n              --gradient-start: #0d3a5c;\n              --gradient-end: #1a1f36;\n              --text-color: #d1d5db;\n              --text-heading-color: #ffffff;\n              --text-muted-color: #8a94a6;\n              --card-bg: rgba(26, 31, 54, 0.5);\n              --card-border: rgba(160, 76, 255, 0.15);\n              --card-hover-bg: rgba(36, 41, 64, 0.7);\n              --card-hover-border: rgba(0, 198, 255, 0.3);\n              --code-bg: #111827;\n              --code-text: #c5c8c6;\n              --code-scrollbar-track: #161e2b;\n              --code-scrollbar-thumb: #374151;\n              --code-scrollbar-thumb-hover: #4b5563;\n              --keyword-color: #569cd6;\n              --string-color: #ce9178;\n              --function-color: #dcdcaa;\n              --comment-color: #6a9955; /* Still needed for snippet syntax */\n              --font-body: 'Inter', sans-serif;\n              --font-code: 'Roboto Mono', monospace;\n              --section-padding: 80px 0;\n              --container-max-width: 1100px;\n              /* CSS variables for mouse position */\n              --mouse-x: 50%;\n              --mouse-y: 50%;\n          }\n\n          html {\n              scroll-behavior: smooth;\n              scrollbar-width: none;\n          }\n\n          body {\n              font-family: var(--font-body);\n              background: var(--background-color) linear-gradient(180deg, var(--gradient-start) 0%, var(--background-color) 30%);\n              color: var(--text-color);\n              line-height: 1.7;\n              overflow-x: hidden;\n              &::-webkit-scrollbar {\n                  display: none;\n              }\n               -ms-overflow-style: none;\n          }\n\n          /* Mouse Follow Effect */\n          body::after {\n              content: '';\n              position: fixed; /* Use fixed to cover viewport */\n              top: 0;\n              left: 0;\n              width: 100%;\n              height: 100%;\n              pointer-events: none; /* Allow clicking through */\n              background: radial-gradient(\n                  circle at var(--mouse-x) var(--mouse-y),\n                  rgba(0, 198, 255, 0.06) 0%, /* Subtle cyan glow */\n                  transparent 20% /* Adjust size of glow */\n              );\n              z-index: 999; /* Ensure it's above background but below content */\n              transition: background 0.1s ease-out; /* Smooth transition */\n          }\n\n\n          .content-wrapper {\n              max-width: var(--container-max-width);\n              margin: 0 auto;\n              padding: 0 20px;\n              opacity: 0;\n              transform: translateY(20px);\n              transition: opacity 0.6s ease-out, transform 0.6s ease-out;\n              position: relative; /* Ensure content is above the body::after glow */\n              z-index: 1;\n          }\n          .content-wrapper.startup {\n               opacity: 1;\n               transform: translateY(0);\n          }\n\n          section {\n              padding: var(--section-padding);\n              opacity: 0;\n              transform: translateY(40px);\n              transition: opacity 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);\n              will-change: opacity, transform;\n              border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n          }\n           section:last-of-type {\n               border-bottom: none;\n           }\n          section.visible {\n              opacity: 1;\n              transform: translateY(0);\n          }\n\n          h1, h2, h3, h4 {\n              color: var(--text-heading-color);\n              margin: 0 0 15px 0;\n              font-weight: 600;\n              letter-spacing: 0.3px;\n          }\n           h1 {\n               font-size: clamp(2.5em, 5vw, 3.5em);\n               font-weight: 700;\n               background: linear-gradient(90deg, var(--text-heading-color), var(--primary-accent));\n               -webkit-background-clip: text;\n               -webkit-text-fill-color: transparent;\n               margin-bottom: 10px;\n           }\n           h2 {\n               font-size: clamp(1.1em, 2.5vw, 1.4em);\n               color: var(--text-muted-color);\n               font-weight: 400;\n               margin-bottom: 40px;\n               letter-spacing: 0.5px;\n               max-width: 600px;\n               margin-left: auto;\n               margin-right: auto;\n           }\n          h3 {\n              font-size: clamp(1.8em, 4vw, 2.5em);\n              margin-bottom: 40px;\n              position: relative;\n              display: inline-block;\n          }\n          h3::after {\n              content: '';\n              position: absolute;\n              bottom: -8px; left: 0;\n              width: 50px; height: 3px;\n              background: linear-gradient(90deg, var(--primary-accent), var(--secondary-accent));\n              border-radius: 2px;\n          }\n\n          p {\n              color: var(--text-color);\n              line-height: 1.7;\n              margin-bottom: 20px;\n              max-width: 750px;\n          }\n           p strong {\n               color: var(--text-heading-color);\n               font-weight: 500;\n           }\n\n          a {\n              color: var(--primary-accent);\n              text-decoration: none;\n              font-weight: 500;\n              transition: color 0.3s ease;\n          }\n          a:hover {\n              color: var(--secondary-accent);\n          }\n\n          .portfolio-header {\n              text-align: center;\n              padding: 60px 0;\n              min-height: 50vh;\n              display: flex;\n              flex-direction: column;\n              justify-content: center;\n              border-bottom: none;\n          }\n\n          .projects-container {\n              display: grid;\n              grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));\n              gap: 35px;\n              margin-top: 30px;\n          }\n          .project-card {\n              background-color: var(--card-bg);\n              padding: 30px;\n              border-radius: 10px;\n              border: 1px solid var(--card-border);\n              cursor: pointer;\n              position: relative;\n              overflow: hidden;\n              transition: transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease;\n              will-change: transform, border-color;\n          }\n          .project-card:hover {\n              transform: translateY(-6px);\n              border-color: var(--card-hover-border);\n              background-color: var(--card-hover-bg);\n          }\n          .project-card h4 {\n              color: var(--text-heading-color);\n              margin-bottom: 12px;\n              font-size: 1.3em;\n              font-weight: 600;\n          }\n          .project-card p {\n              font-size: 0.98em;\n              color: var(--text-muted-color);\n              line-height: 1.6;\n              margin-bottom: 15px;\n          }\n\n          .code-snippet {\n              background: var(--code-bg);\n              color: var(--code-text);\n              border-radius: 8px;\n              padding: 15px 20px;\n              margin-top: 20px;\n              font-family: var(--font-code);\n              font-size: 0.9em;\n              border: 1px solid rgba(255, 255, 255, 0.1);\n              line-height: 1.6;\n              white-space: pre;\n              overflow-x: auto;\n              scrollbar-width: thin;\n              scrollbar-color: var(--code-scrollbar-thumb) var(--code-scrollbar-track);\n          }\n          .code-snippet::-webkit-scrollbar {\n              height: 8px;\n              background-color: var(--code-scrollbar-track);\n              border-radius: 6px;\n          }\n          .code-snippet::-webkit-scrollbar-thumb {\n              background-color: var(--code-scrollbar-thumb);\n              border-radius: 6px;\n              border: 2px solid var(--code-scrollbar-track);\n          }\n          .code-snippet::-webkit-scrollbar-thumb:hover {\n              background-color: var(--code-scrollbar-thumb-hover);\n          }\n\n           /* Syntax highlighting classes (kept for user's snippets) */\n           .code-snippet .keyword { color: var(--keyword-color); }\n           .code-snippet .string { color: var(--string-color); }\n           .code-snippet .function { color: var(--function-color); }\n           .code-snippet .comment { color: var(--comment-color); font-style: italic; }\n\n          .project-details {\n              max-height: 0;\n              overflow: hidden;\n              opacity: 0;\n              transition: max-height 0.4s ease-out, opacity 0.4s ease-out, margin-top 0.4s ease-out, padding-top 0.4s ease-out;\n              font-size: 0.95em;\n              margin-top: 0;\n              border-top: 1px solid rgba(255, 255, 255, 0.1);\n              padding-top: 0;\n          }\n          .project-card.expanded .project-details {\n              max-height: 450px;\n              opacity: 1;\n              margin-top: 20px;\n              padding-top: 20px;\n          }\n          .project-details p {\n               margin-bottom: 10px;\n               color: var(--text-color);\n          }\n           .project-details strong {\n               color: var(--primary-accent);\n           }\n           .project-details a {\n               font-weight: 600;\n           }\n\n          .contact-section {\n              text-align: center;\n          }\n          .contact-section p {\n              margin-left: auto;\n              margin-right: auto;\n          }\n          .icons-container {\n              display: flex;\n              justify-content: center;\n              gap: 35px;\n              margin-top: 30px;\n              flex-wrap: wrap;\n          }\n          .social-icon-link {\n              display: inline-block;\n              transition: transform 0.2s ease-out;\n          }\n          .social-icon-link:hover {\n              transform: scale(1.1);\n          }\n          .social-icon {\n              width: 32px;\n              height: 32px;\n              filter: grayscale(70%) opacity(0.7);\n              transition: filter 0.3s ease, transform 0.3s ease;\n          }\n          .social-icon-link:hover .social-icon {\n              filter: grayscale(0%) opacity(1);\n          }\n\n          #splash-screen {\n              position: fixed;\n              top: 0; left: 0;\n              width: 100vw; height: 100vh;\n              background: var(--background-color);\n              display: flex;\n              justify-content: center;\n              align-items: center;\n              z-index: 9999;\n              opacity: 1;\n              transition: opacity 0.8s ease-out, transform 0.8s ease-out;\n          }\n          #splash-screen.splash-out {\n              opacity: 0;\n              transform: scale(0.95);\n              pointer-events: none;\n          }\n          #splash-text {\n              font-family: var(--font-code);\n              font-size: clamp(2em, 6vw, 4em);\n              color: var(--primary-accent);\n              font-weight: 500;\n              text-shadow: 0 0 10px rgba(0, 198, 255, 0.5);\n              letter-spacing: 0.1em;\n              white-space: nowrap;\n          }\n\n          @media (max-width: 768px) {\n              :root { --section-padding: 60px 0; }\n              body { font-size: 15px; }\n              h1 { font-size: clamp(2em, 8vw, 2.8em); }\n              h2 { font-size: clamp(1em, 4vw, 1.2em); }\n              h3 { font-size: clamp(1.5em, 6vw, 2em); margin-bottom: 30px;}\n              .projects-container { grid-template-columns: 1fr; gap: 25px; }\n               .code-snippet { font-size: 0.85em; }\n          }\n          @media (max-width: 480px) {\n              :root { --section-padding: 50px 0; }\n              body { font-size: 14px; }\n              .content-wrapper { padding: 0 15px; }\n              h1 { font-size: clamp(1.8em, 10vw, 2.4em); }\n              h2 { font-size: clamp(0.9em, 5vw, 1.1em); margin-bottom: 30px;}\n              h3 { font-size: clamp(1.3em, 7vw, 1.8em); }\n              .project-card { padding: 25px; }\n              .icons-container { gap: 25px; }\n              .social-icon { width: 28px; height: 28px; }\n              #splash-text { letter-spacing: 0.05em; }\n               .code-snippet { font-size: 0.8em; }\n          }\n      ";
        document.head.appendChild(style);
        requestAnimationFrame(function () {
            document.body.style.opacity = '1';
        });
    };
    Portfolio.prototype.showSplashScreen = function () {
        var _this = this;
        var splash = document.createElement('div');
        splash.id = 'splash-screen';
        var pseudo = document.createElement('span');
        pseudo.id = 'splash-text';
        splash.appendChild(pseudo);
        document.body.appendChild(splash);
        var finalText = '0xZKnw';
        var chars = '!<>-_\\/[]{}—=+*^?#________';
        var iteration = 0;
        var totalIterations = finalText.length * 6;
        var interval = null;
        var scrambleText = function () {
            pseudo.textContent = finalText
                .split('')
                .map(function (_letter, index) {
                if (index < iteration / 6) {
                    return finalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
                .join('');
            iteration++;
            if (iteration > totalIterations) {
                if (interval)
                    clearInterval(interval);
                pseudo.textContent = finalText;
                setTimeout(function () {
                    splash.classList.add('splash-out');
                    splash.addEventListener('transitionend', function () {
                        splash.remove();
                        _this.initPortfolio();
                    }, { once: true });
                }, 400);
            }
        };
        var lastTime = 0;
        var frameDuration = 40;
        var animate = function (currentTime) {
            if (!lastTime)
                lastTime = currentTime;
            var elapsed = currentTime - lastTime;
            if (elapsed >= frameDuration) {
                scrambleText();
                lastTime = currentTime - (elapsed % frameDuration);
            }
            if (iteration <= totalIterations) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    };
    Portfolio.prototype.createContentWrapper = function () {
        this.contentWrapper = document.createElement('div');
        this.contentWrapper.classList.add('content-wrapper');
    };
    Portfolio.prototype.addHeaderContent = function () {
        var headerSection = document.createElement('section');
        headerSection.classList.add('portfolio-header', 'scroll-element');
        headerSection.style.borderBottom = 'none';
        var title = document.createElement('h1');
        title.textContent = '0xZKnw';
        var subtitle = document.createElement('h2');
        subtitle.textContent = 'Developer | Blockchain Enthusiast | Crypto Explorer';
        headerSection.append(title, subtitle);
        this.contentWrapper.appendChild(headerSection);
    };
    Portfolio.prototype.addAboutSection = function () {
        var aboutSection = document.createElement('section');
        aboutSection.id = 'about';
        aboutSection.classList.add('scroll-element');
        var heading = document.createElement('h3');
        heading.textContent = "About Me";
        var paragraph = document.createElement('p');
        paragraph.textContent = "Passionate computer science student diving deep into the world of blockchain, cryptography, and decentralized systems. Always learning and building with technologies like Python, Go, and exploring the frontiers of Web3.";
        var skillsParagraph = document.createElement('p');
        skillsParagraph.innerHTML = "<strong>Skills:</strong> Python, Go, Java, C, TypeScript (Learning), Solidity (Learning), Rust (Learning), HTML/CSS.";
        aboutSection.append(heading, paragraph, skillsParagraph);
        this.contentWrapper.appendChild(aboutSection);
    };
    Portfolio.prototype.addProjectsSection = function () {
        var projectsSection = document.createElement('section');
        projectsSection.id = 'projects';
        projectsSection.classList.add('scroll-element');
        var heading = document.createElement('h3');
        heading.textContent = "Projects";
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
            card.addEventListener('click', function (e) {
                if (e.target instanceof HTMLElement && e.target.closest('a')) {
                    return;
                }
                card.classList.toggle('expanded');
            });
            return card;
        };
        var Nexa = createCard('Nexa', 'Decentralized messaging service with websockets.', "<span class='keyword'>from</span> <span class='function'>Nexa</span> <span class='keyword'>import</span> <span class='function'>initService</span>\nmessaging = <span class='function'>initService</span>(<span class='string'>'Nexa'</span>)", "<p>Collaborative project focused on secure, decentralized communication.</p><p><strong>Tech:</strong> Python, Websockets </p><p><a href='https://github.com/val-005/Nexa' target='_blank' rel='noopener noreferrer'>View on GitHub &rarr;</a></p>");
        var anovlt = createCard('AnoVlt', 'Encrypt your files asymmetrically.', "<span class='keyword'>import</span> <span class='string'>'eciesgo'</span>\n<span class='keyword'>func</span> <span class='function'>anovlt</span>(pub <span class='keyword'>string</span>) *<span class='function'>eciesgo</span>.secrets {\n    <span class='keyword'>return</span> eciesgo.<span class='function'>Encrypt</span>(pub, <span class='string'>'secrets.zip'</span>)\n}", "<p>Experimentation with ECIES for secure file handling.</p><p><strong>Tech:</strong> Go, ECIES Library</p><p><a href='https://github.com/0xZKnw/Bc_Test' target='_blank' rel='noopener noreferrer'>Related Exploration &rarr;</a></p>");
        var ZKnwMe = createCard('0xZKnw.me', 'This Website.', "<span class='keyword'>import</span> axios;\naxios.<span class='function'>get</span>(<span class='string'>'https://0xZKnw.me'</span>);", "<p>The website you're currently viewing ! Built using TypeScript.</p><p><strong>Tech:</strong> TypeScript, HTML, CSS</p><p><a href='https://github.com/0xZKnw/0xzknw.me' target='_blank' rel='noopener noreferrer'>View Source &rarr;</a></p>");
        var PwdMng = createCard('PwdMng', 'A password manager with ecies encryption.', "<span class='keyword'>import</span> cryptography\n<span class='keyword'>def</span> <span class='function'>encrypt_password</span>(password):\n    <span class='keyword'>return</span> cryptography.<span class='function'>encrypt</span>(password)", "<p>A secure password manager using asymetric encryption (ECIES).</p><p><strong>Tech:</strong> Python, ECIES Libraries </p><p><a href='https://github.com/0xZKnw/PwdMng' target='_blank' rel='noopener noreferrer'>View on GitHub &rarr;</a></p>");
        projectsContainer.append(Nexa, PwdMng, ZKnwMe, anovlt);
        projectsSection.append(heading, projectsContainer);
        this.contentWrapper.appendChild(projectsSection);
    };
    Portfolio.prototype.addContactSection = function () {
        var contactSection = document.createElement('section');
        contactSection.id = 'contact';
        contactSection.classList.add('contact-section', 'scroll-element');
        var heading = document.createElement('h3');
        heading.textContent = "Get In Touch";
        var paragraph = document.createElement('p');
        paragraph.textContent = "Interested in collaborating or discussing tech, blockchain, and crypto? Feel free to reach out.";
        paragraph.style.maxWidth = '600px';
        paragraph.style.margin = '0 auto 30px auto';
        var iconsContainer = document.createElement('div');
        iconsContainer.classList.add('icons-container');
        var createIconLink = function (href, imgSrc, altText) {
            var link = document.createElement('a');
            link.href = href;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.classList.add('social-icon-link');
            link.setAttribute('aria-label', altText);
            var img = document.createElement('img');
            img.src = imgSrc;
            img.alt = altText;
            img.classList.add('social-icon');
            img.onerror = function () {
                img.style.display = 'none';
                var fallbackText = document.createElement('span');
                fallbackText.textContent = altText;
                fallbackText.style.color = 'var(--text-muted-color)';
                fallbackText.style.fontSize = '0.8em';
                link.appendChild(fallbackText);
            };
            link.appendChild(img);
            return link;
        };
        var discordIcon = createIconLink('https://discord.com/users/0xZKnw', './img/discord.svg', 'Discord');
        var githubIcon = createIconLink('https://github.com/0xZKnw', './img/github.svg', 'GitHub');
        var twitterIcon = createIconLink('https://twitter.com/0xZKnw', './img/x.svg', 'Twitter');
        var linkedinIcon = createIconLink('https://www.linkedin.com/in/justin-olivier-1a6b0a31a/', './img/linkedin.svg', 'LinkedIn');
        iconsContainer.append(discordIcon, githubIcon, twitterIcon, linkedinIcon);
        contactSection.append(heading, paragraph, iconsContainer);
        this.contentWrapper.appendChild(contactSection);
    };
    Portfolio.prototype.initScrollAnimations = function () {
        var _this = this;
        if (this.observer) {
            this.observer.disconnect();
        }
        this.observer = new IntersectionObserver(function (entries, observerInstance) {
            entries.forEach(function (entry) {
                var delay = (entry.target.getAttribute('data-scroll-delay') || 0) + 'ms';
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.transitionDelay = delay;
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: "0px 0px -5% 0px"
        });
        this.contentWrapper.querySelectorAll('.scroll-element').forEach(function (element, index) {
            var _a;
            (_a = _this.observer) === null || _a === void 0 ? void 0 : _a.observe(element);
        });
    };
    Portfolio.prototype.initInteractiveElements = function () {
        document.body.addEventListener('mousemove', function (e) {
            var x = e.clientX / window.innerWidth;
            var y = e.clientY / window.innerHeight;
            document.body.style.setProperty('--mouse-x', "".concat(x * 100, "%"));
            document.body.style.setProperty('--mouse-y', "".concat(y * 100, "%"));
        });
    };
    return Portfolio;
}());
document.addEventListener('DOMContentLoaded', function () {
    new Portfolio();
});
