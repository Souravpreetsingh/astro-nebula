import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line as SvgLine, Text as SvgText, G } from 'react-native-svg';
import { colors } from '../constants/colors';
import { ZODIAC_SIGNS } from '../data/zodiac';

const C = colors;
const SIZE = 320;
const CENTER = SIZE / 2;
const OUTER_R = 150;
const INNER_R = 110;
const DEG = Math.PI / 180;

export default function BirthChartWheel({ houses, planets, sun, moon, rising }) {
  const majorPlanets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];

  return (
    <View style={s.container}>
      <Svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <Circle cx={CENTER} cy={CENTER} r={OUTER_R} stroke={C.outline + '40'} strokeWidth={2} fill="none" />
        <Circle cx={CENTER} cy={CENTER} r={INNER_R} stroke={C.outline + '20'} strokeWidth={1} fill="none" strokeDasharray="4,4" />
        <Circle cx={CENTER} cy={CENTER} r={28} stroke={C.primary + '40'} strokeWidth={1} fill={C.surfaceContainer} />

        {ZODIAC_SIGNS.map((sign, i) => {
          const startAngle = i * 30 - 90;
          const endAngle = (i + 1) * 30 - 90;
          const midAngle = (startAngle + endAngle) / 2;
          const midRad = midAngle * DEG;
          const labelR = OUTER_R + 14;
          const labelX = CENTER + labelR * Math.cos(midRad);
          const labelY = CENTER + labelR * Math.sin(midRad);
          const innerStart = { x: CENTER + INNER_R * Math.cos(startAngle * DEG), y: CENTER + INNER_R * Math.sin(startAngle * DEG) };
          const outerStart = { x: CENTER + OUTER_R * Math.cos(startAngle * DEG), y: CENTER + OUTER_R * Math.sin(startAngle * DEG) };
          return (
            <G key={sign.id}>
              <SvgLine x1={innerStart.x} y1={innerStart.y} x2={outerStart.x} y2={outerStart.y} stroke={C.outline + '20'} strokeWidth={1} />
              <SvgText x={labelX} y={labelY} fill={sign.color} fontSize="11" textAnchor="middle" fontWeight="600">{sign.symbol}</SvgText>
            </G>
          );
        })}

        {houses?.map((house, i) => {
          const angle = (house.number - 1) * 30 - 90 + 15;
          const rad = angle * DEG;
          const r = INNER_R - 16;
          const x = CENTER + r * Math.cos(rad);
          const y = CENTER + r * Math.sin(rad);
          return (
            <SvgText key={house.number} x={x} y={y} fill={C.houses[i]} fontSize="8" textAnchor="middle" fontWeight="700">
              {house.number}
            </SvgText>
          );
        })}

        {planets && majorPlanets.map(pId => {
          const p = planets[pId];
          if (!p) return null;
          const angle = p.longitude - 90;
          const rad = angle * DEG;
          const r = (OUTER_R + INNER_R) / 2 + (pId === 'Sun' ? 8 : pId === 'Moon' ? -8 : 0);
          const x = CENTER + r * Math.cos(rad);
          const y = CENTER + r * Math.sin(rad);
          const fs = pId === 'Sun' || pId === 'Moon' ? 18 : 14;
          return (
            <G key={pId}>
              <Circle cx={x} cy={y} r={fs / 2 + 3} fill={p.color + '25'} />
              <SvgText x={x} y={y + 4} fill={p.color} fontSize={fs} textAnchor="middle" fontWeight="bold">
                {p.symbol}
              </SvgText>
            </G>
          );
        })}

        {rising && (
          <G>
            <SvgText x={CENTER + OUTER_R + 10} y={CENTER - 4} fill={C.secondary} fontSize="12" fontWeight="bold">
              ASC
            </SvgText>
            <SvgLine x1={CENTER} y1={CENTER - 28} x2={CENTER} y2={CENTER - INNER_R} stroke={C.secondary} strokeWidth={2} strokeDasharray="4,3" />
          </G>
        )}
      </Svg>

      {sun && moon && rising && (
        <View style={s.summary}>
          <Badge label="☉ Sun" value={sun.symbol + ' ' + sun.name} color={C.primaryFixed} />
          <Badge label="☽ Moon" value={moon.symbol + ' ' + moon.name} color={C.secondary} />
          <Badge label="↑ Rising" value={rising.symbol + ' ' + rising.name} color={C.primary} />
        </View>
      )}
    </View>
  );
}

function Badge({ label, value, color }) {
  return (
    <View style={bStyles.badge}>
      <Text style={[bStyles.label, { color }]}>{label}</Text>
      <Text style={[bStyles.value, { color }]}>{value}</Text>
    </View>
  );
}

const bStyles = StyleSheet.create({
  badge: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: C.surfaceContainer, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginHorizontal: 4 },
  label: { fontSize: 9, fontWeight: '600', opacity: 0.8 },
  value: { fontSize: 13, fontWeight: '700', marginTop: 2 },
});

const s = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 16 },
  summary: { flexDirection: 'row', justifyContent: 'center', marginTop: 16, paddingHorizontal: 8 },
});
