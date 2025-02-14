export function useAuth() {
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('patientId');
        navigateTo('/login');
    };

    return { logout };
}