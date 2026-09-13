// Tracks the currently-running document view transition (started by the
// theme ripple in BackgroundPicker) so it can be force-finished the instant
// a route change happens. Without this, navigating away mid-transition on
// mobile can leave the browser's screenshot overlay stuck on screen,
// showing the old theme color after the real DOM has already updated.
interface TrackedViewTransition {
  finished: Promise<void>;
  skipTransition: () => void;
}

let active: TrackedViewTransition | null = null;

export const registerViewTransition = (transition: TrackedViewTransition) => {
  active = transition;
  transition.finished.finally(() => {
    if (active === transition) active = null;
  });
};

export const skipActiveViewTransition = () => {
  active?.skipTransition();
  active = null;
};
