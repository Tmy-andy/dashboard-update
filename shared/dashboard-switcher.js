// Dashboard Switcher Component for Sidebar

function initDashboardSwitcher(currentDashboard) {
    console.log('=== Dashboard Switcher Init ===');
    console.log('Current Dashboard:', currentDashboard);
    
    const userInfo = Auth.getUserInfo();
    console.log('User Info:', userInfo);
    
    if (!userInfo) {
        console.warn('No user info found - using demo mode');
        // Demo mode - show switcher anyway for development
    }

    const otherDashboard = currentDashboard === 'travel-link' ? 'vr-hotel' : 'travel-link';
    const hasAccess = userInfo ? Auth.hasPermission(otherDashboard) : true; // Demo mode allows all

    const dashboardInfo = {
        'travel-link': {
            name: 'Travel Link',
            icon: 'fa-plane-departure',
            url: '../travel-link/index.html'
        },
        'vr-hotel': {
            name: 'VR Hotel',
            icon: 'fa-hotel',
            url: '../vr-hotel/index.html'
        }
    };

    const currentInfo = dashboardInfo[currentDashboard];
    const otherInfo = dashboardInfo[otherDashboard];

    console.log('Current Dashboard Info:', currentInfo);
    console.log('Other Dashboard Info:', otherInfo);

    // Create switcher HTML
    const switcherHTML = `
        <div class="dashboard-switcher">
            <div class="current-dashboard">
                <div class="dashboard-indicator">
                    <i class="fas ${currentInfo.icon}"></i>
                    <span>${currentInfo.name}</span>
                </div>
            </div>
            <div class="switch-option" onclick="switchDashboard('${otherDashboard}')">
                <i class="fas fa-exchange-alt"></i>
                <span>Switch to ${otherInfo.name}</span>
                ${!hasAccess ? '<i class="fas fa-lock" style="margin-left: auto; color: #ef4444;"></i>' : ''}
            </div>
            <div class="switch-option" onclick="window.location.href='../dashboard-selection.html'">
                <i class="fas fa-th"></i>
                <span>All Dashboards</span>
            </div>
        </div>
    `;

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        .dashboard-switcher {
            margin: 16px 16px 20px 16px;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 12px 0;
            background: #f8fafc;
        }

        .current-dashboard {
            padding: 0 12px 8px;
            border-bottom: 1px solid #e2e8f0;
            margin-bottom: 8px;
        }

        .dashboard-indicator {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #0f172a;
            font-weight: 600;
            font-size: 13px;
        }

        .dashboard-indicator i {
            font-size: 16px;
            color: #3b82f6;
        }

        .switch-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 12px;
            color: #64748b;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            border-radius: 6px;
            margin: 2px 8px;
        }

        .switch-option:hover {
            background: #e0f2fe;
            color: #0369a1;
        }

        .switch-option i:first-child {
            font-size: 14px;
            width: 20px;
            color: #64748b;
        }
        
        .switch-option:hover i:first-child {
            color: #0369a1;
        }
    `;
    document.head.appendChild(style);
    console.log('✓ CSS injected into <head>');

    console.log('=== Inserting Switcher HTML ===');
    
    // Insert into sidebar - Try multiple selectors
    const container = document.getElementById('dashboard-switcher-container');
    const propertySelector = document.querySelector('.property-selector');
    
    console.log('Container element:', container);
    console.log('Property selector:', propertySelector);
    console.log('HTML to insert:', switcherHTML.substring(0, 100) + '...');
    
    if (container) {
        console.log('✓ Inserting into #dashboard-switcher-container');
        container.innerHTML = switcherHTML;
        console.log('✓ Inserted! Container innerHTML length:', container.innerHTML.length);
        console.log('✓ Container now has', container.children.length, 'children');
    } else if (propertySelector) {
        console.log('✓ Inserting after .property-selector');
        propertySelector.insertAdjacentHTML('afterend', switcherHTML);
    } else {
        console.error('✗ Dashboard switcher: Could not find container or property selector');
        console.error('✗ Available elements:', {
            body: !!document.body,
            sidebar: !!document.querySelector('.sidebar'),
            navMenu: !!document.querySelector('.nav-menu')
        });
    }
    
    console.log('=== Dashboard Switcher Init Complete ===');
}

function switchDashboard(targetDashboard) {
    const userInfo = Auth.getUserInfo();
    
    if (userInfo && !Auth.hasPermission(targetDashboard)) {
        showUpgradeModalDialog(targetDashboard);
        return;
    }

    const dashboardUrls = {
        'travel-link': '../travel-link/index.html',
        'vr-hotel': '../vr-hotel/index.html'
    };

    window.location.href = dashboardUrls[targetDashboard];
}
