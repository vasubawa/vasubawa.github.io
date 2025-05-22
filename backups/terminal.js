/**
 * Terminal Portfolio Implementation
 * A streamlined version with core functionality
 */

// Get portfolio data and initialize terminal
let portfolioData;

// Function to initialize the terminal with data
function initTerminal(data) {
    if (!data || Object.keys(data).length === 0) {
        console.error('Portfolio data not loaded or empty.');
        document.getElementById('content-pane').innerHTML = `
            <div class="section-content">
                <h1>Error: Portfolio Data Not Found</h1>
                <div class="desc">The portfolio data could not be loaded.</div>
            </div>
        `;
        return;
    }
    
    // Extract all skills from portfolio data to display in the sidebar
    function extractAllSkillNames(skillsData) {
        if (!skillsData) return [];
        
        let allSkillsWithDetails = [];
        Object.keys(skillsData).forEach(category => {
            if (Array.isArray(skillsData[category])) {
                skillsData[category].forEach(skill => {
                    allSkillsWithDetails.push({
                        category: category,
                        name: typeof skill === 'object' ? skill.name : skill,
                        description: typeof skill === 'object' ? skill.description || '' : ''
                    });
                });
            }
        });
        return allSkillsWithDetails;
    }
    
    // Get all skill names to display in sidebar
    const allSkillsWithDetails = extractAllSkillNames(data.skills);
    
    // Update skills list in the sidebar
    const skillsList = document.getElementById('skills-list');
    if (skillsList) {
        // Keep the "All Skills" option
        let skillsListHTML = '<li data-section="skills-all">All Skills</li>';
        
        // Add all individual skills below it
        allSkillsWithDetails.forEach((skill, index) => {
            skillsListHTML += `<li data-skill-index="${index}">${skill.name}</li>`;
        });
        
        skillsList.innerHTML = skillsListHTML;

        // Add event listeners to skill items
        const skillItems = skillsList.querySelectorAll('li[data-skill-index]');
        skillItems.forEach(item => {
            item.addEventListener('click', function(event) {
                event.preventDefault();
                const skillIndex = parseInt(this.getAttribute('data-skill-index'));
                showSkillDetails(skillIndex);
            });
        });
    }

    // Show details for a specific skill
    function showSkillDetails(skillIndex) {
        if (skillIndex < 0 || skillIndex >= allSkillsWithDetails.length) return;
        
        const skill = allSkillsWithDetails[skillIndex];
        const tempSectionId = `skill-${skillIndex}`;
        
        // Create a temporary section for this skill
        sections[tempSectionId] = {
            title: `Skill: ${skill.name}`,
            content: `
                <div class="section-content">
                    <h1>${skill.name}</h1>
                    <div class="skill-category-label">Category: ${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</div>
                    ${skill.description ? `
                    <div class="skill-description-section">
                        <h2>Description</h2>
                        <div class="desc">${skill.description}</div>
                    </div>` : '<div class="desc">No description available for this skill.</div>'}
                </div>
            `
        };
        
        // Update UI
        const allItems = document.querySelectorAll('.left-pane .list li');
        allItems.forEach(item => item.classList.remove('active'));
        
        const skillItem = document.querySelector(`.left-pane .list li[data-skill-index="${skillIndex}"]`);
        if (skillItem) skillItem.classList.add('active');
        
        contentPane.innerHTML = sections[tempSectionId].content;
        document.querySelector('.terminal-bar').textContent = sections[tempSectionId].title;
    }

    // Random quote from the data
    const randomQuote = data.quotes ? data.quotes[Math.floor(Math.random() * data.quotes.length)] : "Code is poetry.";
    
    // Content sections available in the terminal
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
        'proj-1': {
            title: 'Projects',
            content: generateProjectContent(data.projects && data.projects.length > 0 ? data.projects[0] : null)
        },
        'skills-all': {
            title: 'Skills & Tools',
            content: generateAllSkillsContent(data.skills || {})
        },
        'exp-1': {
            title: 'Experience',
            content: generateContent(data.experience && data.experience.length > 0 ? data.experience[0] : null, 'experience')
        },
        'exp-2': {
            title: 'Experience',
            content: generateContent(data.experience && data.experience.length > 1 ? data.experience[1] : null, 'experience')
        },
        'edu-1': {
            title: 'Education',
            content: generateContent(data.education && data.education.length > 0 ? data.education[0] : null, 'education')
        }
    };

    // Generic content generator for experience and education
    function generateContent(item, type) {
        if (!item) {
            return `
                <div class="section-content">
                    <h1>${type.charAt(0).toUpperCase() + type.slice(1)}</h1>
                    <div class="desc">Information not available.</div>
                </div>
            `;
        }
        
        if (type === 'experience') {
            return `
                <div class="section-content">
                    <h1>${item.company || 'Company'}</h1>
                    <div class="position">${item.position || 'Position'}</div>
                    <div class="period">${item.period || 'Period'}</div>
                    <div class="desc">${item.description || 'No description available.'}</div>
                    ${item.technologies && Array.isArray(item.technologies) ? `
                    <div class="tech-list">
                        <span class="label">Technologies:</span>
                        ${item.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join(' ')}
                    </div>` : ''}
                </div>
            `;
        } else {
            return `
                <div class="section-content">
                    <h1>${item.institution || 'Institution'}</h1>
                    <div class="position">${item.degree || 'Degree'}</div>
                    <div class="period">${item.period || 'Period'}</div>
                    ${item.description ? `<div class="desc">${item.description}</div>` : ''}
                </div>
            `;
        }
    }

    // Generate project content
    function generateProjectContent(project) {
        if (!project) {
            return `
                <div class="section-content">
                    <h1>Project</h1>
                    <div class="desc">Project information not available.</div>
                </div>
            `;
        }
        
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
    }
    
    // Generate skills content with clickable items
    function generateAllSkillsContent(skillsData) {
        if (!skillsData || Object.keys(skillsData).length === 0) {
            return `
                <div class="section-content">
                    <h1>Skills & Tools</h1>
                    <div class="desc">No skills information available.</div>
                </div>
            `;
        }
        
        // Generate HTML for skills
        const skillsHtml = Object.keys(skillsData).map(category => {
            const categorySkills = skillsData[category];
            
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
            
            const skillsListHtml = categorySkills.map(skill => {
                // Find the matching skill in allSkillsWithDetails to get its index
                const skillDetailsIndex = allSkillsWithDetails.findIndex(s => 
                    (typeof skill === 'object' && s.name === skill.name) ||
                    (typeof skill === 'string' && s.name === skill)
                );
                
                if (typeof skill === 'object' && skill.name) {
                    return `
                        <div class="skill-item" data-skill-index="${skillDetailsIndex !== -1 ? skillDetailsIndex : ''}" role="button" tabindex="0">
                            <span class="skill-name">${skill.name}</span>
                            <span class="skill-description">${skill.description || ''}</span>
                        </div>
                    `;
                } else if (typeof skill === 'string') {
                    return `
                        <div class="skill-item" data-skill-index="${skillDetailsIndex !== -1 ? skillDetailsIndex : ''}" role="button" tabindex="0">
                            <span class="skill-name">${skill}</span>
                        </div>
                    `;
                }
                return '';
            }).join('');
            
            return `
                <div class="skill-category">
                    <h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>
                    <div class="skills-list">
                        ${skillsListHtml}
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="section-content">
                <h1>Skills & Tools</h1>
                ${skillsHtml}
            </div>
        `;
    }

    // UI component references
    const toggleButton = document.getElementById('toggle-gui');
    const contentPane = document.getElementById('content-pane');
    
    // Handle toggle button click to switch between terminal and GUI views
    function handleToggleClick() {
        if (window !== window.parent) {
            window.parent.document.getElementById('toggle-view').click();
        } else {
            window.location.replace('./');
        }
    }
    
    // Set the active section and update the UI
    function setActiveSection(sectionId) {
        // Remove active class from all items
        const allItems = document.querySelectorAll('.left-pane .list li');
        allItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to current item
        const activeItem = document.querySelector(`.left-pane .list li[data-section="${sectionId}"]`);
        if (activeItem) activeItem.classList.add('active');
        
        // Update content and title
        if (sections[sectionId]) {
            // For skills section, regenerate content every time
            if (sectionId === 'skills-all') {
                sections[sectionId].content = generateAllSkillsContent(data.skills || {});
            }
            
            contentPane.innerHTML = sections[sectionId].content;
            document.querySelector('.terminal-bar').textContent = sections[sectionId].title;
            
            // Attach click handlers to skill items in content
            attachSkillItemClickHandlers();
        } else {
            contentPane.innerHTML = `
                <div class="section-content">
                    <h1>Section Not Found</h1>
                    <div class="desc">The section "${sectionId}" was not found.</div>
                </div>
            `;
        }
    }
    
    // Attach click handlers to skill items in content
    function attachSkillItemClickHandlers() {
        const skillItems = document.querySelectorAll('.skill-item[data-skill-index]');
        
        skillItems.forEach(item => {
            const skillIndex = parseInt(item.getAttribute('data-skill-index'));
            if (isNaN(skillIndex)) return;
            
            item.addEventListener('click', function(event) {
                event.preventDefault();
                showSkillDetails(skillIndex);
            });
            
            item.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    showSkillDetails(skillIndex);
                }
            });
        });
    }
    
    // Handle keyboard navigation
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
    
    // Navigate vertically within a section list
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
            if (section) {
                setActiveSection(section);
            }
        }
    }
    
    // Navigate between different sections
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
                if (section) {
                    setActiveSection(section);
                }
            }
        }
    }
    
    // Navigate directly to a section by number key
    function navigateToSectionByNumber(key) {
        const sectionIndex = parseInt(key) - 1;
        const sections = document.querySelectorAll('.left-pane .section');
        
        if (sectionIndex < sections.length) {
            const section = sections[sectionIndex];
            const firstItem = section.querySelector('.list li');
            
            if (firstItem) {
                const sectionId = firstItem.getAttribute('data-section');
                if (sectionId) {
                    setActiveSection(sectionId);
                }
            }
        }
    }
    
    // Add event listeners
    if (toggleButton) {
        toggleButton.addEventListener('click', handleToggleClick);
    }
    
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Add click event listeners to all section items
    const sidebarItems = document.querySelectorAll('.left-pane .list li');
    sidebarItems.forEach(item => {
        const section = item.getAttribute('data-section');
        if (!section) return; // Skip if no section attribute
        
        // Add click listener
        item.addEventListener('click', function(event) {
            event.preventDefault();
            setActiveSection(section);
        });
    });
    
    // Set up MutationObserver to watch for DOM changes and reattach handlers
    const contentObserver = new MutationObserver(attachSkillItemClickHandlers);
    contentObserver.observe(contentPane, { childList: true });
    
    // Initialize with home section
    setActiveSection('home');
}

// Load portfolio data with error handling
document.addEventListener('DOMContentLoaded', function() {
    // Try to get portfolio data from global variable first
    if (window.portfolioData) {
        portfolioData = window.portfolioData;
        initTerminal(portfolioData);
    } else {
        // Try to import as module
        try {
            import('./portfolio-data.js')
                .then(module => {
                    portfolioData = module.default;
                    initTerminal(portfolioData);
                })
                .catch(err => {
                    console.error('Failed to load portfolio data as module:', err);
                    document.getElementById('content-pane').innerHTML = `
                        <div class="section-content">
                            <h1>Error: Portfolio Data Not Found</h1>
                            <div class="desc">The portfolio data could not be loaded. Error: ${err.message}</div>
                        </div>
                    `;
                });
        } catch (e) {
            console.error('Error loading portfolio data:', e);
            document.getElementById('content-pane').innerHTML = `
                <div class="section-content">
                    <h1>Error: Portfolio Data Not Found</h1>
                    <div class="desc">The portfolio data could not be loaded. Check the console for details.</div>
                </div>
            `;
        }
    }
});
