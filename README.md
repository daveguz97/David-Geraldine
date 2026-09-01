# David & Geraldine — Wedding Site (Next.js)

## Routes

- `/` — the envelope intro, hero, countdown, verse, details, gallery, and RSVP form
- `/thankyou` — real route the guest lands on after a successful RSVP

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Wiring up Salesforce (plain Web-to-Lead, no server)

The RSVP form posts straight to Salesforce, same as a classic Web-to-Lead
form — no API route, no environment variables, nothing to deploy on the
backend.

1. In Salesforce: **Setup > Web-to-Lead > Create Web-to-Lead Form**.
   Select the fields you want (First Name, Last Name, Email — add custom
   fields if you want Attending / Guest Count to land in their own columns
   instead of the Description field).
2. Open `components/RsvpForm.js` and set:
   - `ORG_ID` — your Salesforce Org ID from the generated form.
   - `RETURN_URL` — your live site's `/thankyou` URL once hosted, e.g.
     `https://davidandgeraldine.netlify.app/thankyou`. This must be a full
     absolute URL — Salesforce redirects the browser here after a real
     submission, and it can't resolve a relative path from its own domain.
3. If you added custom fields for Attending / Guest Count, swap the
   `attending` / `guests` input `name` attributes for the real API names
   Salesforce gives you (they look like `00N5f00000XXXXX`).

That's it — until `ORG_ID` is filled in, the form still validates properly
in the browser, it just won't have anywhere real to submit to yet.

## Deploying

**Netlify** — connect the repo in the dashboard; it auto-detects Next.js via
the Next Runtime plugin. No environment variables needed for this setup.

**Vercel** (built by the makers of Next.js):
```bash
npm i -g vercel
vercel
```

After deploying, come back and update `RETURN_URL` in `RsvpForm.js` to your
real live domain, then redeploy.

## Project structure

```
app/
  layout.js          global fonts + metadata
  globals.css         all design tokens & styles
  page.js              home page (client component)
  thankyou/page.js    /thankyou route
components/
  Envelope.js          intro animation + petals
  Countdown.js          live countdown to March 28, 2027
  Carousel.js            swipeable photo gallery
  RsvpForm.js             validated RSVP form, posts to Salesforce Web-to-Lead
public/images/           the six gallery photos
```
