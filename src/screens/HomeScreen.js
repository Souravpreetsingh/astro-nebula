import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { ZODIAC_SIGNS } from '../data/zodiac';
import { getHoroscope } from '../utils/aiChat';

const C = colors;

export default function HomeScreen({ navigation }) {
  const [sign, setSign] = useState(null);
  useEffect(() => {
    const d = new Date(); const m = d.getMonth() + 1, day = d.getDate();
    const dates = [[1,19,'capricorn'],[2,18,'aquarius'],[3,20,'pisces'],[4,19,'aries'],[5,20,'taurus'],[6,20,'gemini'],[7,22,'cancer'],[8,22,'leo'],[9,22,'virgo'],[10,22,'libra'],[11,21,'scorpio'],[12,21,'sagittarius'],[12,31,'capricorn']];
    for (const [mm,dd,s] of dates) { if ((m<mm)||(m===mm&&day<=dd)) { setSign(ZODIAC_SIGNS.find(z=>z.id===s)); break; } }
  }, []);

  return (
    <View style={s.root}>
      <View style={s.header}>
        <View style={s.headerLeft}>
          <TouchableOpacity style={s.menuBtn}>
            <Text style={s.menuIcon}>✦</Text>
          </TouchableOpacity>
          <Text style={s.brand}>Nebula</Text>
        </View>
        <View style={s.avatar}>
          <Text style={s.avatarIcon}>☉</Text>
        </View>
      </View>

      <ScrollView style={s.scroll} contentContainerStyle={s.scrollInner} showsVerticalScrollIndicator={false}>
        <View style={s.heroSection}>
          <View style={s.energyPill}>
            <Text style={s.energyText}>✦ High Energy Day</Text>
          </View>
          <Text style={s.greeting}>
            Radiate today,{"\n"}<Text style={s.greetingHighlight}>{sign?.name || 'Seeker'}!</Text>
          </Text>
        </View>

        <View style={s.bentoGrid}>
          <View style={s.mainCard}>
            <View style={s.mainCardGlow} />
            <View style={s.mainCardHeader}>
              <Text style={s.mainCardTitle}>Daily Insight</Text>
              <Text style={s.mainCardIcon}>☉</Text>
            </View>
            <Text style={s.mainCardBody}>
              {sign ? getHoroscope(sign.id, 'today') : 'Your ruling star is beaming pure main-character energy directly into your sector of creativity.'}
            </Text>
            <TouchableOpacity style={s.mainCardBtn} onPress={() => navigation.navigate('Horoscope', { sign: sign?.id, period: 'today' })}>
              <Text style={s.mainCardBtnText}>Harness Energy</Text>
            </TouchableOpacity>
          </View>

          <View style={s.vitalsCol}>
            <View style={s.moodCard}>
              <Text style={s.moodIcon}>✦</Text>
              <Text style={s.moodLabel}>MOOD</Text>
              <Text style={s.moodValue}>Electric</Text>
            </View>
            <View style={s.colorCard}>
              <View style={s.colorDot} />
              <Text style={s.colorLabel}>POWER COLOR</Text>
              <Text style={s.colorValue}>Neon Gold</Text>
            </View>
          </View>
        </View>

        <View style={s.secHeader}>
          <Text style={s.secTitle}>Horizons</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.horizonsScroll}>
          {[
            { label: 'This Week', icon: '◐', color: C.secondary, body: 'Focus shifts towards organizing your domestic sphere. Unexpected news mid-week brings clarity.' },
            { label: 'This Month', icon: '◔', color: C.tertiaryFixed, body: 'A major professional milestone is within reach. Maintain discipline through the upcoming retrograde.' },
            { label: 'Year Ahead', icon: '◐', color: C.primary, body: "Jupiter's transit promises expansion in learning and travel. Prepare for significant personal growth." },
          ].map((item, i) => (
            <View key={i} style={[s.horizonCard, { borderLeftColor: item.color, borderLeftWidth: 3 }]}>
              <View style={s.horizonHead}>
                <Text style={[s.horizonLabel, { color: item.color }]}>{item.label}</Text>
                <Text style={s.horizonIcon}>{item.icon}</Text>
              </View>
              <Text style={s.horizonBody}>{item.body}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={[s.secHeader, { marginTop: 8 }]}>
          <Text style={s.secTitle}>Current Alignments</Text>
          <Text style={s.secSub}>Tap for details</Text>
        </View>
        <View style={s.alignCard}>
          <AlignRow icon="☉" label="Sun in Scorpio" sub="Intensity & Transformation" badge="Trine Mars" badgeColor={C.primary} />
          <View style={s.divider} />
          <AlignRow icon="☽" label="Moon in Taurus" sub="Stability & Comfort" badge="Square Pluto" badgeColor={C.error} />
          <View style={s.divider} />
          <AlignRow icon="♀" label="Venus in Libra" sub="Harmony & Balance" badge="Sextile Jupiter" badgeColor={C.tertiaryFixed} />
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

function AlignRow({ icon, label, sub, badge, badgeColor }) {
  return (
    <View style={ar.row}>
      <View style={ar.iconBox}><Text style={ar.icon}>{icon}</Text></View>
      <View style={ar.info}><Text style={ar.label}>{label}</Text><Text style={ar.sub}>{sub}</Text></View>
      <View style={[ar.badge, { backgroundColor: C.surfaceContainer }]}><Text style={[ar.badgeText, { color: badgeColor }]}>{badge}</Text></View>
    </View>
  );
}
const ar = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  iconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.tertiaryContainer + '30', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.tertiary + '30' },
  icon: { fontSize: 20, color: C.tertiaryFixed },
  info: { flex: 1, marginLeft: 12 },
  label: { fontSize: 14, fontWeight: '600', color: C.onSurface },
  sub: { fontSize: 11, color: C.onSurfaceVariant, marginTop: 2 },
  badge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 9999 },
  badgeText: { fontSize: 11, fontWeight: '600' },
});

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  menuBtn: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  menuIcon: { fontSize: 20, color: C.primary },
  brand: { fontSize: 28, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque', letterSpacing: -0.5 },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: C.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarIcon: { fontSize: 16, color: C.primary },
  scroll: { flex: 1 },
  scrollInner: { paddingTop: 24, paddingBottom: 40 },
  heroSection: { paddingHorizontal: 20, marginBottom: 24, transform: [{ rotate: '-1deg' }] },
  energyPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: C.tertiaryContainer, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 9999, marginBottom: 12 },
  energyText: { fontSize: 12, fontWeight: '600', color: C.onTertiaryContainer, letterSpacing: 0.5 },
  greeting: { fontSize: 42, fontWeight: '800', color: C.primaryFixed, lineHeight: 46, fontFamily: 'Bricolage Grotesque', letterSpacing: -0.02 },
  greetingHighlight: { color: C.onSurface },

  bentoGrid: { paddingHorizontal: 20, gap: 16, flexDirection: 'row', flexWrap: 'wrap' },
  mainCard: { flex: 2, minWidth: '60%', backgroundColor: C.surfaceContainerLow, borderRadius: 32, padding: 24, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  mainCardGlow: { position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, backgroundColor: C.primaryContainer + '20' },
  mainCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, position: 'relative', zIndex: 10 },
  mainCardTitle: { fontSize: 28, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  mainCardIcon: { fontSize: 32, color: C.tertiaryFixed },
  mainCardBody: { fontSize: 17, color: C.onSurfaceVariant, lineHeight: 26, marginBottom: 20, position: 'relative', zIndex: 10 },
  mainCardBtn: { alignSelf: 'flex-start', backgroundColor: C.primaryContainer, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 9999, position: 'relative', zIndex: 10 },
  mainCardBtnText: { fontSize: 13, fontWeight: '600', color: C.onPrimaryContainer, letterSpacing: 0.5 },

  vitalsCol: { flex: 1, minWidth: '35%', gap: 16 },
  moodCard: { flex: 1, backgroundColor: C.secondaryContainer, borderRadius: 9999, padding: 24, alignItems: 'center', justifyContent: 'center', transform: [{ rotate: '1deg' }] },
  moodIcon: { fontSize: 32, color: C.onSecondaryContainer, marginBottom: 8 },
  moodLabel: { fontSize: 11, color: C.onSecondaryContainer, letterSpacing: 2, fontWeight: '600', opacity: 0.8 },
  moodValue: { fontSize: 24, fontWeight: '800', color: C.onSecondaryContainer, fontFamily: 'Bricolage Grotesque' },
  colorCard: { flex: 1, backgroundColor: C.surfaceContainer, borderRadius: 9999, padding: 24, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.tertiary, transform: [{ rotate: '-2deg' }] },
  colorDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#f6e600', marginBottom: 8, shadowColor: '#f6e600', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 12 },
  colorLabel: { fontSize: 11, color: C.onSurfaceVariant, letterSpacing: 2, fontWeight: '600' },
  colorValue: { fontSize: 17, fontWeight: '600', color: C.tertiaryFixed, marginTop: 4 },

  secHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 28, paddingBottom: 12 },
  secTitle: { fontSize: 22, fontWeight: '800', color: C.onSurface, fontFamily: 'Bricolage Grotesque' },
  secSub: { fontSize: 11, color: C.onSurfaceVariant, fontWeight: '500' },
  horizonsScroll: { paddingLeft: 20, paddingBottom: 4 },
  horizonCard: { minWidth: 280, backgroundColor: C.surfaceContainer, borderRadius: 32, padding: 20, marginRight: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  horizonHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  horizonLabel: { fontSize: 14, fontWeight: '600' },
  horizonIcon: { fontSize: 16, color: C.onSurfaceVariant },
  horizonBody: { fontSize: 14, color: C.onSurfaceVariant, lineHeight: 20 },

  alignCard: { marginHorizontal: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, paddingHorizontal: 20, paddingVertical: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.08)' },
});
