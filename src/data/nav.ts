import {
  IconSettings,
  IconLockAccess,
  IconTable,
  IconChartPie,
  IconForms,
  IconComponents,
  IconMoodEmpty,
  IconRocket,
  IconWorld,
  IconUsers,
  IconAlertTriangle,
  IconCode,
  IconBlocks,
  IconCloverFilled,
  IconChartLine,
  type Icon,
} from "@tabler/icons-react";

export type Workspace = {
  name: string;
  plan: string;
  icon: Icon;
};

export const workspaces: Workspace[] = [
  { name: "RoseUI", plan: "Enterprise", icon: IconCloverFilled },
  { name: "Vertex Labs", plan: "Startup", icon: IconRocket },
  { name: "Northwind", plan: "Free", icon: IconWorld },
];

export type NavChild = {
  title: string;
  url: string;
  icon?: Icon;
  badge?: string;
  items?: NavChild[];
};

export type NavItem = {
  title: string;
  url?: string;
  icon?: Icon;
  badge?: string;
  items?: NavChild[];
};

export type NavGroup = {
  label: string;
  icon: Icon;
  items: NavItem[];
};

const unsortedNavGroups: NavGroup[] = [
  {
    label: "Blocks",
    icon: IconBlocks,
    items: [
      {
        title: "Dashboards",
        icon: IconChartLine,
        items: [{ title: "Analytics", url: "/blocks/dashboards/analytics" }],
      },
      {
        title: "Auth",
        icon: IconLockAccess,
        items: [
          { title: "Sign In", url: "/blocks/auth/sign-in" },
          { title: "Sign Up", url: "/blocks/auth/sign-up" },
          { title: "Forgot Password", url: "/blocks/auth/forgot-password" },
          { title: "Reset Password", url: "/blocks/auth/reset-password" },
          { title: "Verify OTP", url: "/blocks/auth/verify-otp" },
          { title: "Lock Screen", url: "/blocks/auth/lock-screen" },
          { title: "Multi-step Form", url: "/blocks/auth/multi-step-form" },
          { title: "Two-factor Setup", url: "/blocks/auth/two-factor-setup" },
        ],
      },
      {
        title: "Error Pages",
        icon: IconAlertTriangle,
        items: [
          { title: "404 · Not Found", url: "/blocks/error-pages/404" },
          { title: "403 · Forbidden", url: "/blocks/error-pages/403" },
          { title: "500 · Server Error", url: "/blocks/error-pages/500" },
          { title: "503 · Unavailable", url: "/blocks/error-pages/503" },
        ],
      },
      {
        title: "App Layout",
        icon: IconComponents,
        items: [
          { title: "Workspace Shell", url: "/blocks/app-layout/workspace" },
          { title: "Sidebar Behavior", url: "/blocks/app-layout/sidebar-behavior" },
          {
            title: "Sidebar Navigation",
            url: "/blocks/app-layout/sidebar-navigation",
          },
          { title: "Top Navigation", url: "/blocks/app-layout/top-navigation" },
          { title: "Resizable Workspace", url: "/blocks/app-layout/resizable" },
        ],
      },
      {
        title: "Headers and Footers",
        icon: IconComponents,
        items: [
          {
            title: "Site Header",
            url: "/blocks/headers-and-footers/site-header",
          },
          {
            title: "Page Header",
            url: "/blocks/headers-and-footers/page-header",
          },
          {
            title: "Site Footer",
            url: "/blocks/headers-and-footers/site-footer",
          },
          {
            title: "CTA Section",
            url: "/blocks/headers-and-footers/cta-section",
          },
          {
            title: "Newsletter Signup",
            url: "/blocks/headers-and-footers/newsletter-signup",
          },
        ],
      },
      {
        title: "Form",
        icon: IconForms,
        items: [
          { title: "Form", url: "/blocks/form/form" },
          { title: "Form Layouts", url: "/blocks/form/form-layouts" },
        ],
      },
      {
        title: "Developer",
        icon: IconCode,
        items: [
          { title: "API Keys", url: "/blocks/developer/api-keys" },
          {
            title: "Environment Variables",
            url: "/blocks/developer/environment-variables",
          },
          { title: "Webhooks", url: "/blocks/developer/webhooks" },
          { title: "Webhook Tester", url: "/blocks/developer/webhook-tester" },
        ],
      },
      {
        title: "Settings",
        icon: IconSettings,
        items: [
          {
            title: "Security Settings",
            url: "/blocks/settings/security-settings",
          },
          { title: "Settings Page", url: "/blocks/settings/settings-page" },
          {
            title: "Billing Overview",
            url: "/blocks/settings/billing-overview",
          },
          {
            title: "Settings Command",
            url: "/blocks/settings/settings-command",
          },
          { title: "Usage Billing", url: "/blocks/settings/usage-billing" },
          { title: "Cancel Flow", url: "/blocks/settings/cancel-flow" },
          {
            title: "Onboarding Survey",
            url: "/blocks/settings/onboarding-survey",
          },
          { title: "Spend Alert", url: "/blocks/settings/spend-alert" },
        ],
      },
      {
        title: "People",
        icon: IconUsers,
        items: [
          { title: "Team Directory", url: "/blocks/people/team-directory" },
          { title: "Team Members", url: "/blocks/people/team-members" },
          { title: "Team Showcase", url: "/blocks/people/team-showcase" },
          { title: "Invite People", url: "/blocks/people/invite-people" },
          {
            title: "Availability Picker",
            url: "/blocks/people/availability-picker",
          },
          {
            title: "Roles and Permissions",
            url: "/blocks/people/roles-permissions",
          },
        ],
      },
    ],
  },
  {
    label: "Components",
    icon: IconComponents,
    items: [
      {
        title: "Charts",
        icon: IconChartPie,
        items: [
          { title: "Line", url: "/components/line" },
          { title: "Area", url: "/components/area" },
          { title: "Bar", url: "/components/bar" },
          { title: "Pie", url: "/components/pie" },
          { title: "Donut", url: "/components/donut" },
          { title: "Radial", url: "/components/radial" },
          { title: "Radar", url: "/components/radar", badge: "Pro" },
          { title: "Funnel", url: "/components/funnel", badge: "Pro" },
          { title: "Heatmap", url: "/components/heatmap" },
          { title: "Composed", url: "/components/composed" },
          { title: "Scatter", url: "/components/scatter" },
          { title: "Sankey", url: "/components/sankey", badge: "Pro" },
          { title: "Map", url: "/components/map" },
        ],
      },
      {
        title: "Chart Components",
        icon: IconChartPie,
        items: [
          { title: "Line Chart", url: "/components/line-chart" },
          { title: "Bar Chart", url: "/components/bar-chart" },
          { title: "Donut Chart", url: "/components/donut-chart" },
          {
            title: "Streamgraph Chart",
            url: "/components/streamgraph-chart",
            badge: "Pro",
          },
          {
            title: "Brush Chart",
            url: "/components/brush-chart",
            badge: "Pro",
          },
          {
            title: "Waffle Chart",
            url: "/components/waffle-chart",
            badge: "Pro",
          },
          {
            title: "Slope Chart",
            url: "/components/slope-chart",
            badge: "Pro",
          },
          {
            title: "Sparkline Chart",
            url: "/components/sparkline-chart",
            badge: "Pro",
          },
          {
            title: "Gauge Chart",
            url: "/components/gauge-chart",
            badge: "Pro",
          },
          {
            title: "Activity Heatmap Chart",
            url: "/components/activity-heatmap-chart",
            badge: "Pro",
          },
          {
            title: "Animated Counter Chart",
            url: "/components/animated-counter-chart",
            badge: "Pro",
          },
          {
            title: "Ridgeline Chart",
            url: "/components/ridgeline-chart",
            badge: "Pro",
          },
          {
            title: "Treemap Chart",
            url: "/components/treemap-chart",
            badge: "Pro",
          },
          {
            title: "Split Bar Chart",
            url: "/components/split-bar-chart",
            badge: "Pro",
          },
          {
            title: "Sunburst Chart",
            url: "/components/sunburst-chart",
            badge: "Pro",
          },
          {
            title: "Realtime Stream Chart",
            url: "/components/realtime-stream-chart",
            badge: "Pro",
          },
          {
            title: "Race Bar Chart",
            url: "/components/race-bar-chart",
            badge: "Pro",
          },
        ],
      },
      {
        title: "Buttons",
        icon: IconComponents,
        items: [
          { title: "Button", url: "/components/button" },
          { title: "Action Button", url: "/components/action-button" },
          { title: "Close Button", url: "/components/close-button" },
          { title: "Copy Button", url: "/components/copy-button" },
          { title: "Expandable Button", url: "/components/expandable-button" },
          { title: "Link Button", url: "/components/link-button" },
          { title: "Social Button", url: "/components/social-button" },
          { title: "Button Group", url: "/components/button-group" },
          { title: "Split Button", url: "/components/split-button" },
          { title: "Action Bar", url: "/components/action-bar" },
          { title: "Toolbar", url: "/components/toolbar" },
        ],
      },
      {
        title: "Gestures",
        icon: IconComponents,
        items: [
          { title: "Hold to Confirm", url: "/components/pressable-feedback" },
          { title: "Swipe Actions", url: "/components/swipe-actions" },
          { title: "Reactions", url: "/components/emoji-reaction-button" },
          { title: "Sortable", url: "/components/sortable" },
        ],
      },
      {
        title: "Menus",
        icon: IconComponents,
        items: [
          { title: "Command", url: "/components/command" },
          { title: "Context Menu", url: "/components/context-menu" },
          { title: "Dropdown", url: "/components/dropdown" },
          { title: "Menubar", url: "/components/menubar" },
          { title: "Navigation Menu", url: "/components/navigation-menu" },
          {
            title: "Mega Menu Morph",
            url: "/components/mega-menu-morph",
            badge: "Pro",
          },
          { title: "User Menu", url: "/components/user-menu" },
        ],
      },
      {
        title: "Text Fields",
        icon: IconComponents,
        items: [
          { title: "Field", url: "/components/field" },
          { title: "Input", url: "/components/input" },
          { title: "Input Group", url: "/components/input-group" },
          { title: "Input Mask", url: "/components/input-mask" },
          { title: "Input OTP", url: "/components/input-otp" },
          { title: "Label", url: "/components/label" },
          { title: "Inline Edit", url: "/components/inline-edit" },
          { title: "Password Field", url: "/components/password-field" },
          { title: "Password Strength", url: "/components/password-strength" },
          { title: "Input Phone", url: "/components/input-phone" },
          {
            title: "Payment Card Field",
            url: "/blocks/form/payment-card-field",
          },
          { title: "Search Field", url: "/components/search-field" },
          { title: "Textarea", url: "/components/textarea" },
        ],
      },
      {
        title: "Special Inputs",
        icon: IconComponents,
        items: [
          { title: "Cascader", url: "/components/cascader" },
          { title: "Color Area", url: "/components/color-area" },
          { title: "Color Field", url: "/components/color-field" },
          { title: "Color Slider", url: "/components/color-slider" },
          { title: "Color Swatch", url: "/components/color-swatch" },
          {
            title: "Color Swatch Picker",
            url: "/components/color-swatch-picker",
          },
          { title: "Input Mention", url: "/components/input-mention" },
          { title: "Input Money", url: "/components/input-money" },
          { title: "Input Tag", url: "/components/input-tag" },
          { title: "Number Field", url: "/components/number-field" },
          { title: "Number Stepper", url: "/components/number-stepper" },
          { title: "Questionnaire", url: "/components/questionnaire" },
        ],
      },
      {
        title: "Selects",
        icon: IconComponents,
        items: [
          { title: "Autocomplete", url: "/components/autocomplete" },
          { title: "Combobox", url: "/components/combobox" },
          { title: "List Box", url: "/components/list-box" },
          { title: "Multi-select", url: "/components/multi-select" },
          { title: "Native Select", url: "/components/native-select" },
          { title: "Select", url: "/components/select" },
          { title: "Tag Group", url: "/components/tag-group" },
        ],
      },
      {
        title: "Toggles",
        icon: IconComponents,
        items: [
          { title: "Billing Toggle", url: "/components/billing-toggle" },
          { title: "Checkbox", url: "/components/checkbox" },
          { title: "Checkbox Group", url: "/components/checkbox-group" },
          { title: "Radio Cards", url: "/components/radio-cards" },
          { title: "Radio Group", url: "/components/radio-group" },
          { title: "Rating", url: "/components/rating" },
          { title: "Segmented Control", url: "/components/segmented-control" },
          { title: "Switch", url: "/components/switch" },
          { title: "Toggle", url: "/components/toggle" },
          { title: "Toggle Group", url: "/components/toggle-group" },
        ],
      },
      {
        title: "Sliders",
        icon: IconComponents,
        items: [
          { title: "Elastic Slider", url: "/components/elastic-slider" },
          {
            title: "Range Histogram Slider",
            url: "/components/range-histogram-slider",
          },
          { title: "Ruler Slider", url: "/components/ruler-slider" },
          { title: "Slider", url: "/components/slider" },
        ],
      },
      {
        title: "Pickers",
        icon: IconComponents,
        items: [
          {
            title: "Color Picker",
            url: "/components/color-picker",
            badge: "Pro",
          },
          { title: "Date Field", url: "/components/date-field" },
          { title: "Date Picker", url: "/components/date-picker" },
          { title: "Date Range Picker", url: "/components/date-range-picker" },
          {
            title: "Emoji Picker",
            url: "/components/emoji-picker",
            badge: "Pro",
          },
          { title: "Event Calendar", url: "/components/event-calendar" },
          { title: "Time Field", url: "/components/time-field" },
          {
            title: "Time Picker",
            url: "/components/time-picker",
            badge: "Pro",
          },
        ],
      },
      {
        title: "Editors",
        icon: IconComponents,
        items: [
          {
            title: "File Upload",
            url: "/components/file-upload",
            badge: "Pro",
          },
          { title: "Rich Text Editor", url: "/components/rich-text-editor" },
          { title: "Signature Pad", url: "/components/signature-pad" },
        ],
      },
      {
        title: "Navigation",
        icon: IconComponents,
        items: [
          { title: "Breadcrumb", url: "/components/breadcrumb", badge: "Pro" },
          {
            title: "Floating TOC",
            url: "/components/floating-toc",
            badge: "Pro",
          },
          { title: "Link", url: "/components/link" },
          { title: "Navbar", url: "/components/navbar" },
          { title: "Pagination", url: "/components/pagination", badge: "Pro" },
          { title: "Scrollspy", url: "/components/scrollspy" },
          { title: "Tabs", url: "/components/tabs" },
        ],
      },
      {
        title: "Expand",
        icon: IconComponents,
        items: [
          { title: "Accordion", url: "/components/accordion" },
          { title: "Collapsible", url: "/components/collapsible" },
          { title: "Resizable", url: "/components/resizable" },
          { title: "Scroll Area", url: "/components/scroll-area" },
        ],
      },
      {
        title: "Overlays",
        icon: IconComponents,
        items: [
          { title: "Alert Dialog", url: "/components/alert-dialog" },
          {
            title: "Confirm Popover",
            url: "/components/confirm-popover",
            badge: "Pro",
          },
          {
            title: "Share Access",
            url: "/components/share-access",
            badge: "Pro",
          },
          { title: "Dialog", url: "/components/dialog" },
          { title: "Hover Card", url: "/components/hover-card", badge: "Pro" },
          { title: "Popover", url: "/components/popover" },
          { title: "Sheet", url: "/components/sheet" },
          { title: "Tooltip", url: "/components/tooltip", badge: "Pro" },
        ],
      },
      {
        title: "Messages",
        icon: IconComponents,
        items: [
          { title: "Alert", url: "/components/alert" },
          { title: "Announcement", url: "/components/announcement" },
          { title: "Error Message", url: "/components/error-message" },
          { title: "Message", url: "/components/message" },
          { title: "Message Scroller", url: "/components/message-scroller" },
          { title: "Notification", url: "/components/notification" },
          { title: "Toast", url: "/components/toast" },
          { title: "Undo Toast", url: "/components/undo-toast", badge: "Pro" },
          {
            title: "Cookie Consent",
            url: "/components/cookie-consent",
            badge: "Pro",
          },
        ],
      },
      {
        title: "Progress",
        icon: IconComponents,
        items: [
          { title: "Meter", url: "/components/meter" },
          { title: "Progress", url: "/components/progress" },
          { title: "Progress Circle", url: "/components/progress-circle" },
          { title: "Countdown", url: "/components/countdown" },
          { title: "Skeleton", url: "/components/skeleton" },
          { title: "Spinner", url: "/components/spinner" },
          { title: "Stepper", url: "/components/stepper" },
        ],
      },
      {
        title: "Avatars",
        icon: IconComponents,
        items: [
          { title: "Avatar", url: "/components/avatar" },
          {
            title: "Avatar Group",
            url: "/components/avatar-group",
            badge: "Pro",
          },
          {
            title: "Avatar Upload",
            url: "/components/avatar-upload",
            badge: "Pro",
          },
        ],
      },
      {
        title: "Cards",
        icon: IconComponents,
        items: [
          { title: "Card", url: "/components/card" },
          { title: "Stat Card", url: "/components/stat-card", badge: "Pro" },
          {
            title: "Metric Ticker",
            url: "/components/metric-ticker",
            badge: "Pro",
          },
          { title: "Frame", url: "/components/frame" },
          { title: "Item", url: "/components/item" },
          { title: "Surface", url: "/components/surface" },
          { title: "Widget", url: "/components/widget" },
          {
            title: "Empty States",
            url: "/components/empty-states",
            icon: IconMoodEmpty,
            badge: "Pro",
          },
        ],
      },
      {
        title: "Tables",
        icon: IconComponents,
        items: [
          {
            title: "Data Table",
            url: "/components/data-table",
            icon: IconTable,
            badge: "Pro",
          },
          { title: "Data Grid", url: "/components/data-grid", badge: "Pro" },
          { title: "Filter", url: "/components/filter" },
          { title: "Tree Table", url: "/components/tree-table" },
          { title: "JSON Viewer", url: "/components/json-viewer" },
          { title: "List View", url: "/components/list-view" },
          { title: "Table", url: "/components/table" },
          { title: "Tree", url: "/components/tree" },
        ],
      },
      {
        title: "Activity",
        icon: IconComponents,
        items: [
          { title: "Timeline", url: "/components/timeline" },
          { title: "Comment Thread", url: "/components/comment-thread" },
          { title: "Chat Thread", url: "/components/chat-thread" },
        ],
      },
      {
        title: "Media",
        icon: IconComponents,
        items: [
          { title: "Attachment", url: "/components/attachment" },
          { title: "Bubble", url: "/components/bubble" },
          { title: "Carousel", url: "/components/carousel" },
          { title: "File Type", url: "/components/file-type" },
          { title: "Icon Stack", url: "/components/icon-stack" },
          { title: "Icon Tile", url: "/components/icon-tile" },
        ],
      },
      {
        title: "Text Effects",
        icon: IconComponents,
        items: [
          { title: "Badge", url: "/components/badge", badge: "Pro" },
          { title: "Chip", url: "/components/chip" },
          { title: "Code Block", url: "/components/code-block" },
          { title: "Kbd", url: "/components/kbd" },
          { title: "Marker", url: "/components/marker" },
          { title: "Number Value", url: "/components/number-value" },
          { title: "Separator", url: "/components/separator" },
          { title: "Trace", url: "/components/trace" },
          { title: "Trend Chip", url: "/components/trend-chip" },
        ],
      },
    ],
  },
];

function compareNavTitles(left: { title: string }, right: { title: string }) {
  return left.title.localeCompare(right.title, undefined, {
    sensitivity: "base",
  });
}

function sortNavChildren(items: NavChild[]): NavChild[] {
  return [...items]
    .sort(compareNavTitles)
    .map((item) =>
      item.items ? { ...item, items: sortNavChildren(item.items) } : item,
    );
}

function sortNavItems(items: NavItem[]): NavItem[] {
  return [...items]
    .sort(compareNavTitles)
    .map((item) =>
      item.items ? { ...item, items: sortNavChildren(item.items) } : item,
    );
}

export const navGroups: NavGroup[] = unsortedNavGroups.map((group) => ({
  ...group,
  items: sortNavItems(group.items),
}));
