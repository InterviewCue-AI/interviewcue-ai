export const waitlistForm = {
  appsScriptEndpoint: import.meta.env.PUBLIC_WAITLIST_APPS_SCRIPT_ENDPOINT || '',
};

export const isWaitlistAppsScriptConfigured = Boolean(waitlistForm.appsScriptEndpoint);
