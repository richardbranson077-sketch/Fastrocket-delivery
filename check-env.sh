#!/bin/bash

echo "🔍 Checking FastRocket Environment Variables..."
echo ""

# Function to check if a variable is set
check_var() {
    if [ -z "${!1}" ]; then
        echo "❌ $1 - NOT SET"
        return 1
    else
        echo "✅ $1 - SET"
        return 0
    fi
}

# Load .env.local if it exists
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

echo "=== REQUIRED VARIABLES ==="
check_var "NEXT_PUBLIC_SUPABASE_URL"
check_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"
check_var "SUPABASE_SERVICE_ROLE_KEY"
check_var "NEXTAUTH_SECRET"
check_var "NEXTAUTH_URL"

echo ""
echo "=== OPTIONAL VARIABLES ==="
check_var "RESEND_API_KEY"
check_var "TWILIO_ACCOUNT_SID"
check_var "TWILIO_AUTH_TOKEN"
check_var "TWILIO_PHONE_NUMBER"
check_var "NEXT_PUBLIC_GA_ID"
check_var "NEXT_PUBLIC_MAPBOX_TOKEN"

echo ""
echo "=== SUMMARY ==="
echo "Check complete! Variables marked with ✅ are configured."
echo "Variables marked with ❌ need to be added to your .env.local file."
