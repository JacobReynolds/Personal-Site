const professionEl = document.getElementById("profession");
const mainPicEl = document.getElementById("mainPic");

const professions = [
  "Full-Stack Web Developer",
  "Free-Lance Everything",
  "Go-To Computer Guy",
  "Future Tech Billionaire",
  "Arduino Tinkerer",
  "Scuba Diver",
  "\u270A Unicode Lover",
  "Rock Climber",
  "Cybersecurity Researcher",
  "Founder",
];

let remaining = [...professions];

function cycleProfession() {
  if (remaining.length === 0) {
    remaining = [...professions];
  }
  const index = Math.floor(Math.random() * remaining.length);
  professionEl.textContent = remaining[index];
  remaining.splice(index, 1);
}

function triggerShake(el) {
  el.classList.add("shake");
  el.addEventListener("animationend", () => el.classList.remove("shake"), {
    once: true,
  });
}

// Shake the profession text after 2 seconds
setTimeout(() => triggerShake(professionEl), 2000);

// Cycle profession on hover and click
professionEl.addEventListener("mouseenter", cycleProfession);
professionEl.addEventListener("click", cycleProfession);

// Shake the profile pic on the first hover over the profession
professionEl.addEventListener(
  "mouseenter",
  () => setTimeout(() => triggerShake(mainPicEl), 5000),
  { once: true },
);

// --- Peekaboo effect ---

const peekabooQueue = [];
const PEEKABOO_DURATION = 1500;

function getPeekabooParams() {
  const corner = Math.floor(Math.random() * 4);
  const imgH = mainPicEl.offsetHeight;
  const imgW = mainPicEl.offsetWidth;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const corners = [
    { turn: -135, top: -imgH, topEnd: -imgH / 2, left: vw, leftEnd: vw - imgW / 2 },
    { turn: -45, top: vh, topEnd: vh - imgH / 2, left: vw, leftEnd: vw - imgW / 2 },
    { turn: 45, top: vh, topEnd: vh - imgH / 2, left: -imgW, leftEnd: -imgW / 2 },
    { turn: 135, top: -imgH, topEnd: -imgH / 2, left: -imgW, leftEnd: -imgW / 2 },
  ];

  return corners[corner];
}

function peekaboo() {
  const params = getPeekabooParams();
  const clone = mainPicEl.cloneNode(false);

  clone.removeAttribute("id");
  clone.classList.add("peekaboo");
  Object.assign(clone.style, {
    transform: `rotate(${params.turn}deg)`,
    top: `${params.top}px`,
    left: `${params.left}px`,
  });

  document.body.appendChild(clone);

  const anim = clone.animate(
    [
      { top: `${params.top}px`, left: `${params.left}px` },
      { top: `${params.topEnd}px`, left: `${params.leftEnd}px` },
    ],
    { duration: PEEKABOO_DURATION, fill: "forwards" },
  );

  peekabooQueue.push({ clone, params, anim });
}

function peekaRemoo() {
  const entry = peekabooQueue.shift();
  if (!entry) return;

  entry.anim.cancel();
  const retreat = entry.clone.animate(
    [
      { top: `${entry.params.topEnd}px`, left: `${entry.params.leftEnd}px` },
      { top: `${entry.params.top}px`, left: `${entry.params.left}px` },
    ],
    { duration: 200, fill: "forwards" },
  );

  retreat.onfinish = () => entry.clone.remove();
}

mainPicEl.addEventListener("mouseenter", peekaboo);
mainPicEl.addEventListener("mouseleave", peekaRemoo);
