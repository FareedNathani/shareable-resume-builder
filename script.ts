document.addEventListener('DOMContentLoaded', () => {
    // Function to save content to localStorage
    function saveContent() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(el => {
            localStorage.setItem(el.id, el.innerHTML);
        });
    }
    
    // Restore content from localStorage
    function restoreContent() {
        const editableElements = document.querySelectorAll('[contenteditable="true"]');
        editableElements.forEach(el => {
            const savedContent = localStorage.getItem(el.id);
            if (savedContent) {
                el.innerHTML = savedContent;
            }
        });
    }
    
    // Call restoreContent on page load to initialize content
    restoreContent();

    // Event listener for the Save button
    document.getElementById('saveBtn')?.addEventListener('click', saveContent);

    // Theme switcher functionality
    const themeSwitcher = document.getElementById('themeSwitcher') as HTMLButtonElement;
    if (themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
            document.body.classList.toggle('theme-dark');
        });
    }

    const editableElements = document.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach(element => {
        element.addEventListener('focusout', () => {
            const links = element.querySelectorAll('a');
            links.forEach(link => {
                link.setAttribute('href', link.textContent?.trim() || '');
            });
        });

        element.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'A') {
                event.preventDefault();
                const url = target.getAttribute('href');
                if (url) {
                    window.open(url, '_blank');
                }
            }
        });
    });

    // Event listener for the Download Resume button
    document.getElementById('downloadResume')?.addEventListener('click', () => {
        window.print();
    });

    // Event listener to generate a unique URL based on the name
    document.getElementById('generateLink')?.addEventListener('click', () => {
        const userName = (document.getElementById('name') as HTMLElement).textContent?.trim();
        if (userName) {
            // Create a unique URL based on the user’s name
            const resumeUrl = `${window.location.origin}/resume/${encodeURIComponent(userName)}`;
            (document.getElementById('resumeLink') as HTMLInputElement).value = resumeUrl;
        } else {
            alert('Please enter your name');
        }
    });

    // Event listener for the Share Resume button to copy the unique link
    document.getElementById('shareResume')?.addEventListener('click', () => {
        const resumeLink = (document.getElementById('resumeLink') as HTMLInputElement).value;
        if (resumeLink) {
            navigator.clipboard.writeText(resumeLink).then(() => {
                alert('Resume link copied to clipboard');
            }, () => {
                alert('Failed to copy the link');
            });
        } else {
            alert('Generate the link first');
        }
    });
});