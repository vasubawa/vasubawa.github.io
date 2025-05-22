document.addEventListener('DOMContentLoaded', function() {
    // Add toggle functionality to switch between terminal and GUI
    const toggleButton = document.getElementById('toggle-gui');
    toggleButton.addEventListener('click', function() {
        // Use relative path for GitHub Pages compatibility
        window.location.href = './index.html'; // Navigate to the GUI React version
    });
    
    const sections = {
        'home': {
            title: 'Home',
            content: `
                <div class="ascii-art">
                    ██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
                    ██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
                    ███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
                    ██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
                    ██║  ██║███████╗███████╗███████╗╚██████╔╝     ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
                    ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
                </div>
                <div class="desc">
                    Hi, I'm <span class="keyword">Dhruv</span> 👋<br>
                </div>
                <div class="desc">
                    I'm a <span class="keyword">passionate</span> developer, always looking for new challenges and opportunities to learn.
                </div>
                <div class="desc">
                    Click on a selection on the left to learn more about my work.<br>
                    You can also <span class="keyword">navigate</span> through the sections using the <span class="highlight">arrow keys</span> or via <span class="highlight">emotions</span>.
                </div>
                <div class="quote">
                    random quotes?
                </div>
            `
        },
    };

    // Helper function to set the active section
    function setActiveSection(sectionId) {
        const allItems = document.querySelectorAll('.left-pane .list li');
        allItems.forEach(item => item.classList.remove('active'));
        
        const activeItem = document.querySelector(`.left-pane .list li[data-section="${sectionId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        const contentPane = document.getElementById('content-pane');
        if (sections[sectionId]) {
            contentPane.innerHTML = sections[sectionId].content;
            document.querySelector('.terminal-bar').textContent = sections[sectionId].title;
        } else {
            contentPane.innerHTML = '<div class="desc">Section content not available yet.</div>';
        }
    }

    // Initialize with home section
    setActiveSection('home');

    // Add click event listeners to all section items
    document.querySelectorAll('.left-pane .list li').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            setActiveSection(section);
        });
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(event) {
        // Arrow key navigation
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            const activeSection = document.querySelector('.left-pane .list li.active');
            if (activeSection) {
                const currentList = activeSection.parentElement;
                const items = Array.from(currentList.querySelectorAll('li'));
                const currentIndex = items.indexOf(activeSection);
                
                let nextIndex;
                if (event.key === 'ArrowUp') {
                    nextIndex = (currentIndex - 1 + items.length) % items.length;
                } else {
                    nextIndex = (currentIndex + 1) % items.length;
                }
                
                const section = items[nextIndex].getAttribute('data-section');
                setActiveSection(section);
            }
        }
        
        // Left/Right to switch between main sections
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            const sections = Array.from(document.querySelectorAll('.left-pane .section'));
            const activeSection = document.querySelector('.left-pane .list li.active');
            
            if (activeSection) {
                const currentSectionEl = activeSection.closest('.section');
                const currentSectionIndex = sections.indexOf(currentSectionEl);
                
                let nextSectionIndex;
                if (event.key === 'ArrowLeft') {
                    nextSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
                } else {
                    nextSectionIndex = (currentSectionIndex + 1) % sections.length;
                }
                
                // Select the first item in the next section
                const nextSection = sections[nextSectionIndex];
                const firstItem = nextSection.querySelector('.list li');
                if (firstItem) {
                    const section = firstItem.getAttribute('data-section');
                    setActiveSection(section);
                }
            }
        }
        
        // Number keys for direct section selection
        if (['1', '2', '3', '4'].includes(event.key)) {
            event.preventDefault();
            const sectionIndex = parseInt(event.key) - 1;
            const sections = document.querySelectorAll('.left-pane .section');
            
            if (sectionIndex < sections.length) {
                const section = sections[sectionIndex];
                const firstItem = section.querySelector('.list li');
                
                if (firstItem) {
                    const sectionId = firstItem.getAttribute('data-section');
                    setActiveSection(sectionId);
                }
            }
        }
    });
});