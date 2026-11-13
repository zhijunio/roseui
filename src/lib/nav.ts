import { type LucideIcon, ShieldCheck } from "lucide-react";

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string;
  icon?: LucideIcon;
  items?: readonly NavSubItem[];
};

export type NavSection = {
  label: string;
  items: readonly NavItem[];
};

const componentGroups = [
  {
    title: "Buttons",
    items: [
      { title: "Button", url: "/docs/components/buttons/button" },
      { title: "Avatar Button", url: "/docs/components/buttons/avatar-button" },
      { title: "Button Group", url: "/docs/components/buttons/button-group" },
      { title: "Toggle", url: "/docs/components/buttons/toggle" },
      { title: "Toggle Group", url: "/docs/components/buttons/toggle-group" },
      { title: "Close Button", url: "/docs/components/buttons/close-button" },
      { title: "Copy Button", url: "/docs/components/buttons/copy-button" },
      { title: "Expandable Button", url: "/docs/components/buttons/expandable-button" },
      { title: "Split Button", url: "/docs/components/buttons/split-button" },
      { title: "Social Button", url: "/docs/components/buttons/social-button" },
      { title: "Reaction Button", url: "/docs/components/buttons/reaction-button" },
      { title: "Emoji Reaction Button", url: "/docs/components/buttons/emoji-reaction-button" },
      { title: "Hold to Confirm", url: "/docs/components/buttons/hold-to-confirm" },
    ],
  },
  {
    title: "Collections",
    items: [
      { title: "Table", url: "/docs/components/collections/table" },
      { title: "Data Table", url: "/docs/components/collections/data-table" },
      { title: "Grid List", url: "/docs/components/collections/grid-list" },
      { title: "Choice Box", url: "/docs/components/collections/choice-box" },
      { title: "List Box", url: "/docs/components/collections/list-box" },
      { title: "List View", url: "/docs/components/collections/list-view" },
      { title: "Tag Group", url: "/docs/components/collections/tag-group" },
      { title: "Tree", url: "/docs/components/collections/tree" },
      { title: "Virtualizer", url: "/docs/components/collections/virtualizer" },
      { title: "Tree Table", url: "/docs/components/collections/tree-table" },
      { title: "Item", url: "/docs/components/collections/item" },
      { title: "Dropdown", url: "/docs/components/collections/dropdown" },
      { title: "Autocomplete", url: "/docs/components/collections/autocomplete" },
      { title: "Reactions", url: "/docs/components/collections/reactions" },
    ],
  },
  {
    title: "Colors",
    items: [
      { title: "Color Field", url: "/docs/components/colors/color-field" },
      { title: "Color Picker", url: "/docs/components/colors/color-picker" },
      { title: "Color Area", url: "/docs/components/colors/color-area" },
      { title: "Color Slider", url: "/docs/components/colors/color-slider" },
      { title: "Color Swatch", url: "/docs/components/colors/color-swatch" },
      { title: "Color Swatch Picker", url: "/docs/components/colors/color-swatch-picker" },
      { title: "Color Wheel", url: "/docs/components/colors/color-wheel" },
      { title: "Color Thumb", url: "/docs/components/colors/color-thumb" },
    ],
  },
  {
    title: "Controls",
    items: [
      { title: "Toolbar", url: "/docs/components/controls/toolbar" },
      { title: "Action Bar", url: "/docs/components/controls/action-bar" },
      { title: "Switch", url: "/docs/components/controls/switch" },
      { title: "Command Menu", url: "/docs/components/controls/command-menu" },
      { title: "Context Menu", url: "/docs/components/controls/context-menu" },
      { title: "Kbd", url: "/docs/components/controls/kbd" },
      { title: "Slider", url: "/docs/components/controls/slider" },
      { title: "Elastic Slider", url: "/docs/components/controls/elastic-slider" },
      { title: "Range Histogram Slider", url: "/docs/components/controls/range-histogram-slider" },
      { title: "Ruler Slider", url: "/docs/components/controls/ruler-slider" },
      { title: "Rating", url: "/docs/components/controls/rating" },
      { title: "Number Stepper", url: "/docs/components/controls/number-stepper" },
      { title: "Segmented Control", url: "/docs/components/controls/segmented-control" },
      { title: "Scroll Area", url: "/docs/components/controls/scroll-area" },
      { title: "Show More", url: "/docs/components/controls/show-more" },
      { title: "Filter", url: "/docs/components/controls/filter" },
    ],
  },
  {
    title: "Date And Time",
    items: [
      { title: "Calendar", url: "/docs/components/date-and-time/calendar" },
      { title: "Range Calendar", url: "/docs/components/date-and-time/range-calendar" },
      { title: "Event Calendar", url: "/docs/components/date-and-time/event-calendar" },
      { title: "Date Field", url: "/docs/components/date-and-time/date-field" },
      { title: "Date Picker", url: "/docs/components/date-and-time/date-picker" },
      { title: "Date Range Picker", url: "/docs/components/date-and-time/date-range-picker" },
      { title: "Time Field", url: "/docs/components/date-and-time/time-field" },
      { title: "Time Picker", url: "/docs/components/date-and-time/time-picker" },
    ],
  },
  {
    title: "Drag And Drop",
    items: [
      { title: "File Trigger", url: "/docs/components/drag-and-drop/file-trigger" },
      { title: "File Upload", url: "/docs/components/drag-and-drop/file-upload" },
      { title: "Attachment", url: "/docs/components/drag-and-drop/attachment" },
      { title: "Sortable", url: "/docs/components/drag-and-drop/sortable" },
      { title: "Swipe Actions", url: "/docs/components/drag-and-drop/swipe-actions" },
      { title: "Resizable", url: "/docs/components/drag-and-drop/resizable" },
    ],
  },
  {
    title: "Forms",
    items: [
      { title: "Checkbox", url: "/docs/components/forms/checkbox" },
      { title: "Checkbox Group", url: "/docs/components/forms/checkbox-group" },
      { title: "Field", url: "/docs/components/forms/field" },
      { title: "Form", url: "/docs/components/forms/form" },
      { title: "Label", url: "/docs/components/forms/label" },
      { title: "Input", url: "/docs/components/forms/input" },
      { title: "Text Field", url: "/docs/components/forms/text-field" },
      { title: "Input Group", url: "/docs/components/forms/input-group" },
      { title: "Input Tag", url: "/docs/components/forms/input-tag" },
      { title: "TextArea", url: "/docs/components/forms/textarea" },
      { title: "Input OTP", url: "/docs/components/forms/input-otp" },
      { title: "Number Field", url: "/docs/components/forms/number-field" },
      { title: "Search Field", url: "/docs/components/forms/search-field" },
      { title: "Password Field", url: "/docs/components/forms/password-field" },
      { title: "Payment Button", url: "/docs/components/forms/payment-button" },
      { title: "Payment Field", url: "/docs/components/forms/payment-field" },
      { title: "Labeled Radio", url: "/docs/components/forms/labeled-radio" },
      { title: "Input Phone", url: "/docs/components/forms/input-phone" },
      { title: "Input Money", url: "/docs/components/forms/input-money" },
      { title: "Input Mask", url: "/docs/components/forms/input-mask" },
      { title: "Input Mention", url: "/docs/components/forms/input-mention" },
      { title: "Clear Input", url: "/docs/components/forms/clear-input" },
      { title: "Inline Edit", url: "/docs/components/forms/inline-edit" },
      { title: "Radio Group", url: "/docs/components/forms/radio-group" },
      { title: "Radio Card", url: "/docs/components/forms/radio-card" },
      { title: "Questionnaire", url: "/docs/components/forms/questionnaire" },
      { title: "Rich Text Editor", url: "/docs/components/forms/rich-text-editor" },
      { title: "Signature Pad", url: "/docs/components/forms/signature-pad" },
    ],
  },
  {
    title: "Layouts",
    items: [
      { title: "Frame", url: "/docs/components/layouts/frame" },
      { title: "Navbar", url: "/docs/components/layouts/navbar" },
      { title: "Sidebar", url: "/docs/components/layouts/sidebar" },
      { title: "Team Switcher", url: "/docs/components/layouts/team-switcher" },
      { title: "User Menu", url: "/docs/components/layouts/user-menu" },
    ],
  },
  {
    title: "Media",
    items: [
      { title: "Avatar", url: "/docs/components/media/avatar" },
      { title: "Avatar Group", url: "/docs/components/media/avatar-group" },
      { title: "Avatar Upload", url: "/docs/components/media/avatar-upload" },
      { title: "Carousel", url: "/docs/components/media/carousel" },
      { title: "Media Gallery", url: "/docs/components/media/media-gallery" },
      { title: "File Type", url: "/docs/components/media/file-type" },
      { title: "Icon Tile", url: "/docs/components/media/icon-tile" },
      { title: "Icon Stack", url: "/docs/components/media/icon-stack" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { title: "Accordion", url: "/docs/components/navigation/accordion" },
      { title: "Disclosure", url: "/docs/components/navigation/disclosure" },
      { title: "Disclosure Group", url: "/docs/components/navigation/disclosure-group" },
      { title: "Collapsible", url: "/docs/components/navigation/collapsible" },
      { title: "Breadcrumbs", url: "/docs/components/navigation/breadcrumb" },
      { title: "Tabs", url: "/docs/components/navigation/tabs" },
      { title: "Link", url: "/docs/components/navigation/link" },
      { title: "Pagination", url: "/docs/components/navigation/pagination" },
      { title: "Menubar", url: "/docs/components/navigation/menubar" },
      { title: "Navigation Menu", url: "/docs/components/navigation/navigation-menu" },
      { title: "Scrollspy", url: "/docs/components/navigation/scrollspy" },
      { title: "Floating Toc", url: "/docs/components/navigation/floating-toc" },
      { title: "Stepper", url: "/docs/components/navigation/stepper" },
      { title: "Timeline", url: "/docs/components/navigation/timeline" },
      { title: "Snippet", url: "/docs/components/navigation/snippet" },
    ],
  },
  {
    title: "Overlays",
    items: [
      { title: "Dialog", url: "/docs/components/overlays/dialog" },
      { title: "Alert Dialog", url: "/docs/components/overlays/alert-dialog" },
      { title: "Sheet", url: "/docs/components/overlays/sheet" },
      { title: "Drawer", url: "/docs/components/overlays/drawer" },
      { title: "Popover", url: "/docs/components/overlays/popover" },
      { title: "Confirm Popover", url: "/docs/components/overlays/confirm-popover" },
      { title: "Hover Card", url: "/docs/components/overlays/hover-card" },
      { title: "Tooltip", url: "/docs/components/overlays/tooltip" },
      { title: "Cookie Consent", url: "/docs/components/overlays/cookie-consent" },
    ],
  },
  {
    title: "Pickers",
    items: [
      { title: "Select", url: "/docs/components/pickers/select" },
      { title: "Multi-select", url: "/docs/components/pickers/multi-select" },
      { title: "ComboBox", url: "/docs/components/pickers/combobox" },
      { title: "Search Select", url: "/docs/components/pickers/search-select" },
      { title: "Cascader", url: "/docs/components/pickers/cascader" },
      { title: "Emoji Picker", url: "/docs/components/pickers/emoji-picker" },
    ],
  },
  {
    title: "Statuses",
    items: [
      { title: "Badge", url: "/docs/components/statuses/badge" },
      { title: "Spinner", url: "/docs/components/statuses/spinner" },
      { title: "Meter", url: "/docs/components/statuses/meter" },
      { title: "Alert", url: "/docs/components/statuses/alert" },
      { title: "Announcement", url: "/docs/components/statuses/announcement" },
      { title: "Progress", url: "/docs/components/statuses/progress" },
      { title: "Progress Circle", url: "/docs/components/statuses/progress-circle" },
      { title: "Skeleton", url: "/docs/components/statuses/skeleton" },
      { title: "Toast", url: "/docs/components/statuses/toast" },
      { title: "Undo Toast", url: "/docs/components/statuses/undo-toast" },
      { title: "Notification", url: "/docs/components/statuses/notification" },
      { title: "Chip", url: "/docs/components/statuses/chip" },
      { title: "Trend Chip", url: "/docs/components/statuses/trend-chip" },
      { title: "Countdown", url: "/docs/components/statuses/countdown" },
      { title: "Empty States", url: "/docs/components/statuses/empty-states" },
      { title: "Error Message", url: "/docs/components/statuses/error-message" },
      { title: "Password Strength", url: "/docs/components/statuses/password-strength" },
    ],
  },
  {
    title: "Surfaces",
    items: [
      { title: "Typography", url: "/docs/components/surfaces/typography" },
      { title: "Card", url: "/docs/components/surfaces/card" },
      { title: "Surface", url: "/docs/components/surfaces/surface" },
      { title: "Stat Card", url: "/docs/components/surfaces/stat-card" },
      { title: "Separator", url: "/docs/components/surfaces/separator" },
      { title: "Code Block", url: "/docs/components/surfaces/code-block" },
      { title: "JSON Viewer", url: "/docs/components/surfaces/json-viewer" },
    ],
  },
  {
    title: "Charts",
    items: [
      { title: "Area Chart", url: "/docs/components/chart/area-chart" },
      { title: "Line Chart", url: "/docs/components/chart/line-chart" },
      { title: "Bar Chart", url: "/docs/components/chart/bar-chart" },
      { title: "Pie Chart", url: "/docs/components/chart/pie-chart" },
      { title: "Donut Chart", url: "/docs/components/chart/donut-chart" },
      { title: "Radar Chart", url: "/docs/components/chart/radar-chart" },
      { title: "Radial Bar Chart", url: "/docs/components/chart/radial-bar-chart" },
      { title: "Composed Chart", url: "/docs/components/chart/composed-chart" },
      { title: "Scatter Chart", url: "/docs/components/chart/scatter-chart" },
      { title: "Funnel Chart", url: "/docs/components/chart/funnel-chart" },
      { title: "Sankey Chart", url: "/docs/components/chart/sankey-chart" },
      { title: "Heatmap Chart", url: "/docs/components/chart/heatmap-chart" },
      { title: "Map Chart", url: "/docs/components/chart/map-chart" },
      { title: "Leaderboard", url: "/docs/components/chart/leaderboard" },
      { title: "Tracker", url: "/docs/components/chart/tracker" },
    ],
  },
] satisfies readonly NavItem[];

function compareByName(left: { title?: string; label?: string }, right: { title?: string; label?: string }) {
  return (left.title ?? left.label ?? "").localeCompare(right.title ?? right.label ?? "", "en", {
    sensitivity: "base",
  });
}

function sortNavItems(items: readonly NavItem[]): readonly NavItem[] {
  return items
    .map((item) => (item.items ? { ...item, items: [...item.items].sort(compareByName) } : item))
    .sort(compareByName);
}

export const NAV_DATA = [
  {
    label: "Components",
    items: componentGroups,
  },
  {
    label: "Blocks",
    items: [
      {
        title: "Auth",
        icon: ShieldCheck,
        items: [
          { title: "Forgot Password", url: "/docs/blocks/auth/forgot-password" },
          { title: "Lock Screen", url: "/docs/blocks/auth/lock-screen" },
          { title: "Multi-step Form", url: "/docs/blocks/auth/multi-step-form" },
          { title: "Reset Password", url: "/docs/blocks/auth/reset-password" },
          { title: "Sign In", url: "/docs/blocks/auth/sign-in" },
          { title: "Sign Up", url: "/docs/blocks/auth/sign-up" },
          { title: "Two-factor Setup", url: "/docs/blocks/auth/two-factor-setup" },
          { title: "Verify OTP", url: "/docs/blocks/auth/verify-otp" },
        ],
      },
    ],
  },
]
  .map((section) => ({ ...section, items: sortNavItems(section.items) }))
  .sort(compareByName) satisfies readonly NavSection[];
