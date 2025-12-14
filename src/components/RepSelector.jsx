/**
 * @confidential
 * @fileoverview Representative selector component with avatar cards
 * @author Aravind Sekar
 * @created 13-12-2025
 */

import Card from './common/Card.jsx';
import { AVATAR_COLORS } from '../constants/uiConstants.js';
import { getInitials } from '../utils/performanceUtils.js';
import { useTheme } from '../context/ThemeContext.jsx';

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
  const { isDark } = useTheme();

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
    <div className='relative px-1'>
      <div className='flex gap-4 overflow-x-auto pb-4 pt-2 px-2 scrollbar-hide'>
        {reps.map((rep, index) => {
          const selected = isSelected(rep.id);
          return (
            <div
              key={rep.id}
              onClick={() => onSelectRep(rep.id)}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-300 transform ${
                selected ? 'scale-105' : 'hover:scale-102'
              }`}
            >
              <Card
                className={`p-5 min-w-[220px] transition-all duration-300 ${
                  selected
                    ? 'ring-2 ring-teal-500 bg-gradient-to-br from-teal-500/20 to-teal-600/10 shadow-lg shadow-teal-500/20'
                    : 'hover:bg-slate-700/40 hover:shadow-md'
                }`}
              >
                <div className='flex items-center gap-4'>
                  <div className='relative'>
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold shadow-lg transition-all duration-300 ${getAvatarColor(
                        index
                      )} ${selected ? 'ring-2 ring-white/30 ring-offset-2 ring-offset-slate-800' : ''}`}
                    >
                      {getInitials(rep.personalInfo.name)}
                    </div>
                    {selected && (
                      <div className='absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center shadow-lg'>
                        <span className='text-white text-xs'>✓</span>
                      </div>
                    )}
                  </div>

                  <div className='flex-1 min-w-0'>
                    <h3
                      className={`font-bold mb-1 truncate transition-colors ${
                        selected
                          ? 'text-teal-500 text-base'
                          : isDark
                            ? 'text-slate-200 text-sm'
                            : 'text-slate-900 text-sm'
                      }`}
                    >
                      {rep.personalInfo.name}
                    </h3>

                    <div className='flex items-center gap-1.5 mb-1'>
                      <span className='text-xs'>📍</span>
                      <p className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {rep.personalInfo.territory}
                      </p>
                    </div>

                    <div className='flex items-center gap-1.5'>
                      <span className='text-xs'>💼</span>
                      <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                        {rep.personalInfo.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {selected && (
                <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-teal-500'></div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default RepSelector;
