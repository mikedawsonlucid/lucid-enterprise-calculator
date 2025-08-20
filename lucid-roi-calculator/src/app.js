import React, { useState, useEffect } from 'react';
import { Calculator, Users, Clock, DollarSign, TrendingUp, Zap, Plane, BarChart3, Eye, EyeOff } from 'lucide-react';
import './App.css';

const LucidROICalculator = () => {
  const [users, setUsers] = useState(10);
  const [avgSalary, setAvgSalary] = useState(85000);
  const [results, setResults] = useState({});
  
  // Toggle states for each section
  const [enabledSections, setEnabledSections] = useState({
    meetingEfficiency: true,
    meetingReduction: true,
    virtualEvents: true,
    workshopCollaboration: true,
    supportTimeReduction: true,
    brainstormingEfficiency: true,
    onboardingTimeReduction: true,
    adminTimeReduction: true,
    pipelineGeneration: true
  });

  const hourlyRate = avgSalary / 2080; // 40 hours/week * 52 weeks

  const toggleSection = (section) => {
    setEnabledSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateROI = () => {
    // Time Savings Calculations
    const meetingEfficiency = enabledSections.meetingEfficiency ? {
      hoursPerYear: users * 10,
      dollarValue: users * 10 * hourlyRate
    } : { hoursPerYear: 0, dollarValue: 0 };

    const meetingReduction = enabledSections.meetingReduction ? {
      hoursPerYear: users * 50,
      dollarValue: users * 50 * hourlyRate
    } : { hoursPerYear: 0, dollarValue: 0 };

    // Travel Cost Savings
    const virtualEvents = enabledSections.virtualEvents ? {
      costSavings: users * 0.3 * 2000 * 1 // 30% of users would attend events
    } : { costSavings: 0 };

    const workshopCollaboration = enabledSections.workshopCollaboration ? {
      costSavings: users * 0.2 * 3500 * 0.5 // 20% of users do international travel
    } : { costSavings: 0 };

    // Productivity Improvements
    const supportTimeReduction = enabledSections.supportTimeReduction ? {
      hoursPerYear: users * 2.5 * 52,
      dollarValue: users * 2.5 * 52 * hourlyRate
    } : { hoursPerYear: 0, dollarValue: 0 };

    const brainstormingEfficiency = enabledSections.brainstormingEfficiency ? {
      hoursPerYear: users * 8 * 12 * 0.5, // 50% productivity gain on brainstorming time
      dollarValue: users * 8 * 12 * 0.5 * hourlyRate
    } : { hoursPerYear: 0, dollarValue: 0 };

    // Additional ROI Categories
    const onboardingTimeReduction = enabledSections.onboardingTimeReduction ? {
      newHiresPerYear: Math.ceil(users * 0.15), // 15% turnover/growth
      hoursSavedPerHire: 16,
      costSavedPerHire: 2560,
      totalSavings: Math.ceil(users * 0.15) * 2560
    } : { newHiresPerYear: 0, hoursSavedPerHire: 0, costSavedPerHire: 0, totalSavings: 0 };

    const adminTimeReduction = enabledSections.adminTimeReduction ? {
      adminHoursPerWeek: users * 0.01 * 11, // 1% of users are admins, 11 hours saved per week
      dollarValue: users * 0.01 * 11 * 52 * hourlyRate
    } : { adminHoursPerWeek: 0, dollarValue: 0 };

    const pipelineGeneration = enabledSections.pipelineGeneration ? {
      salesReps: Math.ceil(users * 0.05), // 5% are sales reps
      monthlyIncrease: Math.ceil(users * 0.05) * 75000 * 0.4, // 40% of the full pipeline increase
      annualIncrease: Math.ceil(users * 0.05) * 75000 * 0.4 * 12
    } : { salesReps: 0, monthlyIncrease: 0, annualIncrease: 0 };

    // Total calculations
    const totalTimeSavings = 
      meetingEfficiency.hoursPerYear + 
      meetingReduction.hoursPerYear + 
      supportTimeReduction.hoursPerYear + 
      brainstormingEfficiency.hoursPerYear;

    const totalCostSavings = 
      meetingEfficiency.dollarValue + 
      meetingReduction.dollarValue + 
      virtualEvents.costSavings + 
      workshopCollaboration.costSavings + 
      supportTimeReduction.dollarValue + 
      brainstormingEfficiency.dollarValue + 
      onboardingTimeReduction.totalSavings + 
      adminTimeReduction.dollarValue;

    const totalROI = totalCostSavings + pipelineGeneration.annualIncrease;

    setResults({
      meetingEfficiency,
      meetingReduction,
      virtualEvents,
      workshopCollaboration,
      supportTimeReduction,
      brainstormingEfficiency,
      onboardingTimeReduction,
      adminTimeReduction,
      pipelineGeneration,
      totalTimeSavings,
      totalCostSavings,
      totalROI
    });
  };

  useEffect(() => {
    calculateROI();
  }, [users, avgSalary, enabledSections]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatHours = (hours) => {
    return new Intl.NumberFormat('en-US').format(Math.round(hours));
  };

  const SectionToggle = ({ enabled, onToggle, label }) => (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
        enabled 
          ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
      }`}
    >
      {enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      {enabled ? 'Enabled' : 'Disabled'}
    </button>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white min-h-screen font-sans">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Header - Using Lucid brand colors */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">ROI Calculator</h1>
              <p className="text-blue-100 text-sm font-medium">Lucid Visual Collaboration Suite</p>
            </div>
          </div>
          <p className="text-blue-50 text-lg font-normal leading-relaxed max-w-3xl">
            Calculate your potential return on investment with Lucid's visual collaboration platform. 
            Toggle sections on or off based on your specific use cases and organizational needs.
          </p>
        </div>

        {/* Input Section - Clean, minimal design */}
        <div className="p-8 bg-gray-50 border-b border-gray-100">
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <Users className="w-4 h-4 inline mr-2 text-blue-600" />
                Number of Lucid Users
              </label>
              <input
                type="number"
                value={users}
                onChange={(e) => setUsers(parseInt(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium bg-white"
                min="1"
                max="10000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <DollarSign className="w-4 h-4 inline mr-2 text-blue-600" />
                Average Annual Salary
              </label>
              <input
                type="number"
                value={avgSalary}
                onChange={(e) => setAvgSalary(parseInt(e.target.value) || 50000)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg font-medium bg-white"
                min="30000"
                max="300000"
              />
              <p className="text-sm text-gray-600 mt-2 font-medium">
                Hourly rate: {formatCurrency(hourlyRate)}
              </p>
            </div>
          </div>
        </div>

        {/* Results Summary - Using contrast and clean design */}
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white p-8 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-7 h-7" />
                <span className="text-3xl font-bold tracking-tight">{formatHours(results.totalTimeSavings)}</span>
              </div>
              <p className="text-emerald-50 font-medium text-lg">Total Hours Saved Annually</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-8 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <DollarSign className="w-7 h-7" />
                <span className="text-3xl font-bold tracking-tight">{formatCurrency(results.totalCostSavings)}</span>
              </div>
              <p className="text-blue-50 font-medium text-lg">Cost Savings & Efficiency</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-8 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-7 h-7" />
                <span className="text-3xl font-bold tracking-tight">{formatCurrency(results.totalROI)}</span>
              </div>
              <p className="text-purple-50 font-medium text-lg">Total Annual ROI</p>
            </div>
          </div>

          {/* Detailed Breakdown with toggles */}
          <div className="space-y-12">
            {/* Time Savings */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-emerald-600" />
                  Time Savings
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.meetingEfficiency ? 'border-emerald-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Meeting Efficiency</h4>
                    <SectionToggle 
                      enabled={enabledSections.meetingEfficiency}
                      onToggle={() => toggleSection('meetingEfficiency')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">Asynchronous brainstorming replaces long meetings</p>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {formatHours(results.meetingEfficiency?.hoursPerYear)} hours
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {formatCurrency(results.meetingEfficiency?.dollarValue)} value
                  </div>
                </div>
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.meetingReduction ? 'border-emerald-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Meeting Reduction</h4>
                    <SectionToggle 
                      enabled={enabledSections.meetingReduction}
                      onToggle={() => toggleSection('meetingReduction')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">83% reduction in cross-functional meetings</p>
                  <div className="text-2xl font-bold text-emerald-600 mb-1">
                    {formatHours(results.meetingReduction?.hoursPerYear)} hours
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {formatCurrency(results.meetingReduction?.dollarValue)} value
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Cost Savings */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Plane className="w-6 h-6 mr-3 text-blue-600" />
                  Travel Cost Savings
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.virtualEvents ? 'border-blue-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Virtual Events</h4>
                    <SectionToggle 
                      enabled={enabledSections.virtualEvents}
                      onToggle={() => toggleSection('virtualEvents')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">Replace in-person events with virtual collaboration</p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.virtualEvents?.costSavings)}
                  </div>
                </div>
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.workshopCollaboration ? 'border-blue-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Workshop Collaboration</h4>
                    <SectionToggle 
                      enabled={enabledSections.workshopCollaboration}
                      onToggle={() => toggleSection('workshopCollaboration')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">Online workshops replace travel</p>
                  <div className="text-2xl font-bold text-blue-600">
                    {formatCurrency(results.workshopCollaboration?.costSavings)}
                  </div>
                </div>
              </div>
            </div>

            {/* Productivity Improvements */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Zap className="w-6 h-6 mr-3 text-purple-600" />
                  Productivity Improvements
                </h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.supportTimeReduction ? 'border-purple-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Support Time Reduction</h4>
                    <SectionToggle 
                      enabled={enabledSections.supportTimeReduction}
                      onToggle={() => toggleSection('supportTimeReduction')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">Visual diagrams reduce triage time by 2.5 hours/week</p>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatHours(results.supportTimeReduction?.hoursPerYear)} hours
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {formatCurrency(results.supportTimeReduction?.dollarValue)} value
                  </div>
                </div>
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.brainstormingEfficiency ? 'border-purple-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Brainstorming Efficiency</h4>
                    <SectionToggle 
                      enabled={enabledSections.brainstormingEfficiency}
                      onToggle={() => toggleSection('brainstormingEfficiency')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">2.5x more productive brainstorming sessions</p>
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {formatHours(results.brainstormingEfficiency?.hoursPerYear)} hours
                  </div>
                  <div className="text-lg font-medium text-gray-500">
                    {formatCurrency(results.brainstormingEfficiency?.dollarValue)} value
                  </div>
                </div>
              </div>
            </div>

            {/* Additional ROI Categories */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-3 text-indigo-600" />
                  Additional ROI Benefits
                </h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.onboardingTimeReduction ? 'border-indigo-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Faster Onboarding</h4>
                    <SectionToggle 
                      enabled={enabledSections.onboardingTimeReduction}
                      onToggle={() => toggleSection('onboardingTimeReduction')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">Reduce engineer onboarding by 2-3 days</p>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {formatCurrency(results.onboardingTimeReduction?.totalSavings)}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {results.onboardingTimeReduction?.newHiresPerYear} new hires/year
                  </div>
                </div>
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.adminTimeReduction ? 'border-indigo-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Admin Time Reduction</h4>
                    <SectionToggle 
                      enabled={enabledSections.adminTimeReduction}
                      onToggle={() => toggleSection('adminTimeReduction')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">95% reduction in administrative tasks</p>
                  <div className="text-2xl font-bold text-indigo-600">
                    {formatCurrency(results.adminTimeReduction?.dollarValue)}
                  </div>
                </div>
                <div className={`bg-white border-2 rounded-xl p-6 transition-all ${
                  enabledSections.pipelineGeneration ? 'border-indigo-200 shadow-sm' : 'border-gray-200 opacity-50'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">Pipeline Generation</h4>
                    <SectionToggle 
                      enabled={enabledSections.pipelineGeneration}
                      onToggle={() => toggleSection('pipelineGeneration')}
                    />
                  </div>
                  <p className="text-gray-600 mb-4 font-medium">30-50% more time on pipeline activities</p>
                  <div className="text-2xl font-bold text-indigo-600 mb-1">
                    {formatCurrency(results.pipelineGeneration?.annualIncrease)}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {results.pipelineGeneration?.salesReps} sales reps
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Assumptions - Clean, minimal design */}
          <div className="mt-12 p-8 bg-gray-50 rounded-xl border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Key Assumptions</h3>
            <div className="text-gray-700 space-y-2 font-medium leading-relaxed">
              <p>• Calculations based on real customer data from Lucid case studies</p>
              <p>• Not all users will experience every benefit category</p>
              <p>• Results may vary based on organization size, industry, and implementation</p>
              <p>• Conservative estimates used for percentage of users affected by each benefit</p>
              <p>• Annual salary converted to hourly rate using 2,080 hours (40 hours/week × 52 weeks)</p>
              <p>• Use the toggle controls to enable only the sections relevant to your organization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <LucidROICalculator />
    </div>
  );
}

export default App;