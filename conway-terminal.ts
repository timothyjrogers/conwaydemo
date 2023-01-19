const alive = 'o'
const dead = ' '

function printWorld(world: Array<string[]>) {
    var worldstring: string = ''
    for(let row of world) {
        for(let col of row) {
            worldstring = worldstring + col
        }
        worldstring = worldstring + '\n'
    }
    console.log(worldstring)
}

function getNeighbors(world: Array<string[]>, row: number, col: number): number {
    var neighbors = 0;
    if (row > 0) {
        if (world[row-1][col] == alive) {
            neighbors = neighbors + 1;
        }
        if (col > 0 && world[row-1][col-1] == alive) {
            neighbors = neighbors + 1;
        }
        if (col < xdim-1 && world[row-1][col+1] == alive) {
            neighbors = neighbors + 1;
        }
    }
    if (row < ydim-1) {
        if (world[row+1][col] == alive) {
            neighbors = neighbors + 1;
        }
        if (col > 0 && world[row+1][col-1] == alive) {
            neighbors = neighbors + 1;
        }
        if (col < xdim-1 && world[row+1][col+1] == alive) {
            neighbors = neighbors + 1;
        }
    }
    if (col > 0 && world[row][col-1] == alive) {
        neighbors = neighbors + 1;
    }
    if (col < xdim - 1 && world[row][col+1] == alive) {
        neighbors = neighbors + 1;
    }
    return neighbors;
}

/*Rules
    - Alive w/ < 2 neighbors: dies
    - Alive w/ 2-3 neighbors: lives
    - Alive w/ > 3 neighbors: dies
    - Dead w/ = 3 neighbors: lives
*/
function updateWorld(world: Array<string[]>): Array<string[]> {
    var updatedworld = world;
    console.log("in update world");
    for (var i = 0; i < ydim; i++) {
        for (var j = 0; j < xdim; j++) {
            var neighbors = getNeighbors(world, i, j);
            var living: boolean = world[i][j] == alive;
            if (!living) {
                updatedworld[i][j] = neighbors == 3 ? alive : dead;
            } else {
                if (neighbors < 2) {
                    updatedworld[i][j] = dead
                } else if (neighbors == 2 || neighbors == 3) {
                    updatedworld[i][j] = alive
                } else if (neighbors > 3) {
                    updatedworld[i][j] = dead
                }
            }
        }
    }
    return updatedworld;
}

const xdim = 25
const ydim = 25
const genesisChance = 50
var world = new Array<string[]>()
for (var i = 0; i < ydim; i++) {
    world[i] = new Array();
    for (var j = 0; j < xdim; j++) {
         world[i][j] = Math.floor(Math.random() * 100) < genesisChance ? alive : dead;
    }
}

var generation = 0;
console.log(`Generation ${generation}`);
printWorld(world)
/*
while (true) {
    world = updateWorld(world);
    console.log(`Generation ${generation}`);
    printWorld(world)
}
*/