/**
 * Terminal Portfolio Implementation
 * A terminal-style user interface for showcasing portfolio content
 */

// Import portfolio data
import portfolioData from './portfolio-data.js';

document.addEventListener('DOMContentLoaded', function() {
    // -----------------------------
    // Debugging Utilities
    // -----------------------------
    
    /**
     * Enhanced logging function with severity levels
     * @param {string} level - Log level (info, warn, error)
     * @param {string} message - Message to log
     * @param {any} [data] - Optional data to log
     */
    function terminalLog(level, message, data) {
        const timestamp = new Date().toISOString().substring(11, 19);
        const prefix = `[Terminal ${timestamp}]`;
        
        switch(level) {
            case 'error':
                console.error(`${prefix} ERROR: ${message}`, data !== undefined ? data : '');
                break;
            case 'warn':
                console.warn(`${prefix} WARNING: ${message}`, data !== undefined ? data : '');
                break;
            case 'info':
            default:
                console.log(`${prefix} ${message}`, data !== undefined ? data : '');
        }
    }
    
    // -----------------------------
    // Configuration and State
    // -----------------------------
    
    terminalLog('info', 'Terminal.js loaded, checking for portfolio data...');
    
    // Get portfolio data either from the import or global object for backward compatibility
    const data = portfolioData || window.portfolioData || {};
    
    // Check if portfolio data is loaded
    if (!data || Object.keys(data).length === 0) {
        terminalLog('error', 'Portfolio data not loaded or empty. Check portfolio-data.js import.');
        document.getElementById('content-pane').innerHTML = `
            <div class="section-content">
                <h1>Error: Portfolio Data Not Found</h1>
                <div class="desc">The portfolio data could not be loaded. Please check that portfolio-data.js is properly imported.</div>
            </div>
        `;
        return;
    }
    
    terminalLog('info', 'Portfolio data found:', Object.keys(data));
    
    // Random quote selection
    const randomQuote = data.quotes && data.quotes.length > 0
        ? data.quotes[Math.floor(Math.random() * data.quotes.length)]
        : "The best way to predict the future is to invent it.";
    
    /**
     * Content sections available in the terminal
     * @type {Object}
     */
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
                    Hi, I'm <span class="keyword">${data.personal?.name || 'Dhruv'}</span> 👋<br>
                </div>
                <div class="desc">
                    I'm a <span class="keyword">${data.personal?.title || 'Software Developer'}</span> based in <span class="keyword">${data.personal?.location || 'United States'}</span>.
                </div>
                <div class="desc">
                    Click on a selection on the left to learn more about my work.<br>
                    You can also <span class="keyword">navigate</span> through the sections using the <span class="highlight">arrow keys</span>.
                </div>
                <div class="quote">
                    "${randomQuote}"
                </div>
            `
        },
        // Projects section
        'proj-1': {
            title: 'Projects',
            content: generateProjectContent(data.projects && data.projects.length > 0 ? data.projects[0] : null)
        },
        // Skills section
        'skills-all': {
            title: 'Skills & Tools',
            content: generateAllSkillsContent(data.skills || {})
        },
        // Experience sections
        'exp-1': {
            title: 'Experience',
            content: generateExperienceContent(data.experience && data.experience.length > 0 ? data.experience[0] : null)
        },
        'exp-2': {
            title: 'Experience',
            content: generateExperienceContent(data.experience && data.experience.length > 1 ? data.experience[1] : null)
        },
        // Education sections
        'edu-1': {
            title: 'Education',
            content: generateEducationContent(data.education && data.education.length > 0 ? data.education[0] : null)
        }
    };

    /**
     * Generate HTML content for a project
     * @param {Object} project - Project data object
     * @returns {string} HTML content
     */
    function generateProjectContent(project) {
        console.log('Generating project content with data:', project);
        
        if (!project) {
            console.warn('No project data available');
            return `
                <div class="section-content">
                    <h1>Project</h1>
                    <div class="desc">Project information not available.</div>
                </div>
            `;
        }
        
        try {
            return `
                <div class="section-content">
                    <h1>${project.name || 'Unnamed Project'}</h1>
                    <div class="desc">${project.description || 'No description available.'}</div>
                    ${project.technologies && Array.isArray(project.technologies) ? `
                    <div class="tech-list">
                        <span class="label">Technologies:</span>
                        ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join(' ')}
                    </div>` : ''}
                    <div class="links">
                        ${project.github ? `<a href="${project.github}" target="_blank" class="link">GitHub</a>` : ''}
                        ${project.link ? `<a href="${project.link}" target="_blank" class="link">Live Demo</a>` : ''}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error generating project content:', error);
            return `
                <div class="section-content">
                    <h1>Project</h1>
                    <div class="desc">Error generating project content. Check console for details.</div>
                </div>
            `;
        }
    }
    
    /**
     * Generate HTML content for all skills with descriptions
     * @param {Object} skillsData - All skills data
     * @returns {string} HTML content
     */
    function generateAllSkillsContent(skillsData) {
        console.log('Generating skills content with data:', skillsData);
        
        if (!skillsData || Object.keys(skillsData).length === 0) {
            console.warn('No skills data available');
            return `<div class="desc">No skills information available.</div>`;
        }
        
        try {
            // Create sections for each skill category
            const categories = Object.keys(skillsData);
            
            return `
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    ${categories.map(category => {
                        const categorySkills = skillsData[category];
                        
                        // Check if skills exist for this category
                        if (!Array.isArray(categorySkills) || categorySkills.length === 0) {
                            return `
                                <div class="skill-category">
                                    <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                    <div class="skills-list">
                                        <div class="desc">No skills found in this category.</div>
                                    </div>
                                </div>
                            `;
                        }
                        
                        return `
                            <div class="skill-category">
                                <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                                <div class="skills-list">
                                    ${categorySkills.map(skill => {
                                        // Handle both object format (with name/description) and string format
                                        if (typeof skill === 'object' && skill.name) {
                                            return `
                                                <div class="skill-item">
                                                    <span class="skill-name">${skill.name}</span>
                                                    <span class="skill-description">${skill.description || ''}</span>
                                                </div>
                                            `;
                                        } else if (typeof skill === 'string') {
                                            return `
                                                <div class="skill-item">
                                                    <span class="skill-name">${skill}</span>
                                                </div>
                                            `;
                                        }
                                        return '';
                                    }).join('')}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
        } catch (error) {
            console.error('Error generating skills content:', error);
            return `
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    <div class="desc">Error generating skills content. Check console for details.</div>
                </div>
            `;
        }
    }
    
    /**
     * Generate HTML content for experience
     * @param {Object} experience - Experience data object
     * @returns {string} HTML content
     */
    function generateExperienceContent(experience) {
        console.log('Generating experience content with data:', experience);
        
        if (!experience) {
            console.warn('No experience data available');
            return `
                <div class="section-content">
                    <h1>Experience</h1>
                    <div class="desc">Experience information not available.</div>
                </div>
            `;
        }
        
        try {
            return `
                <div class="section-content">
                    <h1>${experience.company || 'Company'}</h1>
                    <div class="position">${experience.position || 'Position'}</div>
                    <div class="period">${experience.period || 'Period'}</div>
                    <div class="desc">${experience.description || 'No description available.'}</div>
                    ${experience.technologies && Array.isArray(experience.technologies) ? `
                    <div class="tech-list">
                        <span class="label">Technologies:</span>
                        ${experience.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join(' ')}
                    </div>` : ''}
                </div>
            `;
        } catch (error) {
            console.error('Error generating experience content:', error);
            return `
                <div class="section-content">
                    <h1>Experience</h1>
                    <div class="desc">Error generating experience content. Check console for details.</div>
                </div>
            `;
        }
    }

    /**
     * Generate HTML content for education
     * @param {Object} education - Education data object
     * @returns {string} HTML content
     */
    function generateEducationContent(education) {
        console.log('Generating education content with data:', education);
        
        if (!education) {
            console.warn('No education data available');
            return `
                <div class="section-content">
                    <h1>Education</h1>
                    <div class="desc">Education information not available.</div>
                </div>
            `;
        }
        
        try {
            return `
                <div class="section-content">
                    <h1>${education.institution || 'Institution'}</h1>
                    <div class="position">${education.degree || 'Degree'}</div>
                    <div class="period">${education.period || 'Period'}</div>
                    ${education.description ? `<div class="desc">${education.description}</div>` : ''}
                </div>
            `;
        } catch (error) {
            console.error('Error generating education content:', error);
            return `
                <div class="section-content">
                    <h1>Education</h1>
                    <div class="desc">Error generating education content. Check console for details.</div>
                </div>
            `;
        }
    }

    // -----------------------------
    // UI Component References
    // -----------------------------
    
    const toggleButton = document.getElementById('toggle-gui');
    const contentPane = document.getElementById('content-pane');
    
    // -----------------------------
    // Event Handlers
    // -----------------------------
    
    /**
     * Handle toggle button click to switch between terminal and GUI views
     */
    function handleToggleClick() {
        // Check if we're in an iframe
        if (window !== window.parent) {
            // We're in an iframe, communicate with the parent window
            window.parent.document.getElementById('toggle-view').click();
        } else {
            // Direct navigation if accessed directly
            window.location.replace('./');
        }
    }
    
    /**
     * Set the active section and update the UI
     * @param {string} sectionId - ID of the section to activate
     */
    function setActiveSection(sectionId) {
        console.log(`Setting active section to: ${sectionId}`);
        
        // Remove active class from all items
        const allItems = document.querySelectorAll('.left-pane .list li');
        allItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current item
        const activeItem = document.querySelector(`.left-pane .list li[data-section="${sectionId}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        } else {
            console.warn(`Item with data-section="${sectionId}" not found`);
        }
        
        // Update content and title
        if (sections[sectionId]) {
            console.log(`Updating content for section: ${sectionId}`);
            // Ensure we have content before trying to update
            if (sections[sectionId].content) {
                contentPane.innerHTML = sections[sectionId].content;
                document.querySelector('.terminal-bar').textContent = sections[sectionId].title;
            } else {
                console.error(`No content found for section: ${sectionId}`);
                contentPane.innerHTML = `
                    <div class="section-content">
                        <h1>Content Not Available</h1>
                        <div class="desc">The content for "${sectionId}" could not be loaded.</div>
                    </div>
                `;
            }
        } else {
            console.warn(`Section "${sectionId}" not defined in sections object`);
            contentPane.innerHTML = `
                <div class="section-content">
                    <h1>Section Not Found</h1>
                    <div class="desc">The section "${sectionId}" was not found in the available sections.</div>
                </div>
            `;
        }
    }
    
    /**
     * Handle keyboard navigation
     * @param {KeyboardEvent} event - Keyboard event
     */
    function handleKeyboardNavigation(event) {
        // Arrow key navigation
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            navigateVertically(event.key);
        }
        
        // Left/Right to switch between main sections
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            navigateBetweenSections(event.key);
        }
        
        // Number keys for direct section selection
        if (['1', '2', '3', '4', '5'].includes(event.key)) {
            event.preventDefault();
            navigateToSectionByNumber(event.key);
        }
    }
    
    // -----------------------------
    // Navigation Helper Functions
    // -----------------------------
    
    /**
     * Navigate vertically within a section list
     * @param {string} direction - 'ArrowUp' or 'ArrowDown'
     */
    function navigateVertically(direction) {
        const activeSection = document.querySelector('.left-pane .list li.active');
        if (activeSection) {
            const currentList = activeSection.parentElement;
            const items = Array.from(currentList.querySelectorAll('li'));
            const currentIndex = items.indexOf(activeSection);
            
            let nextIndex;
            if (direction === 'ArrowUp') {
                nextIndex = (currentIndex - 1 + items.length) % items.length;
            } else {
                nextIndex = (currentIndex + 1) % items.length;
            }
            
            const section = items[nextIndex].getAttribute('data-section');
            setActiveSection(section);
        }
    }
    
    /**
     * Navigate between different sections
     * @param {string} direction - 'ArrowLeft' or 'ArrowRight'
     */
    function navigateBetweenSections(direction) {
        const sections = Array.from(document.querySelectorAll('.left-pane .section'));
        const activeSection = document.querySelector('.left-pane .list li.active');
        
        if (activeSection) {
            const currentSectionEl = activeSection.closest('.section');
            const currentSectionIndex = sections.indexOf(currentSectionEl);
            
            let nextSectionIndex;
            if (direction === 'ArrowLeft') {
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
    
    /**
     * Navigate directly to a section by number key
     * @param {string} key - Number key '1'-'5'
     */
    function navigateToSectionByNumber(key) {
        const sectionIndex = parseInt(key) - 1;
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
    
    // -----------------------------
    // Initialization
    // -----------------------------
    
    // Add event listeners
    toggleButton.addEventListener('click', handleToggleClick);
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    console.log('Adding click event listeners to sidebar items...');
    
    // Add click event listeners to all section items
    const sidebarItems = document.querySelectorAll('.left-pane .list li');
    if (sidebarItems.length === 0) {
        console.warn('No sidebar items found to attach event listeners');
    }
    
    sidebarItems.forEach(item => {
        const section = item.getAttribute('data-section');
        if (!section) {
            console.warn('Sidebar item missing data-section attribute:', item);
            return;
        }
        
        // Log all available sections for debugging
        if (sections[section]) {
            console.log(`Found valid section for ${section}`);
        } else {
            console.warn(`Section not defined in sections object: ${section}`);
        }
        
        // Add click listener
        item.addEventListener('click', function(event) {
            console.log(`Sidebar item clicked: ${section}`);
            event.preventDefault();
            setActiveSection(section);
        });
    });
    
    // Initialize with home section
    console.log('Initializing terminal with home section...');
    setActiveSection('home');
});