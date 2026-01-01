// Dynamic year
document.getElementById("year").textContent = new Date().getFullYear();

// Custom cursor with reduced motion support
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");
const motionSafe = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (motionSafe && cursorDot && cursorOutline) {
  window.addEventListener("mousemove", (e) => {
    const { clientX, clientY } = e;

    cursorDot.style.left = `${clientX}px`;
    cursorDot.style.top = `${clientY}px`;

    cursorOutline.animate(
      { left: `${clientX}px`, top: `${clientY}px` },
      { duration: 120, fill: "forwards" }
    );
  });
} else {
  if (cursorDot) cursorDot.style.display = "none";
  if (cursorOutline) cursorOutline.style.display = "none";
}

// Simple 3D tilt effect (no transform conflicts)
const tiltEls = document.querySelectorAll("[data-tilt]");

tiltEls.forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10; // max ~10deg
    const rotateY = ((x - centerX) / centerX) * 10;

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "rotateX(0deg) rotateY(0deg)";
  });
});

// Scroll reveal for cards
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

/* ========= Dynamic projects from backend ========= */

async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  try {
    const res = await fetch("/api/projects");
    if (!res.ok) throw new Error("Failed to load projects");

    const data = await res.json();
    if (!data.ok || !Array.isArray(data.projects)) {
      throw new Error("Bad projects data");
    }

    grid.innerHTML = "";

    data.projects.forEach((project) => {
      const article = document.createElement("article");
      article.className = "project-card card-3d glass reveal";

      article.innerHTML = `
        <div class="project-header">
          <h3>${project.title}</h3>
          <span class="project-tag">${project.tag}</span>
        </div>
        <p>${project.description}</p>
        <ul class="project-meta">
          ${project.tech.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="project-links">
          <a href="${project.liveUrl}" target="_blank" rel="noreferrer">Live</a>
          <a href="${project.codeUrl}" target="_blank" rel="noreferrer">Code</a>
        </div>
      `;

      grid.appendChild(article);
    });

    // Attach reveal animation to newly created cards
    const newReveals = grid.querySelectorAll(".reveal");
    newReveals.forEach((el) => observer.observe(el));
  } catch (err) {
    console.error(err);
    grid.innerHTML =
      "<p style='color:#f97373;'>Failed to load projects.</p>";
  }
}

loadProjects();

/* ========= Contact form wired to backend ========= */

const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form && statusEl) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Sending...";
    statusEl.style.color = "#a5b4fc";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();
      if (data.ok) {
        statusEl.textContent = "Message sent. Thanks for reaching out.";
        statusEl.style.color = "#22c55e";
        form.reset();
      } else {
        statusEl.textContent = data.error || "Something went wrong.";
        statusEl.style.color = "#f97373";
      }
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Could not send. Try again.";
      statusEl.style.color = "#f97373";
    }
  });
}
