# Lift Log (standalone app)

A gym workout tracker that runs on its own, without claude.ai. It installs from the browser like a normal app (it gets an app-drawer icon and works offline) and keeps all data on the phone.

## What it does

- **Train**: each set is a row with columns for last time, weight, reps and a done check. Sets can be marked as warm-up (W), drop (D) or to failure (F). There's a warm-up calculator for barbell lifts, a rest timer with a beep, and plate math. You can write notes on each exercise and on the whole workout.
- **Exercise types**: weight × reps, time (plank, sprint-drag-carry, 2-mile run), distance + time (runs, rower, bike) and weight + distance (farmer carry, sled push). The Army fitness test events are in the library.
- **Progression**: each exercise has a rep range. If every working set hits the top of the range, the weight goes up next time. Three sessions in a row below the range triggers a deload of about 10%.
- **Plan**: routines rotate in order. You can edit them and change sets, rep range, weight and increment for each exercise.
- **Progress**: weekly working sets per muscle, a chart per exercise (estimated 1RM, best time or distance), personal records with a "New record" callout after a workout, Lose It food import and a bodyweight log.
- **Coach (copy / paste)**: the app builds a prompt with your data and question. You send it to Claude (or any AI chat), then paste or share the answer back. Changes in the answer's ```` ```liftlog ```` block are listed for approval, with undo.
- **Exercise guide**: every built-in exercise has an animated form demo, muscles worked, step-by-step instructions, form cues and common mistakes. Open it by tapping an exercise's name or its **i** button.
- **Backup / restore** as a JSON file. Backups from the claude.ai version of Lift Log restore here too.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | App shell |
| `styles.css` | Styles (orange-over-grey palette, light and dark) |
| `app.js` | All app logic |
| `exercises.js` | Exercise guide text and the animated form demos |
| `sw.js` | Service worker: offline cache and update-on-request |
| `manifest.webmanifest` | Install info, icons, share target |
| `icons/` | App icons |

No build step. Serve the folder over HTTPS (or `localhost`) and it works.

```sh
cd app && python3 -m http.server 8765   # then open http://localhost:8765
```

## Releasing an update

1. Change the code.
2. Bump `VERSION` in `sw.js` and `APP_VERSION` in `app.js` (keep them the same).
3. Deploy. Open copies show **"A new version of Lift Log is ready — Update"** the next time the app comes to the foreground.

## Hosting (needed before phones can install it)

The app must be served from a public HTTPS address. Any static host works, for example GitHub Pages (requires a public repo, or a paid plan for private), Netlify, Cloudflare Pages or Vercel. Point the host at the `app/` folder.

## Android APK / Play Store (later)

Once it is hosted, it can be wrapped as a Trusted Web Activity (for example with Bubblewrap) to get a real APK. The APK loads the hosted app, so it updates itself whenever a new version is deployed. Play Store publishing needs a Google Play developer account.
