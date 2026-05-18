import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { colors } from '../constants/colors';
import { getZodiacByDate } from '../data/zodiac';

const C = colors;

export default function ProfileScreen({ navigation }) {
  const [profile, setProfile] = useState({ name: '', month: '', day: '', year: '', hour: '', minute: '' });
  const sunSign = profile.month && profile.day ? getZodiacByDate(parseInt(profile.month), parseInt(profile.day)) : null;

  const saveProfile = () => Alert.alert('Profile Saved', 'Your cosmic profile has been updated.');

  return (
    <View style={s.container}>
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}><Text style={s.backText}>✦</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Nebula</Text>
        <View style={s.backBtn} />
      </View>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <View style={s.avatarSection}>
          <View style={[s.avatar, { borderColor: sunSign?.color || C.primary }]}>
            <Text style={s.avatarEmoji}>{sunSign?.symbol || '✦'}</Text>
          </View>
          <Text style={s.avatarName}>{profile.name || 'Cosmic Traveler'}</Text>
          {sunSign && (
            <View style={s.signBadge}>
              <Text style={[s.signBadgeText, { color: sunSign.color }]}>{sunSign.symbol} {sunSign.name} — {sunSign.element}</Text>
            </View>
          )}
        </View>

        <View style={s.formCard}>
          <Text style={s.formLabel}>Your Birth Details</Text>
          <TextInput style={s.input} value={profile.name} onChangeText={v => setProfile(p => ({ ...p, name: v }))} placeholder="Your name" placeholderTextColor={C.outline} />
          <View style={s.fieldRow}>
            <Field value={profile.month} onChange={v => setProfile(p => ({ ...p, month: v }))} />
            <Field value={profile.day} onChange={v => setProfile(p => ({ ...p, day: v }))} />
            <Field value={profile.year} onChange={v => setProfile(p => ({ ...p, year: v }))} />
          </View>
          <View style={s.fieldRow}>
            <Field value={profile.hour} onChange={v => setProfile(p => ({ ...p, hour: v }))} />
            <Field value={profile.minute} onChange={v => setProfile(p => ({ ...p, minute: v }))} />
            <View style={{ flex: 1 }} />
          </View>
        </View>

        {sunSign && (
          <View style={s.cosmicProfile}>
            <Text style={s.sectionTitle}>Cosmic Profile</Text>
            <View style={s.traitRow}>
              <TraitCard label="Element" value={sunSign.element} color={C.elements[sunSign.element]} />
              <TraitCard label="Modality" value={sunSign.modality} color={C.primary} />
              <TraitCard label="Ruler" value={sunSign.ruler} color={C.tertiaryFixed} />
            </View>
            <View style={s.traitsRow}>
              {sunSign.keywords.map(k => (
                <View key={k} style={[s.traitPill, { backgroundColor: sunSign.color + '15', borderColor: sunSign.color + '30' }]}>
                  <Text style={[s.traitPillText, { color: sunSign.color }]}>{k}</Text>
                </View>
              ))}
            </View>
            {sunSign.traits.positive.map(t => (
              <Text key={t} style={[s.traitLine, { color: '#22c55e' }]}>+ {t}</Text>
            ))}
            {sunSign.traits.negative.map(t => (
              <Text key={t} style={[s.traitLine, { color: C.error }]}>- {t}</Text>
            ))}
          </View>
        )}

        <View style={s.actionsCard}>
          <Text style={s.sectionTitle}>Quick Actions</Text>
          <ActionItem label="Generate Full Birth Chart" onPress={() => navigation.navigate('BirthChart')} />
          <ActionItem label="Talk to AI Astrologer" onPress={() => navigation.navigate('AIChat')} />
          <ActionItem label="Check Compatibility" onPress={() => navigation.navigate('Compatibility')} />
        </View>

        <TouchableOpacity style={s.saveBtn} onPress={saveProfile}>
          <Text style={s.saveText}>Save Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Field({ value, onChange }) {
  return (
    <View style={fStyles.container}>
      <TextInput style={fStyles.input} value={value} onChangeText={onChange} placeholderTextColor={C.outline} keyboardType="numeric" maxLength={4} />
    </View>
  );
}

const fStyles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 4 },
  input: { backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, padding: 12, color: C.onSurface, fontSize: 15, fontWeight: '700', textAlign: 'center' },
});

function TraitCard({ label, value, color }) {
  return (
    <View style={[tcStyles.card, { borderColor: (color || C.primary) + '30' }]}>
      <Text style={[tcStyles.label, { color: color || C.primary }]}>{label}</Text>
      <Text style={tcStyles.value}>{value}</Text>
    </View>
  );
}

const tcStyles = StyleSheet.create({
  card: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: 16, borderWidth: 1, marginHorizontal: 4, backgroundColor: C.surfaceContainer + '50' },
  label: { fontSize: 11, fontWeight: '600' },
  value: { fontSize: 14, color: C.onSurface, fontWeight: '700', marginTop: 2 },
});

function ActionItem({ label, onPress }) {
  return (
    <TouchableOpacity style={aiStyles.item} onPress={onPress}>
      <Text style={aiStyles.text}>{label}</Text>
      <Text style={aiStyles.arrow}>→</Text>
    </TouchableOpacity>
  );
}

const aiStyles = StyleSheet.create({
  item: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.08)' },
  text: { fontSize: 15, color: C.onSurface, fontWeight: '500' },
  arrow: { fontSize: 16, color: C.primary },
});

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  backText: { fontSize: 20, color: C.primary },
  headerTitle: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  content: { paddingBottom: 100 },
  avatarSection: { alignItems: 'center', paddingVertical: 32 },
  avatar: { width: 90, height: 90, borderRadius: 45, backgroundColor: C.surfaceContainer, alignItems: 'center', justifyContent: 'center', borderWidth: 2, marginBottom: 12 },
  avatarEmoji: { fontSize: 40 },
  avatarName: { fontSize: 28, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  signBadge: { marginTop: 8, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 9999, backgroundColor: C.surfaceContainer, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  signBadgeText: { fontSize: 14, fontWeight: '600' },
  formCard: { marginHorizontal: 20, padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  formLabel: { fontSize: 18, fontWeight: '800', color: C.onSurface, marginBottom: 16, fontFamily: 'Bricolage Grotesque' },
  input: { backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, padding: 14, color: C.onSurface, fontSize: 15, borderWidth: 1, borderColor: 'transparent', marginBottom: 12, textAlign: 'center' },
  fieldRow: { flexDirection: 'row', marginBottom: 8 },
  cosmicProfile: { marginHorizontal: 20, padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: C.onSurface, marginBottom: 16, fontFamily: 'Bricolage Grotesque' },
  traitRow: { flexDirection: 'row', marginBottom: 16 },
  traitsRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },
  traitPill: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 9999, borderWidth: 1, marginRight: 8, marginBottom: 6 },
  traitPillText: { fontSize: 12, fontWeight: '600' },
  traitLine: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  actionsCard: { marginHorizontal: 20, padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  saveBtn: { marginHorizontal: 20, paddingVertical: 16, borderRadius: 9999, alignItems: 'center', backgroundColor: C.secondaryContainer, marginBottom: 32 },
  saveText: { fontSize: 14, color: C.onSecondaryContainer, fontWeight: '600', letterSpacing: 1 },
});
