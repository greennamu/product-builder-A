
class DinnerRoulette extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.menus = [
            { name: 'Bibimbap', image: 'https://i.imgur.com/2z24b1d.jpeg' },
            { name: 'Bulgogi', image: 'https://i.imgur.com/L4a0pll.jpeg' },
            { name: 'Kimchi Jjigae', image: 'https://i.imgur.com/c4aZf6R.jpeg' },
            { name: 'Japchae', image: 'https://i.imgur.com/IZ5soBv.jpeg' },
            { name: 'Tteokbokki', image: 'https://i.imgur.com/I2a9tSp.jpeg' },
            { name: 'Samgyeopsal', image: 'https://i.imgur.com/jSHsL63.jpeg' },
            { name: 'Pizza', image: 'https://i.imgur.com/eTmWoAN.jpeg' },
            { name: 'Hamburger', image: 'https://i.imgur.com/vBwV9kH.jpeg' },
            { name: 'Sushi', image: 'https://i.imgur.com/x4aQj1o.jpeg' }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --item-bg: #E0E0E0;
                    --item-color: #1a1a1a;
                    --button-bg: linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%);
                    --button-color: #1a1a1a;
                    --button-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }
                
                :host-context(body.dark-mode) {
                    --item-bg: #333;
                    --item-color: #fff;
                    --button-color: #1a1a1a;
                    --button-shadow: 0 4px 15px rgba(0,0,0,0.2);
                }

                .dinner-roulette {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                button {
                    background: var(--button-bg);
                    border: none;
                    color: var(--button-color);
                    padding: 15px 30px;
                    font-size: 1.2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: transform 0.2s, background 0.3s, color 0.3s;
                    margin-bottom: 2rem;
                    box-shadow: var(--button-shadow);
                }

                button:hover {
                    transform: scale(1.05);
                }
                
                button:active {
                    transform: scale(0.95);
                }

                .menu-result {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.5rem;
                }

                .food-image {
                    width: 300px;
                    height: 300px;
                    border-radius: 20px;
                    object-fit: cover;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    animation: fadeIn 1s ease-out;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }
                
                .food-name {
                    font-size: 2.5rem;
                    font-weight: bold;
                    color: var(--item-color);
                    animation: slideIn 0.8s ease-out;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

            </style>
            <div class="dinner-roulette">
                <button>What's for Dinner?</button>
                <div class="menu-result"></div>
            </div>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', () => this.suggestDinner());
    }

    suggestDinner() {
        const menuResult = this.shadowRoot.querySelector('.menu-result');
        const suggestion = this.menus[Math.floor(Math.random() * this.menus.length)];
        
        menuResult.innerHTML = `
            <h2 class="food-name">${suggestion.name}</h2>
            <img src="${suggestion.image}" alt="${suggestion.name}" class="food-image">
        `;
    }
}

customElements.define('dinner-roulette', DinnerRoulette);

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.textContent = '🌙';
    }
};

themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme(currentTheme);
});

// Apply saved theme or system preference on load
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);
