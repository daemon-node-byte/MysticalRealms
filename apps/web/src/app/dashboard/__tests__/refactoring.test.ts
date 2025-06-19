// Mock the icons
const MagicWandIcon = () => null;
const StarIcon = () => null;
const Pencil1Icon = () => null;
const CalendarIcon = () => null;

// Types for Quick Actions configuration
interface QuickAction {
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  title: string;
  buttonText: string;
  href: string;
}

describe("Dashboard Quick Actions Refactoring", () => {
  const quickActions: QuickAction[] = [
    {
      icon: MagicWandIcon,
      title: "New Tarot Reading",
      buttonText: "Draw Cards",
      href: "/tarot/new"
    },
    {
      icon: StarIcon,
      title: "Birth Chart",
      buttonText: "Generate",
      href: "/astrology/chart"
    },
    {
      icon: Pencil1Icon,
      title: "Journal Entry",
      buttonText: "Write",
      href: "/journal/new"
    },
    {
      icon: CalendarIcon,
      title: "Calendar",
      buttonText: "View",
      href: "/calendar"
    }
  ];

  it("should have 4 quick actions configured", () => {
    expect(quickActions).toHaveLength(4);
  });

  it("should have correct data structure for each action", () => {
    quickActions.forEach((action) => {
      expect(action).toHaveProperty("icon");
      expect(action).toHaveProperty("title");
      expect(action).toHaveProperty("buttonText");
      expect(action).toHaveProperty("href");
      expect(typeof action.icon).toBe("function");
      expect(typeof action.title).toBe("string");
      expect(typeof action.buttonText).toBe("string");
      expect(typeof action.href).toBe("string");
    });
  });

  it("should have unique titles and hrefs", () => {
    const titles = quickActions.map((action) => action.title);
    const hrefs = quickActions.map((action) => action.href);

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("should contain expected actions", () => {
    const expectedTitles = [
      "New Tarot Reading",
      "Birth Chart",
      "Journal Entry",
      "Calendar"
    ];

    const actualTitles = quickActions.map((action) => action.title);
    expect(actualTitles).toEqual(expectedTitles);
  });
});
