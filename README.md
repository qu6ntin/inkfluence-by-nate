# Inkfluence by Nate — Website

Custom tattoo studio website for **Inkfluence by Nate**, based in the Chippewa of
the Thames First Nation, Ontario.

Static site (HTML / CSS / vanilla JS) — no build step required.

## Structure

```
inkfluence-by-nate/
├── index.html        # Page markup (all sections)
├── styles.css        # Theme, layout, animations (colors via CSS variables in :root)
├── script.js         # Scroll reveal, parallax, counters, mobile nav, admin modal
└── images/           # All photos + logo
    ├── hero.jpg          # Hero background (Nate + neon sign)
    ├── logo.jpg          # Logo (solid background)
    ├── InkfluencePNG.png # Logo (transparent — used in header/footer)
    ├── TheArtist.jpg     # About-section action shot
    ├── Tattoo1..6.jpg    # Portfolio gallery
    └── README.txt        # Image swap-by-filename guide
```

## Run locally

It's plain static files, so any static server works. For example:

```bash
npx serve .
```

Then open the printed `http://localhost:...` address.

## Editing

- **Colors / theme:** edit the CSS variables in `:root` at the top of `styles.css`
  (the accent blue is `--accent`).
- **Photos:** drop replacements into `images/` using the same filenames.

## Admin login

The footer has an **Admin Login** button. The UI is in place but is **not yet
connected to a real authentication backend**. Planned: invite-only login + content
editing via **Decap CMS + Netlify Identity** (no public sign-up).
