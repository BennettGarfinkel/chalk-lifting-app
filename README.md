# Chalk

A powerlifting training log for teams. Lifters log workouts; coaches see everything for their team; teammates see a PR board and who's been training.

It's a Progressive Web App: host it on any static site, open it on a phone, and use "Add to Home Screen" to install it.

## What's in here

| File | What it does |
|---|---|
| `index.html` | The whole app |
| `firebase-config.js` | Your Firebase project settings (you fill this in) |
| `firestore.rules` | Server-side security rules: who can read and write what |
| `manifest.json`, `sw.js`, `icons/` | Make it installable and let it open offline |

## Who sees what

- **Coach** (team creator, or anyone they promote): every lifter's full log, maxes, bodyweight, notes and comments for their team.
- **Approved lifters**: their own full log, plus each teammate's name, actual 1RM PRs (heaviest logged single), and whether they trained today or this week.
- **Pending members** (entered a join code, not approved yet): nothing from the team.