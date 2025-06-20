'use client'

import React, { useState } from 'react';
import { Button, Text, Heading, Section, Flex, Box, Card, Badge } from '@radix-ui/themes';
import { 
  ExclamationTriangleIcon, 
  HomeIcon, 
  BackpackIcon,
  ArrowLeftIcon
} from '@radix-ui/react-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// This is a regular page component for /error route
export default function ErrorPage() {
  const router = useRouter();
  const [errorId] = useState<string>(`ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const [reportSent, setReportSent] = useState(false);

  const handleReportError = async () => {
    try {
      // In a real application, you would send this to your error tracking service
      const errorReport = {
        id: errorId,
        message: 'Unknown error',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        url: window.location.href,
      };
      
      console.log('Error Report:', errorReport);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setReportSent(true);
    } catch (err) {
      console.error('Failed to report error:', err);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <Section 
      className="w-full min-h-screen flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-background) 0%, var(--color-primary) 100%)',
      }}
      role="main"
      aria-labelledby="error-heading"
    >
      <Box className="max-w-2xl w-full">
        <Card
          className="p-8 text-center"
          style={{
            background: 'var(--color-card)',
            border: '1px solid var(--color-border)',
            borderRadius: '16px',
          }}
        >
          <Flex direction="column" align="center" gap="6">
            {/* Error Icon */}
            <Box
              className="p-4 rounded-full"
              style={{
                background: 'rgba(157, 78, 221, 0.1)',
                border: '2px solid var(--color-accent)',
              }}
            >
              <ExclamationTriangleIcon 
                className="w-12 h-12"
                style={{ color: 'var(--color-accent)' }}
                aria-hidden="true"
              />
            </Box>

            {/* Error Content */}
            <Flex direction="column" align="center" gap="4" className="max-w-lg">
              <Heading 
                id="error-heading"
                size="7" 
                className="font-cinzel font-bold"
                style={{ color: 'var(--color-text)' }}
              >
                Something Went Wrong
              </Heading>
              
              <Text 
                size="4" 
                className="leading-relaxed opacity-90"
                style={{ color: 'var(--color-text)' }}
              >
                We encountered an unexpected error while processing your request. 
                Don&apos;t worry - our mystical energies are working to restore balance.
              </Text>

              {errorId && (
                <Flex align="center" gap="2">
                  <Text size="2" style={{ color: 'var(--color-text)', opacity: 0.7 }}>
                    Error ID:
                  </Text>
                  <Badge 
                    variant="soft" 
                    className="font-mono"
                    style={{ 
                      background: 'var(--color-accent)',
                      color: 'var(--color-primary)'
                    }}
                  >
                    {errorId}
                  </Badge>
                </Flex>
              )}
            </Flex>

            {/* Action Buttons */}
            <Flex direction="column" gap="3" className="w-full max-w-sm">
              {/* Navigation Buttons */}
              <Flex gap="2" className="w-full">
                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  size="3"
                  className="flex-1 font-semibold"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                  aria-label="Go back to previous page"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                  Go Back
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="3"
                  className="flex-1 font-semibold"
                  style={{
                    borderColor: 'var(--color-accent)',
                    color: 'var(--color-accent)',
                  }}
                >
                  <Link href="/" aria-label="Return to home page">
                    <HomeIcon className="w-4 h-4" />
                    Home
                  </Link>
                </Button>
              </Flex>

              <Button
                asChild
                variant="outline"
                size="3"
                className="w-full font-semibold"
                style={{
                  borderColor: 'var(--color-accent)',
                  color: 'var(--color-accent)',
                }}
              >
                <Link href="/dashboard" aria-label="Go to dashboard">
                  <BackpackIcon className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>

              {/* Error Reporting */}
              <Box className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
                {!reportSent ? (
                  <Button
                    onClick={handleReportError}
                    variant="ghost"
                    size="2"
                    className="text-sm opacity-75 hover:opacity-100"
                    style={{ color: 'var(--color-text)' }}
                    aria-label="Report this error to help us improve"
                  >
                    Report This Error
                  </Button>
                ) : (
                  <Text 
                    size="2" 
                    className="opacity-75"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ✓ Error reported - Thank you for helping us improve!
                  </Text>
                )}
              </Box>
            </Flex>

            {/* Additional Help */}
            <Box className="pt-4 text-center max-w-md">
              <Text 
                size="2" 
                className="opacity-75"
                style={{ color: 'var(--color-text)' }}
              >
                If this problem persists, you can contact our support team or check our system status.
              </Text>
            </Box>
          </Flex>
        </Card>
      </Box>
    </Section>
  );
}