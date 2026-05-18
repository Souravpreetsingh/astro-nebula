import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { colors as C } from '../constants/colors';
import { getAIResponse } from '../utils/aiChat';
import { generateBirthChart } from '../utils/charts';
import ChatBubble from '../components/ChatBubble';

export default function AIChatScreen({ navigation }) {
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chart, setChart] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [form, setForm] = useState({ month: '6', day: '15', year: '1995', hour: '12', minute: '0' });
  const scrollRef = useRef(null);

  const start = () => {
    const c = generateBirthChart(parseInt(form.year), parseInt(form.month), parseInt(form.day), parseInt(form.hour) || 12, parseInt(form.minute) || 0);
    setChart(c);
    setShowForm(false);
    setMsgs([{ text: `Greetings. I am your celestial guide. I've generated your birth chart — Sun in ${c.sun.name}, Moon in ${c.moon.name}, ${c.rising.name} rising. Ask me about your transits, natal chart, or seek guidance from the stars.`, isUser: false }]);
  };

  const send = () => {
    if (!input.trim() || !chart) return;
    const u = input.trim(); setInput(''); setMsgs(p => [...p, { text: u, isUser: true }]); setTyping(true);
    setTimeout(() => { setMsgs(p => [...p, { text: getAIResponse(u, chart), isUser: false }]); setTyping(false); }, 1500);
  };

  const prompts = ['What does my love life look like this week?', 'Explain my Saturn Return', 'Career prospects this month', 'What is my life purpose?'];

  if (showForm) {
    return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: C.background }}>
        <View style={s.root}>
          <View style={s.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
            <Text style={s.brand}>Nebula</Text>
            <TouchableOpacity><Text style={{ fontSize: 18, color: C.primary }}>✦</Text></TouchableOpacity>
          </View>
          <View style={s.startWrap}>
            <View style={s.aiAvatar}>
              <Text style={s.aiAvatarIcon}>✦</Text>
            </View>
            <Text style={s.startTitle}>Hey Stardust!</Text>
            <Text style={s.startSub}>I'm Nebula, your cosmic guide. Enter your birth details to begin.</Text>
            <View style={s.formCard}>
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <Fld value={form.month} onChange={v => setForm(f => ({ ...f, month: v }))} ph="MM" />
                <Fld value={form.day} onChange={v => setForm(f => ({ ...f, day: v }))} ph="DD" />
                <Fld value={form.year} onChange={v => setForm(f => ({ ...f, year: v }))} ph="YYYY" />
              </View>
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <Fld value={form.hour} onChange={v => setForm(f => ({ ...f, hour: v }))} ph="HH" />
                <Fld value={form.minute} onChange={v => setForm(f => ({ ...f, minute: v }))} ph="MM" />
                <View style={{ flex: 1 }} />
              </View>
              <TouchableOpacity style={s.startBtn} onPress={start}>
                <Text style={s.startBtnText}>✦  Begin Reading</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: C.background }}>
      <View style={s.root}>
        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={s.back}>✦</Text></TouchableOpacity>
          <Text style={s.brand}>Nebula</Text>
          <View style={s.headerAvatar}>
            <Text style={{ fontSize: 14, color: C.primary }}>✦</Text>
          </View>
        </View>

        <ScrollView ref={scrollRef} style={{ flex: 1 }} contentContainerStyle={{ paddingVertical: 16, paddingBottom: 120 }} onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
          <View style={s.chatHero}>
            <View style={s.chatAvatar}>
              <Text style={{ fontSize: 28 }}>✦</Text>
            </View>
            <Text style={s.chatHeroTitle}>Hey Stardust!</Text>
            <Text style={s.chatHeroSub}>I'm Nebula, your cosmic guide. What are we exploring today?</Text>
          </View>

          {msgs.map((m, i) => <ChatBubble key={i} message={m.text} isUser={m.isUser} />)}
          {typing && <ChatBubble isTyping />}

          {msgs.length <= 2 && (
            <View style={s.promptRow}>
              {prompts.map((q, i) => (
                <TouchableOpacity key={i} style={s.promptChip} onPress={() => setInput(q)}>
                  <Text style={s.promptText}>{q}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <View style={s.inputBar}>
          <View style={s.inputWrap}>
            <TextInput style={s.inputField} value={input} onChangeText={setInput} placeholder="Ask the stars..." placeholderTextColor={C.outline} />
            <TouchableOpacity style={[s.sendBtn, { opacity: input.trim() ? 1 : 0.5 }]} onPress={send} disabled={!input.trim()}>
              <Text style={s.sendIcon}>✦</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function Fld({ value, onChange, ph }) {
  return (
    <View style={{ flex: 1, marginHorizontal: 4 }}>
      <TextInput style={fld.input} value={value} onChangeText={onChange} placeholder={ph} placeholderTextColor={C.outline} keyboardType="numeric" maxLength={4} />
    </View>
  );
}
const fld = StyleSheet.create({
  input: { backgroundColor: C.surfaceContainerHighest, borderRadius: 9999, padding: 14, color: C.onSurface, fontSize: 15, fontWeight: '700', textAlign: 'center' },
});

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 54, paddingBottom: 10, backgroundColor: C.surface + '99', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.1)' },
  back: { fontSize: 20, color: C.primary, fontWeight: '600' },
  brand: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  headerAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.surfaceContainerHigh, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  startWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  aiAvatar: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.secondaryContainer, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.primary, marginBottom: 12, shadowColor: C.secondaryContainer, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.4, shadowRadius: 30 },
  aiAvatarIcon: { fontSize: 36, color: C.onSecondaryContainer },
  startTitle: { fontSize: 28, fontWeight: '800', color: C.primary, textAlign: 'center', fontFamily: 'Bricolage Grotesque' },
  startSub: { fontSize: 14, color: C.onSurfaceVariant, textAlign: 'center', maxWidth: 320, marginVertical: 12, lineHeight: 20 },
  formCard: { width: '100%', padding: 20, backgroundColor: C.surfaceContainer, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  startBtn: { backgroundColor: C.secondaryContainer, paddingVertical: 14, borderRadius: 9999, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 },
  startBtnText: { fontSize: 14, color: C.onSecondaryContainer, fontWeight: '600', letterSpacing: 1 },
  chatHero: { alignItems: 'center', paddingVertical: 24, paddingHorizontal: 24 },
  chatAvatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: C.secondaryContainer, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: C.primary, marginBottom: 12 },
  chatHeroTitle: { fontSize: 24, fontWeight: '800', color: C.primary, fontFamily: 'Bricolage Grotesque' },
  chatHeroSub: { fontSize: 14, color: C.onSurfaceVariant, textAlign: 'center', maxWidth: 320, lineHeight: 20, marginTop: 4 },
  promptRow: { paddingHorizontal: 20, gap: 10, marginTop: 16 },
  promptChip: { padding: 16, backgroundColor: C.surfaceContainer, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  promptText: { fontSize: 13, color: C.onSurfaceVariant, fontWeight: '500' },
  inputBar: { paddingHorizontal: 16, paddingBottom: 16, backgroundColor: C.background },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.surfaceContainerHigh, borderRadius: 9999, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', paddingLeft: 20, paddingRight: 4 },
  inputField: { flex: 1, color: C.onSurface, fontSize: 15, paddingVertical: 12 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.secondaryContainer, alignItems: 'center', justifyContent: 'center' },
  sendIcon: { fontSize: 16, color: C.onSecondaryContainer },
});
