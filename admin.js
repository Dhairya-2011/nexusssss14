'use strict';

// Improved error handling
const handleError = (error) => {
    console.error('An error occurred:', error);
    // Display user-friendly error message
    showErrorMessage('Something went wrong, please try again later.');
};

// Function to handle tab click event delegation
const setupTabClickHandlers = () => {
    const tabsContainer = document.querySelector('.tabs');
    if (tabsContainer) {
        tabsContainer.addEventListener('click', (event) => {
            const targetTab = event.target.closest('.tab');
            if (targetTab) {
                // Logic for handling tab clicks
                handleTabClick(targetTab);
            }
        });
    }
};

// Safer DOM manipulation function
const safeDOMManipulation = (selector, htmlContent) => {
    const element = document.querySelector(selector);
    if (element) {
        element.innerHTML = htmlContent;
    } else {
        handleError(new Error('Element not found: ' + selector));
    }
};

// Function for better modal management
const showModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        // Add event listeners to close the modal
        modal.querySelector('.close').addEventListener('click', () => {
            modal.style.display = 'none';
        });
    } else {
        handleError(new Error('Modal not found: ' + modalId));
    }
};

// Example function that uses the above utilities
const handleTabClick = (tab) => {
    const contentId = tab.dataset.content;
    safeDOMManipulation(`#${contentId}`, `<p>This is content for ${contentId}</p>`);
};

// Initialize event handlers
setupTabClickHandlers();

// Sample error logging
window.addEventListener('error', handleError);

