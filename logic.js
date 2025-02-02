let players = ['x', 'o'];
let activePlayer = 0;
let board = [];

function startGame() {
  let boardSize;
  board = [];
  activePlayer = 0;
  turnsCount = 0;
  // Выбор размера доски пользователем
  while (true) {
    boardSize = prompt('Выберите размер доски (от 3 до 7 ячеек)\n(Отмена - размер доски 3)', 3);
    if (boardSize === null) {
      boardSize = 3;
      break;
    } else if (!isNaN(boardSize) && boardSize >= 3 && boardSize <= 7) {
      boardSize = Math.round(+boardSize);
      break;
    }
    
    alert('Неверный размер доски. Пожалуйста, введите другое число.');
  }

  for (let i = 0; i < boardSize; i++) {
    board.push([]);
    for (let j = 0; j < boardSize; j++) {
      board[i].push('');
    }
  }

  alert('Ходит игрок 1 ( x )');
  renderBoard(board);
}

function click(rowNumber, columnNumber) {
  const boardSize = board.length;
  const playerSymbol = players[activePlayer];
  board[rowNumber][columnNumber] = playerSymbol;
  turnsCount++;
  renderBoard(board);
  const checkForWinResult = checkForWin(rowNumber, columnNumber, boardSize, playerSymbol);
  const checkForDrawResult = checkForDraw();
  if (checkForWinResult) {
    applyEndgameActions();
    return;
  }

  if (checkForDrawResult) {
    return;
  }

  // Передача хода следующему игроку
  activePlayer = activePlayer === 0 ? 1 : 0;
  alert(`Ходит игрок ${activePlayer + 1} ( ${players[activePlayer]} )`);
}

function applyEndgameActions() {
  showWinner(activePlayer);
  activePlayer = 0;
}

function checkForWin(rowNumber, columnNumber, boardSize, playerSymbol) {
  // Проверка первой диагонали
  if (rowNumber === columnNumber) {
    for (let i = 0; i < boardSize; i++) {
      const cellValue = board[i][i];
      if (cellValue !== playerSymbol) {
        break;
      } else if ((i === boardSize - 1) && (cellValue === playerSymbol)) {
        return true;
      }
    }
  }

  // Проверка второй диагонали
  if ((rowNumber === boardSize - 1 - columnNumber) && (columnNumber === boardSize - 1 - rowNumber)) {
    for (let i = 0; i < boardSize; i++) {
      const cellValue = board[i][boardSize - 1 - i];
      if (cellValue !== playerSymbol) {
        break;
      } else if ((i === boardSize - 1) && (cellValue === playerSymbol)) {
        return true;
      }
    }
  }

  // Проверка выигрышной ситуации в строке
  for (let i = 0; i < boardSize; i++) {
    const cellValue = board[rowNumber][i];
    if (cellValue !== playerSymbol) {
      break;
    } else if ((i === boardSize - 1) && (cellValue === playerSymbol)) {
      return true;
    }
  }

  // Проверка выигрышной ситуации в столбце
  for (let i = 0; i < boardSize; i++) {
    const cellValue = board[i][columnNumber];
    if (cellValue !== playerSymbol) {
      break;
    } else if ((i === boardSize - 1) && (cellValue === playerSymbol)) {
      return true;
    }
  }
}

function checkForDraw() {
  const boardSize = board.length;
  // Проверка строк
  for (const boardRow of board) {
    if (!checkDirection(boardRow)) return;
  }

  // Проверка столбцов
  for (let i = 0; i < boardSize; i++) {
    const boardColumn = [];
    for (let j = 0; j < boardSize; j++) {
      boardColumn.push(board[j][i]);
    }
    
    if (!checkDirection(boardColumn)) return;
  }

  // Проверка первой диагонали
  const boardDiagonalLeftToRight = [];
  for (let i = 0; i < boardSize; i++) {
    boardDiagonalLeftToRight.push(board[i][i]);
  }

  if (!checkDirection(boardDiagonalLeftToRight)) return;

  // Проверка второй диагонали
  const boardDiagonalRightToLeft = [];
  for (let i = 0; i < boardSize; i++) {
    boardDiagonalRightToLeft.push(board[(boardSize - 1) - i][i]);
  }

  if (!checkDirection(boardDiagonalRightToLeft)) return;

  let header = modalEl.getElementsByTagName('h2')[0];
  header.textContent = ` Ничья! `;
  modalEl.classList.remove('hidden');
  return true;

  function checkDirection(directionCellsArray) {
    return directionCellsArray.includes("x") && directionCellsArray.includes("o");
  }
}
