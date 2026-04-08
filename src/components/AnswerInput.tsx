interface Props {
  value: string;
  onChange: (v: string) => void;
  onCheck: () => void;
  disabled: boolean;
}

export default function AnswerInput({ value, onChange, onCheck, disabled }: Props) {
  return (
    <div className="w-full max-w-2xl mb-4">
      <textarea
        className="w-full border border-gray-300 rounded-xl p-4 text-gray-700 text-base
                   focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none
                   disabled:bg-gray-100 disabled:cursor-not-allowed"
        rows={4}
        placeholder="İngilizce çevirinizi buraya yazın..."
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
      />
      <button
        onClick={onCheck}
        disabled={disabled || value.trim().length === 0}
        className="mt-2 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold
                   hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed
                   transition-colors"
      >
        Kontrol Et
      </button>
    </div>
  );
}
