export type RendersGymManagement = {
    Home: 'Home',
    Admin: 'Admin',
    Finance: 'Finance',
    Integration: 'Integration',
    Dashboard: 'Dashboard',
    Programs: 'Programs',
    Profile: 'Profile'
};

export type GymManagementType = keyof RendersGymManagement;