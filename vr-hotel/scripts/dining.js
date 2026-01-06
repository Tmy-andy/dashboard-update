// Sample dining data
let dinings = [
    {
        id: 1,
        nameVi: 'Sky Lounge Restaurant',
        nameEn: 'Sky Lounge Restaurant',
        descVi: 'Nhà hàng sang trọng trên tầng thượng với view biển 360°',
        descEn: 'Luxury rooftop restaurant with 360° ocean view',
        cuisineType: 'fusion',
        avgPrice: 800000,
        capacity: 80,
        openingHours: 'Sáng: 6:00 - 10:00\nTrưa: 11:30 - 14:00\nTối: 18:00 - 22:00',
        vrLink: 'https://example.com/sky-lounge-vr.jpg',
        services: ['reservation', 'private', 'wifi', 'parking'],
        active: true
    },
    {
        id: 2,
        nameVi: 'Nhà hàng Hải sản Tươi sống',
        nameEn: 'Fresh Seafood Restaurant',
        descVi: 'Hải sản tươi sống được chế biến theo phong cách Việt Nam và Á Đông',
        descEn: 'Fresh seafood prepared in Vietnamese and Asian style',
        cuisineType: 'seafood',
        avgPrice: 650000,
        capacity: 100,
        openingHours: 'Trưa: 11:00 - 14:30\nTối: 17:30 - 22:00',
        vrLink: 'https://example.com/seafood-vr.jpg',
        services: ['reservation', 'delivery', 'wifi', 'parking', 'kids'],
        active: true
    }
];

let currentDiningId = null;
let sectionEnabled = true;

// Initialize
function init() {
    renderDinings();
}

// Toggle section
function toggleSection() {
    sectionEnabled = document.getElementById('sectionToggle').checked;
    const status = document.getElementById('sectionStatus');
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select, input[type="checkbox"]:not(#sectionToggle)');
    
    if (sectionEnabled) {
        status.textContent = 'Displaying';
        status.className = 'toggle-status active';
        inputs.forEach(input => input.disabled = false);
    } else {
        status.textContent = 'Hidden';
        status.className = 'toggle-status inactive';
        inputs.forEach(input => input.disabled = true);
    }
}

// Render dinings list
function renderDinings() {
    const container = document.getElementById('diningList');
    if (dinings.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#64748b; padding:40px;">Chưa có nhà hàng nào. Click "Thêm nhà hàng" để bắt đầu.</p>';
        return;
    }
    
    const cuisineLabels = {
        vietnamese: 'Việt Nam',
        asian: 'Á',
        western: 'Âu',
        fusion: 'Fusion',
        seafood: 'Hải sản',
        buffet: 'Buffet',
        cafe: 'Cafe & Bar'
    };
    
    container.innerHTML = dinings.map(dining => `
        <div class="room-card">
            <div class="room-info">
                <h3>${dining.nameVi} / ${dining.nameEn}</h3>
                <div class="room-meta">
                    <span><i class="fas fa-utensils"></i> ${cuisineLabels[dining.cuisineType] || dining.cuisineType}</span>
                    <span><i class="fas fa-tag"></i> ${formatPrice(dining.avgPrice)}/người</span>
                    <span><i class="fas fa-users"></i> ${dining.capacity} chỗ</span>
                    <span style="color: ${dining.active ? '#059669' : '#dc2626'}">
                        <i class="fas fa-circle" style="font-size: 8px;"></i>
                        ${dining.active ? 'Đang hiển thị' : 'Đã ẩn'}
                    </span>
                </div>
            </div>
            <div class="room-actions">
                <button class="btn btn-secondary" onclick="editDining(${dining.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-danger" onclick="deleteDining(${dining.id})">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </div>
        </div>
    `).join('');
}

// Format price
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

// Add dining
function addDining() {
    if (!sectionEnabled) {
        alert('Vui lòng bật hiển thị mục Ẩm thực trước khi thêm nhà hàng mới');
        return;
    }
    currentDiningId = null;
    document.getElementById('modalTitle').textContent = 'Thêm nhà hàng mới';
    clearForm();
    document.getElementById('diningModal').style.display = 'flex';
}

// Edit dining
function editDining(id) {
    currentDiningId = id;
    const dining = dinings.find(d => d.id === id);
    if (!dining) return;
    
    document.getElementById('modalTitle').textContent = 'Chỉnh sửa nhà hàng';
    document.getElementById('nameVi').value = dining.nameVi;
    document.getElementById('nameEn').value = dining.nameEn;
    document.getElementById('descVi').value = dining.descVi;
    document.getElementById('descEn').value = dining.descEn;
    document.getElementById('cuisineType').value = dining.cuisineType;
    document.getElementById('avgPrice').value = dining.avgPrice;
    document.getElementById('capacity').value = dining.capacity;
    document.getElementById('openingHours').value = dining.openingHours;
    document.getElementById('vrLink').value = dining.vrLink;
    document.getElementById('diningActive').checked = dining.active;
    
    // Set services
    document.querySelectorAll('.service').forEach(checkbox => {
        checkbox.checked = dining.services.includes(checkbox.value);
    });
    
    document.getElementById('diningModal').style.display = 'flex';
}

// Delete dining
function deleteDining(id) {
    if (confirm('Bạn có chắc chắn muốn xóa nhà hàng này?')) {
        dinings = dinings.filter(d => d.id !== id);
        renderDinings();
        showSuccess('Đã xóa nhà hàng thành công');
    }
}

// Save dining
function saveDining() {
    const nameVi = document.getElementById('nameVi').value;
    const nameEn = document.getElementById('nameEn').value;
    
    if (!nameVi && !nameEn) {
        alert('Please enter restaurant name in at least one language');
        return;
    }
    
    const services = Array.from(document.querySelectorAll('.service:checked')).map(cb => cb.value);
    
    const diningData = {
        nameVi: nameVi,
        nameEn: nameEn,
        descVi: document.getElementById('descVi').value,
        descEn: document.getElementById('descEn').value,
        cuisineType: document.getElementById('cuisineType').value,
        avgPrice: parseInt(document.getElementById('avgPrice').value) || 0,
        capacity: parseInt(document.getElementById('capacity').value) || 0,
        openingHours: document.getElementById('openingHours').value,
        vrLink: document.getElementById('vrLink').value,
        services: services,
        active: document.getElementById('diningActive').checked
    };
    
    if (currentDiningId) {
        const index = dinings.findIndex(d => d.id === currentDiningId);
        dinings[index] = { ...dinings[index], ...diningData };
        showSuccess('Đã cập nhật nhà hàng thành công');
    } else {
        diningData.id = dinings.length > 0 ? Math.max(...dinings.map(d => d.id)) + 1 : 1;
        dinings.push(diningData);
        showSuccess('Đã thêm nhà hàng mới thành công');
    }
    
    closeModal();
    renderDinings();
}

// Clear form
function clearForm() {
    document.getElementById('nameVi').value = '';
    document.getElementById('nameEn').value = '';
    document.getElementById('descVi').value = '';
    document.getElementById('descEn').value = '';
    document.getElementById('cuisineType').value = 'vietnamese';
    document.getElementById('avgPrice').value = '';
    document.getElementById('capacity').value = '';
    document.getElementById('openingHours').value = '';
    document.getElementById('vrLink').value = '';
    document.getElementById('diningActive').checked = true;
    document.querySelectorAll('.service').forEach(cb => cb.checked = false);
}

// Close modal
function closeModal() {
    document.getElementById('diningModal').style.display = 'none';
}

// Switch language tab
function switchLang(lang) {
    document.querySelectorAll('.language-tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.lang-content').forEach(content => content.classList.remove('active'));
    document.getElementById('lang-' + lang).classList.add('active');
}

// Show success message
function showSuccess(message) {
    const alert = document.getElementById('successAlert');
    document.getElementById('successMessage').textContent = message;
    alert.classList.remove('hidden');
    setTimeout(() => alert.classList.add('hidden'), 3000);
}

// Logout
function logout() {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
        window.location.href = 'index.html';
    }
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
