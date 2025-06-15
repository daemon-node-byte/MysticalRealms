import * as React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";

const services = [
	{
		icon: "🔮",
		title: "Tarot Readings",
		desc: "Gain insight into your past, present, and future with our expert tarot readers.",
	},
	{
		icon: "🧙‍♂️",
		title: "Spell Crafting",
		desc: "Custom spells and enchantments tailored to your unique needs and desires.",
	},
	{
		icon: "🌙",
		title: "Astrology Guidance",
		desc: "Personalized astrological charts and guidance for every phase of your journey.",
	},
];

export function ServicesSection() {
	return (
		<section id="services" className="py-24 px-4 bg-indigo-800 bg-opacity-80 parallax-section">
			<h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
			<Flex gap="8" wrap="wrap" justify="center">
				{services.map((service) => (
					<Card
						key={service.title}
						className="w-80 bg-indigo-700 text-white rounded-xl shadow-lg flex flex-col items-center p-10 text-center"
					>
						<span className="text-4xl mb-4">{service.icon}</span>
						<Text
							as="div"
							size="5"
							weight="bold"
							mb="2"
						>
							{service.title}
						</Text>
						<Text
							as="p"
							size="3"
							className="opacity-80"
						>
							{service.desc}
						</Text>
					</Card>
				))}
			</Flex>
		</section>
	);
}
