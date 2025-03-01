// Fetch patterns from the JSON file
fetch('patterns.json')
  .then(response => response.json())
  .then(patterns => {
    const patternsGrid = document.getElementById('patterns-grid');

    // Function to get 3 random patterns
    const getRandomPatterns = (patterns, count) => {
      const shuffled = patterns.sort(() => 0.5 - Math.random()); // Shuffle the array
      return shuffled.slice(0, count); // Return the first `count` patterns
    };

    // Get 3 random patterns
    const randomPatterns = getRandomPatterns(patterns, 3);

    // Loop through each random pattern and create a card
    randomPatterns.forEach(pattern => {
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
  })
  .catch(error => {
    console.error('Error loading patterns:', error);
    const patternsGrid = document.getElementById('patterns-grid');
    patternsGrid.innerHTML = '<p>Error loading patterns. Please try again later.</p>';
  });