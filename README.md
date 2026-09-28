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

This is enforced by `firestore.rules` on Google's servers, not just hidden in the app.

## Setup (about 20 minutes)

### 1. Create the Firebase project
1. Go to https://console.firebase.google.com and create a project (free Spark plan is enough).
2. **Build > Firestore Database > Create database.** Pick a location near you and start in **production mode**.
3. **Build > Authentication > Get started.** Enable **Email/Password** and **Google**.
4. **Project settings > General > Your apps > Add app > Web.** Copy the config values into `firebase-config.js`.

### 2. Add the security rules
Firestore Database > **Rules** tab. Replace everything with the contents of `firestore.rules`, then **Publish**.

### 3. Host it on GitHub Pages
1. Create a GitHub repo and upload every file in this folder (keep the `icons` folder).
2. Repo **Settings > Pages**. Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Your app will be at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
4. Back in Firebase: **Authentication > Settings > Authorized domains > Add domain** and add `YOUR-USERNAME.github.io`. Sign-in won't work until you do this.

### 4. Install on a phone
- **iPhone:** open the link in Safari > Share > Add to Home Screen.
- **Android:** open in Chrome > menu > Install app.

On iPhone, use **email sign-in inside the installed app**. Google sign-in works best in the regular browser.

## Using it with your team
1. The coach signs up, picks **Coach**, and creates the team. The app shows a 6-character join code.
2. Lifters sign up and join with the code. They show up as pending.
3. The coach approves them on the Team tab.

## Notes
- Data from the Claude artifact version doesn't carry over automatically. Export a CSV from the old version (Settings) and import it in the new one.
- The Firebase keys in `firebase-config.js` are meant to be public; the rules are what protect the data. It's fine to commit them.
- Free Firebase limits (50k reads and 20k writes per day) are plenty for a school team.
- Coaches appointed by another coach (instead of the team creator) still work, since every approval now lives in one roster document per team.
