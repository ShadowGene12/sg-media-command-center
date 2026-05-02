import { useEffect } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const useOnboarding = (tier: 'diy' | 'dfy' = 'diy') => {
  useEffect(() => {
    // Only run once per session (in reality, store this in localStorage or Zustand)
    const hasSeenTour = localStorage.getItem(`has_seen_${tier}_tour`);
    if (hasSeenTour) return;

    const diySteps = [
      { element: '#tour-score', popover: { title: 'Your Growth Score', description: 'This is your overall infrastructure health out of 25.', side: 'right', align: 'start' } },
      { element: '#tour-actions', popover: { title: 'Priority Action Plan', description: 'These are the highest-leverage tasks you need to complete this week to move the needle.', side: 'left', align: 'start' } },
      { element: '#tour-weakest', popover: { title: 'Your Weakest Pillar', description: 'We identified this as your biggest bottleneck. Focus your learning here.', side: 'top', align: 'center' } }
    ];

    const dfySteps = [
      { element: '#tour-client-health', popover: { title: 'Client Health', description: 'Your managed infrastructure health score.', side: 'bottom', align: 'start' } },
      { element: '#tour-client-reports', popover: { title: 'Strategic Reports', description: 'Access the deep-dive audits and strategies created by the SG Media team.', side: 'left', align: 'start' } }
    ];

    const driverObj = driver({
      showProgress: true,
      animate: true,
      steps: tier === 'diy' ? diySteps : dfySteps as any,
      onDestroyStarted: () => {
        localStorage.setItem(`has_seen_${tier}_tour`, 'true');
        driverObj.destroy();
      }
    });

    // Slight delay to ensure DOM is fully rendered before starting
    setTimeout(() => {
      driverObj.drive();
    }, 1000);

  }, [tier]);
};
