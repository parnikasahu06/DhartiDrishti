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
    dataStatus: 'LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Persistent deformation detected across historical baseline',
      'Increasing velocity trend in recent acquisitions',
      'Forecast indicates continued movement breaching threshold'
    ],
    recommendedAction: 'Prioritize field inspection',
    fieldChecklist: [
      { id: 'c1', label: 'Ground Fissure & Structural Crack Survey', completed: false },
      { id: 'c2', label: 'Existing Crack Meter / Extensometer Cross-Check', completed: false },
      { id: 'c3', label: 'Site Observation & Slope Wall Inspection', completed: false }
    ],
    inspectorNotes: 'Minor tension cracks observed along eastern terrace embankment. Extensometer reading cross-checked at site.',
    evidence: {
      persistentDeformation: {
        title: 'Persistent deformation',
        value: '-1.25 mm / month',
        status: 'CRITICAL',
        desc: 'Continuous linear downward displacement detected across 24 consecutive Sentinel-1 SAR acquisitions.'
      },
      increasingTrend: {
        title: 'Increasing velocity trend',
        value: '+42% Velocity Acceleration',
        status: 'WARNING',
        desc: 'Displacement rate accelerated from -0.8 mm/mo to -1.25 mm/mo post-monsoon.'
      },
      forecastDeterioration: {
        title: 'Forecast indicates continued movement',
        value: '-18.7 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'LSTM neural network projects trajectory will exceed critical -15.0 mm safety limit.'
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
    dataStatus: 'LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Persistent deformation detected on pit wall rim',
      'Increasing velocity trend accelerated after heavy rainfall',
      'Forecast indicates continued movement towards haulage corridor'
    ],
    recommendedAction: 'Prioritize field inspection',
    fieldChecklist: [
      { id: 'c1', label: 'Pit Wall Rim Fissure Inspection', completed: false },
      { id: 'c2', label: 'Optical Total Station Extensometer Audit', completed: false },
      { id: 'c3', label: 'Site Observation & Haulage Access Safety Check', completed: false }
    ],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Persistent deformation',
        value: '-2.40 mm / month',
        status: 'CRITICAL',
        desc: 'Rapid ground subsidence detected along overburden terrace wall.'
      },
      increasingTrend: {
        title: 'Increasing velocity trend',
        value: '+85% Velocity Spike',
        status: 'CRITICAL',
        desc: 'Velocity acceleration verified across ascending and descending orbit geometry.'
      },
      forecastDeterioration: {
        title: 'Forecast indicates continued movement',
        value: '-35.2 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'Neural network projects severe slope movement requiring prompt verification.'
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
    dataStatus: 'LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Minimal background displacement within normal limits',
      'No acceleration observed in time-series'
    ],
    recommendedAction: 'Continue routine satellite monitoring',
    fieldChecklist: [
      { id: 'c1', label: 'Routine Sensor Audit', completed: true }
    ],
    inspectorNotes: 'Ground stable.',
    evidence: {
      persistentDeformation: {
        title: 'Persistent deformation',
        value: '-0.15 mm / month',
        status: 'NORMAL',
        desc: 'Minor settlement within natural soil compaction limits.'
      },
      increasingTrend: {
        title: 'Increasing velocity trend',
        value: 'Stable Rate',
        status: 'NORMAL',
        desc: 'Trajectory remains flat.'
      },
      forecastDeterioration: {
        title: 'Forecast indicates continued movement',
        value: '-2.8 mm @ 30 Days',
        status: 'NORMAL',
        desc: 'Forecast remains well within safe threshold.'
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
    dataStatus: 'LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Ongoing low-rate subsidence (-0.55 mm/month)',
      'Baseline trend requires routine tracking'
    ],
    recommendedAction: 'Schedule routine satellite scan',
    fieldChecklist: [],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Persistent deformation',
        value: '-0.55 mm / month',
        status: 'ELEVATED',
        desc: 'Displacement rate steady near operational monitoring threshold.'
      },
      increasingTrend: {
        title: 'Increasing velocity trend',
        value: 'Constant Velocity',
        status: 'NORMAL',
        desc: 'No velocity spike in recent acquisitions.'
      },
      forecastDeterioration: {
        title: 'Forecast indicates continued movement',
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
    dataStatus: 'LOCATION: REAL · DEFORMATION VALUES: ILLUSTRATIVE',
    verifiedAt: null,
    verifiedBy: null,
    flaggedReasons: [
      'Persistent deformation detected across Mand coal basin',
      'Increasing velocity trend in recent passes',
      'Forecast indicates continued movement breaching threshold'
    ],
    recommendedAction: 'Prioritize field inspection',
    fieldChecklist: [
      { id: 'c1', label: 'Ground Fissure & Extensometer Audit', completed: false }
    ],
    inspectorNotes: '',
    evidence: {
      persistentDeformation: {
        title: 'Persistent deformation',
        value: '-1.45 mm / month',
        status: 'CRITICAL',
        desc: 'Significant displacement detected by InSAR.'
      },
      increasingTrend: {
        title: 'Increasing velocity trend',
        value: '+35% Velocity Acceleration',
        status: 'WARNING',
        desc: 'Velocity acceleration observed.'
      },
      forecastDeterioration: {
        title: 'Forecast indicates continued movement',
        value: '-21.0 mm @ 30 Days',
        status: 'CRITICAL',
        desc: 'Deterioration predicted to reach intervention status.'
      }
    }
  }
];

// Generates time-series points for observed and forecast
export function generateTimeSeries(zone) {
  const dates = [];
  const observedData = [];
  const forecastData = [];
  const confidenceUpper = [];
  const confidenceLower = [];

  const now = new Date('2026-09-06');
  const daysPerAcquisition = 12;

  for (let i = 24; i >= 0; i--) {
    const d = new Date(now.getTime() - i * daysPerAcquisition * 24 * 60 * 60 * 1000);
    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: '2-digit' });
    dates.push(dateStr);

    let currentVal = 0;
    if (i === 24) {
      currentVal = 0;
    } else {
      const noise = (Math.sin(i * 0.7) * 0.4) - 0.2;
      const step = (zone.currentDeformation / 24) + (noise * 0.3);
      currentVal = ((24 - i) / 24) * zone.currentDeformation + (noise * 0.2);
    }
    
    if (i === 0) {
      currentVal = zone.currentDeformation;
    }

    observedData.push(Number(currentVal.toFixed(1)));
    forecastData.push(null);
    confidenceUpper.push(null);
    confidenceLower.push(null);
  }

  forecastData[observedData.length - 1] = zone.currentDeformation;
  confidenceUpper[observedData.length - 1] = zone.currentDeformation;
  confidenceLower[observedData.length - 1] = zone.currentDeformation;

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
