import React, { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Download, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PayrollEntry {
  employeeId: string;
  employeeName: string;
  baseSalary: number;
  commissionPercentage: number;
  totalSales: number;
  commissionsEarned: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  paymentStatus: 'pending' | 'paid' | 'partial';
  paymentDate?: Date;
  // Attendance Integration
  workHours: number;
  attendancePercentage: number;
  lateDeduction: number;
  absenceDeduction: number;
  // Advances Integration
  advancesDeduction: number;
  advancesRemaining: number;
}

interface PayrollMonth {
  month: string;
  year: number;
  entries: PayrollEntry[];
  totalPayroll: number;
  totalCommissions: number;
  totalBonuses: number;
  totalDeductions: number;
}

const PayrollPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'paid'>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);

  // Mock payroll data with Attendance and Advances integration
  const mockPayrollData: PayrollEntry[] = [
    {
      employeeId: 'emp_1',
      employeeName: 'فاطمة محمد',
      baseSalary: 400,
      commissionPercentage: 10,
      totalSales: 2500,
      commissionsEarned: 250,
      bonuses: 50,
      deductions: 30,
      netSalary: 670,
      paymentStatus: 'paid',
      paymentDate: new Date('2026-06-20'),
      // Attendance data
      workHours: 165,
      attendancePercentage: 95,
      lateDeduction: 10,
      absenceDeduction: 0,
      // Advances data
      advancesDeduction: 50,
      advancesRemaining: 150,
    },
    {
      employeeId: 'emp_2',
      employeeName: 'نور علي',
      baseSalary: 350,
      commissionPercentage: 8,
      totalSales: 1800,
      commissionsEarned: 144,
      bonuses: 0,
      deductions: 25,
      netSalary: 469,
      paymentStatus: 'pending',
      // Attendance data
      workHours: 155,
      attendancePercentage: 88,
      lateDeduction: 15,
      absenceDeduction: 20,
      // Advances data
      advancesDeduction: 0,
      advancesRemaining: 150,
    },
    {
      employeeId: 'emp_3',
      employeeName: 'ليلى أحمد',
      baseSalary: 450,
      commissionPercentage: 12,
      totalSales: 3200,
      commissionsEarned: 384,
      bonuses: 100,
      deductions: 40,
      netSalary: 894,
      paymentStatus: 'paid',
      paymentDate: new Date('2026-06-20'),
      // Attendance data
      workHours: 175,
      attendancePercentage: 100,
      lateDeduction: 0,
      absenceDeduction: 0,
      // Advances data
      advancesDeduction: 100,
      advancesRemaining: 0,
    },
  ];

  const filteredPayroll = useMemo(() => {
    if (filterStatus === 'all') return mockPayrollData;
    return mockPayrollData.filter((entry) => entry.paymentStatus === filterStatus);
  }, [filterStatus]);

  const totals = useMemo(() => {
    return {
      totalBaseSalary: filteredPayroll.reduce((sum, e) => sum + e.baseSalary, 0),
      totalCommissions: filteredPayroll.reduce((sum, e) => sum + e.commissionsEarned, 0),
      totalBonuses: filteredPayroll.reduce((sum, e) => sum + e.bonuses, 0),
      totalDeductions: filteredPayroll.reduce((sum, e) => sum + e.deductions, 0),
      totalNetSalary: filteredPayroll.reduce((sum, e) => sum + e.netSalary, 0),
      totalSales: filteredPayroll.reduce((sum, e) => sum + e.totalSales, 0),
    };
  }, [filteredPayroll]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="w-8 h-8 text-green-600" />
          {t('Payroll & Commissions')}
        </h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          <Download className="w-4 h-4" />
          {t('Export Report')}
        </button>
      </div>

      {/* Month & Filter Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-bold mb-2">{t('Month')}</label>
            <input
              type="month"
              value={`${selectedMonth.getFullYear()}-${String(selectedMonth.getMonth() + 1).padStart(2, '0')}`}
              onChange={(e) => setSelectedMonth(new Date(e.target.value))}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">{t('Status')}</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'paid')}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 outline-none"
            >
              <option value="all">{t('All')}</option>
              <option value="pending">{t('Pending')}</option>
              <option value="paid">{t('Paid')}</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold flex items-center justify-center gap-2">
              <Filter className="w-4 h-4" />
              {t('Apply Filter')}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm">{t('Total Sales')}</p>
          <p className="text-2xl font-bold text-blue-600">{totals.totalSales.toFixed(2)} OMR</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm">{t('Base Salaries')}</p>
          <p className="text-2xl font-bold text-green-600">{totals.totalBaseSalary.toFixed(2)} OMR</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm">{t('Commissions')}</p>
          <p className="text-2xl font-bold text-yellow-600">{totals.totalCommissions.toFixed(2)} OMR</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm">{t('Bonuses')}</p>
          <p className="text-2xl font-bold text-purple-600">{totals.totalBonuses.toFixed(2)} OMR</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 border-l-4 border-red-500">
          <p className="text-gray-600 text-sm">{t('Total Payroll')}</p>
          <p className="text-2xl font-bold text-red-600">{totals.totalNetSalary.toFixed(2)} OMR</p>
        </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Employee')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Base Salary')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Sales')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Commission')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Bonus')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Deductions')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Net Salary')}</th>
                <th className="px-6 py-3 text-right text-sm font-bold text-gray-700">{t('Status')}</th>
                <th className="px-6 py-3 text-center text-sm font-bold text-gray-700">{t('Action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((entry) => (
                <React.Fragment key={entry.employeeId}>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-bold text-gray-800">{entry.employeeName}</td>
                    <td className="px-6 py-4 text-gray-600">{entry.baseSalary.toFixed(2)} OMR</td>
                    <td className="px-6 py-4 text-gray-600">{entry.totalSales.toFixed(2)} OMR</td>
                    <td className="px-6 py-4 text-green-600 font-bold">{entry.commissionsEarned.toFixed(2)} OMR</td>
                    <td className="px-6 py-4 text-purple-600 font-bold">{entry.bonuses.toFixed(2)} OMR</td>
                    <td className="px-6 py-4 text-red-600 font-bold">-{entry.deductions.toFixed(2)} OMR</td>
                    <td className="px-6 py-4 text-blue-600 font-bold text-lg">{entry.netSalary.toFixed(2)} OMR</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          entry.paymentStatus === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : entry.paymentStatus === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {entry.paymentStatus === 'paid' ? '✓ مدفوع' : entry.paymentStatus === 'pending' ? 'قيد الانتظار' : 'جزئي'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => setShowDetails(showDetails === entry.employeeId ? null : entry.employeeId)}
                        className="text-blue-500 hover:text-blue-700 font-bold"
                      >
                        {showDetails === entry.employeeId ? '▼' : '▶'}
                      </button>
                    </td>
                  </tr>
                  {showDetails === entry.employeeId && (
                    <tr className="bg-blue-50 border-b border-gray-200">
                      <td colSpan={9} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Calculation Breakdown */}
                          <div>
                            <h4 className="font-bold text-gray-800 mb-3">تفاصيل الحساب</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>الراتب الأساسي:</span>
                                <span className="font-bold">{entry.baseSalary.toFixed(2)} OMR</span>
                              </div>
                              <div className="flex justify-between">
                                <span>نسبة العمولة:</span>
                                <span className="font-bold">{entry.commissionPercentage}%</span>
                              </div>
                              <div className="flex justify-between text-green-600">
                                <span>العمولات المكتسبة:</span>
                                <span className="font-bold">{entry.commissionsEarned.toFixed(2)} OMR</span>
                              </div>
                              <div className="flex justify-between text-purple-600">
                                <span>المكافآت:</span>
                                <span className="font-bold">{entry.bonuses.toFixed(2)} OMR</span>
                              </div>
                              <div className="border-t pt-2 text-sm">
                                <p className="font-bold text-gray-800 mb-2">الخصومات:</p>
                                <div className="flex justify-between text-red-600">
                                  <span>خصم التأخير:</span>
                                  <span className="font-bold">-{entry.lateDeduction.toFixed(2)} OMR</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                  <span>خصم الغياب:</span>
                                  <span className="font-bold">-{entry.absenceDeduction.toFixed(2)} OMR</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                  <span>خصم السلف:</span>
                                  <span className="font-bold">-{entry.advancesDeduction.toFixed(2)} OMR</span>
                                </div>
                                <div className="flex justify-between text-red-600">
                                  <span>خصومات أخرى:</span>
                                  <span className="font-bold">-{(entry.deductions - entry.lateDeduction - entry.absenceDeduction - entry.advancesDeduction).toFixed(2)} OMR</span>
                                </div>
                              </div>
                              <div className="border-t pt-2 flex justify-between text-blue-600 font-bold">
                                <span>الراتب الصافي:</span>
                                <span>{entry.netSalary.toFixed(2)} OMR</span>
                              </div>
                            </div>
                          </div>

                          {/* Performance Metrics */}
                          <div>
                            <h4 className="font-bold text-gray-800 mb-3">مقاييس الأداء والحضور</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span>إجمالي المبيعات:</span>
                                <span className="font-bold text-green-600">{entry.totalSales.toFixed(2)} OMR</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ساعات العمل:</span>
                                <span className="font-bold text-blue-600">{entry.workHours} ساعة</span>
                              </div>
                              <div className="flex justify-between">
                                <span>نسبة الحضور:</span>
                                <span className={`font-bold ${entry.attendancePercentage >= 95 ? 'text-green-600' : entry.attendancePercentage >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                                  {entry.attendancePercentage}%
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>السلف المتبقية:</span>
                                <span className={`font-bold ${entry.advancesRemaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {entry.advancesRemaining.toFixed(2)} OMR
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>الإنتاجية:</span>
                                <span className="font-bold text-blue-600">
                                  {(entry.totalSales / entry.baseSalary).toFixed(2)}x
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div>
                            <h4 className="font-bold text-gray-800 mb-3">الإجراءات</h4>
                            <div className="space-y-2">
                              <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-bold">
                                {entry.paymentStatus === 'paid' ? '✓ تم الدفع' : 'تأكيد الدفع'}
                              </button>
                              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-bold">
                                طباعة الفاتورة
                              </button>
                              <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-bold">
                                إرسال الراتب
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Totals */}
        <div className="bg-gray-50 border-t-2 border-gray-200 px-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm font-bold">
            <div>
              <p className="text-gray-600">إجمالي الرواتب الأساسية</p>
              <p className="text-lg text-blue-600">{totals.totalBaseSalary.toFixed(2)} OMR</p>
            </div>
            <div>
              <p className="text-gray-600">إجمالي العمولات</p>
              <p className="text-lg text-green-600">{totals.totalCommissions.toFixed(2)} OMR</p>
            </div>
            <div>
              <p className="text-gray-600">إجمالي المكافآت</p>
              <p className="text-lg text-purple-600">{totals.totalBonuses.toFixed(2)} OMR</p>
            </div>
            <div>
              <p className="text-gray-600">إجمالي الخصومات</p>
              <p className="text-lg text-red-600">{totals.totalDeductions.toFixed(2)} OMR</p>
            </div>
            <div>
              <p className="text-gray-600">إجمالي الرواتب الصافية</p>
              <p className="text-xl text-blue-700 font-bold">{totals.totalNetSalary.toFixed(2)} OMR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll History */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          سجل الرواتب السابقة
        </h2>
        <div className="space-y-2">
          {['مايو 2026', 'أبريل 2026', 'مارس 2026', 'فبراير 2026', 'يناير 2026'].map((month) => (
            <div key={month} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition cursor-pointer">
              <span className="font-bold text-gray-800">{month}</span>
              <div className="flex gap-2">
                <span className="text-gray-600">إجمالي: 2,500 OMR</span>
                <button className="text-blue-500 hover:text-blue-700 font-bold">عرض</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;
