# Barbers Boutique: design rationale

This is the thinking behind the concept site, including what went wrong on the way. It is written to be read by the designer or developer who picks it up next.

## 1. The brief, as I understood it

- A concept site for Barbers Boutique, 37-39 Bloom Street, Manchester, built from the owner's real photos, crest logo and contact details.
- It should feel classy and a little sexy, so that people ask who built it. Nothing cliché, nothing that reads as AI-generated.
- It must be React, Tailwind CSS and Framer Motion, with the demo banner at the very top.
- Every site gets its own design. The logo is always on the site.

## 2. What I got wrong first, and what I learned

**Version one reused the concept from a previous site** (arches, a blush palette, Marcellus). It also dropped the logo. Both mistakes came from the same place: I treated a stored style as a template. A concept belongs to one client. It has to come from that client's own material, so I rebuilt from scratch, and the logo is now in the nav and footer.

**Version two led with a logo seal and the address.** That is brochure thinking. A barbershop sells the cut, so the hero should show the cut. I rebuilt the hero around the best photo and moved the address down to the visit section and footer.

## 3. Where the concept came from

I looked at the photos before choosing anything. Three things repeat across them: **red walls, black capes, and profile or back-of-head views.**

- **Red and black** came straight from the shop and from the crest. The red is a deep lacquer, not a bright primary, so it reads as rich rather than loud.
- **"Dressed from the neck up"** is the idea behind the headline. The shop calls itself a boutique, and boutiques sell clothes, so the cut is treated like a garment. That joke gave me both the headline and the clothes rail.
- **Cuts are viewed from behind and the side**, so the copy talks about checking a cut "from the front, the side and behind, then finished with a mirror in your hand." This is the idea that carries through the site.

## 4. Decisions, section by section

**Opening.** Two black panels part like barber capes. It is the one orchestrated page-load moment. After it, the headline lines rise in sequence. I kept everything else on the page quiet.

**Hero.** The best photo (fade and beard) fills the right side and dissolves into the red, so the image and the colour feel like one surface. On phones the photo comes first, then the headline overlaps its lower edge.

**The rail.** Cuts hang on a clothes rail like garments, lit on a dark stage so the photos and the red cursor glow stand out. The arrows are on every screen size, and each card has a clear red Book button. This is the memorable element, so I spent the effort here. Three interactions answer what the person does:
- Cards wake up from muted to full colour as the cursor, or the scroll position on touch devices, gets close.
- A soft red glow follows the cursor across the section.
- Cards swing slightly with page-scroll speed, like a real rail being pushed. They also swing in once when they first appear.

I removed sideways-scroll sway after it made the rail's width wobble, because rotated cards change the scrollable width. Browsing is by drag, swipe or arrows, with a progress bar.

**The statement band.** One sentence fills in word by word as you scroll, on a full red band that echoes the hero. It slows the page down before the services and states the idea in plain words.

**Services as a bento grid.** A list felt like every barber site. Mixed tile sizes give the grid rhythm and let the big tile (skin fade) lead. On hover, every tile floods with the same red as the lead tile, sweeping up from the bottom, while a photo fades in and zooms very slowly. The motion answers a hover or focus, so it is never decoration.

**Booking as an appointment ticket.** The form is a ticket whose red stub updates live with the service, day, time and name. Submitting stamps it "Requested". The site says clearly that it is a demo and nothing is sent.

**Footer.** The address, phone and email live here and in the visit section. A huge faded wordmark runs across the bottom as a quiet finish.

## 5. Type and colour

- **Gloock** for headlines: a bold, high-contrast serif with fashion-magazine drama that matches the sharp crest. It replaced Bodoni Moda, which read too thin on screen. **Outfit** for body text: clean and modern.
- **Palette:** lacquer red `#a3111c`, near-black oxblood `#1a0a0d`, chalk `#f4f4f2`, a soft rose-grey tint, and ink `#161212`. Dark mode is supported. The logo always sits on a fixed chalk circle so its black parts stay visible.

## 6. Things I deliberately avoided

- Cream background with a terracotta accent, near-black with acid green, and newspaper hairline grids. These are the usual signs of a generated page.
- One word of a headline picked out in italics or colour, all-caps labels above headings, and numbered markers on content that is not a sequence.
- Scissors, barber poles and gold-on-black.
- A gallery of low-resolution photos. I only used the four sharp photos plus the high-resolution fade and beard shot. Two tiny 206px images were left out because they would look soft.

## 7. Mobile

- One column throughout. The hero stacks photo first, then headline. The nav shrinks to the crest chip and the Book button.
- The rail becomes a swipe row with snapping, and the next card peeks in as the cue. The arrow buttons are hidden on phones because swiping is natural.
- The bento grid becomes a single column. The big tile gets extra height and a smaller headline so text never fights the photo.
- Section padding is reduced on small screens, and chips and buttons have comfortable tap sizes.
- Hover effects have no touch equivalent, so the wake-up effect on the rail follows scroll position, and a tap on a service tile goes straight to the booking form.

## 8. What I could not verify, and what is placeholder

- I could not open the site in a browser from my environment, so layout and animation were reasoned from the code. Please test on a real phone and a laptop.
- Service names and descriptions are placeholders. Opening hours and prices are not included because I was not given them.
- Some photos are reused across tiles with different crops. Better, dedicated photos would improve the services section.

## 9. Running the project

```
npm install
npm run dev
```

React, Tailwind CSS and Framer Motion. Photos and the logo are in `src/assets`. `preview.html` is a self-contained copy of the published page. It still loads React, Tailwind and Framer Motion from CDNs, so it needs an internet connection.
