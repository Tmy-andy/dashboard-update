// Sample rooms data
let rooms = [
    {
        id: 1,
        nameVi: 'Phòng Deluxe Hướng Biển',
        nameEn: 'Deluxe Ocean View',
        descVi: 'Phòng sang trọng với tầm nhìn ra biển tuyệt đẹp',
        descEn: 'Luxurious room with stunning ocean views',
        type: 'deluxe',
        price: 2500000,
        area: 45,
        maxGuests: 2,
        vrLink: 'https://example.com/room1-vr.jpg',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony'],
        active: true
    },
    {
        id: 2,
        nameVi: 'Suite Cao Cấp',
        nameEn: 'Premium Suite',
        descVi: 'Suite rộng rãi với đầy đủ tiện nghi',
        descEn: 'Spacious suite with full amenities',
        type: 'suite',
        price: 4500000,
        area: 70,
        maxGuests: 4,
        vrLink: 'https://example.com/room2-vr.jpg',
        amenities: ['wifi', 'tv', 'ac', 'minibar', 'safe', 'balcony'],
        active: true
    }
];

let currentRoomId = null;
let sectionEnabled = true;

// Initialize
function init() {
    renderRooms();
}

// Toggle section
function toggleSection() {
    sectionEnabled = document.getElementById('sectionToggle').checked;
    const status = document.getElementById('sectionStatus');
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select, input[type="checkbox"]');
    
    if (sectionEnabled) {
        status.textContent = 'Đang hiển thị';
        status.className = 'toggle-status active';
        inputs.forEach(input => input.disabled = false);
    } else {
        status.textContent = 'Đã ẩn';
        status.className = 'toggle-status inactive';
        inputs.forEach(input => input.disabled = true);
    }
}

// Render rooms list
function renderRooms() {
    const container = document.getElementById('roomsList');
    if (rooms.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#64748b; padding:40px;">Chưa có phòng nào. Click "Thêm phòng mới" để bắt đầu.</p>';
        return;
    }
    
    container.innerHTML = rooms.map(room => `
        <div class="room-card">
            <div class="room-info">
                <h3>${room.nameVi} / ${room.nameEn}</h3>
                <div class="room-meta">
                    <span><i class="fas fa-tag"></i> ${formatPrice(room.price)}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${room.area}m²</span>
                    <span><i class="fas fa-users"></i> ${room.maxGuests} khách</span>
                </div>
            </div>
            <div class="room-actions">
                <button class="btn btn-secondary" onclick="editRoom(${room.id})">
                    <i class="fas fa-edit"></i> Sửa
                </button>
                <button class="btn btn-danger" onclick="deleteRoom(${room.id})">
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

// Add room
function addRoom() {
    if (!sectionEnabled) {
        alert('Vui lòng bật hiển thị mục Phòng nghỉ trước khi thêm phòng mới');
        return;
    }
    currentRoomId = null;
    document.getElementById('modalTitle').textContent = 'Thêm phòng mới';
    clearForm();
    document.getElementById('roomModal').style.display = 'flex';
}

// Edit room
function editRoom(id) {
    currentRoomId = id;
    const room = rooms.find(r => r.id === id);
    if (!room) return;
    
    document.getElementById('modalTitle').textContent = 'Chỉnh sửa phòng';
    document.getElementById('nameVi').value = room.nameVi;
    document.getElementById('nameEn').value = room.nameEn;
    document.getElementById('descVi').value = room.descVi;
    document.getElementById('descEn').value = room.descEn;
    document.getElementById('roomType').value = room.type;
    document.getElementById('price').value = room.price;
    document.getElementById('area').value = room.area;
    document.getElementById('maxGuests').value = room.maxGuests;
    document.getElementById('vrLink').value = room.vrLink;
    
    // Set amenities
    document.querySelectorAll('.amenity').forEach(checkbox => {
        checkbox.checked = room.amenities.includes(checkbox.value);
    });
    
    document.getElementById('roomModal').style.display = 'flex';
}

// Delete room
function deleteRoom(id) {
    if (confirm('Bạn có chắc chắn muốn xóa phòng này?')) {
        rooms = rooms.filter(r => r.id !== id);
        renderRooms();
        showSuccess('Đã xóa phòng thành công');
    }
}

// Save room
function saveRoom() {
    const nameVi = document.getElementById('nameVi').value;
    const nameEn = document.getElementById('nameEn').value;
    
    if (!nameVi || !nameEn) {
        alert('Vui lòng điền tên phòng bằng cả 2 ngôn ngữ');
        return;
    }
    
    const amenities = Array.from(document.querySelectorAll('.amenity:checked')).map(cb => cb.value);
    
    const roomData = {
        nameVi: nameVi,
        nameEn: nameEn,
        descVi: document.getElementById('descVi').value,
        descEn: document.getElementById('descEn').value,
        type: document.getElementById('roomType').value,
        price: parseInt(document.getElementById('price').value) || 0,
        area: parseInt(document.getElementById('area').value) || 0,
        maxGuests: parseInt(document.getElementById('maxGuests').value) || 2,
        vrLink: document.getElementById('vrLink').value,
        amenities: amenities,
        active: true
    };
    
    if (currentRoomId) {
        // Update existing room
        const index = rooms.findIndex(r => r.id === currentRoomId);
        rooms[index] = { ...rooms[index], ...roomData };
        showSuccess('Đã cập nhật phòng thành công');
    } else {
        // Add new room
        roomData.id = rooms.length > 0 ? Math.max(...rooms.map(r => r.id)) + 1 : 1;
        rooms.push(roomData);
        showSuccess('Đã thêm phòng mới thành công');
    }
    
    closeModal();
    renderRooms();
}

// Clear form
function clearForm() {
    document.getElementById('nameVi').value = '';
    document.getElementById('nameEn').value = '';
    document.getElementById('descVi').value = '';
    document.getElementById('descEn').value = '';
    document.getElementById('roomType').value = 'standard';
    document.getElementById('price').value = '';
    document.getElementById('area').value = '';
    document.getElementById('maxGuests').value = '2';
    document.getElementById('vrLink').value = '';
    document.querySelectorAll('.amenity').forEach(cb => cb.checked = false);
}

// Close modal
function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
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
