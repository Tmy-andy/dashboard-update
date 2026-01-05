// Authentication and Permission Management System

const Auth = (function() {
    // User accounts with permissions
    const USERS = {
        admin: {
            password: 'admin123',
            permissions: ['travel-link', 'vr-hotel'],
            fullName: 'Administrator',
            role: 'Full Access'
        },
        travel: {
            password: 'travel123',
            permissions: ['travel-link'],
            fullName: 'Travel Manager',
            role: 'Travel Link Only'
        },
        hotel: {
            password: 'hotel123',
            permissions: ['vr-hotel'],
            fullName: 'Hotel Manager',
            role: 'VR Hotel Only'
        }
    };

    // Login function
    function login(username, password, remember = false) {
        const user = USERS[username];
        
        if (!user) {
            return {
                success: false,
                message: 'Tên đăng nhập không tồn tại'
            };
        }

        if (user.password !== password) {
            return {
                success: false,
                message: 'Mật khẩu không chính xác'
            };
        }

        // Create session
        const sessionData = {
            username: username,
            fullName: user.fullName,
            role: user.role,
            permissions: user.permissions,
            loginTime: new Date().toISOString()
        };

        // Save to localStorage or sessionStorage
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('auth_session', JSON.stringify(sessionData));

        return {
            success: true,
            user: sessionData
        };
    }

    // Logout function
    function logout() {
        localStorage.removeItem('auth_session');
        sessionStorage.removeItem('auth_session');
        
        // Determine the correct path to login.html
        // Check if we're in a subdirectory (vr-hotel or travel-link)
        const path = window.location.pathname;
        const isInSubfolder = path.includes('vr-hotel') || path.includes('travel-link');
        
        if (isInSubfolder) {
            // We're in vr-hotel/ or travel-link/, go up one level
            window.location.href = '../login.html';
        } else {
            // We're already in the root dashboard folder
            window.location.href = 'login.html';
        }
    }

    // Check if user is authenticated
    function isAuthenticated() {
        return getSession() !== null;
    }

    // Get current session
    function getSession() {
        let session = sessionStorage.getItem('auth_session');
        if (!session) {
            session = localStorage.getItem('auth_session');
        }
        return session ? JSON.parse(session) : null;
    }

    // Check permission for specific dashboard
    function hasPermission(dashboard) {
        const session = getSession();
        if (!session) return false;
        return session.permissions.includes(dashboard);
    }

    // Get user info
    function getUserInfo() {
        return getSession();
    }

    // Require authentication (use in admin pages)
    function requireAuth() {
        if (!isAuthenticated()) {
            const path = window.location.pathname;
            const isInSubfolder = path.includes('vr-hotel') || path.includes('travel-link');
            
            if (isInSubfolder) {
                window.location.href = '../login.html';
            } else {
                window.location.href = 'login.html';
            }
            return false;
        }
        return true;
    }

    // Check dashboard access
    function checkDashboardAccess(dashboard) {
        // Only check, don't redirect immediately to avoid breaking page load
        if (!isAuthenticated()) {
            console.warn('Not authenticated, redirecting to login...');
            setTimeout(() => {
                const path = window.location.pathname;
                const isInSubfolder = path.includes('vr-hotel') || path.includes('travel-link');
                
                if (isInSubfolder) {
                    window.location.href = '../login.html';
                } else {
                    window.location.href = 'login.html';
                }
            }, 100);
            return false;
        }

        if (!hasPermission(dashboard)) {
            console.warn('No permission for dashboard:', dashboard);
            setTimeout(() => {
                const path = window.location.pathname;
                const isInSubfolder = path.includes('vr-hotel') || path.includes('travel-link');
                
                if (isInSubfolder) {
                    window.location.href = '../dashboard-selection.html?error=access_denied';
                } else {
                    window.location.href = 'dashboard-selection.html?error=access_denied';
                }
            }, 100);
            return false;
        }

        return true;
    }

    // Public API
    return {
        login,
        logout,
        isAuthenticated,
        hasPermission,
        getUserInfo,
        requireAuth,
        checkDashboardAccess
    };
})();

// Make Auth available globally
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Auth;
}
