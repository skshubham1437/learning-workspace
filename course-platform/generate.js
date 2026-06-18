const fs = require('fs');
const path = require('path');

const WORKSPACE_DIR = path.join(__dirname, '..');
const OUTPUT_FILE = path.join(__dirname, 'data.js');
const EXCLUDE_DIRS = ['.git', 'course-platform', 'node_modules'];

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

function generateCourseData() {
    const courseData = [];
    
    let dirs = fs.readdirSync(WORKSPACE_DIR).filter(file => {
        return fs.statSync(path.join(WORKSPACE_DIR, file)).isDirectory() && !EXCLUDE_DIRS.includes(file);
    });
    
    // Sort directories naturally
    dirs.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    dirs.forEach(courseFolder => {
        const coursePath = path.join(WORKSPACE_DIR, courseFolder);
        const htmlFiles = getAllHtmlFiles(coursePath);
        
        const lessons = htmlFiles.map(filePath => {
            const relativeToPlatform = path.relative(__dirname, filePath).replace(/\\/g, '/');
            const fileName = path.basename(filePath, '.html');
            
            let title = fileName.replace(/-/g, ' '); // fallback title
            try {
                const content = fs.readFileSync(filePath, 'utf-8');
                const titleMatch = content.match(/<title>(.*?)<\/title>/i);
                if (titleMatch && titleMatch[1].trim() !== '') {
                    title = titleMatch[1];
                }
            } catch (e) {
                // Ignore read errors, keep fallback title
            }
            
            return {
                title: title,
                path: relativeToPlatform
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
    console.log('Successfully generated data.js from workspace folders with natural sorting!');
}

generateCourseData();
