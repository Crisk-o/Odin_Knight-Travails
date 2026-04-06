// VERTICES ARE POSSIBLE POSITIONS ON CHESSBOARD W/ FORM [X,Y] ( 0 <= x <= 7 && 0 <= y <= 7 )
// EDGES ARE KNIGHT'S VALID MOVES BTWN VERTICES. EX: [0,0] knight can move [2,1], [1,2],...
function knightMoves(startP, endP){
    // returns shortest possible way to get from startP to endP by
    // outputting all squares knight will stop on along the way.

    /* MOVEMENT RULES:
     knight moves 2sq. vertically and 1sq. horizontally OR 2sq. horizontally and 1sq. vertically.
     sometimes MORE THAN ONE FASTEST PATH */

    // ex: knightMoves([0,0], [1,2]) // returns [[0,0],[1,2]]
    // ex: knightMoves([0,0], [3,3]) may return [0,0], [2,1], [3,3] OR [0,0], [1,2], [3,3]
    
    
    /* lists the changes in x and y that can occur with a valid knight move */
    const knightMoveOffsets = [
        [2,1], [2,-1], [-2, 1], [-2, -1], // horizontal
        [1,2], [-1, 2], [1, -2], [-1, -2] // vertical
    ];
    // assign given start position to be first in pathQ. pathQ will keep track of path.
    // "where are we going next?"
    let pathQ = [[startP]];
    // initialize bool. array 'visited' of length 8 and fill it with false values.
    // length of 8 because the gameboard is 8x8. 0-7 for rows & cols.
    // maps the entire gameboard to kepe track of visited squares. Prevents knight from moving in circles.
    // "where have we been?"
    let visited = Array.from({length: 8}, () => Array(8).fill(false)); // creates array of length 8 and fills it with interior arrays of length 8 will 'false' values.
    while(pathQ.length > 0){
        // (on 1st iteration): 'path' assigned startP from pathQ
        // (on iterations after):'path' assigned the next elig. position found at end of while loop. 
        // "how did we get to the goal?" 
        let path = pathQ.shift();
        let current = path[path.length - 1];
        if(current[0] === endP[0] && current[1] === endP[1]){
            return `You made it in ${path.length}! Here's your path: [${path.join("], [")}]`;
        }
        // figures out where the knight is eligible to move next.
        for(let [dx,dy] of knightMoveOffsets){
            let nextX = current[0] + dx;
            let nextY = current[1] + dy;
            let nextPos = [nextX, nextY];
            // if nextPos values are in range [0-7] AND it hasn't been visited already, push to visited and pathQ
            if(nextX >= 0 && nextX <= 7 && nextY >=0 && nextY <= 7 && !visited.includes(nextPos.toString())){
                visited.push(nextPos.toString());
                // copies path array and fills last index with 'nextPos' to be pushed to path in the next iteration.
                pathQ.push([...path, nextPos]);
            }
        }
    }
}
console.log(knightMoves([0,0], [1,2])); // returns [ [0,0], [1,2] ]
console.log(knightMoves([0,0], [3,3])); // returns [ [0,0], [2,1], [3,3] OR [0,0], [1,2], [3,3] ]
console.log(knightMoves([3,3], [4, 5])); // returns [ [3,3], [4,5] ]
console.log(knightMoves([0,0],[7,7])); // 7 moves ... mult. paths...




