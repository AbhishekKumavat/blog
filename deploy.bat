@echo off
echo ========================================
echo    DDX Blog Deployment Script
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

echo Checking current directory...
cd /d "%~dp0"

echo Current location: %cd%
echo.

REM Check if we're in the right directory
if not exist "index.html" (
    echo ERROR: index.html not found in current directory
    echo Please run this script from the blog project folder
    pause
    exit /b 1
)

echo Found project files:
dir *.html *.css *.js *.md
echo.

echo Setting up Git repository...
git init
git checkout -b main

echo Adding remote repository...
git remote add origin https://github.com/AbhishekKumavat/blog.git

echo Adding all files to staging...
git add .

echo Creating commit...
git commit -m "🚀 Deploy: Outstanding Blog Platform v1.0

✨ Features Added:
• Premium dark theme with neon accents
• Advanced 3D card interactions with mouse tracking
• Floating particle background system
• Parallax scrolling effects
• Typewriter animation for hero title
• Shockwave click effects on buttons
• Responsive mobile-first design
• Performance optimized animations (60fps)
• Comprehensive README documentation

🎨 Design Highlights:
• Dynamic gradient backgrounds
• Glass morphism UI elements
• Staggered scroll animations
• Progressive content loading
• Professional typography system

🔧 Technical Stack:
• HTML5 Semantic Markup
• CSS3 Advanced Animations
• Vanilla JavaScript (ES6+)
• Modern web APIs (Intersection Observer)
• Zero external dependencies

🎯 Ready for production deployment!"

echo.
echo Pushing to GitHub...
echo (You may be prompted for GitHub credentials)
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    ✅ SUCCESS! Deployment Complete
    echo ========================================
    echo.
    echo Your blog is now live at:
    echo https://github.com/AbhishekKumavat/blog
    echo.
    echo To view your live site, you can:
    echo 1. Enable GitHub Pages in repository settings
    echo 2. Visit: https://AbhishekKumavat.github.io/blog
    echo.
) else (
    echo.
    echo ========================================
    echo    ⚠️  Deployment Requires Authentication
    echo ========================================
    echo.
    echo Please follow these steps:
    echo 1. Go to https://github.com/AbhishekKumavat/blog
    echo 2. Sign in to your GitHub account
    echo 3. Manually upload these files:
    echo    • index.html
    echo    • main.css
    echo    • blog.js
    echo    • README.md
    echo.
    echo Alternative method:
    echo 1. Open Git Bash or Command Prompt
    echo 2. Navigate to this folder
    echo 3. Run: git push -u origin main
    echo 4. Enter your GitHub credentials when prompted
    echo.
)

echo Press any key to exit...
pause >nul