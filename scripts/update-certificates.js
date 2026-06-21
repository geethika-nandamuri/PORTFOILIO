/**
 * Regenerate data/certificates.json from Certificates/ folder.
 * Run: node scripts/update-certificates.js
 */
const fs = require('fs');
const path = require('path');

const certDir = path.join(__dirname, '..', 'Certificates');
const outFile = path.join(__dirname, '..', 'data', 'certificates.json');

const files = fs.readdirSync(certDir)
    .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .filter(f => !/^CodeChefBadge/i.test(f))
    .sort();

fs.writeFileSync(outFile, JSON.stringify({ files }, null, 2) + '\n');
console.log(`Updated ${outFile} with ${files.length} certificates.`);
