
const addScore = async (req, res) => {
    //take user id, game, and score and add to the results table.
    const {game_id} = req.params;
    const {score} = req.body;
    req.app.get('db').game.add_new_score([game_id, req.session.user.id, score])
    .then(_ => {
        return res.sendStatus(201);
    }).catch(err => {
        console.log(err);
        return res.sendStatus(500);
    });
}

const getScores = async (req, res) => {
    //send back scores based off of user id. Get all games from user, categorize them by what the game trains and send the total results back
    //find score from the previous week and see how it has changed recently.git pu
    const results = await req.app.get('db').game.get_scores([req.session.user.id]);
    let final = [];
    const categories = [...new Set(results.map(el => el.category))];
    for(let i = 0;i<categories.length;i++)
    {
        const score = results.filter(el => el.category === categories[i]).reduce((total, curr) => { total += +curr.score}, 0);
        final.push({category: categories[i], totalScore: score});
    }
    return res.status(200).send(final);
}

const getScoresDateRange = async (req, res) => {
    //find scores for a specific range of dates. Not needed currently, but may want to add in future updates.
}

const compareScores = async (req, res) => {
    //get tally of all scores to see how user stacks up.
}


module.exports = {
    addScore,
    getScores,
    compareScores,
    getScoresDateRange
}