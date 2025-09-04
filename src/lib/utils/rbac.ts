import React from 'react';
import { UserProfile } from '@/lib/schemas/dashboard';

export type Role = 'user' | 'admin';

export interface RolePermissions {
  canViewDashboard: boolean;
  canCreateStore: boolean;
  canManageOrders: boolean;
  canManageBonuses: boolean;
  canViewInsights: boolean;
  canAccessAdmin: boolean;
  canManageUsers: boolean;
  canManageStores: boolean;
}

const rolePermissions: Record<Role, RolePermissions> = {
  user: {
    canViewDashboard: true,
    canCreateStore: true,
    canManageOrders: true,
    canManageBonuses: true,
    canViewInsights: true,
    canAccessAdmin: false,
    canManageUsers: false,
    canManageStores: false,
  },
  admin: {
    canViewDashboard: true,
    canCreateStore: true,
    canManageOrders: true,
    canManageBonuses: true,
    canViewInsights: true,
    canAccessAdmin: true,
    canManageUsers: true,
    canManageStores: true,
  },
};

export function hasRole(user: UserProfile | null, role: Role): boolean {
  if (!user) return false;
  return user.role === role;
}

export function hasPermission(
  user: UserProfile | null,
  permission: keyof RolePermissions
): boolean {
  if (!user) return false;
  const permissions = rolePermissions[user.role];
  return permissions[permission];
}

export function requireRole(user: UserProfile | null, role: Role): void {
  if (!hasRole(user, role)) {
    throw new Error(`Access denied: ${role} role required`);
  }
}

export function requirePermission(
  user: UserProfile | null,
  permission: keyof RolePermissions
): void {
  if (!hasPermission(user, permission)) {
    throw new Error(`Access denied: ${permission} permission required`);
  }
}

export function getPermissions(user: UserProfile | null): RolePermissions {
  if (!user) {
    return {
      canViewDashboard: false,
      canCreateStore: false,
      canManageOrders: false,
      canManageBonuses: false,
      canViewInsights: false,
      canAccessAdmin: false,
      canManageUsers: false,
      canManageStores: false,
    };
  }
  return rolePermissions[user.role];
}

// Higher-order component for route protection - moved to separate tsx file
// export function withRoleGuard<T extends {}>(
//   Component: React.ComponentType<T>,
//   requiredRole: Role
// ) {
//   return function GuardedComponent(props: T) {
//     const user = getCurrentUser();

//     if (!hasRole(user, requiredRole)) {
//       return (
//         <div className="flex items-center justify-center min-h-screen">
//           <div className="text-center">
//             <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
//             <p className="text-gray-600 mt-2">
//               You don't have permission to access this page.
//             </p>
//           </div>
//         </div>
//       );
//     }

//     return <Component {...props} />;
//   };
// }

// Hook for checking permissions in components
export function usePermissions(user: UserProfile | null) {
  return getPermissions(user);
}

// Mock function to get current user (in real app, this would come from context/session)
export function getCurrentUser(): UserProfile | null {
  // This is a mock - in a real app you'd get this from NextAuth, context, etc.
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user) {
      try {
        return JSON.parse(user);
      } catch {
        return null;
      }
    }
  }
  return null;
}
