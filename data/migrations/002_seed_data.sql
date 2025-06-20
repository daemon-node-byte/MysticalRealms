-- =====================================================
-- MYSTICAL REALMS - SEED DATA MIGRATION
-- =====================================================
-- 
-- This migration populates the database with essential reference data
-- including tarot cards, zodiac signs, planets, houses, and quiz categories.
-- 
-- This data is required for the application to function properly and
-- provides the foundation for readings, quizzes, and astrological calculations.
-- =====================================================

-- =====================================================
-- 1. TAROT CARDS REFERENCE DATA
-- =====================================================

-- Insert all 78 tarot cards (22 Major Arcana + 56 Minor Arcana)

-- MAJOR ARCANA (22 cards)
INSERT INTO tarot_cards (name, suit, number, keywords, reversed_keywords, upright_meaning, reversed_meaning, image_url, order_index) VALUES
('The Fool', 'Major', '0', ARRAY['beginnings', 'innocence', 'freedom', 'adventure'], ARRAY['naivety', 'foolishness', 'recklessness', 'poor judgment'], 'New beginnings, spontaneity, free spirit, leap of faith', 'Naivety, foolishness, recklessness, risk-taking', '/tarot-cards/major/00-fool.jpg', 0),
('The Magician', 'Major', 'I', ARRAY['manifestation', 'power', 'resourcefulness', 'action'], ARRAY['manipulation', 'poor planning', 'untapped talents', 'trickery'], 'Taking action, willpower, inspired focus, manifestation', 'Manipulation, poor planning, untapped talents', '/tarot-cards/major/01-magician.jpg', 1),
('The High Priestess', 'Major', 'II', ARRAY['intuition', 'mystery', 'spirituality', 'wisdom'], ARRAY['secrets', 'disconnected intuition', 'withdrawal', 'lack of center'], 'Inner voice, divine feminine, secrets, subconscious', 'Secrets withheld, disconnected intuition, withdrawal', '/tarot-cards/major/02-high-priestess.jpg', 2),
('The Empress', 'Major', 'III', ARRAY['fertility', 'beauty', 'nurturing', 'abundance'], ARRAY['dependence', 'creative block', 'smothering', 'neglect'], 'Abundance, motherhood, nature, creative expression', 'Dependence, creative block, smothering, neglect', '/tarot-cards/major/03-empress.jpg', 3),
('The Emperor', 'Major', 'IV', ARRAY['authority', 'structure', 'control', 'leadership'], ARRAY['tyranny', 'rigidity', 'domination', 'lack of discipline'], 'Leadership, stability, protection, authority figure', 'Tyranny, rigidity, domination, lack of discipline', '/tarot-cards/major/04-emperor.jpg', 4),
('The Hierophant', 'Major', 'V', ARRAY['tradition', 'conformity', 'morality', 'ethics'], ARRAY['rebellion', 'subversiveness', 'restriction', 'challenging tradition'], 'Traditional values, institutions, spiritual guidance', 'Rebellion, subversiveness, new approaches, restriction', '/tarot-cards/major/05-hierophant.jpg', 5),
('The Lovers', 'Major', 'VI', ARRAY['love', 'relationships', 'choices', 'values'], ARRAY['disharmony', 'imbalance', 'misalignment', 'bad decisions'], 'Love, harmony, relationships, values alignment', 'Disharmony, imbalance, misalignment of values', '/tarot-cards/major/06-lovers.jpg', 6),
('The Chariot', 'Major', 'VII', ARRAY['control', 'willpower', 'success', 'determination'], ARRAY['lack of control', 'lack of direction', 'aggression', 'opposition'], 'Control, willpower, success, direction, hard work', 'Lack of control, lack of direction, aggression', '/tarot-cards/major/07-chariot.jpg', 7),
('Strength', 'Major', 'VIII', ARRAY['courage', 'inner strength', 'patience', 'compassion'], ARRAY['self-doubt', 'weakness', 'insecurity', 'lack of confidence'], 'Inner strength, courage, patience, control, compassion', 'Self-doubt, weakness, insecurity, lack of confidence', '/tarot-cards/major/08-strength.jpg', 8),
('The Hermit', 'Major', 'IX', ARRAY['introspection', 'searching', 'guidance', 'solitude'], ARRAY['isolation', 'loneliness', 'withdrawal', 'lost direction'], 'Soul searching, introspection, inner guidance', 'Isolation, loneliness, withdrawal, lost your way', '/tarot-cards/major/09-hermit.jpg', 9),
('Wheel of Fortune', 'Major', 'X', ARRAY['good luck', 'karma', 'life cycles', 'destiny'], ARRAY['bad luck', 'lack of control', 'resistance to change', 'breaking cycles'], 'Good luck, karma, life cycles, destiny, turning point', 'Bad luck, lack of control, clinging to control', '/tarot-cards/major/10-wheel-of-fortune.jpg', 10),
('Justice', 'Major', 'XI', ARRAY['justice', 'fairness', 'truth', 'cause and effect'], ARRAY['unfairness', 'lack of accountability', 'dishonesty', 'bias'], 'Justice, fairness, truth, cause and effect, law', 'Unfairness, lack of accountability, dishonesty', '/tarot-cards/major/11-justice.jpg', 11),
('The Hanged Man', 'Major', 'XII', ARRAY['surrender', 'letting go', 'suspension', 'sacrifice'], ARRAY['delays', 'resistance', 'stalling', 'indecision'], 'Letting go, surrender, new perspective, enlightenment', 'Delays, resistance, stalling, indecision', '/tarot-cards/major/12-hanged-man.jpg', 12),
('Death', 'Major', 'XIII', ARRAY['endings', 'change', 'transformation', 'transition'], ARRAY['resistance to change', 'stagnation', 'fear of endings', 'incomplete transformation'], 'Endings, change, transformation, transition', 'Resistance to change, personal transformation', '/tarot-cards/major/13-death.jpg', 13),
('Temperance', 'Major', 'XIV', ARRAY['balance', 'moderation', 'patience', 'purpose'], ARRAY['imbalance', 'excess', 'lack of long-term vision', 'discord'], 'Balance, moderation, patience, purpose, meaning', 'Imbalance, excess, self-healing, re-alignment', '/tarot-cards/major/14-temperance.jpg', 14),
('The Devil', 'Major', 'XV', ARRAY['bondage', 'addiction', 'sexuality', 'materialism'], ARRAY['releasing limitations', 'independence', 'freedom from addiction', 'spiritual awakening'], 'Bondage, addiction, sexuality, materialism', 'Releasing limiting beliefs, exploring dark thoughts', '/tarot-cards/major/15-devil.jpg', 15),
('The Tower', 'Major', 'XVI', ARRAY['sudden change', 'upheaval', 'chaos', 'revelation'], ARRAY['personal transformation', 'fear of change', 'avoiding disaster', 'gradual change'], 'Sudden change, upheaval, chaos, revelation, awakening', 'Personal transformation, fear of change, averting disaster', '/tarot-cards/major/16-tower.jpg', 16),
('The Star', 'Major', 'XVII', ARRAY['hope', 'faith', 'purpose', 'renewal'], ARRAY['lack of faith', 'despair', 'disconnection', 'discouragement'], 'Hope, faith, purpose, renewal, spirituality', 'Lack of faith, despair, self-trust, disconnection', '/tarot-cards/major/17-star.jpg', 17),
('The Moon', 'Major', 'XVIII', ARRAY['illusion', 'fear', 'anxiety', 'subconscious'], ARRAY['release of fear', 'clarity', 'overcoming anxiety', 'facing reality'], 'Illusion, fear, anxiety, subconscious, intuition', 'Release of fear, repressed emotion, inner confusion', '/tarot-cards/major/18-moon.jpg', 18),
('The Sun', 'Major', 'XIX', ARRAY['positivity', 'fun', 'warmth', 'success'], ARRAY['temporary clouds', 'lack of enthusiasm', 'delayed happiness', 'inner child healing'], 'Positivity, fun, warmth, success, vitality', 'Inner child, feeling down, overly optimistic', '/tarot-cards/major/19-sun.jpg', 19),
('Judgement', 'Major', 'XX', ARRAY['judgement', 'rebirth', 'inner calling', 'absolution'], ARRAY['self-doubt', 'inner critic', 'ignoring the call', 'harsh self-judgment'], 'Judgement, rebirth, inner calling, absolution', 'Self-doubt, inner critic, ignoring the call', '/tarot-cards/major/20-judgement.jpg', 20),
('The World', 'Major', 'XXI', ARRAY['completion', 'integration', 'accomplishment', 'travel'], ARRAY['seeking closure', 'shortcuts', 'incomplete goals', 'lack of achievement'], 'Completion, integration, accomplishment, travel', 'Seeking personal closure, short-cut to success', '/tarot-cards/major/21-world.jpg', 21);

-- MINOR ARCANA - WANDS (14 cards)
INSERT INTO tarot_cards (name, suit, number, keywords, reversed_keywords, upright_meaning, reversed_meaning, image_url, order_index) VALUES
('Ace of Wands', 'Wands', 'Ace', ARRAY['inspiration', 'new opportunities', 'growth'], ARRAY['lack of energy', 'lack of passion', 'delays', 'creative blocks'], 'Inspiration, new opportunities, growth, potential', 'Lack of energy, lack of passion, boredom', '/tarot-cards/wands/ace-wands.jpg', 22),
('Two of Wands', 'Wands', '2', ARRAY['planning', 'making decisions', 'leaving comfort zone'], ARRAY['fear of unknown', 'lack of planning', 'bad decisions', 'playing it safe'], 'Planning, making decisions, leaving comfort zone', 'Fear of unknown, lack of planning, bad decisions', '/tarot-cards/wands/02-wands.jpg', 23),
('Three of Wands', 'Wands', '3', ARRAY['expansion', 'foresight', 'overseas opportunities'], ARRAY['playing small', 'lack of foresight', 'delays', 'failed plans'], 'Expansion, foresight, overseas opportunities', 'Playing small, lack of foresight, unexpected delays', '/tarot-cards/wands/03-wands.jpg', 24),
('Four of Wands', 'Wands', '4', ARRAY['celebration', 'harmony', 'home', 'marriage'], ARRAY['personal celebration', 'inner harmony', 'family conflict', 'unstable foundations'], 'Celebration, harmony, home, marriage, reunion', 'Personal celebration, inner harmony, conflict with others', '/tarot-cards/wands/04-wands.jpg', 25),
('Five of Wands', 'Wands', '5', ARRAY['conflict', 'disagreements', 'competition'], ARRAY['inner conflict', 'conflict avoidance', 'resolution', 'cooperation'], 'Conflict, disagreements, competition, tension', 'Inner conflict, conflict avoidance, tension release', '/tarot-cards/wands/05-wands.jpg', 26),
('Six of Wands', 'Wands', '6', ARRAY['success', 'public recognition', 'progress'], ARRAY['private achievement', 'self-doubt', 'lack of recognition', 'delays in success'], 'Success, public recognition, progress, self-confidence', 'Private achievement, personal definition of success', '/tarot-cards/wands/06-wands.jpg', 27),
('Seven of Wands', 'Wands', '7', ARRAY['challenge', 'competition', 'protection'], ARRAY['exhaustion', 'giving up', 'overwhelmed', 'defensive'], 'Challenge, competition, protection, perseverance', 'Exhaustion, giving up, overwhelmed', '/tarot-cards/wands/07-wands.jpg', 28),
('Eight of Wands', 'Wands', '8', ARRAY['movement', 'fast paced change', 'action'], ARRAY['delays', 'frustration', 'resisting change', 'internal alignment'], 'Movement, fast paced change, action, alignment', 'Delays, frustration, resisting change, internal alignment', '/tarot-cards/wands/08-wands.jpg', 29),
('Nine of Wands', 'Wands', '9', ARRAY['resilience', 'courage', 'persistence'], ARRAY['inner resources', 'struggle', 'overwhelm', 'defensive'], 'Resilience, courage, persistence, test of faith', 'Inner resources, struggle, overwhelm, defensive', '/tarot-cards/wands/09-wands.jpg', 30),
('Ten of Wands', 'Wands', '10', ARRAY['burden', 'extra responsibility', 'hard work'], ARRAY['doing it all', 'carrying burden', 'delegation', 'release'], 'Burden, extra responsibility, hard work, completion', 'Doing it all, carrying the burden, delegation', '/tarot-cards/wands/10-wands.jpg', 31),
('Page of Wands', 'Wands', 'Page', ARRAY['inspiration', 'ideas', 'discovery'], ARRAY['lack of direction', 'procrastination', 'creative blocks', 'impulsiveness'], 'Inspiration, ideas, discovery, limitless potential', 'Lack of direction, procrastination, creative blocks', '/tarot-cards/wands/page-wands.jpg', 32),
('Knight of Wands', 'Wands', 'Knight', ARRAY['action', 'adventure', 'fearlessness'], ARRAY['anger', 'impulsiveness', 'recklessness', 'haste'], 'Action, adventure, fearlessness, impulsiveness', 'Anger, impulsiveness, recklessness, haste', '/tarot-cards/wands/knight-wands.jpg', 33),
('Queen of Wands', 'Wands', 'Queen', ARRAY['courage', 'confidence', 'independence'], ARRAY['self-respect', 'self-confidence', 'introverted', 're-establish self'], 'Courage, confidence, independence, social butterfly', 'Self-respect, self-confidence, introverted, re-establish sense of self', '/tarot-cards/wands/queen-wands.jpg', 34),
('King of Wands', 'Wands', 'King', ARRAY['leadership', 'vision', 'honour'], ARRAY['impulsiveness', 'haste', 'ruthless', 'high expectations'], 'Leadership, vision, honour, big picture, taking control', 'Impulsiveness, haste, ruthless, high expectations', '/tarot-cards/wands/king-wands.jpg', 35);

-- MINOR ARCANA - CUPS (14 cards)
INSERT INTO tarot_cards (name, suit, number, keywords, reversed_keywords, upright_meaning, reversed_meaning, image_url, order_index) VALUES
('Ace of Cups', 'Cups', 'Ace', ARRAY['love', 'new relationships', 'compassion'], ARRAY['self-love', 'repressed emotions', 'emotional blockages'], 'Love, new relationships, compassion, creativity', 'Self-love, intuition, repressed emotions', '/tarot-cards/cups/ace-cups.jpg', 36),
('Two of Cups', 'Cups', '2', ARRAY['unified love', 'partnership', 'attraction'], ARRAY['self-love', 'break-ups', 'disharmony'], 'Unified love, partnership, attraction, relationships', 'Self-love, break-ups, disharmony, distrust', '/tarot-cards/cups/02-cups.jpg', 37),
('Three of Cups', 'Cups', '3', ARRAY['celebration', 'friendship', 'creativity'], ARRAY['independence', 'alone time', 'excess'], 'Celebration, friendship, creativity, collaborations', 'Independence, alone time, hardcore partying, ''three''s a crowd''', '/tarot-cards/cups/03-cups.jpg', 38),
('Four of Cups', 'Cups', '4', ARRAY['meditation', 'contemplation', 'apathy'], ARRAY['retreat', 'withdrawal', 'self-absorption'], 'Meditation, contemplation, apathy, reevaluation', 'Retreat, withdrawal, checking in for answers', '/tarot-cards/cups/04-cups.jpg', 39),
('Five of Cups', 'Cups', '5', ARRAY['regret', 'failure', 'disappointment'], ARRAY['personal setbacks', 'self-forgiveness', 'recovery'], 'Regret, failure, disappointment, pessimism', 'Personal setbacks, self-forgiveness, moving on', '/tarot-cards/cups/05-cups.jpg', 40),
('Six of Cups', 'Cups', '6', ARRAY['revisiting the past', 'childhood memories', 'innocence'], ARRAY['living in past', 'forgiveness', 'maturity'], 'Revisiting the past, childhood memories, innocence', 'Living in the past, forgiveness, lacking playfulness', '/tarot-cards/cups/06-cups.jpg', 41),
('Seven of Cups', 'Cups', '7', ARRAY['opportunities', 'choices', 'wishful thinking'], ARRAY['alignment', 'personal values', 'overwhelming choices'], 'Opportunities, choices, wishful thinking, illusion', 'Alignment, personal values, overwhelmed by choices', '/tarot-cards/cups/07-cups.jpg', 42),
('Eight of Cups', 'Cups', '8', ARRAY['disappointment', 'abandonment', 'withdrawal'], ARRAY['trying again', 'indecision', 'aimless drifting'], 'Disappointment, abandonment, withdrawal, escapism', 'Trying one more time, indecision, aimless drifting', '/tarot-cards/cups/08-cups.jpg', 43),
('Nine of Cups', 'Cups', '9', ARRAY['contentment', 'satisfaction', 'gratitude'], ARRAY['inner happiness', 'materialism', 'dissatisfaction'], 'Contentment, satisfaction, gratitude, wish come true', 'Inner happiness, materialism, dissatisfaction', '/tarot-cards/cups/09-cups.jpg', 44),
('Ten of Cups', 'Cups', '10', ARRAY['divine love', 'blissful relationships', 'harmony'], ARRAY['disconnection', 'misaligned values', 'relationship struggles'], 'Divine love, blissful relationships, harmony, alignment', 'Disconnection, misaligned values, struggling relationships', '/tarot-cards/cups/10-cups.jpg', 45),
('Page of Cups', 'Cups', 'Page', ARRAY['creative opportunities', 'intuitive messages', 'curiosity'], ARRAY['new ideas', 'doubting intuition', 'creative blocks'], 'Creative opportunities, intuitive messages, curiosity', 'New ideas, doubting intuition, creative blocks', '/tarot-cards/cups/page-cups.jpg', 46),
('Knight of Cups', 'Cups', 'Knight', ARRAY['creativity', 'romance', 'charm'], ARRAY['overactive imagination', 'unrealistic', 'jealousy'], 'Creativity, romance, charm, imagination, beauty', 'Overactive imagination, unrealistic, jealousy', '/tarot-cards/cups/knight-cups.jpg', 47),
('Queen of Cups', 'Cups', 'Queen', ARRAY['compassion', 'calm', 'comfort'], ARRAY['self-compassion', 'inner feelings', 'co-dependency'], 'Compassion, calm, comfort, intuition, inner feelings', 'Self-compassion, inner feelings, self-care, co-dependency', '/tarot-cards/cups/queen-cups.jpg', 48),
('King of Cups', 'Cups', 'King', ARRAY['emotional balance', 'generous', 'diplomatic'], ARRAY['self-compassion', 'moodiness', 'emotional manipulation'], 'Emotional balance, generous, diplomatic, caring', 'Self-compassion, inner feelings, moodiness, emotionally manipulative', '/tarot-cards/cups/king-cups.jpg', 49);

-- MINOR ARCANA - SWORDS (14 cards)
INSERT INTO tarot_cards (name, suit, number, keywords, reversed_keywords, upright_meaning, reversed_meaning, image_url, order_index) VALUES
('Ace of Swords', 'Swords', 'Ace', ARRAY['breakthrough', 'clarity', 'sharp mind'], ARRAY['inner clarity', 'confusion', 'clouded judgment'], 'Breakthrough, clarity, sharp mind, new ideas', 'Inner clarity, re-thinking an idea, clouded judgement', '/tarot-cards/swords/ace-swords.jpg', 50),
('Two of Swords', 'Swords', '2', ARRAY['difficult decisions', 'weighing up options', 'indecision'], ARRAY['indecision', 'confusion', 'information overload'], 'Difficult decisions, weighing up options, indecision', 'Indecision, confusion, information overload', '/tarot-cards/swords/02-swords.jpg', 51),
('Three of Swords', 'Swords', '3', ARRAY['heartbreak', 'emotional pain', 'sorrow'], ARRAY['healing', 'forgiveness', 'recovery'], 'Heartbreak, emotional pain, sorrow, grief', 'Negative self-talk, releasing pain, optimism', '/tarot-cards/swords/03-swords.jpg', 52),
('Four of Swords', 'Swords', '4', ARRAY['rest', 'relaxation', 'meditation'], ARRAY['exhaustion', 'burn-out', 'stagnation'], 'Rest, relaxation, meditation, contemplation', 'Exhaustion, burn-out, deep contemplation, stagnation', '/tarot-cards/swords/04-swords.jpg', 53),
('Five of Swords', 'Swords', '5', ARRAY['conflict', 'disagreements', 'competition'], ARRAY['reconciliation', 'making amends', 'past resentment'], 'Conflict, disagreements, competition, defeat', 'Reconciliation, making amends, past resentment', '/tarot-cards/swords/05-swords.jpg', 54),
('Six of Swords', 'Swords', '6', ARRAY['transition', 'change', 'rite of passage'], ARRAY['personal transition', 'resistance to change', 'unfinished business'], 'Transition, change, rite of passage, releasing baggage', 'Personal transition, resistance to change, unfinished business', '/tarot-cards/swords/06-swords.jpg', 55),
('Seven of Swords', 'Swords', '7', ARRAY['betrayal', 'deception', 'getting away with something'], ARRAY['imposter syndrome', 'self-deceit', 'keeping secrets'], 'Betrayal, deception, getting away with something', 'Imposter syndrome, self-deceit, keeping secrets', '/tarot-cards/swords/07-swords.jpg', 56),
('Eight of Swords', 'Swords', '8', ARRAY['negative thinking', 'restricted freedom', 'imprisonment'], ARRAY['self-limiting beliefs', 'inner critic', 'releasing negativity'], 'Negative thinking, restricted freedom, imprisonment', 'Self-limiting beliefs, inner critic, releasing negative thoughts', '/tarot-cards/swords/08-swords.jpg', 57),
('Nine of Swords', 'Swords', '9', ARRAY['anxiety', 'worry', 'fear'], ARRAY['inner turmoil', 'deep fears', 'releasing worry'], 'Anxiety, worry, fear, depression, nightmares', 'Inner turmoil, deep-seated fears, secrets, releasing worry', '/tarot-cards/swords/09-swords.jpg', 58),
('Ten of Swords', 'Swords', '10', ARRAY['painful endings', 'deep wounds', 'betrayal'], ARRAY['recovery', 'regeneration', 'resisting endings'], 'Painful endings, deep wounds, betrayal, loss', 'Recovery, regeneration, resisting an inevitable end', '/tarot-cards/swords/10-swords.jpg', 59),
('Page of Swords', 'Swords', 'Page', ARRAY['new ideas', 'curiosity', 'thirst for knowledge'], ARRAY['self-expression', 'all talk no action', 'haphazard action'], 'New ideas, curiosity, thirst for knowledge, new ways of communicating', 'Self-expression, all talk and no action, haphazard action', '/tarot-cards/swords/page-swords.jpg', 60),
('Knight of Swords', 'Swords', 'Knight', ARRAY['ambitious', 'action-oriented', 'driven to succeed'], ARRAY['restless', 'unfocused', 'impulsive'], 'Ambitious, action-oriented, driven to succeed, fast thinking', 'Restless, unfocused, impulsive, burn-out', '/tarot-cards/swords/knight-swords.jpg', 61),
('Queen of Swords', 'Swords', 'Queen', ARRAY['independent', 'unbiased judgement', 'clear boundaries'], ARRAY['overly emotional', 'easily influenced', 'harsh judgment'], 'Independent, unbiased judgement, clear boundaries', 'Overly-emotional, easily influenced, unable to think for yourself', '/tarot-cards/swords/queen-swords.jpg', 62),
('King of Swords', 'Swords', 'King', ARRAY['mental clarity', 'intellectual power', 'authority'], ARRAY['quiet power', 'inner truth', 'misuse of power'], 'Mental clarity, intellectual power, authority, truth', 'Quiet power, inner truth, misuse of power, manipulation', '/tarot-cards/swords/king-swords.jpg', 63);

-- MINOR ARCANA - PENTACLES (14 cards)
INSERT INTO tarot_cards (name, suit, number, keywords, reversed_keywords, upright_meaning, reversed_meaning, image_url, order_index) VALUES
('Ace of Pentacles', 'Pentacles', 'Ace', ARRAY['manifestation', 'new financial opportunity', 'abundance'], ARRAY['lost opportunity', 'poor planning', 'financial blocks'], 'Manifestation, new financial opportunity, abundance', 'Lost opportunity, lack of planning, poor financial decisions', '/tarot-cards/pentacles/ace-pentacles.jpg', 64),
('Two of Pentacles', 'Pentacles', '2', ARRAY['multiple priorities', 'time management', 'prioritisation'], ARRAY['over-committed', 'disorganisation', 'poor balance'], 'Multiple priorities, time management, prioritisation', 'Over-committed, disorganisation, reprioritisation', '/tarot-cards/pentacles/02-pentacles.jpg', 65),
('Three of Pentacles', 'Pentacles', '3', ARRAY['collaboration', 'learning', 'implementation'], ARRAY['disharmony', 'misalignment', 'working alone'], 'Collaboration, learning, implementation, construction', 'Disharmony, misalignment, working alone', '/tarot-cards/pentacles/03-pentacles.jpg', 66),
('Four of Pentacles', 'Pentacles', '4', ARRAY['saving money', 'security', 'conservatism'], ARRAY['over-spending', 'greed', 'self-protection'], 'Saving money, security, conservatism, scarcity', 'Over-spending, greed, self-protection', '/tarot-cards/pentacles/04-pentacles.jpg', 67),
('Five of Pentacles', 'Pentacles', '5', ARRAY['financial loss', 'poverty', 'lack mindset'], ARRAY['recovery', 'spiritual poverty', 'isolation'], 'Financial loss, poverty, lack mindset, isolation', 'Recovery from financial loss, spiritual poverty', '/tarot-cards/pentacles/05-pentacles.jpg', 68),
('Six of Pentacles', 'Pentacles', '6', ARRAY['giving', 'receiving', 'sharing wealth'], ARRAY['self-care', 'unpaid debts', 'one-sided charity'], 'Giving, receiving, sharing wealth, generosity', 'Self-care, unpaid debts, one-sided charity', '/tarot-cards/pentacles/06-pentacles.jpg', 69),
('Seven of Pentacles', 'Pentacles', '7', ARRAY['long-term view', 'sustainable results', 'perseverance'], ARRAY['lack of vision', 'limited success', 'no reward'], 'Long-term view, sustainable results, perseverance', 'Lack of long-term vision, limited success, no reward', '/tarot-cards/pentacles/07-pentacles.jpg', 70),
('Eight of Pentacles', 'Pentacles', '8', ARRAY['apprenticeship', 'repetitive tasks', 'mastery'], ARRAY['self-development', 'perfectionism', 'misdirected activity'], 'Apprenticeship, repetitive tasks, mastery, skill development', 'Self-development, perfectionism, misdirected activity', '/tarot-cards/pentacles/08-pentacles.jpg', 71),
('Nine of Pentacles', 'Pentacles', '9', ARRAY['abundance', 'luxury', 'self-sufficiency'], ARRAY['self-worth', 'over-investment', 'hustling'], 'Abundance, luxury, self-sufficiency, financial independence', 'Self-worth, over-investment in work, hustling', '/tarot-cards/pentacles/09-pentacles.jpg', 72),
('Ten of Pentacles', 'Pentacles', '10', ARRAY['wealth', 'financial security', 'family'], ARRAY['financial failure', 'dark side of wealth', 'family conflict'], 'Wealth, financial security, family, long-term success', 'The dark side of wealth, financial failure or loss', '/tarot-cards/pentacles/10-pentacles.jpg', 73),
('Page of Pentacles', 'Pentacles', 'Page', ARRAY['manifestation', 'financial opportunity', 'skill development'], ARRAY['lack of progress', 'procrastination', 'learning from failure'], 'Manifestation, financial opportunity, skill development', 'Lack of progress, procrastination, learn from failure', '/tarot-cards/pentacles/page-pentacles.jpg', 74),
('Knight of Pentacles', 'Pentacles', 'Knight', ARRAY['hard work', 'productivity', 'routine'], ARRAY['self-discipline', 'boredom', 'perfectionism'], 'Hard work, productivity, routine, conservatism', 'Self-discipline, boredom, feeling ''stuck'', perfectionism', '/tarot-cards/pentacles/knight-pentacles.jpg', 75),
('Queen of Pentacles', 'Pentacles', 'Queen', ARRAY['nurturing', 'practical', 'providing financially'], ARRAY['financial independence', 'self-care', 'work-home conflict'], 'Nurturing, practical, providing financially, a working parent', 'Financial independence, self-care, work-home conflict', '/tarot-cards/pentacles/queen-pentacles.jpg', 76),
('King of Pentacles', 'Pentacles', 'King', ARRAY['abundance', 'wealthy', 'business leader'], ARRAY['financially inept', 'obsessed with wealth', 'status obsession'], 'Abundance, wealthy, business leader, provider, discipline', 'Financially inept, obsessed with wealth and status', '/tarot-cards/pentacles/king-pentacles.jpg', 77);

-- =====================================================
-- 2. ASTROLOGY REFERENCE DATA
-- =====================================================

-- Zodiac Signs
INSERT INTO zodiac_signs (name, element, modality, ruling_planet, symbol, order_index, keywords, description) VALUES
('Aries', 'Fire', 'Cardinal', 'Mars', '♈', 1, ARRAY['leadership', 'courage', 'independence', 'energy'], 'The first sign of the zodiac, representing new beginnings and pioneering spirit.'),
('Taurus', 'Earth', 'Fixed', 'Venus', '♉', 2, ARRAY['stability', 'loyalty', 'sensuality', 'determination'], 'The bull represents steadfastness, reliability, and appreciation for beauty.'),
('Gemini', 'Air', 'Mutable', 'Mercury', '♊', 3, ARRAY['communication', 'curiosity', 'adaptability', 'wit'], 'The twins symbolize duality, communication, and intellectual versatility.'),
('Cancer', 'Water', 'Cardinal', 'Moon', '♋', 4, ARRAY['nurturing', 'intuition', 'home', 'emotion'], 'The crab represents protection, emotional depth, and strong family bonds.'),
('Leo', 'Fire', 'Fixed', 'Sun', '♌', 5, ARRAY['creativity', 'leadership', 'drama', 'generosity'], 'The lion embodies confidence, creativity, and natural leadership abilities.'),
('Virgo', 'Earth', 'Mutable', 'Mercury', '♍', 6, ARRAY['perfectionism', 'service', 'analysis', 'health'], 'The maiden represents attention to detail, service to others, and practical wisdom.'),
('Libra', 'Air', 'Cardinal', 'Venus', '♎', 7, ARRAY['balance', 'harmony', 'justice', 'relationships'], 'The scales symbolize balance, fairness, and the pursuit of harmony in relationships.'),
('Scorpio', 'Water', 'Fixed', 'Pluto', '♏', 8, ARRAY['transformation', 'intensity', 'mystery', 'power'], 'The scorpion represents depth, transformation, and the ability to regenerate.'),
('Sagittarius', 'Fire', 'Mutable', 'Jupiter', '♐', 9, ARRAY['adventure', 'philosophy', 'freedom', 'optimism'], 'The archer embodies the quest for knowledge, freedom, and higher understanding.'),
('Capricorn', 'Earth', 'Cardinal', 'Saturn', '♑', 10, ARRAY['ambition', 'discipline', 'responsibility', 'tradition'], 'The goat represents ambition, discipline, and the steady climb to success.'),
('Aquarius', 'Air', 'Fixed', 'Uranus', '♒', 11, ARRAY['innovation', 'independence', 'humanitarian', 'unconventional'], 'The water bearer symbolizes innovation, humanitarian ideals, and progressive thinking.'),
('Pisces', 'Water', 'Mutable', 'Neptune', '♓', 12, ARRAY['compassion', 'intuition', 'spirituality', 'imagination'], 'The fish represent compassion, spiritual depth, and connection to the collective unconscious.');

-- Planets
INSERT INTO planets (name, symbol, archetype, associated_signs, planet_type, order_index, keywords, description) VALUES
('Sun', '☉', 'Core identity, ego, vitality', ARRAY['Leo'], 'traditional', 1, ARRAY['identity', 'ego', 'vitality', 'leadership'], 'Represents the core self, consciousness, and life force energy.'),
('Moon', '☽', 'Emotions, instincts, subconscious', ARRAY['Cancer'], 'traditional', 2, ARRAY['emotions', 'intuition', 'nurturing', 'cycles'], 'Governs emotions, instincts, and the subconscious mind.'),
('Mercury', '☿', 'Communication, intellect, reasoning', ARRAY['Gemini', 'Virgo'], 'traditional', 3, ARRAY['communication', 'intellect', 'travel', 'learning'], 'Rules communication, thinking processes, and information exchange.'),
('Venus', '♀', 'Love, beauty, values, relationships', ARRAY['Taurus', 'Libra'], 'traditional', 4, ARRAY['love', 'beauty', 'relationships', 'values'], 'Governs love, beauty, relationships, and personal values.'),
('Mars', '♂', 'Action, desire, courage, conflict', ARRAY['Aries', 'Scorpio'], 'traditional', 5, ARRAY['action', 'energy', 'courage', 'conflict'], 'Represents drive, ambition, passion, and the warrior spirit.'),
('Jupiter', '♃', 'Growth, wisdom, expansion, luck', ARRAY['Sagittarius', 'Pisces'], 'traditional', 6, ARRAY['expansion', 'wisdom', 'luck', 'growth'], 'The great benefic, bringing growth, wisdom, and good fortune.'),
('Saturn', '♄', 'Structure, discipline, limitations, lessons', ARRAY['Capricorn', 'Aquarius'], 'traditional', 7, ARRAY['discipline', 'structure', 'responsibility', 'lessons'], 'The great teacher, bringing structure, discipline, and life lessons.'),
('Uranus', '♅', 'Revolution, innovation, sudden change', ARRAY['Aquarius'], 'modern', 8, ARRAY['innovation', 'rebellion', 'change', 'freedom'], 'Brings sudden change, innovation, and revolutionary energy.'),
('Neptune', '♆', 'Dreams, illusions, spirituality, compassion', ARRAY['Pisces'], 'modern', 9, ARRAY['spirituality', 'dreams', 'illusion', 'compassion'], 'Governs dreams, spirituality, and the dissolution of boundaries.'),
('Pluto', '♇', 'Transformation, power, death and rebirth', ARRAY['Scorpio'], 'modern', 10, ARRAY['transformation', 'power', 'rebirth', 'intensity'], 'Represents deep transformation, regeneration, and hidden power.'),
('North Node', '☊', 'Destiny, life purpose, spiritual growth', ARRAY[]::TEXT[], 'lunar_node', 11, ARRAY['destiny', 'growth', 'future', 'karma'], 'Represents the soul''s purpose, future growth, and karmic direction in this lifetime.'),
('South Node', '☋', 'Past life, natural talents, karma', ARRAY[]::TEXT[], 'lunar_node', 12, ARRAY['past', 'talents', 'karma', 'release'], 'Represents past life talents, karmic patterns to release, and natural abilities.');

-- Astrological Houses
INSERT INTO houses (number, theme, keywords, element, description) VALUES
(1, 'Self, Identity, First Impressions', ARRAY['personality', 'appearance', 'first impressions', 'new beginnings'], 'Fire', 'The house of self, governing identity, appearance, and how others perceive you.'),
(2, 'Values, Possessions, Self-Worth', ARRAY['money', 'possessions', 'values', 'self-worth'], 'Earth', 'Rules personal resources, material possessions, and what you value most.'),
(3, 'Communication, Learning, Siblings', ARRAY['communication', 'learning', 'siblings', 'short trips'], 'Air', 'Governs communication, early learning, siblings, and your immediate environment.'),
(4, 'Home, Family, Roots, Foundation', ARRAY['home', 'family', 'roots', 'childhood'], 'Water', 'The foundation of your chart, representing home, family, and emotional security.'),
(5, 'Creativity, Romance, Children, Fun', ARRAY['creativity', 'romance', 'children', 'self-expression'], 'Fire', 'Rules creative self-expression, romance, children, and recreational activities.'),
(6, 'Health, Work, Service, Daily Routine', ARRAY['health', 'work', 'service', 'daily routine'], 'Earth', 'Governs health, daily work, service to others, and routine responsibilities.'),
(7, 'Partnerships, Marriage, Open Enemies', ARRAY['partnerships', 'marriage', 'relationships', 'contracts'], 'Air', 'The house of relationships, governing partnerships, marriage, and known enemies.'),
(8, 'Transformation, Shared Resources, Death', ARRAY['transformation', 'shared resources', 'sexuality', 'occult'], 'Water', 'Rules transformation, shared resources, sexuality, and hidden matters.'),
(9, 'Philosophy, Higher Learning, Travel', ARRAY['philosophy', 'higher education', 'travel', 'spirituality'], 'Fire', 'Governs higher learning, philosophy, long-distance travel, and spiritual beliefs.'),
(10, 'Career, Reputation, Public Image', ARRAY['career', 'reputation', 'authority', 'public image'], 'Earth', 'The house of career, public reputation, and your role in society.'),
(11, 'Friendships, Groups, Hopes and Dreams', ARRAY['friendships', 'groups', 'hopes', 'social causes'], 'Air', 'Rules friendships, group associations, hopes, and humanitarian ideals.'),
(12, 'Subconscious, Hidden Enemies, Sacrifice', ARRAY['subconscious', 'hidden enemies', 'sacrifice', 'spirituality'], 'Water', 'The house of the subconscious, hidden enemies, and spiritual transcendence.');

-- =====================================================
-- 3. QUIZ CATEGORIES
-- =====================================================

INSERT INTO quiz_categories (name, description, icon, color, order_index) VALUES
('Tarot Basics', 'Learn the fundamental meanings of tarot cards and basic reading techniques', '🃏', '#8B5CF6', 1),
('Major Arcana', 'Master the 22 Major Arcana cards and their deep symbolic meanings', '🌟', '#F59E0B', 2),
('Minor Arcana', 'Understand the four suits and their elemental associations', '⚔️', '#EF4444', 3),
('Tarot Spreads', 'Explore different tarot spreads and their applications', '🔮', '#10B981', 4),
('Astrology Basics', 'Foundation knowledge of zodiac signs, planets, and houses', '♈', '#3B82F6', 5),
('Zodiac Signs', 'Deep dive into the characteristics of all 12 zodiac signs', '♊', '#EC4899', 6),
('Planetary Influences', 'Understand how planets affect personality and life events', '🪐', '#6366F1', 7),
('Houses & Aspects', 'Learn about astrological houses and planetary aspects', '🏠', '#F97316', 8),
('Mystical Symbols', 'Explore the meaning behind mystical and occult symbols', '🔯', '#84CC16', 9),
('Divination Methods', 'Learn about various forms of divination beyond tarot', '🎲', '#A855F7', 10);

-- =====================================================
-- 4. DEFAULT TAROT SPREADS
-- =====================================================

-- Create some popular tarot spreads
INSERT INTO tarot_spreads (id, user_id, name, description, is_public, layout, position_count, tags) VALUES
(gen_random_uuid(), NULL, 'Three Card Spread', 'A simple three-card spread representing Past, Present, and Future', true, 
'[
  {"position": 1, "name": "Past", "description": "What has led to this situation", "x": 100, "y": 150},
  {"position": 2, "name": "Present", "description": "The current situation", "x": 200, "y": 150},
  {"position": 3, "name": "Future", "description": "What lies ahead", "x": 300, "y": 150}
]'::jsonb, 3, ARRAY['beginner', 'simple', 'time']),

(gen_random_uuid(), NULL, 'Celtic Cross', 'The most popular and comprehensive 10-card tarot spread', true,
'[
  {"position": 1, "name": "Present Situation", "description": "The heart of the matter", "x": 200, "y": 200},
  {"position": 2, "name": "Challenge", "description": "What crosses you", "x": 200, "y": 200, "rotation": 90},
  {"position": 3, "name": "Distant Past", "description": "Foundation of the situation", "x": 200, "y": 300},
  {"position": 4, "name": "Recent Past", "description": "What is behind you", "x": 100, "y": 200},
  {"position": 5, "name": "Possible Outcome", "description": "What may come", "x": 200, "y": 100},
  {"position": 6, "name": "Near Future", "description": "What is before you", "x": 300, "y": 200},
  {"position": 7, "name": "Your Approach", "description": "How you approach the situation", "x": 400, "y": 300},
  {"position": 8, "name": "External Influences", "description": "How others see you", "x": 400, "y": 200},
  {"position": 9, "name": "Hopes and Fears", "description": "Your inner emotions", "x": 400, "y": 100},
  {"position": 10, "name": "Final Outcome", "description": "The final result", "x": 400, "y": 50}
]'::jsonb, 10, ARRAY['advanced', 'comprehensive', 'celtic']),

(gen_random_uuid(), NULL, 'Relationship Spread', 'A 7-card spread focused on relationships and partnerships', true,
'[
  {"position": 1, "name": "You", "description": "Your role in the relationship", "x": 100, "y": 150},
  {"position": 2, "name": "Your Partner", "description": "Their role in the relationship", "x": 300, "y": 150},
  {"position": 3, "name": "The Relationship", "description": "The relationship itself", "x": 200, "y": 100},
  {"position": 4, "name": "What Unites You", "description": "Common ground", "x": 150, "y": 200},
  {"position": 5, "name": "What Divides You", "description": "Areas of conflict", "x": 250, "y": 200},
  {"position": 6, "name": "What You Need", "description": "What you need from them", "x": 100, "y": 250},
  {"position": 7, "name": "What They Need", "description": "What they need from you", "x": 300, "y": 250}
]'::jsonb, 7, ARRAY['relationships', 'love', 'partnership']);

-- =====================================================
-- 5. SAMPLE QUIZ QUESTIONS
-- =====================================================

-- Tarot Basics Questions
INSERT INTO quiz_questions (category_id, question, question_type, options, correct_answer, explanation, difficulty, points) VALUES
((SELECT id FROM quiz_categories WHERE name = 'Tarot Basics'), 
'How many cards are in a traditional tarot deck?', 
'multiple_choice',
'["56", "72", "78", "88"]'::jsonb,
'78',
'A traditional tarot deck contains 78 cards: 22 Major Arcana and 56 Minor Arcana cards.',
'easy', 10),

((SELECT id FROM quiz_categories WHERE name = 'Tarot Basics'),
'What does the term "Major Arcana" mean?',
'multiple_choice',
'["Greater Mysteries", "Main Cards", "Master Archive", "Major Arrangement"]'::jsonb,
'Greater Mysteries',
'Major Arcana comes from Latin meaning "Greater Mysteries" or "Greater Secrets".',
'medium', 15),

((SELECT id FROM quiz_categories WHERE name = 'Major Arcana'),
'Which Major Arcana card represents new beginnings and unlimited potential?',
'multiple_choice',
'["The Magician", "The Fool", "The Star", "The World"]'::jsonb,
'The Fool',
'The Fool (0) represents new beginnings, innocence, and unlimited potential.',
'easy', 10),

((SELECT id FROM quiz_categories WHERE name = 'Astrology Basics'),
'How many zodiac signs are there?',
'multiple_choice',
'["10", "12", "13", "14"]'::jsonb,
'12',
'There are 12 zodiac signs in Western astrology, each representing about 30 degrees of the zodiacal circle.',
'easy', 10),

((SELECT id FROM quiz_categories WHERE name = 'Zodiac Signs'),
'Which element is associated with Aries?',
'multiple_choice',
'["Earth", "Air", "Fire", "Water"]'::jsonb,
'Fire',
'Aries is a Fire sign, along with Leo and Sagittarius.',
'easy', 10);

-- =====================================================
-- SEED DATA COMPLETE
-- =====================================================

-- Update sequences to avoid conflicts
SELECT setval('tarot_cards_id_seq', 78);
SELECT setval('zodiac_signs_id_seq', 12);
SELECT setval('planets_id_seq', 12);
SELECT setval('houses_id_seq', 12);
SELECT setval('quiz_categories_id_seq', 10);

-- Create indexes on newly inserted data
ANALYZE tarot_cards;
ANALYZE zodiac_signs;
ANALYZE planets;
ANALYZE houses;
ANALYZE quiz_categories;
ANALYZE quiz_questions;

-- Add helpful comments
COMMENT ON TABLE tarot_cards IS 'Complete deck of 78 tarot cards with meanings and metadata';
COMMENT ON TABLE zodiac_signs IS 'The 12 zodiac signs with their elemental and modal associations';
COMMENT ON TABLE planets IS 'Astrological planets including traditional and modern rulers';
COMMENT ON TABLE houses IS 'The 12 astrological houses and their themes';
COMMENT ON TABLE quiz_categories IS 'Categories for organizing quiz questions by topic';

-- Grant permissions
GRANT SELECT ON tarot_cards TO authenticated, anon;
GRANT SELECT ON zodiac_signs TO authenticated, anon;
GRANT SELECT ON planets TO authenticated, anon;
GRANT SELECT ON houses TO authenticated, anon;
GRANT SELECT ON quiz_categories TO authenticated, anon;
GRANT SELECT ON quiz_questions TO authenticated, anon;
