import type { Sentence } from '../data/sentences';

interface Props {
  sentence: Sentence;
  onRefresh: () => void;
}

const difficultyConfig = {
  basit: { label: 'Basit', className: 'bg-green-100 text-green-700' },
  orta: { label: 'Orta', className: 'bg-yellow-100 text-yellow-700' },
  zor: { label: 'Zor', className: 'bg-red-100 text-red-700' },
};

export default function SentenceCard({ sentence, onRefresh }: Props) {
  const badge = difficultyConfig[sentence.difficulty];
  return (
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
        <button
          onClick={onRefresh}
          className="text-sm text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          <span>&#8635;</span> Yenile
        </button>
      </div>
      <p className="text-xl font-semibold text-gray-800 leading-relaxed">
        {sentence.turkish}
      </p>
    </div>
  );
}
