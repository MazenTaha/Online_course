const Quiz = require('../model/quizModel');
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");
exports.getAllQuizzes = catchAsync(async (req,res,next) =>{
    
        const newQuiz = await Quiz.find().populate('instructorId');
        res.status(200).json({
            message:'success',
            length: newQuiz.length,
            data: newQuiz,
        }) ;

   
});


exports.createQuiz = catchAsync(async(req,res,next) =>{
    

        const newQuiz = await Quiz.create(req.body);
        res.status(200).json({
      message: "success",
      length: newQuiz.length,
      data: newQuiz,
    });
 
});

exports.getQuizById = catchAsync(async (req, res,next) => {

    const quiz = await Quiz.findOne({ _id: req.params.id });
    if (!quiz) {
      return res.status(404).json({ message: "quiz not found" });
    }
    res.status(200).json({ message: "the quiz returned", data: quiz });
 
});



exports.updateQuiz = catchAsync(async (req, res,next) => {
 
    const updateQuiz = await Quiz.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updateQuiz) {
      return res.status(404).json({ message: "Quiz not found to update" });
    }
    res.status(200).json({
      message: "Quiz updated successfully",
      data: updateQuiz,
    });
 
});

exports.deleteQuiz = catchAsync(async(req,res,next)=>{
    const QuizExists = await Quiz.findById(req.params.id);
    if(!QuizExists){
        return next(new AppError('Quiz not found',404));

    }
    await Quiz.findByIdAndDelete(req.params.id);
    req.status(204).json();

});

exports.takeQuiz = catchAsync(async(req,res,next) => {
    const quizzes = await Quiz.find({ studentId: req.user.id })
    res.status(200).json({
        message: "success",
        length: quizzes.length,
        data: quizzes,
    });
});

exports.validateQuiz = (req, res, next) => {
  const { title, timeLimit } = req.body;
  if (!title || !timeLimit) {
    return res
      .status(400)
      .json({ message: "Missing required fields: title and timeLimit" });
  }
  next();
};