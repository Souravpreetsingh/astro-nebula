import { ZODIAC_SIGNS } from '../data/zodiac';
import { PLANETS, ASPECTS } from '../data/planets';

const DAILY_HOROSCOPES = {
  aries: {
    today: 'The universe is aligning to ignite your ambitions, Aries. Mars energizes your drive today — channel it into that project you\'ve been postponing. Your natural leadership shines brightest when you lead with patience, not impulse.',
    week: 'This week brings dynamic shifts in your social circle. Jupiter\'s influence expands your network — say yes to unexpected invitations. Career opportunities emerge midweek; trust your instincts.',
    month: 'A transformative month lies ahead as Saturn challenges you to build sustainable foundations. Romantic opportunities intensify during the full moon. Focus on what truly matters and release what no longer serves you.',
  },
  taurus: {
    today: 'Venus graces your sign with sensual pleasures today. Indulge in life\'s simple joys — good food, beautiful music, meaningful touch. Your stubbornness is actually your superpower when directed toward worthy goals.',
    week: 'Financial insights arrive this week as Mercury sharpens your business mind. A conversation about shared resources could lead to a lucrative partnership. Ground yourself in nature to maintain balance.',
    month: 'Your patience pays off this month, Taurus. The new moon in your sign offers a fresh start for personal projects. Relationship dynamics shift — communicate your needs clearly. Your ruling planet Venus enhances your natural magnetism.',
  },
  gemini: {
    today: 'Your mind is a lightning rod for ideas today, Gemini. Mercury fuels your curiosity — dive into research, start conversations, write down your visions. Just remember to breathe between inspirations.',
    week: 'Communication takes center stage this week. A heartfelt conversation could resolve lingering misunderstandings. Your adaptability opens doors — be ready to pivot when opportunity knocks midweek.',
    month: 'This month activates your adventurous spirit. Travel plans or educational pursuits come into focus. Your dual nature helps you see both sides of every situation — a gift in negotiations but a challenge in matters of the heart.',
  },
  cancer: {
    today: 'The Moon intensifies your emotional depth today, Cancer. Your intuition is a superpower — trust that feeling in your gut about a situation. Create a cozy sanctuary at home to recharge your sensitive spirit.',
    week: 'Family matters demand attention this week. A domestic decision requires your nurturing wisdom. Creative projects flourish under Venus\'s influence — express your emotions through art or cooking.',
    month: 'Career and home life seek balance this month. A full moon illuminates your professional path while Saturn asks you to honor your emotional needs. Your protective nature is beautiful — just don\'t build walls so high that you can\'t receive love.',
  },
  leo: {
    today: 'The Sun empowers your natural radiance today, Leo. You\'re magnetic — own your spotlight without dimming others. Creative expression flows freely; perform, create, and share your unique gifts with the world.',
    week: 'Romance sparkles this week as Venus enhances your charm. A passionate connection deepens or a new flame ignites. Leadership opportunities emerge at work — your confidence inspires others.',
    month: 'This month calls you to balance pride with humility. Jupiter expands your creative endeavors while Saturn asks for disciplined effort. Your generous heart attracts loyal allies — nurture those connections.',
  },
  virgo: {
    today: 'Mercury sharpens your analytical edge today, Virgo. Your attention to detail is unmatched — apply it to solving a persistent problem. Just remember that perfection is a direction, not a destination.',
    week: 'Health and wellness come into focus this week. A new routine or healing practice could transform your vitality. Service to others brings deep satisfaction, but don\'t neglect your own needs.',
    month: 'Your practical wisdom is in high demand this month. Relationship dynamics evolve as you learn to receive as generously as you give. A financial opportunity requires careful analysis — trust your methodical approach.',
  },
  libra: {
    today: 'Venus enhances your diplomatic gifts today, Libra. Harmony is your superpower — use it to bridge divides. Your aesthetic sense is heightened; surround yourself with beauty and art.',
    week: 'Relationships take center stage this week. A partnership decision requires your famous balanced perspective. Creative collaborations flourish when you honor both your needs and others\'.',
    month: 'This month asks you to find balance between giving and receiving. The scales tip toward self-care as Saturn reminds you that you can\'t pour from an empty cup. Social connections bring joy and opportunity.',
  },
  scorpio: {
    today: 'Pluto intensifies your perception today, Scorpio. You see beneath surfaces — trust your instincts about hidden dynamics. Your transformative power is at its peak; release what no longer serves your evolution.',
    week: 'Deep conversations reveal truths this week. A financial matter requires your investigative skills. Emotional intimacy deepens when you allow yourself to be vulnerable with a trusted confidant.',
    month: 'This month brings profound transformation. The full moon illuminates your relationships, revealing what needs to evolve. Your resilience is remarkable — use your power of regeneration to rise renewed.',
  },
  sagittarius: {
    today: 'Jupiter expands your horizons today, Sagittarius. Adventure calls — follow it, even if just through a book or conversation. Your optimism is contagious; share your vision with someone who inspires you.',
    week: 'Travel or educational opportunities arise this week. A philosophical discussion could shift your perspective in beautiful ways. Your honesty is refreshing, but temper it with tact when discussing sensitive topics.',
    month: 'Your quest for meaning deepens this month. Spiritual or educational pursuits bring fulfillment. Relationship dynamics ask you to balance freedom with commitment — the right partner will understand your need for space.',
  },
  capricorn: {
    today: 'Saturn rewards your discipline today, Capricorn. Your hard work is yielding visible results. Take a moment to acknowledge how far you\'ve come before setting your sights on the next summit.',
    week: 'Career developments demand your strategic mind this week. A leadership opportunity could materialize — you\'re ready for it. Don\'t let ambition consume all your energy; leave room for joy and connection.',
    month: 'This month blends ambition with emotional intelligence. The new moon in your sign offers a powerful moment for setting intentions. Your stoic exterior hides a deep well of feeling — sharing your heart strengthens your connections.',
  },
  aquarius: {
    today: 'Uranus sparks innovation today, Aquarius. Your unique perspective is needed — share your unconventional ideas. Social causes call to you; your vision for a better world inspires those around you.',
    week: 'Community connections energize you this week. A group project or social gathering could lead to meaningful collaborations. Your intellectual approach to emotions may seem detached, but your loyalty runs deep.',
    month: 'Your humanitarian spirit is activated this month. A friendship could evolve into something deeper or teach you an important lesson. Balance your ideals with practical action — dreams need feet to walk.',
  },
  pisces: {
    today: 'Neptune heightens your intuition today, Pisces. Your dreamy nature is a gift — let your imagination guide creative work. The boundary between worlds is thin; pay attention to synchronicities and signs.',
    week: 'Artistic inspiration flows abundantly this week. A creative project captures your soul\'s attention. Your compassion is a gift, but guard against absorbing others\' emotional burdens as your own.',
    month: 'This month deepens your spiritual connection. The full moon illuminates your subconscious, revealing patterns ready to heal. Your empathic nature is beautiful — channel it into creative expression rather than emotional rescue.',
  },
};

export function getHoroscope(sign, period = 'today') {
  const key = sign?.toLowerCase();
  return DAILY_HOROSCOPES[key]?.[period] || 'The stars are aligning for you today. Stay open to the magic unfolding in your life.';
}

const CHAT_RESPONSES = {
  love: (chart) => `Looking at your Venus in ${chart.planets.Venus?.sign?.name || 'a dynamic sign'}, your approach to love is deeply influenced by this placement. Venus represents how you give and receive affection. With your Sun in ${chart.sun.name}, you seek relationships that honor your core identity. The Moon in ${chart.moon.name} reveals your emotional needs — you feel most secure when your partner understands your intuitive rhythms.`,
  career: (chart) => `Your Midheaven and Saturn in ${chart.planets.Saturn?.sign?.name || 'a strategic position'} suggest a career path that requires patience and mastery. Your Sun in ${chart.sun.name} thrives when your work aligns with your authentic self. The current transits suggest powerful opportunities for professional growth when you combine your natural ${chart.sun.element.toLowerCase()} initiative with disciplined effort.`,
  health: (chart) => `With your ${chart.dominantElement} element dominating your chart, your wellness routine should honor this energy. Your Moon in ${chart.moon.name} indicates that emotional health directly impacts your physical vitality. The ${chart.planets.Mars?.sign?.name || 'current'} Mars placement suggests channeling energy through consistent movement rather than sporadic bursts of activity.`,
  spirituality: (chart) => `Your Neptune placement and the 12th house in your chart reveal a profound spiritual connection. As a ${chart.sun.name} with a ${chart.moon.name} Moon, your spiritual path blends ${chart.sun.element.toLowerCase()} action with ${chart.moon.element.toLowerCase()} intuition. The North Node in ${chart.planets.NorthNode?.sign?.name || 'a significant position'} points toward your soul\'s evolutionary direction.`,
  default: (chart) => `Based on your birth chart, with Sun in ${chart.sun.name} (${chart.sun.symbol}) and Moon in ${chart.moon.name} (${chart.moon.symbol}), you have a fascinating cosmic signature. Your rising sign is ${chart.rising.name} (${chart.rising.symbol}), which colors how the world perceives you. The dominant element in your chart is ${chart.dominantElement}, suggesting your natural energy flows through ${chart.dominantElement.toLowerCase()} expression. Your chart shows ${chart.aspects.length} major planetary aspects — the strongest being between ${chart.aspects[0]?.planet1 || 'key planets'} and ${chart.aspects[0]?.planet2 || 'significant points'}.`,
};

export function getAIResponse(userMessage, chart) {
  const msg = userMessage.toLowerCase();
  let category = 'default';
  if (msg.includes('love') || msg.includes('romance') || msg.includes('relationship') || msg.includes('heart')) category = 'love';
  else if (msg.includes('career') || msg.includes('job') || msg.includes('work') || msg.includes('money')) category = 'career';
  else if (msg.includes('health') || msg.includes('wellness') || msg.includes('body') || msg.includes('fitness')) category = 'health';
  else if (msg.includes('spiritual') || msg.includes('soul') || msg.includes('purpose') || msg.includes('destiny')) category = 'spirituality';

  const baseResponse = CHAT_RESPONSES[category](chart);
  const followUp = category === 'default'
    ? ' What specific area of your life would you like to explore — love, career, health, or spiritual growth?'
    : ' Would you like me to dive deeper into any particular aspect of this reading?';

  return baseResponse + followUp;
}
