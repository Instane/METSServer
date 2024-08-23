import Questions from "../models/Questions.js"

export const createQuestions = async (req,res,next) => {
    const newQuestions = new Questions(req.body)
    try {
        const savedQuestions = await newQuestions.save()
        res.status(200).json(savedQuestions)
    } catch (err) {
        next(err)
    }
    
}

export const getCategoryType = async (req, res, next) => {
    const category = req.query.category;

    try {
        const totalQuestions = await Questions.countDocuments({ category: category });

        if (totalQuestions > 10) {
            const questions = await Questions.aggregate([
                { $match: { category: category } },
                { $sample: { size: 10 } }
            ]);
            res.status(200).json(questions);
        } else {
            const questions = await Questions.aggregate([
                { $match: { category: category } },
                { $sample: { size: 10 } }
            ]);
            res.status(200).json(questions);
        }
    } catch (err) {
        next(err);
    }
};