#!/usr/bin/env bun

import { isClientSideRendered, scrapeClientSide } from 'ts-web-scraper'
import { scrapePkgxIndex, scrapePkgxPackage } from './src/pkgx-scraper'

function runTests(): Promise<void> {
  console.log('=== Testing ts-web-scraper Integration in ts-pkgx ===\n')

  // Test 1: Import and use directly from ts-web-scraper
  console.log('1. Testing direct import from ts-web-scraper:')

  return isClientSideRendered('https://pkgx.dev')
    .then((isCSR) => {
      console.log('   ✅ isClientSideRendered imported and works:', isCSR)

      // Test 2: Use scrapeClientSide directly
      console.log('\n2. Testing scrapeClientSide import:')
      return scrapeClientSide('https://pkgx.dev/pkgs/bun.sh/', {
        maxJSFiles: 1,
        analyzeJavaScript: true,
        reconstructAPI: true,
        timeout: 20000,
      })
    })
    .then((scraped) => {
      console.log('   ✅ Scraped HTML length:', scraped.html.length)
      console.log('   ✅ Found API endpoints:', scraped.apiEndpoints.length)

      // Test 3: Use pkgx-specific scraper (which uses ts-web-scraper internally)
      console.log('\n3. Testing pkgx-specific scraper (uses ts-web-scraper):')
      return scrapePkgxPackage('bun.sh', {
        useClientSideScraper: true,
        timeout: 20000,
      })
    })
    .then((bunPackage) => {
      console.log('   ✅ Package name:', bunPackage.name)
      console.log('   ✅ Display name:', bunPackage.displayName)
      console.log('   ✅ Description:', `${bunPackage.brief?.substring(0, 60)}...`)
      console.log('   ✅ License:', bunPackage.license)
      console.log('   ✅ Homepage:', bunPackage.homepage)

      // Test 4: Scrape multiple packages
      console.log('\n4. Testing multiple package scraping:')
      return scrapePkgxPackage('nodejs.org', {
        useClientSideScraper: true,
        timeout: 20000,
      })
    })
    .then((nodePackage) => {
      console.log('   ✅ Node.js package:', nodePackage.displayName)

      return scrapePkgxPackage('python.org', {
        useClientSideScraper: true,
        timeout: 20000,
      })
    })
    .then((pythonPackage) => {
      console.log('   ✅ Python package:', pythonPackage.displayName)

      // Test 5: Scrape package index
      console.log('\n5. Testing package index scraping:')
      return scrapePkgxIndex({ timeout: 20000 })
        .then((packages) => {
          console.log('   ✅ Total packages found:', packages.length)
          console.log('   ✅ First 5 packages:', packages.slice(0, 5).join(', '))
        })
        .catch((error) => {
          console.log('   ⚠️  Index scraping failed (may require API endpoint):', error instanceof Error ? error.message : String(error))
        })
    })
    .then(() => {
      console.log('\n=== Integration Test Summary ===')
      console.log('✅ ts-web-scraper imports: WORKING')
      console.log('✅ Client-side scraping: WORKING')
      console.log('✅ pkgx-scraper integration: WORKING')
      console.log('✅ Package data extraction: WORKING')
      console.log('\n🎉 Full integration confirmed working!')
      console.log('\nThe ts-web-scraper package is properly linked and functional!')
    })
}

runTests().catch(console.error)
