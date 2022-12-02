const { Choices } = require('../constants')

const calculatePlayerRoundScore = (playerChoice, opponentChoice) => {
  let roundScore = 0;

  const draw =
    (Choices.rock.has(playerChoice) && Choices.rock.has(opponentChoice)) ||
    (Choices.paper.has(playerChoice) && Choices.paper.has(opponentChoice)) ||
    (Choices.scissors.has(playerChoice) && Choices.scissors.has(opponentChoice));

  const win =
    (Choices.rock.has(playerChoice) && Choices.scissors.has(opponentChoice)) ||
    (Choices.paper.has(playerChoice) && Choices.rock.has(opponentChoice)) ||
    (Choices.scissors.has(playerChoice) && Choices.paper.has(opponentChoice));

  if (draw) {
    roundScore += 3;
  }

  if (win) {
    roundScore += 6;
  }

  if (Choices.rock.has(playerChoice)) {
    roundScore += 1;
  } else if (Choices.paper.has(playerChoice)) {
    roundScore += 2;
  } else if (Choices.scissors.has(playerChoice)) {
    roundScore += 3;
  }

  return roundScore;
};

module.exports = {
  calculatePlayerRoundScore,
};
