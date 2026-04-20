// --- 1. ZIP CODE DATABASE INITIALIZATION ---
// We start with an empty object and fill it from the external JSON file
let zipDatabase = [];

// Background loader: Fetches the full database without freezing the UI
async function loadZipDatabase() {
    try {
        // This looks for your 'thailand-zipcodes.json' in your VS Code folder or GitHub repo
        const response = await fetch('./thailand-zipcodes.json');
        if (!response.ok) throw new Error("JSON file not found");
        
        zipDatabase = await response.json();
        console.log("Thailand Address Database Loaded Successfully");
    } catch (error) {
        console.error("Error loading address database:", error);
    }
}

// Start loading immediately so it's ready by the time the user reaches Step 2
loadZipDatabase();

// --- 2. DATA DICTIONARY ---
const dictionary = {
  th: {
    title: "สมัครสมาชิก", subtitle: "กะซ้งซุปเปอร์และเคมาร์ท", brand: "KS SUPER & K-MART บัตรสมาชิก",
    step1: "ขั้นตอน 1 / 2", step2: "ขั้นตอน 2 / 2",
    labelName: "ชื่อ - นามสกุล", labelGen: "เพศ", labelDob: "วันเกิด", labelPhone: "เบอร์โทรศัพท์",
    labelZip: "รหัสไปรษณีย์", labelProv: "จังหวัด", labelDist: "อำเภอ / เขต", labelSub: "ตำบล / แขวง", labelAddr: "รายละเอียดที่อยู่ (บ้านเลขที่, ถนน)",
    optMale: "ชาย", optFemale: "หญิง", optOther: "ไม่ระบุ",
    dobDay: "วัน", dobMonth: "เดือน", dobYear: "ปี",
    months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
    consent: "ฉันยินยอมให้เก็บรักษาข้อมูลเพื่อการสมัครสมาชิก",
    btnNext: "ถัดไป", btnBack: "ย้อนกลับ", btnSub: "ยืนยันการสมัคร",
    confirmTitle: "ตรวจสอบข้อมูลของคุณ", btnEdit: "แก้ไขข้อมูล", btnOk: "ถูกต้อง ดำเนินการต่อ", btnFin: "ตกลง",
    successTitle: "สมัครสมาชิกเรียบร้อย!", successDesc: "ยินดีต้อนรับสู่ครอบครัวกะซ้ง",
    successNote: "สามารถเริ่มสะสมแต้มได้ในวันถัดไป",
    phName: "กรอกชื่อ และ นามสกุล", phZip: "เช่น 95110", phAddr: "เช่น 123/4 ม.5 ถ.สุขสวัสดิ์",
    subReq: "กรุณากรอกรหัสไปรษณีย์ก่อน", subSelect: "-- กรุณาเลือกตำบล --", notFound: "ไม่พบข้อมูล"
  },
  en: {
    title: "Registration", subtitle: "Kasong Super & K-Mart", brand: "KS SUPER & K-MART MEMBERSHIP",
    step1: "Step 1 / 2", step2: "Step 2 / 2",
    labelName: "Full Name", labelGen: "Gender", labelDob: "Date of Birth", labelPhone: "Phone Number",
    labelZip: "Zip Code", labelProv: "Province", labelDist: "District", labelSub: "Sub-district", labelAddr: "Address (House No., Street)",
    optMale: "Male", optFemale: "Female", optOther: "N/A",
    dobDay: "Day", dobMonth: "Month", dobYear: "Year",
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    consent: "I consent to store my data for registration.",
    btnNext: "Next", btnBack: "Back", btnSub: "Register Now",
    confirmTitle: "Verify Information", btnEdit: "Edit", btnOk: "Confirm", btnFin: "OK",
    successTitle: "Registration Success!", successDesc: "Welcome to Kasong family",
    successNote: "You can start earning points the next day.",
    phName: "Enter your full name", phZip: "e.g. 95110", phAddr: "e.g. 123/4 M.5 Suksawat Rd.",
    subReq: "Please enter Zip Code first", subSelect: "-- Select Sub-district --", notFound: "Not Found"
  }
};

let currentLang = 'th';
let currentStep = 1;
const currentYearAD = new Date().getFullYear();

/// --- 3. ZIP CODE AUTO-FILL LOGIC ---
function handleZipCode() {
    const zipInput = document.getElementById('zipcode');
    zipInput.value = zipInput.value.replace(/\D/g, ''); 
    
    const provInput = document.getElementById('province');
    const distInput = document.getElementById('district');
    const subSelect = document.getElementById('subdistrict');
    const d = dictionary[currentLang]; 

    if (zipInput.value.length === 5) {
        // 1. ค้นหาข้อมูลทั้งหมดที่มี "รหัสไปรษณีย์" ตรงกับที่ผู้ใช้พิมพ์
        const matchedPlaces = zipDatabase.filter(item => item["รหัสไปรษณีย์"] === zipInput.value);

        if (matchedPlaces.length > 0) {
            // 2. ดึงจังหวัดและอำเภอมาแสดง (ใช้ข้อมูลจากรายการแรกที่ค้นเจอ)
            provInput.value = matchedPlaces[0]["จังหวัด"];
            distInput.value = matchedPlaces[0]["อำเภอ / เขต"];
            
            provInput.className = "locked-autofill";
            distInput.className = "locked-autofill";
            
            subSelect.innerHTML = `<option value="">${d.subSelect}</option>`;
            
            // 3. ดึงรายชื่อ "ตำบล" ทั้งหมดที่อยู่ในรหัสไปรษณีย์นี้มาใส่ในตัวเลือก (ใช้ Set เพื่อกันตำบลซ้ำ)
            const uniqueSubdistricts = [...new Set(matchedPlaces.map(item => item["ตำบล / แขวง"]))];
            
            uniqueSubdistricts.forEach(sub => {
                subSelect.innerHTML += `<option value="${sub}">${sub}</option>`;
            });
            
            subSelect.disabled = false;
            subSelect.className = ""; 
        } else {
            // กรณีค้นหาแล้วไม่เจอข้อมูลใน JSON
            provInput.value = d.notFound;
            distInput.value = d.notFound;
            provInput.className = "locked-empty";
            distInput.className = "locked-empty";
            subSelect.innerHTML = `<option value="">${d.notFound}</option>`;
            subSelect.disabled = true;
            subSelect.className = "locked-empty";
        }
    } else {
        // กรณีพิมพ์รหัสยังไม่ครบ 5 หลัก
        provInput.value = "";
        distInput.value = "";
        provInput.className = "locked-empty";
        distInput.className = "locked-empty";
        subSelect.innerHTML = `<option value="">${d.subReq}</option>`;
        subSelect.disabled = true;
        subSelect.className = "locked-empty";
    }
    updateCard();
}

// --- 4. INITIALIZE DATE OF BIRTH ---
function initDOB() {
    const dSelect = document.getElementById('dob-day');
    const mSelect = document.getElementById('dob-month');
    const ySelect = document.getElementById('dob-year');
    
    const selectedD = dSelect.value;
    const selectedM = mSelect.value;
    const selectedY = ySelect.value;

    dSelect.innerHTML = `<option value="" disabled selected hidden>${dictionary[currentLang].dobDay}</option>`;
    mSelect.innerHTML = `<option value="" disabled selected hidden>${dictionary[currentLang].dobMonth}</option>`;
    ySelect.innerHTML = `<option value="" disabled selected hidden>${dictionary[currentLang].dobYear}</option>`;

    for (let i = 1; i <= 31; i++) {
        dSelect.innerHTML += `<option value="${i}" ${selectedD == i ? 'selected' : ''}>${i}</option>`;
    }
    
    dictionary[currentLang].months.forEach((m, index) => {
        mSelect.innerHTML += `<option value="${index + 1}" ${selectedM == index + 1 ? 'selected' : ''}>${m}</option>`;
    });

    const targetAge = 18;
    const defaultYear = currentYearAD - targetAge; 
    for (let i = currentYearAD; i >= currentYearAD - 100; i--) {
        const displayYear = currentLang === 'th' ? i + 543 : i; 
        const isSelected = (selectedY == i) ? "selected" : (selectedY === "" && i === defaultYear ? "selected" : ""); 
        ySelect.innerHTML += `<option value="${i}" ${isSelected}>${displayYear}</option>`;
    }
}

function checkDobWarning() {
    const d = parseInt(document.getElementById('dob-day').value);
    const m = parseInt(document.getElementById('dob-month').value);
    const y = parseInt(document.getElementById('dob-year').value); 
    const warningText = document.getElementById('dob-warning');

    if (!d || !m || !y) {
        warningText.classList.add('hidden');
        return false;
    }
    const daysInMonth = new Date(y, m, 0).getDate(); 
    if (d > daysInMonth) {
        warningText.classList.remove('hidden'); 
        return false; 
    } else {
        warningText.classList.add('hidden'); 
        return true; 
    }
}

// --- 5. LANGUAGE & VALIDATION ---
function changeLanguage(lang) {
  currentLang = lang;
  const sw = document.querySelector('.modern-lang-switcher');
  lang === 'en' ? sw.classList.add('en-active') : sw.classList.remove('en-active');
  
  const d = dictionary[lang];
  document.querySelector('.header-text h1').innerText = d.title;
  document.querySelector('.header-text p').innerText = d.subtitle;
  document.getElementById('card-brand-text').innerText = d.brand;
  document.getElementById('step-badge-text').innerText = currentStep === 1 ? d.step1 : d.step2;
  
  document.getElementById('label-name-text').innerText = d.labelName;
  document.getElementById('label-gender-text').innerText = d.labelGen;
  document.getElementById('label-dob-text').innerText = d.labelDob;
  document.getElementById('label-phone-text').innerText = d.labelPhone;
  
  document.getElementById('label-zip-text').innerText = d.labelZip;
  document.getElementById('label-prov-text').innerText = d.labelProv;
  document.getElementById('label-dist-text').innerText = d.labelDist;
  document.getElementById('label-sub-text').innerText = d.labelSub;
  document.getElementById('label-addr-text').innerText = d.labelAddr;
  
  document.getElementById('opt-male-text').innerText = d.optMale;
  document.getElementById('opt-female-text').innerText = d.optFemale;
  document.getElementById('opt-other-text').innerText = d.optOther;
  
  document.getElementById('consent-text').innerText = d.consent;
  document.getElementById('btn-next-step').innerText = d.btnNext;
  document.getElementById('btn-back-step').innerText = d.btnBack;
  document.getElementById('btn-submit-text').innerText = d.btnSub;
  
  document.getElementById('confirm-title-text').innerText = d.confirmTitle;
  document.getElementById('btn-edit-text').innerText = d.btnEdit;
  document.getElementById('btn-confirm-text').innerText = d.btnOk;
  document.getElementById('btn-ok-text').innerText = d.btnFin;
  document.getElementById('success-title').innerText = d.successTitle;
  document.getElementById('success-desc').innerText = d.successDesc;
  if(document.getElementById('success-note')) document.getElementById('success-note').innerText = d.successNote;
  
  document.getElementById('fullName').placeholder = d.phName;
  document.getElementById('zipcode').placeholder = d.phZip;
  document.getElementById('address-detail').placeholder = d.phAddr;

  initDOB();
  handleZipCode(); 
}

function validateStep1() {
    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const gen = document.querySelector('input[name="gender"]:checked');
    const isDobValid = checkDobWarning(); 
    document.getElementById('btn-next-step').disabled = !(name && phone.length === 10 && gen && isDobValid);
}

function validateStep2() {
    const addr = document.getElementById('address-detail').value.trim();
    const sub = document.getElementById('subdistrict').value; 
    const dist = document.getElementById('district').value.trim();
    const prov = document.getElementById('province').value.trim();
    const zip = document.getElementById('zipcode').value.trim();
    const con = document.getElementById('consent').checked;
    
    document.getElementById('btn-submit-text').disabled = !(addr && sub && dist && prov && zip.length === 5 && con);
}

function updateCard() {
  const full = document.getElementById('fullName').value.trim();
  const phone = document.getElementById('phone').value.trim();
  
  const addr = document.getElementById('address-detail').value.trim();
  const sub = document.getElementById('subdistrict').value;
  const dist = document.getElementById('district').value.trim();
  const prov = document.getElementById('province').value.trim();
  const zip = document.getElementById('zipcode').value.trim();
  
  const addressParts = [addr, sub, dist, prov, zip].filter(item => item && item !== "ไม่พบข้อมูล" && item !== "Not Found");
  const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : (currentLang === 'th' ? "ที่อยู่, ตำบล, อำเภอ, จังหวัด, รหัสไปรษณีย์" : "Address, District, Province, Zip Code");

  let formattedPhone = "080-0000000";
  if (phone.length > 0) {
      if (phone.length >= 3) formattedPhone = phone.substring(0, 3) + "-" + phone.substring(3);
      else formattedPhone = phone;
  }

  document.getElementById('display-name').innerText = full || (currentLang === 'th' ? "ชื่อ-นามสกุล ของคุณ" : "YOUR NAME");
  document.getElementById('display-address-short').innerText = fullAddress;
  document.getElementById('display-phone').innerText = formattedPhone;
  
  if (currentStep === 1) validateStep1();
  if (currentStep === 2) validateStep2();
}

// --- 6. NAVIGATION & SUBMIT ---
function goToStep2() { document.getElementById('step-1').classList.add('hidden'); document.getElementById('step-2').classList.remove('hidden'); currentStep = 2; document.getElementById('step-badge-text').innerText = dictionary[currentLang].step2; }
function goToStep1() { document.getElementById('step-2').classList.add('hidden'); document.getElementById('step-1').classList.remove('hidden'); currentStep = 1; document.getElementById('step-badge-text').innerText = dictionary[currentLang].step1; }

function showConfirmPopup(e) {
  e.preventDefault();
  const d = document.getElementById('dob-day').value;
  const mIndex = parseInt(document.getElementById('dob-month').value) - 1;
  const yVal = parseInt(document.getElementById('dob-year').value);
  const mName = dictionary[currentLang].months[mIndex];
  const displayYear = currentLang === 'th' ? yVal + 543 : yVal;
  
  const fullAddress = [
      document.getElementById('address-detail').value,
      document.getElementById('subdistrict').value,
      document.getElementById('district').value,
      document.getElementById('province').value,
      document.getElementById('zipcode').value
  ].join(' ');

  document.getElementById('res-name').innerText = document.getElementById('fullName').value;
  document.getElementById('res-dob').innerText = `${d} ${mName} ${displayYear}`;
  document.getElementById('res-phone').innerText = document.getElementById('phone').value;
  document.getElementById('res-address').innerText = fullAddress;
  
  document.getElementById('confirm-popup').classList.remove('hidden');
}

function closeConfirm() { document.getElementById('confirm-popup').classList.add('hidden'); }
function finalSubmit() { const card = document.getElementById('membershipCard'); closeConfirm(); document.getElementById('registration-screen').classList.add('hidden'); document.getElementById('success-screen').classList.remove('hidden'); document.getElementById('final-card-place').appendChild(card); }

changeLanguage('th');