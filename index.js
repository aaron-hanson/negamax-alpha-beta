
function NegamaxAlphaBeta (config) {
  const conf = Object.assign({
    generateMoves: (gameState) => [],
    makeMove: (gameState, move) => true,
    unmakeMove: null,
    evaluate: (gameState) => 0,
    evaluateTerminal: (gameState) => null
  }, config);

  this._generateMoves = conf.generateMoves;
  this._makeMove = conf.makeMove;
  this._unmakeMove = conf.unmakeMove;
  this._evaluate = conf.evaluate;
  this._evaluateTerminal = conf.evaluateTerminal;

  this.nodeCount = 0;
}

NegamaxAlphaBeta.prototype.search = function (gameState, depth, alpha = -Infinity, beta = Infinity, side = 1, isRoot = true) {
  if (isRoot) this.nodeCount = 1;
  else ++this.nodeCount;

  const terminalEvaluation = this._evaluateTerminal(gameState);
  if (terminalEvaluation != null) {
    return terminalEvaluation;
  }

  if (depth === 0) {
    return this._evaluate(gameState);
  }

  let bestScore = -Infinity, bestMove = null;
  const moves = this._generateMoves(gameState);

  for (let i = 0, len = moves.length; i < len; ++i) {
    const move = moves[i];
    const sideChanged = this._makeMove(gameState, move) ? -1 : 1;
    const score = sideChanged * this.search(
      gameState,
      depth - 1,
      sideChanged * alpha,
      sideChanged * beta,
      sideChanged * side,
      false
    );
    this._unmakeMove(gameState, move);
    if (score > bestScore) {
      bestScore = score;
    }
    if (bestScore > alpha) {
      alpha = bestScore;
      bestMove = move;
    }
    if (alpha >= beta) {
      break;
    }
  }

  return isRoot ? {score: bestScore, bestMove: bestMove} : bestScore;
};

module.exports = NegamaxAlphaBeta;
