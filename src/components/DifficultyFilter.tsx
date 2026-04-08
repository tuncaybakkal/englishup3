import type { Difficulty } from '../data/sentences';

type Filter = Difficulty | 'all';

interface Props {
  selected: Filter;
  onChange: (d: Filter) => void;
}

const options: { label: string; value: Filter }[] = [
  { label: 'Tümü', value: 'all' },
  { label: 'Basit', value: 'basit' },
  { label: 'Orta', value: 'orta' },
  { label: 'Zor', value: 'zor' },
];

const activeClass = 'bg-blue-600 text-white';
const inactiveClass = 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100';

export default function DifficultyFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-6">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selected === opt.value ? activeClass : inactiveClass
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
