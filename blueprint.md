# Project Blueprint: Dinner Menu Roulette

## Overview

A simple, fun web application that suggests a random dinner menu item to help users decide what to eat.

## Features

*   **Random Menu Suggestion:** A button to generate a random dinner suggestion.
*   **Visual Appeal:** Displays an image of the suggested food.
*   **Dark Mode:** A toggle for light and dark themes.
*   **Responsive Design:** The layout will adapt to different screen sizes.

## Project Structure

*   `index.html`: The main HTML file.
*   `style.css`: The main stylesheet.
*   `main.js`: Contains the JavaScript for the web component and theme toggling.
*   `images/`: A directory to store food images.

## Development Plan

1.  **HTML (`index.html`):**
    *   Update the page title and header to "Dinner Menu Roulette".
    *   Replace the `<lotto-generator>` custom element with `<dinner-roulette>`.

2.  **JavaScript (`main.js`):**
    *   Rename the `LottoGenerator` class to `DinnerRoulette`.
    *   Define a list of dinner menu items with associated image paths.
    *   Modify the `generateNumbers` method to `suggestDinner`. This method will:
        *   Randomly select a menu item from the list.
        *   Display the menu item's name.
        *   Display the corresponding food image.
    *   Update the custom element registration to `customElements.define('dinner-roulette', DinnerRoulette);`.

3.  **CSS (`style.css`):**
    *   Adjust the color palette and typography to fit a food theme.
    *   Add styles for the food image display.
    *   Ensure the layout is responsive.

4.  **Assets:**
    *   Create an `images` directory.
    *   Source and add images for the dinner menu items.

5.  **Deployment:**
    *   Initialize a git repository.
    *   Commit all the code.
    *   Create a new repository on GitHub.
    *   Push the code to the GitHub repository.
    *   Enable GitHub Pages to deploy the site.