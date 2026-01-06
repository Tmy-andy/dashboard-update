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
let roomImages = []; // Store uploaded images

// Initialize
function init() {
    renderRooms();
    setupImageUpload();
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
    
    if (!nameVi && !nameEn) {
        alert('Please enter room name in at least one language');
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
    clearImages();
}

// Close modal
function closeModal() {
    document.getElementById('roomModal').style.display = 'none';
    clearForm();
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

// Image Upload Functions
function setupImageUpload() {
    const uploadArea = document.getElementById('imageUploadArea');
    const fileInput = document.getElementById('roomImages');
    
    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    // File selection
    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });
    
    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    const validFiles = Array.from(files).filter(file => {
        // Check if file is an image
        if (!file.type.startsWith('image/')) {
            alert(`${file.name} is not an image file`);
            return false;
        }
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert(`${file.name} is too large. Max size is 5MB`);
            return false;
        }
        return true;
    });
    
    validFiles.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            roomImages.push({
                file: file,
                url: e.target.result,
                name: file.name
            });
            renderImagePreviews();
        };
        reader.readAsDataURL(file);
    });
}

function renderImagePreviews() {
    const container = document.getElementById('imagePreviewContainer');
    container.innerHTML = '';
    
    roomImages.forEach((img, index) => {
        const previewItem = document.createElement('div');
        previewItem.className = 'image-preview-item';
        previewItem.innerHTML = `
            <img src="${img.url}" alt="${img.name}">
            <button class="remove-image" onclick="removeImage(${index})" type="button">
                <i class="fas fa-times"></i>
            </button>
        `;
        container.appendChild(previewItem);
    });
}

function removeImage(index) {
    roomImages.splice(index, 1);
    renderImagePreviews();
}

function clearImages() {
    roomImages = [];
    renderImagePreviews();
    document.getElementById('roomImages').value = '';
}

// Initialize on load
window.addEventListener('DOMContentLoaded', init);
