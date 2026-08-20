/* ==========================================================================
   THE WHISPERING SPIRITS — Events data
   ==========================================================================
   HOW TO ADD A NEW EVENT
   1. Copy one entry below (from the opening { to the closing },)
   2. Paste it as a new entry in the EVENTS array.
   3. Change the details between the quote marks.
   4. Save the file — the Events page updates automatically.

   FIELD NOTES
   - date       must be in YYYY-MM-DD format (used to sort & detect past events)
   - time       24-hour "HH:MM", shown to visitors as a normal start time
   - status     one of: "BOOK NOW", "LIMITED AVAILABILITY", "SOLD OUT", "COMING SOON"
   - bookingUrl the external ticketing page (Eventbrite, Ticket Tailor, Skiddle, etc.)
                Leave as REPLACE_WITH_EVENT_BOOKING_URL until you have a real link.
   - image      path to an image in assets/event-images/ (any reasonable size/ratio)

   Events with a date in the past are moved to the "Past Investigations"
   list automatically — you do not need to delete or move them yourself.
   ========================================================================== */

const EVENTS = [
  {
    title: "The Ancient Manor",
    date: "2026-10-24",
    time: "19:30",
    location: "Example Location, Yorkshire",
    description: "An overnight vigil at a Victorian manor house with a long-reported history of paranormal activity. Includes a guided walk-through, group and small-team investigation sessions, and a debrief of the evening's findings.",
    price: "£45",
    status: "BOOK NOW",
    image: "assets/event-images/placeholder-event-1.jpg",
    bookingUrl: "REPLACE_WITH_EVENT_BOOKING_URL"
  },
  {
    title: "The Old Assize Court",
    date: "2026-11-14",
    time: "20:00",
    location: "Example Location, Lancashire",
    description: "A former courthouse and holding cells, investigated using a mix of traditional and equipment-based methods. Suited to those with some investigation experience.",
    price: "£40",
    status: "LIMITED AVAILABILITY",
    image: "assets/event-images/placeholder-event-2.jpg",
    bookingUrl: "REPLACE_WITH_EVENT_BOOKING_URL"
  },
  {
    title: "The Forgotten Asylum",
    date: "2026-12-05",
    time: "19:00",
    location: "Example Location, Derbyshire",
    description: "A disused Victorian asylum with an extensive documented history. This is one of our longer investigations, split across several wards and outbuildings.",
    price: "£50",
    status: "COMING SOON",
    image: "assets/event-images/placeholder-event-3.jpg",
    bookingUrl: "REPLACE_WITH_EVENT_BOOKING_URL"
  },
  {
    title: "The Harbourmaster's House",
    date: "2026-09-06",
    time: "19:30",
    location: "Example Location, Whitby",
    description: "A coastal property with reports spanning several decades. A smaller, more intimate investigation with limited places.",
    price: "£38",
    status: "SOLD OUT",
    image: "assets/event-images/placeholder-event-4.jpg",
    bookingUrl: "REPLACE_WITH_EVENT_BOOKING_URL"
  }
];

/* ==========================================================================
   Nothing below this line needs editing.
   ========================================================================== */
