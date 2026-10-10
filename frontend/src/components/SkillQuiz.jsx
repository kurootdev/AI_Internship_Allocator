import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizData } from '../data/quizData';

const SkillQuiz = ({ skill, onClose, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFinished, setIsFinished] = useState(false);
  
  // --- NEW TIMER STATE (global 60s for entire quiz) ---
  const [timer, setTimer] = useState(60);
  const timerRef = useRef(null);
  const isSubmittedRef = useRef(false); // prevent double-submit

  useEffect(() => {
    if (skill && quizData[skill]) {
      setQuestions(quizData[skill]);
      setIsLoading(false);
    } else {
      console.error(`Quiz for skill "${skill}" not found.`);
      onClose();
    }
  }, [skill, onClose]);

  // --- TIMER LOGIC: start once when quiz loaded, one minute total for all questions ---
  useEffect(() => {
    if (!isLoading && !isFinished && timerRef.current == null) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isLoading, isFinished]);

  useEffect(() => {
    if (timer <= 0 && !isFinished) {
      // when global time runs out, finish quiz and submit current answer state
      handleFinishQuiz();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextQuestion = () => {
    // count current answer (not yet counted)
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((s) => s + 1);
    }

    // clear selection for next question
    setSelectedAnswer(null);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((idx) => idx + 1);
    } else {
      // reached end: show finished screen; don't clear timer here (cleanup effect will)
      setIsFinished(true);
    }
  };
  
  const handleFinishQuiz = () => {
    if (isSubmittedRef.current) return; // avoid duplicate submissions
    isSubmittedRef.current = true;

    // include current selected answer if not yet counted
    let finalScore = score;
    if (!isFinished) {
      // if quiz not already marked finished, include current answer
      if (selectedAnswer === questions[currentQuestionIndex]?.correctAnswer) {
        finalScore += 1;
      }
    } else {
      // if finished via "Next" -> final question, score already accounted for in handleNextQuestion
      // so no extra addition needed
    }

    // stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setIsFinished(true);

    const passingScore = 3; // same as before
    onComplete(skill, finalScore, finalScore >= passingScore);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-lg"
        >
          {/* Exit button: immediately finish and close the quiz */}
          <button
            type="button"
            onClick={() => {
              // submit current progress and close modal
              handleFinishQuiz();
              onClose();
            }}
            aria-label="Exit quiz"
            className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Quick Quiz: {skill}</h2>
          {isLoading ? (
            <p className="text-center">Loading quiz...</p>
          ) : isFinished ? (
             <div className="text-center">
                <h3 className="text-lg font-semibold">Quiz Completed!</h3>
                <p className="my-4">You scored {score} out of {questions.length}</p>
                <button
                  onClick={() => {
                    // ensure submission if user presses Close after natural finish
                    handleFinishQuiz();
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
             </div>
          ) : (
            questions.length > 0 && (
              <div>
                {/* --- TIMER DISPLAY (global) --- */}
                <div className="text-center font-bold text-lg mb-4">
                    Time Left: <span className={timer <= 10 ? 'text-red-500' : ''}>{Math.max(timer,0)}s</span>
                </div>
                <p className="font-semibold mb-4">{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}</p>
                <div className="space-y-2">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`block w-full text-left p-3 rounded-lg border transition ${
                        selectedAnswer === option
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                <div className="text-right mt-6">
                  <button
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
                  </button>
                </div>
              </div>
            )
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SkillQuiz;