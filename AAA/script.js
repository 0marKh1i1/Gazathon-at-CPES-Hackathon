let gridElement = document.getElementById("grid");
let widthInput = document.getElementById("width");
let heightInput = document.getElementById("height");

let grid = [];
let startCell = null;
let endCell = null;
let running = false;

function generateGrid() {
    let width = parseInt(widthInput.value);
    let height = parseInt(heightInput.value);
    
    gridElement.innerHTML = '';
    gridElement.style.gridTemplateColumns = `repeat(${width}, 30px)`;
    gridElement.style.gridTemplateRows = `repeat(${height}, 30px)`;
    
    grid = Array.from({ length: height }, (_, y) => Array.from({ length: width }, (_, x) => {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.x = x;
        cell.dataset.y = y;
        cell.onclick = () => cellClicked(cell);
        gridElement.appendChild(cell);
        return cell;
    }));
}

function cellClicked(cell) {
    if (running) return;
    
    let x = cell.dataset.x;
    let y = cell.dataset.y;
    
    if (!startCell) {
        cell.classList.add('start');
        startCell = { x, y };
    } else if (!endCell && !cell.classList.contains('start')) {
        cell.classList.add('end');
        endCell = { x, y };
    } else if (!cell.classList.contains('start') && !cell.classList.contains('end')) {
        cell.classList.toggle('obstacle');
    }
}

function startSimulation() {
    if (!startCell || !endCell) {
        alert("Please set both start and end points.");
        return;
    }

    running = true;
    let start = { x: parseInt(startCell.x), y: parseInt(startCell.y) };
    let end = { x: parseInt(endCell.x), y: parseInt(endCell.y) };

    let openSet = [{ ...start, g: 0, h: heuristic(start, end), f: 0 }];
    let closedSet = [];
    let prev = new Map();

    function aStar() {
        if (openSet.length === 0) {
            alert("No path found!");
            return;
        }

        let current = openSet.reduce((acc, node) => node.f < acc.f ? node : acc, openSet[0]);
        
        if (current.x == end.x && current.y == end.y) {
            drawPath(prev, end);
            return;
        }

        openSet = openSet.filter(node => node !== current);
        closedSet.push(current);

        let neighbors = getNeighbors(current.x, current.y);

        for (let neighbor of neighbors) {
            let { nx, ny } = neighbor;
            let neighborCell = grid[ny][nx];
            if (closedSet.find(n => n.x == nx && n.y == ny) || neighborCell.classList.contains('obstacle')) {
                continue;
            }

            let gScore = current.g + 1;
            let hScore = heuristic({ x: nx, y: ny }, end);
            let fScore = gScore + hScore;

            let existing = openSet.find(n => n.x == nx && n.y == ny);
            if (!existing || gScore < existing.g) {
                prev.set(`${nx},${ny}`, { x: current.x, y: current.y });  
                if (!existing) {
                    openSet.push({ x: nx, y: ny, g: gScore, h: hScore, f: fScore });
                } else {
                    existing.g = gScore;
                    existing.h = hScore;
                    existing.f = fScore;
                }
            }
        }

        grid[current.y][current.x].classList.add('visited');
        setTimeout(aStar, 1); 
    }

    aStar();
}

function getNeighbors(x, y) {
    let neighbors = [];
    if (x > 0) neighbors.push({ nx: x - 1, ny: y }); 
    if (x < grid[0].length - 1) neighbors.push({ nx: x + 1, ny: y }); 
    if (y > 0) neighbors.push({ nx: x, ny: y - 1 }); 
    if (y < grid.length - 1) neighbors.push({ nx: x, ny: y + 1 }); 
    return neighbors;
}

function heuristic(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function drawPath(prev, end) {
    let current = end;
    let path = [];

    
    while (prev.has(`${current.x},${current.y}`)) {
        let { x, y } = current;
        if (!(x == startCell.x && y == startCell.y)) { 
            path.push({ x, y });
        }
        current = prev.get(`${current.x},${current.y}`);
    }

    
    function drawStep() {
        if (path.length > 0) {
            let { x, y } = path.pop();
            grid[y][x].classList.add('path');
            setTimeout(drawStep, 1); 
        } else {
            running = false;
        }
    }

    drawStep();
}
