Inkfluence by Nate — image slots
=================================

Drop images into THIS folder using these exact filenames and they'll
appear on the site (swap-by-filename, no code changes needed):

  logo.png    -> studio logo. In index.html, uncomment the <img class="brand-logo">
                 line in the header and delete (or keep) the text wordmark.

  hero.jpg    -> full-screen hero background. In styles.css, find ".hero-bg"
                 and uncomment the two background-image lines.

  about.jpg   -> portrait of Nate / studio shot (tall 4:5 works best).
                 Replace the .img-slot div marked data-slot="about.jpg".

  work-1.jpg ... work-6.jpg  -> gallery / portfolio photos (square 1:1).

How to replace a placeholder slot with a real <img>:
  Replace:  <div class="img-slot"><span class="img-slot-label">images/work-1.jpg</span></div>
  With:     <img src="images/work-1.jpg" alt="Tattoo by Nate" />

Recommended sizes:
  hero.jpg    ~1920x1080
  about.jpg   ~800x1000
  work-*.jpg  ~1000x1000
