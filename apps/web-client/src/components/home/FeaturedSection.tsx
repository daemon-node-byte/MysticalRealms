import * as React from "react";
import { Card, Flex, Text, Link } from "@radix-ui/themes";

const featuredItems = [
	{
		title: "How It Works",
		description:
			"1. Sign Up → 2. Choose a Service → 3. Receive Insight. Simple, magical, and AI-powered!",
		link: { href: "#", label: "Learn More" },
	},
	{
		title: "Community Preview",
		description:
			"See recent public journal entries and shared spreads. Join the conversation!",
		link: { href: "#", label: "Join Now" },
	},
];

export function FeaturedSection() {
	return (
		<section className="py-24 px-4 parallax-section rounded-3xl shadow-xl">
			<h2 className="text-3xl font-bold mb-12 text-center font-heading text-[var(--accent)]">
				Featured
			</h2>
			<Flex gap="8" justify="center" wrap="wrap">
				{featuredItems.map((item) => (
					<Card
						key={item.title}
						className="w-96 bg-[var(--primary)] text-[var(--text)] rounded-xl shadow-lg p-10 flex-1 text-center border border-[var(--accent)] hover:scale-105 transition-transform"
					>
						<Text
							as="div"
							size="4"
							weight="bold"
							mb="2"
							className="font-heading text-[var(--accent)]"
						>
							{item.title}
						</Text>
						<Text as="p" size="3" mb="2" className="opacity-80 font-body">
							{item.description}
						</Text>
						<Link
							href={item.link.href}
							color="crimson"
							className="text-[var(--accent)]"
						>
							{item.link.label}
						</Link>
					</Card>
				))}
			</Flex>
		</section>
	);
}
