import { useState, useCallback } from 'react';
import type { Sentence, Difficulty } from './data/sentences';
import { sentences } from './data/sentences';
import type { ComparisonResult } from './utils/compareAnswers';
import { compareAnswers } from './utils/compareAnswers';
import SentenceCard from './components/SentenceCard';
import AnswerInput from './components/AnswerInput';
import FeedbackPanel from './components/FeedbackPanel';
import DifficultyFilter from './components/DifficultyFilter';

type Filter = Difficulty | 'all';

function getRandomSentence(list: Sentence[]): Sentence {
  return list[Math.floor(Math.random() * list.length)];
}

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [current, setCurrent] = useState<Sentence>(() =>
    getRandomSentence(sentences)
  );
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const filteredSentences = filter === 'all'
    ? sentences
    : sentences.filter(s => s.difficulty === filter);

  const handleRefresh = useCallback(() => {
    setCurrent(getRandomSentence(filteredSentences));
    setUserAnswer('');
    setChecked(false);
    setResult(null);
  }, [filteredSentences]);

  const handleDifficultyChange = (d: Filter) => {
    setFilter(d);
    const pool = d === 'all' ? sentences : sentences.filter(s => s.difficulty === d);
    setCurrent(getRandomSentence(pool));
    setUserAnswer('');
    setChecked(false);
    setResult(null);
  };

  const handleCheck = () => {
    const r = compareAnswers(userAnswer, current.english);
    setResult(r);
    setChecked(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Türkçe → İngilizce Çeviri Pratiği
      </h1>
      <p className="text-gray-500 mb-6 text-sm">Cümleyi İngilizceye çevirin</p>

      <DifficultyFilter selected={filter} onChange={handleDifficultyChange} />
      <SentenceCard sentence={current} onRefresh={handleRefresh} />
      <AnswerInput
        value={userAnswer}
        onChange={setUserAnswer}
        onCheck={handleCheck}
        disabled={checked}
      />
      {checked && result && (
        <FeedbackPanel result={result} correctAnswer={current.english} />
      )}
    </div>
  );
}
