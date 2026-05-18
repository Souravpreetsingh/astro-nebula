require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    if (process.env.OPENAI_API_KEY) {
      const reply = await callOpenAI(message, context);
      return res.json({ reply });
    }

    const reply = localResponse(message, context);
    res.json({ reply });
  } catch (err) {
    console.error('Chat error:', err.message);
    res.json({ reply: localResponse(message, context) });
  }
});

async function callOpenAI(message, context) {
  const systemPrompt = `You are Nebula, a fun, joyful, and knowledgeable AI astrologer. You speak with energetic, playful positivity — like a cosmic cheerleader with deep astrological wisdom. You have the user's full birth chart context below. Answer their questions with astrological insight, warmth, and a touch of funky cosmic flair. Keep responses concise (2-4 paragraphs) and conversational. NEVER mention that you're an AI or that you're generating a response — always speak as Nebula, the cosmic guide.

USER'S BIRTH CHART:
${context || 'No chart available'}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.8,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`OpenAI API error: ${response.status} - ${err}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

function localResponse(userMessage, context) {
  const msg = userMessage.toLowerCase();

  if (msg.includes('love') || msg.includes('romance') || msg.includes('relationship') || msg.includes('heart')) {
    return extractFromContext(context, 'Venus') + extractFromContext(context, 'Moon') +
      "Your heart's cosmic weather is looking vibrant. Venus governs how you love, and its current placement shapes your romantic expression. The Moon reveals your emotional needs in partnership. Together, they paint a picture of someone who loves deeply and feels intensely. What specific aspect of your love life would you like to explore?";
  }

  if (msg.includes('career') || msg.includes('job') || msg.includes('work') || msg.includes('money')) {
    const sun = extractName(context, 'Sun') || 'your Sun sign';
    const saturn = extractName(context, 'Saturn') || 'Saturn';
    return `Your cosmic career compass points toward ${sun} energy. ${saturn} influences your professional discipline and long-term achievements. The dominant element in your chart shapes your working style — lean into it rather than fighting it. Career growth flows when you align your daily work with your soul's natural rhythm. Want me to look at a specific timing or area?`;
  }

  if (msg.includes('health') || msg.includes('wellness') || msg.includes('body') || msg.includes('fitness')) {
    const moon = extractName(context, 'Moon') || 'your Moon sign';
    return `Your wellness blueprint starts with ${moon}. The Moon governs your emotional and physical rhythms — when you honor your body's natural cycles, vitality follows. The balance of elements in your chart suggests that a ${extractDominant(context) || 'balanced'} approach works best for sustainable well-being. Small consistent practices aligned with your cosmic signature create the most lasting transformation.`;
  }

  if (msg.includes('spiritual') || msg.includes('soul') || msg.includes('purpose') || msg.includes('destiny') || msg.includes('meaning')) {
    return `Your soul's journey is written in the stars, and your chart reveals a beautiful path of growth. The North Node points toward your evolutionary direction — the qualities you're here to develop. Your 12th house placement shows where you connect most deeply with the invisible realms. Meditation, creative expression, or time in nature can help you access these cosmic frequencies more clearly. What calls to you most right now?`;
  }

  const placements = (context || '').split('\n').filter(l => l.includes('in ') && l.includes('th house')).slice(0, 3).join('\n');
  return `Ooh, great question! Let me tune into your chart... ✨

Looking at your cosmic blueprint, I can see some fascinating patterns. ${extractSun(context)} You have ${extractAspects(context) || 'several dynamic planetary conversations happening'}.

${placements ? `Your key placements:\n${placements}\n\n` : ''}

The universe has a lot to say about this. Could you tell me a bit more about what specifically you're curious about — love, career, health, or spiritual growth? That way I can give you the most stellar insight! 🌟`;
}

function extractFromContext(context, planet) {
  const match = (context || '').match(new RegExp(`${planet}:\\s*([^\\n]+)`));
  return match ? match[1] + '. ' : '';
}

function extractName(context, planet) {
  const match = (context || '').match(new RegExp(`- ${planet}:\\s*(\\w+)`));
  return match ? match[1] : null;
}

function extractSun(context) {
  const m = (context || '').match(/- Sun:\\s*([^\n]+)/);
  return m ? `Your Sun in ${m[1]} is your core identity — it's the essence of who you are. ` : '';
}

function extractAspects(context) {
  const m = (context || '').match(/Major Aspects:\n([^\n]+)/);
  return m ? m[1] : null;
}

function extractDominant(context) {
  const m = (context || '').match(/- Dominant Element:\\s*(\\w+)/);
  return m ? m[1].toLowerCase() : null;
}

app.listen(PORT, () => {
  console.log(`✦ Nebula server running on http://localhost:${PORT}`);
  console.log(`✦ AI mode: ${process.env.OPENAI_API_KEY ? 'OpenAI (configured)' : 'local (deterministic)'}`);
  console.log(`✦ Add OPENAI_API_KEY to .env for real AI responses`);
});
