import type { ComparisonResult } from '../utils/compareAnswers';

interface Props {
  result: ComparisonResult;
  correctAnswer: string;
}

export default function FeedbackPanel({ result, correctAnswer }: Props) {
  const percentage = result.total > 0
    ? Math.round((result.score / result.total) * 100)
    : 0;

  const scoreColor =
    percentage >= 80 ? 'text-green-600' :
    percentage >= 50 ? 'text-yellow-600' :
    'text-red-600';

  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 space-y-4">

      {/* Score */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-700">Sonuç</h2>
        <span className={`text-2xl font-bold ${scoreColor}`}>
          {result.score}/{result.total} ({percentage}%)
        </span>
      </div>

      {/* User answer word-by-word */}
      <div>
        <p className="text-sm text-gray-500 mb-1 font-medium">Cevabınız:</p>
        <div className="flex flex-wrap gap-1">
          {result.userWords.map((w, i) => (
            <span
              key={i}
              className={`px-2 py-0.5 rounded text-sm font-medium ${
                w.correct
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800 line-through'
              }`}
            >
              {w.word}
            </span>
          ))}
          {result.userWords.length === 0 && (
            <span className="text-gray-400 italic text-sm">Cevap girilmedi</span>
          )}
        </div>
      </div>

      {/* Missed words */}
      {result.missedWords.length > 0 && (
        <div>
          <p className="text-sm text-gray-500 mb-1 font-medium">Eksik kelimeler:</p>
          <div className="flex flex-wrap gap-1">
            {result.missedWords.map((w, i) => (
              <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-800 rounded text-sm font-medium">
                {w}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Correct answer */}
      <div className="border-t pt-4">
        <p className="text-sm text-gray-500 mb-1 font-medium">Doğru cevap:</p>
        <p className="text-gray-800 font-medium">{correctAnswer}</p>
      </div>
    </div>
  );
}
