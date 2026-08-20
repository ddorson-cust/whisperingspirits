/* ==========================================================================
   THE WHISPERING SPIRITS — Event rendering
   Reads the EVENTS array from events-data.js and builds event cards.
   Used by events.html (full list + past list) and index.html (next 3
   upcoming events preview).
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof EVENTS === "undefined") return;

  const todayStr = new Date().toISOString().slice(0, 10);
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => e.date >= todayStr);
  const past = sorted.filter((e) => e.date < todayStr).reverse();

  renderInto("#home-upcoming-grid", upcoming.slice(0, 3), { emptyText: "New investigations are being announced soon — check back shortly." });
  renderInto("#events-upcoming-grid", upcoming, { emptyText: "No investigations are currently scheduled. Follow us on social media to be the first to know when new dates are announced." });
  renderInto("#events-past-grid", past, { isPast: true });

  const pastSection = document.querySelector("#past-events-section");
  if (pastSection) pastSection.style.display = past.length ? "" : "none";

  wireScrollRevealForCards();
});

function renderInto(selector, events, opts = {}) {
  const el = document.querySelector(selector);
  if (!el) return;

  if (!events.length) {
    if (opts.emptyText) {
      el.innerHTML = `<p class="empty-state">${opts.emptyText}</p>`;
    }
    return;
  }

  el.innerHTML = events.map((e) => eventCardHTML(e, opts.isPast)).join("");
}

function eventCardHTML(event, isPast) {
  const dateLabel = formatDate(event.date);
  const timeLabel = formatTime(event.time);
  const status = isPast ? "PAST INVESTIGATION" : (event.status || "BOOK NOW");
  const soldOut = status === "SOLD OUT";
  const comingSoon = status === "COMING SOON";

  let actionHTML;
  if (isPast) {
    actionHTML = `<span class="btn btn-disabled">Archived</span>`;
  } else if (soldOut) {
    actionHTML = `<span class="btn btn-disabled" aria-disabled="true">Sold Out</span>`;
  } else if (comingSoon) {
    actionHTML = `<span class="btn btn-disabled" aria-disabled="true">Coming Soon</span>`;
  } else {
    const url = event.bookingUrl && event.bookingUrl !== "REPLACE_WITH_EVENT_BOOKING_URL" ? event.bookingUrl : "#";
    const disabledNote = url === "#" ? ` title="Booking link not yet configured"` : "";
    actionHTML = `<a class="btn btn-primary" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer"${disabledNote}>Book Now</a>`;
  }

  return `
    <article class="event-card reveal">
      <div class="event-media">
        <img src="${escapeAttr(event.image)}" alt="${escapeAttr(event.title)}" loading="lazy" />
        <span class="event-status" data-status="${escapeAttr(status)}">${escapeHTML(status)}</span>
      </div>
      <div class="event-body">
        <span class="event-location-tag">${escapeHTML(event.location)}</span>
        <h3 class="event-title">${escapeHTML(event.title)}</h3>
        <div class="event-meta">
          <span>${iconCalendar()} ${escapeHTML(dateLabel)}</span>
          <span>${iconClock()} ${escapeHTML(timeLabel)}</span>
        </div>
        <p class="event-desc">${escapeHTML(event.description)}</p>
        <div class="event-footer">
          <span class="event-price">${event.price ? escapeHTML(event.price) + " <small>per person</small>" : ""}</span>
          ${actionHTML}
        </div>
      </div>
    </article>
  `;
}

function formatDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
}

function formatTime(hhmm) {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

function escapeHTML(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  }[c]));
}
function escapeAttr(str) { return escapeHTML(str); }

function iconCalendar() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="16" rx="1"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>`;
}
function iconClock() {
  return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>`;
}

function wireScrollRevealForCards() {
  const items = document.querySelectorAll(".event-card.reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );
  items.forEach((el) => observer.observe(el));
}
