import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;
if (!FOLDER_ID) {
  console.error("Please set GOOGLE_DRIVE_FOLDER_ID in your .env file.");
  process.exit(1);
}

// This uses standard Google Authentication.
// It will look for the `GOOGLE_APPLICATION_CREDENTIALS` environment variable.
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

const POSTS_DIR = path.join(process.cwd(), 'app', 'blog', 'posts');
const IMAGES_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

// Ensure directories exist
if (!fs.existsSync(POSTS_DIR)) fs.mkdirSync(POSTS_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

async function downloadFile(fileId: string, destPath: string) {
  const dest = fs.createWriteStream(destPath);
  const res = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );
  return new Promise<void>((resolve, reject) => {
    res.data
      .on('end', () => resolve())
      .on('error', (err) => reject(err))
      .pipe(dest);
  });
}

async function syncDrive() {
  console.log(`Fetching files from Google Drive folder: ${FOLDER_ID}...`);
  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and trashed=false`, // Only get direct children
    fields: 'files(id, name, mimeType)',
  });

  const files = res.data.files || [];
  if (files.length === 0) {
    console.log("No files found in the specified folder.");
    return;
  }

  for (const file of files) {
    if (!file.id || !file.name) continue;

    if (file.name.endsWith('.mdx')) {
      console.log(`Downloading MDX: ${file.name}`);
      const destPath = path.join(POSTS_DIR, file.name);
      await downloadFile(file.id, destPath);

      // Rewrite any frontmatter image path to point to the local public/images/blog
      let content = fs.readFileSync(destPath, 'utf8');
      content = content.replace(/image:\s*['"]?(.*\.(png|jpg|jpeg|gif|webp))['"]?/g, (match, p1) => {
        if (p1.startsWith('/images/blog/')) return match;
        const basename = path.basename(p1);
        return `image: '/images/blog/${basename}'`;
      });
      // Also rewrite standard markdown images like ![...](...) to point to /images/blog/ if they are just filename
      // e.g., ![alt text](image.png) -> ![alt text](/images/blog/image.png)
      content = content.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
          if (url.startsWith('http') || url.startsWith('/')) return match;
          const basename = path.basename(url);
          return `![${alt}](/images/blog/${basename})`;
      });

      fs.writeFileSync(destPath, content);

    } else if (file.mimeType?.startsWith('image/')) {
      console.log(`Downloading Image: ${file.name}`);
      const destPath = path.join(IMAGES_DIR, file.name);
      await downloadFile(file.id, destPath);
    } else {
      console.log(`Skipping file: ${file.name} (unsupported type: ${file.mimeType})`);
    }
  }

  console.log("Google Drive sync complete!");
}

syncDrive().catch(console.error);
