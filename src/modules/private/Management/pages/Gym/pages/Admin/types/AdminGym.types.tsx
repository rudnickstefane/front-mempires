export type RendersHomeGymAdmin = {
    Home: 'Home',
    Students: 'Students',
    Classes: 'Classes',
    Visits: 'Visits'
    Contacts: 'Contacts',
    Chats: 'Chats',
    Events: 'Events'
    Advertisements: 'Advertisements',
    Frequencies: 'Frequencies',
    Plans: 'Plans',
    Marketplace: 'Marketplace',
    Suppliers: 'Suppliers',
    Contributors: 'Contributors',
    Users: 'Users',
    Groups: 'Groups',
    Hours: 'Hours'
    Protocols: 'Protocols'
};

export type HomeGymAdminType = keyof RendersHomeGymAdmin;