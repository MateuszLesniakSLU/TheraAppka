export default defineNuxtRouteMiddleware((to, from) => {
    if (process.server) return;

    const isAuthenticated = useState('isAuthenticated', () => false);
    const isChecking = useState('isChecking', () => true);

    if (!process.client) return;

    const token = localStorage.getItem('token');

    if (!token) {
        isChecking.value = false;
        return navigateTo('/unauthorized');
    }

    const decoded = JSON.parse(atob(token.split('.')[1]));
    const userRole = decoded.role;

    const routeRoles: Record<string, string[]> = {
        '/doctor/dashboard': ['doctor'],
        '/admin/dashboard': ['admin'],
        '/patient/dashboard': ['patient'],
    };

    const allowedRoles = routeRoles[to.path];
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        isChecking.value = false;
        return navigateTo('/unauthorized');
    }

    isAuthenticated.value = true;
    isChecking.value = false;
});
