// Get the pattern ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const patternId = urlParams.get('id');

// Fetch the pattern data
fetch('patterns.json')
  .then(response => response.json())
  .then(patterns => {
    // Find the pattern with the matching ID
    const pattern = patterns.find(p => p.id == patternId);

    if (pattern) {
      // Populate the page with the pattern details
      const patternContent = document.getElementById('pattern-content');
      patternContent.innerHTML = `
        <h1>${pattern.title}</h1>
        <img src="${pattern.image}" alt="${pattern.title}" class="pattern-image">
        <p><strong>Description:</strong> ${pattern.description}</p>
        <p><strong>Category:</strong> ${pattern.category}</p>
        <p><strong>Difficulty:</strong> ${pattern.difficulty}</p>
        <p><strong>Colors:</strong> ${pattern.colors.join(', ')}</p>
        <h2>Instructions</h2>
        <p>${pattern.instructions}</p>
        <h2>Media</h2>
        <div class="media-grid">
          <img src="${pattern.image}" alt="${pattern.title}">
          <!-- Add more images or videos here -->
        </div>
      `;
    } else {
      // Display an error message if the pattern is not found
      const patternContent = document.getElementById('pattern-content');
      patternContent.innerHTML = '<p>Pattern not found.</p>';
    }
  })
  .catch(error => {
    console.error('Error loading pattern details:', error);
    const patternContent = document.getElementById('pattern-content');
    patternContent.innerHTML = '<p>Error loading pattern details. Please try again later.</p>';
  });