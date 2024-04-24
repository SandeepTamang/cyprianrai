document.addEventListener('DOMContentLoaded', function() {
  const puzzleContainer = document.getElementById('puzzle-container');
  const tiles = [];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, ''];
  let startTime, endTime;

  // Shuffle the numbers
  numbers.sort(() => Math.random() - 0.5);

  // Create and append tiles
  numbers.forEach(number => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = number;
    tiles.push(tile);
    puzzleContainer.appendChild(tile);
  });

  // Add event listener for tiles
  tiles.forEach((tile, index) => {
    tile.addEventListener('click', function() {
      if (index % 3 !== 0 && tiles[index - 1].textContent === '') { // Left tile
        swapTiles(index, index - 1);
      } else if (index % 3 !== 2 && tiles[index + 1].textContent === '') { // Right tile
        swapTiles(index, index + 1);
      } else if (index >= 3 && tiles[index - 3].textContent === '') { // Top tile
        swapTiles(index, index - 3);
      } else if (index < 6 && tiles[index + 3].textContent === '') { // Bottom tile
        swapTiles(index, index + 3);
      }

      if (isSolved()) {
        endTime = new Date();
        const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
        alert(`Congratulations! Puzzle solved!\nTime taken: ${timeTaken} seconds`);
      }
    });
  });

  // Function to swap tiles
  function swapTiles(index1, index2) {
    [tiles[index1].textContent, tiles[index2].textContent] = [tiles[index2].textContent, tiles[index1].textContent];
  }

  // Function to check if the puzzle is solved
  function isSolved() {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].textContent !== '' && Number(tiles[i].textContent) !== i + 1) {
        return false;
      }
    }
    return true;
  }

  // Start the timer when the first tile is clicked
  tiles[0].addEventListener('click', function() {
    startTime = new Date();
  });
});
