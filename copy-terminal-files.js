import { copyFileSync, mkdirSync, existsSync, renameSync } from 'fs';
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

// Get timestamp for logging
const timestamp = new Date().toLocaleTimeString();

console.log(`[${timestamp}] Copying terminal files to dist directory...`);

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
    
    // Create backup if file exists
    if (existsSync(destPath)) {
      const backupPath = `${destPath}.bak`;
      renameSync(destPath, backupPath);
    }
    
    copyFileSync(srcPath, destPath);
    console.log(`[${timestamp}] ✅ Copied ${file} to dist/`);
  } catch (err) {
    console.error(`[${timestamp}] ❌ Error copying ${file}: ${err.message}`);
  }
});

// Log completion with timestamp
console.log(`[${timestamp}] Done copying terminal files.`);

// Log build information
console.log(`[${timestamp}] Build completed at: ${new Date().toLocaleString()}`);
console.log(`[${timestamp}] Files copied: ${files.length}`);
