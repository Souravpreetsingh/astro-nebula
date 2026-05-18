import { PLANETS, ASPECTS, HOUSES } from '../data/planets';
import { ZODIAC_SIGNS, getZodiacByDate } from '../data/zodiac';

import {
  MakeTime, GeoVector, GeoMoon, Ecliptic, Body, EclipticLongitude,
} from 'astronomy-engine';

const AE_BODIES = {
  Sun: Body.Sun, Moon: Body.Moon, Mercury: Body.Mercury, Venus: Body.Venus,
  Mars: Body.Mars, Jupiter: Body.Jupiter, Saturn: Body.Saturn,
  Uranus: Body.Uranus, Neptune: Body.Neptune, Pluto: Body.Pluto,
  NorthNode: Body.NorthNode,
};

function getGeocentricEclipticLongitude(bodyId, time) {
  if (bodyId === 'Moon') {
    const pos = GeoMoon(time);
    return Ecliptic(pos).elon;
  }
  const aeId = bodyId === 'NorthNode' ? Body.NorthNode : AE_BODIES[bodyId];
  if (!aeId) return 0;
  try {
    const vec = GeoVector(aeId, time, true);
    return Ecliptic(vec).elon;
  } catch {
    return 0;
  }
}

function getZodiacFromLongitude(longitude) {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const degree = normalized % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: Math.floor(degree),
    minute: Math.floor((degree % 1) * 60),
  };
}

function calculateHouses(jd, latitude, lon) {
  const lst = (280.46 + 0.9856474 * (jd - 2451545.0) + lon) % 360;
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const houseLong = (lst + i * 30) % 360;
    const si = Math.floor(houseLong / 30);
    houses.push({
      number: i + 1,
      name: HOUSES[i].name,
      meaning: HOUSES[i].meaning,
      longitude: houseLong,
      sign: ZODIAC_SIGNS[si],
    });
  }
  return houses;
}

function calculateAspects(planetPositions) {
  const aspects = [];
  const bodies = Object.entries(planetPositions);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = i + 1; j < bodies.length; j++) {
      const [name1, pos1] = bodies[i];
      const [name2, pos2] = bodies[j];
      let diff = Math.abs(pos1.longitude - pos2.longitude);
      if (diff > 180) diff = 360 - diff;

      const asp = Object.values(ASPECTS).find(a => Math.abs(diff - a.angle) <= a.orb);
      if (asp) {
        aspects.push({
          planet1: name1,
          planet2: name2,
          type: Object.keys(ASPECTS).find(k => ASPECTS[k] === asp),
          aspect: asp,
          angle: diff,
          exact: Math.abs(diff - asp.angle),
        });
      }
    }
  }

  aspects.sort((a, b) => a.exact - b.exact);
  return aspects;
}

export function generateBirthChart(year, month, day, hour, minute, latitude = 40.7, longitude = -74.0) {
  const time = MakeTime(new Date(year, month - 1, day, hour, minute, 0));
  const jd = time.tt;

  const planetPositions = {};
  PLANETS.forEach(planet => {
    const rawLong = getGeocentricEclipticLongitude(planet.id, time);
    const adjustedLong = ((rawLong + longitude) % 360 + 360) % 360;
    const { sign, degree, minute: degMinute } = getZodiacFromLongitude(adjustedLong);
    planetPositions[planet.id] = {
      name: planet.name,
      symbol: planet.symbol,
      color: planet.color,
      meaning: planet.meaning,
      longitude: adjustedLong,
      sign,
      degree,
      minute: degMinute,
      house: Math.floor(adjustedLong / 30) + 1,
      dignity: planet.dignity,
    };
  });

  const houses = calculateHouses(jd, latitude, longitude);

  planetPositions.Sun.sign = getZodiacByDate(month, day);
  const sunLong = getGeocentricEclipticLongitude('Sun', time);
  const sunZodiac = getZodiacFromLongitude(((sunLong + longitude) % 360 + 360) % 360);
  planetPositions.Sun.sign = sunZodiac.sign;
  planetPositions.Sun.degree = sunZodiac.degree;

  const aspects = calculateAspects(planetPositions);

  const risingIndex = Math.floor(houses[0].longitude / 30);
  const risingSign = ZODIAC_SIGNS[risingIndex];

  const sunSignData = planetPositions.Sun.sign;
  const moonSignData = planetPositions.Moon.sign;
  const risingSignData = risingSign;

  const elementDistribution = { Fire: 0, Earth: 0, Air: 0, Water: 0 };
  const modalityDistribution = { Cardinal: 0, Fixed: 0, Mutable: 0 };
  Object.values(planetPositions).forEach(p => {
    if (p.sign && p.sign.element) {
      elementDistribution[p.sign.element] = (elementDistribution[p.sign.element] || 0) + 1;
      modalityDistribution[p.sign.modality] = (modalityDistribution[p.sign.modality] || 0) + 1;
    }
  });

  const dominantElement = Object.entries(elementDistribution).sort((a, b) => b[1] - a[1])[0][0];
  const dominantModality = Object.entries(modalityDistribution).sort((a, b) => b[1] - a[1])[0][0];

  return {
    date: `${month}/${day}/${year}`,
    time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    location: { latitude, longitude },
    planets: planetPositions,
    houses,
    aspects,
    rising: risingSignData,
    sun: sunSignData,
    moon: moonSignData,
    dominantElement,
    dominantModality,
    elementDistribution,
    modalityDistribution,
  };
}

export function analyzePlanetInSign(planet, sign) {
  const isRuled = planet.rulerships.includes(sign.id);
  const isExalted =
    (planet.id === 'Sun' && sign.id === 'aries') ||
    (planet.id === 'Moon' && sign.id === 'taurus') ||
    (planet.id === 'Mars' && sign.id === 'capricorn');

  let strength = 'neutral';
  if (isRuled) strength = 'dignified';
  if (isExalted) strength = 'exalted';
  if (planet.id === 'Saturn' && sign.id === 'aries') strength = 'detriment';
  if (planet.id === 'Mars' && sign.id === 'libra') strength = 'detriment';

  return { isRuled, isExalted, strength };
}
