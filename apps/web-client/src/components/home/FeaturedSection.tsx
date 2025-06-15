import * as React from "react";
import { Card, Flex, Text, Link } from "@radix-ui/themes";

const featuredItems = [
	{
		title: "Mystic Deck Launch",
		description:
			"Explore our exclusive new deck, hand-crafted for seekers and visionaries.",
		link: { href: "#", label: "Learn More" },
	},
	{
		title: "Monthly Rituals",
		description:
			"Join our community rituals and unlock monthly magical experiences.",
		link: { href: "#", label: "Join Now" },
	},
];

export function FeaturedSection() {
	return (
		<section className="py-24 px-4 parallax-section">
			<h2 className="text-3xl font-bold mb-12 text-center">Featured</h2>
			<Flex gap="8" justify="center" wrap="wrap">
				{featuredItems.map((item) => (
					<Card
						key={item.title}
						className="w-96 bg-indigo-700 text-white rounded-xl shadow-lg p-10 flex-1 text-center"
					>
						<Text as="div" size="4" weight="bold" mb="2">
							{item.title}
						</Text>
						<Text as="p" size="3" mb="2" className="opacity-80">
							{item.description}
						</Text>
						<Link href={item.link.href} color="crimson">
							{item.link.label}
						</Link>
					</Card>
				))}
			</Flex>
		</section>
	);
}
