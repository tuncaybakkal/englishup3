export interface WordResult {
  word: string;
  correct: boolean;
}

export interface ComparisonResult {
  userWords: WordResult[];
  missedWords: string[];
  score: number;
  total: number;
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(' ').filter(Boolean);
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }

  return dp[m][n];
}

function isMatch(userWord: string, correctWord: string): boolean {
  const dist = levenshtein(userWord, correctWord);
  const len = Math.max(userWord.length, correctWord.length);

  if (len <= 3) return dist === 0;
  if (len <= 6) return dist <= 1;
  return dist <= 2;
}

export function compareAnswers(
  userAnswer: string,
  correctAnswer: string
): ComparisonResult {
  const userWords = tokenize(userAnswer);
  const correctWords = tokenize(correctAnswer);

  const usedCorrectIndices = new Set<number>();

  const annotated: WordResult[] = userWords.map((uWord) => {
    for (let ci = 0; ci < correctWords.length; ci++) {
      if (!usedCorrectIndices.has(ci) && isMatch(uWord, correctWords[ci])) {
        usedCorrectIndices.add(ci);
        return { word: uWord, correct: true };
      }
    }
    return { word: uWord, correct: false };
  });

  const missedWords = correctWords.filter((_, i) => !usedCorrectIndices.has(i));

  return {
    userWords: annotated,
    missedWords,
    score: usedCorrectIndices.size,
    total: correctWords.length,
  };
}
