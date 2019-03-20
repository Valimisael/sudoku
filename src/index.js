module.exports = function solveSudoku(matrix) {
	var sudoku = matrix;

	fillMatrix();
	
	for (var rows = 0; rows < 9; rows++) {
		for (var columns = 0; columns < 9; columns++) {
			if (typeof sudoku[rows][columns] != "object") {
				var value = sudoku[rows][columns];
				removeImpossibleValues(rows, columns, value);
			}
		}
	}
	
	var run = true;
	while (run) {
		run = searchUniqueValue();
	}
		
	function fillMatrix() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (sudoku[i][j] == 0) {
					sudoku[i][j] = [1,2,3,4,5,6,7,8,9];
				}
			}
		}
	}	
		
	function searchUniqueValue() {
		var isAdded = false;

		for (var num = 0; num < 9; num++) {			
			var addedInRow = searchUniqueValueFromRow(num),
					addedInColumn = searchUniqueValueFromCol(num),
					addedInSquare = searchUniqueValueFromGrid(num);
			if (addedInRow == true || addedInColumn == true || addedInSquare == true) {
				isAdded = true;
			}
		}
		return isAdded;
	}	
		
	function searchUniqueValueFromRow(num){
		var isAdded = false;

		for (var row = 0; row < 9; row++) {
			var counter = 0,
					position = -1;
			for (var col = 0; col < 9; col++) {
				if (typeof sudoku[row][col] == "object") {
					if (sudoku[row][col][num] == num+1) {
						counter++;
						position = col;
					}
				}
			}
			if (counter == 1) {
				sudoku[row][position] = num+1;				
				removeImpossibleValues(row, position, num+1);
				isAdded = true;
			}
		}
		return isAdded;
	}

	function searchUniqueValueFromCol(num) {
		var isAdded = false;

		for (var col = 0; col < 9; col++) {
			var counter = 0,
					position = -1;
			for (var row = 0; row < 9; row++) {
				if (typeof sudoku[row][col] == "object") {
					if (sudoku[row][col][num] == num+1) {
						counter++;
						position = row;
					}
				}
			}
			if (counter == 1) {
				sudoku[position][col] = num+1;				
				removeImpossibleValues(position, col, num+1);
				isAdded = true;
			}
		}
		return isAdded;
	}
	
	function searchUniqueValueFromGrid(num) {
		var isAdded = false;

		for (var grid = 0; grid < 9; grid++) {
			var counter = 0,
					positionInCol = -1,
					positionInRow = -1,
					startCol = (grid % 3) * 3,
					startRow = (grid - grid % 3);			
			for (var row = startRow; row < startRow + 3; row++) {
				for (var col = startCol; col < startCol + 3; col++) {
					if (typeof sudoku[row][col] == "object") {
						if (sudoku[row][col][num] == num+1) {
							counter++;
							positionInRow = row;
							positionInCol = col;
						}
					}
				}
			}
			if (counter == 1) {
				sudoku[positionInRow][positionInCol] = num+1;
				removeImpossibleValues(positionInRow, positionInCol, num+1);
				isAdded = true;
			}
		}
		return isAdded;
	}

	function removeImpossibleValues(row, column, value) {
		for (var num = 0; num < 9; num++) {
			removeImpossibleValuesFromRow(row, num, value);
			removeImpossibleValuesFromCol(num, column, value);
			removeImpossibleValuesFromGrid(row, column, num, value);
		}
	}
	
	function removeImpossibleValuesFromRow(row, num, value) {
		if (typeof sudoku[row][num] == "object") {
			sudoku[row][num][value-1] = 0;
		}
	}
	
	function removeImpossibleValuesFromCol(num, col, value) {
		if (typeof sudoku[num][col] == "object") {
			sudoku[num][col][value-1] = 0;
		}
	}

	function removeImpossibleValuesFromGrid(row, col, num, value) {
		var elementRow = (row - row % 3) + (num - num % 3) / 3,
				elementCol = (col - col % 3) + (num % 3);
		if (elementRow != row && elementCol != col) {
			if (typeof sudoku[elementRow][elementCol] == "object") {
				sudoku[elementRow][elementCol][value-1] = 0;
			}
		}
	}

  return sudoku;
}