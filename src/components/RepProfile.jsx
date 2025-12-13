/**
 * @confidential
 * @fileoverview Representative profile card component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import { useState } from 'react';
import Card from './common/Card.jsx';
import Badge from './common/Badge.jsx';
import { UI_TEXT, CSS_CLASSES } from '../constants/uiConstants.js';

/**
 * RepProfile component
 * @description Displays representative profile with territory and product info
 * @param {Object} props - Component props
 * @param {Object} props.rep - Representative data object
 * @returns {JSX.Element} RepProfile component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const RepProfile = ({ rep }) => {
  const { personalInfo, assignments } = rep;
  const [showDoctors, setShowDoctors] = useState(false);

  /**
   * Gets badge variant for trend
   * @description Maps trend string to badge color
   * @param {string} trend - Trend description
   * @returns {string} Badge variant name
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getTrendVariant = trend => {
    if (trend.toLowerCase().includes('upward') || trend.toLowerCase().includes('improvement')) {
      return 'success';
    }
    if (trend.toLowerCase().includes('declining')) {
      return 'danger';
    }
    return 'warning';
  };

  /**
   * Gets initials from name
   * @description Extracts first letters of first and last name
   * @param {string} name - Full name
   * @returns {string} Initials
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getInitials = name => {
    const names = name.split(' ');
    return names.length >= 2
      ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
      : name.substring(0, 2).toUpperCase();
  };

  /**
   * Gets tier badge color based on tier letter
   * @description Returns color classes for tier badges
   * @param {string} tier - Tier letter (A, B, C, etc.)
   * @returns {string} CSS classes for tier badge
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getTierColor = tier => {
    const tierColors = {
      A: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      B: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      C: 'bg-green-500/20 text-green-400 border-green-500/50',
      D: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      E: 'bg-pink-500/20 text-pink-400 border-pink-500/50'
    };
    return tierColors[tier] || 'bg-slate-600/50 text-slate-300 border-slate-500/50';
  };

  return (
    <Card className='p-6 h-full'>
      <div className='flex flex-col items-center text-center mb-6'>
        <div className='w-20 h-20 rounded-full bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center text  -white text-2xl font-bold mb-4'>
          {getInitials(personalInfo.name)}
        </div>
        <h2 className={`text-xl font-bold ${CSS_CLASSES.TEXT_PRIMARY} mb-1`}>
          {personalInfo.name}
        </h2>
        <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} flex items-center gap-1`}>
          <span>📍</span> {personalInfo.territory}, {personalInfo.region}
        </p>
      </div>

      <div className='space-y-4'>
        <div className='flex justify-between items-center py-3 border-b border-slate-700'>
          <span className={`text-sm ${CSS_CLASSES.TEXT_MUTED}`}>Join Date</span>
          <span className={`text-sm font-medium ${CSS_CLASSES.TEXT_PRIMARY}`}>
            {new Date(personalInfo.joinDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}
          </span>
        </div>

        <div className='flex justify-between items-center py-3 border-b border-slate-700'>
          <span className={`text-sm ${CSS_CLASSES.TEXT_MUTED}`}>Target Achievement</span>
          <span className={`text-sm font-medium ${CSS_CLASSES.TEXT_PRIMARY}`}>
            {rep.performanceSummary.avgTargetAchievement}%
          </span>
        </div>

        <div className='py-3 border-b border-slate-700'>
          <button
            onClick={() => setShowDoctors(!showDoctors)}
            className='w-full flex justify-between items-center cursor-pointer hover:bg-slate-700/30 rounded px-2 py-1 transition-colors'
          >
            <span className={`text-sm ${CSS_CLASSES.TEXT_MUTED}`}>Key Doctors</span>
            <div className='flex items-center gap-2'>
              <span className={`text-sm font-medium ${CSS_CLASSES.TEXT_PRIMARY}`}>
                {assignments.topDoctors.length}
              </span>
              <span className={`text-xs ${CSS_CLASSES.TEXT_MUTED}`}>{showDoctors ? '▲' : '▼'}</span>
            </div>
          </button>

          {showDoctors && (
            <div className='mt-3 space-y-2 max-h-48 overflow-y-auto'>
              {assignments.topDoctors.map(doctor => (
                <div
                  key={doctor.name}
                  className='flex items-center justify-between p-2 bg-slate-700/30 rounded'
                >
                  <div className='flex-1'>
                    <p className={`text-sm font-medium ${CSS_CLASSES.TEXT_PRIMARY}`}>
                      {doctor.name}
                    </p>
                    <p className={`text-xs ${CSS_CLASSES.TEXT_MUTED}`}>{doctor.specialty}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold border ${getTierColor(
                      doctor.tier
                    )}`}
                  >
                    {doctor.tier}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='py-3'>
          <h3 className={`text-sm font-medium ${CSS_CLASSES.TEXT_MUTED} mb-3`}>
            {UI_TEXT.PRODUCTS}
          </h3>
          <div className='flex flex-wrap gap-2'>
            {assignments.products.map(product => (
              <Badge key={product} variant='info'>
                {product}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepProfile;
