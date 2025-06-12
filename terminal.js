/**
 * Terminal JavaScript
 */
document.addEventListener('DOMContentLoaded', function() {

    // Get references to all boxes
    const introBox = document.querySelector('.intro-box');
    const experienceBox = document.querySelector('.experience-box');
    const projectsBox = document.querySelector('.project-section');
    const skillsBox = document.querySelector('.skills-box');
    const mainBox = document.querySelector('.main-box');
    
    // Function to adjust box sizes based on content and update counters
    function adjustBoxSizes() {
        const boxes = [experienceBox, projectsBox, skillsBox];
        
        boxes.forEach(box => {
            if (!box) return;
            
            // Get the content element
            const content = box.querySelector('.box-content');
            if (!content) return;
            
            // Count the number of items in the box
            const items = content.querySelectorAll('li, .experience-entry');
            const itemCount = items.length;
            
            // Set a minimum height based on content
            const minHeight = Math.max(50, Math.min(itemCount * 22, 150)); // 22px per item, min 50px, max 150px
            
            // Apply the calculated height with some padding
            box.style.minHeight = `${minHeight}px`;
            
            // Update the footer counter
            const footer = box.querySelector('.box-footer span');
            if (footer && items.length > 0) {
                const activeItem = box.querySelector('li.active, .experience-entry.active');
                const activeIndex = activeItem ? Array.from(items).indexOf(activeItem) + 1 : 1;
                footer.textContent = `${activeIndex} of ${itemCount}`;
                
                // Set padding for the counter
                footer.style.padding = '0 8px';
                // For right-aligned footer, no need to set width
            }
        });
        
        // Special handling for the skills box to optimize space with two columns
        if (skillsBox) {
            const skillItems = skillsBox.querySelectorAll('li');
            // Always use two columns unless on very small screens
            const boxWidth = skillsBox.offsetWidth;
            const useColumns = boxWidth > 200; // Use columns if we have enough width
            
            if (useColumns) {
                // Two columns layout - explicitly set
                const skillsList = skillsBox.querySelector('ul.item-list');
                if (skillsList) {
                    skillsList.style.display = 'flex';
                    skillsList.style.flexWrap = 'wrap';
                    skillsList.style.gap = '4px 8px';
                    
                    skillItems.forEach(item => {
                        item.style.flex = '0 0 calc(50% - 4px)';
                        item.style.boxSizing = 'border-box';
                    });
                }
            } else {
                // Single column layout for very narrow screens
                skillItems.forEach(item => {
                    item.style.flex = '0 0 100%';
                });
                skillsBox.querySelector('ul.item-list').style.display = 'block';
            }
            
            // Adjust the footer count to reflect the current state
            const skillsFooter = skillsBox.querySelector('.box-footer span');
            if (skillsFooter) {
                skillsFooter.textContent = `1 of ${skillItems.length}`;
            }
        }
        
        // Update experience entries formatting
        updateExperienceEntries();
    }
    
    // Run the size adjustment on load
    adjustBoxSizes();
    
    // Also run it when window is resized
    window.addEventListener('resize', adjustBoxSizes);
    
    // Helper function to mark a box as active
    function setActiveBox(box, viaKeyboard = false) {
        // Remove active class from all boxes
        document.querySelectorAll('.sidebar .box').forEach(b => {
            b.classList.remove('active');
            b.classList.remove('keyboard-nav'); // Remove keyboard navigation indicator
        });
        
        // Add active class to the selected box
        if (box) {
            box.classList.add('active');
            
            // If navigation happened via keyboard, add the special class
            if (viaKeyboard) {
                box.classList.add('keyboard-nav');
            }
            
            // Special handling for navigation box - don't show as active
            if (box.classList.contains('navigation-box')) {
                box.classList.remove('active');
            }
        }
    }
    
    // Helper function to select the first item in a box
    function selectFirstItemInBox(box) {
        if (!box) return;
        
        // setActiveBox(box); // Caller is responsible for setting the box active
        
        const firstItem = box.querySelector('.box-content li, .box-content .experience-entry');
        if (firstItem) {
            // Clear all active classes first
            document.querySelectorAll('.box-content li.active, .box-content .experience-entry.active')
                .forEach(item => item.classList.remove('active'));
            
            // Add active class to first item
            firstItem.classList.add('active');
            
            // Update main content
            mainBox.querySelector('.box-content').innerHTML = `
                <h2>Selected: ${firstItem.textContent.replace(/(@.*$)/g, '')}</h2>
                <p>Details about this selection would appear here.</p>
            `;
            
            // Update footer counter
            const footer = box.querySelector('.box-footer span');
            const items = box.querySelectorAll('.box-content li, .box-content .experience-entry');
            if (footer && items.length > 0) {
                footer.textContent = `1 of ${items.length}`;
                // Make sure the text is centered by ensuring consistent width
                const counterWidth = `${items.length.toString().length * 2 + 4}ch`;
                footer.style.minWidth = counterWidth;
            }
            
            // Ensure the selected item is visible by scrolling to it
            firstItem.scrollIntoView({ block: 'nearest' });
        }
    }
    
    // Add click event listeners to section items
    const allItems = document.querySelectorAll('.box-content li, .box-content .experience-entry');
    allItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            allItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Mark the parent box as active
            const parentBox = this.closest('.box');
            setActiveBox(parentBox);
            
            // Update the main content based on the clicked item
            let itemText = this.textContent.replace(/(@.*$)/g, '').trim();
            
            // Handle experience entries differently due to the new structure
            if (this.classList.contains('experience-entry')) {
                const jobTitle = this.querySelector(':first-child');
                const company = this.querySelector('.highlight');
                
                if (jobTitle && company) {
                    itemText = `${jobTitle.textContent.trim()} ${company.textContent.trim()}`;
                }
            }
            
            mainBox.querySelector('.box-content').innerHTML = `
                <h2>Selected: ${itemText}</h2>
                <p>Details about this selection would appear here.</p>
            `;
            
            // Update the footer to show current selection
            const footer = parentBox.querySelector('.box-footer span');
            const siblings = Array.from(parentBox.querySelectorAll('li, .experience-entry'));
            const currentIndex = siblings.indexOf(this) + 1;
            
            if (footer && siblings.length > 0) {
                footer.textContent = `${currentIndex} of ${siblings.length}`;
                // Make sure the text is centered by ensuring consistent width
                const counterWidth = `${siblings.length.toString().length * 2 + 4}ch`;
                footer.style.minWidth = counterWidth;
            }
        });
    });

    // Add click event handlers for section titles
    const sectionTitles = document.querySelectorAll('.box-title');
    sectionTitles.forEach(title => {
        title.addEventListener('click', function() {
            // Get the parent box
            const parentBox = this.closest('.box');
            if (parentBox) {
                // Scroll the section into view
                parentBox.scrollIntoView({ behavior: 'smooth' });
                
                // Highlight the section (false = not via keyboard)
                setActiveBox(parentBox, false);
                
                // Special handling for Home section
                if (parentBox === introBox) {
                    showHomeContent();
                } else {
                    // Select the first item if it has items
                    selectFirstItemInBox(parentBox);
                }
            }
        });
    });
    
    // Function to navigate between sections
    function navigateSection(direction, viaKeyboard = true) {
        // Define all sections in order
        const sections = [
            introBox,           // Home (1)
            experienceBox,      // Experience (2)
            projectsBox,        // Projects (3)
            skillsBox,          // Skills (4)
        ].filter(Boolean); // Filter out any null values and exclude navigation box
        
        // Find the current active section or the most visible one
        let activeSection = document.querySelector('.box.active');
        
        if (!activeSection) {
            // Find most visible box if none is active
            let mostVisibleBox = null;
            let maxVisibility = 0;
            
            sections.forEach(section => {
                if (!section) return;
                
                const rect = section.getBoundingClientRect();
                const visibility = Math.min(
                    Math.max(0, rect.bottom),
                    window.innerHeight
                ) - Math.max(0, rect.top);
                
                if (visibility > maxVisibility) {
                    maxVisibility = visibility;
                    mostVisibleBox = section;
                }
            });
            
            activeSection = mostVisibleBox;
        }
        
        if (activeSection) {
            const currentIndex = sections.indexOf(activeSection);
            let targetIndex;
            
            if (direction === 'next') {
                targetIndex = (currentIndex + 1) % sections.length;
            } else {
                targetIndex = (currentIndex - 1 + sections.length) % sections.length;
            }
            
            // Scroll to the target section
            sections[targetIndex].scrollIntoView({ behavior: 'smooth' });
            
            // Set the new section as active, and flag if via keyboard
            setActiveBox(sections[targetIndex], viaKeyboard);
            
            // Select first item in the target section
            selectFirstItemInBox(sections[targetIndex]);
            
            return sections[targetIndex];
        }
        
        return null;
    }
    
    // Add keyboard navigation (1-4 to jump to sections, arrow keys to navigate)
    document.addEventListener('keydown', function(e) {
        // Number keys 1-4
        if (e.key === '1') {
            introBox.scrollIntoView({ behavior: 'smooth' });
            
            // For home, load the home content
            showHomeContent();
            
            // Set active box
            setActiveBox(introBox, true); // Pass true to indicate keyboard navigation
        } else if (e.key === '2') {
            experienceBox.scrollIntoView({ behavior: 'smooth' });
            selectFirstItemInBox(experienceBox);
            setActiveBox(experienceBox, true); // Pass true to indicate keyboard navigation
        } else if (e.key === '3') {
            projectsBox.scrollIntoView({ behavior: 'smooth' });
            selectFirstItemInBox(projectsBox);
            setActiveBox(projectsBox, true); // Pass true to indicate keyboard navigation
        } else if (e.key === '4') {
            skillsBox.scrollIntoView({ behavior: 'smooth' });
            selectFirstItemInBox(skillsBox);
            setActiveBox(skillsBox, true); // Pass true to indicate keyboard navigation
        }
        
        // Arrow keys for navigation
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            // Use the navigateSection function for left/right navigation
            const direction = e.key === 'ArrowRight' ? 'next' : 'prev';
            navigateSection(direction, true); // Pass true to indicate keyboard navigation
        }
        
        // Vim navigation keys (h, j, k, l)
        if (e.key === 'h') {
            // Navigate left
            navigateSection('prev', true); // Pass true to indicate keyboard navigation
        } else if (e.key === 'l') {
            // Navigate right
            navigateSection('next', true); // Pass true to indicate keyboard navigation
        }
        
        // Up/down arrows for item selection within a section
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            // Find the active item or the first item in the most visible box
            const activeItem = document.querySelector('.box-content li.active, .box-content .experience-entry.active');
            
            // If there's an active item, navigate within its section
            if (activeItem) {
                // Get all siblings
                const parentBox = activeItem.closest('.box');
                const allItems = Array.from(parentBox.querySelectorAll('li, .experience-entry'));
                const currentIndex = allItems.indexOf(activeItem);
                let targetIndex;
                
                if (e.key === 'ArrowDown') {
                    targetIndex = (currentIndex + 1) % allItems.length;
                } else {
                    targetIndex = (currentIndex - 1 + allItems.length) % allItems.length;
                }
                
                // Simulate a click on the target item
                allItems[targetIndex].click();
                allItems[targetIndex].scrollIntoView({ block: 'nearest' });
            } else {
                // If no active item, find the most visible box and select first item
                const sections = [introBox, experienceBox, projectsBox, skillsBox];
                let mostVisibleBox = null;
                let maxVisibility = 0;
                
                sections.forEach(section => {
                    if (!section) return;
                    
                    const rect = section.getBoundingClientRect();
                    const visibility = Math.min(
                        Math.max(0, rect.bottom),
                        window.innerHeight
                    ) - Math.max(0, rect.top);
                    
                    if (visibility > maxVisibility) {
                        maxVisibility = visibility;
                        mostVisibleBox = section;
                    }
                });
                
                if (mostVisibleBox) {
                    selectFirstItemInBox(mostVisibleBox);
                }
            }
        }
        
        // Helper to show a temporary keyboard shortcut tooltip
        function showKeyboardTip(key, action) {
            // Create a tooltip element if it doesn't exist
            let tooltip = document.getElementById('keyboard-tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.id = 'keyboard-tooltip';
                document.body.appendChild(tooltip);
            }
            
            // Set the content and show the tooltip
            tooltip.innerHTML = `<span class="key">${key}</span>: ${action}`;
            tooltip.classList.add('active');
            
            // Position near the bottom of the screen
            tooltip.style.bottom = '100px';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            
            // Hide after 2 seconds
            setTimeout(() => {
                tooltip.classList.remove('active');
            }, 2000);
        }

        // Track when the user first uses keyboard navigation
        let hasShownKeyboardTips = false;

        // Show keyboard tips the first time keyboard is used for navigation
        if (!hasShownKeyboardTips && 
            (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || 
             e.key === 'h' || e.key === 'l' || 
             (e.key >= '1' && e.key <= '4'))) {
            
            hasShownKeyboardTips = true;
            showKeyboardTip('↑↓←→', 'Navigate sections & items');
        }
        
        // For other keys, continue with the existing implementation...
        // The code below is already implemented and works fine
    });
    
    // Special handling for the experience box to format entries correctly
    function updateExperienceEntries() {
        const experienceEntries = document.querySelectorAll('.experience-entry');
        
        experienceEntries.forEach(entry => {
            const jobTitle = entry.querySelector(':first-child');
            const company = entry.querySelector('.highlight');
            
            if (jobTitle && company) {
                // Calculate available width
                const boxWidth = entry.closest('.box').offsetWidth;
                
                // Always ensure consistent spacing
                company.style.marginTop = '3px';
                
                // Set max width to prevent overflow
                jobTitle.style.maxWidth = (boxWidth - 20) + 'px';
                company.style.maxWidth = (boxWidth - 25) + 'px';
            }
        });
    }
    
    // Initial call to format experience entries
    updateExperienceEntries();
    
    // Update experience entries on window resize to handle layout changes
    window.addEventListener('resize', updateExperienceEntries);
    
    // Function to generate and insert ASCII art
    function generateASCIIArt() {
        // Cleaner way to insert ASCII art using JavaScript
        const asciiArt = `
██╗  ██╗███████╗██╗     ██╗      ██████╗     ██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗ 
██║  ██║██╔════╝██║     ██║     ██╔═══██╗    ██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
███████║█████╗  ██║     ██║     ██║   ██║    ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
██╔══██║██╔══╝  ██║     ██║     ██║   ██║    ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
██║  ██║███████╗███████╗███████╗╚██████╔╝    ╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝      ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ 
`;
        
        const asciiArtElement = document.querySelector('.ascii-art');
        if (asciiArtElement) {
            asciiArtElement.textContent = asciiArt;
        }
    }

    // Generate ASCII art
    generateASCIIArt();
    
    // Make the Home section content clickable to navigate there
    if (introBox) {
        introBox.querySelector('.box-content').addEventListener('click', function() {
            // Highlight the Home section
            setActiveBox(introBox);
            
            // Show home content
            showHomeContent();
            
            // Scroll the intro box into view
            introBox.scrollIntoView({ behavior: 'smooth' });
        });
        
        // Also make the Home title clickable
        introBox.querySelector('.box-title').addEventListener('click', function() {
            // Highlight the Home section
            setActiveBox(introBox);
            
            // Show home content
            showHomeContent();
            
            // Scroll the intro box into view
            introBox.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Function to show home content
    function showHomeContent() {
        // Reset active items in all sections
        document.querySelectorAll('.box-content li.active, .box-content .experience-entry.active')
            .forEach(item => item.classList.remove('active'));
        
        // Generate ASCII art
        generateASCIIArt();
        
        // Reset main content to default
        const mainContent = mainBox.querySelector('.box-content');
        if (mainContent) {
            // Show the default main content with ASCII art, intro text, etc.
            mainContent.innerHTML = `
                <pre class="ascii-art">
                    <!-- ASCII art will be inserted by JavaScript -->
                </pre>
                <p>Hi, I'm <span class="secondary-highlight">Dhruv</span> 👋</p>
                <p>A <span class="highlight">passionate software developer</span></p>

                <p>I'm always looking for opportunities to learn and grow as a developer.</p>

                <p>You can find me on <a href="#" class="highlight">LinkedIn</a>.</p>
                <p>Check out my projects on <a href="#" class="highlight">GitHub</a> or view my <a href="#" class="highlight">Portfolio</a>.</p>
                <p>You can find my resume <a href="#" class="highlight">here</a>.</p>

                <p>Click on a section on the left to learn more about my projects and skills.</p>
                <p>You can navigate through the sections using the <span class="secondary-highlight">arrow keys</span> or <span class="highlight">by clicking</span> on the items in each section.</p>

                <div class="quote-box">
                    <p>There are 10 types of people in this world: those who understand binary and those who don't.</p>
                    <div class="quote-reference">Programming Humor</div>
                </div>
            `;
            
            // Re-insert ASCII art since the innerHTML change removed it
            generateASCIIArt();
        }
    }
    
    // Add scroll-based active section detection
    document.querySelector('.sidebar').addEventListener('scroll', debounce(function() {
        // Find all section boxes (excludes navigation box from active detection)
        const sections = [introBox, experienceBox, projectsBox, skillsBox].filter(Boolean);
        
        // Find the box that's most in view
        let mostVisibleBox = null;
        let maxVisibility = 0;
        
        sections.forEach(section => {
            if (!section) return;
            
            const rect = section.getBoundingClientRect();
            const visibility = Math.min(
                Math.max(0, rect.bottom),
                window.innerHeight
            ) - Math.max(0, rect.top);
            
            if (visibility > maxVisibility) {
                maxVisibility = visibility;
                mostVisibleBox = section;
            }
        });
        
        // Set the most visible box as active
        if (mostVisibleBox) {
            setActiveBox(mostVisibleBox);
        }
    }, 100)); // Debounce for better performance
    
    // Debounce function to limit how often a function is called
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
});
