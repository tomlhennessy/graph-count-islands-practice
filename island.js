function getNeighbors(row, col, matrix) {
  const directions = [
    [-1, -1], // top-left
    [-1, 0], // top
    [-1, 1], // top-right
    [0, 1], // right
    [1, 1], // bottom-right
    [1, 0], // bottom
    [1, -1], // bottom-left
    [0, -1], // left
  ]

  const neighbors = [];

  for (let [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;

    // check if the new position is within bounds and contains a 1
    if (
      newRow >= 0 && newRow < matrix.length &&
      newCol >= 0 && newCol < matrix[0].length &&
      matrix[newRow][newCol] === 1
    ) {
      neighbors.push([newRow, newCol]);
    }
  }

  return neighbors;
}

function countIslands(matrix) {
  // create a visited set to store visited nodes
  const visited = new Set();
  // initialise count to 0
  let islandCount = 0;

  // iterate through all indices in the matrix
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      // if an index contains a 1 and has not been visited, it's a new island
      if (matrix[row][col] === 1 && !visited.has(`${row},${col}`)) {
        // increment island count
        islandCount++;

        // initialise a stack with the current index
        const stack = [[row, col]];
        // mark the current index as visited
        visited.add(`${row},${col}`);

        // while stack contains elements
        while (stack.length > 0) {
          // pop element from stack
          const [currentRow, currentCol] = stack.pop();

          // get valid neighbors of current element
          const neighbors = getNeighbors(currentRow, currentCol, matrix);

          // iterate over neighbors
          for (let [nRow, nCol] of neighbors) {
            // if neighbor has not been visited
            if (!visited.has(`${nRow},${nCol}`)) {
              // add neighbor to stack
              stack.push([nRow, nCol]);
              // mark neighbor as visited
              visited.add(`${nRow},${nCol}`);
            }
          }
        }
      }
    }
  }

  // return island count
  return islandCount;
}


// local tests

const matrix1 = [
  [1, 1, 1, 1, 0],
  [0, 1, 1, 0, 1],
  [0, 1, 1, 0, 1],
];

console.log(countIslands(matrix1)); // 1

const matrix2 = [
  [1, 1, 1, 0, 0],
  [0, 1, 1, 0, 1],
  [0, 1, 1, 0, 1],
];

console.log(countIslands(matrix2)); // 2

const matrix3 = [
  [0, 0, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 0, 1],
  [0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 1],
];

console.log(countIslands(matrix3)); // 3


module.exports = [countIslands, getNeighbors];
