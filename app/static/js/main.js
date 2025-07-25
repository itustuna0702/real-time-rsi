document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleSidebarBtn = document.getElementById('toggle-sidebar');
    const navbar = document.querySelector('.navbar');
    const content = document.querySelector('.content');
    const sidebarItems = document.querySelectorAll('.sidebar-item');

    // Toggle sidebar
    toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        // Adjust navbar and content position based on sidebar state
        if (sidebar.classList.contains('collapsed')) {
            navbar.style.left = '60px';
            navbar.style.width = 'calc(100% - 60px)';
            navbar.style.paddingLeft = 'calc(60px + 20px)'; // Adjust padding
            content.style.marginLeft = '60px';
        } else {
            navbar.style.left = '250px';
            navbar.style.width = 'calc(100% - 250px)';
            navbar.style.paddingLeft = 'calc(250px + 20px)'; // Adjust padding
            content.style.marginLeft = '250px';
        }
    });

    // Highlight active sidebar item
    function setActiveSidebarItem() {
        const currentPath = window.location.pathname;

        sidebarItems.forEach(item => {
            item.classList.remove('active');
            const targetPage = item.getAttribute('data-target-page');

            // Handle root path / and specific page paths
            if (currentPath === '/' && targetPage === '/') {
                item.classList.add('active');
            } else if (targetPage !== '/' && currentPath.startsWith(targetPage)) {
                item.classList.add('active');
            }
        });
    }

    // Initial call to set active item and adjust layout
    setActiveSidebarItem();

    // Event listener for sidebar item clicks (for page navigation)
    sidebarItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent default link behavior if data-target-page is present
            if (item.getAttribute('data-target-page')) {
                event.preventDefault(); // Stop default anchor navigation
                window.location.href = item.getAttribute('data-target-page'); // Manually navigate
            }
        });
    });
});
function setActiveSidebarItem() {
        const currentPath = window.location.pathname;

        sidebarItems.forEach(item => {
            item.classList.remove('active');
            const targetPage = item.getAttribute('data-target-page');

            // Handle root path / and specific page paths
            if (currentPath === '/' && targetPage === '/') {
                item.classList.add('active');
            } else if (targetPage && currentPath.startsWith(targetPage)) { // Handles /search and potential /search/something
                item.classList.add('active');
            }
        });
    }