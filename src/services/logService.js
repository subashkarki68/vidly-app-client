import * as Sentry from "@sentry/react";

const sentry = {
  init: () => {
    Sentry.init({
      dsn: "https://3fbd49814064c57c9bc255c8c1d3b8d8@o4505934008942592.ingest.sentry.io/4505934010515456",
      integrations: [
        new Sentry.BrowserTracing({
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: [
            "localhost",
            /^https:\/\/jsonplaceholder.typicode\.com\//,
          ],
        }),
        new Sentry.Replay(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
      // Session Replay
      replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
  },

  log: (error) => {
    Sentry.captureException(error);
  },
};

export default sentry;
