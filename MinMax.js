class MinMax {
    constructor(isIAWhite) {
        this.tableVals = [["Pawn", 1], ["Knight", 3], ["Bishop", 3], ["Rook", 5], ["Queen", 9], ["King", 99999]];
        this.isIAWhite = isIAWhite;
        this.score = 0;
    }

    function maxi (depth, chessboard) {
        var tempChessboard = chessboard;

        if (depth == 0) {
            return this.score;
        }
        var max = -999999;

        for (var i in chessboard.notatedMoves) {
            tempChessboard.move(i);
            this.score = mini(depth - 1, tempChessboard);
            if (this.score > max) {
                max = this.score;
            }
        }

        return max;
    }

    function mini (depth, chessboard) {
        var tempChessboard = chessboard;

        if (depth == 0) {
            return - this.score;
        }
        var min = 999999;

        for (var i in chessboard.notatedMoves) {
            tempChessboard.move(i);
            this.score = maxi(depth - 1, tempChessboard);
            if (this.score < min) {
                min = this.score;
            }
        }

        return min;
    }
}