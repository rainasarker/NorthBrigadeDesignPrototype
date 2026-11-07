const body = document.body;
document
  .querySelector(`[data-concept="${body.dataset.design}"]`)
  ?.setAttribute("aria-current", "page");
const menu = document.querySelector(".menu"),
  nav = document.querySelector("#nav");
menu?.addEventListener("click", () => {
  const state = menu.getAttribute("aria-expanded") !== "true";
  menu.setAttribute("aria-expanded", String(state));
  nav.classList.toggle("open", state);
});
nav?.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menu.setAttribute("aria-expanded", "false");
  }),
);
let toastTimer, twinkleTimer;
function toast(text) {
  const el = document.querySelector("#toast");
  el.textContent = text;
  el.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("visible"), 4200);
}
document.querySelectorAll("[data-colour]").forEach((b) =>
  b.addEventListener("click", () => {
    body.classList.toggle("alternate-sky");
    toast(
      body.classList.contains("alternate-sky")
        ? "A little violet magic in the northern sky."
        : "The mint-green northern lights are back.",
    );
  }),
);
document.querySelectorAll("[data-spark]").forEach((b) =>
  b.addEventListener("click", () => {
    body.classList.add("twinkle");
    clearTimeout(twinkleTimer);
    twinkleTimer = setTimeout(() => body.classList.remove("twinkle"), 3000);
    toast("A little northern magic. Your next adventure starts here.");
  }),
);
let trailIndex = 0;
const trails = [
  "You don’t need to be fearless. Just curious.",
  "Everyone starts somewhere. This could be your somewhere.",
  "Find your strength. Bring your people.",
  "One class. One new connection. One step forward.",
];
document
  .querySelectorAll("[data-trail]")
  .forEach((b) =>
    b.addEventListener("click", () =>
      toast(trails[trailIndex++ % trails.length]),
    ),
  );
const info = document.querySelector("#info"),
  trial = document.querySelector("#trial"),
  form = trial?.querySelector("form");
let program = "Help me choose";
function showTrial(interest = "Help me choose") {
  if (info.open) info.close();
  nav.classList.remove("open");
  menu.setAttribute("aria-expanded", "false");
  form.reset();
  document.querySelector("#trial-fields").hidden = false;
  document.querySelector("#trial-success").hidden = true;
  form.elements.program.value = interest;
  trial.showModal();
}
document
  .querySelectorAll("[data-trial]")
  .forEach((b) => b.addEventListener("click", () => showTrial()));
const content = {
  youth: {
    title: "Grow with the pack.",
    kicker: "KIDS & TEENS / FIND THEIR FIRST STEP",
    body: "Confidence, discipline, and friendship are at the heart of the academy’s youth experience. Talk with the team about your child’s age and interests to find a suitable program and trial. Exact age groups, class times, and eligibility will be confirmed by the academy.",
    program: "Kids & teens",
  },
  kick: {
    title: "Find your rhythm.",
    kicker: "KICKBOXING & FITNESS / YOUR NEXT CHALLENGE",
    body: "Explore Kickboxing and fitness at North Brigade Academy. Whether you’re new to training or looking for a fresh challenge, the team can help you understand the current options. Class availability, equipment requirements, and memberships will be confirmed by the academy.",
    program: "Kickboxing & fitness",
  },
  bjj: {
    title: "Keep learning. Rise together.",
    kicker: "JIU-JITSU & MMA / MORE THAN THE MATS",
    body: "Discover Brazilian Jiu-Jitsu and MMA in a community that welcomes first-timers, recreational members, and competitive athletes. Ask the team which class matches your experience and goals. Current class groupings and availability will be confirmed by the academy.",
    program: "Jiu-Jitsu & MMA",
  },
  story: {
    title: "The spirit of the Brigade.",
    kicker: "ROOTED IN ATHABASCA / BUILT AROUND PEOPLE",
    body: "The academy’s bison identity reflects strength, resilience, and connection to the north. Its wolf-themed youth program carries the spirit of loyalty, courage, and community. North Brigade Academy’s vision is to be a second home in Athabasca: a place where people train, find confidence, and grow stronger together.",
    program: "Help me choose",
  },
};
function showInfo(key) {
  const c = content[key];
  program = c.program;
  document.querySelector("#detail-title").textContent = c.title;
  document.querySelector("#detail-kicker").textContent = c.kicker;
  document.querySelector("#detail-body").textContent = c.body;
  info.showModal();
}
document
  .querySelectorAll("[data-detail]")
  .forEach((b) =>
    b.addEventListener("click", () => showInfo(b.dataset.detail)),
  );
document
  .querySelectorAll("[data-story]")
  .forEach((b) => b.addEventListener("click", () => showInfo("story")));
document
  .querySelector("#detail-trial")
  ?.addEventListener("click", () => showTrial(program));
document.querySelectorAll("dialog").forEach((d) => {
  d.querySelector(".close").addEventListener("click", () => d.close());
  d.addEventListener("click", (e) => {
    if (e.target === d) {
      const r = d.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        d.close();
    }
  });
});
trial?.addEventListener("close", () => form.reset());
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector("#trial-fields").hidden = true;
  document.querySelector("#trial-success").hidden = false;
  form.reset();
  document.querySelector("#trial-success a").focus();
});
const plans = {
  family: {
    title: "A little courage. A big beginning.",
    text: "Talk with the team about your child’s age, interests, and the right youth program. Ask about available trials and what to bring along.",
    num: "01",
  },
  beginner: {
    title: "Your first step is enough.",
    text: "You don’t need experience to explore martial arts. Tell the team what you want to try, ask about a suitable beginner class, and confirm what to wear before your visit.",
    num: "02",
  },
  experienced: {
    title: "Your next chapter starts here.",
    text: "Share your training background and goals with the team. They can help you explore Brazilian Jiu-Jitsu, Kickboxing, MMA, or fitness and find a class that fits your experience.",
    num: "03",
  },
};
const tabs = [...document.querySelectorAll("[data-plan]")];
function changePlan(tab) {
  tabs.forEach((b) => {
    b.setAttribute("aria-selected", String(b === tab));
    b.tabIndex = b === tab ? 0 : -1;
  });
  const c = plans[tab.dataset.plan],
    panel = document.querySelector("#plan-panel");
  panel.setAttribute("aria-labelledby", tab.id);
  panel.querySelector("h3").textContent = c.title;
  panel.querySelector("p").textContent = c.text;
  panel.querySelector(".plan-number").textContent = c.num;
}
tabs.forEach((b, i) => {
  b.addEventListener("click", () => changePlan(b));
  b.addEventListener("keydown", (e) => {
    let next;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    if (e.key === "ArrowLeft") next = (i + tabs.length - 1) % tabs.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = tabs.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      tabs[next].focus();
      changePlan(tabs[next]);
    }
  });
});

document.querySelectorAll("[data-northern-lights]").forEach((button) =>
  button.addEventListener("click", () => {
    const awake = document.body.classList.toggle("aurora-awake");
    document.body.classList.toggle("forest-lit", awake);
    button.setAttribute("aria-pressed", String(awake));
    button.textContent = awake
      ? "✧ Let the sky settle"
      : "✧ Wake the northern sky";
  }),
);
const natureStories = {
  forest: {
    title: "Deep roots. Room to grow.",
    kicker: "THE FOREST / ROOTED IN ATHABASCA",
    text: "Northern Alberta’s forests reflect the grounded, resilient spirit behind North Brigade Academy. The academy’s vision is to be a second home in Athabasca: a place where people build confidence, make connections, and grow stronger together.",
  },
  bison: {
    title: "Strength with a northern spirit.",
    kicker: "THE BISON / NORTH BRIGADE ACADEMY",
    text: "The bison is part of the academy’s existing identity, reflecting strength, resilience, and a connection to the northern wilderness. That spirit is carried into a community that values courage, discipline, and the confidence to take the next step.",
  },
  wolf: {
    title: "There’s strength in the pack.",
    kicker: "THE WOLF / GROWING TOGETHER",
    text: "The academy’s wolf-themed youth program reflects loyalty, courage, and belonging. Martial arts is about more than technique: it can build discipline, friendship, and a sense of being part of something. Ask the team about the right program for your child.",
  },
};
document.querySelectorAll("[data-nature]").forEach((button) =>
  button.addEventListener("click", () => {
    const item = natureStories[button.dataset.nature];
    program = "Help me choose";
    document.querySelector("#detail-title").textContent = item.title;
    document.querySelector("#detail-kicker").textContent = item.kicker;
    document.querySelector("#detail-body").textContent = item.text;
    info.showModal();
  }),
);
