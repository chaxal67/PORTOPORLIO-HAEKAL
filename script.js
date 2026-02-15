document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. DATA PROJECTS ---
    const projectsData = {
        'ai-campaign': {
            title: "Future Brand AI Campaign", category: "AI Content & Video", role: "AI Artist & Video Editor",
            image: "ASSET/1.png",
            desc: "Proyek kampanye digital inovatif yang memanfaatkan kekuatan Generative AI untuk menciptakan visual futuristik.",
            objectives: "Meningkatkan brand awareness melalui visual yang unik dan viral di media sosial.",
            features: ["AI Creative Production", "Cinematic Video Editing", "Smart Content Workflown", "Multi-Platform Content Delivery"],
            tech: ["Chat GPT", "Gemini.ai", "CapCut", "VEO 3"],
            gallery: ["ASSET/1.png", "ASSET/2.mp4", "ASSET/3.mp4"],
        },
        'web-portfolio': {
            title: "Modern Portfolio System", category: "Web Development", role: "Frontend Developer",
            image: "https://picsum.photos/seed/web/800/400",
            desc: "Project ini dibuat sebagai bagian dari tugas akhir mata kuliah untuk mengimplementasikan kompetensi web development dalam satu sistem terintegrasi.",
            objectives: "Membangun website portofolio modern sebagai representasi kemampuan teknis dan hasil pembelajaran perkuliahan.",
            features: ["Pengembangan website perusahaan penyedia solusi digital", "Redesain UI/UX aplikasi Ruang Guru dengan fitur interaksi pengguna", "Pengembangan sistem informasi divisi redaksi Koran Mandala", "Pembuatan website company profile Muka Advertising"],
            tech: ["HTML5", "CSS3 (Sass)", "JavaScript (ES6+)", "Figma"],
            gallery: ["ASSET/7.JPG", "ASSET/11.png", "ASSET/10.png"]
        },
        'social-media': {
            title: "EduTech Growth Strategy", category: "Social Media Management", role: "Content Strategist",
            image: "https://picsum.photos/seed/social/800/400",
            desc: "Pengelolaan media sosial Himpunan Mahasiswa Sistem Informasi sebagai media informasi, branding, dan komunikasi digital organisasi mahasiswa, dengan pemanfaatan teknologi AI dalam produksi konten.",
            objectives: "Meningkatkan engagement dan kualitas konten melalui strategi konten digital yang terstruktur dan kreatif.",
            features: ["Content planning", "Video editing", "AI-based video conten", "AI-based visual content"],
            tech: ["Instagram Business", "TikTok Ads", "Canva", "CapCut"],
            gallery: ["ASSET/4.JPG", "ASSET/5.jpg", "ASSET/6.jpg"]
        }
        
    };

    // --- 2. NAVIGATION ACTIVE STATE ---
    // Menandai menu aktif berdasarkan URL saat ini
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Hapus kelas aktif dulu
        link.classList.remove('active');
        
        // Cek href link cocok dengan path (simple check)
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath.endsWith('/') && href === 'index.html') || (currentPath.endsWith('index.html') && href === 'index.html')) {
            link.classList.add('active');
        }
    });

       // --- 3. PROJECT DETAIL LOGIC (UPDATE) ---
    const detailContainer = document.getElementById('detailContent');
    function renderMedia(src, className) {
        if (src.endsWith('.mp4') || src.endsWith('.webm')) {
            // Tambahkan class 'video-content' di sini!
            return `<video src="${src}" class="${className} video-content" controls autoplay loop muted playsinline></video>`;
        } else {
            // Gambar tidak perlu class tambahan
            return `<img src="${src}" class="${className}" alt="Project Media">`;
        }
    }
    if (detailContainer) {
        const params = new URLSearchParams(window.location.search);
        const projectId = params.get('id');

        if (projectId && projectsData[projectId]) {
            const data = projectsData[projectId];
            const techHtml = data.tech.map(t => `<span class="skill-tag">${t}</span>`).join('');
            const featuresHtml = data.features.map(f => `<li>${f}</li>`).join('');
            
            // Menggunakan Class baru: 'gallery-main' dan 'gallery-side-item'
            const mainMedia = renderMedia(data.gallery[0], 'gallery-main');
            const sideMedia1 = renderMedia(data.gallery[1], 'gallery-side-item');
            const sideMedia2 = renderMedia(data.gallery[2], 'gallery-side-item');

            detailContainer.innerHTML = `
                <div class="detail-header">
                    <span class="project-cat" style="font-size: 1.2rem;">${data.category}</span>
                    <h1 class="gradient-text" style="font-size: 3rem; margin: 10px 0;">${data.title}</h1>
                    <p style="max-width: 700px; margin: 0 auto; color: var(--text-muted);">${data.desc}</p>
                </div>
                
                <!-- Menggunakan struktur div biasa, karena ukuran sudah diatur di CSS -->
                <div class="detail-gallery">
                    ${mainMedia}
                    <div class="gallery-side">
                        ${sideMedia1}
                        ${sideMedia2}
                    </div>
                </div>
                
                <div class="detail-content">
                    <div class="detail-main">
                        <div class="glass-card" style="margin-bottom: 30px;">
                            <h3 style="margin-bottom: 15px;">Latar Belakang & Tujuan</h3>
                            <p style="color: var(--text-muted); margin-bottom: 15px;">${data.desc}</p>
                            <p><strong>Tujuan:</strong> ${data.objectives}</p>
                        </div>
                        <div class="glass-card"><h3 style="margin-bottom: 15px;">What I Create</h3><ul style="padding-left: 20px; color: var(--text-muted); list-style: disc;">${featuresHtml}</ul></div>
                    </div>
                    
                    <aside class="detail-sidebar">
                        <div class="glass-card">
                            <h3 style="margin-bottom: 20px;">Info Proyek</h3>
                            <ul class="project-meta-list">
                                <li><span class="project-meta-label">Peran</span><span class="project-meta-val">${data.role}</span></li>
                                <li><span class="project-meta-label">Kategori</span><span class="project-meta-val">${data.category}</span></li>
                                <li><span class="project-meta-label">Tahun</span><span class="project-meta-val">2024-2025</span></li>
                            </ul>
                    </aside>
                </div>`;
        } else {
            detailContainer.innerHTML = '<p style="text-align:center;">Proyek tidak ditemukan. <a href="projects.html">Kembali ke Projects</a></p>';
        }
    }

    // --- 4. INTERACTION FUNCTIONS ---
    window.toggleTheme = function() {
        document.body.classList.toggle('light-mode');
        const icon = document.querySelector('.theme-toggle i');
        if(document.body.classList.contains('light-mode')) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); } else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
    };

    window.toggleMenu = function() { 
        const navLinks = document.getElementById('navLinks');
        if(navLinks) navLinks.classList.toggle('active'); 
    };

    window.handleForm = function(e) {
        e.preventDefault();
        const toast = document.getElementById('toast');
        if(toast) {
            toast.classList.add('show');
            e.target.reset();
            setTimeout(() => { toast.classList.remove('show'); }, 3000);
        }
    };

    // --- 5. ANIMATION OBSERVER ---
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.style.opacity = '1'; entry.target.style.transform = 'translateY(0)'; }
        });
    }, observerOptions);
    document.querySelectorAll('.glass-card, .section-title').forEach(el => {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'all 0.6s ease-out'; observer.observe(el);
    });
});