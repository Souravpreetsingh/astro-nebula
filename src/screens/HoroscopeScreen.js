import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { getHoroscope } from '../utils/aiChat';

const C = colors;

export default function HoroscopeScreen({ route, navigation }) {
  const { sign: initialSign } = route.params;
  const [selectedSign, setSelectedSign] = useState(initialSign);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const zodiac = ZODIAC_SIGNS.find(s => s.id === selectedSign);
  const horoscope = getHoroscope(selectedSign, selectedPeriod);

  const periods = [
    { key: 'today', label: 'Today' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
  ];

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}><Text style={s.backText}>✦</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Nebula</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.signHero}>
          <View style={[s.symbolCircle, { borderColor: zodiac?.color + '40' }]}>
            <Text style={[s.symbol, { color: zodiac?.color }]}>{zodiac?.symbol}</Text>
          </View>
          <Text style={s.signName}>{zodiac?.name}</Text>
          <Text style={s.dateRange}>{zodiac?.dateRange}</Text>
          <View style={s.quickInfoRow}>
            <QuickInfo label="Element" value={zodiac?.element} color={C.elements[zodiac?.element]} />
            <QuickInfo label="Modality" value={zodiac?.modality} color={C.primary} />
            <QuickInfo label="Ruler" value={zodiac?.ruler} color={C.tertiaryFixed} />
          </View>
        </View>

        <View style={s.periodRow}>
          {periods.map(p => (
            <TouchableOpacity key={p.key} style={[s.periodBtn, selectedPeriod === p.key && s.periodBtnActive]} onPress={() => setSelectedPeriod(p.key)}>
              <Text style={[s.periodText, selectedPeriod === p.key && s.periodTextActive]}>{p.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={s.horoscopeCard}>
          <Text style={s.horoscopeLabel}>
            {selectedPeriod === 'today' ? 'Today' : selectedPeriod === 'week' ? 'This Week' : 'This Month'}
          </Text>
          <Text style={s.horoscopeText}>{horoscope}</Text>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Traits</Text>
          <View style={s.traitsRow}>
            {zodiac?.traits.positive.map(t => (
              <View key={t} style={[s.traitPill, { backgroundColor: '#22c55e' + '15', borderColor: '#22c55e' + '30' }]}>
                <Text style={[s.traitText, { color: '#22c55e' }]}>+ {t}</Text>
              </View>
            ))}
            {zodiac?.traits.negative.map(t => (
              <View key={t} style={[s.traitPill, { backgroundColor: C.error + '15', borderColor: C.error + '30' }]}>
                <Text style={[s.traitText, { color: C.error }]}>- {t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={s.section}>
          <Text style={s.sectionTitle}>Keywords</Text>
          <View style={s.traitsRow}>
            {zodiac?.keywords.map(k => (
              <View key={k} style={[s.traitPill, { backgroundColor: zodiac?.color + '15', borderColor: zodiac?.color + '30' }]}>
                <Text style={[s.traitText, { color: zodiac?.color }]}>{k}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={s.actionBtn} onPress={() => navigation.navigate('BirthChart', { sign: selectedSign })}>
          <Text style={s.actionText}>Generate Full Birth Chart →</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function QuickInfo({ label, value, color }) {
  return (
    <View style={[qi.container, { borderColor: (color || C.primary) + '30' }]}>
      <Text style={[qi.label, { color: color || C.primary }]}>{label}</Text>
      <Text style={qi.value}>{value}</Text>
    </View>
  );
}

const qi = StyleSheet.create({
  container: { alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, borderWidth: 1, marginHorizontal: 4, backgroundColor: C.surfaceContainer + '50' },
  label: { fontSize: 11, fontWeight: '600' },
  value: { fontSize: 14, color: C.onSurface, fontWeight: '700', marginTop: 2 },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 20, color: C.primary },
  headerTitle: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  content: { paddingBottom: 100 },
  signHero: { alignItems: 'center', paddingVertical: 32 },
  symbolCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 2 },
  symbol: { fontSize: 44 },
  signName: { fontSize: 32, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  dateRange: { fontSize: 13, color: C.onSurfaceVariant, marginTop: 4 },
  quickInfoRow: { flexDirection: 'row', marginTop: 24, paddingHorizontal: 16 },
  periodRow: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: C.surfaceContainer, borderRadius: 9999, padding: 4, marginBottom: 16 },
  periodBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9999 },
  periodBtnActive: { backgroundColor: C.secondaryContainer },
  periodText: { fontSize: 14, color: C.onSurfaceVariant, fontWeight: '600' },
  periodTextActive: { color: C.onSecondaryContainer, fontWeight: '700' },
  horoscopeCard: { marginHorizontal: 20, padding: 24, backgroundColor: C.surfaceContainer, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 24 },
  horoscopeLabel: { fontSize: 12, color: C.primary, fontWeight: '600', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
  horoscopeText: { fontSize: 15, color: C.onSurfaceVariant, lineHeight: 24 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: C.onSurface, marginBottom: 12, fontFamily: 'Bricolage Grotesque' },
  traitsRow: { flexDirection: 'row', flexWrap: 'wrap' },
  traitPill: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 9999, borderWidth: 1, marginRight: 8, marginBottom: 8 },
  traitText: { fontSize: 13, fontWeight: '600' },
  actionBtn: { marginHorizontal: 20, paddingVertical: 16, alignItems: 'center', borderRadius: 9999, backgroundColor: C.secondaryContainer, marginBottom: 32 },
  actionText: { fontSize: 14, color: C.onSecondaryContainer, fontWeight: '600', letterSpacing: 1 },
});
