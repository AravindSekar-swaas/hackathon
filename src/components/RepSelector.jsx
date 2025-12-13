/**
 * @confidential
 * @fileoverview Representative selector component with avatar cards
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import Card from './common/Card.jsx';
import { UI_TEXT, CSS_CLASSES, AVATAR_COLORS } from '../constants/uiConstants.js';
import { getInitials } from '../utils/performanceUtils.js';

/**
 * RepSelector component
 * @description Displays grid of representative cards for selection
 * @param {Object} props - Component props
 * @param {Array<Object>} props.reps - Array of representative data objects
 * @param {string} props.selectedRepId - Currently selected rep ID
 * @param {Function} props.onSelectRep - Callback when rep is selected
 * @returns {JSX.Element} RepSelector component
 * @author Aravind Sekar
 * @created 13-12-2025
 * @confidential
 */
const RepSelector = ({ reps, selectedRepId, onSelectRep }) => {
  /**
   * Gets avatar color for representative
   * @description Returns gradient class based on index
   * @param {number} index - Rep index in array
   * @returns {string} CSS gradient class
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const getAvatarColor = index => {
    return AVATAR_COLORS[index % AVATAR_COLORS.length];
  };

  /**
   * Checks if rep is currently selected
   * @description Compares rep ID with selected ID
   * @param {string} repId - Representative ID
   * @returns {boolean} True if selected
   * @author Aravind Sekar
   * @created 13-12-2025
   * @confidential
   */
  const isSelected = repId => {
    return repId === selectedRepId;
  };

  return (
    <div className='mb-8'>
      <h2 className={`text-xl font-semibold mb-4 ${CSS_CLASSES.TEXT_PRIMARY}`}>
        {UI_TEXT.SELECT_REP}
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {reps.map((rep, index) => (
          <Card
            key={rep.id}
            hover={true}
            onClick={() => onSelectRep(rep.id)}
            className={`p-6 ${isSelected(rep.id) ? 'ring-2 ring-blue-500' : ''}`}
          >
            <div className='flex flex-col items-center text-center'>
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold mb-3 ${getAvatarColor(
                  index
                )}`}
              >
                {getInitials(rep.personalInfo.name)}
              </div>

              <h3 className={`font-semibold ${CSS_CLASSES.TEXT_PRIMARY} mb-1`}>
                {rep.personalInfo.name}
              </h3>

              <p className={`text-sm ${CSS_CLASSES.TEXT_SECONDARY} mb-1`}>
                {rep.personalInfo.territory}
              </p>

              <p className={`text-xs ${CSS_CLASSES.TEXT_MUTED}`}>{rep.personalInfo.experience}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RepSelector;
