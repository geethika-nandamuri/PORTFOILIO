/* =========================================
   DATA — Site content configuration
   ========================================= */

const SITE_DATA = {
    skills: [
        { icon: '🎨', title: 'Frontend Development', items: ['HTML5', 'CSS3', 'JavaScript ES6+', 'React.js', 'Responsive Web Design'] },
        { icon: '⚙️', title: 'Backend Development', items: ['Node.js', 'Express.js', 'REST APIs'] },
        { icon: '🗄️', title: 'Database', items: ['MongoDB'] },
        { icon: '💻', title: 'Programming Languages', items: ['Python', 'Java', 'C'] },
        { icon: '🛠️', title: 'Tools & Platforms', items: ['Git & GitHub', 'VS Code', 'Postman', 'MongoDB Atlas'] },
    ],

    timeline: [
        {
            title: 'Web Development Virtual Internship',
            desc: [
                'Completed a virtual internship focused on web development fundamentals and project-based learning.',
                'Applied frontend development concepts to build responsive web interfaces.',
            ]
        },
        {
            title: 'Hackathons',
            desc: [
                'Participated in a Hackathon at the National Institute of Technology (NIT).',
                'Collaborated with team members to design and present innovative solutions under time constraints.',
            ]
        },
        {
            title: 'MERN Stack + AI Workshop',
            desc: [
                'Gained hands-on experience in building full-stack applications using the MERN stack.',
                'Explored AI integration techniques for modern web applications.',
            ]
        },
        {
            title: 'Competitive Programming',
            desc: [
                'Participated in 50+ CodeChef coding contests.',
                'Strengthened problem-solving, algorithmic thinking, and debugging skills through regular contest participation.',
            ]
        },
        {
            title: 'IEEE Technical Activities',
            desc: [
                'Participated in an IEEE Quiz Competition, enhancing technical knowledge and analytical thinking.',
            ]
        },
        {
            title: 'Community Service Projects',
            desc: [
                'Conducted field surveys and awareness programs on Nutrition and Food Habits in Tadepalligudem.',
                'Conducted an awareness campaign on Online Cyber Crimes in Chikkala village.',
                'Developed communication, survey analysis, and public engagement skills.',
            ]
        },
        {
            title: 'Technical Workshops',
            desc: [
                'Attended technical workshops focused on emerging technologies and software development practices.',
                'Engaged in collaborative learning and hands-on activities.',
            ]
        },
    ],

    projects: [
        {
            featured: true,
            title: 'Personal Portfolio',
            desc: 'A premium, fully responsive portfolio website built with HTML, CSS, and JavaScript featuring glassmorphism design, animations, and dynamic content loading.',
            image: './images/portfolio.png',
            tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
            github: 'https://github.com/geethika-nandamuri/Portfolio',
            demo: 'https://geethika-nandamuri.github.io/Portfolio/',
        },
        {
            title: 'Tic Tac Toe AI Game',
            desc: 'A browser-based Tic Tac Toe game built with Flask and JavaScript, featuring an AI opponent powered by the Minimax algorithm. Includes an interactive user interface, real-time gameplay, and intelligent move prediction for an engaging gaming experience.',
            image: './images/tictactoe.png',
            tags: ['Python', 'Flask', 'JavaScript', 'HTML', 'CSS', 'Minimax Algorithm'],
            github: 'https://github.com/geethika-nandamuri/TicTacToe',
            demo: 'https://tictactoe-fza8.onrender.com/',
        },
        {
            title: 'Hotel Room Booking Management System',
            desc: 'A full-stack MERN application for managing hotel rooms with CRUD operations, real-time availability tracking, advanced search and filtering, pagination, and a responsive Material-UI interface for efficient room management.',
            image: './images/hotelmanagement.png',
            tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Material-UI'],
            github: 'https://github.com/geethika-nandamuri/HOTEL_MANAGEMENT',
            demo: 'https://hotel-management-1-c538.onrender.com/',
        },

        {
            title: 'MediGuide - AI Healthcare Platform',
            desc: 'A full-stack healthcare platform that enables symptom analysis, AI-powered medical guidance, appointment booking, health record management, and real-time patient support through Google Gemini integration and role-based authentication.',
            image: './images/mediguide.png',
            tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Gemini AI'],
            github: 'https://github.com/geethika-nandamuri/HealthTech',
            demo: 'https://healthtech-frontend.onrender.com',
        },

        {
            title: 'VitalSense',
            desc: 'An AI-powered healthcare platform that analyzes laboratory reports using OCR and Gemini Vision, explains biomarkers in simple language, tracks health trends over time, and provides personalized nutrition and lifestyle recommendations through RAG-powered insights.',
            image: './images/vitalsense.png',
            tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Pinecone', 'Gemini AI'],
            github: 'https://github.com/geethika-nandamuri/VitalSense',
            demo: 'https://vitalsense-frontend.onrender.com/login',
        },
    ],

    achievements: [
        { icon: '🏆', title: '50+ CodeChef Coding Contests', desc: 'Consistent participation in competitive programming contests.' },
        { icon: '🏆', title: 'Diamond and Silver Badges', desc: 'Earned prestigious badges on CodeChef for problem-solving excellence.' },
        { icon: '🏆', title: 'NIT Hackathon Participant', desc: 'Contributed innovative ideas and solutions in a national hackathon.' },
        { icon: '🏆', title: 'MERN Stack + AI Workshop', desc: 'Completed intensive workshop on MERN stack and AI applications.' },
        { icon: '🏆', title: 'IEEE Quiz Competition', desc: 'Participated in IEEE organized technical quiz competition.' },
        { icon: '🏆', title: 'Multiple Full Stack Projects', desc: 'Built and deployed several full-stack web applications.' },
    ],

    profiles: [
        {
            icon: '🎯',
            title: 'CodeChef',
            items: ['50+ contests participated', 'Diamond badges earned', 'Active competitive programmer'],
            link: 'https://www.codechef.com/users/geethikanandam',
        },
        {
            icon: '💻',
            title: 'GitHub',
            items: ['Full stack projects', 'Open-source learning journey', 'Continuous improvement'],
            link: 'https://github.com/geethika-nandamuri',
        },
    ],

    learning: [
        { icon: '☁️', title: 'Cloud Computing', desc: 'AWS fundamentals and cloud-native architecture.' },
        { icon: '🌐', title: 'MERN Stack Development', desc: 'Advanced MongoDB, Express, React, and Node.js patterns.' },
        { icon: '🤖', title: 'AI Applications', desc: 'Integrating AI tools and APIs into web applications.' },
        
    ],

    stats: [
        { value: 50, suffix: '+', label: 'Coding Contests' },
        { value: 10, suffix: '+', label: 'Technical Certifications' },
        { value: 5, suffix: '+', label: 'Web Projects' },
        { value: 2, suffix: '+', label: 'Hackathons' },
        { value: 3, suffix: '+', label: 'Years of Programming' },
    ],
};
