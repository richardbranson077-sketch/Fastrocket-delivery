import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { token } = await request.json();

        if (!token) {
            return NextResponse.json(
                { success: false, message: 'reCAPTCHA token is required' },
                { status: 400 }
            );
        }

        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        if (!secretKey) {
            console.error('reCAPTCHA secret key not configured');
            return NextResponse.json(
                { success: false, message: 'reCAPTCHA not configured' },
                { status: 500 }
            );
        }

        // Verify the token with Google
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

        const verificationResponse = await fetch(verificationUrl, {
            method: 'POST',
        });

        const verificationData = await verificationResponse.json();

        // Check if verification was successful and score is above threshold
        if (verificationData.success && verificationData.score >= 0.5) {
            return NextResponse.json({
                success: true,
                score: verificationData.score,
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'reCAPTCHA verification failed',
                score: verificationData.score,
            }, { status: 400 });
        }
    } catch (error) {
        console.error('reCAPTCHA verification error:', error);
        return NextResponse.json(
            { success: false, message: 'Verification error' },
            { status: 500 }
        );
    }
}
