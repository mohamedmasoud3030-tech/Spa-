import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface BookingService {
  id: string;
  name: string;
  duration: number; // minutes
  price: number;
  description: string;
}

interface BookingStaff {
  id: string;
  name: string;
  specialties: string[];
  availability: boolean;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

interface BookingFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  staffId?: string;
  date: string;
  time: string;
  notes: string;
  agreeToTerms: boolean;
}

interface BookingConfirmation {
  bookingId: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingDate: Date;
  appointmentDate: Date;
  confirmationCode: string;
}

const MOCK_SERVICES: BookingService[] = [
  {
    id: 'service_1',
    name: 'قص الشعر',
    duration: 30,
    price: 15,
    description: 'قص شعر احترافي مع تصفيف',
  },
  {
    id: 'service_2',
    name: 'صبغة الشعر',
    duration: 60,
    price: 25,
    description: 'صبغة شعر عالية الجودة',
  },
  {
    id: 'service_3',
    name: 'معالجة الشعر',
    duration: 45,
    price: 20,
    description: 'معالجة تغذية وترطيب الشعر',
  },
  {
    id: 'service_4',
    name: 'مساج الوجه',
    duration: 45,
    price: 18,
    description: 'مساج منعش للوجه والرقبة',
  },
  {
    id: 'service_5',
    name: 'مساج الجسم',
    duration: 60,
    price: 30,
    description: 'مساج استرخاء شامل للجسم',
  },
];

const MOCK_STAFF: BookingStaff[] = [
  {
    id: 'staff_1',
    name: 'فاطمة محمد',
    specialties: ['قص الشعر', 'صبغة الشعر'],
    availability: true,
  },
  {
    id: 'staff_2',
    name: 'نور علي',
    specialties: ['معالجة الشعر', 'مساج الوجه'],
    availability: true,
  },
  {
    id: 'staff_3',
    name: 'ليلى أحمد',
    specialties: ['مساج الجسم', 'معالجة الشعر'],
    availability: true,
  },
];

export const OnlineBookingSystem: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceId: '',
    staffId: '',
    date: '',
    time: '',
    notes: '',
    agreeToTerms: false,
  });
  const [selectedService, setSelectedService] = useState<BookingService | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  // Generate available time slots
  useEffect(() => {
    if (formData.date) {
      const slots: TimeSlot[] = [];
      for (let hour = 9; hour < 18; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
          const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
          slots.push({
            time,
            available: Math.random() > 0.3, // 70% availability
          });
        }
      }
      setAvailableSlots(slots);
    }
  }, [formData.date]);

  const handleServiceSelect = (service: BookingService) => {
    setSelectedService(service);
    setFormData({ ...formData, serviceId: service.id });
    setStep(2);
  };

  const handleStaffSelect = (staffId: string) => {
    setFormData({ ...formData, staffId });
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setFormData({ ...formData, date, time });
    setStep(3);
  };

  const handleCustomerInfoChange = (field: keyof BookingFormData, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitBooking = () => {
    // Validate form
    if (
      !formData.customerName ||
      !formData.customerPhone ||
      !formData.customerEmail ||
      !formData.serviceId ||
      !formData.date ||
      !formData.time ||
      !formData.agreeToTerms
    ) {
      alert('Please fill in all required fields');
      return;
    }

    // Create confirmation
    const confirmation: BookingConfirmation = {
      bookingId: `BOOK_${Date.now()}`,
      status: 'confirmed',
      bookingDate: new Date(),
      appointmentDate: new Date(`${formData.date}T${formData.time}`),
      confirmationCode: `CONFIRM_${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    };

    setConfirmation(confirmation);
    setStep(4);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">كانزي سبا</h1>
          <p className="text-gray-600">احجز موعدك الآن بسهولة</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  s <= step
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </div>
              <p className="text-xs mt-2 text-gray-600">
                {s === 1 && 'الخدمة'}
                {s === 2 && 'الأخصائي'}
                {s === 3 && 'الموعد'}
                {s === 4 && 'التأكيد'}
              </p>
            </div>
          ))}
        </div>

        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">اختر الخدمة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_SERVICES.map((service) => (
                <div
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold">{service.price} OMR</span>
                    <span className="text-gray-500 text-sm">{service.duration} دقيقة</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Staff */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">اختر الأخصائي (اختياري)</h2>
            <div className="space-y-3 mb-6">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500">
                <input
                  type="radio"
                  name="staff"
                  value=""
                  checked={!formData.staffId}
                  onChange={() => handleStaffSelect('')}
                  className="w-5 h-5"
                />
                <span>أي أخصائي متاح</span>
              </label>
              {MOCK_STAFF.map((staff) => (
                <label
                  key={staff.id}
                  className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500"
                >
                  <input
                    type="radio"
                    name="staff"
                    value={staff.id}
                    checked={formData.staffId === staff.id}
                    onChange={() => handleStaffSelect(staff.id)}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <p className="font-bold">{staff.name}</p>
                    <p className="text-sm text-gray-600">{staff.specialties.join(' • ')}</p>
                  </div>
                  {staff.availability && (
                    <span className="text-green-600 text-sm font-bold">متاح</span>
                  )}
                </label>
              ))}
            </div>
            <button
              onClick={() => setStep(3)}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
            >
              التالي
            </button>
          </div>
        )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">اختر الموعد والوقت</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date Picker */}
              <div>
                <label className="block text-sm font-bold mb-2">التاريخ</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                />
              </div>

              {/* Time Picker */}
              <div>
                <label className="block text-sm font-bold mb-2">الوقت</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
                >
                  <option value="">اختر الوقت</option>
                  {availableSlots
                    .filter((slot) => slot.available)
                    .map((slot) => (
                      <option key={slot.time} value={slot.time}>
                        {slot.time}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Customer Info */}
            <div className="space-y-4 mb-6">
              <h3 className="font-bold text-lg">معلومات التواصل</h3>
              <input
                type="text"
                placeholder="الاسم الكامل"
                value={formData.customerName}
                onChange={(e) => handleCustomerInfoChange('customerName', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="tel"
                placeholder="رقم الهاتف (+968...)"
                value={formData.customerPhone}
                onChange={(e) => handleCustomerInfoChange('customerPhone', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
              />
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                value={formData.customerEmail}
                onChange={(e) => handleCustomerInfoChange('customerEmail', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
              />
              <textarea
                placeholder="ملاحظات إضافية (اختياري)"
                value={formData.notes}
                onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none h-24"
              />
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={(e) => handleCustomerInfoChange('agreeToTerms', e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-sm text-gray-600">
                أوافق على شروط الحجز والسياسة الخصوصية
              </span>
            </label>

            <button
              onClick={handleSubmitBooking}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition"
            >
              تأكيد الحجز
            </button>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && confirmation && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-green-600 mb-2">تم تأكيد الحجز!</h2>
              <p className="text-gray-600">شكراً لحجزك معنا</p>
            </div>

            {/* Booking Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">رقم الحجز</p>
                  <p className="font-bold text-lg">{confirmation.bookingId}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">كود التأكيد</p>
                  <p className="font-bold text-lg text-blue-600">{confirmation.confirmationCode}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">التاريخ والوقت</p>
                  <p className="font-bold text-lg">
                    {confirmation.appointmentDate.toLocaleDateString('ar-OM')} الساعة{' '}
                    {confirmation.appointmentDate.toLocaleTimeString('ar-OM', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">الخدمة</p>
                  <p className="font-bold text-lg">{selectedService?.name}</p>
                </div>
              </div>
            </div>

            {/* Confirmation Message */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800">
                تم إرسال تفاصيل الحجز إلى بريدك الإلكتروني ورقم الهاتف الخاص بك.
                <br />
                ستتلقى تذكيراً قبل الموعد بـ 24 ساعة.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition"
              >
                حجز خدمة أخرى
              </button>
              <button
                onClick={() => window.close()}
                className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnlineBookingSystem;
