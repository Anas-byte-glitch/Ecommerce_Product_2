import { site } from '../config/site'

// Contact page FAQ (original placeholder wording — adjust the answers to your real policies).
export const faqs = [
  {
    id: 'shipping-time',
    question: 'When will my order arrive?',
    answer:
      'We pack orders within one to two working days. Domestic parcels usually take three to seven days to reach you; international delivery depends on the destination and customs.',
  },
  {
    id: 'international',
    question: 'Can you deliver abroad?',
    answer:
      'Yes, we post to many countries. The delivery options and estimated dates for your address appear at checkout before you pay.',
  },
  {
    id: 'returns',
    question: 'What if I change my mind?',
    answer:
      `No problem. You can send something back for a refund or swap within ${site.returnWindowDays} days of delivery, as long as it is unworn and in its original packaging.`,
  },
  {
    id: 'tracking',
    question: 'Where is my parcel?',
    answer:
      'As soon as your order leaves us you will receive an email with a tracking number, so you can follow the parcel all the way to your door.',
  },
  {
    id: 'payment',
    question: 'How can I pay?',
    answer:
      'Major credit and debit cards, plus the wallets and local payment options available where you live, all protected by secure checkout.',
  },
  {
    id: 'tarnish',
    question: 'Does the finish wear off?',
    answer:
      'Our pieces are made for daily wear from durable materials. Keep them dry, keep them away from perfume, and follow the care notes on each product page to keep them looking fresh.',
  },
]
