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
//throw error if input is out of range
function isInputOutOfRange(start, end){
    if (
        start[0] < 0 || start[0] > 7 ||
        start[1] < 0 || start[1] > 7 ||
        end[0] < 0 || end[0] > 7 ||
        end[1] < 0 || end[1] > 7
    ) {
        return true
    }
};

function knightMoves(start, end, recordArray=[], counter=0, queue=[]) {
    if(isInputOutOfRange(start,end)) {
        return 'Be careful! You must insert values between 0 and 7'
    }
    let record = [...recordArray, start];
    queue.shift();//è giusto qui? quando voglio rimuoverlo?
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
        //add to queue possible moves followed by their record
        for (let i = 0; i<possible_moves.length;i++) {
            queue.push([possible_moves[i],record])
        }
        //add 0 at end of queue population as placeholder
        queue.push([0, null]);
        //if placeholder is reached, check if there has been any result
        if(queue[0][0]==0) {
            //if there are any result, force exit from loop and process results
            if (externalRecord.length>0) {
                let result = externalRecord[0];
                for (let i = 1; i<externalRecord.length;i++) {
                    if(externalRecord[i].counter < result.counter) {
                        result = externalRecord[i];
                    }
                }
                return result.record    //does it do anything?
            }
            else {
                queue.shift();          //this defintly does
            }
        }
        externalRecord.push(knightMoves(queue[0][0], end, queue[0][1], counter+1, queue));
        let result = externalRecord[0];
                for (let i = 1; i<externalRecord.length;i++) {
                    if(externalRecord[i].counter < result.counter) {
                        result = externalRecord[i];
                    }
                }
                return result
    }
};
console.log(
    '%c the knight travelled through ' +
    knightMoves([7,4],[7,5]).record.length +
    ' cells to reach his destination.' +
    'The cells traversed are: ','color:lime;background:black;'
);
console.table(knightMoves([7,7],[7,5]).record);