import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';
import { PLANETS } from '../data/planets';

const C = colors;

export default function PlanetIndicator({ planetId, planetData, size = 'md' }) {
  const isLarge = size === 'lg';
  const planetColor = planetData?.color || PLANETS.find(p => p.id === planetId)?.color || C.primary;

  return (
    <View style={[s.container, isLarge && s.containerLarge]}>
      <View style={[s.iconBox, { borderColor: planetColor + '50', backgroundColor: planetColor + '15' }]}>
        <Text style={[s.symbol, { color: planetColor }]}>{planetData?.symbol || PLANETS.find(p => p.id === planetId)?.symbol}</Text>
      </View>
      <View style={s.info}>
        <Text style={[s.name, isLarge && s.nameLarge]}>{planetData?.name || planetId}</Text>
        {planetData?.sign && (
          <Text style={s.position}>{planetData.sign.symbol} {planetData.sign.name} {planetData.degree}°{planetData.minute ? planetData.minute + "'" : ''}</Text>
        )}
        {isLarge && planetData?.meaning && (
          <Text style={s.meaning}>{planetData.meaning}</Text>
        )}
      </View>
      {planetData?.sign && (
        <View style={[s.houseTag, { backgroundColor: C.surfaceContainerLow, borderColor: planetColor + '30' }]}>
          <Text style={[s.houseText, { color: planetColor }]}>{planetData.house}H</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16 },
  containerLarge: { paddingVertical: 14, paddingHorizontal: 16, backgroundColor: C.surfaceContainer, borderRadius: 32, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  iconBox: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', borderWidth: 1, marginRight: 12 },
  symbol: { fontSize: 20 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '600', color: C.onSurface },
  nameLarge: { fontSize: 15 },
  position: { fontSize: 13, color: C.onSurfaceVariant, marginTop: 2 },
  meaning: { fontSize: 12, color: C.onSurfaceVariant, marginTop: 4, fontStyle: 'italic' },
  houseTag: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 9999, borderWidth: 1, marginLeft: 8 },
  houseText: { fontSize: 11, fontWeight: '600' },
});
