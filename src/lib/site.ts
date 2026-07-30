export const site = {
  name: 'InterviewCue AI',
  shortName: 'InterviewCue',
  alternateName: 'InterviewCue',
  url: import.meta.env.PUBLIC_SITE_URL || 'https://www.interviewcue.ai',
  description:
    'InterviewCue AI is an AI interview coach for software and internet-industry candidates, with ATS resume optimization, role-specific mock interviews, and real-time interview cues.',
  defaultTitle: 'InterviewCue AI | AI Interview Coach for Software Careers',
  app: {
    homePath: '/app/home/',
    homeUrl: import.meta.env.PUBLIC_APP_HOME_URL || '/waitlist/',
  },
  nav: [
    { label: 'Copilot', href: '/ai-interview-copilot/' },
    { label: 'Mock Interview', href: '/ai-mock-interview/' },
    { label: 'Questions', href: '/interview-questions/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'About', href: '/about/' },
  ],
  cta: {
    label: import.meta.env.PUBLIC_CTA_LABEL || 'Join waitlist',
    href: import.meta.env.PUBLIC_CTA_HREF || '/waitlist/',
    trackingKey: import.meta.env.PUBLIC_CTA_TRACKING_KEY || 'join_waitlist',
  },
  contact: {
    email: 'support@interviewcue.ai',
    gmailComposeUrl: 'https://mail.google.com/mail/?view=cm&fs=1&to=support%40interviewcue.ai',
  },
  social: {
    twitter: '',
    linkedin: '',
  },
};

export const roles = [
  'Software Engineer',
  'Frontend Engineer',
  'Backend Engineer',
  'Full-stack Engineer',
  'Product Manager',
  'Data Engineer',
  'Machine Learning Engineer',
  'DevOps Engineer',
  'QA / SDET',
];

export const interviewTypes = [
  'Coding',
  'System design',
  'Behavioral',
  'Architecture tradeoffs',
  'Product sense',
  'Debugging',
];
