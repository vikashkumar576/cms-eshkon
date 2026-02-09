export type UserRole = "viewer" | "editor" | "publisher";

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

export const ROLE_PERMISSIONS = {
    viewer: {
        canView: true,
        canEdit: false,
        canPublish: false,
    },
    editor: {
        canView: true,
        canEdit: true,
        canPublish: false,
    },
    publisher: {
        canView: true,
        canEdit: true,
        canPublish: true,
    },
} as const;

export const DEMO_USERS: User[] = [
    {
        id: "1",
        name: "Viewer Demo",
        email: "viewer@example.com",
        role: "viewer",
    },
    {
        id: "2",
        name: "Editor Demo",
        email: "editor@example.com",
        role: "editor",
    },
    {
        id: "3",
        name: "Publisher Demo",
        email: "publisher@example.com",
        role: "publisher",
    },
];

export function canUserEdit(role: UserRole): boolean {
    return ROLE_PERMISSIONS[role].canEdit;
}

export function canUserPublish(role: UserRole): boolean {
    return ROLE_PERMISSIONS[role].canPublish;
}

export function getUserByEmail(email: string): User | undefined {
    return DEMO_USERS.find((user) => user.email === email);
}
