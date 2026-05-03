/**
 * Terminal Portfolio — Rashidul Rahul
 * Interactive command-line CV
 */

const output = document.getElementById('term-output');
const input  = document.getElementById('cmd-input');
const term   = document.getElementById('terminal');

let history = [];
let histIdx = -1;

// ── COLOR HELPERS ──────────────────────────────────────────
const C = {
  header:   'text-amber-400 font-semibold',
  sub:      'text-cyan-400',
  accent:   'text-emerald-400',
  dim:      'text-neutral-500',
  warn:     'text-amber-400',
  cyan:     'text-cyan-400',
  purple:   'text-purple-400',
  white:    'text-neutral-100',
  body:     'text-neutral-300',
  error:    'text-red-400',
  tag:      'inline-block px-2 py-0.5 mr-1.5 mb-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-xs font-mono',
  tagDim:   'inline-block px-2 py-0.5 mr-1.5 mb-1.5 bg-neutral-800 text-neutral-400 border border-neutral-700/30 rounded text-xs font-mono',
};

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function out(html) {
  const div = document.createElement('div');
  div.className = 'term-line';
  div.innerHTML = html;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
}

function hdr(text) {
  return `<div class="${C.header} text-base mt-5 mb-3">## ${text}</div>`;
}

function sub(text) {
  return `<div class="${C.sub} mt-3 mb-1 text-xs uppercase tracking-wider">${text}</div>`;
}

function tags(arr, accent) {
  return `<div class="flex flex-wrap gap-1.5 my-2">${arr.map(t =>
    accent && accent.includes(t)
      ? `<span class="${C.tag}">${t}</span>`
      : `<span class="${C.tagDim}">${t}</span>`
  ).join('')}</div>`;
}

function link(url, text) {
  return `<a href="${url}" target="_blank" class="text-cyan-400 underline decoration-cyan-400/30 hover:decoration-cyan-400 hover:text-emerald-400 transition-colors">${text || url}</a>`;
}

// ── COMMANDS ───────────────────────────────────────────────
const commands = {

  help() {
    return `
${hdr('AVAILABLE COMMANDS')}

<div class="grid grid-cols-[auto,1fr] gap-x-6 gap-y-1 mt-2">
  <span class="${C.accent}">about</span>       <span class="${C.dim}">Who I am & what I do</span>
  <span class="${C.accent}">skills</span>      <span class="${C.dim}">Technical stack & expertise</span>
  <span class="${C.accent}">experience</span>  <span class="${C.dim}">Work history & roles</span>
  <span class="${C.accent}">projects</span>    <span class="${C.dim}">Selected work & architecture</span>
  <span class="${C.accent}">education</span>   <span class="${C.dim}">Academic background & certs</span>
  <span class="${C.accent}">contact</span>     <span class="${C.dim}">Email, phone, WhatsApp</span>
  <span class="${C.accent}">social</span>      <span class="${C.dim}">GitHub, LinkedIn links</span>
  <span class="${C.accent}">whoami</span>      <span class="${C.dim}">Quick identity check</span>
  <span class="${C.accent}">clear</span>       <span class="${C.dim}">Clear terminal</span>
  <span class="${C.accent}">banner</span>      <span class="${C.dim}">Show welcome banner</span>
</div>
<br><span class="${C.dim}">Tip: Click the buttons in the header bar or type commands. ↑↓ for history.</span>
`;
  },

  about() {
    return `
${hdr('ABOUT')}

<span class="${C.accent} text-base font-semibold">Rashidul Islam Rahul</span>
<span class="${C.dim} block mb-3">Software Engineer · Backend Engineer · Microservices & System Design</span>

Backend engineer with <span class="${C.warn} font-medium">6+ years of experience</span> designing scalable
backend systems, distributed services, and microservices-based platforms,
with a strong focus on <span class="${C.cyan}">AI-assisted engineering</span> and system design.

Experienced in applying <span class="${C.accent}">agentic development workflows</span> and AI coding
tools to accelerate implementation, debugging, and engineering productivity.

${sub('Core Expertise')}
  <span class="${C.body}">▸</span> Python, Django, FastAPI, Flask
  <span class="${C.body}">▸</span> PostgreSQL, MongoDB, Redis, Cassandra
  <span class="${C.body}">▸</span> Docker, Kubernetes, AWS, GCP
  <span class="${C.body}">▸</span> Microservices & Event-Driven Architecture
  <span class="${C.body}">▸</span> RabbitMQ, Celery, CI/CD pipelines
  <span class="${C.body}">▸</span> MCP Server Development & AI-Assisted Engineering
`;
  },

  skills() {
    return `
${hdr('TECHNICAL SKILLS')}

${sub('✦ AI-Assisted Engineering')}
${tags(['Agentic Coding','MCP Server Dev','Claude Code','Codex','Cursor'], ['Agentic Coding','MCP Server Dev'])}

${sub('Languages')}
${tags(['Python','SQL','Bash','Shell Scripting','PHP'], ['Python'])}

${sub('Frameworks')}
${tags(['Django','FastAPI','Flask'], ['Django','FastAPI'])}

${sub('Architecture')}
${tags(['Microservices','Event-Driven','REST APIs','System Design','Database Design'], ['Microservices','Event-Driven'])}

${sub('Databases')}
${tags(['PostgreSQL','MySQL','SQLite','MongoDB','Cassandra','Redis'], ['PostgreSQL'])}

${sub('Messaging & Async')}
${tags(['RabbitMQ','Celery'], ['RabbitMQ'])}

${sub('DevOps & Infrastructure')}
${tags(['Docker','Kubernetes','Terraform','Ansible'], ['Docker','Kubernetes'])}

${sub('CI/CD')}
${tags(['Jenkins','GitLab CI/CD','Bitbucket Pipelines'])}

${sub('Cloud')}
${tags(['AWS','Google Cloud Platform','DigitalOcean'], ['AWS','Google Cloud Platform'])}
`;
  },

  experience() {
    return `
${hdr('PROFESSIONAL EXPERIENCE')}

<div class="mt-3 mb-2">
  <span class="${C.warn} font-semibold">Software Engineer</span>
  <span class="${C.dim}">@</span>
  <span class="${C.cyan} font-semibold">SDS Manager</span>
  <span class="${C.dim} ml-2">Oct 2025 – Present</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Improved delivery speed & reduced issue rates via better tech planning</div>
  <div>▸ Designed 4 backend services and 2 core modules</div>
  <div>▸ Led 6 engineers in technical discussions & backend delivery</div>
  <div>▸ Designed auth & wallet DB architecture for <span class="${C.accent}">Autoring</span></div>
  <div>▸ Contributed to <span class="${C.accent}">QMS</span>: microservices + RabbitMQ event-driven design</div>
  <div>▸ Built an <span class="${C.accent}">MCP server for QMS</span> — AI-assisted workflows</div>
  <div>▸ Integrated agentic coding workflows into dev practices</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Instructor (Python & Django)</span>
  <span class="${C.dim}">@</span>
  <span class="${C.cyan} font-semibold">Ostad</span>
  <span class="${C.dim} ml-2">Feb 2025 – Present</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Live sessions & project-based learning for Python/Django</div>
  <div>▸ Course materials, coding exercises, real-world backend examples</div>
  <div>▸ Mentor on REST APIs, DB design, Django best practices</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Acting Backend Lead</span>
  <span class="${C.dim}">@</span>
  <span class="${C.cyan} font-semibold">Goama</span>
  <span class="${C.dim} ml-2">2019 – Sep 2025</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Led backend dev for scalable server-side systems & APIs</div>
  <div>▸ Spearheaded API dev — performance, responsiveness, maintainability</div>
  <div>▸ CI/CD with Jenkins & GitLab — <span class="${C.accent}">reduced deployment time by 40%</span></div>
  <div>▸ Docker + Kubernetes orchestration for scalability & reliability</div>
  <div>▸ Automated infra provisioning with Ansible & Terraform</div>
  <div>▸ Mentored junior engineers & conducted code reviews</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Backend Developer</span>
  <span class="${C.dim}">@</span>
  <span class="${C.cyan} font-semibold">Sundarbanx.com</span>
  <span class="${C.dim} ml-2">Sep 2017 – Feb 2018</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Backend features for classified platform (Phalcon PHP)</div>
</div>
`;
  },

  projects() {
    return `
${hdr('SELECTED PROJECTS')}

<div class="mt-3 mb-2">
  <span class="${C.warn} font-semibold">QMS</span>
  <span class="${C.dim}">— SDS Manager</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Designed complete microservices architecture (event-driven, RabbitMQ)</div>
  <div>▸ Defined service communication patterns, backend flow, DB structure</div>
  <div>▸ Led QMS team from backend & architectural perspective</div>
  <div>▸ Built <span class="${C.accent}">MCP server</span> for AI-assisted engineering workflows</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Autoring</span>
  <span class="${C.dim}">— SDS Manager</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Auth & wallet system database architecture</div>
  <div>▸ Backend data models for secure, scalable product growth</div>
  <div>▸ System design for user management & wallet operations</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Nurture Game</span>
  <span class="${C.dim}">— Goama</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Microservices backend: event management + auth services</div>
  <div>▸ Django & FastAPI with PostgreSQL & MongoDB</div>
  <div>▸ Distributed game platform architecture</div>
</div>

<div class="mt-4 mb-2">
  <span class="${C.warn} font-semibold">Monopoly Game</span>
  <span class="${C.dim}">— Goama</span>
</div>
<div class="ml-4 space-y-0.5 ${C.body}">
  <div>▸ Complete backend game logic & APIs</div>
  <div>▸ Django + MySQL for gameplay features & operations</div>
</div>
`;
  },

  education() {
    return `
${hdr('EDUCATION')}

<span class="${C.warn} font-semibold">B.Sc. in Computer Science and Engineering</span>
<span class="${C.cyan}">Daffodil International University</span>, Dhaka

${hdr('CERTIFICATIONS')}

<span class="${C.accent}">Web App Development with PHP</span> — BITM under SEIP Project

${hdr('SOFT SKILLS')}

${tags(['Technical Leadership','Mentoring','Problem Solving','Analytical Thinking','Communication','Team Collaboration','System Design Thinking','Continuous Learning'])}
`;
  },

  contact() {
    return `
${hdr('CONTACT')}

<span class="${C.dim}">Email:</span>    ${link('mailto:rashidul.rahul@gmail.com', 'rashidul.rahul@gmail.com')}
<span class="${C.dim}">WhatsApp:</span> <span class="${C.accent}">+8801623397637</span>

<span class="${C.dim} block mt-4">Type </span><span class="${C.accent}">social</span><span class="${C.dim}"> for GitHub, LinkedIn, and other links.</span>
`;
  },

  social() {
    return `
${hdr('LINKS')}

<span class="${C.dim}">GitHub:</span>   ${link('https://github.com/rashidul-rahul')}
<span class="${C.dim}">LinkedIn:</span> ${link('https://www.linkedin.com/in/rashshidul-rahul/')}
`;
  },

  whoami() {
    return `
<span class="${C.accent} text-base font-semibold">Rashidul Rahul</span>
<span class="${C.dim}">uid=1000(rashidul) gid=1000(rashidul) groups=backend,microservices,ai-engineering</span>
`;
  },

  // ── Aliases ──
  ls()    { return this.help(); },
  man()   { return this.help(); },
  cv()    { return this.about(); },
  exp()   { return this.experience(); },
  prj()   { return this.projects(); },
  stack() { return this.skills(); },
};

// ── BANNER ─────────────────────────────────────────────────
const BANNER = `
<pre class="ascii-art text-emerald-400 leading-tight whitespace-pre overflow-x-auto" style="font-size:9px;line-height:1.15;">
██████╗  █████╗ ███████╗██╗  ██╗██╗██████╗ ██╗   ██╗██╗
██╔══██╗██╔══██╗██╔════╝██║  ██║██║██╔══██╗██║   ██║██║
██████╔╝███████║███████╗███████║██║██║  ██║██║   ██║██║
██╔══██╗██╔══██║╚════██║██╔══██║██║██║  ██║██║   ██║██║
██║  ██║██║  ██║███████║██║  ██║██║██████╔╝╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝╚═════╝  ╚═════╝ ╚══════╝

██████╗  █████╗ ██╗  ██╗██╗   ██╗██╗
██╔══██╗██╔══██╗██║  ██║██║   ██║██║
██████╔╝███████║███████║██║   ██║██║
██╔══██╗██╔══██║██╔══██║██║   ██║██║
██║  ██║██║  ██║██║  ██║╚██████╔╝███████╗
╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
</pre>
<span class="${C.accent} text-base font-semibold">rashidul@rahul</span>

<span class="${C.white}">Scalable backends. Reliable systems. AI-powered workflows.</span>

<span class="${C.dim} mt-2">Type </span><span class="${C.accent}">help</span><span class="${C.dim}"> to see available commands.</span>

`;

// ── ENGINE ─────────────────────────────────────────────────
function runCmd(cmd) {
  cmd = cmd.trim().toLowerCase();
  if (!cmd) return;

  history.push(cmd);
  histIdx = history.length;

  // Echo command with full colored prompt
  out(`<span class="text-cyan-400">rashidul</span><span class="text-neutral-600">@</span><span class="text-purple-400">rahul</span><span class="text-neutral-600">:</span><span class="text-amber-400">~</span><span class="text-emerald-400">$</span> <span class="${C.dim}">${esc(cmd)}</span>`);

  if (cmd === 'clear') {
    output.innerHTML = '';
    out(BANNER);
    return;
  }

  if (cmd === 'banner') {
    out(BANNER);
    return;
  }

  const fn = commands[cmd];
  if (fn) {
    const result = typeof fn === 'function' ? fn() : fn;
    if (result) out(result);
  } else {
    out(`<span class="${C.error}">command not found: ${esc(cmd)}</span>`);
    out(`<span class="${C.dim}">Type </span><span class="${C.accent}">help</span><span class="${C.dim}"> for available commands.</span>`);
  }
}

// ── INPUT HANDLING ─────────────────────────────────────────
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const cmd = input.value;
    input.value = '';
    runCmd(cmd);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histIdx > 0) {
      histIdx--;
      input.value = history[histIdx];
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histIdx < history.length - 1) {
      histIdx++;
      input.value = history[histIdx];
    } else {
      histIdx = history.length;
      input.value = '';
    }
  }
});

// Click anywhere in terminal to focus input (ignore buttons & links)
term.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'A') {
    input.focus();
  }
});

// ── BOOT ───────────────────────────────────────────────────
out(BANNER);
input.focus();

// Expose to window for button onclick handlers
window.runCmd = runCmd;
