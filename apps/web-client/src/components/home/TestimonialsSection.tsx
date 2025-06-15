import * as React from "react";
import { Card, Flex, Text } from "@radix-ui/themes";

const testimonials = [
	{
		quote: "The tarot reading was spot on and gave me the clarity I needed. Highly recommend!",
		author: "Luna S.",
	},
	{
		quote: "The spell crafting service changed my life. I feel empowered and protected.",
		author: "Orion M.",
	},
];

export function TestimonialsSection() {
	return (
		<section className="py-24 px-4 bg-indigo-800 bg-opacity-80 parallax-section">
			<h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
			<Flex gap="8" wrap="wrap" justify="center">
				{testimonials.map((t) => (
					<Card key={t.author} className="w-96 bg-indigo-700 text-white rounded-xl shadow-lg p-10 text-center">
						<Text as="p" size="3" className="italic mb-4">
							“{t.quote}”
						</Text>
						<Text as="span" weight="bold">
							— {t.author}
						</Text>
					</Card>
				))}
			</Flex>
		</section>
	);
}
