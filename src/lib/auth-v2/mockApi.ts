export const mockLoginApi = async (email: string, password: string): Promise<{ token: string; user: any }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'demo@aura.build' && password === 'password123') {
                resolve({
                    token: 'fake-jwt-token-123456',
                    user: {
                        id: '1',
                        name: 'Demo User',
                        email: 'demo@aura.build',
                        role: 'admin'
                    }
                });
            } else if (email.includes('error')) {
                reject(new Error('Backend connection failed'));
            } else {
                reject(new Error('Invalid credentials'));
            }
        }, 1500); // Simulate network delay
    });
};
