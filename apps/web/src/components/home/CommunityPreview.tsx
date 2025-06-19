import React from 'react';
import { Card, Button, Section, Flex, Container, Heading, Text, Box } from '@radix-ui/themes';

const community = [
	{
		entry: 'Pulled The Star today—feeling hopeful and inspired! 🌟',
		user: 'anon-1',
	},
	{
		entry: 'My birth chart reading was so accurate, wow.',
		user: 'anon-2',
	},
	{
		entry: 'Shared my first 3D spread—love this feature!',
		user: 'anon-3',
	},
];

export const CommunityPreview: React.FC = () => (
	<Section
		className="w-full py-16"
		style={{
			background:
				'linear-gradient(to bottom, var(--color-primary), var(--color-background))',
		}}
	>
		<Container className="max-w-4xl mx-auto text-center">
			<Heading size="8"
				style={{ color: 'var(--color-accent)' }}
			>
				Community Preview
			</Heading>
			<Flex direction="row" gap="4" className='mt-8 mb-6'>
				{community.map((c, i) => (
					<Card
						key={i}
						className="rounded-xl p-6 shadow-lg flex-1 flex flex-col justify-between"
						style={{
							background: 'var(--color-primary)',
							border: '1px solid var(--color-border)',
						}}
					>
						<Text
							className="text-lg mb-4"
							style={{ color: 'var(--color-text)' }}
						>
							{c.entry}
						</Text>
						<Box as="div">

						<Text
							className="text-xs"
							style={{ color: 'var(--color-accent)' }}
							>
							by {c.user}
						</Text>
							</Box>
					</Card>
				))}
			</Flex>
			<Button
				asChild
				size="3"
				className="mt-8 font-semibold rounded"
				style={{
					background: 'var(--color-accent)',
					color: 'var(--color-primary)',
				}}
			>
				<a href="/community">Join the Conversation</a>
			</Button>
		</Container>
	</Section>
);
