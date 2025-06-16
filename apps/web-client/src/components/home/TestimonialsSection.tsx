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
		<section className="py-24 px-4 bg-[var(--secondary)] bg-opacity-80 parallax-section rounded-3xl shadow-xl">
			<h2 className="text-3xl font-bold mb-12 text-center font-heading text-[var(--accent)]">Testimonials</h2>
			<Flex gap="8" wrap="wrap" justify="center">
				{testimonials.map((t) => (
					<Card key={t.author} className="w-96 bg-[var(--primary)] text-[var(--text)] rounded-xl shadow-lg p-10 text-center border border-[var(--accent)] hover:scale-105 transition-transform">
						<Text as="p" size="3" className="italic mb-4 font-body">
							“{t.quote}”
						</Text>
						<Text as="span" weight="bold" className="font-heading text-[var(--accent)]">
							— {t.author}
						</Text>
					</Card>
				))}
			</Flex>
		</section>
	);
}
