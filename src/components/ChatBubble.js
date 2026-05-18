import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors as C } from '../constants/colors';

export default function ChatBubble({ message, isUser, isTyping }) {
  if (isTyping) {
    return (
      <View style={[b.container, b.botWrap]}>
        <View style={b.avatarSm}><Text style={b.avatarIcon}>✦</Text></View>
        <View style={[b.bubble, b.botBubble]}>
          <ActivityIndicator size="small" color={C.primary} />
        </View>
      </View>
    );
  }
  return (
    <View style={[b.container, isUser ? b.userWrap : b.botWrap]}>
      {!isUser && <View style={b.avatarSm}><Text style={b.avatarIcon}>✦</Text></View>}
      <View style={[b.bubble, isUser ? b.userBubble : b.botBubble]}>
        <Text style={b.text}>{message}</Text>
      </View>
      {isUser && <View style={[b.avatarSm, { backgroundColor: C.primaryContainer + '40', borderColor: C.primaryContainer }]}><Text style={[b.avatarIcon, { color: C.onPrimaryContainer }]}>☽</Text></View>}
    </View>
  );
}

const b = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 6, paddingHorizontal: 16, alignItems: 'flex-end' },
  botWrap: { justifyContent: 'flex-start' },
  userWrap: { justifyContent: 'flex-end' },
  avatarSm: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.secondaryContainer, alignItems: 'center', justifyContent: 'center', marginHorizontal: 8, borderWidth: 1, borderColor: C.primary },
  avatarIcon: { fontSize: 14, color: C.onSecondaryContainer },
  bubble: { maxWidth: '78%', paddingHorizontal: 18, paddingVertical: 14, borderRadius: 24 },
  userBubble: { backgroundColor: C.primaryContainer, borderWidth: 1, borderColor: C.primary + '40', borderBottomRightRadius: 4, shadowColor: C.primaryContainer, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.3, shadowRadius: 15 },
  botBubble: { backgroundColor: C.surfaceContainerHighest, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderBottomLeftRadius: 4, shadowColor: C.secondaryContainer, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 20 },
  text: { fontSize: 15, lineHeight: 22, color: C.onSurface },
});
