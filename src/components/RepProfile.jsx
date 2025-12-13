/**
 * @confidential
 * @fileoverview Representative profile card component
 * @author Aravind Sekar
 * @created 13-12-2025
 */

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

  return (
    <Card className='p-6 mb-6'>
      <div className='flex items-start justify-between mb-4'>
        <div>
          <h2 className={`text-2xl font-bold ${CSS_CLASSES.TEXT_PRIMARY} mb-1`}>
            {personalInfo.name}
          </h2>
          <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY}`}>{personalInfo.region}</p>
        </div>

        <Badge variant={getTrendVariant(rep.performanceSummary.trend)}>
          {rep.performanceSummary.trend}
        </Badge>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div>
          <h3 className={`text-sm font-medium ${CSS_CLASSES.TEXT_MUTED} mb-2`}>
            {UI_TEXT.TERRITORY}
          </h3>
          <p className={`${CSS_CLASSES.TEXT_PRIMARY}`}>{personalInfo.territory}</p>
          <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} mt-1`}>
            {assignments.totalDoctorsInTerritory} doctors
          </p>
        </div>

        <div>
          <h3 className={`text-sm font-medium ${CSS_CLASSES.TEXT_MUTED} mb-2`}>
            {UI_TEXT.EXPERIENCE}
          </h3>
          <p className={`${CSS_CLASSES.TEXT_PRIMARY}`}>{personalInfo.experience}</p>
          <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} mt-1`}>
            Since{' '}
            {new Date(personalInfo.joinDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>

        <div>
          <h3 className={`text-sm font-medium ${CSS_CLASSES.TEXT_MUTED} mb-2`}>
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

      <div className='mt-6 pt-6 border-t border-slate-700'>
        <h3 className={`text-sm font-medium ${CSS_CLASSES.TEXT_MUTED} mb-3`}>
          {UI_TEXT.TOP_DOCTORS}
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
          {assignments.topDoctors.map(doctor => (
            <div key={doctor.name} className='flex items-center gap-2 text-sm'>
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${
                  doctor.tier === 'A'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-slate-600/50 text-slate-300'
                }`}
              >
                {doctor.tier}
              </span>
              <div>
                <p className={CSS_CLASSES.TEXT_PRIMARY}>{doctor.name}</p>
                <p className={`text-xs ${CSS_CLASSES.TEXT_MUTED}`}>{doctor.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RepProfile;
