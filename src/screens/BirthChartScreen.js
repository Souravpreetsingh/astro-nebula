import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { colors as C } from '../constants/colors';
import { generateBirthChart } from '../utils/charts';
import { PLANETS } from '../data/planets';
import BirthChartWheel from '../components/BirthChartWheel';

export default function BirthChartScreen({ navigation }) {
  const [chart, setChart] = useState(null);
  const [form, setForm] = useState({ month: '8', day: '12', year: '1992', hour: '14', minute: '30' });
  const [tab, setTab] = useState('overview');

  const gen = () => {
    const m = parseInt(form.month), d = parseInt(form.day), y = parseInt(form.year), h = parseInt(form.hour) || 12, mi = parseInt(form.minute) || 0;
    if (!m || !d || !y || m < 1 || m > 12 || d < 1 || d > 31) return Alert.alert('Invalid Date', 'Enter a valid birth date.');
    setChart(generateBirthChart(y, m, d, h, mi));
  };

  if (!chart) {
    return (
      <View style={s.root}>
        <View style={s.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
          <Text style={s.topTitle}>Nebula</Text>
          <View style={{ width: 40 }} />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={s.formWrap}>
            <Text style={s.formTitle}>Cosmic Blueprint</Text>
            <Text style={s.formSub}>Generate your unique funky birth chart and discover the playful energies that make you a star.</Text>

            <View style={s.formCard}>
              <View style={s.formBlob} />
              <View style={s.fieldGroup}>
                <Text style={s.fieldLabel}>BIRTH DATE</Text>
                <View style={s.inputRow}>
                  <View style={s.inputWrap}>
                    <TextInput style={s.input} value={form.day} onChangeText={v => setForm(f => ({ ...f, day: v }))} placeholder="DD" placeholderTextColor={C.outline} keyboardType="numeric" maxLength={2} />
                  </View>
                  <Text style={s.sep}>/</Text>
                  <View style={s.inputWrap}>
                    <TextInput style={s.input} value={form.month} onChangeText={v => setForm(f => ({ ...f, month: v }))} placeholder="MM" placeholderTextColor={C.outline} keyboardType="numeric" maxLength={2} />
                  </View>
                  <Text style={s.sep}>/</Text>
                  <View style={[s.inputWrap, { flex: 1.5 }]}>
                    <TextInput style={s.input} value={form.year} onChangeText={v => setForm(f => ({ ...f, year: v }))} placeholder="YYYY" placeholderTextColor={C.outline} keyboardType="numeric" maxLength={4} />
                  </View>
                </View>
              </View>
              <View style={s.fieldGroup}>
                <Text style={s.fieldLabel}>BIRTH TIME</Text>
                <View style={s.inputRow}>
                  <View style={s.inputWrap}>
                    <TextInput style={s.input} value={form.hour} onChangeText={v => setForm(f => ({ ...f, hour: v }))} placeholder="HH" placeholderTextColor={C.outline} keyboardType="numeric" maxLength={2} />
                  </View>
                  <Text style={s.sep}>:</Text>
                  <View style={s.inputWrap}>
                    <TextInput style={s.input} value={form.minute} onChangeText={v => setForm(f => ({ ...f, minute: v }))} placeholder="MM" placeholderTextColor={C.outline} keyboardType="numeric" maxLength={2} />
                  </View>
                  <View style={{ flex: 1 }} />
                </View>
              </View>
              <TouchableOpacity style={s.genBtn} onPress={gen}>
                <Text style={s.genText}>✦  Generate Chart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  const major = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  return (
    <View style={s.root}>
      <View style={s.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
        <Text style={s.topTitle}>Nebula</Text>
        <TouchableOpacity onPress={() => setChart(null)}><Text style={[s.back, { opacity: .7 }]}>New</Text></TouchableOpacity>
      </View>

      <View style={s.tabRow}>
        {['overview', 'placements', 'houses', 'aspects'].map(t => (
          <TouchableOpacity key={t} style={[s.tab, tab === t && s.tabActive]} onPress={() => setTab(t)}>
            <Text style={[s.tabText, tab === t && s.tabTextActive]}>{t.charAt(0).toUpperCase() + t.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {tab === 'overview' && (
          <>
            <View style={s.chartSection}>
              <View style={{ alignItems: 'center', paddingVertical: 8 }}>
                <Text style={s.chartSecLabel}>YOUR COSMIC BLUEPRINT</Text>
                <Text style={s.chartSecTitle}>Natal Chart Overview</Text>
              </View>
              <BirthChartWheel houses={chart.houses} planets={chart.planets} sun={chart.sun} moon={chart.moon} rising={chart.rising} />
            </View>

            <View style={s.threeGrid}>
              <ThreeCard label="SUN SIGN" icon="☉" sign={chart.sun.name} value={chart.sun.symbol} house={chart.planets.Sun?.house || 1} desc="Your core identity" color={C.primaryFixed} borderColor={C.primary + '50'} />
              <ThreeCard label="MOON SIGN" icon="☽" sign={chart.moon.name} value={chart.moon.symbol} house={chart.planets.Moon?.house || 1} desc="Your emotional inner world" color={C.secondary} borderColor={C.secondary + '50'} />
              <ThreeCard label="RISING SIGN" icon="△" sign={chart.rising.name} value={chart.rising.symbol} house={1} desc="Your social mask" color={C.primary} borderColor={C.primary + '50'} />
            </View>
          </>
        )}

        {tab === 'placements' && (
          <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque', textAlign: 'center', marginBottom: 20 }}>Planetary Placements</Text>
            {major.map(pId => {
              const p = chart.planets[pId]; if (!p) return null;
              const pl = PLANETS.find(x => x.id === pId);
              return (
                <View key={pId} style={s.placementRow}>
                  <View style={[s.plIconBox, { borderColor: (pl?.color || C.primary) + '50', backgroundColor: (pl?.color || C.primary) + '15' }]}><Text style={{ fontSize: 18, color: pl?.color || C.primary }}>{p.symbol}</Text></View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: C.onSurface, letterSpacing: 0.5, textTransform: 'uppercase' }}>{p.name}</Text>
                    <Text style={{ fontSize: 13, color: C.onSurfaceVariant, marginTop: 1 }}>{pl?.meaning}</Text>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: C.onSurface }}>{p.sign.symbol} {p.sign.name}</Text>
                    <Text style={{ fontSize: 11, color: C.outline, letterSpacing: 0.5 }}>{p.house}th House</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {tab === 'houses' && (
          <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
            {chart.houses.map(h => (
              <View key={h.number} style={s.houseRow}>
                <View style={[s.houseNum, { backgroundColor: C.houses[h.number - 1] + '20' }]}><Text style={{ fontSize: 16, fontWeight: '800', color: C.houses[h.number - 1] }}>{h.number}</Text></View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={{ fontSize: 15, fontWeight: '600', color: C.onSurface }}>{h.name}</Text>
                  <Text style={{ fontSize: 12, color: C.onSurfaceVariant, marginTop: 2 }}>{h.meaning}</Text>
                  <Text style={{ fontSize: 11, color: C.outline, marginTop: 1 }}>{h.sign.symbol} {h.sign.name}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === 'aspects' && (
          <View style={{ paddingHorizontal: 20, marginTop: 8 }}>
            <Text style={{ fontSize: 12, color: C.onSurfaceVariant, textAlign: 'center', marginBottom: 16 }}>{chart.aspects.length} major aspects found</Text>
            {chart.aspects.slice(0, 15).map((a, i) => (
              <View key={i} style={s.aspectRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: chart.planets[a.planet1]?.color }}>{chart.planets[a.planet1]?.symbol} {a.planet1}</Text>
                  <Text style={{ fontSize: 20, marginHorizontal: 12, color: C.onSurfaceVariant }}>{a.aspect.symbol}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: chart.planets[a.planet2]?.color }}>{chart.planets[a.planet2]?.symbol} {a.planet2}</Text>
                </View>
                <Text style={{ fontSize: 12, color: C.onSurfaceVariant, textAlign: 'center', marginTop: 8, fontStyle: 'italic' }}>{a.aspect.meaning}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={s.summaryCard}>
          {[
            { l: 'Sun', v: `${chart.sun.symbol} ${chart.sun.name}`, c: C.primaryFixed },
            { l: 'Moon', v: `${chart.moon.symbol} ${chart.moon.name}`, c: C.secondary },
            { l: 'Rising', v: `${chart.rising.symbol} ${chart.rising.name}`, c: C.primary },
            { l: 'Dominant Element', v: chart.dominantElement, c: C.elements[chart.dominantElement] },
            { l: 'Modality', v: chart.dominantModality, c: C.primary },
          ].map((r, i) => (
            <View key={i} style={s.summaryRow}>
              <Text style={{ fontSize: 14, color: C.onSurfaceVariant, fontWeight: '600' }}>{r.l}</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: r.c }}>{r.v}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function ThreeCard({ label, icon, sign, value, house, desc, color, borderColor }) {
  return (
    <View style={[tc.card, { borderColor }]}>
      <View style={[tc.iconBox, { borderColor }]}><Text style={[tc.icon, { color }]}>{icon}</Text></View>
      <Text style={[tc.label, { color }]}>{label}</Text>
      <Text style={tc.sign}>{value}</Text>
      <Text style={tc.signName}>{sign}</Text>
      <Text style={tc.desc}>{desc}</Text>
      <View style={[tc.houseBadge, { backgroundColor: C.surfaceVariant }]}><Text style={tc.houseText}>{house}th House</Text></View>
    </View>
  );
}
const tc = StyleSheet.create({
  card: { flex: 1, backgroundColor: C.surfaceContainer, borderRadius: 32, padding: 20, alignItems: 'center', borderWidth: 1, marginHorizontal: 4 },
  iconBox: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 1 },
  icon: { fontSize: 26 },
  label: { fontSize: 11, fontWeight: '600', letterSpacing: 2, marginBottom: 4 },
  sign: { fontSize: 28, marginBottom: 2 },
  signName: { fontSize: 22, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque', marginBottom: 8 },
  desc: { fontSize: 12, color: C.onSurfaceVariant, textAlign: 'center', lineHeight: 16 },
  houseBadge: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 5, borderRadius: 9999 },
  houseText: { fontSize: 11, color: C.onSurface, fontWeight: '500' },
});

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  back: { fontSize: 20, color: C.primary, fontWeight: '600' },
  topTitle: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  formWrap: { paddingHorizontal: 20, paddingTop: 24 },
  formTitle: { fontSize: 42, fontWeight: '800', color: C.primary, textAlign: 'center', fontFamily: 'Bricolage Grotesque', letterSpacing: -0.02 },
  formSub: { fontSize: 16, color: C.onSurfaceVariant, textAlign: 'center', marginVertical: 12, lineHeight: 22 },
  formCard: { padding: 24, backgroundColor: C.surfaceContainerLow, borderRadius: 32, position: 'relative', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginTop: 8 },
  formBlob: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: C.secondaryContainer + '20' },
  fieldGroup: { marginBottom: 20 },
  fieldLabel: { fontSize: 12, fontWeight: '600', color: C.secondary, letterSpacing: 2, marginBottom: 8, marginLeft: 4 },
  inputRow: { flexDirection: 'row', alignItems: 'stretch', gap: 0 },
  inputWrap: { flex: 1, backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, overflow: 'hidden' },
  input: { padding: 14, color: C.onSurface, fontSize: 16, fontWeight: '600', textAlign: 'center' },
  sep: { color: C.outline, fontSize: 18, alignSelf: 'center', marginHorizontal: 4 },
  genBtn: { marginTop: 12, backgroundColor: C.secondaryContainer, paddingVertical: 16, borderRadius: 9999, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  genText: { fontSize: 14, fontWeight: '600', color: C.onSecondaryContainer, letterSpacing: 1 },
  tabRow: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: C.surfaceContainer, borderRadius: 9999, padding: 4, marginVertical: 12, gap: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 9999 },
  tabActive: { backgroundColor: C.secondaryContainer },
  tabText: { fontSize: 12, color: C.onSurfaceVariant, fontWeight: '600' },
  tabTextActive: { color: C.onSecondaryContainer, fontWeight: '700' },
  chartSection: { backgroundColor: C.surfaceDim + 'cc', paddingVertical: 16, borderTopWidth: 1, borderBottomWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  chartSecLabel: { fontSize: 11, color: C.tertiary, fontWeight: '500', letterSpacing: 3, marginBottom: 4, textAlign: 'center' },
  chartSecTitle: { fontSize: 28, fontWeight: '800', color: C.onSurface, textAlign: 'center', fontFamily: 'Bricolage Grotesque' },
  threeGrid: { flexDirection: 'row', paddingHorizontal: 12, gap: 8, marginBottom: 28, marginTop: 16 },
  placementRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  plIconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  houseRow: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  houseNum: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  aspectRow: { padding: 16, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  summaryCard: { marginHorizontal: 20, marginTop: 24, backgroundColor: C.surfaceContainer, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
});
