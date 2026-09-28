# Flourish Haven Escape — GitHub Pages

This folder is ready to use as a GitHub repository. It contains the updated 16-page website, 27 property photographs, social links, Google Map and email/WhatsApp enquiry options.

## Publish on GitHub

1. Create a repository on GitHub, for example `flourish-haven-escape`, with `main` as its default branch. A public repository works with GitHub Free; private repository Pages availability depends on your plan.
2. Extract the ZIP. Upload **the contents** of this folder to the repository root, including the `.github` folder. Do not upload the ZIP itself or put everything inside another folder. The repository root must contain `build.mjs`, `dist`, `images`, `scripts` and `.github`.
3. In the repository, open **Settings → Pages → Build and deployment → Source**, then choose **GitHub Actions**.
4. Open **Actions → Deploy Flourish Haven Escape to GitHub Pages → Run workflow**, select `main`, then run it. If an earlier run failed before Pages was enabled, run it again now.
5. Once the workflow succeeds, the published address is shown in **Settings → Pages** and in the deployment result. It normally looks like `https://YOUR-USERNAME.github.io/flourish-haven-escape/`.

The included workflow automatically rebuilds and republishes future changes pushed to `main`. No API keys, payment service or extra Node packages are needed. If uploading through the browser, verify that `.github/workflows/pages.yml` is present; dot folders can be missed by file pickers. Git or GitHub Desktop will preserve that folder.

## Files and editing

```text
.github/workflows/pages.yml  Automatic build and deployment
build.mjs                   Shared layout and page content
images/                     Original property photos
scripts/check.mjs           Link and gallery validation
dist/                       Published website files
  images/                   Photos copied by the build
  index.html                Home page
  contact.html              Map, address and enquiry form
  gallery.html              Captioned gallery with zoom
  styles.css                Base design
  updates.css               Gallery, map and contact styles
  main.js                   Menus, enquiries and gallery behaviour
```

Edit page content in `build.mjs`, styles in `dist/styles.css` and `dist/updates.css`, and interactions in `dist/main.js`. Generated HTML is overwritten on deployment. Keep photographs in the separate `images/` folder; the build copies them to `dist/images/`. If you change the number of gallery photographs, update the expected count in `scripts/check.mjs`.

To build and validate locally with Node.js:

```sh
node build.mjs
node scripts/check.mjs
```

All internal links and assets are relative, so the website supports a repository subpath or a custom domain. Only `dist/` is published; the source photos, documentation and build scripts are not included in the Pages artifact. No previous hosting credentials or repository metadata are included in this package.

## Enquiries and launch content

The forms open a prefilled email or WhatsApp message. Visitors send it in their selected app; GitHub Pages does not process or store form submissions. Availability, pricing and reservations still require confirmation from the property. Legal policy pages remain clearly marked for owner/legal review.

No custom domain has been configured. You can add your domain later in **Settings → Pages → Custom domain**, following GitHub’s DNS instructions.

Reference: [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
