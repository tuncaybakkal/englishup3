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

function getRandomSentenceExcluding(list: Sentence[], excludeIds: Set<number>): Sentence {
  const available = list.filter(s => !excludeIds.has(s.id));
  if (available.length === 0) return list[Math.floor(Math.random() * list.length)];
  return available[Math.floor(Math.random() * available.length)];
}

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [recentIds, setRecentIds] = useState<number[]>([]);
  const [current, setCurrent] = useState<Sentence>(() => {
    const randomSentence = sentences[Math.floor(Math.random() * sentences.length)];
    setRecentIds([randomSentence.id]);
    return randomSentence;
  });
  const [userAnswer, setUserAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const filteredSentences = filter === 'all'
    ? sentences
    : sentences.filter(s => s.difficulty === filter);

  const handleRefresh = useCallback(() => {
    const excludeSet = new Set(recentIds.slice(-10));
    const newSentence = getRandomSentenceExcluding(filteredSentences, excludeSet);
    setCurrent(newSentence);
    setRecentIds(prev => [...prev, newSentence.id].slice(-10));
    setUserAnswer('');
    setChecked(false);
    setResult(null);
  }, [filteredSentences, recentIds]);

  const handleDifficultyChange = (d: Filter) => {
    setFilter(d);
    const pool = d === 'all' ? sentences : sentences.filter(s => s.difficulty === d);
    const excludeSet = new Set(recentIds.slice(-10));
    const newSentence = getRandomSentenceExcluding(pool, excludeSet);
    setCurrent(newSentence);
    setRecentIds(prev => [...prev, newSentence.id].slice(-10));
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
