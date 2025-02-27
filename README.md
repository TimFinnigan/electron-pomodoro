# Electron Pomodoro Timer

This is a lightweight and customizable **Pomodoro Timer** built using **Electron**, **HTML**, **CSS**, and **JavaScript**. The timer follows the Pomodoro Technique, where users work for a focused 25-minute session, followed by short breaks. This app is designed to always stay on top of your other applications, keeping your productivity in check!

---

## Features

- **25-Minute Pomodoro Timer**:
  - Displays a countdown from 25 minutes (or 1500 seconds).
  - Notifies the user when the timer completes.

- **Play, Pause, and Reset**:
  - Start or pause the timer with a toggle button.
  - Reset the timer to 25 minutes with a reset button.

- **Progress Bar**:
  - Visually represents the remaining time in the form of a circular progress bar.

- **Customizable Styling**:
  - Clean and modern interface styled with CSS, including drag-and-drop functionality for repositioning.

- **Electron Integration**:
  - The timer runs as a desktop app, staying always on top of other windows.
  - Non-resizable and focused user interface.

---

## Project Structure

```
/electron-pomodoro
├── renderer.js         # JavaScript for timer functionality
├── index.html          # HTML structure of the timer
├── main.js             # Electron's main process script
├── style.css           # CSS styles for the timer
├── .gitignore          # Git ignore file
├── package.json        # Node.js project metadata
├── package-lock.json   # Dependency lock file
└── file_summaries.json # Summaries of project files (generated by a script)
```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/electron-pomodoro.git
   cd electron-pomodoro
   ```

2. **Install Dependencies**:
   Ensure you have **Node.js** and **npm** installed, then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

---

## Usage

1. Launch the application using `npm start` or by running the executable (if built).
2. Use the **Play/Pause** button to toggle the timer.
3. Use the **Reset** button to reset the timer to 25 minutes.
4. Watch the circular progress bar for a visual representation of the remaining time.
5. When the timer completes, an alert notifies you and displays the current time.

---

## File Descriptions

### 1. `renderer.js`
This file implements the core functionality of the Pomodoro Timer:
- **Timer Logic**:
  - Handles countdown logic for 25 minutes.
  - Pauses and resumes the timer when toggled.
  - Resets the timer when the reset button is clicked.
- **UI Interactions**:
  - Updates the progress bar to reflect remaining time.
  - Toggles the visibility of timer text when clicked.
- **Alert on Completion**:
  - Displays an alert notifying the user when the timer completes.

---

### 2. `index.html`
This file provides the basic structure of the Pomodoro Timer:
- Includes a **timer display**, **Play/Pause button**, and a **Reset button**.
- Links to the external CSS (`style.css`) and JavaScript (`renderer.js`).

---

### 3. `main.js`
This is the Electron **main process script**:
- Creates a desktop app window using Electron's `BrowserWindow` API.
- Configures the window to:
  - Be always on top.
  - Be non-resizable and non-fullscreenable.
  - Load the `index.html` file.
  - Quit the app when all windows are closed (except on macOS).

---

### 4. `style.css`
This file styles the timer and its elements:
- **Body**:
  - Full viewport height, flex layout, centered content.
- **Container**:
  - Semi-transparent black background with a shadow, draggable.
- **Progress Bar**:
  - Circular progress bar with gradient effects and a centered timer.
- **Timer Text**:
  - Bold, clickable, and positioned above the circular hole.
- **Buttons**:
  - Styled with gradients, hover effects, and responsive transitions.

---

## Customization

### Modify Timer Duration
To change the Pomodoro duration, update the timer initialization in `renderer.js`:
```javascript
const pomodoroTime = 1500; // Default: 25 minutes
```
Replace `1500` with the desired time in seconds (e.g., `1800` for 30 minutes).

### Style Customization
Edit `style.css` to update the theme, fonts, or button styles.

---

## Future Enhancements

- **Custom Timer Settings**:
  - Allow users to set custom durations for work sessions and breaks.
- **Break Notifications**:
  - Notify users when it’s time for a break or to resume work.
- **Statistics Tracking**:
  - Log completed Pomodoro sessions for productivity tracking.

