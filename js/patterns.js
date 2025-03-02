document.addEventListener('DOMContentLoaded', () => {
  let allPatterns = []; // Stores all patterns from the JSON file

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
      // Display all patterns
      displayPatterns(allPatterns);
      // Set up the filter functionality
      setupFilters();
    })
    .catch(error => {
      console.error('Error loading patterns:', error);
      const patternsGrid = document.getElementById('patterns-grid');
      if (patternsGrid) {
        patternsGrid.innerHTML = '<p>Error loading patterns. Please try again later.</p>';
      }
    });

  // Function to display all patterns
  function displayPatterns(patterns) {
    const patternsGrid = document.getElementById('patterns-grid');

    if (!patternsGrid) {
      console.error('Error: Could not find the patterns grid in the DOM.');
      return;
    }

    patternsGrid.innerHTML = ''; // Clear the grid

    // Loop through all patterns and create cards
    patterns.forEach(pattern => {
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
  }

  // Function to set up filters
  function setupFilters() {
    const filterOptions = document.querySelectorAll('.filter-options input');

    if (!filterOptions) {
      console.error('Error: Could not find filter options in the DOM.');
      return;
    }

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

        // Display filtered patterns
        displayPatterns(filteredPatterns);
      });
    });
  }
});