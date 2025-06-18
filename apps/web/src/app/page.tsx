
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureTeasers } from '@/components/home/FeatureTeasers';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { CommunityPreview } from '@/components/home/CommunityPreview';

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureTeasers />
      <HowItWorks />
      <Testimonials />
      <CommunityPreview />
    </>
  );
}
