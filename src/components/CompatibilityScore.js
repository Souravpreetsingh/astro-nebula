import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { colors } from '../constants/colors';

const C = colors;

export default function CompatibilityScore({ score, category }) {
  const getColors = () => {
    if (score >= 85) return ['#22c55e', '#16a34a'];
    if (score >= 70) return ['#d1bcff', '#7000ff'];
    if (score >= 55) return ['#f6e600', '#d7ca00'];
    if (score >= 40) return ['#f97316', '#ea580c'];
    return ['#ffb4ab', '#93000a'];
  };
  const [c1, c2] = getColors();
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;

  return (
    <View style={s.container}>
      <View style={s.ringWrap}>
        <Svg width="130" height="130" viewBox="0 0 130 130">
          <Defs>
            <SvgLinearGradient id={`sg-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor={c1} stopOpacity="1" />
              <Stop offset="100%" stopColor={c2} stopOpacity="1" />
            </SvgLinearGradient>
          </Defs>
          <Circle cx="65" cy="65" r="54" stroke={C.surfaceContainerHighest} strokeWidth="8" fill="none" />
          <Circle cx="65" cy="65" r="54" stroke={`url(#sg-${score})`} strokeWidth="8" fill="none" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90, 65, 65)" />
        </Svg>
        <View style={s.scoreOverlay}>
          <Text style={[s.scoreValue, { color: c1 }]}>{score}</Text>
          <Text style={s.percent}>%</Text>
        </View>
      </View>
      <View style={[s.badge, { backgroundColor: c1 + '20', borderColor: c1 + '40' }]}>
        <Text style={[s.badgeText, { color: c1 }]}>{category}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 24 },
  ringWrap: { width: 130, height: 130, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  scoreOverlay: { position: 'absolute', alignItems: 'center', flexDirection: 'row' },
  scoreValue: { fontSize: 36, fontWeight: '800', fontFamily: 'Bricolage Grotesque' },
  percent: { fontSize: 14, color: C.onSurfaceVariant, marginTop: 6 },
  badge: { paddingHorizontal: 24, paddingVertical: 8, borderRadius: 9999, borderWidth: 1 },
  badgeText: { fontSize: 14, fontWeight: '700' },
});
