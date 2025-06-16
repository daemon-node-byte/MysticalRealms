import * as React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";

const services = [
	{
		icon: "🔮",
		title: "Tarot Readings",
		desc: "Gain insight into your past, present, and future with our expert tarot readers.",
	},
	{
		icon: "🌙",
		title: "Astrology Charts",
		desc: "Personalized astrological charts and guidance for every phase of your journey.",
	},
	{
		icon: "🎲",
		title: "Dice Divinations",
		desc: "Roll the mystical dice for quick, playful insight and cosmic nudges.",
	},
];

export function ServicesSection() {
	return (
		<section id="services" className="py-24 px-4 bg-[var(--secondary)] bg-opacity-80 parallax-section rounded-3xl shadow-xl">
			<h2 className="text-3xl font-bold mb-12 text-center font-heading text-[var(--accent)]">Explore Our Services</h2>
			<Flex gap="8" wrap="wrap" justify="center">
				{services.map((service) => (
					<Card
						key={service.title}
						className="w-80 bg-[var(--primary)] text-[var(--text)] rounded-xl shadow-lg flex flex-col items-center p-10 text-center border border-[var(--accent)] hover:scale-105 transition-transform"
					>
						<span className="text-4xl mb-4 drop-shadow-lg">{service.icon}</span>
						<Text
							as="div"
							size="5"
							weight="bold"
							mb="2"
							className="font-heading text-[var(--accent)]"
						>
							{service.title}
						</Text>
						<Text
							as="p"
							size="3"
							className="opacity-80 font-body"
						>
							{service.desc}
						</Text>
					</Card>
				))}
			</Flex>
		</section>
	);
}
