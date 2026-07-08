const fs = require('fs');
const path = require('path');

const WORKSPACE_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, 'data.js');
const EXCLUDE_DIRS = ['.git', 'course-platform', 'node_modules', '.agents'];

function getAllHtmlFiles(dirPath, arrayOfFiles = []) {
    let files = fs.readdirSync(dirPath);
    // Sort files naturally (e.g., 2 before 10)
    files.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
    
    files.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

function cleanHtmlText(str) {
    if (!str) return '';
    return str
        .replace(/<[^>]*>/g, ' ') // remove html tags
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'")
        .replace(/\s+/g, ' ')
        .trim();
}

function formatSectionName(relDir) {
    if (!relDir || relDir === '.') return '';
    // e.g., "phase-1-foundations-and-design/module-01-foundations" -> "Module 01 Foundations"
    // e.g., "lessons" -> "Lessons"
    const parts = relDir.split(/[\\/]/);
    const lastPart = parts[parts.length - 1];
    return lastPart
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
}

function generateCourseData() {
    const courseData = [];
    
    let dirs = fs.readdirSync(WORKSPACE_DIR).filter(file => {
        try {
            return fs.statSync(path.join(WORKSPACE_DIR, file)).isDirectory() && !EXCLUDE_DIRS.includes(file) && !file.startsWith('.');
        } catch (e) {
            return false;
        }
    });
    
    // Sort directories naturally
    dirs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    dirs.forEach(courseFolder => {
        const coursePath = path.join(WORKSPACE_DIR, courseFolder);
        const htmlFiles = getAllHtmlFiles(coursePath);
        
        const lessons = htmlFiles.map(filePath => {
            const relativeToPlatform = path.relative(__dirname, filePath).replace(/\\/g, '/');
            const relDir = path.dirname(path.relative(coursePath, filePath));
            const fileName = path.basename(filePath, '.html');
            const slug = fileName;
            
            let title = fileName.replace(/-/g, ' '); // fallback title
            let description = '';
            let duration = '5 min read';
            
            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                
                // Extract Title
                const titleMatch = content.match(/<title>(.*?)<\/title>/i);
                if (titleMatch && titleMatch[1].trim() !== '') {
                    title = cleanHtmlText(titleMatch[1]);
                }
                
                // Extract Description from <meta name="description"> or <p class="subtitle"> or first <p>
                const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
                const subtitleMatch = content.match(/<p\s+class=["'][^"']*subtitle[^"']*["']>([\s\S]*?)<\/p>/i);
                const firstPMatch = content.match(/<p>([\s\S]*?)<\/p>/i);
                
                if (metaDescMatch && metaDescMatch[1].trim() !== '') {
                    description = cleanHtmlText(metaDescMatch[1]);
                } else if (subtitleMatch && subtitleMatch[1].trim() !== '') {
                    description = cleanHtmlText(subtitleMatch[1]);
                } else if (firstPMatch && firstPMatch[1].trim() !== '') {
                    description = cleanHtmlText(firstPMatch[1]);
                }
                if (description.length > 130) {
                    description = description.substring(0, 127) + '...';
                }

                // Estimate reading duration (~180 words per min)
                const textOnly = content.replace(/<[^>]*>/g, ' ');
                const wordCount = (textOnly.match(/\S+/g) || []).length;
                const minutes = Math.max(1, Math.ceil(wordCount / 180));
                duration = `${minutes} min read`;
            } catch (e) {
                // Ignore read errors, keep fallbacks
            }
            
            return {
                title: title,
                slug: slug,
                path: relativeToPlatform,
                section: formatSectionName(relDir),
                duration: duration,
                description: description
            };
        });

        const formatTitle = (str) => {
            return str.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        };

        if (lessons.length > 0) {
            courseData.push({
                title: formatTitle(courseFolder),
                folder: courseFolder,
                lessons: lessons
            });
        }
    });

    const jsContent = `// AUTO-GENERATED FILE. DO NOT EDIT DIRECTLY.
// Run 'node generate.js' to update this file when you add new HTML lessons.

const courseData = ${JSON.stringify(courseData, null, 4)};
`;

    fs.writeFileSync(OUTPUT_FILE, jsContent);
    console.log('Successfully generated data.js with rich metadata, duration, sections, and slugs!');
}

generateCourseData();
