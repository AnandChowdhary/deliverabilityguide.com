/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // Keep the repository's maintained agent instructions authoritative.
  agentRules: false,
}

module.exports = nextConfig
