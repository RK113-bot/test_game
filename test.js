window.onload = function () {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const blockSize = 32;
    const boardWidth = 10;
    const boardHeight = 20;
    const board = createEmptyBoard();
    let currentBlock = createBlock();
    let nextBlock = createBlock();
    let gameInterval = null;
    let isPaused = false;
    let score = 0;

    drawGame();
}

document.onkeydown = function (e) {
    if (isPaused) return;
    switch (e.key) {
        case 'ArrowUp':
            rotate();
            break;
        case 'ArrowRight':
            move(1);
            break;
        case 'ArrowLeft':
            move(-1);
            break;
        case 'ArrowDown':
            if (!checkCollision(currentBlock, 0, 1)) {
                currentBlock.y++;
                score += 10;
            }
            break;
        case ' ':
            while (!checkCollision(currentBlock, 0, 1)) {
                currentBlock.y++;
                score += 10;
            }
            break;
        default:
            break;
    }
};

function checkCollision(block, dx, dy) {
    for (let y = 0; y < block.shape.length; y++) {
        for (let x = 0; x < block.shape[y].length; x++) {
            if (block.shape[y][x] && (board[block.y + y + dy] && board[block.y + y + dy][block.x + x + dx]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function drawGame() {
    if (!isPaused) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawBoard();
        drawBlock(currentBlock);
        drawBlock(nextBlock, canvas.width - blockSize * 4, 0);
        drawScore();
    }
    requestAnimationFrame(drawGame);
}

function clearLines() {
    outer: for (let y = boardHeight - 1; y >= 0; y--) {
        for (let x = 0; x < boardWidth; x++) {
            if (!board[y][x]) {
                continue outer;
            }
        }

        board.splice(y, 1);
        board.unshift(Array(boardWidth).fill(0));
        score += 100;
    }
}