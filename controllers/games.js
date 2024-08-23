import Games from "../models/Games.js";
import User from "../models/User.js";

export const createGame = async (req,res,next) => {
    const newGame = new Games(req.body)

    try {
        const savedGame = await newGame.save()
        res.status(200).json(savedGame)
    } catch (err) {
        next(err)
    }
    
}

export const getByPlayer = async (req, res, next) => {
    const { player } = req.params;
  
    try {
      const topGames = await Games.aggregate([
        { $match: { player } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 }
      ]);
  
      if (!topGames || topGames.length === 0) {
        return res.status(404).json({ message: 'No games found for this player' });
      }
  
      res.status(200).json(topGames);
    } catch (err) {
      next(err);
    }
  };

  export const getAmount = async (req, res, next) => {
    const { player } = req.params;

    try {
        const gameCount = await Games.countDocuments({ player });

        const user = await User.findOneAndUpdate(
            { username: player },
            { total_games: gameCount },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({gameCount});
    } catch (err) {
        next(err);
    }
};

export const getHighestScore = async (req, res, next) => {
    const { player } = req.params;

    try {
        const highestScoreGame = await Games.findOne({ player }).sort({ score: -1 });

        if (!highestScoreGame) {
            return res.status(404).json({ message: "No games found for this player" });
        }

        const highestScore = highestScoreGame.score;

        res.status(200).json({highestScore});
    } catch (err) { 
        next(err);
    }
};

export const getMostPlayedCategory = async (req, res, next) => {
    const { player } = req.params;

    try {
        const mostPlayedCategory = await Games.aggregate([
            { $match: { player } },
            { $group: {
                _id: "$category",
                totalGames: { $sum: 1 } 
            }},
            { $sort: { totalGames: -1 } },
            { $limit: 1 }
        ]);

        if (mostPlayedCategory.length === 0) {
            return res.status(404).json({ message: "No games found for this player" });
        }

        res.status(200).json({ player, mostPlayedCategory: mostPlayedCategory[0]._id, totalGames: mostPlayedCategory[0].totalGames });
    } catch (err) {
        next(err);
    }
};

export const getHighestScoreCategory = async (req, res, next) => {
    try {
        const { category } = req.params;

        const topPlayers = await Games.aggregate([
            {
                $match: { category }
            },
            {
                $sort: { score: -1, createdAt: -1 }
            },
            {
                $limit: 5
            },
            {
                $group: {
                    _id: "$category",
                    topPlayers: {
                        $push: { player: "$player", score: "$score" }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    category: "$_id",
                    topPlayers: 1
                }
            }
        ]);

        res.status(200).json(topPlayers);
    } catch (err) {
        next(err);
    }
};


