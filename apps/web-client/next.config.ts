import type { NextConfig } from "next";
import { withContentlayer } from 'next-contentlayer2';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx', 'mdx', 'md'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,  
})

export default withContentlayer(withMDX(nextConfig));
