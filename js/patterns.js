let allPatterns = []; // Stores all patterns from the JSON file
let currentPage = 1; // Tracks the current page
const patternsPerPage = 10; // Number of patterns to display per page

// Fetch patterns from the JSON file
fetch('data/patterns.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(patterns => {
    // Sort patterns by ID and store them
    allPatterns = patterns.sort((a, b) => a.id - b.id);
    // Display the first page of patterns
    displayPatterns(allPatterns, currentPage);
    // Set up the filter functionality
    setupFilters();
    // Set up pagination
    setupPagination(allPatterns);
  })
  .catch(error => {
    console.error('Error loading patterns:', error);
    const patternsGrid = document.getElementById('patterns-grid');
    patternsGrid.innerHTML = '<p>Error loading patterns. Please try again later.</p>';
  });

// Function to display patterns for the current page
function displayPatterns(patterns, page) {
  const patternsGrid = document.getElementById('patterns-grid');
  patternsGrid.innerHTML = ''; // Clear the grid

  // Calculate the start and end indices for the current page
  const start = (page - 1) * patternsPerPage;
  const end = start + patternsPerPage;
  const paginatedPatterns = patterns.slice(start, end);

  // Loop through the patterns for the current page and create cards
  paginatedPatterns.forEach(pattern => {
    const patternCard = document.createElement('div');
    patternCard.classList.add('pattern-card');

    patternCard.innerHTML = `
      <img src="${pattern.image}" alt="${pattern.title}">
      <h3>${pattern.title}</h3>
      <p>${pattern.description}</p>
      <p><strong>Colors:</strong> ${pattern.colors.join(', ')}</p>
      <a href="pattern-details.html?id=${pattern.id}" class="view-button">View Pattern</a>
    `;

    patternsGrid.appendChild(patternCard);
  });

  // Update the pagination info
  document.getElementById('page-info').textContent = `Page ${page} of ${Math.ceil(patterns.length / patternsPerPage)}`;
}

// Function to set up pagination
function setupPagination(patterns) {
  const prevButton = document.getElementById('prev-page');
  const nextButton = document.getElementById('next-page');

  // Previous button click event
  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayPatterns(patterns, currentPage);
    }
  });

  // Next button click event
  nextButton.addEventListener('click', () => {
    if (currentPage < Math.ceil(patterns.length / patternsPerPage)) {
      currentPage++;
      displayPatterns(patterns, currentPage);
    }
  });
}

// Function to set up filters
function setupFilters() {
  const filterOptions = document.querySelectorAll('.filter-options input');

  // Add event listeners to filter checkboxes
  filterOptions.forEach(option => {
    option.addEventListener('change', () => {
      // Get the selected categories
      const selectedCategories = Array.from(filterOptions)
        .filter(option => option.checked)
        .map(option => option.value);

      // Filter patterns based on selected categories
      const filteredPatterns = selectedCategories.length > 0
        ? allPatterns.filter(pattern => selectedCategories.includes(pattern.category.toLowerCase()))
        : allPatterns;

      // Reset to the first page and display filtered patterns
      currentPage = 1;
      displayPatterns(filteredPatterns, currentPage);
      setupPagination(filteredPatterns);
    });
  });
}