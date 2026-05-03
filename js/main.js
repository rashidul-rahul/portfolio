394|  const output = document.getElementById('output');
   395|  const input = document.getElementById('cmd-input');
   396|  const terminal = document.getElementById('terminal');
   397|
   398|  let commandHistory = [];
   399|  let historyIndex = -1;
   400|
   401|  // Bootstrap message
   402|  const banner = `
   403|<span class="banner-ascii cyan">██████╗  █████╗ ███████╗██╗  ██╗██╗██████╗ ██╗   ██╗██╗
   404|██╔══██╗██╔══██╗██╔════╝██║  ██║██║██╔══██╗██║   ██║██║
   405|██████╔╝███████║███████╗███████║██║██║  ██║██║   ██║██║
   406|██╔══██╗██╔══██║╚════██║██╔══██║██║██║  ██║██║   ██║██║
   407|██║  ██║██║  ██║███████║██║  ██║██║██████╔╝╚██████╔╝███████╗
   408|╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚══════╝
   409|
   410|██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗
   411|██╔══██╗██╔══██╗██║  ██║██║   ██║██║
   412|██████╔╝███████║███████║██║   ██║██║
   413|██╔══██╗██╔══██║██╔══██║██║   ██║██║
   414|██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗
   415|╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
   416|</span>
   417|<span class="accent">rashidul@rahul</span> <span class="dim full-sub">v1.0.0 | Backend Engineer | Microservices & System Design</span><span class="dim short-sub">v1.0.0 | Backend Engineer</span>
   418|
   419|<span class="dim">Type </span><span class="accent">help</span><span class="dim"> to see available commands.</span>
   420|`;
   421|
   422|  function out(html) {
   423|    output.innerHTML += html + '\n';
   424|    terminal.scrollTop = terminal.scrollHeight;
   425|  }
   426|
   427|  function escapeHtml(str) {
   428|    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
   429|  }
   430|
   431|  // Command handlers
   432|  const commands = {
   433|    help: () => `
   434|<span class="section-header">## AVAILABLE COMMANDS</span>
   435|
   436|<span class="cmd-grid">
   437|<span class="cmd">about</span>       <span class="desc">Professional summary & who I am</span>
   438|<span class="cmd">skills</span>      <span class="desc">Technical skills & expertise</span>
   439|<span class="cmd">experience</span>  <span class="desc">Work history & roles</span>
   440|<span class="cmd">projects</span>    <span class="desc">Selected projects & architecture</span>
   441|<span class="cmd">education</span>   <span class="desc">Academic background & certifications</span>
   442|<span class="cmd">contact</span>     <span class="desc">Get in touch</span>
   443|<span class="cmd">social</span>      <span class="desc">GitHub, LinkedIn, and other links</span>
   444|<span class="cmd">clear</span>       <span class="desc">Clear the terminal</span>
   445|<span class="cmd">whoami</span>      <span class="desc">Quick identity check</span>
   446|</span>
   447|
   448|<span class="dim">Tip: Click the buttons in the header bar or type commands.</span>
   449|`,
   450|
   451|    about: () => `
   452|<span class="section-header">## ABOUT</span>
   453|
   454|<span class="accent">Rashidul Islam Rahul</span>
   455|<span class="dim">Software Engineer | Backend Engineer | Microservices & System Design</span>
   456|
   457|Backend engineer with <span class="warn">6+ years of experience</span> designing scalable
   458|backend systems, distributed services, and microservices-based platforms,
   459|with a strong focus on <span class="cyan">AI-assisted engineering</span> and system design.
   460|
   461|Experienced in applying <span class="accent">agentic development workflows</span> and AI coding
   462|tools to accelerate implementation, debugging, and engineering productivity.
   463|
   464|<span class="section-sub">Core Expertise:</span>
   465|  • Python, Django, FastAPI, Flask
   466|  • PostgreSQL, MongoDB, Redis, Cassandra
   467|  • Docker, Kubernetes, AWS, GCP
   468|  • Microservices & Event-Driven Architecture
   469|  • RabbitMQ, Celery, CI/CD pipelines
   470|  • MCP Server Development & AI-Assisted Engineering
   471|`,
   472|
   473|    skills: () => `
   474|<span class="section-header">## TECHNICAL SKILLS</span>
   475|
   476|<span class="cyan">AI-Assisted Engineering</span>
   477|<span class="tag-row"><span class="tag">Agentic Coding</span><span class="tag">MCP Server Dev</span><span class="tag">Claude Code</span><span class="tag">Codex</span><span class="tag">Cursor</span></span>
   478|
   479|<span class="cyan">Languages</span>
   480|<span class="tag-row"><span class="tag">Python</span><span class="tag">SQL</span><span class="tag">Bash</span><span class="tag">Shell Scripting</span><span class="tag">PHP</span></span>
   481|
   482|<span class="cyan">Frameworks</span>
   483|<span class="tag-row"><span class="tag">Django</span><span class="tag">FastAPI</span><span class="tag">Flask</span></span>
   484|
   485|<span class="cyan">Architecture</span>
   486|<span class="tag-row"><span class="tag">Microservices</span><span class="tag">Event-Driven</span><span class="tag">REST APIs</span><span class="tag">System Design</span><span class="tag">Database Design</span></span>
   487|
   488|<span class="cyan">Databases</span>
   489|<span class="tag-row"><span class="tag">PostgreSQL</span><span class="tag">MySQL</span><span class="tag">SQLite</span><span class="tag">MongoDB</span><span class="tag">Cassandra</span><span class="tag">Redis</span></span>
   490|
   491|<span class="cyan">Messaging & Async</span>
   492|<span class="tag-row"><span class="tag">RabbitMQ</span><span class="tag">Celery</span></span>
   493|
   494|<span class="cyan">DevOps & Infra</span>
   495|<span class="tag-row"><span class="tag">Docker</span><span class="tag">Kubernetes</span><span class="tag">Terraform</span><span class="tag">Ansible</span></span>
   496|
   497|<span class="cyan">CI/CD</span>
   498|<span class="tag-row"><span class="tag">Jenkins</span><span class="tag">GitLab CI/CD</span><span class="tag">Bitbucket Pipelines</span></span>
   499|
   500|<span class="cyan">Cloud</span>
   501|<span class="tag-row"><span class="tag">AWS</span><span class="tag">Google Cloud Platform</span><span class="tag">DigitalOcean</span></span>
   502|`,
   503|
   504|    experience: () => `
   505|<span class="section-header">## PROFESSIONAL EXPERIENCE</span>
   506|
   507|<span class="warn">Software Engineer</span> @ <span class="cyan">SDS Manager</span> <span class="dim">(Oct 2025 – Present)</span>
   508|  • Improved delivery speed & reduced issue rates via better tech planning
   509|  • Designed 4 backend services and 2 core modules
   510|  • Led 6 engineers in technical discussions & backend delivery
   511|  • Designed auth & wallet DB architecture for <span class="accent">Autoring</span>
   512|  • Contributed to <span class="accent">QMS</span>: microservices + RabbitMQ event-driven design
   513|  • Built an <span class="accent">MCP server for QMS</span> — AI-assisted workflows
   514|  • Integrated agentic coding workflows into dev practices
   515|
   516|<span class="warn">Instructor (Python & Django)</span> @ <span class="cyan">Ostad</span> <span class="dim">(Feb 2025 – Present)</span>
   517|  • Live sessions & project-based learning for Python/Django
   518|  • Course materials, coding exercises, real-world backend examples
   519|  • Mentor on REST APIs, DB design, Django best practices
   520|
   521|<span class="warn">Acting Backend Lead</span> @ <span class="cyan">Goama</span> <span class="dim">(2019 – Sep 2025)</span>
   522|  • Led backend dev for scalable server-side systems & APIs
   523|  • Spearheaded API dev — performance, responsiveness, maintainability
   524|  • CI/CD with Jenkins & GitLab — <span class="accent">reduced deployment time by 40%</span>
   525|  • Docker + Kubernetes orchestration for scalability & reliability
   526|  • Automated infra provisioning with Ansible & Terraform
   527|  • Mentored junior engineers & conducted code reviews
   528|
   529|<span class="warn">Backend Developer</span> @ <span class="cyan">Sundarbanx.com</span> <span class="dim">(Sep 2017 – Feb 2018)</span>
   530|  • Backend features for classified platform (Phalcon PHP)
   531|`,
   532|
   533|    projects: () => `
   534|<span class="section-header">## SELECTED PROJECTS</span>
   535|
   536|<span class="warn">QMS</span> <span class="dim">— SDS Manager</span>
   537|  • Designed complete microservices architecture (event-driven, RabbitMQ)
   538|  • Defined service communication patterns, backend flow, DB structure
   539|  • Led QMS team from backend & architectural perspective
   540|  • Built <span class="accent">MCP server</span> for AI-assisted engineering workflows
   541|
   542|<span class="warn">Autoring</span> <span class="dim">— SDS Manager</span>
   543|  • Auth & wallet system database architecture
   544|  • Backend data models for secure, scalable product growth
   545|  • System design for user management & wallet operations
   546|
   547|<span class="warn">Nurture Game</span> <span class="dim">— Goama</span>
   548|  • Microservices backend: event management + auth services
   549|  • Django & FastAPI with PostgreSQL & MongoDB
   550|  • Distributed game platform architecture
   551|
   552|<span class="warn">Monopoly Game</span> <span class="dim">— Goama</span>
   553|  • Complete backend game logic & APIs
   554|  • Django + MySQL for gameplay features & operations
   555|`,
   556|
   557|    education: () => `
   558|<span class="section-header">## EDUCATION</span>
   559|
   560|<span class="warn">B.Sc. in Computer Science and Engineering</span>
   561|<span class="cyan">Daffodil International University</span>, Dhaka
   562|
   563|<span class="section-header">## CERTIFICATIONS</span>
   564|
   565|<span class="accent">Web App Development with PHP</span> — BITM under SEIP Project
   566|
   567|<span class="section-header">## SOFT SKILLS</span>
   568|
   569|<span class="tag-row">
   570|<span class="tag">Technical Leadership</span><span class="tag">Mentoring</span><span class="tag">Problem Solving</span>
   571|<span class="tag">Analytical Thinking</span><span class="tag">Communication</span><span class="tag">Team Collaboration</span>
   572|<span class="tag">System Design Thinking</span><span class="tag">Continuous Learning</span>
   573|</span>
   574|`,
   575|
   576|    contact: () => `
   577|<span class="section-header">## CONTACT</span>
   578|
   579|<span class="dim">Email:</span>     <a href="mailto:rashidul.rahul@gmail.com">rashidul.rahul@gmail.com</a>
   580|<span class="dim">WhatsApp:</span>  <span class="accent">+8801623397637</span>
   581|
   582|<span class="dim">Type </span><span class="accent">social</span><span class="dim"> for GitHub, LinkedIn, and other links.</span>
   583|`,
   584|
   585|    social: () => `
   586|<span class="section-header">## LINKS</span>
   587|
   588|<span class="dim">GitHub:</span>    <a href="https://github.com/rashidul-rahul" target="_blank">github.com/rashidul-rahul</a>
   589|<span class="dim">LinkedIn:</span>  <a href="https://www.linkedin.com/in/rashshidul-rahul/" target="_blank">linkedin.com/in/rashshidul-rahul</a>
   590|`,
   591|
   592|    whoami: () => `
   593|<span class="accent">Rashidul Rahul</span>
   594|<span class="dim">uid=1000(rashidul) gid=1000(rashidul) groups=backend, microservices, ai-engineering</span>
   595|`,
   596|
   597|    clear: () => { output.innerHTML = ''; return null; },
   598|
   599|    banner: () => banner,
   600|
   601|    ls: function() { return this.help(); },
   602|    man: function() { return this.help(); },
   603|    cv: function() { return this.about(); },
   604|  };
   605|
   606|  function run(cmd) {
   607|    cmd = cmd.trim().toLowerCase();
   608|    if (!cmd) return;
   609|
   610|    commandHistory.push(cmd);
   611|    historyIndex = commandHistory.length;
   612|
   613|    // Echo the command
   614|    out(`<span class="prompt"><span class="user">rashidul</span><span class="sep">@</span><span class="host">rahul</span><span class="sep">:</span><span class="path">~</span><span class="sym">$</span></span> <span class="dim">${escapeHtml(cmd)}</span>`);
   615|
   616|    if (commands[cmd]) {
   617|      const result = commands[cmd]();
   618|      if (result) out(result);
   619|    } else {
   620|      out(`<span class="error">command not found: ${escapeHtml(cmd)}</span>\n<span class="dim">Type </span><span class="accent">help</span><span class="dim"> for available commands.</span>`);
   621|    }
   622|  }
   623|
   624|  // Input handling
   625|  input.addEventListener('keydown', (e) => {
   626|    if (e.key === 'Enter') {
   627|      const cmd = input.value;
   628|      input.value = '';
   629|      run(cmd);
   630|    } else if (e.key === 'ArrowUp') {
   631|      e.preventDefault();
   632|      if (historyIndex > 0) {
   633|        historyIndex--;
   634|        input.value = commandHistory[historyIndex];
   635|      }
   636|    } else if (e.key === 'ArrowDown') {
   637|      e.preventDefault();
   638|      if (historyIndex < commandHistory.length - 1) {
   639|        historyIndex++;
   640|        input.value = commandHistory[historyIndex];
   641|      } else {
   642|        historyIndex = commandHistory.length;
   643|        input.value = '';
   644|      }
   645|    }
   646|  });
   647|
   648|  // Click anywhere to focus input
   649|  terminal.addEventListener('click', (e) => {
   650|    if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
   651|      input.focus();
   652|    }
   653|  });
   654|
   655|  // Show banner on load
   656|  out(banner);
   657|  input.focus();
   658|
