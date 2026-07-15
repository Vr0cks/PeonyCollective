import { NextResponse } from 'next/server';

export async function GET() {
  return new NextResponse('f72fac88-850a-4514-a8a5-30802322dceb', {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
