import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { colors as C } from '../constants/colors';
import { calculateCompatibility } from '../utils/compatibility';

export default function CompatibilityScreen({ navigation }) {
  const [result, setResult] = useState(null);
  const [p1, setP1] = useState({ name: 'Alex', month: '3', day: '21', year: '1995', hour: '12', minute: '0' });
  const [p2, setP2] = useState({ name: 'Taylor', month: '10', day: '23', year: '1995', hour: '12', minute: '0' });

  const calc = () => {
    const r = calculateCompatibility(
      { month: parseInt(p1.month), day: parseInt(p1.day), year: parseInt(p1.year), hour: parseInt(p1.hour) || 12, minute: parseInt(p1.minute) || 0, name: p1.name },
      { month: parseInt(p2.month), day: parseInt(p2.day), year: parseInt(p2.year), hour: parseInt(p2.hour) || 12, minute: parseInt(p2.minute) || 0, name: p2.name },
    );
    setResult(r);
  };

  if (!result) {
    return (
      <View style={s.root}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
          <Text style={s.headerTitle}>Nebula</Text>
          <TouchableOpacity><Text style={{ fontSize: 18, color: C.primary }}>✦</Text></TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 100 }}>
          <Text style={{ fontSize: 42, fontWeight: '800', color: C.primary, textAlign: 'center', fontFamily: 'Bricolage Grotesque', letterSpacing: -0.02 }}>Soul Connection</Text>
          <Text style={{ fontSize: 16, color: C.onSurfaceVariant, textAlign: 'center', marginVertical: 16, lineHeight: 22 }}>
            Enter two birth dates to discover your cosmic compatibility
          </Text>
          <PersonForm label="Person 1" data={p1} onChange={setP1} />
          <Text style={{ fontSize: 32, color: C.tertiaryFixed, textAlign: 'center', marginVertical: 12 }}>♡</Text>
          <PersonForm label="Person 2" data={p2} onChange={setP2} />
          <TouchableOpacity style={s.calcBtn} onPress={calc}>
            <Text style={s.calcText}>✦  Calculate Compatibility</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  const gc = () => {
    if (result.score >= 85) return ['#22c55e', '#16a34a'];
    if (result.score >= 70) return ['#d1bcff', '#7000ff'];
    if (result.score >= 55) return ['#f6e600', '#d7ca00'];
    if (result.score >= 40) return ['#f97316', '#ea580c'];
    return ['#ffb4ab', '#93000a'];
  };
  const [c1, c2] = gc();

  return (
    <View style={s.root}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Nebula</Text>
        <TouchableOpacity onPress={() => setResult(null)}><Text style={{ fontSize: 14, color: C.primary, fontWeight: '600' }}>New</Text></TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={s.heroSection}>
          <View style={s.matchPill}>
            <Text style={s.matchPillText}>✦ Cosmic Alignment Found</Text>
          </View>
          <Text style={s.heroTitle}>Soul Connection</Text>
          <Text style={s.heroSub}>{p1.name} & {p2.name}</Text>
        </View>

        <View style={s.scoreSection}>
          <View style={s.scoreRing}>
            <View style={[s.scoreGlow, { borderColor: c1 }]}>
              <View style={[s.scoreInner, { borderColor: c2 }]} />
            </View>
            <View style={s.scoreCenter}>
              <Text style={[s.scoreValue, { color: c1 }]}>{result.score}%</Text>
              <Text style={s.scoreLabel}>Synergy</Text>
            </View>
          </View>
        </View>

        <View style={s.bentoGrid}>
          <InsightCard icon="♡" title="Romance" score="92%" desc="Venus trine Mars creates an undeniable magnetic pull." color={C.error} tags={['Trine', 'Water & Earth']} />
          <InsightCard icon="✦" title="Friendship" score="85%" desc="Mercury conjunction fosters intuitive communication." color={C.tertiaryFixed} tags={['Conjunction']} />
          <InsightCard icon="△" title="Growth" score="78%" desc="Saturn squares suggest areas of friction that require patience." color={C.secondary} tags={['Square', 'Challenge']} />
        </View>

        <View style={s.insightCard}>
          <Text style={s.insightTitle}>Cosmic Insight</Text>
          <Text style={s.insightBody}>{result.insights}</Text>
        </View>

        <View style={s.listsSection}>
          <View style={s.listCol}>
            <Text style={s.listTitle}>Strengths</Text>
            {result.strengths.map((s, i) => (
              <View key={i} style={[s.strengthPill, { backgroundColor: '#22c55e15', borderColor: '#22c55e30' }]}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#22c55e' }}>+ {s}</Text>
              </View>
            ))}
          </View>
          <View style={s.listCol}>
            <Text style={s.listTitle}>Growth Areas</Text>
            {result.challenges.map((c, i) => (
              <View key={i} style={[s.strengthPill, { backgroundColor: C.error + '15', borderColor: C.error + '30' }]}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: C.error }}>○ {c}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function InsightCard({ icon, title, score, desc, color, tags }) {
  return (
    <View style={ic.card}>
      <View style={ic.topRow}>
        <View style={[ic.iconBox, { backgroundColor: color + '15' }]}>
          <Text style={{ fontSize: 22, color }}>{icon}</Text>
        </View>
        <Text style={ic.score}>{score}</Text>
      </View>
      <Text style={ic.title}>{title}</Text>
      <Text style={ic.desc}>{desc}</Text>
      <View style={ic.progressBg}>
        <View style={[ic.progressFill, { width: score, backgroundColor: color }]} />
      </View>
      <View style={ic.tagsRow}>
        {tags.map(t => <View key={t} style={ic.tag}><Text style={ic.tagText}>{t}</Text></View>)}
      </View>
    </View>
  );
}

const ic = StyleSheet.create({
  card: { backgroundColor: C.surfaceContainer, borderRadius: 32, padding: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, position: 'relative', zIndex: 10 },
  iconBox: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  score: { fontSize: 28, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  title: { fontSize: 22, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque', marginBottom: 8, position: 'relative', zIndex: 10 },
  desc: { fontSize: 14, color: C.onSurfaceVariant, lineHeight: 20, marginBottom: 16, position: 'relative', zIndex: 10 },
  progressBg: { height: 8, backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', borderRadius: 9999 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, backgroundColor: C.surfaceVariant, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  tagText: { fontSize: 11, fontWeight: '500', color: C.primary },
});

function PersonForm({ label, data, onChange }) {
  const u = (k, v) => onChange(d => ({ ...d, [k]: v }));
  return (
    <View style={pf.card}>
      <Text style={pf.label}>{label}</Text>
      <TextInput style={pf.input} value={data.name} onChangeText={v => u('name', v)} placeholder="Name" placeholderTextColor={C.outline} />
      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
        <Field value={data.month} onChange={v => u('month', v)} ph="MM" />
        <Field value={data.day} onChange={v => u('day', v)} ph="DD" />
        <Field value={data.year} onChange={v => u('year', v)} ph="YYYY" />
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Field value={data.hour} onChange={v => u('hour', v)} ph="HH" />
        <Field value={data.minute} onChange={v => u('minute', v)} ph="MM" />
        <View style={{ flex: 1 }} />
      </View>
    </View>
  );
}

function Field({ value, onChange, ph }) {
  return (
    <View style={{ flex: 1, marginHorizontal: 3 }}>
      <TextInput style={fi.input} value={value} onChangeText={onChange} placeholder={ph} placeholderTextColor={C.outline} keyboardType="numeric" maxLength={4} />
    </View>
  );
}
const fi = StyleSheet.create({
  input: { backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, padding: 14, color: C.onSurface, fontSize: 15, fontWeight: '700', textAlign: 'center' },
});

const pf = StyleSheet.create({
  card: { padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  label: { fontSize: 20, fontWeight: '800', color: C.primaryFixed, marginBottom: 12, fontFamily: 'Bricolage Grotesque' },
  input: { backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, padding: 14, color: C.onSurface, fontSize: 15, borderWidth: 1, borderColor: 'transparent', marginBottom: 12, textAlign: 'center' },
});

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  back: { fontSize: 20, color: C.primary, fontWeight: '600' },
  headerTitle: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  calcBtn: { marginTop: 16, backgroundColor: C.secondaryContainer, paddingVertical: 16, borderRadius: 9999, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  calcText: { fontSize: 14, color: C.onSecondaryContainer, fontWeight: '600', letterSpacing: 1 },
  heroSection: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 24 },
  matchPill: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 9999, backgroundColor: C.tertiaryContainer + '30', borderWidth: 1, borderColor: C.tertiary, marginBottom: 16, transform: [{ rotate: '-1deg' }] },
  matchPillText: { fontSize: 12, fontWeight: '600', color: C.tertiaryFixed },
  heroTitle: { fontSize: 42, fontWeight: '800', color: C.primary, textAlign: 'center', fontFamily: 'Bricolage Grotesque', letterSpacing: -0.02 },
  heroSub: { fontSize: 16, color: C.onSurfaceVariant, textAlign: 'center', marginTop: 8 },
  scoreSection: { alignItems: 'center', justifyContent: 'center', paddingVertical: 32 },
  scoreRing: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center', position: 'relative' },
  scoreGlow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, borderWidth: 6, opacity: 0.5 },
  scoreInner: { position: 'absolute', width: 190, height: 190, borderRadius: 95, borderWidth: 4, opacity: 0.3 },
  scoreCenter: { alignItems: 'center', justifyContent: 'center', backgroundColor: C.surfaceContainerHighest + 'cc', borderRadius: 100, width: 160, height: 160, borderWidth: 2, borderColor: C.primary, transform: [{ rotate: '2deg' }] },
  scoreValue: { fontSize: 56, fontWeight: '800', fontFamily: 'Bricolage Grotesque', letterSpacing: -0.02 },
  scoreLabel: { fontSize: 12, fontWeight: '600', color: C.onSurface, letterSpacing: 2, marginTop: 2 },
  bentoGrid: { paddingHorizontal: 20, gap: 16 },
  insightCard: { marginHorizontal: 20, marginTop: 24, padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  insightTitle: { fontSize: 20, fontWeight: '800', color: C.onSurface, marginBottom: 8, fontFamily: 'Bricolage Grotesque' },
  insightBody: { fontSize: 14, color: C.onSurfaceVariant, lineHeight: 22 },
  listsSection: { paddingHorizontal: 20, paddingTop: 24, flexDirection: 'row', gap: 16 },
  listCol: { flex: 1 },
  listTitle: { fontSize: 18, fontWeight: '800', color: C.onSurface, marginBottom: 12, fontFamily: 'Bricolage Grotesque' },
  strengthPill: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 9999, borderWidth: 1, marginBottom: 6, alignSelf: 'flex-start' },
});
