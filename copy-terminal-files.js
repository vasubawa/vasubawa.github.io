import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

// Files to copy
const files = [
  'terminal.html',
  'terminal.css',
  'terminal.js',
  'portfolio-data.js',
  'src/index.css',
  'src/index.js'
];

// Destination directory
const destDir = join(__dirname, 'dist');

console.log('Copying terminal files to dist directory...');

// Copy each file
files.forEach(file => {
  const srcPath = join(__dirname, file);
  const destPath = join(destDir, file);
  
  try {
    // Create directory structure if needed for files in subdirectories
    if (file.includes('/')) {
      const destDirPath = dirname(destPath);
      if (!existsSync(destDirPath)) {
        mkdirSync(destDirPath, { recursive: true });
      }
    }
    
    copyFileSync(srcPath, destPath);
    console.log(`✅ Copied ${file} to dist/`);
  } catch (err) {
    console.error(`❌ Error copying ${file}: ${err.message}`);
  }
});

console.log('Done copying terminal files.');
