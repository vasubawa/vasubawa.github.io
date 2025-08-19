document.addEventListener('DOMContentLoaded', () => {
    // Load theme
    const currentTheme = localStorage.getItem('portfolioTheme') || 'dark-theme';
    document.body.className = `dev-mode ${currentTheme}`;
    document.getElementById('style-switcher').value = currentTheme;

    // Theme switcher
    document.getElementById('style-switcher').addEventListener('change', (e) => {
        const selectedTheme = e.target.value;
        document.body.className = `dev-mode ${selectedTheme}`;
        localStorage.setItem('portfolioTheme', selectedTheme);
    });

    // Dynamic content adjustment
    function adjustContent() {
        const sidebarBoxes = document.querySelectorAll('.sidebar-box');
        sidebarBoxes.forEach(box => {
            const itemList = box.querySelector('.item-list') || box.querySelector('p');
            if (!itemList) return;

            const boxRect = box.getBoundingClientRect();
            const boxHeight = boxRect.height;
            const boxWidth = boxRect.width;
            const items = itemList.tagName === 'P' ? [itemList] : itemList.querySelectorAll('div');
            const itemCount = items.length;

            // Estimate content height
            const lineHeight = parseFloat(getComputedStyle(itemList).fontSize) * 1.3;
            const contentHeight = itemCount * lineHeight + 0.6 * 16; // Account for padding

            // Adjust font size if content exceeds box height
            if (contentHeight > boxHeight) {
                const scaleFactor = boxHeight / contentHeight;
                const newFontSize = Math.max(0.5, parseFloat(getComputedStyle(itemList).fontSize) / 16 * scaleFactor);
                itemList.style.fontSize = `${newFontSize}rem`;
            } else {
                itemList.style.fontSize = ''; // Reset to default
            }

            // Ensure content fits width
            items.forEach(item => {
                const textWidth = item.scrollWidth;
                if (textWidth > boxWidth - 1.2 * 16) { // Account for padding
                    item.style.whiteSpace = 'nowrap';
                    item.style.overflow = 'hidden';
                    item.style.textOverflow = 'ellipsis';
                } else {
                    item.style.whiteSpace = '';
                    item.style.overflow = '';
                    item.style.textOverflow = '';
                }
            });
        });
    }

    // Load content
    fetch('test.json')
        .then(res => {
            if (!res.ok) throw new Error(`Failed to fetch test.json: ${res.status}`);
            return res.json();
        })
        .then(data => {
            console.log('Script loaded');
            console.log('Data loaded:', data);

            // Welcome
            document.getElementById('welcome-text').textContent = data.welcome || 'Welcome section unavailable';

            // Navigation
            const navigationList = document.getElementById('navigation-list');
            navigationList.innerHTML = '';
            if (data.controls && Array.isArray(data.controls)) {
                data.controls.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `<span class="text-accent">${item.key}</span>: ${item.action}`;
                    navigationList.appendChild(div);
                });
                document.getElementById('navigation-total').textContent = data.controls.length;
            } else {
                navigationList.innerHTML = '<p>No navigation data available</p>';
            }

            // Work
            const workList = document.getElementById('work-list');
            workList.innerHTML = '';
            if (data.work && Array.isArray(data.work)) {
                data.work.forEach(item => {
                    const div = document.createElement('div');
                    div.innerHTML = `<div>${item.role}</div><div>@ <span class="text-accent">${item.org}</span></div>`;
                    workList.appendChild(div);
                });
                document.getElementById('work-total').textContent = data.work.length;
            } else {
                workList.innerHTML = '<p>No work data available</p>';
            }

            // Creations
            const creationsList = document.getElementById('creations-list');
            creationsList.innerHTML = '';
            if (data.creations && Array.isArray(data.creations)) {
                data.creations.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item;
                    creationsList.appendChild(div);
                });
                document.getElementById('creations-total').textContent = data.creations.length;
            } else {
                creationsList.innerHTML = '<p>No creations data available</p>';
            }

            // Expertise
            const expertiseList = document.getElementById('expertise-list');
            expertiseList.innerHTML = '';
            if (data.expertise && Array.isArray(data.expertise)) {
                data.expertise.forEach(item => {
                    const div = document.createElement('div');
                    div.textContent = item;
                    expertiseList.appendChild(div);
                });
                document.getElementById('expertise-total').textContent = data.expertise.length;
            } else {
                expertiseList.innerHTML = '<p>No expertise data available</p>';
            }

            // Primary content
            const primaryText = document.getElementById('primary-text');
            primaryText.innerHTML = '';
            if (data.primaryContent && Array.isArray(data.primaryContent)) {
                data.primaryContent.forEach(text => {
                    const p = document.createElement('p');
                    p.textContent = text;
                    primaryText.appendChild(p);
                });
            } else {
                primaryText.innerHTML = '<p>No primary content available</p>';
            }

            // Adjust content after loading
            adjustContent();
        })
        .catch(err => {
            console.error('Failed to load content:', err);
            document.querySelector('.error-message').style.display = 'block';
        });

    // Re-adjust on resize or zoom
    window.addEventListener('resize', adjustContent);
});