export type RendersGymManagement = {
    Home: 'Home',
    Admin: 'Admin',
    Plans: 'Plans',
    Students: 'Students',
    Classes: 'Classes',
    Finance: 'Finance',
    Integration: 'Integration',
    Dashboard: 'Dashboard';
    Programs: 'Programs';
    Profile: 'Profile';
    Application: 'Application';
    Frequencies: 'Frequencies';
    Relationship: 'Relationship';
    Marketplace: 'Marketplace';
    Suppliers: 'Suppliers';
    Contributors: 'Contributors';
    Settings: 'Settings';
    Company: 'Company';
    Support: '';
};

export type GymManagementType = keyof RendersGymManagement;