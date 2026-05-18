export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    element: 'Fire',
    modality: 'Cardinal',
    ruler: 'Mars',
    dateRange: 'Mar 21 - Apr 19',
    house: 1,
    keywords: ['courage', 'initiative', 'impulse', 'leadership'],
    traits: { positive: ['Brave', 'Confident', 'Determined'], negative: ['Impulsive', 'Aggressive', 'Impatient'] },
    color: '#ef4444',
    quality: 'masculine',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    element: 'Earth',
    modality: 'Fixed',
    ruler: 'Venus',
    dateRange: 'Apr 20 - May 20',
    house: 2,
    keywords: ['stability', 'sensuality', 'endurance', 'practicality'],
    traits: { positive: ['Patient', 'Reliable', 'Devoted'], negative: ['Stubborn', 'Possessive', 'Complacent'] },
    color: '#22c55e',
    quality: 'feminine',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    element: 'Air',
    modality: 'Mutable',
    ruler: 'Mercury',
    dateRange: 'May 21 - Jun 20',
    house: 3,
    keywords: ['communication', 'curiosity', 'adaptability', 'duality'],
    traits: { positive: ['Versatile', 'Witty', 'Curious'], negative: ['Inconsistent', 'Superficial', 'Anxious'] },
    color: '#f59e0b',
    quality: 'masculine',
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    element: 'Water',
    modality: 'Cardinal',
    ruler: 'Moon',
    dateRange: 'Jun 21 - Jul 22',
    house: 4,
    keywords: ['nurturing', 'emotion', 'intuition', 'protection'],
    traits: { positive: ['Intuitive', 'Nurturing', 'Emotional'], negative: ['Moody', 'Clingy', 'Oversensitive'] },
    color: '#06b6d4',
    quality: 'feminine',
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    element: 'Fire',
    modality: 'Fixed',
    ruler: 'Sun',
    dateRange: 'Jul 23 - Aug 22',
    house: 5,
    keywords: ['creativity', 'drama', 'generosity', 'leadership'],
    traits: { positive: ['Generous', 'Creative', 'Passionate'], negative: ['Arrogant', 'Dramatic', 'Stubborn'] },
    color: '#f97316',
    quality: 'masculine',
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    element: 'Earth',
    modality: 'Mutable',
    ruler: 'Mercury',
    dateRange: 'Aug 23 - Sep 22',
    house: 6,
    keywords: ['analysis', 'service', 'perfection', 'health'],
    traits: { positive: ['Analytical', 'Practical', 'Diligent'], negative: ['Critical', 'Worrier', 'Perfectionist'] },
    color: '#8b5cf6',
    quality: 'feminine',
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    element: 'Air',
    modality: 'Cardinal',
    ruler: 'Venus',
    dateRange: 'Sep 23 - Oct 22',
    house: 7,
    keywords: ['balance', 'harmony', 'justice', 'partnership'],
    traits: { positive: ['Diplomatic', 'Charming', 'Fair'], negative: ['Indecisive', 'People-pleaser', 'Avoidant'] },
    color: '#ec4899',
    quality: 'masculine',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    element: 'Water',
    modality: 'Fixed',
    ruler: 'Pluto',
    dateRange: 'Oct 23 - Nov 21',
    house: 8,
    keywords: ['transformation', 'intensity', 'mystery', 'power'],
    traits: { positive: ['Passionate', 'Resourceful', 'Brave'], negative: ['Jealous', 'Secretive', 'Vindictive'] },
    color: '#dc2626',
    quality: 'feminine',
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    element: 'Fire',
    modality: 'Mutable',
    ruler: 'Jupiter',
    dateRange: 'Nov 22 - Dec 21',
    house: 9,
    keywords: ['adventure', 'philosophy', 'optimism', 'freedom'],
    traits: { positive: ['Optimistic', 'Adventurous', 'Honest'], negative: ['Reckless', 'Blunt', 'Commitment-phobe'] },
    color: '#6366f1',
    quality: 'masculine',
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    element: 'Earth',
    modality: 'Cardinal',
    ruler: 'Saturn',
    dateRange: 'Dec 22 - Jan 19',
    house: 10,
    keywords: ['ambition', 'discipline', 'responsibility', 'structure'],
    traits: { positive: ['Ambitious', 'Disciplined', 'Patient'], negative: ['Pessimistic', 'Rigid', 'Workaholic'] },
    color: '#14b8a6',
    quality: 'feminine',
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    element: 'Air',
    modality: 'Fixed',
    ruler: 'Uranus',
    dateRange: 'Jan 20 - Feb 18',
    house: 11,
    keywords: ['innovation', 'humanity', 'rebellion', 'originality'],
    traits: { positive: ['Innovative', 'Independent', 'Humanitarian'], negative: ['Detached', 'Unpredictable', 'Rebellious'] },
    color: '#3b82f6',
    quality: 'masculine',
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    element: 'Water',
    modality: 'Mutable',
    ruler: 'Neptune',
    dateRange: 'Feb 19 - Mar 20',
    house: 12,
    keywords: ['dreams', 'intuition', 'compassion', 'transcendence'],
    traits: { positive: ['Compassionate', 'Artistic', 'Intuitive'], negative: ['Escapist', 'Overly trusting', 'Victim mentality'] },
    color: '#a855f7',
    quality: 'feminine',
  },
];

export const ELEMENTS = {
  Fire: { signs: ['aries', 'leo', 'sagittarius'], color: '#ef4444', description: 'Passionate, energetic, and dynamic' },
  Earth: { signs: ['taurus', 'virgo', 'capricorn'], color: '#22c55e', description: 'Practical, grounded, and stable' },
  Air: { signs: ['gemini', 'libra', 'aquarius'], color: '#f59e0b', description: 'Intellectual, communicative, and social' },
  Water: { signs: ['cancer', 'scorpio', 'pisces'], color: '#3b82f6', description: 'Emotional, intuitive, and deep' },
};

export const MODALITIES = {
  Cardinal: { signs: ['aries', 'cancer', 'libra', 'capricorn'], description: 'Initiators who start things' },
  Fixed: { signs: ['taurus', 'leo', 'scorpio', 'aquarius'], description: 'Stabilizers who maintain things' },
  Mutable: { signs: ['gemini', 'virgo', 'sagittarius', 'pisces'], description: 'Adaptors who change things' },
};

export function getZodiacByDate(month, day) {
  const dates = [
    { sign: 'capricorn', month: 1, day: 19 },
    { sign: 'aquarius', month: 2, day: 18 },
    { sign: 'pisces', month: 3, day: 20 },
    { sign: 'aries', month: 4, day: 19 },
    { sign: 'taurus', month: 5, day: 20 },
    { sign: 'gemini', month: 6, day: 20 },
    { sign: 'cancer', month: 7, day: 22 },
    { sign: 'leo', month: 8, day: 22 },
    { sign: 'virgo', month: 9, day: 22 },
    { sign: 'libra', month: 10, day: 22 },
    { sign: 'scorpio', month: 11, day: 21 },
    { sign: 'sagittarius', month: 12, day: 21 },
    { sign: 'capricorn', month: 12, day: 31 },
  ];

  for (const entry of dates) {
    if ((month < entry.month) || (month === entry.month && day <= entry.day)) {
      return ZODIAC_SIGNS.find(s => s.id === entry.sign);
    }
  }
  return ZODIAC_SIGNS[0];
}

export function getZodiacById(id) {
  return ZODIAC_SIGNS.find(s => s.id === id);
}

export function getElementCompatibility(el1, el2) {
  if (el1 === el2) return 0.8;
  if (
    (el1 === 'Fire' && el2 === 'Air') ||
    (el1 === 'Air' && el2 === 'Fire') ||
    (el1 === 'Earth' && el2 === 'Water') ||
    (el1 === 'Water' && el2 === 'Earth')
  ) return 0.9;
  if (
    (el1 === 'Fire' && el2 === 'Water') ||
    (el1 === 'Water' && el2 === 'Fire') ||
    (el1 === 'Air' && el2 === 'Earth') ||
    (el1 === 'Earth' && el2 === 'Air')
  ) return 0.4;
  return 0.6;
}
