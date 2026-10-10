export interface CardData {
  id: number;
  title: string;
  description: string[];
}

// Ordered from most expensive to least expensive.
// Ties are listed left sock first, then right sock.
export const cards: CardData[] = [
  {
    id: 0,
    title: 'Matching Pair - Galactic Tier',
    description: [
      '$49.99/mo.',
      '- SockSat tracking',
      '- Mars coverage',
      '- Annual sock reunion gala',
      '- Tracker updates once per millisecond',
    ],
  },
  {
    id: 1,
    title: 'Matching Pair - Silver Tier',
    description: [
      '$14.99/mo.',
      '- Matching Pair Guarantee™',
      '- 48-hour grief counselling hotline',
      '- Hold music included',
      '- Tracker updates once per month',
    ],
  },
  {
    id: 2,
    title: 'Left Sock - Gold Tier',
    description: [
      '$9.99/mo.',
      '- Covers one left sock',
      '- 7-day claim wait',
      '- Dedicated sock concierge and a sympathy card',
      '- Tracker updates once per hour',
    ],
  },
  {
    id: 3,
    title: 'Right Sock - Gold Tier',
    description: [
      '$9.99/mo.',
      '- Covers one right sock',
      "- Forensic timeline of your sock's last known location",
      '- Timeline comes framed',
      '- Tracker updates once per day',
    ],
  },
  {
    id: 4,
    title: 'Matching Pair - Bronze Tier',
    description: [
      '$7.99/mo.',
      '- Guarantees a pair is a pair',
      '- Subject to review by our pair committee',
      '- Committee meets quarterly',
      '- Tracker updates once per 6 months',
    ],
  },
  {
    id: 5,
    title: 'Left Sock - Silver Tier',
    description: [
      '$5.99/mo.',
      '- Covers one left sock',
      '- 30-day claim wait',
      '- One complimentary dryer incident report',
      '- Tracker updates once per week',
    ],
  },
  {
    id: 6,
    title: 'Right Sock - Silver Tier',
    description: [
      '$5.99/mo.',
      '- Covers one right sock',
      '- Priority access to the 11-step claim form',
      '- Witness statements extra',
      '- Tracker updates twice per month',
    ],
  },
  {
    id: 7,
    title: 'Left Sock - Bronze Tier',
    description: [
      '$2.99/mo.',
      '- Covers one left sock',
      '- 90-day claim wait',
      '- Lint damage not included',
      '- Tracker updates once per month',
    ],
  },
  {
    id: 8,
    title: 'Right Sock - Bronze Tier',
    description: [
      '$2.99/mo.',
      '- Covers one right sock',
      '- Underwritten separately from left socks',
      '- Please do not ask why',
      '- Tracker updates once per year',
    ],
  },
];