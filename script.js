// Configuration - User can replace these later
const CONFIG = {
    lastfm: {
        username: 'beepyx45',
        apiKey: '3b19ef42b183b4dba741b909cc180a4c' // Optional for mock
    },
    goodreads: {
        userId: '142334153'
    }
};

const THEME_KEY = 'portfolioTheme';
const THEME_OVERRIDE_KEY = 'portfolioThemeOverride';
const THEME_TOGGLE_UNLOCK_KEY = 'portfolioThemeToggleUnlocked';
const PROFILE_IMAGE_CLICKS_REQUIRED = 3;
const THEME_ORDER = ['sunrise', 'day', 'sunset', 'night'];

const THEME_DEFINITIONS = {
    sunrise: {
        backgroundImage: 'url("assets/sunrise.jfif"), url("assets/sky-day.png")',
        fallbackColor: '#bae6fd',
        colors: {
            textBlue: '#1d4ed8',
            textYellow: '#facc15',
            textRed: '#ef4444',
            textSlate: '#475569',
            textGray: '#4b5563',
            heading: '#1e293b',
            cardBg: 'rgba(255, 255, 255, 0.75)',
            cardBorder: 'rgba(148, 163, 184, 0.15)',
            cardHoverBg: 'rgba(255, 255, 255, 0.95)',
            divider: '#cbd5e1',
            header: '#1d4ed8',
            themeToggleBg: 'rgba(255, 255, 255, 0.85)',
            themeToggleBorder: 'rgba(30, 41, 59, 0.14)',
            themeToggleColor: '#1e293b',
            menuIcon: '#15803d',
            link: '#2563eb',
            linkHover: '#1e40af',
            button: '#ef4444',
            buttonHover: '#475569',
            titleColor: '#1d4ed8',
            navColor: '#ef4444',
            bodyTextColor: '#4b5563',
            secondaryTextColor: '#475569'
        }
    },
    day: {
        backgroundImage: 'url("assets/sky-day.png")',
        fallbackColor: '#bae6fd',
        colors: {
            textBlue: '#1d4ed8',
            textYellow: '#facc15',
            textRed: '#ef4444',
            textSlate: '#475569',
            textGray: '#4b5563',
            heading: '#1e293b',
            cardBg: 'rgba(255, 255, 255, 0.75)',
            cardBorder: 'rgba(148, 163, 184, 0.15)',
            cardHoverBg: 'rgba(255, 255, 255, 0.95)',
            divider: '#cbd5e1',
            header: '#1d4ed8',
            themeToggleBg: 'rgba(255, 255, 255, 0.85)',
            themeToggleBorder: 'rgba(30, 41, 59, 0.14)',
            themeToggleColor: '#1e293b',
            menuIcon: '#15803d',
            link: '#2563eb',
            linkHover: '#1e40af',
            button: '#ef4444',
            buttonHover: '#475569',
            titleColor: '#1d4ed8',
            navColor: '#ef4444',
            bodyTextColor: '#4b5563',
            secondaryTextColor: '#475569'
        }
    },
    sunset: {
        backgroundImage: 'url("assets/sky-sunset.png")',
        fallbackColor: '#0f172a',
        colors: {
            textBlue: '#f8fafc',
            textYellow: '#fde047',
            textRed: '#fb7185',
            textSlate: '#cbd5e1',
            textGray: '#e2e8f0',
            heading: '#ffffff',
            cardBg: 'rgba(15, 23, 42, 0.82)',
            cardBorder: 'rgba(248, 250, 252, 0.2)',
            cardHoverBg: 'rgba(30, 41, 59, 0.95)',
            divider: 'rgba(248, 250, 252, 0.24)',
            header: '#fff7cd',
            themeToggleBg: 'rgba(15, 23, 42, 0.75)',
            themeToggleBorder: 'rgba(248, 250, 252, 0.20)',
            themeToggleColor: '#f8fafc',
            menuIcon: '#facc15',
            link: '#f8fafc',
            linkHover: '#fde047',
            button: '#f8fafc',
            buttonHover: '#f59e0b',
            bodyTextColor: '#2D3748',
            secondaryTextColor: '#4A5568'
        }
    },
    night: {
        backgroundImage: 'url("assets/sky-night.png")',
        fallbackColor: '#0f172a',
        colors: {
            textBlue: '#60a5fa',
            textYellow: '#fde047',
            textRed: '#f87171',
            textSlate: '#94a3b8',
            textGray: '#e2e8f0',
            heading: '#f8fafc',
            cardBg: 'rgba(15, 23, 42, 0.7)',
            cardBorder: 'rgba(255, 255, 255, 0.12)',
            cardHoverBg: 'rgba(30, 41, 59, 0.85)',
            divider: 'rgba(255, 255, 255, 0.15)',
            header: '#60a5fa',
            themeToggleBg: 'rgba(15, 23, 42, 0.45)',
            themeToggleBorder: 'rgba(255, 255, 255, 0.18)',
            themeToggleColor: '#f8fafc',
            menuIcon: '#86efac',
            link: '#38bdf8',
            linkHover: '#7dd3fc',
            button: '#f87171',
            buttonHover: '#f8fafc',
            titleColor: '#60a5fa',
            navColor: '#f87171',
            bodyTextColor: '#e2e8f0',
            secondaryTextColor: '#94a3b8'
        }
    }
};

function getThemeFromTime(date = new Date()) {
    const totalMinutes = date.getHours() * 60 + date.getMinutes();

    if (totalMinutes >= 5 * 60 && totalMinutes < 7 * 60 + 30) {
        return 'sunrise';
    }

    if (totalMinutes >= 7 * 60 + 30 && totalMinutes < 16 * 60) {
        return 'day';
    }

    if (totalMinutes >= 16 * 60 && totalMinutes < 19 * 60) {
        return 'sunset';
    }

    return 'night';
}

function getNextTheme(theme) {
    const currentIndex = THEME_ORDER.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEME_ORDER.length;
    return THEME_ORDER[nextIndex];
}

function setTheme(theme, { persist = false } = {}) {
    const root = document.documentElement;
    const definition = THEME_DEFINITIONS[theme] || THEME_DEFINITIONS.day;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-background-theme', theme);

    Object.entries(definition.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
    });

    root.style.setProperty('--sky-image', definition.backgroundImage);
    root.style.setProperty('--sky-fallback', definition.fallbackColor);

    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    const icon = toggle.querySelector('.theme-icon');
    const label = toggle.querySelector('.theme-label');

    if (icon) icon.textContent = theme === 'sunrise' || theme === 'day' ? '☀️' : '🌙';
    if (label) label.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);

    if (persist) {
        localStorage.setItem(THEME_KEY, theme);
        localStorage.setItem(THEME_OVERRIDE_KEY, 'true');
    }
}

function applyBackgroundForTime(date = new Date()) {
    const theme = getThemeFromTime(date);
    setTheme(theme);
}

function showThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.classList.add('visible');
        localStorage.setItem(THEME_TOGGLE_UNLOCK_KEY, 'true');
    }
}

function hideThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.classList.remove('visible');
        localStorage.removeItem(THEME_TOGGLE_UNLOCK_KEY);
    }
}

function attachProfileImageEasterEgg() {
    const profileImage = document.querySelector('.bio-image');
    if (!profileImage) return;

    let clickCount = 0;
    let toggleVisible = false;

    profileImage.addEventListener('click', () => {
        clickCount += 1;

        if (clickCount >= PROFILE_IMAGE_CLICKS_REQUIRED) {
            toggleVisible = !toggleVisible;
            if (toggleVisible) {
                showThemeToggle();
            } else {
                hideThemeToggle();
            }
            clickCount = 0;
        }
    });
}

function initTheme() {
    const isToggleUnlocked = localStorage.getItem(THEME_TOGGLE_UNLOCK_KEY) === 'true';
    const hasManualOverride = localStorage.getItem(THEME_OVERRIDE_KEY) === 'true';
    const savedTheme = localStorage.getItem(THEME_KEY);
    const validSavedTheme = savedTheme && THEME_DEFINITIONS[savedTheme] ? savedTheme : null;

    if (isToggleUnlocked) {
        showThemeToggle();
    }

    const theme = hasManualOverride && validSavedTheme
        ? validSavedTheme
        : getThemeFromTime();

    setTheme(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'day';
    const nextTheme = getNextTheme(currentTheme);
    setTheme(nextTheme, { persist: true });
}

function highlightCurrentNav() {
    const navItems = document.querySelectorAll('.nav-item');
    if (!navItems || navItems.length === 0) return;

    const pathName = window.location.pathname || '';
    const currentFile = pathName.split('/').pop() || 'index.html';
    const currentHrefFull = window.location.href;

    navItems.forEach(navItem => {
        const link = navItem.querySelector('a');
        const button = navItem.querySelector('button');
        if (!link) return;

        const href = link.getAttribute('href') || '';
        const hrefFile = href.split('/').pop() || '';
        const isActive = hrefFile === currentFile || currentHrefFull.endsWith(href) || (href === 'index.html' && (currentFile === '' || currentFile === 'index.html'));

        if (isActive) {
            navItem.classList.add('active');
            if (button) button.setAttribute('aria-current', 'page');
        } else {
            navItem.classList.remove('active');
            if (button) button.removeAttribute('aria-current');
        }
    });
}

function setupClientRouting() {
    const navAnchors = document.querySelectorAll('.nav-item a[href]');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', event => {
            const href = anchor.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            if (href === currentPage) {
                event.preventDefault();
                return;
            }
            event.preventDefault();
            loadPageContent(href, true);
        });
    });

    window.addEventListener('popstate', event => {
        const url = event.state?.url || window.location.pathname.split('/').pop() || 'index.html';
        loadPageContent(url, false);
    });
}

function loadPageContent(url, pushState = true) {
    fetch(url, { cache: 'no-cache' })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch page');
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newPageContent = doc.getElementById('page-content');
            const currentPageContent = document.getElementById('page-content');
            if (!newPageContent || !currentPageContent) {
                window.location.href = url;
                return;
            }

            currentPageContent.innerHTML = newPageContent.innerHTML;
            document.title = doc.title || document.title;

            highlightCurrentNav();
            if (pushState) {
                history.pushState({ url }, doc.title, url);
            }

            if (document.getElementById('blog-container')) {
                loadBlogPosts();
            }

            if (document.getElementById('books-grid')) {
                loadReadingList();
            }

            attachProfileImageEasterEgg();
        })
        .catch(() => {
            window.location.href = url;
        });
}

/**
 * Fetch and display Last.fm data
 */
async function fetchLastFmData() {
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const songTitleExpEl = document.getElementById('song-title-expanded');
    const songAlbumEl = document.getElementById('song-album');
    const songArtEl = document.getElementById('song-art');
    
    if (!songTitleEl || !songArtistEl) return;

    try {
        if (CONFIG.lastfm.apiKey === 'YOUR_LASTFM_API_KEY' || !CONFIG.lastfm.apiKey) {
            simulateLastFmData();
            return;
        }

        const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${CONFIG.lastfm.username}&api_key=${CONFIG.lastfm.apiKey}&format=json&limit=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.recenttracks && data.recenttracks.track.length > 0) {
            const track = data.recenttracks.track[0];
            const songName = track.name;
            const artistName = track.artist['#text'];

            songTitleEl.textContent = songName;
            if (songTitleExpEl) songTitleExpEl.textContent = songName;
            if (songArtistEl) songArtistEl.textContent = artistName;

            const songArtistCollapsedEl = document.getElementById('song-artist-collapsed');
            if (songArtistCollapsedEl) songArtistCollapsedEl.textContent = artistName;
            
            if (track.album && track.album['#text']) {
                songAlbumEl.textContent = track.album['#text'];
            } else {
                songAlbumEl.textContent = 'Unknown Album';
            }
            
            if (track.image && track.image.length > 2 && track.image[2]['#text']) {
                songArtEl.src = track.image[2]['#text'];
            }
        } else {
            simulateLastFmData();
        }
    } catch (error) {
        console.error('Error fetching Last.fm data:', error);
        simulateLastFmData();
    }
}

function simulateLastFmData() {
    const songTitleEl = document.getElementById('song-title');
    const songArtistEl = document.getElementById('song-artist');
    const songTitleExpEl = document.getElementById('song-title-expanded');
    const songAlbumEl = document.getElementById('song-album');
    const songArtEl = document.getElementById('song-art');
    
    if (!songTitleEl || !songArtistEl) return;

    const mockTracks = [
        { title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", art: "https://upload.wikimedia.org/wikipedia/en/9/91/M83_-_Hurry_Up%2C_We%27re_Dreaming.png" },
        { title: "Starboy", artist: "The Weeknd", album: "Starboy", art: "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png" },
        { title: "Gosh", artist: "Jamie xx", album: "In Colour", art: "https://upload.wikimedia.org/wikipedia/en/8/86/Jamie_xx_-_In_Colour.png" },
        { title: "Resonance", artist: "HOME", album: "Odyssey", art: "https://upload.wikimedia.org/wikipedia/en/7/7b/Odyssey_HOME.jpg" }
    ];
    
    const randomTrack = mockTracks[Math.floor(Math.random() * mockTracks.length)];
    songTitleEl.textContent = randomTrack.title;
    
    if (songTitleExpEl) songTitleExpEl.textContent = randomTrack.title;
    if (songArtistEl) songArtistEl.textContent = randomTrack.artist;

    const songArtistCollapsedEl = document.getElementById('song-artist-collapsed');
    if (songArtistCollapsedEl) songArtistCollapsedEl.textContent = randomTrack.artist;

    if (songAlbumEl) songAlbumEl.textContent = randomTrack.album;
    if (songArtEl) songArtEl.src = randomTrack.art;
}

/**
 * Load and render blog posts from posts.json
 */
async function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    if (!blogContainer) return;

    try {
        const response = await fetch('posts.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const posts = await response.json();
        
        if (posts.length === 0) {
            blogContainer.innerHTML = '<p>No blog posts yet.</p>';
            return;
        }

        blogContainer.innerHTML = ''; 

        posts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'blog-post';
            
            const dateSpan = document.createElement('span');
            dateSpan.className = 'blog-post-date';
            dateSpan.textContent = new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const contentDiv = document.createElement('div');
            contentDiv.className = 'blog-post-content';
            contentDiv.innerHTML = marked.parse(post.content);

            article.appendChild(dateSpan);
            article.appendChild(contentDiv);
            blogContainer.appendChild(article);
        });

    } catch (error) {
        console.error('Error loading blog posts:', error);
        blogContainer.innerHTML = '<p>Failed to load blog posts. Ensure posts.json exists and is valid JSON.</p>';
    }
}

async function loadReadingList() {
    const booksGrid = document.getElementById('books-grid');
    if (!booksGrid) return;

    if (!CONFIG.goodreads.userId || CONFIG.goodreads.userId === 'YOUR_GOODREADS_USER_ID') {
        booksGrid.innerHTML = '<p class="read-error">Please set CONFIG.goodreads.userId to your Goodreads user ID to load your currently reading list.</p>';
        return;
    }

    try {
        // Use rss2json to bypass CORS and parse the XML into a clean JSON response
        const feedUrl = `https://www.goodreads.com/review/list_rss/${CONFIG.goodreads.userId}?shelf=currently-reading`;
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;

        const response = await fetch(apiUrl, { cache: 'no-cache' });
        
        if (!response.ok) {
            throw new Error(`Failed to fetch RSS feed: ${response.status}`);
        }

        const data = await response.json();

        // Check if there are items in the feed
        if (!data.items || data.items.length === 0) {
            booksGrid.innerHTML = '<p class="read-error">No currently reading books found on Goodreads.</p>';
            return;
        }

        booksGrid.innerHTML = data.items.map(item => {
            const titleText = item.title || 'Unknown Title';
            
            // Goodreads often formats titles as "Book Title by Author"
            const [bookTitle, authorFromTitle] = titleText.split(' by ').map(s => s.trim());
            
            // The cover image and author details are hidden inside the HTML of the description
            const descriptionHtml = item.description || '';
            const descriptionDoc = new DOMParser().parseFromString(descriptionHtml, 'text/html');
            
            const rawAuthorLine = descriptionDoc.body.textContent.trim().split('\n').map(s => s.trim()).filter(Boolean)[0] || authorFromTitle || item.author || 'Unknown Author';
            const authorLine = rawAuthorLine.replace(/^author:\s*/i, '');

            return `
                <div class="book-card book-card--text-only">
                    <div class="book-info">
                        <h3>${bookTitle}</h3>
                        <p>${authorLine}</p>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error loading Goodreads currently reading list:', error);
        booksGrid.innerHTML = '<p class="read-error">Unable to load your Goodreads currently reading list at this time.</p>';
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    attachProfileImageEasterEgg();

    const songTitleEl = document.getElementById('song-title');
    if (songTitleEl) {
        fetchLastFmData();
        setInterval(fetchLastFmData, 3 * 60 * 1000);
    }

    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        loadBlogPosts();
    }

    const booksGrid = document.getElementById('books-grid');
    if (booksGrid) {
        loadReadingList();
    }

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    setupClientRouting();
    highlightCurrentNav();

    setInterval(() => {
        if (localStorage.getItem(THEME_OVERRIDE_KEY) !== 'true') {
            const theme = getThemeFromTime();
            setTheme(theme);
            applyBackgroundForTime();
        }
    }, 60 * 1000);
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when a link is clicked (not as necessary for multi-page, but good to have)
        const navButtons = document.querySelectorAll('.nav-item button');
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }
});