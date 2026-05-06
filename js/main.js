document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Accordion Logic (Milestones) ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            
            // Close all other accordions
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current accordion
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    // --- Active Navigation Link Highlighting on Scroll ---
    const sections = document.querySelectorAll('section');
    
    // --- Resource Tabs Logic ---
    const resourceTabs = document.querySelectorAll('.resource-tab');
    const resourceGrids = document.querySelectorAll('.resources-grid');

    resourceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            resourceTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all grids
            resourceGrids.forEach(grid => {
                grid.style.display = 'none';
                grid.classList.remove('active-grid');
            });

            // Show target grid
            const targetId = tab.getAttribute('data-target');
            const targetGrid = document.getElementById(targetId);
            if (targetGrid) {
                targetGrid.style.display = 'grid';
                targetGrid.classList.add('active-grid');
            }
        });
    });

    // --- Sub-Documents Toggle Logic ---
    const toggleBtns = document.querySelectorAll('.toggle-docs-btn');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const list = btn.nextElementSibling;
            const icon = btn.querySelector('i');
            
            if (list.style.display === 'none' || list.style.display === '') {
                list.style.display = 'flex';
                icon.classList.remove('ph-caret-down');
                icon.classList.add('ph-caret-up');
            } else {
                list.style.display = 'none';
                icon.classList.remove('ph-caret-up');
                icon.classList.add('ph-caret-down');
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Sticky Navbar Styling
        const navbar = document.getElementById('navbar');
        if (scrollY > 50) {
            navbar.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // Handle Form Submission with mailto
    const form = document.getElementById('contactForm');
    const successPopup = document.getElementById('successPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const subject = document.getElementById('senderSubject').value;
            const message = document.getElementById('senderMessage').value;
            
            const mailtoLink = `mailto:salindusandun57@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\n" + message)}`;
            
            window.location.href = mailtoLink;
            
            // Show custom popup modal
            if(successPopup) {
                successPopup.classList.add('active');
            }
            
            form.reset();
        });
    }

    // Close Popup Logic
    const closePopup = () => {
        if(successPopup) {
            successPopup.classList.remove('active');
        }
    };

    if(closePopupBtn) {
        closePopupBtn.addEventListener('click', closePopup);
    }

    // Close popup when clicking outside the content
    if(successPopup) {
        successPopup.addEventListener('click', (e) => {
            if (e.target === successPopup) {
                closePopup();
            }
        });
    }
});
