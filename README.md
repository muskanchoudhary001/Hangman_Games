# Hangman Game (HTML/CSS/JavaScript)

A modern, responsive Hangman game built with **vanilla HTML, CSS, and JavaScript**. Guess the hidden word one letter at a time—make too many wrong guesses and the hangman completes.

## Features

- **Random word + hint** from a built-in word list
- **On-screen keyboard** (disables letters after clicking)
- **Hangman progression** using SVG stages (`images/hangman-0.svg` → `images/hangman-6.svg`)
- **Win/Lose modal**
  - **Win**: emojis + confetti celebration
  - **Lose**: sad emojis + subtle shake animation
- **Progress meter** showing wrong guesses (fills as you miss)
- **Responsive UI** for mobile and desktop

## Tech Stack

- **HTML**: `index.html`
- **CSS**: `style.css`
- **JavaScript**: `scripts/script.js`

No frameworks. No build step.

## Project Structure

```text
HANGMAN_GAME/
  index.html
  style.css
  scripts/
    script.js
    word-list.js
  images/
    hangman-0.svg
    hangman-1.svg
    hangman-2.svg
    hangman-3.svg
    hangman-4.svg
    hangman-5.svg
    hangman-6.svg
```

## Requirements

- Any modern browser (Chrome / Edge / Firefox)

## Run Locally

### Option 1: Open the file directly

1. Open `index.html` in your browser.

### Option 2 (Recommended): Run a local server

Some browsers restrict certain behaviors when opening files directly. Using a local server is more reliable.

#### Using VS Code / Cursor Live Server

1. Install the **Live Server** extension
2. Right-click `index.html` → **Open with Live Server**

#### Using Python (if installed)

From the project folder:

```bash
python -m http.server 5500
```

Then open:

- `http://localhost:5500`

## How to Play

1. Look at the **hint**
2. Click letters on the keyboard
3. You have **6** wrong guesses
4. Win by revealing all letters before you run out of guesses

## Customize Words

Edit `scripts/word-list.js` and add more entries:

```js
{ word: "example", hint: "Your hint here." }
```

## Credits

- Hangman SVG stages are used from the `images/` folder included in this project.
