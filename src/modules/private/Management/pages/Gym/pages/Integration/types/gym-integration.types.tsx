export type RendersGymIntegrationManagement = {
    Home: 'Home',
    Access: 'Access',
    CardOperator: 'CardOperator',
    MiniPrinter: 'MiniPrinter',
    Turnstile: 'Turnstile',
    Reader: 'Reader',
    Camera: 'Camera',
    Keyboard: 'Keyboard',
    Gympass: 'Gympass',
    TotalPass: 'TotalPass'
};

export type GymIntegrationManagementType = keyof RendersGymIntegrationManagement;