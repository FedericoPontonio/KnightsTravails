//create unfiltered values
function moveSet (x, y){
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
    let prefilterMoves = moveSet(x,y);
    for (let i=0;i<8;i++) {
        if (prefilterMoves[i][0]>=0 && prefilterMoves[i][0]<8 &&
            prefilterMoves[i][1]>=0 && prefilterMoves[i][1]<8){
                possibleMoves.push(prefilterMoves[i])
            }
    }
    return possibleMoves
};
// console.log(possibleMoves(1,5))

function knightMoves(start, end, recordArray=[], counter=0) {
    let record = [...recordArray, start];//serve?
    let possible_moves = possibleMoves(start[0],start[1]);
    //remove record elements from possible_moves
    for (let i = 0; i< possible_moves.length;i++) {//iterate through possible_moves
        for (let j = 0; j< record.length; j++) {//iterate through record
            if (record[j][0] == possible_moves[i][0] &&
                record[j][1] == possible_moves[i][1]) {
                    possible_moves.splice(i,1);
                    i--;
                    break;
                }
        }
    }
    //evaluate if end in possible_moves
    let isEndInPossibleMoves = false;
    for (let i = 0; i<possible_moves.length;i++) {
        if (end[0] == possible_moves[i][0] && end[1] == possible_moves[i][1]) {
            isEndInPossibleMoves = true;
        }
    }
    //base case
    if (isEndInPossibleMoves) {
        record.push(end);
        return {counter, record}
    }
    //recursion case
    else {
        let externalRecord = [];
        for (let i = 0; i< possible_moves.length; i++) {
                externalRecord.push(knightMoves(possible_moves[i], end, record, counter+1));
            }
        
        let result = externalRecord[0];
        for (let i = 1; i<externalRecord.length;i++) {
            if(externalRecord[i].counter < result.counter) {
                result = externalRecord[i];
            }
        }
        return result.record
    }
}

console.log(knightMoves([0,7],[0,5]));
