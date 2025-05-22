// --- Configuration ---
<<<<<<< HEAD
const DATA_KEY = 'hyperLocalResources'; // Key for localStorage
=======
// Change this to match your backend server's address
// IMPORTANT: For local testing, use http://localhost:3000
// For deployment to GitHub Pages, you'll change this to your Render backend's public URL
const API_BASE_URL = 'https://hyper-mapper-backend.onrender.com';
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)

// --- DOM Elements ---
const resourceNameInput = document.getElementById('resourceName');
const resourceCategoryInput = document.getElementById('resourceCategory');
const resourceLocationInput = document.getElementById('resourceLocation');
const resourceNotesInput = document.getElementById('resourceNotes');
const addResourceBtn = document.getElementById('addResourceBtn');
const resourceListDiv = document.getElementById('resourceList');
const filterCategoryInput = document.getElementById('filterCategory');
const filterBtn = document.getElementById('filterBtn');
<<<<<<< HEAD

// --- Data Handling Functions ---

/**
 * Loads resources from localStorage.
 * @returns {Array} An array of resource objects.
 */
function loadResources() {
    const data = localStorage.getItem(DATA_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Saves resources to localStorage.
 * @param {Array} resources - The array of resource objects to save.
 */
function saveResources(resources) {
    localStorage.setItem(DATA_KEY, JSON.stringify(resources));
}

// --- Resource Management Functions ---

/**
 * Renders the resources to the display area.
 * @param {Array} resourcesToDisplay - The array of resources to show.
=======
const clearAllBtn = document.getElementById('clearAllBtn'); // Assuming you added this button in index.html

// --- Data Handling Functions (Modified to use Fetch API) ---

// We no longer need loadResources and saveResources like before,
// as the backend and MongoDB Atlas handle persistence.

/**
 * Helper function to render resources to the display area.
 * @param {Array} resourcesToDisplay - The array of resource objects to show.
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)
 */
function renderResources(resourcesToDisplay) {
    resourceListDiv.innerHTML = ''; // Clear current list

    if (resourcesToDisplay.length === 0) {
        resourceListDiv.innerHTML = '<p>No resources found.</p>';
        return;
    }

<<<<<<< HEAD
    resourcesToDisplay.forEach((resource, index) => {
=======
    resourcesToDisplay.forEach((resource) => {
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)
        const resourceItem = document.createElement('div');
        resourceItem.classList.add('resource-item');
        resourceItem.innerHTML = `
            <h3>${resource.name} <span class="category-tag">${resource.category}</span></h3>
            <p><strong>Location:</strong> ${resource.location}</p>
            <p><strong>Notes:</strong> ${resource.notes}</p>
<<<<<<< HEAD
=======
            <p class="timestamp">Added: ${new Date(resource.createdAt).toLocaleDateString()}</p>
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)
        `;
        resourceListDiv.appendChild(resourceItem);
    });
}

/**
<<<<<<< HEAD
 * Handles adding a new resource from the form inputs.
 */
function addResource() {
=======
 * Fetches resources from the backend API and renders them.
 * @param {string} [filterCategory=''] - Optional category to filter by.
 */
async function fetchResources(filterCategory = '') {
    let url = API_BASE_URL;
    if (filterCategory) {
        url = `${API_BASE_URL}/filter?category=${encodeURIComponent(filterCategory)}`;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const resources = await response.json();
        renderResources(resources);
    } catch (error) {
        alert("Error fetching resources: " + error.message + ". Please ensure your backend server is running.");
        console.error("Error fetching resources:", error);
    }
}

/**
 * Handles adding a new resource by sending data to the backend API.
 */
async function addResource() {
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)
    const name = resourceNameInput.value.trim();
    const category = resourceCategoryInput.value.trim();
    const location = resourceLocationInput.value.trim();
    const notes = resourceNotesInput.value.trim();

    if (!name) {
        alert("Resource Name cannot be empty!");
        return;
    }

    const newResource = {
        name: name,
        category: category,
        location: location,
        notes: notes
    };

<<<<<<< HEAD
    const resources = loadResources(); // Get existing resources
    resources.push(newResource);      // Add the new one
    saveResources(resources);         // Save back to localStorage

    alert(`Resource "${name}" added successfully!`);

    // Clear form fields
    resourceNameInput.value = '';
    resourceCategoryInput.value = '';
    resourceLocationInput.value = '';
    resourceNotesInput.value = '';

    renderResources(resources); // Refresh the display
}

/**
 * Handles filtering resources based on the filter input.
 */
function filterResources() {
    const filterText = filterCategoryInput.value.trim().toLowerCase();
    const allResources = loadResources();

    if (!filterText) {
        renderResources(allResources); // If filter is empty, show all
        return;
    }

    const filtered = allResources.filter(resource =>
        resource.category.toLowerCase().includes(filterText)
    );
    renderResources(filtered);
}

// --- Event Listeners ---
addResourceBtn.addEventListener('click', addResource);
filterBtn.addEventListener('click', filterResources);

// --- Initial Load ---
document.addEventListener('DOMContentLoaded', () => {
    const initialResources = loadResources();
    renderResources(initialResources); // Display existing resources when page loads
=======
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newResource)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const addedResource = await response.json();
        alert(`Resource "${addedResource.name}" added successfully!`);

        // Clear form fields
        resourceNameInput.value = '';
        resourceCategoryInput.value = '';
        resourceLocationInput.value = '';
        resourceNotesInput.value = '';

        fetchResources(); // Refresh the display with all resources from the DB
    } catch (error) {
        alert("Error adding resource: " + error.message + ". Please ensure your backend server is running.");
        console.error("Error adding resource:", error);
    }
}

/**
 * Handles filtering resources.
 */
function filterResources() {
    const filterText = filterCategoryInput.value.trim();
    fetchResources(filterText);
}

/**
 * Function to clear all resources (requires a backend DELETE route).
 * This part is commented out as it needs a DELETE endpoint on your server.js.
 * For a beginner, implementing a "delete all" might be advanced.
 * A safer initial approach is to only implement "delete one by ID"
 * or to simply not have a "clear all" if it's not critical.
 */
// async function clearAllResources() {
//     try {
//         if (confirm("Are you sure you want to clear ALL resources? This cannot be undone.")) {
//             const response = await fetch(API_BASE_URL + '/clear-all', { method: 'DELETE' }); // You'd need to implement /api/resources/clear-all on your backend
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             alert("All resources cleared!");
//             fetchResources(); // Refresh the display
//         }
//     } catch (error) {
//         alert("Error clearing resources: " + error.message);
//         console.error("Error clearing resources:", error);
//     }
// }

// --- Event Listeners ---
addResourceBtn.addEventListener('click', addResource);
filterBtn.addEventListener('click', filterResources);
// If you added a clearAllBtn in index.html and implemented clearAllResources function in backend:
// clearAllBtn.addEventListener('click', clearAllResources);


// --- Initial Load ---
// This will run when the page loads, fetching any existing resources from your database.
document.addEventListener('DOMContentLoaded', () => {
    fetchResources();
>>>>>>> 75d2ce7 (Initial frontend with Render API integration)
});