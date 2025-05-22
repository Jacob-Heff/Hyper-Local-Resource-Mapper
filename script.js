// --- Configuration ---
const DATA_KEY = 'hyperLocalResources'; // Key for localStorage

// --- DOM Elements ---
const resourceNameInput = document.getElementById('resourceName');
const resourceCategoryInput = document.getElementById('resourceCategory');
const resourceLocationInput = document.getElementById('resourceLocation');
const resourceNotesInput = document.getElementById('resourceNotes');
const addResourceBtn = document.getElementById('addResourceBtn');
const resourceListDiv = document.getElementById('resourceList');
const filterCategoryInput = document.getElementById('filterCategory');
const filterBtn = document.getElementById('filterBtn');

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
 */
function renderResources(resourcesToDisplay) {
    resourceListDiv.innerHTML = ''; // Clear current list

    if (resourcesToDisplay.length === 0) {
        resourceListDiv.innerHTML = '<p>No resources found.</p>';
        return;
    }

    resourcesToDisplay.forEach((resource, index) => {
        const resourceItem = document.createElement('div');
        resourceItem.classList.add('resource-item');
        resourceItem.innerHTML = `
            <h3>${resource.name} <span class="category-tag">${resource.category}</span></h3>
            <p><strong>Location:</strong> ${resource.location}</p>
            <p><strong>Notes:</strong> ${resource.notes}</p>
        `;
        resourceListDiv.appendChild(resourceItem);
    });
}

/**
 * Handles adding a new resource from the form inputs.
 */
function addResource() {
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
});