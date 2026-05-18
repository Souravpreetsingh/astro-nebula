import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { ZODIAC_SIGNS } from '../data/zodiac';

const C = colors;

export default function HoroscopeCard({ sign, horoscope, period, onPress }) {
  const zodiac = ZODIAC_SIGNS.find(s => s.id === sign);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={s.card}>
        <View style={s.glowBg} />
        <View style={s.header}>
          <View style={s.symbolBox}>
            <Text style={[s.symbol, { color: zodiac?.color }]}>{zodiac?.symbol}</Text>
          </View>
          <View style={s.headerText}>
            <Text style={s.signName}>{zodiac?.name || sign}</Text>
            <Text style={s.periodLabel}>
              {period === 'today' ? 'Today' : period === 'week' ? 'This Week' : 'This Month'}
            </Text>
          </View>
          <View style={s.elementPill}>
            <Text style={[s.elementText, { color: C.elements[zodiac?.element] }]}>{zodiac?.element}</Text>
          </View>
        </View>
        <Text style={s.body} numberOfLines={3}>{horoscope}</Text>
        <View style={s.footer}>
          <Text style={s.readMore}>Read Full Forecast →</Text>
          <Text style={s.date}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: C.surfaceContainer,
    borderRadius: 32,
    padding: 24,
    marginHorizontal: 16,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    position: 'relative',
    overflow: 'hidden',
  },
  glowBg: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: C.primaryContainer + '20',
  },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, position: 'relative', zIndex: 10 },
  symbolBox: { width: 44, height: 44, borderRadius: 22, backgroundColor: C.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  symbol: { fontSize: 22 },
  headerText: { flex: 1, marginLeft: 12 },
  signName: { fontSize: 18, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  periodLabel: { fontSize: 11, color: C.onSurfaceVariant, marginTop: 2, letterSpacing: 0.5 },
  elementPill: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, backgroundColor: C.surfaceVariant, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  elementText: { fontSize: 11, fontWeight: '600' },
  body: { fontSize: 15, color: C.onSurfaceVariant, lineHeight: 22 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  readMore: { fontSize: 13, color: C.primary, fontWeight: '600' },
  date: { fontSize: 11, color: C.outline },
});
