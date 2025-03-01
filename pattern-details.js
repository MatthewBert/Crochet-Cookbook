// Get the pattern ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const patternId = urlParams.get('id');

// Fetch the pattern data
fetch('patterns.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(patterns => {
    // Find the pattern with the matching ID
    const pattern = patterns.find(p => p.id == patternId);

    if (pattern) {
      // Populate the page with the pattern details
      document.getElementById('pattern-title').textContent = pattern.title;
      document.getElementById('pattern-description').textContent = pattern.description;
      document.getElementById('pattern-category').textContent = pattern.category;
      document.getElementById('pattern-difficulty').textContent = pattern.difficulty;
      document.getElementById('pattern-colors').textContent = pattern.colors.join(', ');
      document.getElementById('pattern-instructions').textContent = pattern.instructions;
      document.getElementById('pattern-image').src = pattern.image;

      // Add video link if available
      if (pattern.video) {
        document.getElementById('video-link').href = pattern.video;
      } else {
        document.getElementById('video-link').style.display = 'none';
      }
    } else {
      // Display an error message if the pattern is not found
      const patternContent = document.querySelector('.pattern-content');
      patternContent.innerHTML = '<p>Pattern not found.</p>';
    }
  })
  .catch(error => {
    console.error('Error loading pattern details:', error);
    const patternContent = document.querySelector('.pattern-content');
    patternContent.innerHTML = '<p>Error loading pattern details. Please try again later.</p>';
  });