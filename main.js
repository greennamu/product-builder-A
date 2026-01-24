
class LottoGenerator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'lotto-generator');

        const button = document.createElement('button');
        button.textContent = 'Generate Numbers';
        button.addEventListener('click', () => this.generateNumbers());

        const numbersContainer = document.createElement('div');
        numbersContainer.setAttribute('class', 'numbers');

        const style = document.createElement('style');
        style.textContent = `
            :host {
                --number-bg: #E0E0E0;
                --number-color: #1a1a1a;
                --button-bg: linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);
                --button-color: #1a1a1a;
                --button-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }
            
            :host-context(body.dark-mode) {
                --number-bg: #333;
                --number-color: #fff;
                --button-color: #1a1a1a;
                 --button-shadow: 0 4px 15px rgba(0,0,0,0.2);
            }

            .lotto-generator {
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

            .numbers {
                display: flex;
                gap: 1rem;
            }

            .number {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: var(--number-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.5rem;
                font-weight: bold;
                color: var(--number-color);
                box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                animation: popIn 0.5s ease-out forwards;
                transition: background 0.3s, color 0.3s;
            }

            @keyframes popIn {
                0% {
                    transform: scale(0);
                    opacity: 0;
                }
                100% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.appendChild(button);
        wrapper.appendChild(numbersContainer);
    }

    generateNumbers() {
        const numbersContainer = this.shadowRoot.querySelector('.numbers');
        numbersContainer.innerHTML = '';
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberDiv = document.createElement('div');
                numberDiv.setAttribute('class', 'number');
                numberDiv.textContent = number;
                this.setNumberColor(numberDiv, number);
                numbersContainer.appendChild(numberDiv);
            }, index * 200);
        });
    }

    setNumberColor(element, number) {
        let backgroundColor;
        let color = '#1a1a1a'; // Default text color for colored balls
        if (number <= 10) {
            backgroundColor = '#fbc400'; // Yellow
        } else if (number <= 20) {
            backgroundColor = '#69c8f2'; // Blue
        } else if (number <= 30) {
            backgroundColor = '#ff7272'; // Red
        } else if (number <= 40) {
            backgroundColor = '#aaa'; // Gray
        } else {
            backgroundColor = '#b0d840'; // Green
        }
        element.style.background = backgroundColor;
        element.style.color = color;
    }
}

customElements.define('lotto-generator', LottoGenerator);

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
