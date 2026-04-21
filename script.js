/* =================================================================
   1. ZIP CODE DATABASE INITIALIZATION (โหลดข้อมูลที่อยู่)
================================================================= */
let zipDatabase = [];

async function loadZipDatabase() {
    try {
        const response = await fetch('./thailand-zipcodes.json'); // ให้ตรงกับชื่อไฟล์ JSON ของคุณ
        if (!response.ok) throw new Error("JSON file not found");
        
        zipDatabase = await response.json();
        console.log("Thailand Address Database Loaded Successfully");
    } catch (error) {
        console.error("Error loading address database:", error);
    }
}

// โหลดฐานข้อมูลทันทีที่เปิดเว็บ
loadZipDatabase();


/* =================================================================
   2. DATA DICTIONARY (ระบบภาษา)
================================================================= */
let currentLang = 'th';

const dictionary = {
    th: {
        title: "สมัครสมาชิก", subtitle: "กะซ้งซุปเปอร์และเคมาร์ท", brand: "KS SUPER & K-MART บัตรสมาชิก",
        step1: "ขั้นตอน 1 / 2", step2: "ขั้นตอน 2 / 2",
        labelName: "ชื่อ - นามสกุล", labelGen: "เพศ", labelDob: "วันเกิด", labelPhone: "เบอร์โทรศัพท์",
        myaddress: "ที่อยู่ (บ้านเลขที่, ซอย, ถนน)", labelZip: "รหัสไปรษณีย์", labelProv: "จังหวัด", labelDist: "อำเภอ / เขต", labelSub: "ตำบล / แขวง",
        optMale: "ชาย", optFemale: "หญิง", optOther: "ไม่ระบุ",
        consent: "ฉันยินยอมให้เก็บรักษาข้อมูลเพื่อการสมัครสมาชิก",
        btnNext: "ถัดไป", btnSubmit: "ลงทะเบียนสมาชิก", btnBack: "ย้อนกลับ",
        confirmTitle: "ตรวจสอบข้อมูลของคุณ", btnConfirm: "ถูกต้อง ดำเนินการต่อ", btnEdit: "แก้ไขข้อมูล",
        successTitle: "สมัครสมาชิกเรียบร้อย!", successDesc: "ยินดีต้อนรับสู่ครอบครัวกะซ้ง", btnOk: "ตกลง"
    },
    en: {
        title: "Register", subtitle: "Kasong Super & K-Mart", brand: "KS SUPER & K-MART Member Card",
        step1: "Step 1 / 2", step2: "Step 2 / 2",
        labelName: "Full Name", labelGen: "Gender", labelDob: "Date of Birth", labelPhone: "Phone Number",
        myaddress: "Address (House Number, Soi, Road)", labelZip: "Postal Code", labelProv: "Province", labelDist: "District", labelSub: "Sub-district",
        optMale: "Male", optFemale: "Female", optOther: "Other",
        consent: "I agree to provide my information for membership registration",
        btnNext: "Next", btnSubmit: "Register Membership", btnBack: "Back",
        confirmTitle: "Verify Your Information", btnConfirm: "Confirm & Proceed", btnEdit: "Edit Info",
        successTitle: "Registration Complete!", successDesc: "Welcome to Kasong Family", btnOk: "OK"
    }
};

function updateUIText() {
    const d = dictionary[currentLang];
    
    // Header & Badge
    if (document.getElementById('header-title')) document.getElementById('header-title').innerText = d.title;
    if (document.getElementById('header-subtitle')) document.getElementById('header-subtitle').innerText = d.subtitle;
    if (document.getElementById('card-brand-text')) document.getElementById('card-brand-text').innerText = d.brand;
    
    // Labels
    if (document.getElementById('label-name-text')) document.getElementById('label-name-text').innerText = d.labelName;
    if (document.getElementById('label-gender-text')) document.getElementById('label-gender-text').innerText = d.labelGen;
    if (document.getElementById('label-dob-text')) document.getElementById('label-dob-text').innerText = d.labelDob;
    if (document.getElementById('label-phone-text')) document.getElementById('label-phone-text').innerText = d.labelPhone;
    if (document.getElementById('label-zip')) document.getElementById('label-zip').innerText = d.labelZip;
    if (document.getElementById('label-prov')) document.getElementById('label-prov').innerText = d.labelProv;
    if (document.getElementById('label-dist')) document.getElementById('label-dist').innerText = d.labelDist;
    if (document.getElementById('label-sub')) document.getElementById('label-sub').innerText = d.labelSub;
    
    // Options
    if (document.getElementById('opt-male-text')) document.getElementById('opt-male-text').innerText = d.optMale;
    if (document.getElementById('opt-female-text')) document.getElementById('opt-female-text').innerText = d.optFemale;
    if (document.getElementById('opt-other-text')) document.getElementById('opt-other-text').innerText = d.optOther;
    if (document.getElementById('consent-text')) document.getElementById('consent-text').innerText = d.consent;
    
    // Buttons
    if (document.getElementById('btn-next-step')) document.getElementById('btn-next-step').innerText = d.btnNext;
    if (document.getElementById('btn-submit-real')) document.getElementById('btn-submit-real').innerText = d.btnSubmit;
    const backBtns = document.querySelectorAll('.btn-back');
    backBtns.forEach(btn => btn.innerText = d.btnBack);
    
    // Overlays
    if (document.getElementById('confirm-title-text')) document.getElementById('confirm-title-text').innerText = d.confirmTitle;
    if (document.getElementById('btn-confirm-text')) document.getElementById('btn-confirm-text').innerText = d.btnConfirm;
    if (document.getElementById('btn-edit-text')) document.getElementById('btn-edit-text').innerText = d.btnEdit;
    if (document.getElementById('success-title')) document.getElementById('success-title').innerText = d.successTitle;
    if (document.getElementById('success-desc')) document.getElementById('success-desc').innerText = d.successDesc;
    if (document.getElementById('btn-ok-text')) document.getElementById('btn-ok-text').innerText = d.btnOk;

    // Placeholders
    if (document.getElementById('fullName')) document.getElementById('fullName').placeholder = currentLang === 'th' ? "กรอกชื่อ และ นามสกุล" : "Enter full name";
    if (document.getElementById('province')) document.getElementById('province').placeholder = currentLang === 'th' ? "จะแสดงอัตโนมัติ" : "Auto-filled";
    
    updateCard();
}

function changeLanguage(lang) {
    document.getElementById('btn-th').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById(`btn-${lang}`).classList.add('active');
    currentLang = lang;
    
    updateUIText();
    updateMonthOptions();
    populateDays();
}


/* =================================================================
   3. ระบบจัดการวันเกิด (DOB DROPDOWN LOGIC)
================================================================= */
/* =================================================================
   ระบบจัดการวันเกิด (DOB DROPDOWN LOGIC) - ฉบับใหม่ล่าสุด
================================================================= */
const monthsTH = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
const monthsEN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function initDobDropdowns() {
    const yearSelect = document.getElementById('dob-year');
    if (!yearSelect) return;

    const curYearAD = new Date().getFullYear();
    const defYearAD = curYearAD - 18; // Default ย้อนหลัง 18 ปี

    // 1. สร้างตัวเลือกปี
    yearSelect.innerHTML = '<option value="" style="color:#777;">ปี (พ.ศ.)</option>';
    for (let i = curYearAD; i >= curYearAD - 100; i--) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = i + 543; // แสดงเป็น พ.ศ.
        opt.style.color = "#000"; // ให้ตัวเลือกสีดำ
        if (i === defYearAD) opt.selected = true;
        yearSelect.appendChild(opt);
    }
    
    // 2. โหลดเดือน
    updateMonthOptions();
    
    // 3. โหลดวัน ทันที! (ไม่ต้องรอให้กดเลือกเดือนก่อน)
    populateDays(); 
}

function updateMonthOptions() {
    const monthSelect = document.getElementById('dob-month');
    if (!monthSelect) return;
    
    // ตรวจสอบภาษาปัจจุบัน
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'th';
    const months = lang === 'th' ? monthsTH : monthsEN;
    const currentVal = monthSelect.value;
    
    monthSelect.innerHTML = `<option value="" style="color:#777;">${lang === 'th' ? 'เดือน' : 'Month'}</option>`;
    months.forEach((m, i) => {
        const opt = document.createElement('option');
        opt.value = i + 1;
        opt.textContent = m;
        opt.style.color = "#000";
        if (currentVal == i + 1) opt.selected = true;
        monthSelect.appendChild(opt);
    });
}

function populateDays() {
    const daySelect = document.getElementById('dob-day');
    if (!daySelect) return;

    const mValue = document.getElementById('dob-month').value;
    const yValue = document.getElementById('dob-year').value;
    
    // ไฮไลท์การแก้ปัญหา: ถ้ายังไม่เลือกเดือน ให้ดึงค่าเป็นเดือน 1 (มกราคม) เพื่อให้มี 31 วันโผล่มาให้เลือกทันที
    const m = parseInt(mValue) || 1; 
    const y = parseInt(yValue) || new Date().getFullYear();
    
    const currentDay = daySelect.value;
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'th';
    
    daySelect.innerHTML = `<option value="" style="color:#777;">${lang === 'th' ? 'วัน' : 'Day'}</option>`;
    
    // คำนวณวันสิ้นเดือน (รู้เองว่าเดือนไหนมี 28, 29, 30 หรือ 31 วัน)
    const daysInMonth = new Date(y, m, 0).getDate(); 

    for (let d = 1; d <= daysInMonth; d++) {
        const opt = document.createElement('option');
        opt.value = d;
        opt.textContent = d;
        opt.style.color = "#000"; // ให้ตัวเลือกสีดำ
        if (currentDay == d) opt.selected = true;
        daySelect.appendChild(opt);
    }
}

// สั่งให้ทำงานเมื่อโหลดหน้าเว็บเสร็จ
window.addEventListener('DOMContentLoaded', initDobDropdowns);

// สั่งให้ระบบวันเกิดทำงานเมื่อโหลดเว็บเสร็จ
window.addEventListener('DOMContentLoaded', initDobDropdowns);

updateMonthOptions();
populateDays();

/* =================================================================
   4. ระบบตรวจสอบข้อมูล (VALIDATION & CARD PREVIEW)
================================================================= */
function updateCard() {
    const name = document.getElementById('fullName')?.value;
    const phone = document.getElementById('phone')?.value;
    const prov = document.getElementById('province')?.value;
    const dist = document.getElementById('district')?.value;
    const sub = document.getElementById('subDistrict')?.value;
    const zip = document.getElementById('zipCode')?.value;

    if (document.getElementById('display-name')) {
        document.getElementById('display-name').innerText = name || dictionary[currentLang].labelName;
    }
    
    if (document.getElementById('display-phone')) {
        let formattedPhone = phone || "";
        if (formattedPhone.length === 10) {
            formattedPhone = formattedPhone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
        }
        document.getElementById('display-phone').innerText = formattedPhone || "08X-XXX-XXXX";
    }

    if (document.getElementById('display-address-short')) {
        let addressParts = [];
        if (sub) addressParts.push(`ต.${sub}`);
        if (dist) addressParts.push(`อ.${dist}`);
        if (prov) addressParts.push(`จ.${prov}`);
        if (zip) addressParts.push(zip);
        
        document.getElementById('display-address-short').innerText = addressParts.length > 0 ? addressParts.join(' ') : dictionary[currentLang].brand;
    }
}

function validateStep1() {
    const name = document.getElementById('fullName')?.value.trim();
    const phone = document.getElementById('phone')?.value.replace(/\D/g, '');
    const gender = document.querySelector('input[name="gender"]:checked');
    const d = document.getElementById('dob-day')?.value;
    const m = document.getElementById('dob-month')?.value;
    const y = document.getElementById('dob-year')?.value;
    
    const btnNext = document.getElementById('btn-next-step');
    if (!btnNext) return;

    if (name && phone && phone.length === 10 && gender && d && m && y) {
        btnNext.disabled = false;
    } else {
        btnNext.disabled = true;
    }
}

function validateStep2() {
    const zip = document.getElementById('zipCode')?.value;
    const dist = document.getElementById('district')?.value;
    const sub = document.getElementById('subDistrict')?.value;
    const consent = document.getElementById('consent')?.checked;
    
    const btnSubmit = document.getElementById('btn-submit-real');
    if (!btnSubmit) return;

    if (zip && zip.length >= 5 && dist && sub && consent) {
        btnSubmit.disabled = false;
    } else {
        btnSubmit.disabled = true;
    }
}

function goToStep2() {
    document.getElementById('step-1').classList.add('hidden');
    document.getElementById('step2').classList.remove('hidden');
    document.getElementById('step-badge-text').innerText = dictionary[currentLang].step2;
    if (document.getElementById('step-badge-text-2')) {
        document.getElementById('step-badge-text-2').innerText = dictionary[currentLang].step2;
    }
    validateStep2();
}

function goToStep1() {
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step-1').classList.remove('hidden');
    document.getElementById('step-badge-text').innerText = dictionary[currentLang].step1;
}


/* =================================================================
   5. SMART ZIPCODE LOGIC (ระบบรหัสไปรษณีย์ 1 ต่อหลายอำเภอ)
================================================================= */
/* --- แก้ไขระบบรหัสไปรษณีย์ และ Autofill ขอบสีทอง --- */
async function handleZipCode() {
    const zip = document.getElementById('zipCode').value;
    const provInput = document.getElementById('province');
    const distSelect = document.getElementById('district');
    const subSelect = document.getElementById('subDistrict');
    
    // สีทองที่เป็นสีหลักของร้าน
    const goldColor = "#b89551";
    const defaultBorder = "transparent"; 

    if (zip.length < 5) {
        provInput.value = "";
        provInput.style.borderColor = defaultBorder;
        distSelect.style.borderColor = defaultBorder;
        subSelect.style.borderColor = defaultBorder;
        return;
    }

    filteredAddresses = zipDatabase.filter(item => String(item["รหัสไปรษณีย์"]) === zip);

    if (filteredAddresses.length > 0) {
        // Autofill จังหวัด และใส่ขอบสีทอง
        provInput.value = filteredAddresses[0]["จังหวัด"];
        provInput.style.borderColor = goldColor;
        provInput.style.borderWidth = "2px";
        provInput.style.borderStyle = "solid";

        const districts = [...new Set(filteredAddresses.map(item => item["อำเภอ / เขต"]))];
        distSelect.innerHTML = '<option value="">-- เลือกอำเภอ --</option>';
        districts.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            distSelect.appendChild(opt);
        });

        if (districts.length === 1) {
            distSelect.value = districts[0];
            distSelect.style.borderColor = goldColor;
            distSelect.style.borderWidth = "2px";
            distSelect.style.borderStyle = "solid";
            updateSubDistricts();
        }
    }
    updateCard();
}

function updateSubDistricts() {
    const distVal = document.getElementById('district').value;
    const subSelect = document.getElementById('subDistrict');
    const goldColor = "#b89551";

    subSelect.innerHTML = '<option value="">-- เลือกตำบล --</option>';
    const subs = filteredAddresses
        .filter(item => item["อำเภอ / เขต"] === distVal)
        .map(item => item["ตำบล / แขวง"]);

    subs.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s;
        opt.textContent = s;
        subSelect.appendChild(opt);
    });

    if (subs.length === 1) {
        subSelect.value = subs[0];
        subSelect.style.borderColor = goldColor;
        subSelect.style.borderWidth = "2px";
        subSelect.style.borderStyle = "solid";
    }
    updateCard();
}

/* --- แก้ไขการรวบรวมข้อมูลเพื่อส่ง (Final Submit) --- */
async function finalSubmit() {
    const SCRIPT_URL = 'ใส่_URL_ของคุณที่นี่'; 
    
    const addressDetail = document.getElementById('addressDetail').value.trim();
    const sub = document.getElementById('subDistrict').value;
    const dist = document.getElementById('district').value;
    const prov = document.getElementById('province').value;
    const zip = document.getElementById('zipCode').value;

    // รวมที่อยู่แบบเต็ม
    const fullAddress = `${addressDetail} ต.${sub} อ.${dist} จ.${prov} ${zip}`;

    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || "ไม่ระบุ",
        dob: `${document.getElementById('dob-day').value}/${document.getElementById('dob-month').value}/${parseInt(document.getElementById('dob-year').value) + 543}`,
        phone: document.getElementById('phone').value.replace(/\D/g, ''),
        address: fullAddress
    };
    
    // (โค้ด Fetch อื่นๆ คงเดิมตามไฟล์ปัจจุบันของคุณ)
}

/* =================================================================
   6. SUBMIT & API (หน้าต่างยืนยันและส่งเข้า Google Sheets)
================================================================= */
function showConfirm() {
    const lang = currentLang;
    
    // ชื่อ และ เบอร์โทร
    document.getElementById('res-name').innerText = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    document.getElementById('res-phone').innerText = phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    
    // วันเกิด
    const d = document.getElementById('dob-day').value;
    const m = document.getElementById('dob-month').value;
    const y = document.getElementById('dob-year').value;
    const months = lang === 'th' ? monthsTH : monthsEN;
    const monthName = months[parseInt(m) - 1];
    document.getElementById('res-dob').innerText = `${d} ${monthName} ${parseInt(y) + 543}`;
    
    // ที่อยู่
    const prov = document.getElementById('province').value;
    const dist = document.getElementById('district').value;
    const sub = document.getElementById('subDistrict').value;
    const zip = document.getElementById('zipCode').value;
    const prefixSub = lang === 'th' ? 'ต.' : 'Sub-dist: ';
    const prefixDist = lang === 'th' ? 'อ.' : 'Dist: ';
    const prefixProv = lang === 'th' ? 'จ.' : 'Prov: ';
    
    document.getElementById('res-address').innerText = `${prefixSub}${sub} ${prefixDist}${dist} ${prefixProv}${prov} ${zip}`;
    
    document.getElementById('confirm-popup').classList.remove('hidden');
}

function closeConfirm() {
    document.getElementById('confirm-popup').classList.add('hidden');
}

async function finalSubmit() {
    // ⚠️ อย่าลืมใส่ URL ของ Apps Script ล่าสุดของคุณที่ตรงนี้!
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw2Yk9LjY93_K8HF3td6hNhuuUrsz_8Z8Xs4XP-e3JXsj08nlmYkb4NrWBuVzkzJj7tOQ/exec'; 

    const btnConfirm = document.getElementById('btn-confirm-text');
    btnConfirm.innerText = currentLang === 'th' ? "กำลังตรวจสอบข้อมูล..." : "Processing...";
    btnConfirm.disabled = true;

    // รวมค่าวันเกิดเป็น พ.ศ. ลงตาราง
    const d = document.getElementById('dob-day').value;
    const m = document.getElementById('dob-month').value;
    const y = document.getElementById('dob-year').value;
    const dobFormatted = `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${parseInt(y) + 543}`;

    // รวมค่าที่อยู่ลงตาราง
    const prov = document.getElementById('province').value;
    const dist = document.getElementById('district').value;
    const sub = document.getElementById('subDistrict').value;
    const zip = document.getElementById('zipCode').value;
    const fullAddress = `ต.${sub} อ.${dist} จ.${prov} ${zip}`;

    const formData = {
        fullName: document.getElementById('fullName').value.trim(),
        gender: document.querySelector('input[name="gender"]:checked')?.value || "ไม่ระบุ",
        dob: dobFormatted,
        phone: document.getElementById('phone').value.replace(/\D/g, ''),
        address: fullAddress
    };

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(formData)
        });

        const result = await response.text();

        if (result === "exists") {
            alert(currentLang === 'th' 
                ? "❌ เบอร์โทรศัพท์นี้เคยสมัครสมาชิกไปแล้ว ไม่สามารถสมัครซ้ำได้ครับ" 
                : "❌ This phone number is already registered.");
        } else if (result === "success") {
            closeConfirm();
            document.getElementById('registration-screen').classList.add('hidden');
            document.getElementById('success-screen').classList.remove('hidden');
            document.getElementById('final-card-place').appendChild(document.getElementById('membershipCard'));
        } else {
            alert(currentLang === 'th' ? "⚠️ ระบบขัดข้อง กรุณาลองใหม่" : "⚠️ Server Error, try again.");
        }
    } catch (error) {
        console.error('Fetch Error:', error);
        alert(currentLang === 'th' ? "🔌 การเชื่อมต่ออินเทอร์เน็ตขัดข้อง" : "🔌 Connection failed.");
    } finally {
        btnConfirm.innerText = dictionary[currentLang].btnConfirm;
        btnConfirm.disabled = false;
    }
}