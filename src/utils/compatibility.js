import { generateBirthChart } from './charts';
import { getElementCompatibility, MODALITIES } from '../data/zodiac';
import { ASPECTS } from '../data/planets';

export function calculateCompatibility(person1, person2) {
  const chart1 = generateBirthChart(
    person1.year, person1.month, person1.day,
    person1.hour || 12, person1.minute || 0
  );
  const chart2 = generateBirthChart(
    person2.year, person2.month, person2.day,
    person2.hour || 12, person2.minute || 0
  );

  const sunSign1 = chart1.sun;
  const sunSign2 = chart2.sun;
  const moonSign1 = chart1.moon;
  const moonSign2 = chart2.moon;

  const elementComp = getElementCompatibility(sunSign1.element, sunSign2.element);

  const sameModality = sunSign1.modality === sunSign2.modality ? 0.5 : 0.9;
  const sameElement = sunSign1.element === sunSign2.element ? 0.7 : 1.0;

  let synastryScore = 0;
  let aspectCount = 0;
  chart1.aspects.forEach(a1 => {
    chart2.aspects.forEach(a2 => {
      if (a1.planet1 === a2.planet1 || a1.planet2 === a2.planet2 || a1.planet1 === a2.planet2 || a1.planet2 === a2.planet1) {
        const combined = a1.aspect.strength + a2.aspect.strength;
        synastryScore += combined * (a1.aspect.angle > 90 ? 0.5 : 1);
        aspectCount++;
      }
    });
  });

  const interAspects = calculateInterAspects(chart1.planets, chart2.planets);
  interAspects.forEach(a => { synastryScore += a.strength; aspectCount += 0.5; });

  const avgAspectScore = aspectCount > 0 ? synastryScore / Math.max(aspectCount, 1) : 0.5;
  const finalScore = Math.min(100, Math.round(((elementComp * 0.35 + sameModality * 0.15 + sameElement * 0.15 + avgAspectScore * 0.35)) * 100));

  let category = 'Neutral';
  if (finalScore >= 85) category = 'Cosmic Match';
  else if (finalScore >= 70) category = 'Strong Connection';
  else if (finalScore >= 55) category = 'Good Potential';
  else if (finalScore >= 40) category = 'Challenging';
  else category = 'Intense Dynamic';

  const strengths = [];
  const challenges = [];
  if (elementComp >= 0.8) strengths.push('Natural element harmony');
  else challenges.push('Contrasting elements need understanding');

  if (sameModality >= 0.9) challenges.push('Same modality - may lack dynamic tension');
  else strengths.push('Complementary modalities create balance');

  interAspects.forEach(a => {
    if (a.type === 'Trine' || a.type === 'Sextile' || a.type === 'Conjunction') strengths.push(a.description);
    else challenges.push(a.description);
  });

  return {
    score: finalScore,
    category,
    strengths: strengths.slice(0, 3),
    challenges: challenges.slice(0, 3),
    sun1: sunSign1,
    sun2: sunSign2,
    moon1: moonSign1,
    moon2: moonSign2,
    chart1,
    chart2,
    insights: generateInsights(finalScore, sunSign1, sunSign2, strengths, challenges),
  };
}

function calculateInterAspects(planets1, planets2) {
  const aspects = [];
  const majorPlanets = ['Sun', 'Moon', 'Venus', 'Mars', 'Jupiter', 'Saturn'];

  majorPlanets.forEach(p1 => {
    majorPlanets.forEach(p2 => {
      if (p1 === p2) return;
      if (!planets1[p1] || !planets2[p2]) return;

      let diff = Math.abs(planets1[p1].longitude - planets2[p2].longitude);
      if (diff > 180) diff = 360 - diff;

      const asp = Object.values(ASPECTS).find(a => Math.abs(diff - a.angle) <= a.orb);
      if (asp) {
        const strength = asp.strength * (p1 === 'Venus' || p2 === 'Venus' ? 1.3 : p1 === 'Saturn' || p2 === 'Saturn' ? 1.1 : 1);
        aspects.push({
          planet1: p1,
          planet2: p2,
          type: Object.keys(ASPECTS).find(k => ASPECTS[k] === asp),
          strength,
          description: `${p1} ${asp.symbol} ${p2}: ${asp.meaning}`,
        });
      }
    });
  });

  return aspects.sort((a, b) => b.strength - a.strength).slice(0, 6);
}

function generateInsights(score, s1, s2, strengths, challenges) {
  const base = `The cosmic connection between ${s1.name} (${s1.symbol}) and ${s2.name} (${s2.symbol}) creates a ${score >= 70 ? 'powerful' : score >= 50 ? 'interesting' : 'complex'} dynamic. `;
  const elementInsight = `As ${s1.element} and ${s2.element} signs, ${ELEMENT_DYNAMICS[s1.element]?.[s2.element] || 'there is a unique energetic exchange between you.'} `;
  const strengthLine = strengths.length > 0 ? `Key strengths: ${strengths.join(', ')}. ` : '';
  const challengeLine = challenges.length > 0 ? `Areas for growth: ${challenges.join(', ')}.` : '';
  return base + elementInsight + strengthLine + challengeLine;
}

const ELEMENT_DYNAMICS = {
  Fire: {
    Fire: 'your shared fire creates an exciting, passionate bond that can burn bright but needs space.',
    Earth: 'fire meets earth — your passion is grounded by stability, creating lasting warmth.',
    Air: 'fire and air fuel each other — an inspiring, dynamic partnership of ideas and action.',
    Water: 'fire and water create steam — intense chemistry that requires careful navigation.',
  },
  Earth: {
    Fire: 'earth meets fire — your stability grounds their passion beautifully.',
    Earth: 'your shared earth connection creates a rock-solid foundation of trust and reliability.',
    Air: 'earth and air — practical meets intellectual, building dreams on solid ground.',
    Water: 'earth and water nurture each other — a fertile ground for deep, lasting love.',
  },
  Air: {
    Fire: 'air fuels fire — an electrifying connection of ideas and action.',
    Earth: 'air and earth — intellectual heights meet practical foundations.',
    Air: 'your shared air element creates endless conversations and mental stimulation.',
    Water: 'air and water — emotions meet intellect, creating depth through understanding.',
  },
  Water: {
    Fire: 'water and fire — deep emotions meet passionate action in a dance of opposites.',
    Earth: 'water nurtures earth as earth contains water — a deeply supportive bond.',
    Air: 'water and air — emotional depth meets intellectual clarity for profound understanding.',
    Water: 'your shared water connection creates an ocean of emotional depth and intuition.',
  },
};
