// DHARTI DRISHTI - Synthetic Demonstration Dataset
// Open/published SBAS-InSAR displacement methodology demo values
// PROTOTYPE MODE · DEMONSTRATION DATASET

export const SATELLITE_METADATA = {
  constellation: 'SENTINEL-1A / 1B SAR',
  sensorMode: 'IW (Interferometric Wide Swath)',
  polarization: 'VV + VH',
  heading: 'Descending (Track 165)',
  orbitCycle: '12 Days',
  lastObservation: '06 Sep 2026',
  processingEngine: 'ISCE2 + MintPy (SBAS-InSAR)',
  atmosphereCorrection: 'GACOS Zenith Delay Correction',
  demReference: 'SRTM 30m v3',
  unwrapAlgorithm: 'SNAPHU v2.0',
  forecastModel: 'Stacked LSTM Neural Network (30-day Horizon)',
};

export const CHHATTISGARH_CENTER = [22.358, 82.684]; // Korba Mining Sector

export const MONITORING_ZONES = [
  {
    id: 'KRB-03',
    name: 'KORBA · MONITORING ZONE 03',
    district: 'Korba',
    locationName: 'Gevra Open Cast Slope Perimeter',
    lat: 22.3582,
    lng: 82.6841,
    currentDeformation: -12.4, // mm
    trend: 'INCREASING',
    trendRate: -1.25, // mm/month
    forecast30Day: -18.7, // mm
    forecast60Day: -24.2, // mm
    riskScore: 82,
    riskLevel: 'HIGH', // LOW, MEDIUM, HIGH, CRITICAL
    priorityBadge: 'HIGH PRIORITY',
    status: 'INSPECTION_REQUIRED', // STABLE, MONITORING, INSPECTION_REQUIRED, VERIFIED
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Persistent downward deformation rate (-1.25 mm/month continuous)',
      'Increasing deformation acceleration in last 3 satellite passes',
      '30-day LSTM forecast predicts breaching -15.0 mm safety limit'
    ],
    recommendedAction: 'PRIORITIZE FIELD INSPECTION',
    fieldChecklist: [
      { id: 'c1', label: 'Ground Fissure & Crack Survey along Slope Wall', completed: false },
      { id: 'c2', label: 'Cross-check Existing Crack Meter / Extensometer Sensors', completed: false },
      { id: 'c3', label: 'Visual Inspection of Nearby Drainage & Retaining Walls', completed: false }
    ],
    inspectorNotes: 'Minor tension cracks observed along eastern terrace embankment. In-situ extensometer recorded -11.8 mm cumulative displacement.',
    evidence: {
      persistentDeformation: {
        title: 'Persistent Displacement Rate',
        value: '-1.25 mm / month',
        status: 'CRITICAL',
        desc: 'Continuous linear downward displacement detected across 24 consecutive Sentinel-1 SAR acquisitions without seasonal rebound.'
      },
      increasingTrend: {
        title: 'Acceleration Shift',
        value: '+42% Velocity Acceleration',
        status: 'WARNING',
        desc: 'Displacement rate accelerated from -0.8 mm/mo to -1.25 mm/mo following monsoon saturation.'
      },
      forecastDeterioration: {
        title: 'LSTM Forecast Projection',
        value: '-18.7 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'Deep learning model projects trajectory will exceed critical -15.0 mm displacement threshold within 30 days.'
      }
    }
  },
  {
    id: 'KRB-04',
    name: 'KORBA WEST · PIT WALL 04',
    district: 'Korba',
    locationName: 'Dipka Sector B Overburden Dump',
    lat: 22.3825,
    lng: 82.6312,
    currentDeformation: -24.5,
    trend: 'ACCELERATING',
    trendRate: -2.40,
    forecast30Day: -35.2,
    forecast60Day: -46.8,
    riskScore: 94,
    riskLevel: 'CRITICAL',
    priorityBadge: 'CRITICAL PRIORITY',
    status: 'INSPECTION_REQUIRED',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Severe slope displacement rate (-2.40 mm/month continuous)',
      'Non-linear deformation acceleration detected after heavy rainfall',
      'High proximity (180m) to haulage access road infrastructure'
    ],
    recommendedAction: 'IMMEDIATE FIELD VERIFICATION & RETAINING WALL AUDIT',
    fieldChecklist: [
      { id: 'c1', label: 'Inspect Pit Wall Rim Fissures', completed: false },
      { id: 'c2', label: 'Optical Total Station Distance Verification', completed: false },
      { id: 'c3', label: 'Restrict Heavy Machinery Haulage Access', completed: false }
    ],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Severe Cumulative Displacement',
        value: '-2.40 mm / month',
        status: 'CRITICAL',
        desc: 'Rapid ground subsidence detected along the pit rim overburden face.'
      },
      increasingTrend: {
        title: 'Non-linear Acceleration',
        value: '+85% Rate Spike',
        status: 'CRITICAL',
        desc: 'Sharp acceleration trend verified across ascending and descending orbit geometry.'
      },
      forecastDeterioration: {
        title: 'Threshold Breach Projection',
        value: '-35.2 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'LSTM neural network projects severe slope movement requiring prompt site action.'
      }
    }
  },
  {
    id: 'KRB-01',
    name: 'KORBA SOUTH · RESIDENTIAL PERIMETER',
    district: 'Korba',
    locationName: 'Manikpur Buffer Zone',
    lat: 22.3120,
    lng: 82.7214,
    currentDeformation: -2.1,
    trend: 'STABLE',
    trendRate: -0.15,
    forecast30Day: -2.8,
    forecast60Day: -3.4,
    riskScore: 18,
    riskLevel: 'LOW',
    priorityBadge: 'LOW RISK',
    status: 'STABLE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Minimal background displacement rate within normal seasonal bounds',
      'No significant trend acceleration observed in past 12 months'
    ],
    recommendedAction: 'CONTINUE ROUTINE SATELLITE MONITORING',
    fieldChecklist: [
      { id: 'c1', label: 'Routine Quarterly Sensor Audit', completed: true }
    ],
    inspectorNotes: 'Ground stable. No distress signs.',
    evidence: {
      persistentDeformation: {
        title: 'Background Settlement',
        value: '-0.15 mm / month',
        status: 'NORMAL',
        desc: 'Minor baseline settlement within natural elastic soil compaction limits.'
      },
      increasingTrend: {
        title: 'Zero Acceleration',
        value: 'Stable Rate',
        status: 'NORMAL',
        desc: 'Trajectory remains flat over consecutive SAR acquisitions.'
      },
      forecastDeterioration: {
        title: 'Low Model Risk Projection',
        value: '-2.8 mm @ 30 Days',
        status: 'NORMAL',
        desc: 'Forecast trajectory remains comfortably within safe operational thresholds.'
      }
    }
  },
  {
    id: 'KRB-02',
    name: 'KORBA EAST · SEAM 02',
    district: 'Korba',
    locationName: 'Kusmunda Pit Wall Boundary',
    lat: 22.3412,
    lng: 82.7538,
    currentDeformation: -6.8,
    trend: 'MODERATE',
    trendRate: -0.55,
    forecast30Day: -9.4,
    forecast60Day: -12.1,
    riskScore: 45,
    riskLevel: 'MEDIUM',
    priorityBadge: 'MODERATE PRIORITY',
    status: 'MONITORING',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Gradual ongoing subsidence (-0.55 mm/month)',
      'Stable baseline trend but requires continued observation'
    ],
    recommendedAction: 'SCHEDULE ROUTINE BI-WEEKLY SATELLITE SCAN',
    fieldChecklist: [
      { id: 'c1', label: 'Bi-monthly Visual Site Inspection', completed: false }
    ],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Moderate Subsidence Rate',
        value: '-0.55 mm / month',
        status: 'ELEVATED',
        desc: 'Displacement rate steady near operational monitoring threshold.'
      },
      increasingTrend: {
        title: 'Linear Trend',
        value: 'Constant Velocity',
        status: 'NORMAL',
        desc: 'No significant velocity spike observed in recent acquisitions.'
      },
      forecastDeterioration: {
        title: 'Predictive Projection',
        value: '-9.4 mm @ 30 Days',
        status: 'ELEVATED',
        desc: 'Forecast shows continuous low-rate settlement.'
      }
    }
  },
  {
    id: 'RGH-01',
    name: 'RAIGARH · MAND BASIN ZONE 01',
    district: 'Raigarh',
    locationName: 'Gare Palma Open Cast Perimeter',
    lat: 21.9015,
    lng: 83.3920,
    currentDeformation: -14.2,
    trend: 'INCREASING',
    trendRate: -1.45,
    forecast30Day: -21.0,
    forecast60Day: -27.5,
    riskScore: 78,
    riskLevel: 'HIGH',
    priorityBadge: 'HIGH PRIORITY',
    status: 'INSPECTION_REQUIRED',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Persistent downward deformation rate (-1.45 mm/month)',
      'Substantial forecast deterioration beyond -20 mm within 30 days'
    ],
    recommendedAction: 'PRIORITIZE FIELD INSPECTION & STABILITY REPORT',
    fieldChecklist: [
      { id: 'c1', label: 'Geotechnical Soil Sampling & Crack Inspection', completed: false }
    ],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Subsidence Trend',
        value: '-1.45 mm / month',
        status: 'CRITICAL',
        desc: 'Significant multi-temporal surface displacement detected by SBAS-InSAR.'
      },
      increasingTrend: {
        title: 'Velocity Acceleration',
        value: '+35% Increase',
        status: 'WARNING',
        desc: 'Acceleration observed following recent excavation expansion.'
      },
      forecastDeterioration: {
        title: 'LSTM Risk Curve',
        value: '-21.0 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'Deterioration predicted to reach high-priority intervention status.'
      }
    }
  },
  {
    id: 'SUR-01',
    name: 'SURGUJA · PARSA BLOCK 01',
    district: 'Surguja',
    locationName: 'Hasdeo Mining Boundary South',
    lat: 23.1245,
    lng: 83.1982,
    currentDeformation: -5.4,
    trend: 'STABLE',
    trendRate: -0.45,
    forecast30Day: -8.1,
    forecast60Day: -10.8,
    riskScore: 52,
    riskLevel: 'MEDIUM',
    priorityBadge: 'MODERATE PRIORITY',
    status: 'MONITORING',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Ongoing low-level surface movement (-0.45 mm/month)',
      'No critical threshold breach predicted in 30 days'
    ],
    recommendedAction: 'MAINTAIN REGULAR SATELLITE TIME-SERIES SCANNING',
    fieldChecklist: [],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Low Subsidence',
        value: '-0.45 mm / month',
        status: 'ELEVATED',
        desc: 'Controlled displacement observed across forest perimeter.'
      },
      increasingTrend: {
        title: 'Steady State',
        value: 'Uniform',
        status: 'NORMAL',
        desc: 'Uniform velocity with minor moisture-induced variance.'
      },
      forecastDeterioration: {
        title: 'LSTM Forecast',
        value: '-8.1 mm @ 30 Days',
        status: 'NORMAL',
        desc: 'Forecast indicates low risk of slope failure.'
      }
    }
  },
  {
    id: 'BIL-01',
    name: 'BILASPUR · BUFFER SECTOR 01',
    district: 'Bilaspur',
    locationName: 'Northern Railway Freight Corridor',
    lat: 22.0835,
    lng: 82.1550,
    currentDeformation: -1.8,
    trend: 'STABLE',
    trendRate: -0.12,
    forecast30Day: -2.2,
    forecast60Day: -2.7,
    riskScore: 15,
    riskLevel: 'LOW',
    priorityBadge: 'LOW RISK',
    status: 'STABLE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Background movement well within infrastructure tolerance limits'
    ],
    recommendedAction: 'ROUTINE SATELLITE DISPLACEMENT TRACKING',
    fieldChecklist: [],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Nominal Baseline',
        value: '-0.12 mm / month',
        status: 'NORMAL',
        desc: 'Infrastructure foundation remains highly stable.'
      },
      increasingTrend: {
        title: 'Zero Acceleration',
        value: 'Static',
        status: 'NORMAL',
        desc: 'No significant velocity variance recorded.'
      },
      forecastDeterioration: {
        title: 'Stable Model Output',
        value: '-2.2 mm @ 30 Days',
        status: 'NORMAL',
        desc: 'No threshold breach predicted.'
      }
    }
  }
];

// Generates time-series points for observed (24 acquisitions, past 12 months) and forecast (6 acquisitions, next 60 days)
export function generateTimeSeries(zone) {
  const dates = [];
  const observedData = [];
  const forecastData = [];
  const confidenceUpper = [];
  const confidenceLower = [];

  const now = new Date('2026-09-06');
  const daysPerAcquisition = 12; // Sentinel-1 repeat cycle

  // 24 historical points
  let currentVal = 0;
  const ratePerAcquisition = (zone.currentDeformation / 24) * 1.1;

  for (let i = 24; i >= 0; i--) {
    const d = new Date(now.getTime() - i * daysPerAcquisition * 24 * 60 * 60 * 1000);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' });
    dates.push(dateStr);

    if (i === 24) {
      currentVal = 0;
    } else {
      // Add slight noise to simulate real SBAS phase variance
      const noise = (Math.sin(i * 0.7) * 0.4) - 0.2;
      const step = (zone.currentDeformation / 24) + (noise * 0.3);
      currentVal += step;
    }
    
    // Exact match for current date (last observed)
    if (i === 0) {
      currentVal = zone.currentDeformation;
    }

    observedData.push(Number(currentVal.toFixed(1)));
    forecastData.push(null);
    confidenceUpper.push(null);
    confidenceLower.push(null);
  }

  // Connect forecast starting point to last observed
  forecastData[observedData.length - 1] = zone.currentDeformation;
  confidenceUpper[observedData.length - 1] = zone.currentDeformation;
  confidenceLower[observedData.length - 1] = zone.currentDeformation;

  // 6 forecast points (30-60 day horizon)
  let forecastVal = zone.currentDeformation;
  const forecastStep = (zone.forecast60Day - zone.currentDeformation) / 6;

  for (let f = 1; f <= 6; f++) {
    const d = new Date(now.getTime() + f * daysPerAcquisition * 24 * 60 * 60 * 1000);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' }) + ' (FC)';
    dates.push(dateStr);

    forecastVal += forecastStep;
    const fValFixed = Number(forecastVal.toFixed(1));

    observedData.push(null);
    forecastData.push(fValFixed);
    
    // Confidence interval widens over time (+/- 1.2mm to 3.5mm)
    const errorMargin = 0.8 + (f * 0.5);
    confidenceUpper.push(Number((fValFixed + errorMargin).toFixed(1)));
    confidenceLower.push(Number((fValFixed - errorMargin).toFixed(1)));
  }

  return {
    labels: dates,
    observed: observedData,
    forecast: forecastData,
    confidenceUpper,
    confidenceLower,
  };
}
