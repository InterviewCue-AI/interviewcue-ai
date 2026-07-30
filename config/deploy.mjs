const publicConfig = {
  gaMeasurementId: process.env.PUBLIC_GA_MEASUREMENT_ID || '',
  appHomeUrl: process.env.PUBLIC_APP_HOME_URL || '/waitlist/',
  ctaLabel: process.env.PUBLIC_CTA_LABEL || 'Join waitlist',
  ctaHref: process.env.PUBLIC_CTA_HREF || '/waitlist/',
  ctaTrackingKey: process.env.PUBLIC_CTA_TRACKING_KEY || 'join_waitlist',
};

export const deployTargets = {
  dev: {
    ...publicConfig,
    siteUrl: process.env.PUBLIC_DEV_SITE_URL || 'http://localhost:4321',
  },
  prod: {
    ...publicConfig,
    siteUrl: process.env.PUBLIC_SITE_URL || 'https://www.interviewcue.ai',
  },
};

export function getDeployTarget(name) {
  const target = deployTargets[name];

  if (!target) {
    throw new Error(`Unknown deploy target "${name}". Use one of: ${Object.keys(deployTargets).join(', ')}`);
  }

  return target;
}
