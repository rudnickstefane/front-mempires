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
    Products: 'Products';
    Marketplace: 'Marketplace';
    Suppliers: 'Suppliers';
    Contributors: 'Contributors';
    Settings: 'Settings';
    Company: 'Company';
    Support: 'Support';
    Personal: 'Personal';
    Nutritionist: 'Nutritionist';
    Notifications: 'Notifications';
    GroupAccess: 'GroupAccess';
    Signature: 'Signature';
};

export type GymManagementType = keyof RendersGymManagement;