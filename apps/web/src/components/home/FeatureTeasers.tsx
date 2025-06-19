import React from 'react';
import { Card, Text, Button } from '@radix-ui/themes';
import { StarIcon, RocketIcon, MagicWandIcon } from '@radix-ui/react-icons';

const features = [
	{
		icon: <MagicWandIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />, // Tarot
		title: 'Tarot Readings',
		desc: 'Draw cards, explore spreads, and receive mystical insights with our interactive Tarot engine.',
		link: '/tarot',
	},
	{
		icon: <StarIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />, // Astrology
		title: 'Astrology Charts',
		desc: 'Generate birth charts, transits, and discover your cosmic blueprint with AI-powered astrology.',
		link: '/astrology',
	},
	{
		icon: <RocketIcon className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />, // Dice
		title: 'Dice Divinations',
		desc: 'Roll the mystical dice and let fate reveal your path in a playful, magical way.',
		link: '/dice',
	},
];

export const FeatureTeasers: React.FC = () => (
	<section className="w-full py-16" style={{ background: 'var(--color-primary)' }}>
		<div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
			{features.map((f) => (
				<Card
					key={f.title}
					className="flex flex-col items-center p-8 shadow-xl rounded-xl hover:scale-105 transition-transform"
					style={{ background: 'var(--color-primary)', border: '1px solid var(--color-border)' }}
				>
					<div className="mb-4">{f.icon}</div>
					<h3 className="text-2xl font-bold mb-2 font-cinzel" style={{ color: 'var(--color-text)' }}>{f.title}</h3>
					<Text className="mb-4 text-center" style={{ color: 'var(--color-text)' }}>{f.desc}</Text>
					<Button asChild size="2" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}>
						<a href={f.link}>Learn More</a>
					</Button>
				</Card>
			))}
		</div>
	</section>
);
