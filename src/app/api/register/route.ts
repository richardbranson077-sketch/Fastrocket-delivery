import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// Simple in-memory admin user (no database needed)
const ADMIN_USER = {
    email: 'admin@fastrocket.com',
    password_hash: '$2a$10$rKvvHYjZw.8YvF8F8F8F8.8YvF8F8F8F8YvF8F8F8F8YvF8F8F8F8', // password: password123
    name: 'Admin',
    role: 'admin'
};

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Only allow creating the admin account
        if (email !== ADMIN_USER.email) {
            return NextResponse.json(
                { success: false, message: 'Registration is disabled. Please contact administrator.' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Admin account already exists. Please login.',
            user: {
                email: ADMIN_USER.email,
                name: ADMIN_USER.name,
            },
        }, { status: 200 });

    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, message: 'Registration is disabled' },
            { status: 500 }
        );
    }
}
