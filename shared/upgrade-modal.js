// Upgrade Modal Component

function showUpgradeModalDialog(dashboardName) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.id = 'upgradeModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s;
    `;

    const dashboardNames = {
        'travel-link': 'Travel Link',
        'vr-hotel': 'VR Hotel'
    };

    modal.innerHTML = `
        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(30px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .upgrade-modal-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 20px;
            }
            @media (max-width: 768px) {
                .upgrade-modal-content {
                    grid-template-columns: 1fr;
                }
            }
        </style>
        <div style="
            background: white;
            border-radius: 20px;
            max-width: 900px;
            width: 95%;
            padding: 0;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
            animation: slideUp 0.3s;
        ">
            <!-- Header -->
            <div style="
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 30px;
                border-radius: 20px 20px 0 0;
                text-align: center;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: rgba(255,255,255,0.2);
                    border-radius: 50%;
                    margin: 0 auto 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 40px;
                ">
                    <i class="fas fa-lock"></i>
                </div>
                <h2 style="font-size: 28px; margin-bottom: 10px;">Cần nâng cấp tài khoản</h2>
                <p style="opacity: 0.9; font-size: 16px;">
                    Bạn không có quyền truy cập vào <strong>${dashboardNames[dashboardName]}</strong>
                </p>
            </div>

            <!-- Body -->
            <div style="padding: 30px;">
                <div style="
                    background: #fef3c7;
                    border-left: 4px solid #f59e0b;
                    padding: 20px;
                    border-radius: 8px;
                    margin-bottom: 30px;
                ">
                    <div style="display: flex; align-items: start; gap: 15px;">
                        <i class="fas fa-exclamation-triangle" style="color: #f59e0b; font-size: 24px;"></i>
                        <div>
                            <div style="font-weight: 600; color: #92400e; margin-bottom: 8px;">
                                Quyền truy cập bị giới hạn
                            </div>
                            <div style="color: #78350f; font-size: 14px; line-height: 1.6;">
                                Tài khoản của bạn hiện chỉ có quyền truy cập hạn chế. 
                                Vui lòng liên hệ với chúng tôi để nâng cấp lên gói Full Access.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Two Column Layout -->
                <div class="upgrade-modal-content">
                    <!-- Left Column - Contact Info -->
                    <div style="
                        background: #f8fafc;
                        padding: 25px;
                        border-radius: 12px;
                    ">
                        <h3 style="color: #333; margin-bottom: 20px; font-size: 18px;">
                            Thông tin nhà cung cấp
                        </h3>
                        <div style="color: #555; font-size: 14px; line-height: 2;">
                            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                <i class="fas fa-building" style="width: 25px; color: #3b82f6;"></i>
                                <strong>Công ty:</strong>&nbsp; LINK Service, Trade & Tourism J.S.C.
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                <i class="fas fa-envelope" style="width: 25px; color: #3b82f6;"></i>
                                <strong>Email:</strong>&nbsp; 
                                <a href="mailto:lienhe@vtlink.vn" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                                    lienhe@vtlink.vn
                                </a>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                <i class="fas fa-phone" style="width: 25px; color: #3b82f6;"></i>
                                <strong>Contact:</strong>&nbsp; 
                                <a href="tel:+84965079360" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                                    0965 079 360
                                </a>
                            </div>
                            <div style="display: flex; align-items: center; margin-bottom: 12px;">
                                <i class="fas fa-phone" style="width: 25px; color: #3b82f6;"></i>
                                <strong>Hotline:</strong>&nbsp; 
                                <a href="tel:+84983558824" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                                    0983 55 88 24
                                </a>
                            </div>
                            <div style="display: flex; align-items: center;">
                                <i class="fas fa-globe" style="width: 25px; color: #3b82f6;"></i>
                                <strong>Website:</strong>&nbsp; 
                                <a href="https://vtlink.link/" target="_blank" style="color: #3b82f6; text-decoration: none; font-weight: 600;">
                                    vtlink.link
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Upgrade Package -->
                    <div style="
                        background: #fffbeb;
                        border: 2px solid #f59e0b;
                        padding: 25px;
                        border-radius: 12px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                    ">
                        <div style="font-size: 48px; color: #f59e0b; margin-bottom: 15px;">
                            <i class="fas fa-crown"></i>
                        </div>
                        <div style="color: #92400e; font-weight: 600; font-size: 20px; margin-bottom: 10px;">
                            Gói Full Access
                        </div>
                        <div style="color: #d97706; font-size: 14px; margin-bottom: 20px;">
                            Truy cập đầy đủ cả Travel Link & VR Hotel
                        </div>
                        <div style="
                            background: #fbbf24;
                            padding: 18px;
                            border-radius: 10px;
                            margin-top: 10px;
                            box-shadow: 0 4px 12px rgba(251, 191, 36, 0.4);
                        ">
                            <div style="color: #78350f; font-weight: 600; font-size: 18px;">
                                <i class="fas fa-arrow-left"></i>  Liên hệ ngay để được tư vấn
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Buttons -->
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <button onclick="closeUpgradeModal()" style="
                        flex: 1;
                        padding: 15px;
                        background: #e5e7eb;
                        color: #374151;
                        border: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.background='#d1d5db'" 
                       onmouseout="this.style.background='#e5e7eb'">
                        <i class="fas fa-times"></i> Hủy
                    </button>
                    <button onclick="contactUpgrade()" style="
                        flex: 1;
                        padding: 15px;
                        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                        color: white;
                        border: none;
                        border-radius: 10px;
                        font-size: 16px;
                        font-weight: 600;
                        cursor: pointer;
                        transition: all 0.3s;
                    " onmouseover="this.style.transform='translateY(-2px)'" 
                       onmouseout="this.style.transform='translateY(0)'">
                        <i class="fas fa-arrow-up"></i> Nâng cấp ngay
                    </button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function closeUpgradeModal() {
    const modal = document.getElementById('upgradeModal');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function contactUpgrade() {
    // Open email client
    window.location.href = 'mailto:support@vrsolutions.vn?subject=Yêu cầu nâng cấp tài khoản Full Access&body=Xin chào,%0D%0A%0D%0ATôi muốn nâng cấp tài khoản để có quyền truy cập đầy đủ vào cả Travel Link và VR Hotel Dashboard.%0D%0A%0D%0AThông tin tài khoản:%0D%0A- Username: ' + (Auth.getUserInfo()?.username || '') + '%0D%0A%0D%0AVui lòng liên hệ lại với tôi.%0D%0A%0D%0ATrân trọng.';
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
