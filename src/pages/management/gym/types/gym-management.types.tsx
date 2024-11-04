export type RendersGymManagement = {
    Home: 'Home',
    Admin: 'Admin',
    Finance: 'Finance',
    Integration: 'Integration',
    Dashboard: 'Dashboard',
    Program: 'Program',
    Profile: 'Profile'
};

export type GymManagementType = keyof RendersGymManagement;