fetch('patterns.json')
  .then(response => response.json())
  .then(patterns => {
    const patternsGrid = document.getElementById('patterns-grid');

    // Loop through each pattern and create a card
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
  })
  .catch(error => {
    console.error('Error loading patterns:', error);
    const patternsGrid = document.getElementById('patterns-grid');
    patternsGrid.innerHTML = '<p>Error loading patterns. Please try again later.</p>';
  });