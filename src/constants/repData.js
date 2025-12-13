/**
 * @confidential
 * @fileoverview Mock CRM data for Medical Rep Performance Story Builder
 * @author Aravind Sekar
 * @created 13-12-2025
 */

/**
 * Complete mock CRM dataset for Innovation Pharma medical representatives
 * @constant {Object} REP_PERFORMANCE_DATA
 */
export const REP_PERFORMANCE_DATA = {
  metadata: {
    description: 'Mock CRM data for Medical Rep Performance Story Builder',
    lastUpdated: '2024-12-31',
    dataRange: 'Jul 2024 - Dec 2024',
    fields: {
      visits: 'Number of doctor visits made',
      coverage: 'Percentage of territory doctors covered',
      samples: 'Number of product samples distributed',
      calls: 'Number of calls logged in CRM',
      target: 'Monthly visit target assigned'
    }
  },
  reps: [
    {
      id: 'rep-001',
      personalInfo: {
        name: 'Priya Sharma',
        territory: 'Mumbai West',
        region: 'Maharashtra',
        joinDate: '2021-03-15',
        experience: '3+ years'
      },
      assignments: {
        products: ['CardioMax', 'NeuroPlex', 'DiabeCare'],
        topDoctors: [
          { name: 'Dr. Mehta', specialty: 'Cardiology', tier: 'A' },
          { name: 'Dr. Patel', specialty: 'General Medicine', tier: 'A' },
          { name: 'Dr. Iyer', specialty: 'Endocrinology', tier: 'B' }
        ],
        totalDoctorsInTerritory: 125
      },
      monthlyPerformance: [
        {
          month: 'Jul 2024',
          metrics: {
            visits: 78,
            coverage: 72,
            samples: 340,
            calls: 156,
            target: 85
          },
          notes: 'Territory expansion phase'
        },
        {
          month: 'Aug 2024',
          metrics: {
            visits: 82,
            coverage: 75,
            samples: 380,
            calls: 168,
            target: 85
          },
          notes: 'Improved doctor engagement'
        },
        {
          month: 'Sep 2024',
          metrics: {
            visits: 91,
            coverage: 81,
            samples: 420,
            calls: 182,
            target: 85
          },
          notes: 'CME event boost'
        },
        {
          month: 'Oct 2024',
          metrics: {
            visits: 88,
            coverage: 79,
            samples: 395,
            calls: 175,
            target: 85
          },
          notes: 'Festival season slowdown'
        },
        {
          month: 'Nov 2024',
          metrics: {
            visits: 95,
            coverage: 84,
            samples: 450,
            calls: 192,
            target: 85
          },
          notes: 'Post-festival recovery'
        },
        {
          month: 'Dec 2024',
          metrics: {
            visits: 102,
            coverage: 88,
            samples: 485,
            calls: 205,
            target: 85
          },
          notes: 'Year-end push successful'
        }
      ],
      performanceSummary: {
        trend: 'Strong Upward',
        avgTargetAchievement: 103,
        bestMonth: 'Dec 2024',
        areasOfImprovement: ['New doctor acquisition', 'Evening calls']
      }
    },
    {
      id: 'rep-002',
      personalInfo: {
        name: 'Rajesh Kumar',
        territory: 'Delhi NCR',
        region: 'North',
        joinDate: '2020-08-10',
        experience: '4+ years'
      },
      assignments: {
        products: ['ImmunoShield', 'RespiClear', 'BoneStrong'],
        topDoctors: [
          { name: 'Dr. Gupta', specialty: 'Orthopedics', tier: 'A' },
          { name: 'Dr. Singh', specialty: 'Pulmonology', tier: 'A' },
          { name: 'Dr. Verma', specialty: 'General Medicine', tier: 'B' }
        ],
        totalDoctorsInTerritory: 150
      },
      monthlyPerformance: [
        {
          month: 'Jul 2024',
          metrics: {
            visits: 95,
            coverage: 88,
            samples: 520,
            calls: 210,
            target: 90
          },
          notes: 'Peak performance month'
        },
        {
          month: 'Aug 2024',
          metrics: {
            visits: 92,
            coverage: 85,
            samples: 490,
            calls: 195,
            target: 90
          },
          notes: 'Slight dip due to monsoon'
        },
        {
          month: 'Sep 2024',
          metrics: {
            visits: 88,
            coverage: 82,
            samples: 465,
            calls: 185,
            target: 90
          },
          notes: 'Team restructuring impact'
        },
        {
          month: 'Oct 2024',
          metrics: {
            visits: 85,
            coverage: 78,
            samples: 440,
            calls: 172,
            target: 90
          },
          notes: 'Personal leave affected output'
        },
        {
          month: 'Nov 2024',
          metrics: {
            visits: 80,
            coverage: 74,
            samples: 410,
            calls: 165,
            target: 90
          },
          notes: 'Continued decline - needs attention'
        },
        {
          month: 'Dec 2024',
          metrics: {
            visits: 76,
            coverage: 71,
            samples: 385,
            calls: 158,
            target: 90
          },
          notes: 'Warning: 6-month decline trend'
        }
      ],
      performanceSummary: {
        trend: 'Declining',
        avgTargetAchievement: 92,
        bestMonth: 'Jul 2024',
        areasOfImprovement: ['Motivation', 'Territory management', 'Time management']
      }
    },
    {
      id: 'rep-003',
      personalInfo: {
        name: 'Ananya Reddy',
        territory: 'Hyderabad Central',
        region: 'Telangana',
        joinDate: '2022-01-20',
        experience: '2+ years'
      },
      assignments: {
        products: ['GastroEase', 'CardioMax', 'SleepWell'],
        topDoctors: [
          { name: 'Dr. Rao', specialty: 'Gastroenterology', tier: 'A' },
          { name: 'Dr. Krishna', specialty: 'Cardiology', tier: 'B' },
          { name: 'Dr. Nair', specialty: 'Psychiatry', tier: 'B' }
        ],
        totalDoctorsInTerritory: 110
      },
      monthlyPerformance: [
        {
          month: 'Jul 2024',
          metrics: {
            visits: 65,
            coverage: 68,
            samples: 280,
            calls: 130,
            target: 80
          },
          notes: 'New territory assignment'
        },
        {
          month: 'Aug 2024',
          metrics: {
            visits: 72,
            coverage: 72,
            samples: 320,
            calls: 145,
            target: 80
          },
          notes: 'Learning curve improving'
        },
        {
          month: 'Sep 2024',
          metrics: {
            visits: 70,
            coverage: 70,
            samples: 310,
            calls: 140,
            target: 80
          },
          notes: 'Minor setback'
        },
        {
          month: 'Oct 2024',
          metrics: {
            visits: 75,
            coverage: 74,
            samples: 340,
            calls: 155,
            target: 80
          },
          notes: 'Steady progress'
        },
        {
          month: 'Nov 2024',
          metrics: {
            visits: 78,
            coverage: 76,
            samples: 360,
            calls: 162,
            target: 80
          },
          notes: 'Consistent improvement'
        },
        {
          month: 'Dec 2024',
          metrics: {
            visits: 82,
            coverage: 79,
            samples: 390,
            calls: 175,
            target: 80
          },
          notes: 'Breaking into target zone'
        }
      ],
      performanceSummary: {
        trend: 'Gradual Improvement',
        avgTargetAchievement: 92,
        bestMonth: 'Dec 2024',
        areasOfImprovement: ['Sample utilization', 'High-tier doctor focus']
      }
    },
    {
      id: 'rep-004',
      personalInfo: {
        name: 'Vikram Joshi',
        territory: 'Pune Metro',
        region: 'Maharashtra',
        joinDate: '2019-06-01',
        experience: '5+ years'
      },
      assignments: {
        products: ['NeuroPlex', 'DiabeCare', 'RespiClear'],
        topDoctors: [
          { name: 'Dr. Kulkarni', specialty: 'Neurology', tier: 'A' },
          { name: 'Dr. Deshmukh', specialty: 'Diabetology', tier: 'A' },
          { name: 'Dr. Jain', specialty: 'Pulmonology', tier: 'A' }
        ],
        totalDoctorsInTerritory: 130
      },
      monthlyPerformance: [
        {
          month: 'Jul 2024',
          metrics: {
            visits: 88,
            coverage: 82,
            samples: 420,
            calls: 178,
            target: 85
          },
          notes: 'Consistent performer'
        },
        {
          month: 'Aug 2024',
          metrics: {
            visits: 90,
            coverage: 84,
            samples: 435,
            calls: 185,
            target: 85
          },
          notes: 'Slight uptick'
        },
        {
          month: 'Sep 2024',
          metrics: {
            visits: 87,
            coverage: 81,
            samples: 410,
            calls: 172,
            target: 85
          },
          notes: 'Minor dip'
        },
        {
          month: 'Oct 2024',
          metrics: {
            visits: 91,
            coverage: 85,
            samples: 445,
            calls: 188,
            target: 85
          },
          notes: 'Back on track'
        },
        {
          month: 'Nov 2024',
          metrics: {
            visits: 89,
            coverage: 83,
            samples: 430,
            calls: 180,
            target: 85
          },
          notes: 'Stable performance'
        },
        {
          month: 'Dec 2024',
          metrics: {
            visits: 92,
            coverage: 86,
            samples: 455,
            calls: 192,
            target: 85
          },
          notes: 'Year-end strong finish'
        }
      ],
      performanceSummary: {
        trend: 'Stable/Consistent',
        avgTargetAchievement: 105,
        bestMonth: 'Dec 2024',
        areasOfImprovement: ['Innovation in approach', 'New product adoption']
      }
    }
  ],
  benchmarks: {
    industryAverage: {
      visitsPerMonth: 75,
      coveragePercent: 70,
      samplesPerMonth: 350,
      callsPerMonth: 150
    },
    topPerformer: {
      visitsPerMonth: 100,
      coveragePercent: 90,
      samplesPerMonth: 500,
      callsPerMonth: 220
    }
  },
  kpiDefinitions: {
    visits: {
      name: 'Doctor Visits',
      description: 'Physical visits to doctors for detailing',
      frequency: 'Daily tracked, Monthly aggregated',
      targetBasis: 'Territory size and doctor tier distribution'
    },
    coverage: {
      name: 'Territory Coverage',
      description: 'Percentage of assigned doctors visited at least once in the month',
      frequency: 'Monthly',
      targetBasis: 'Minimum 80% coverage expected'
    },
    samples: {
      name: 'Sample Distribution',
      description: 'Number of product samples given to doctors',
      frequency: 'Daily tracked, Monthly aggregated',
      targetBasis: 'Product allocation per territory'
    },
    calls: {
      name: 'CRM Calls Logged',
      description: 'Total interactions logged in CRM including visits, phone calls, emails',
      frequency: 'Real-time',
      targetBasis: '2x of visit target recommended'
    }
  }
};
