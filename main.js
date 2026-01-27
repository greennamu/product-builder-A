const translations = {
    ko: {
        'page-title': '저녁 메뉴 룰렛',
        'main-title': '저녁 메뉴 룰렛',
        'theme-toggle-label': '테마 전환',
        'lang-toggle-aria': '영어로 전환',
        'roulette-button': '오늘 저녁 뭐 먹지?',
        'bibimbap': '비빔밥',
        'bulgogi': '불고기',
        'kimchi-jjigae': '김치찌개',
        'japchae': '잡채',
        'tteokbokki': '떡볶이',
        'samgyeopsal': '삼겹살',
        'pizza': '피자',
        'hamburger': '햄버거',
        'sushi': '스시'
    },
    en: {
        'page-title': 'Dinner Menu Roulette',
        'main-title': 'Dinner Menu Roulette',
        'theme-toggle-label': 'Toggle Theme',
        'lang-toggle-aria': 'Switch to Korean',
        'roulette-button': 'What\'s for dinner?',
        'bibimbap': 'Bibimbap',
        'bulgogi': 'Bulgogi',
        'kimchi-jjigae': 'Kimchi Jjigae',
        'japchae': 'Japchae',
        'tteokbokki': 'Tteokbokki',
        'samgyeopsal': 'Samgyeopsal',
        'pizza': 'Pizza',
        'hamburger': 'Hamburger',
        'sushi': 'Sushi'
    }
};

let currentLang = 'ko';

class DinnerRoulette extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        this.menus = [
            { nameKey: 'bibimbap', image: '' },
            { nameKey: 'bulgogi', image: '' },
            { nameKey: 'kimchi-jjigae', image: '' },
            { nameKey: 'japchae', image: '' },
            { nameKey: 'tteokbokki', image: '' },
            { nameKey: 'samgyeopsal', image: '' },
            { nameKey: 'pizza', image: 'images/pizza.png' },
            { nameKey: 'hamburger', image: 'images/hamburger.jpg' },
            { nameKey: 'sushi', image: '' }
        ];

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    gap: 30px;
                }
                
                button {
                    background: var(--point-purple);
                    border: none;
                    color: white;
                    padding: 15px 30px;
                    font-size: 1.2rem;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: transform 0.2s, box-shadow 0.2s;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
                    font-weight: bold;
                    width: 80%;
                    max-width: 250px;
                    order: 1;
                }

                button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
                }
                
                button:active {
                    transform: translateY(0) scale(0.98);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
                }

                .menu-result {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 20px;
                    min-height: 250px;
                    justify-content: center;
                    width: 100%;
                    order: 0;
                }
                
                .food-image {
                    width: 150px;
                    height: 150px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid white;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    animation: imageFadeIn 0.5s ease-in-out;
                }
                
                .food-name {
                    background-color: var(--point-blue);
                    color: white;
                    padding: 10px 25px;
                    border-radius: 50px;
                    font-size: 2rem;
                    font-weight: bold;
                    text-align: center;
                    animation: fadeIn 0.8s ease-out 0.2s;
                    animation-fill-mode: backwards;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    max-width: 90%;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes imageFadeIn {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }

            </style>
            <div class="dinner-roulette">
                <div class="menu-result"></div>
                <button data-lang-key="roulette-button"></button>
            </div>
        `;

        this.button = this.shadowRoot.querySelector('button');
    }

    connectedCallback() {
        this.updateButtonText();
        document.addEventListener('languagechange', () => this.updateButtonText());
        this.button.addEventListener('click', () => this.suggestDinner());
    }

    updateButtonText() {
        this.button.textContent = translations[currentLang]['roulette-button'];
    }

    suggestDinner() {
        const menuResult = this.shadowRoot.querySelector('.menu-result');
        const suggestion = this.menus[Math.floor(Math.random() * this.menus.length)];
        const foodName = translations[currentLang][suggestion.nameKey];
        
        let imageHTML = '';
        if (suggestion.image) {
            imageHTML = `<img src="${suggestion.image}" alt="${foodName}" class="food-image">`;
        }
        
        menuResult.innerHTML = `
            ${imageHTML}
            <div class="food-name">${foodName}</div>
        `;
    }
}

customElements.define('dinner-roulette', DinnerRoulette);

// --- Language Toggle Logic ---
const langToggle = document.getElementById('lang-toggle');
const themeToggle = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

const setLanguage = (lang) => {
    currentLang = lang;
    htmlEl.setAttribute('lang', lang);
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.getAttribute('data-lang-key');
        if (!key) return;

        const translation = translations[lang][key];
        if (el.tagName === 'TITLE') {
            el.textContent = translation;
        } else {
            el.textContent = translation;
        }
    });

    themeToggle.setAttribute('aria-label', translations[lang]['theme-toggle-label']);
    langToggle.setAttribute('aria-label', translations[lang]['lang-toggle-aria']);

    const nextLang = lang === 'ko' ? 'en' : 'ko';
    langToggle.textContent = nextLang.toUpperCase();
    
    document.dispatchEvent(new CustomEvent('languagechange'));
};

langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    setLanguage(newLang);
});


// --- Theme Toggle Logic ---
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


// --- Initial Load ---
const savedLang = localStorage.getItem('language');
const userLang = navigator.language.split('-')[0];
const initialLang = savedLang || (userLang === 'ko' ? 'ko' : 'en');
setLanguage(initialLang);

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
applyTheme(initialTheme);