// 1. مصفوفة البيانات: هنا نضع مسارات الصور الحقيقية الموجودة في مجلد img لديك
const projects = [
    { 
        title: "MANHWA VOLFER", 
        sub: "MANHWA", 
        img: "img/12.jpg" 
    },
    { 
        title: "MANHWA VOLFER", 
        sub: "MANHWA", 
        img: "img/1ea2d72bcecb8cb036795413f6906795.jpg" 
    },
    { 
        title: "MANHWA VOLFER ", 
        sub: "MANHWA", 
        img: "img/0badf05be311beda5373e3aa65e24d61.jpg" 
       
    },
];

let currentIndex = 0;

// 2. دالة تحديث البطاقات
function updateCards() {
    // حساب المؤشرات (السابق، الحالي، التالي) بشكل دائري
    let prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    let nextIndex = (currentIndex + 1) % projects.length;

    // ربط البيانات بـ IDs البطاقات في HTML
    const cards = [
        { id: 'prev', data: projects[prevIndex], cardId: 'prevCard' },
        { id: 'active', data: projects[currentIndex], cardId: 'activeCard' },
        { id: 'next', data: projects[nextIndex], cardId: 'nextCard' }
    ];

    cards.forEach(item => {
        // تحديث النصوص (العنوان، الوصف، التاريخ)
        const titleEl = document.getElementById(`${item.id}Title`);
        const subEl = document.getElementById(`${item.id}Sub`);
        const dateEl = document.getElementById(`${item.id}Date`);

        if (titleEl) titleEl.innerText = item.data.title;
        if (subEl) subEl.innerText = item.data.sub;
        if (dateEl) dateEl.innerText = item.data.date;

        // تحديث الصورة (وهذا هو الجزء الذي كان يسبب المشكلة سابقاً)
        // الآن نستهدف وسم img داخل الإطار ونغير الـ src الخاص به
        const imgElement = document.querySelector(`#${item.cardId} .frame-content img`);
        if (imgElement) {
            imgElement.src = item.data.img;
        }
    });

    // تشغيل تأثير الوميض (Flash Effect) على الإطار النشط فقط
    const frame = document.getElementById('activeFrame');
    if (frame) {
        frame.classList.remove('flash-effect');
        void frame.offsetWidth; // حيلة لإعادة تشغيل الأنيميشن (Trigger Reflow)
        frame.classList.add('flash-effect');
    }
}

// 3. دوال التنقل (التالي والسابق)
function nextSlide() {
    currentIndex = (currentIndex + 1) % projects.length;
    updateCards();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    updateCards();
}

// 4. تشغيل الكود بمجرد تحميل الصفحة لملء البيانات
window.onload = updateCards;