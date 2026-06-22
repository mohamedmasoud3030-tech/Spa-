import React, { useState, useEffect } from 'react';
import { Gift, TrendingUp, Users, Zap, MessageCircle, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoyaltyTier {
  id: string;
  name: string;
  minPoints: number;
  maxPoints: number;
  discountPercentage: number;
  benefits: string[];
  color: string;
  icon: React.ReactNode;
}

interface LoyaltyReward {
  id: string;
  name: string;
  pointsRequired: number;
  discount: number;
  expiresIn: number; // days
  description: string;
}

interface CustomerLoyalty {
  customerId: string;
  currentPoints: number;
  totalPointsEarned: number;
  tier: string;
  tierProgress: number; // percentage to next tier
  redeemedPoints: number;
  lastPointsUpdate: Date;
  whatsappOptIn: boolean;
  whatsappPhone?: string;
  notifications: LoyaltyNotification[];
}

interface LoyaltyNotification {
  id: string;
  type: 'points_earned' | 'tier_upgrade' | 'reward_expiring' | 'special_offer';
  message: string;
  sent: boolean;
  sentAt?: Date;
  channel: 'whatsapp' | 'sms' | 'email';
}

const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    minPoints: 0,
    maxPoints: 499,
    discountPercentage: 0,
    benefits: ['Welcome to Loyalty Program', 'Earn 1 point per OMR'],
    color: 'from-amber-600 to-amber-700',
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 'silver',
    name: 'Silver',
    minPoints: 500,
    maxPoints: 999,
    discountPercentage: 5,
    benefits: ['5% Discount on Services', 'Earn 1.2 points per OMR', 'Birthday Special'],
    color: 'from-gray-400 to-gray-500',
    icon: <TrendingUp className="w-6 h-6" />,
  },
  {
    id: 'gold',
    name: 'Gold',
    minPoints: 1000,
    maxPoints: 1999,
    discountPercentage: 10,
    benefits: ['10% Discount on Services', 'Earn 1.5 points per OMR', 'Free Service Monthly', 'VIP Support'],
    color: 'from-yellow-400 to-yellow-600',
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: 'platinum',
    name: 'Platinum',
    minPoints: 2000,
    maxPoints: Infinity,
    discountPercentage: 15,
    benefits: ['15% Discount on Services', 'Earn 2 points per OMR', 'Free Service Bi-weekly', 'Priority Booking', 'Exclusive Events'],
    color: 'from-blue-400 to-blue-600',
    icon: <Award className="w-6 h-6" />,
  },
];

const AVAILABLE_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward_1',
    name: 'Free Haircut',
    pointsRequired: 200,
    discount: 0,
    expiresIn: 90,
    description: 'Complimentary haircut service',
  },
  {
    id: 'reward_2',
    name: '15% Discount',
    pointsRequired: 150,
    discount: 15,
    expiresIn: 60,
    description: 'Discount on any service',
  },
  {
    id: 'reward_3',
    name: 'Free Facial',
    pointsRequired: 300,
    discount: 0,
    expiresIn: 90,
    description: 'Complimentary facial treatment',
  },
  {
    id: 'reward_4',
    name: '20% Discount',
    pointsRequired: 250,
    discount: 20,
    expiresIn: 60,
    description: 'Discount on any service',
  },
  {
    id: 'reward_5',
    name: 'Free Massage',
    pointsRequired: 350,
    discount: 0,
    expiresIn: 90,
    description: 'Complimentary massage session',
  },
];

export const LoyaltySystem: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTier, setSelectedTier] = useState<LoyaltyTier>(LOYALTY_TIERS[0]);
  const [showRewards, setShowRewards] = useState(false);

  return (
    <div className="space-y-6">
      {/* Loyalty Tiers Overview */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-6 h-6 text-amber-500" />
          {t('Loyalty Program')}
        </h2>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOYALTY_TIERS.map((tier) => (
            <div
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedTier.id === tier.id
                  ? `bg-gradient-to-br ${tier.color} text-white shadow-lg scale-105`
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">{tier.name}</h3>
                {tier.icon}
              </div>
              <p className="text-sm opacity-90">
                {tier.minPoints.toLocaleString()} - {tier.maxPoints === Infinity ? '∞' : tier.maxPoints.toLocaleString()} {t('Points')}
              </p>
              <p className="text-sm font-semibold mt-2">{tier.discountPercentage}% {t('Discount')}</p>
            </div>
          ))}
        </div>

        {/* Selected Tier Details */}
        <div className={`mt-6 p-6 rounded-lg bg-gradient-to-br ${selectedTier.color} text-white`}>
          <h3 className="text-xl font-bold mb-4">{selectedTier.name} {t('Tier Benefits')}</h3>
          <ul className="space-y-2">
            {selectedTier.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Available Rewards */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Gift className="w-6 h-6 text-red-500" />
            {t('Available Rewards')}
          </h2>
          <button
            onClick={() => setShowRewards(!showRewards)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            {showRewards ? t('Hide') : t('Show')} Rewards
          </button>
        </div>

        {showRewards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AVAILABLE_REWARDS.map((reward) => (
              <div key={reward.id} className="border-2 border-gray-200 rounded-lg p-4 hover:shadow-lg transition">
                <h3 className="font-bold text-lg mb-2">{reward.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Gift className="w-4 h-4 text-amber-500" />
                    <span className="font-bold text-amber-600">{reward.pointsRequired} {t('Points')}</span>
                  </div>
                  {reward.discount > 0 && (
                    <span className="text-green-600 font-bold">{reward.discount}% OFF</span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">Expires in {reward.expiresIn} days</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WhatsApp Integration */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-lg p-6 border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-green-500" />
          {t('WhatsApp Notifications')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Notification Types */}
          <div>
            <h3 className="font-bold text-lg mb-3">Notification Types:</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Points Earned Notifications</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Tier Upgrade Alerts</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Reward Expiring Soon</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Special Offers & Promotions</span>
              </li>
            </ul>
          </div>

          {/* Opt-in Status */}
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">Opt-in Status</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Enable WhatsApp Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-5 h-5" />
                <span>Enable SMS Notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-5 h-5" />
                <span>Enable Email Notifications</span>
              </label>
            </div>
          </div>
        </div>

        {/* Message Templates */}
        <div className="mt-6 bg-white rounded-lg p-4">
          <h3 className="font-bold text-lg mb-3">Message Templates</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded border-l-4 border-green-500">
              <p className="text-sm font-semibold">Points Earned:</p>
              <p className="text-sm text-gray-600">
                "مبروك! 🎉 لقد حصلت على 50 نقطة من زيارتك. رصيدك الحالي: 250 نقطة"
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border-l-4 border-blue-500">
              <p className="text-sm font-semibold">Tier Upgrade:</p>
              <p className="text-sm text-gray-600">
                "تهانينا! 🌟 لقد ارتقيت إلى مستوى Gold وحصلت على 10% خصم على جميع الخدمات"
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded border-l-4 border-orange-500">
              <p className="text-sm font-semibold">Reward Expiring:</p>
              <p className="text-sm text-gray-600">
                "تنبيه! ⏰ جائزتك 'قص شعر مجاني' ستنتهي خلال 3 أيام. استخدمها الآن!"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">{t('Total Members')}</p>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
          <p className="text-xs text-gray-500 mt-2">↑ 12% from last month</p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">{t('Points Issued')}</p>
          <p className="text-3xl font-bold text-green-600">45,678</p>
          <p className="text-xs text-gray-500 mt-2">This month</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">{t('Rewards Redeemed')}</p>
          <p className="text-3xl font-bold text-purple-600">234</p>
          <p className="text-xs text-gray-500 mt-2">↑ 8% from last month</p>
        </div>
      </div>
    </div>
  );
};

export default LoyaltySystem;
