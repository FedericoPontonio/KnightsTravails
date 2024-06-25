//create unfiltered values
function knightMovement (x, y){
    const tempArray = [
    [x+2,y+1],
    [x+2,y-1],
    [x-2,y+1],
    [x-2,y-1],
    [x+1,y+2],
    [x+1,y-2],
    [x-1,y+2],
    [x-1,y-2]
    ]
    return tempArray
}
//filter out of range values
function possibleMoves(x,y) {
    let possibleMoves = [];
    let prefilterMoves = knightMovement(x,y);
    for (let i=0;i<8;i++) {
        if (prefilterMoves[i][0]>0 && prefilterMoves[i][0]<8 &&
            prefilterMoves[i][1]>0 && prefilterMoves[i][1]<8){
                possibleMoves.push(prefilterMoves[i])
            }
    }
    return possibleMoves
};

//store values in 2d arrays
function adjacencyList(i = null,j = null) {
    let rowsArray = [];
    for (let x = 0; x < 8; x++) {
        let columnsArray = [];
        for (let y = 0; y<8;y++) {
            if(x== i && y==j){}
            else {
                columnsArray.push(possibleMoves(x,y)) 
            }
        }
        rowsArray.push(columnsArray)
    }
    return rowsArray
};

// console.log(adjacencyList())
// console.log(knightMoves([1,2], [4,5]))

function knightMoves(start, end, data, record = []) {
    console.log(adjacencyList([start[0]][start[1]]))

    let availableMoves = adjacencyList([start[0]][start[1]]);
    if (start[0] == end[0]&&start[1]==end[1]) {
        return record
    }
    else {
        let record = [];
        for (let i = 0; i< availableMoves.length; i++) {
            record.push({itinerary : availableMoves[i]})
            return knightMoves(availableMoves[i], end,adjacencyList([start[0]][start[1]]))  )

        }
        let result= record[0].itinerary;
        for (let i= 1;i<record.length;i++) {
            if (record[i].itinerary.length<result.length) {
                result = record[i].itinerary
            }
        }
    }
}

