export const initAnalytics = () => {
  // eslint-disable-next-line no-console
  console.info("Analytics init with key:", import.meta.env.VITE_ANALYTICS_KEY || "<<ANALYTICS_KEY>>");
  // <<ANALYTICS_TOOL>> initialization
};

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  // eslint-disable-next-line no-console
  console.info(`[Analytics] ${eventName}`, properties);
  // <<ANALYTICS_TOOL>> track implementation
};
