import React from 'react';
import { Card, Text, Link as RadixLink } from '@radix-ui/themes';
import { StarIcon, RocketIcon, MagicWandIcon } from '@radix-ui/react-icons';

const features = [
	{
		icon: <MagicWandIcon className="w-8 h-8 text-[#9D4EDD]" />, // Tarot
		title: 'Tarot Readings',
		desc: 'Draw cards, explore spreads, and receive mystical insights with our interactive Tarot engine.',
		link: '/tarot',
	},
	{
		icon: <StarIcon className="w-8 h-8 text-[#9D4EDD]" />, // Astrology
		title: 'Astrology Charts',
		desc: 'Generate birth charts, transits, and discover your cosmic blueprint with AI-powered astrology.',
		link: '/astrology',
	},
	{
		icon: <RocketIcon className="w-8 h-8 text-[#9D4EDD]" />, // Dice
		title: 'Dice Divinations',
		desc: 'Roll the mystical dice and let fate reveal your path in a playful, magical way.',
		link: '/dice',
	},
];

export const FeatureTeasers: React.FC = () => (
	<section className="w-full py-16 bg-[#1A1A2E]">
		<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
			{features.map((f) => (
				<Card
					key={f.title}
					className="flex flex-col items-center p-8 bg-[#2C003E] border border-[#4B1E6B] shadow-xl rounded-xl hover:scale-105 transition-transform"
				>
					<div className="mb-4">{f.icon}</div>
					<h3 className="text-2xl font-bold mb-2 font-cinzel">{f.title}</h3>
					<Text className="mb-4 text-[#F5E8FF] text-center">{f.desc}</Text>
					<RadixLink
						href={f.link}
						className="text-[#9D4EDD] font-semibold hover:underline"
					>
						Learn More
					</RadixLink>
				</Card>
			))}
		</div>
	</section>
);
